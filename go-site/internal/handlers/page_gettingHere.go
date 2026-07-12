package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /getting-here", h.gettingHere)
	})
}

func (h *Handler) gettingHere(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Getting Here — JB Border Crossing, RTS Link & Transport | Pelangi Capsule Hostel",
		"How to reach Pelangi Capsule Hostel in Johor Bahru from Singapore. RTS Link, MyNIISe QR immigration, CIQ bus & Grab, Senai Airport, and DuitNow-PayNow cross-border payment guide.",
		"https://pelangicapsulehostel.com/getting-here",
		"en",
		enNav,
	)
	p.AltEN = baseURL + "/getting-here"
	p.AltZH = baseURL + "/zh/getting-here"
	p.AltMS = baseURL + "/ms/getting-here"
	p.TranslatedZH = baseURL + "/zh/getting-here"
	p.TranslatedMS = baseURL + "/ms/getting-here"
	h.renderPage(w, "gettingHere.html", p)
}
