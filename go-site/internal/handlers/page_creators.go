package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /creators", h.creators)
	})
}

func (h *Handler) creators(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Content Creators Stay Free | Pelangi Capsule Hostel Johor Bahru",
		"YouTubers with 5,000+ followers: make an honest video about Pelangi Capsule Hostel and the Taman Pelangi neighbourhood in Johor Bahru and stay free. Nights are negotiable on video quality and followers.",
		"https://pelangicapsulehostel.com/creators",
		"en",
		enNav,
	)
	h.renderPage(w, "creators.html", p)
}
