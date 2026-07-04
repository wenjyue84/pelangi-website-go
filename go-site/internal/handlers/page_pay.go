package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /pay", h.pay)
	})
}

func (h *Handler) pay(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Pay Online | Pelangi Capsule Hostel",
		"Pay for your stay at Pelangi Capsule Hostel securely online using a credit card or debit card via PayPal.",
		"https://pelangicapsulehostel.com/pay",
		"en",
		enNav,
	)
	p.NoIndex = true // matches metadata.robots.index = false
	h.renderPage(w, "pay.html", p)
}
