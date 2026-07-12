package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /ms/guide", h.msGuide)
	})
}

func (h *Handler) msGuide(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Panduan Pelancong Bajet Johor Bahru | Pelangi Capsule Hostel",
		"Panduan lengkap JB untuk backpacker: pengangkutan, penukaran wang & DuitNow, lawatan sehari ke Singapura, pusat penjaja berhampiran Taman Pelangi, tips keselamatan, dan aplikasi tempatan berguna.",
		"https://pelangicapsulehostel.com/ms/guide",
		"ms",
		msNav,
	)
	p.AltEN = baseURL + "/guide"
	p.AltZH = baseURL + "/zh/guide"
	p.AltMS = baseURL + "/ms/guide"
	h.renderPage(w, "msGuide.html", p)
}
