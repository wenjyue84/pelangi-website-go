package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /guide", h.guide)
	})
}

func (h *Handler) guide(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Johor Bahru Backpacker Guide 2026 | Pelangi Capsule Hostel",
		"Complete JB travel guide for backpackers: getting around, money exchange, Singapore day trips, best hawker centres near Taman Pelangi, safety tips, and useful local apps.",
		"https://pelangicapsulehostel.com/guide",
		"en",
		enNav,
	)
	h.renderPage(w, "guide.html", p)
}
