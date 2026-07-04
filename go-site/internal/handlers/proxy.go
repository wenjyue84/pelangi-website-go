package handlers

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

// Reverse proxies replacing the Next.js next.config.ts rewrites:
//   /book                → ${PMS2_API_URL}/book              (booking SPA shell)
//   /assets/:path*       → ${PMS2_API_URL}/assets/:path*     (Vite chunks)
//   /api/:path*          → ${PMS2_API_URL}/api/:path*        (booking gateway)
//   /api/chat/:path*     → ${RAINBOW_API_URL}/api/chat/:path*(webchat)
//
// The /book SPA is the full PMS frontend: besides /api/public/* it calls
// /api/settings, /api/business-config, /api/csrf-token, /api/auth/* etc. on the
// booking gateway, so the whole /api/* namespace is forwarded there — the
// marketing site's own API routes (/api/ari, /api/contact, /api/revalidate, …)
// are registered with more specific patterns and take precedence.
//
// PMS2_API_URL defaults to the admin host; RAINBOW_API_URL falls back to it.

func adminHost() string {
	if v := os.Getenv("PMS2_API_URL"); v != "" {
		return v
	}
	return "https://admin.pelangicapsulehostel.com"
}

func rainbowHost() string {
	if v := os.Getenv("RAINBOW_API_URL"); v != "" {
		return v
	}
	return adminHost()
}

// newProxy builds a reverse proxy to target that preserves the incoming request
// path and rewrites the Host header to the upstream (required for vhost routing).
func newProxy(target string) (http.Handler, error) {
	u, err := url.Parse(target)
	if err != nil {
		return nil, err
	}
	p := httputil.NewSingleHostReverseProxy(u)
	orig := p.Director
	p.Director = func(req *http.Request) {
		orig(req)
		req.Host = u.Host // route correctly on the upstream vhost
	}
	return p, nil
}

// registerProxies attaches the rewrite/proxy routes to the mux.
func (h *Handler) registerProxies(mux *http.ServeMux) {
	admin, err := newProxy(adminHost())
	if err != nil {
		log.Printf("proxy: admin host %q: %v", adminHost(), err)
		return
	}
	rainbow, err := newProxy(rainbowHost())
	if err != nil {
		log.Printf("proxy: rainbow host %q: %v", rainbowHost(), err)
		return
	}
	// All methods (GET page, POST booking/chat) → no method prefix.
	// Only exact /book is rewritten (matches next.config.ts). /book/confirmation
	// is a real local page, so it must NOT be proxied.
	mux.Handle("/book", admin)
	mux.Handle("/assets/", admin)
	// Webchat goes to Rainbow AI (a different upstream than the booking gateway).
	// More specific than the /api/ catch-all below, so it wins for /api/chat/*.
	mux.Handle("/api/chat/", rainbow)
	// Everything else under /api/ → booking gateway. The marketing site's own
	// /api/* handlers (registered via page init()s with method+exact patterns)
	// are more specific and take precedence over this catch-all.
	mux.Handle("/api/", admin)
}
