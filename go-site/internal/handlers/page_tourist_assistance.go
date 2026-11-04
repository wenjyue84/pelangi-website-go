package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /tourist-assistance", h.touristAssistance)
	})
}

func (h *Handler) touristAssistance(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Tourists in Distress - Pelangi Helps | Pelangi Capsule Hostel Johor Bahru",
		"Had a road accident or an emergency in Johor Bahru? Pelangi Capsule Hostel offers up to 24 hours of free stay to road-accident victims with a police report and evidence, subject to availability. Police station next door.",
		"https://pelangicapsulehostel.com/tourist-assistance",
		"en",
		enNav,
	)
	h.renderPage(w, "touristAssistance.html", p)
}
