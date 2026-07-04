package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /author/jay-lew", h.authorJayLew)
	})
}

func (h *Handler) authorJayLew(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Jay Lew — Co-Founder & Author | Pelangi Capsule Hostel",
		"Jay Lew is the co-founder of Pelangi Capsule Hostel in Johor Bahru and the author of its travel blog. Years of backpacking across Japan and Southeast Asia inform his guides on JB, the Causeway, and budget travel.",
		"https://pelangicapsulehostel.com/author/jay-lew",
		"en",
		enNav,
	)
	h.renderPage(w, "authorJayLew.html", p)
}
