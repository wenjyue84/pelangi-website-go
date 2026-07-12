package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /check-in", h.checkIn)
	})
}

func (h *Handler) checkIn(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Self Check-in Guide | Pelangi Capsule Hostel",
		"Step-by-step self check-in guide for Pelangi Capsule Hostel in Johor Bahru. Learn how to arrive, access the building, find your pod, and settle in — takes about 5 minutes.",
		"https://pelangicapsulehostel.com/check-in",
		"en",
		enNav,
	)
	p.AltEN = baseURL + "/check-in"
	p.AltZH = baseURL + "/zh/check-in"
	p.AltMS = baseURL + "/ms/check-in"
	p.TranslatedZH = baseURL + "/zh/check-in"
	p.TranslatedMS = baseURL + "/ms/check-in"
	h.renderPage(w, "checkin.html", p)
}
