package handlers

import "net/http"

// pageRegistrations collects per-page route registrations so each content page
// can live in its own file (page_*.go) and self-register via init(), without
// editing a central route table. Register() invokes them all.
var pageRegistrations []func(*Handler, *http.ServeMux)

// registerPage is called from a page file's init() to attach its route(s).
func registerPage(f func(*Handler, *http.ServeMux)) {
	pageRegistrations = append(pageRegistrations, f)
}
