package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/about", h.zhAbout)
	})
}

func (h *Handler) zhAbout(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"关于我们 | 彩虹胶囊旅舍 新山",
		"了解彩虹胶囊旅舍的故事与理念。我们位于马来西亚新山，提供日式胶囊住宿，以亲民价格为背包客和旅行者打造舒适、安全的住宿体验。",
		"https://pelangicapsulehostel.com/zh/about",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL + "/about"
	p.AltZH = baseURL + "/zh/about"
	h.renderPage(w, "zhAbout.html", p)
}
