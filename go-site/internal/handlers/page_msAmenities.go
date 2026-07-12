package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /ms/amenities", h.msAmenities)
	})
}

func (h *Handler) msAmenities(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Kemudahan Hostel | Pelangi Capsule Hostel Johor Bahru",
		"Terokai kemudahan lengkap Pelangi Capsule Hostel: WiFi serat optik laju, ruang co-working, akses 24 jam, loker selamat, dapur berkongsi, kemudahan dobi, dan pancuran air panas. Pilihan terbaik untuk pekerja digital dan penginap jangka panjang.",
		"https://pelangicapsulehostel.com/ms/amenities",
		"ms",
		msNav,
	)
	p.AltEN = baseURL + "/amenities"
	p.AltZH = baseURL + "/zh/amenities"
	p.AltMS = baseURL + "/ms/amenities"
	h.renderPage(w, "msAmenities.html", p)
}
