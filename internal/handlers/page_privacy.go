package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /privacy-policy", h.privacy)
	})
}

func (h *Handler) privacy(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Privacy Policy | Pelangi Capsule Hostel",
		"Learn how Pelangi Capsule Hostel collects, uses, and protects your personal data in accordance with Malaysia's Personal Data Protection Act 2010 (PDPA) and the 2024 Amendment Act.",
		"https://pelangicapsulehostel.com/privacy-policy",
		"en",
		enNav,
	)
	h.renderPage(w, "privacy.html", p)
}
