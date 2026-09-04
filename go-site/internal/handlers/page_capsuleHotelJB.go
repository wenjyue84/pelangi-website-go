package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /capsule-hotel-johor-bahru", h.capsuleHotelJB)
	})
}

func (h *Handler) capsuleHotelJB(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Capsule Hotel Johor Bahru — Pods from RM35/Night in Taman Pelangi | Pelangi Capsule Hostel",
		"Looking for a capsule hotel in Johor Bahru? Pelangi Capsule Hostel has 30 lockable Japanese-style pods in Taman Pelangi at RM35/night, or RM30 your first night when you book direct on our website. Compare pods vs hotels vs dorms, check distances to JB Sentral, CIQ and Bukit Chagar.",
		"https://pelangicapsulehostel.com/capsule-hotel-johor-bahru",
		"en",
		enNav,
	)
	h.renderPage(w, "capsuleHotelJB.html", p)
}
