package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /sitemap-html", h.sitemapHTML)
	})
}

func (h *Handler) sitemapHTML(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Sitemap | Pelangi Capsule Hostel",
		"Browse all pages on the Pelangi Capsule Hostel website — rooms, booking, amenities, location, blog articles, and more.",
		"https://pelangicapsulehostel.com/sitemap-html",
		"en",
		enNav,
	)
	h.renderPage(w, "sitemapHtml.html", p)
}
