package handlers

import "net/http"

// EXEMPLAR content page. Pattern for batch-porting static pages:
//  1. One file per page: page_<name>.go (this) + templates/pages/<name>.html.
//  2. init() self-registers the route via registerPage — no central edits.
//  3. Handler builds a BasePage (title/description/canonical/nav) and renders.
//  4. Template defines {{content}} = {{template "header" .}} + <main> + {{template "footer" .}}.
func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /accessibility", h.accessibility)
	})
}

func (h *Handler) accessibility(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Accessibility Statement | Pelangi Capsule Hostel",
		"Pelangi Capsule Hostel's commitment to digital accessibility. Learn about our WCAG 2.2 Level AA conformance target, known limitations, and how to report accessibility barriers.",
		"https://pelangicapsulehostel.com/accessibility",
		"en",
		enNav,
	)
	h.renderPage(w, "accessibility.html", p)
}
