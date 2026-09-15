package handlers

import (
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strconv"
	"strings"
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

// newBookProxy builds the /book reverse proxy and injects the chat widget into
// the HTML response. The booking SPA is a separate upstream that lacks the
// marketing site's base layout, so the FAB (which every other page gets via
// base.html) is otherwise absent. We ask the upstream for an uncompressed body
// (Accept-Encoding: identity) and splice the widget markup + its script before
// </body>. widgets_a.js is served by this Go site on the same domain, so it
// loads fine on the proxied page.
func newBookProxy(target, inject string) (http.Handler, error) {
	u, err := url.Parse(target)
	if err != nil {
		return nil, err
	}
	p := httputil.NewSingleHostReverseProxy(u)
	orig := p.Director
	p.Director = func(req *http.Request) {
		orig(req)
		req.Host = u.Host
		req.Header.Set("Accept-Encoding", "identity") // need plaintext to rewrite
	}
	if inject != "" {
		p.ModifyResponse = func(resp *http.Response) error {
			if !strings.HasPrefix(resp.Header.Get("Content-Type"), "text/html") {
				return nil
			}
			if resp.Header.Get("Content-Encoding") != "" {
				return nil // still compressed somehow — leave it untouched
			}
			b, err := io.ReadAll(resp.Body)
			resp.Body.Close()
			if err != nil {
				return err
			}
			s := string(b)
			if i := strings.LastIndex(s, "</body>"); i >= 0 {
				s = s[:i] + inject + s[i:]
			}
			resp.Body = io.NopCloser(strings.NewReader(s))
			resp.ContentLength = int64(len(s))
			resp.Header.Set("Content-Length", strconv.Itoa(len(s)))
			return nil
		}
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
	//
	// /book gets a dedicated proxy that injects the chat widget, since the
	// booking SPA upstream lacks the site's base layout (and thus the FAB).
	widgetHTML, werr := h.r.Partial("widgetsA", nil)
	if werr != nil {
		log.Printf("proxy: render widgetsA for /book injection: %v", werr)
		widgetHTML = ""
	}
	inject := ""
	if widgetHTML != "" {
		inject = "\n" + widgetHTML + "\n<script src=\"/static/js/widgets_a.js?v=sid1\" defer></script>\n"
	}
	if bookProxy, berr := newBookProxy(adminHost(), inject); berr == nil {
		mux.Handle("/book", bookProxy)
	} else {
		log.Printf("proxy: book proxy: %v", berr)
		mux.Handle("/book", admin)
	}
	mux.Handle("/assets/", admin)
	// Webchat goes to Rainbow AI (a different upstream than the booking gateway).
	// More specific than the /api/ catch-all below, so it wins for /api/chat/*.
	mux.Handle("/api/chat/", rainbow)
	// Everything else under /api/ → booking gateway. The marketing site's own
	// /api/* handlers (registered via page init()s with method+exact patterns)
	// are more specific and take precedence over this catch-all.
	mux.Handle("/api/", admin)
}
