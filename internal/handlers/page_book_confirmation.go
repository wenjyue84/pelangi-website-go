package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /book/confirmation", h.bookConfirmation)
	})
}

func (h *Handler) bookConfirmation(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Booking Confirmed | Pelangi Capsule Hostel JB",
		"Your booking deposit has been received. Check your confirmation details and prepare for your stay at Pelangi Capsule Hostel Johor Bahru.",
		"https://pelangicapsulehostel.com/book/confirmation",
		"en",
		enNav,
	)
	p.NoIndex = true // metadata.robots index:false, follow:false
	h.renderPage(w, "bookConfirmation.html", p)
}
