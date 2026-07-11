// Command pelangi-website is a tiny, self-contained Go server that renders the
// Pelangi Capsule Hostel marketing + booking site. It embeds all templates,
// CSS, JS and static assets into a single binary (go:embed) so deployment is a
// single file with no runtime dependencies — a deliberate contrast to the
// previous Next.js server that held the whole React/Node runtime resident.
package main

import (
	"context"
	"embed"
	"errors"
	"io/fs"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"pelangi-website/internal/gbp"
	"pelangi-website/internal/handlers"
	"pelangi-website/internal/render"
)

// assets bundles every template and static file into the binary.
//
//go:embed templates static
var assets embed.FS

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	// publicDir holds large, non-embedded assets (images, llms.txt, favicon…),
	// copied alongside the binary at deploy time to keep the binary tiny.
	publicDir := os.Getenv("PUBLIC_DIR")
	if publicDir == "" {
		publicDir = "public"
	}

	r, err := render.New(assets)
	if err != nil {
		log.Fatalf("render init: %v", err)
	}

	staticFS, err := fs.Sub(assets, "static")
	if err != nil {
		log.Fatalf("static sub: %v", err)
	}

	gbpSvc, err := gbp.NewServiceFromEnv()
	if err != nil {
		log.Fatalf("gbp init: %v", err)
	}
	if gbpSvc != nil {
		gbpSvc.StartScheduler()
		log.Printf("GBP scheduler started — admin at /admin/gbp?token=%s", gbpSvc.AdminToken)
	}

	mux := http.NewServeMux()
	h := handlers.New(r, publicDir, gbpSvc)
	h.Register(mux)
	// Directory paths under /static/ must 404, not render a listing of the
	// embedded FS layout (hunt 2026-07-11).
	staticHandler := http.StripPrefix("/static/", cacheControl(http.FileServerFS(staticFS)))
	mux.Handle("GET /static/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/") {
			http.NotFound(w, r)
			return
		}
		staticHandler.ServeHTTP(w, r)
	}))

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           logging(h.Middleware(mux)),
		ReadHeaderTimeout: 10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	go func() {
		log.Printf("pelangi-website (go) listening on :%s", port)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("server: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop
	log.Println("shutting down…")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("shutdown: %v", err)
	}
}

// logging is a minimal access-log middleware.
func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start).Round(time.Millisecond))
	})
}

// cacheControl sets a long-lived immutable cache header on hashed static assets.
func cacheControl(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		next.ServeHTTP(w, r)
	})
}
