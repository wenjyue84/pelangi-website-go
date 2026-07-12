// Package handlers wires HTTP routes to template rendering and the JSON API.
package handlers

import (
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"pelangi-website/internal/data"
	"pelangi-website/internal/gbp"
	"pelangi-website/internal/render"
)

// Handler carries shared dependencies for all routes.
type Handler struct {
	r         *render.Renderer
	gtmID     string
	publicDir string // on-disk dir for large public assets (images, llms.txt, etc.)
	gbp       *gbp.Service
}

// New constructs a Handler. publicDir is the directory of non-embedded public
// assets (defaults handled by the caller); empty disables disk asset serving.
func New(r *render.Renderer, publicDir string, gbpSvc *gbp.Service) *Handler {
	return &Handler{
		r:         r,
		gtmID:     os.Getenv("NEXT_PUBLIC_GTM_ID"),
		publicDir: publicDir,
		gbp:       gbpSvc,
	}
}

// Register attaches all routes to the mux. Method+path patterns require Go 1.22+.
func (h *Handler) Register(mux *http.ServeMux) {
	mux.HandleFunc("GET /{$}", h.home)
	mux.HandleFunc("GET /healthz", h.health)

	// SEO / generated text routes
	mux.HandleFunc("GET /robots.txt", h.robots)
	mux.HandleFunc("GET /sitemap.xml", h.sitemap)
	mux.HandleFunc("GET /image-sitemap.xml", h.imageSitemap)
	mux.HandleFunc("GET /llms.txt", h.llmsTxt)
	mux.HandleFunc("GET /llms-full.txt", h.llmsFull)
	mux.HandleFunc("GET /feed.xml", h.feedXML)
	mux.HandleFunc("GET /feed.json", h.feedJSON)
	mux.HandleFunc("GET /manifest.webmanifest", h.manifest)
	mux.HandleFunc("GET /.well-known/security.txt", h.securityTxt)
	mux.HandleFunc("GET /sw.js", h.serviceWorker)

	// JSON API
	mux.HandleFunc("GET /api/ari", h.ari)
	mux.HandleFunc("POST /api/revalidate", h.revalidate)
	mux.HandleFunc("GET /api/kb", h.kb)
	mux.HandleFunc("POST /api/contact", h.contactSubmit)
	mux.HandleFunc("POST /api/create-payment-intent", h.createPaymentIntent)
	mux.HandleFunc("POST /api/stripe-webhook", h.stripeWebhook)
	mux.HandleFunc("POST /api/meta-events", h.metaEvents)
	mux.HandleFunc("POST /api/tiktok-events", h.tiktokEvents)
	mux.HandleFunc("POST /api/webhooks/beds24", h.beds24Webhook)
	mux.HandleFunc("GET /api/bookings/sync", h.bookingsSyncGet)
	mux.HandleFunc("POST /api/bookings/sync", h.bookingsSyncPost)
	mux.HandleFunc("GET /api/mcp", h.mcpGet)
	mux.HandleFunc("POST /api/mcp", h.mcpPost)

	// Reverse proxies (booking SPA, public booking API, webchat) — replaces
	// the Next.js next.config.ts rewrites.
	h.registerProxies(mux)

	// Self-registered content pages (page_*.go files via init()).
	for _, reg := range pageRegistrations {
		reg(h, mux)
	}

	// Catch-all: serve public assets from disk (images, llms.txt, favicon,
	// opensearch.xml, …) or render the 404 page. Registered for all methods
	// (least specific) so it never conflicts with the method-scoped proxy
	// prefixes like "/book/" under Go 1.22 ServeMux precedence rules.
	mux.HandleFunc("/", h.catchAll)
}

// catchAll serves a file from publicDir if it exists, else a 404.
func (h *Handler) catchAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	if h.publicDir != "" {
		clean := path.Clean(r.URL.Path)
		if clean != "/" && !strings.Contains(clean, "..") {
			fp := filepath.Join(h.publicDir, filepath.FromSlash(clean))
			if info, err := os.Stat(fp); err == nil && !info.IsDir() {
				http.ServeFile(w, r, fp)
				return
			}
		}
	}
	h.notFound(w, r)
}

// notFound renders the 404 page (ported from not-found.tsx).
func (h *Handler) notFound(w http.ResponseWriter, r *http.Request) {
	p := h.base("Page Not Found | Pelangi Capsule Hostel", "The page you're looking for doesn't exist.", baseURL, "en", enNav)
	p.NoIndex = true
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusNotFound)
	if err := h.r.Render(w, "notfound.html", p); err != nil {
		_, _ = w.Write([]byte("Page not found"))
	}
}

// NavLink is one navigation entry.
type NavLink struct {
	Href  string
	Label string
}

// enNav/zhNav/msNav are the per-locale primary navigations, ported from
// Header.tsx NAV_LINKS.
var enNav = []NavLink{
	{"/about", "About"},
	{"/rooms", "Rooms"},
	{"/#destinations", "Destinations"},
	{"/gallery", "Gallery"},
	{"/blog", "Blog"},
	{"/#community", "Community"},
	{"/contact", "Location"},
	{"/check-in", "Check-in Guide"},
}

