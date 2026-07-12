package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /zh/getting-here", h.zhGettingHere)
	})
}

func (h *Handler) zhGettingHere(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"如何前往 | 过关攻略与交通指南 | 彩虹胶囊旅舍 新山",
		"从新加坡到柔佛新山的完整过关指南：RTS Link、CIQ关卡巴士、Grab、MyNIISe QR过境、双圣机场，以及从市区前往彩虹胶囊旅舍的交通方式。",
		"https://pelangicapsulehostel.com/zh/getting-here",
		"zh-CN",
		zhNav,
	)
	p.AltEN = baseURL + "/getting-here"
	p.AltZH = baseURL + "/zh/getting-here"
	p.AltMS = baseURL + "/ms/getting-here"
	h.renderPage(w, "zhGettingHere.html", p)
}
