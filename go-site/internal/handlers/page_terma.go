package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /ms/terma", h.terma)
	})
}

func (h *Handler) terma(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Terma dan Syarat | Pelangi Capsule Hostel",
		"Terma dan Syarat Pelangi Capsule Hostel — polisi tempahan, polisi pembatalan dan bayaran balik, peraturan rumah, dan undang-undang yang terpakai. Didedahkan mengikut CPETTR 2024.",
		"https://pelangicapsulehostel.com/ms/terma",
		"ms",
		enNav,
	)
	p.AltEN = baseURL + "/terms"
	p.AltMS = baseURL + "/ms/terma"
	h.renderPage(w, "terma.html", p)
}
