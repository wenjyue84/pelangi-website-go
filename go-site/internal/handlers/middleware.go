package handlers

import (
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

// Middleware ports the request-time behaviors from site/src/proxy.ts:
//   - legacy WordPress paths/queries → 410 Gone (faster de-indexing of old spam)
//   - sliding-window rate limiting on /api/public/* and /api/chat/*
// It wraps the main mux.
func (h *Handler) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path

		// --- Security headers (site is HTTPS-only behind Cloudflare) ---
		hdr := w.Header()
		hdr.Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		hdr.Set("X-Content-Type-Options", "nosniff")
		hdr.Set("X-Frame-Options", "SAMEORIGIN")
		hdr.Set("Referrer-Policy", "strict-origin-when-cross-origin")
		hdr.Set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

		// --- WordPress legacy paths → 410 Gone ---
		for _, p := range wpPathPrefixes {
			if path == p || strings.HasPrefix(path, p+"/") {
				w.Header().Set("X-Robots-Tag", "noindex")
				w.WriteHeader(http.StatusGone)
				return
			}
		}
		// --- WordPress legacy query params → 410 Gone ---
		q := r.URL.Query()
		for _, p := range wpQueryParams {
			if q.Has(p) {
				w.Header().Set("X-Robots-Tag", "noindex")
				w.WriteHeader(http.StatusGone)
				return
			}
		}

		// --- A/B testing: set CTA variant cookie on /book (ports proxy.ts) ---
		if strings.HasPrefix(path, "/book") {
			variant := os.Getenv("NEXT_PUBLIC_FLAG_CTA_VARIANT")
			if variant == "" {
				variant = "book-now"
			}
			http.SetCookie(w, &http.Cookie{
				Name: "x-variant", Value: variant, Path: "/",
				MaxAge: 30 * 24 * 60 * 60, SameSite: http.SameSiteLaxMode,
			})
		}

		// --- Rate limiting (proxied API routes only) ---
		for _, rt := range rateLimitRoutes {
			if strings.HasPrefix(path, rt.prefix) {
				ip := clientIP(r)
				allowed, remaining, reset := rl.check(rt.prefix+ip, rt.limit, rateWindow)
				w.Header().Set("X-RateLimit-Limit", strconv.Itoa(rt.limit))
				w.Header().Set("X-RateLimit-Remaining", strconv.Itoa(remaining))
				w.Header().Set("X-RateLimit-Reset", strconv.FormatInt(reset, 10))
				if !allowed {
					w.Header().Set("Retry-After", strconv.FormatInt(reset-time.Now().Unix(), 10))
					w.Header().Set("X-RateLimit-Remaining", "0")
					w.Header().Set("Content-Type", "text/plain")
					w.Header().Set("X-Content-Type-Options", "nosniff")
					w.WriteHeader(http.StatusTooManyRequests)
					_, _ = w.Write([]byte("Too Many Requests"))
					return
				}
				break
			}
		}

		next.ServeHTTP(w, r)
	})
}

var wpPathPrefixes = []string{
	"/wp-admin", "/wp-content", "/wp-includes", "/wp-json", "/wp-login.php",
	"/wp-cron.php", "/xmlrpc.php", "/wp-signup.php", "/wp-activate.php",
}

var wpQueryParams = []string{"p", "page_id", "cat", "tag", "author", "m", "feed", "paged"}

type rlRoute struct {
	prefix string
	limit  int
}

var rateLimitRoutes = []rlRoute{
	{"/api/public/", 30},
	{"/api/chat/", 20},
}

const rateWindow = time.Minute

func clientIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		return strings.TrimSpace(strings.Split(xff, ",")[0])
	}
	if xr := r.Header.Get("X-Real-IP"); xr != "" {
		return xr
	}
	return "unknown"
}

// rateLimiter is an in-process sliding-window limiter (single instance), ported
// from the proxy.ts slidingWindow implementation.
type rateLimiter struct {
	mu    sync.Mutex
	store map[string][]int64 // key -> timestamps (unix nanos)
}

var rl = &rateLimiter{store: map[string][]int64{}}

func (l *rateLimiter) check(key string, limit int, window time.Duration) (allowed bool, remaining int, reset int64) {
	now := time.Now()
	winStart := now.Add(-window).UnixNano()

	l.mu.Lock()
	defer l.mu.Unlock()

	ts := l.store[key]
	kept := ts[:0]
	for _, t := range ts {
		if t > winStart {
			kept = append(kept, t)
		}
	}

	if len(kept) > 0 {
		reset = (kept[0] + int64(window)) / int64(time.Second)
	} else {
		reset = (now.Add(window)).Unix()
	}

	if len(kept) >= limit {
		l.store[key] = kept
		return false, 0, reset
	}
	kept = append(kept, now.UnixNano())
	l.store[key] = kept
	return true, limit - len(kept), reset
}
