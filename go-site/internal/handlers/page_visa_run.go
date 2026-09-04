package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /visa-run", h.visaRun)
	})
}

func (h *Handler) visaRun(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Visa Run Singapore to JB 2026 | Pelangi Capsule Hostel Guide",
		"Plan your Singapore to Johor Bahru visa run in 2026. Border crossing tips, CW1 bus guide, best times to cross, and affordable overnight accommodation at RM35/night (RM30 first night for direct website bookings).",
		"https://pelangicapsulehostel.com/visa-run",
		"en",
		enNav,
	)
	h.renderPage(w, "visaRun.html", p)
}
