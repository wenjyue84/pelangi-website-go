package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /visa-run", h.visaRun)
	})
}

func (h *Handler) visaRun(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Visa Run Singapore to JB | Pelangi Capsule Hostel",
		"Complete guide to visa runs from Singapore to Johor Bahru. Learn the process, costs, requirements, and FAQs. Perfect for expats and travelers.",
		"https://pelangicapsulehostel.com/visa-run",
		"en",
		enNav,
	)
	h.renderPage(w, "visaRun.html", p)
}
