package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /location", h.location)
	})
}

func (h *Handler) location(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Location & Directions | Pelangi Capsule Hostel Johor Bahru",
		"Find Pelangi Capsule Hostel at 26A Jalan Perang, Taman Pelangi, Johor Bahru. Directions from JB Sentral, CIQ Border, and Larkin Bus Terminal. Google Maps, transport info, and local area guide.",
		"https://pelangicapsulehostel.com/location",
		"en",
		enNav,
	)
	p.AltEN = baseURL + "/location"
	p.AltZH = baseURL + "/zh/location"
	p.TranslatedZH = baseURL + "/zh/location"
	h.renderPage(w, "location.html", p)
}
