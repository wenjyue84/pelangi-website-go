package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/location", h.zhLocation)
	})
}

func (h *Handler) zhLocation(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"地址与交通 | 彩虹胶囊旅舍 新山",
		"彩虹胶囊旅舍位于马来西亚新山 Taman Pelangi。提供从 JB Sentral 火车站、CIQ 关卡及拉金巴士总站的详细交通指引，含 Google 地图及 Grab 打车建议。",
		"https://pelangicapsulehostel.com/zh/location",
		"zh",
		zhNav,
	)
	p.AltEN = baseURL + "/location"
	p.AltZH = baseURL + "/zh/location"
	h.renderPage(w, "zhLocation.html", p)
}
