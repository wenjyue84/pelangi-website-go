package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /india", h.indiaLanding)
	})
}

func (h *Handler) indiaLanding(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Budget Hostel in JB for Indian Travelers | Pelangi Capsule Hostel",
		"Capsule hostel in Johor Bahru from RM35/night — check today's INR rate. Halal & vegetarian food nearby, 10 min from CIQ, easy from Singapore. Book now.",
		baseURL+"/india",
		"en",
		enNav,
	)
	p.AltEN = baseURL + "/"
	p.AltIN = baseURL + "/india"
	h.renderPage(w, "india.html", p)
}
