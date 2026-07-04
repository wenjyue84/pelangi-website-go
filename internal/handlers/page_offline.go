package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /~offline", h.offline)
	})
}

func (h *Handler) offline(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Offline",
		"You are currently offline. Please check your internet connection and try again.",
		"https://pelangicapsulehostel.com/~offline",
		"en",
		enNav,
	)
	h.renderPage(w, "offline.html", p)
}
