package handlers

import (
	"net/http"

	"pelangi-website/internal/data"
)

// RoomsPage is the view model for /rooms.
type RoomsPage struct {
	BasePage
	Rooms []data.RoomType
}

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /rooms", h.rooms)
	})
}

func (h *Handler) rooms(w http.ResponseWriter, r *http.Request) {
	p := RoomsPage{
		BasePage: h.base(
			"Capsule Pod Rooms | Pelangi Capsule Hostel JB",
			"Private capsule pods from RM30/night in Taman Pelangi, Johor Bahru. Personal climate control, USB charging, LED lighting, and personal locker included.",
			"https://pelangicapsulehostel.com/rooms",
			"en",
			enNav,
		),
		Rooms: data.RoomTypes,
	}
	p.AltEN = baseURL + "/rooms"
	p.AltZH = baseURL + "/zh/rooms"
	p.TranslatedZH = baseURL + "/zh/rooms"
	h.renderPage(w, "rooms.html", p)
}
