package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh", h.zhHome)
	})
}

func (h *Handler) zhHome(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"彩虹胶囊旅舍 | 柔佛新山平价住宿",
		"柔佛新山彩虹胶囊旅舍 — 日式胶囊舱，每晚统一价 RM35。免费 WiFi、24小时自助入住、热水浴室、个人储物柜。毗邻新加坡，交通便利。",
		"https://pelangicapsulehostel.com/zh",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL
	p.AltZH = baseURL + "/zh"
	h.renderPage(w, "zh.html", p)
}
