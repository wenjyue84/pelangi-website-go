package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /ms/getting-here", h.msGettingHere)
	})
}

func (h *Handler) msGettingHere(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Cara ke Sini | Panduan Sempadan & Pengangkutan | Pelangi Capsule Hostel",
		"Panduan lengkap perjalanan dari Singapura ke Johor Bahru: RTS Link, bas CIQ, Grab, MyNIISe QR, Lapangan Terbang Senai, dan cara sampai ke Pelangi Capsule Hostel.",
		"https://pelangicapsulehostel.com/ms/getting-here",
		"ms",
		msNav,
	)
	p.AltEN = baseURL + "/getting-here"
	p.AltZH = baseURL + "/zh/getting-here"
	p.AltMS = baseURL + "/ms/getting-here"
	h.renderPage(w, "msGettingHere.html", p)
}
