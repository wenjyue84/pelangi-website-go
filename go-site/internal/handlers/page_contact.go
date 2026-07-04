package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /contact", h.contact)
	})
}

func (h *Handler) contact(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Contact | Pelangi Capsule Hostel Johor Bahru",
		"Contact us at Pelangi Capsule Hostel — visit us in Taman Pelangi, JB. WhatsApp, phone, or email for bookings and inquiries.",
		"https://pelangicapsulehostel.com/contact",
		"en",
		enNav,
	)
	h.renderPage(w, "contact.html", p)
}
