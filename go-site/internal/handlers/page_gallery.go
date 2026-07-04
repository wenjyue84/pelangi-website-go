package handlers

import (
	"net/http"

	"pelangi-website/internal/data"
)

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /gallery", h.gallery)
	})
}

// GalleryPage is the view model for /gallery.
type GalleryPage struct {
	BasePage
	Images     []data.GalleryImage
	Categories []data.GalleryCategory
}

func (h *Handler) gallery(w http.ResponseWriter, r *http.Request) {
	p := GalleryPage{
		BasePage: h.base(
			"Gallery | Pelangi Capsule Hostel Johor Bahru",
			"See photos of Pelangi Capsule Hostel — our modern capsule pods, facilities, common areas, and the Taman Pelangi neighbourhood.",
			"https://pelangicapsulehostel.com/gallery",
			"en",
			enNav,
		),
		Images:     data.GalleryImages,
		Categories: data.GalleryCategories,
	}
	h.renderPage(w, "gallery.html", p)
}
