package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /terms", h.terms)
	})
}

func (h *Handler) terms(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Terms and Conditions | Pelangi Capsule Hostel",
		"Read the Terms and Conditions for Pelangi Capsule Hostel — booking policy, cancellation and refund policy, house rules, liability, and governing law under Malaysian law.",
		"https://pelangicapsulehostel.com/terms",
		"en",
		enNav,
	)
	h.renderPage(w, "terms.html", p)
}
