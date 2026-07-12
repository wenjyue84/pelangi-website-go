package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /about", h.about)
	})
}

func (h *Handler) about(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"About Pelangi Capsule Hostel | Johor Bahru",
		"Learn about Pelangi Capsule Hostel in Johor Bahru — our story, mission, and why we're the perfect base for exploring JB and Singapore.",
		"https://pelangicapsulehostel.com/about",
		"en",
		enNav,
	)
	p.AltEN = baseURL + "/about"
	p.AltZH = baseURL + "/zh/about"
	p.TranslatedZH = baseURL + "/zh/about"
	h.renderPage(w, "about.html", p)
}
