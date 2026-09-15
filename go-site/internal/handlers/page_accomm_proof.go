package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /accommodation-proof", h.accommodationProof)
	})
}

// accommodationProof renders the guest self-service lookup form. All business
// logic lives in PMS2 (go-pms): the page only POSTs to
// /api/public/accommodation/lookup, which the /api/ reverse proxy forwards, so
// SHARE_DOC_SECRET never leaves the gateway.
func (h *Handler) accommodationProof(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Accommodation Confirmation | Pelangi Capsule Hostel JB",
		"Retrieve a printable accommodation confirmation for your Pelangi Capsule Hostel booking — proof of stay for Malaysian immigration.",
		"https://pelangicapsulehostel.com/accommodation-proof",
		"en",
		enNav,
	)
	p.NoIndex = true
	h.renderPage(w, "accommodationProof.html", p)
}
