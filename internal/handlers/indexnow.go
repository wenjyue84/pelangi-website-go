package handlers

import "net/http"

// indexNowKey verifies site ownership for the IndexNow protocol (Bing, Seznam,
// Naver, Yandex). Submissions POST to api.indexnow.org with this key; the
// engine then fetches /<key>.txt to confirm ownership. Key generated 2026-07-05.
const indexNowKey = "8f4b2a1c6d9e37f0a5c8b21e4d76093a"

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /"+indexNowKey+".txt", func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.Header().Set("Cache-Control", "public, max-age=86400")
			_, _ = w.Write([]byte(indexNowKey))
		})
	})
}
