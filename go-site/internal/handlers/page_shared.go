package handlers

import (
	"net/http"
	"strings"
)

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /shared", h.shared)
	})
}

// SharedPage is the view model for the /shared page.
// It carries query-param values resolved server-side.
type SharedPage struct {
	BasePage
	ShareTitle  string
	ShareText   string
	DisplayURL  string
	InternalHref string
}

func (h *Handler) shared(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	title := q.Get("title")
	text := q.Get("text")
	url := q.Get("url")

	displayURL := url
	if displayURL == "" {
		displayURL = "https://pelangicapsulehostel.com"
	}

	internalHref := "/"
	const base = "https://pelangicapsulehostel.com"
	if strings.HasPrefix(displayURL, base) {
		trimmed := strings.TrimPrefix(displayURL, base)
		if trimmed == "" {
			internalHref = "/"
		} else {
			internalHref = trimmed
		}
	}

	shareTitle := title
	if shareTitle == "" {
		shareTitle = "Shared with you"
	}

	p := SharedPage{
		BasePage: h.base(
			"Shared Page | Pelangi Capsule Hostel",
			"",
			"https://pelangicapsulehostel.com/shared",
			"en",
			enNav,
		),
		ShareTitle:  shareTitle,
		ShareText:   text,
		DisplayURL:  displayURL,
		InternalHref: internalHref,
	}
	h.renderPage(w, "shared.html", p)
}
