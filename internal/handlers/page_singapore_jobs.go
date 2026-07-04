package handlers

import "net/http"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /singapore-jobs", h.singaporeJobs)
	})
}

func (h *Handler) singaporeJobs(w http.ResponseWriter, r *http.Request) {
	p := h.base(
		"Singapore Jobs for Malaysians | Work Passes & Resources | Pelangi Capsule Hostel",
		"Guide to Singapore jobs for Malaysians: work pass comparison (EP, S Pass, Work Permit), salary expectations, visa sponsorship FAQ, and affordable interview accommodation in JB.",
		"https://pelangicapsulehostel.com/singapore-jobs",
		"en",
		enNav,
	)
	h.renderPage(w, "singaporeJobs.html", p)
}