var zhNav = []NavLink{
	{"/zh/about", "关于我们"},
	{"/zh/rooms", "房型"},
	{"/zh#destinations", "周边景点"},
	{"/gallery", "相册"},
	{"/blog", "博客"},
	{"/zh#community", "社区"},
	{"/zh/location", "位置"},
	{"/check-in", "入住指南"},
}

var msNav = []NavLink{
	{"/about", "Tentang"},
	{"/rooms", "Bilik"},
	{"/#destinations", "Destinasi"},
	{"/gallery", "Galeri"},
	{"/blog", "Blog"},
	{"/#community", "Komuniti"},
	{"/contact", "Lokasi"},
	{"/check-in", "Panduan Daftar Masuk"},
}

// BasePage holds fields the base layout + shared partials need on every page.
type BasePage struct {
	Title       string
	Description string
	Canonical   string
	GTMID       string
	Lang        string
	NavLinks    []NavLink
	Year        int
	NoIndex     bool // when true, emit <meta name="robots" content="noindex, nofollow">
	// Open Graph overrides. base() fills website/og-image defaults; article
	// pages (blog posts) override OGType/OGImage and set the timestamps.
	OGType      string // "website" | "article"
	OGImage     string // absolute URL
	OGPublished string // article:published_time (blog posts only)
	OGModified  string // article:modified_time (blog posts only)
	// hreflang alternates for en↔zh page pairs; emitted only when both set.
	AltEN string
	AltZH string
	// Site-wide announcement banner (empty = no banner). BannerID keys the
	// localStorage dismissal so a new campaign re-shows the banner.
	BannerHTML string
	BannerID   string
	// Analytics config injected to the client (consent-gated init in analytics.js).
	MetaPixelID   string
	TikTokPixelID string
	SentryDSN     string
	ClarityID     string
	GA            string
}

// HomePage is the view model for the homepage.
type HomePage struct {
	BasePage
	ViewerCount int
	Rooms       []data.RoomType
}

const homeDescription = "Experience Japanese-style capsule accommodation in Taman Pelangi, Johor Bahru. " +
	"Budget-friendly hostel from RM30/night with free WiFi, 24/7 access, hot showers, and personal lockers. " +
	"Perfect base for Singapore day trips - just 30 minutes from the border."

func (h *Handler) base(title, description, canonical, lang string, nav []NavLink) BasePage {
	banner, bannerID := activeBanner()
	return BasePage{
		Title:         title,
		Description:   description,
		Canonical:     canonical,
		GTMID:         h.gtmID,
		Lang:          lang,
		NavLinks:      nav,
		Year:          time.Now().Year(),
		OGType:        "website",
		OGImage:       "https://pelangicapsulehostel.com/images/og-image.png",
		BannerHTML:    banner,
		BannerID:      bannerID,
		MetaPixelID:   os.Getenv("NEXT_PUBLIC_FACEBOOK_PIXEL_ID"),
		TikTokPixelID: os.Getenv("NEXT_PUBLIC_TIKTOK_PIXEL_ID"),
		SentryDSN:     os.Getenv("NEXT_PUBLIC_SENTRY_DSN"),
		ClarityID:     os.Getenv("NEXT_PUBLIC_CLARITY_PROJECT_ID"),
		GA:            os.Getenv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
	}
}

// mytZone is Malaysia time; announcement expiry is evaluated against it so the
// banner disappears at local midnight regardless of server timezone.
var mytZone = time.FixedZone("MYT", 8*60*60)

// activeBanner returns the current site-wide announcement, or "" when none.
// Johor state election notice — auto-expires after 2026-07-12 (no cleanup
// deploy needed; post-election Causeway rush ends that weekend).
func activeBanner() (html, id string) {
	if time.Now().In(mytZone).Format("2006-01-02") > "2026-07-12" {
		return "", ""
	}
	return `🗳️ <strong>Johor State Election — Sat 11 July 2026</strong> is a Johor public holiday. Expect heavy Causeway traffic 10–12 July; the hostel operates as usual. <a href="/johor-election-2026" class="underline font-semibold whitespace-nowrap hover:opacity-80">Traveller guide →</a>`,
		"johor-election-2026"
}

func (h *Handler) home(w http.ResponseWriter, r *http.Request) {
	p := HomePage{
		BasePage: h.base(
			"Pelangi Capsule Hostel | Budget Accommodation in Johor Bahru",
			homeDescription,
			"https://pelangicapsulehostel.com",
			"en",
			enNav,
		),
		ViewerCount: socialProofCount(),
		Rooms:       data.RoomTypes,
	}
	p.AltEN = baseURL
	p.AltZH = baseURL + "/zh"
	h.renderPage(w, "home.html", p)
}

func (h *Handler) health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	_, _ = w.Write([]byte("ok"))
}

// renderPage writes an HTML page, logging and 500-ing on template errors.
func (h *Handler) renderPage(w http.ResponseWriter, page string, data any) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if err := h.r.Render(w, page, data); err != nil {
		log.Printf("render %s: %v", page, err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

// socialProofCount deterministically derives the "N guests checked availability
// today" figure, ported from Hero.tsx getSocialProofCount (range 7–25).
func socialProofCount() int {
	now := time.Now().UTC()
	seed := now.Year()*10000 + (int(now.Month()))*100 + now.Day()
	hourBucket := now.Hour() / 4
	return ((seed*31 + hourBucket*17) % 19) + 7
}
