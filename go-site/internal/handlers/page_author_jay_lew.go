package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /author/jay-lew", h.authorJayLew)
	})
}

func (h *Handler) authorJayLew(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Pelangi Capsule Hostel — Blog & Travel Guides | Johor Bahru",
		"Pelangi Capsule Hostel is a Japanese-style capsule accommodation in Johor Bahru. Read our travel blog featuring first-hand guides on Johor Bahru, crossing the Singapore Causeway, budget travel, and backpacker tips.",
		"https://pelangicapsulehostel.com/author/jay-lew",
		"en",
		enNav,
	)
	h.renderPage(w, "authorJayLew.html", p)
}
