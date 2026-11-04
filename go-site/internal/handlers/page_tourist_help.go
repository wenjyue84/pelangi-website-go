package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /tourist-help", h.touristHelp)
	})
}

func (h *Handler) touristHelp(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Emergency & Help for Tourists in Johor Bahru | Pelangi Capsule Hostel",
		"Sick, in a road accident, lost your passport or overstayed in Johor Bahru? Step-by-step tourist help guides from Pelangi Capsule Hostel, with a police station next door.",
		"https://pelangicapsulehostel.com/tourist-help",
		"en",
		enNav,
	)
	h.renderPage(w, "touristHelp.html", p)
}
