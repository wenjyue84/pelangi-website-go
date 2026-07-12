package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /amenities", h.amenities)
	})
}

func (h *Handler) amenities(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Hostel Amenities | Free WiFi, Co-working Space & More",
		"Discover Pelangi Capsule Hostel amenities: high-speed WiFi for digital nomads, dedicated co-working space, 24/7 access, secure lockers, shared kitchen, laundry facilities, and more. Perfect for long-stay backpackers in Johor Bahru.",
		"https://pelangicapsulehostel.com/amenities",
		"en",
		enNav,
	)
	p.AltEN = baseURL + "/amenities"
	p.AltZH = baseURL + "/zh/amenities"
	p.AltMS = baseURL + "/ms/amenities"
	p.TranslatedZH = baseURL + "/zh/amenities"
	p.TranslatedMS = baseURL + "/ms/amenities"
	h.renderPage(w, "amenities.html", p)
}
