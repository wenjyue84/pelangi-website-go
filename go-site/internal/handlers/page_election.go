package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /johor-election-2026", h.johorElection2026)
	})
}

func (h *Handler) johorElection2026(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Johor State Election 11 July 2026 — What Travellers Need to Know | Pelangi Capsule Hostel",
		"Johor votes on Saturday 11 July 2026 — a public holiday in Johor. What it means for travellers: Causeway traffic 10–12 July, shop opening hours, and why the hostel operates as usual. Practical guide for JB visitors.",
		"https://pelangicapsulehostel.com/johor-election-2026",
		"en",
		enNav,
	)
	h.renderPage(w, "election.html", p)
}
