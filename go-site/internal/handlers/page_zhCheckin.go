package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/check-in", h.zhCheckIn)
	})
}

func (h *Handler) zhCheckIn(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"自助入住指南 | 彩虹胶囊旅舍 新山",
		"彩虹胶囊旅舍自助入住全攻略。抵达地址、输入门禁码、找到胶囊舱、存放行李、连接WiFi——全程约5分钟，无需前台。",
		"https://pelangicapsulehostel.com/zh/check-in",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL + "/check-in"
	p.AltZH = baseURL + "/zh/check-in"
	p.AltMS = baseURL + "/ms/check-in"
	h.renderPage(w, "zhCheckin.html", p)
}
