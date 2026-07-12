package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/amenities", h.zhAmenities)
	})
}

func (h *Handler) zhAmenities(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"住宿设施 | 彩虹胶囊旅舍 新山",
		"探索彩虹胶囊旅舍的完善设施：高速光纤 WiFi、共享办公空间、24小时出入、个人储物柜、共享厨房、洗衣设施及热水浴室。数字游民与长住旅客的理想选择。",
		"https://pelangicapsulehostel.com/zh/amenities",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL + "/amenities"
	p.AltZH = baseURL + "/zh/amenities"
	p.AltMS = baseURL + "/ms/amenities"
	h.renderPage(w, "zhAmenities.html", p)
}
