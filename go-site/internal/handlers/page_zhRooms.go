package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/rooms", h.zhRooms)
	})
}

func (h *Handler) zhRooms(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"胶囊房型与价格 | 彩虹胶囊旅舍 新山",
		"查看彩虹胶囊旅舍所有房型及价格。男女混住舱和女性专用舱，每晚统一价 RM35。含个人温控、USB 充电、可锁门板及免费 WiFi。",
		"https://pelangicapsulehostel.com/zh/rooms",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL + "/rooms"
	p.AltZH = baseURL + "/zh/rooms"
	h.renderPage(w, "zhRooms.html", p)
}
