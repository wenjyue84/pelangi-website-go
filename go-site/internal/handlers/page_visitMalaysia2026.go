package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /visit-malaysia-2026", h.visitMalaysia2026)
	})
}

func (h *Handler) visitMalaysia2026(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Visit Malaysia 2026 — Budget Hostel in Johor Bahru | Pelangi Capsule Hostel",
		"Celebrate Visit Malaysia Year 2026 from Johor Bahru. Budget capsule hostel at a flat RM35/night in Taman Pelangi — perfect base for Singapore day trips via RTS Link, JB attractions, and Visit Johor 2026 events.",
		"https://pelangicapsulehostel.com/visit-malaysia-2026",
		"en",
		enNav,
	)
	h.renderPage(w, "visitMalaysia2026.html", p)
}
