package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/guide", h.zhGuide)
	})
}

func (h *Handler) zhGuide(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"新山背包客旅行指南 | 彩虹胶囊旅舍",
		"新山（JB）背包客完整攻略：交通出行、货币兑换与DuitNow、新加坡一日游、塔曼彩虹附近美食小贩中心、安全须知及本地实用App推荐。",
		"https://pelangicapsulehostel.com/zh/guide",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL + "/guide"
	p.AltZH = baseURL + "/zh/guide"
	p.AltMS = baseURL + "/ms/guide"
	h.renderPage(w, "zhGuide.html", p)
}
