package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /ms/check-in", h.msCheckIn)
	})
}

func (h *Handler) msCheckIn(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Panduan Daftar Masuk Sendiri | Pelangi Capsule Hostel Johor Bahru",
		"Panduan lengkap daftar masuk sendiri di Pelangi Capsule Hostel, Johor Bahru. Tiba, masukkan kod pintu, cari kapsul anda, simpan barang, sambung WiFi — selesai dalam 5 minit.",
		"https://pelangicapsulehostel.com/ms/check-in",
		"ms",
		msNav,
	)
	p.AltEN = baseURL + "/check-in"
	p.AltZH = baseURL + "/zh/check-in"
	p.AltMS = baseURL + "/ms/check-in"
	h.renderPage(w, "msCheckin.html", p)
}
