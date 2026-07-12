package handlers

import (
	"net/http"
	"strings"

	"pelangi-website/internal/data"
)

const baseURL = "https://pelangicapsulehostel.com"

// aiCrawlers are explicitly allowed for GEO, ported from robots.ts AI_CRAWLERS.
var aiCrawlers = []string{
	"GPTBot", "OAI-SearchBot", "ClaudeBot", "anthropic-ai", "PerplexityBot",
	"Perplexity-User", "Applebot-Extended", "DuckAssistBot", "Amazonbot",
	"Google-Extended", "cohere-ai", "AI2Bot", "Bytespider", "FacebookBot",
	"meta-externalagent", "YouBot", "CCBot",
}

// wpDisallow: paths hidden from crawlers. Legacy /wp-* paths are deliberately
// NOT listed — the middleware answers them with 410 Gone, and crawlers must be
// able to fetch them to see the 410 and de-index the old WordPress spam.
var wpDisallow = []string{"/private/"}

// robots serves /robots.txt, ported from site/src/app/robots.ts.
func (h *Handler) robots(w http.ResponseWriter, r *http.Request) {
	var b strings.Builder
	for _, bot := range aiCrawlers {
		b.WriteString("User-agent: " + bot + "\nAllow: /\n\n")
	}
	b.WriteString("User-agent: *\nAllow: /\n")
	for _, d := range wpDisallow {
		b.WriteString("Disallow: " + d + "\n")
	}
	b.WriteString("\nSitemap: " + baseURL + "/sitemap.xml\n")
	b.WriteString("Sitemap: " + baseURL + "/image-sitemap.xml\n")

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	_, _ = w.Write([]byte(b.String()))
}

// sitemapEntry is one <url> in the sitemap.
type sitemapEntry struct {
	loc      string
	lastmod  string
	freq     string
	priority string
	images   []string
	// alt maps hreflang -> href for xhtml:link alternates.
	alt map[string]string
}

// lastModBase is the floor for static-route lastmod (bump on structural change).
const lastModBase = "2026-06-26"

// lastMod is the static-route lastmod: the newest blog content date, floored
// at lastModBase, so the sitemap freshens automatically with new posts.
var lastMod = func() string {
	if d := data.BlogNewestDate(); d > lastModBase {
		return d
	}
	return lastModBase
}()

// staticSitemap holds the non-blog routes, ported from sitemap.ts.
// TODO(port): append blog post + category entries once blog data is ported.
var staticSitemap = []sitemapEntry{
	{loc: baseURL, lastmod: lastMod, freq: "weekly", priority: "1.0", images: []string{baseURL + "/images/hero-final.png"}, alt: map[string]string{"en": baseURL, "zh-CN": baseURL + "/zh"}},
	{loc: baseURL + "/book", lastmod: lastMod, freq: "weekly", priority: "0.95"},
	{loc: baseURL + "/rooms", lastmod: lastMod, freq: "weekly", priority: "0.9", images: []string{
		baseURL + "/images/capsule-4.webp", baseURL + "/images/capsule-2.webp",
		baseURL + "/images/capsule-1.webp", baseURL + "/images/capsule-3.webp",
	}, alt: map[string]string{"en": baseURL + "/rooms", "zh-CN": baseURL + "/zh/rooms"}},
	{loc: baseURL + "/about", lastmod: lastMod, freq: "monthly", priority: "0.8", images: []string{baseURL + "/images/exterior.JPG"}, alt: map[string]string{"en": baseURL + "/about", "zh-CN": baseURL + "/zh/about"}},
	{loc: baseURL + "/gallery", lastmod: lastMod, freq: "monthly", priority: "0.8", images: []string{
		baseURL + "/images/living-room.jpeg", baseURL + "/images/capsule-1.webp", baseURL + "/images/entrance.jpeg",
		baseURL + "/images/exterior.JPG", baseURL + "/images/capsule-2.webp", baseURL + "/images/toilet.jpg",
		baseURL + "/images/facility-heater.jpg", baseURL + "/images/sink.jpg", baseURL + "/images/capsule-3.webp",
		baseURL + "/images/facility-shoes-rack.jpg", baseURL + "/images/facility-1.webp",
		baseURL + "/images/facility-2.webp", baseURL + "/images/facility-3.webp",
	}},
	{loc: baseURL + "/location", lastmod: lastMod, freq: "monthly", priority: "0.8", alt: map[string]string{"en": baseURL + "/location", "zh-CN": baseURL + "/zh/location"}},
	{loc: baseURL + "/contact", lastmod: lastMod, freq: "monthly", priority: "0.7"},
	{loc: baseURL + "/terms", lastmod: lastMod, freq: "yearly", priority: "0.3", alt: map[string]string{"en": baseURL + "/terms", "ms": baseURL + "/ms/terma"}},
	{loc: baseURL + "/ms/terma", lastmod: lastMod, freq: "yearly", priority: "0.3", alt: map[string]string{"en": baseURL + "/terms", "ms": baseURL + "/ms/terma"}},
	{loc: baseURL + "/check-in", lastmod: lastMod, freq: "monthly", priority: "0.7", alt: map[string]string{"en": baseURL + "/check-in", "zh-CN": baseURL + "/zh/check-in", "ms": baseURL + "/ms/check-in"}},
	{loc: baseURL + "/getting-here", lastmod: lastMod, freq: "monthly", priority: "0.8", alt: map[string]string{"en": baseURL + "/getting-here", "zh-CN": baseURL + "/zh/getting-here", "ms": baseURL + "/ms/getting-here"}},
	{loc: baseURL + "/guide", lastmod: lastMod, freq: "monthly", priority: "0.6", alt: map[string]string{"en": baseURL + "/guide", "zh-CN": baseURL + "/zh/guide", "ms": baseURL + "/ms/guide"}},
	{loc: baseURL + "/blog", lastmod: lastMod, freq: "weekly", priority: "0.8"},
	{loc: baseURL + "/amenities", lastmod: lastMod, freq: "monthly", priority: "0.8", alt: map[string]string{"en": baseURL + "/amenities", "zh-CN": baseURL + "/zh/amenities", "ms": baseURL + "/ms/amenities"}},
	{loc: baseURL + "/visit-malaysia-2026", lastmod: lastMod, freq: "monthly", priority: "0.85"},
	{loc: baseURL + "/johor-election-2026", lastmod: lastMod, freq: "weekly", priority: "0.85"},
	{loc: baseURL + "/visa-run", lastmod: lastMod, freq: "monthly", priority: "0.85"},
	{loc: baseURL + "/singapore-jobs", lastmod: lastMod, freq: "monthly", priority: "0.85"},
	{loc: baseURL + "/sitemap-html", lastmod: lastMod, freq: "monthly", priority: "0.3"},
	{loc: baseURL + "/zh", lastmod: lastMod, freq: "weekly", priority: "0.95", alt: map[string]string{"en": baseURL, "zh-CN": baseURL + "/zh"}},
	{loc: baseURL + "/zh/rooms", lastmod: lastMod, freq: "weekly", priority: "0.9", alt: map[string]string{"en": baseURL + "/rooms", "zh-CN": baseURL + "/zh/rooms"}},
	{loc: baseURL + "/zh/location", lastmod: lastMod, freq: "monthly", priority: "0.85", alt: map[string]string{"en": baseURL + "/location", "zh-CN": baseURL + "/zh/location"}},
	{loc: baseURL + "/zh/about", lastmod: lastMod, freq: "monthly", priority: "0.8", alt: map[string]string{"en": baseURL + "/about", "zh-CN": baseURL + "/zh/about"}},
	{loc: baseURL + "/zh/getting-here", lastmod: lastMod, freq: "monthly", priority: "0.85", alt: map[string]string{"en": baseURL + "/getting-here", "zh-CN": baseURL + "/zh/getting-here", "ms": baseURL + "/ms/getting-here"}},
	{loc: baseURL + "/ms/getting-here", lastmod: lastMod, freq: "monthly", priority: "0.85", alt: map[string]string{"en": baseURL + "/getting-here", "zh-CN": baseURL + "/zh/getting-here", "ms": baseURL + "/ms/getting-here"}},
	{loc: baseURL + "/zh/check-in", lastmod: lastMod, freq: "monthly", priority: "0.75", alt: map[string]string{"en": baseURL + "/check-in", "zh-CN": baseURL + "/zh/check-in", "ms": baseURL + "/ms/check-in"}},
	{loc: baseURL + "/ms/check-in", lastmod: lastMod, freq: "monthly", priority: "0.75", alt: map[string]string{"en": baseURL + "/check-in", "zh-CN": baseURL + "/zh/check-in", "ms": baseURL + "/ms/check-in"}},
	{loc: baseURL + "/zh/amenities", lastmod: lastMod, freq: "monthly", priority: "0.8", alt: map[string]string{"en": baseURL + "/amenities", "zh-CN": baseURL + "/zh/amenities", "ms": baseURL + "/ms/amenities"}},
	{loc: baseURL + "/ms/amenities", lastmod: lastMod, freq: "monthly", priority: "0.8", alt: map[string]string{"en": baseURL + "/amenities", "zh-CN": baseURL + "/zh/amenities", "ms": baseURL + "/ms/amenities"}},
	{loc: baseURL + "/zh/guide", lastmod: lastMod, freq: "monthly", priority: "0.6", alt: map[string]string{"en": baseURL + "/guide", "zh-CN": baseURL + "/zh/guide", "ms": baseURL + "/ms/guide"}},
	{loc: baseURL + "/ms/guide", lastmod: lastMod, freq: "monthly", priority: "0.6", alt: map[string]string{"en": baseURL + "/guide", "zh-CN": baseURL + "/zh/guide", "ms": baseURL + "/ms/guide"}},
}

// sitemap serves /sitemap.xml, ported from site/src/app/sitemap.ts.
func (h *Handler) sitemap(w http.ResponseWriter, r *http.Request) {
	var b strings.Builder
	b.WriteString(`<?xml version="1.0" encoding="UTF-8"?>` + "\n")
	b.WriteString(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">` + "\n")
	blogPosts := data.PublishedPosts()
	entries := make([]sitemapEntry, 0, len(staticSitemap)+len(blogPosts)+8)
	entries = append(entries, staticSitemap...)

	// Blog category entries (ported from sitemap.ts categoryEntries).
	for _, cat := range data.GetUniqueCategories() {
		entries = append(entries, sitemapEntry{
			loc:      baseURL + "/blog/category/" + data.CategoryToSlug(cat),
			lastmod:  lastMod,
			freq:     "weekly",
			priority: "0.65",
		})
	}
	// Blog post entries (ported from sitemap.ts blogPostEntries).
	for _, p := range blogPosts {
		lm := p.LastModified
		if lm == "" {
			lm = p.Date
		}
		e := sitemapEntry{
			loc:      baseURL + "/blog/" + p.Slug,
			lastmod:  lm,
			freq:     "monthly",
			priority: "0.7",
		}
		if p.FeaturedImage != "" {
			e.images = []string{baseURL + p.FeaturedImage}
		}
		entries = append(entries, e)
	}

	for _, e := range entries {
		b.WriteString("  <url>\n")
		b.WriteString("    <loc>" + xmlEscape(e.loc) + "</loc>\n")
		if e.lastmod != "" {
			b.WriteString("    <lastmod>" + e.lastmod + "</lastmod>\n")
		}
		if e.freq != "" {
			b.WriteString("    <changefreq>" + e.freq + "</changefreq>\n")
		}
		if e.priority != "" {
			b.WriteString("    <priority>" + e.priority + "</priority>\n")
		}
		for lang, href := range e.alt {
			b.WriteString(`    <xhtml:link rel="alternate" hreflang="` + lang + `" href="` + xmlEscape(href) + `"/>` + "\n")
		}
		for _, img := range e.images {
			b.WriteString("    <image:image><image:loc>" + xmlEscape(img) + "</image:loc></image:image>\n")
		}
		b.WriteString("  </url>\n")
	}
	b.WriteString("</urlset>\n")

	w.Header().Set("Content-Type", "application/xml; charset=utf-8")
	_, _ = w.Write([]byte(b.String()))
}

// ─── image-sitemap.xml — ported from app/image-sitemap.xml/route.ts ───

type imgEntry struct{ url, title, caption string }
type pageImages struct {
	page   string
	images []imgEntry
}

var staticImageData = []pageImages{
	{baseURL, []imgEntry{
		{baseURL + "/images/hero-main.webp", "Pelangi Capsule Hostel Johor Bahru — Modern Capsule Accommodation", "Welcome to Pelangi Capsule Hostel, affordable modern capsule pods near Singapore in Taman Pelangi, Johor Bahru."},
	}},
	{baseURL + "/rooms", []imgEntry{
		{baseURL + "/images/capsule-4.webp", "Standard Capsule Pod — Pelangi Capsule Hostel", "Comfortable standard capsule pod with USB charging and personal ventilation at Pelangi Capsule Hostel JB."},
		{baseURL + "/images/capsule-2.webp", "Premium Capsule Pod — Pelangi Capsule Hostel", "Premium capsule pod featuring a premium mattress, extra storage, and enhanced privacy for a restful stay in Johor Bahru."},
		{baseURL + "/images/capsule-1.webp", "Japanese-Style Capsule Pod Interior — Pelangi Capsule Hostel", "Japanese-inspired capsule pod interior with privacy features at budget-friendly Pelangi Hostel near Singapore."},
		{baseURL + "/images/capsule-3.webp", "Capsule Pod Amenities — Pelangi Capsule Hostel", "Capsule pod amenities including USB charging ports and personal ventilation at Pelangi Capsule Hostel Johor Bahru."},
	}},
	{baseURL + "/about", []imgEntry{
		{baseURL + "/images/exterior-1.webp", "Pelangi Capsule Hostel Building Exterior", "Exterior view of Pelangi Capsule Hostel located in Taman Pelangi, Johor Bahru, Malaysia — close to Singapore."},
	}},
	{baseURL + "/gallery", []imgEntry{
		{baseURL + "/images/living-room.jpeg", "Common Area and Living Room — Pelangi Capsule Hostel", "Cozy common area and living room at Pelangi Capsule Hostel Johor Bahru, perfect for socialising with fellow travellers."},
		{baseURL + "/images/capsule-1.webp", "Capsule Pod Interior — Pelangi Capsule Hostel", "Japanese-style capsule pod interior with privacy features at budget hostel JB."},
		{baseURL + "/images/entrance.jpeg", "Hostel Entrance — Pelangi Capsule Hostel Taman Pelangi", "Welcoming entrance of Pelangi Capsule Hostel in Taman Pelangi, Johor Bahru."},
		{baseURL + "/images/exterior.JPG", "Hostel Exterior — Pelangi Capsule Hostel Johor Bahru", "Pelangi Capsule Hostel building exterior in Johor Bahru, Malaysia."},
		{baseURL + "/images/capsule-2.webp", "Premium Capsule Pod Mattress — Pelangi Hostel JB", "Comfortable premium mattress in affordable hostel pod near Singapore."},
		{baseURL + "/images/toilet.jpg", "Clean Bathroom with Hot Shower — Pelangi Capsule Hostel", "Clean private bathroom with hot shower at Pelangi Hostel JB."},
		{baseURL + "/images/facility-heater.jpg", "Hot Water Heater Facility — Pelangi Capsule Hostel", "24/7 hot water heater facility at budget accommodation Johor Bahru."},
		{baseURL + "/images/sink.jpg", "Washing and Sink Area — Pelangi Capsule Hostel", "Washing and sink area at Pelangi Capsule Hostel Johor Bahru."},
		{baseURL + "/images/capsule-3.webp", "Capsule Pod USB Charging — Pelangi Capsule Hostel", "Capsule pod amenities including USB charging and personal ventilation at Pelangi Hostel."},
		{baseURL + "/images/facility-shoes-rack.jpg", "Shoe Storage — Pelangi Capsule Hostel Taman Pelangi", "Organized shoe storage at clean hostel in Taman Pelangi, Johor Bahru."},
		{baseURL + "/images/facility-1.webp", "Hostel Facilities — Pelangi Capsule Hostel", "Modern facilities at Pelangi Capsule Hostel Johor Bahru for a comfortable stay."},
		{baseURL + "/images/facility-2.webp", "Hostel Amenities — Pelangi Capsule Hostel", "Well-maintained amenities at Pelangi Capsule Hostel near Singapore."},
		{baseURL + "/images/facility-3.webp", "Hostel Common Facilities — Pelangi Capsule Hostel", "Shared facilities available to all guests at Pelangi Capsule Hostel JB."},
	}},
}

// imageSitemap serves /image-sitemap.xml.
func (h *Handler) imageSitemap(w http.ResponseWriter, r *http.Request) {
	blogPosts := data.PublishedPosts()
	pages := make([]pageImages, 0, len(staticImageData)+len(blogPosts))
	pages = append(pages, staticImageData...)
	for _, p := range blogPosts {
		img := p.FeaturedImage
		if !strings.HasPrefix(img, "http") {
			img = baseURL + img
		}
		caption := p.ImageAlt
		if caption == "" {
			caption = p.Excerpt
		}
		pages = append(pages, pageImages{
			page:   baseURL + "/blog/" + p.Slug,
			images: []imgEntry{{img, p.Title, caption}},
		})
	}

	var b strings.Builder
	b.WriteString(`<?xml version="1.0" encoding="UTF-8"?>` + "\n")
	b.WriteString(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` + "\n")
	b.WriteString(`        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`)
	for _, pg := range pages {
		b.WriteString("\n  <url>\n")
		b.WriteString("    <loc>" + xmlEscape(pg.page) + "</loc>\n")
		for i, img := range pg.images {
			if i > 0 {
				b.WriteString("\n    ")
			}
			b.WriteString("    <image:image>\n")
			b.WriteString("      <image:loc>" + xmlEscape(img.url) + "</image:loc>\n")
			b.WriteString("      <image:title>" + xmlEscape(img.title) + "</image:title>\n")
			b.WriteString("      <image:caption>" + xmlEscape(img.caption) + "</image:caption>\n")
			b.WriteString("    </image:image>")
		}
		b.WriteString("\n  </url>")
	}
	b.WriteString("\n</urlset>")

	w.Header().Set("Content-Type", "application/xml")
	w.Header().Set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
	_, _ = w.Write([]byte(b.String()))
}

// llmsTxt serves /llms.txt, ported from site/src/app/llms.txt/route.ts.
func (h *Handler) llmsTxt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
	_, _ = w.Write([]byte(data.LLMsTxt()))
}

// llmsFull serves /llms-full.txt, ported from site/src/app/llms-full.txt/route.ts.
func (h *Handler) llmsFull(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
	_, _ = w.Write([]byte(data.LLMsFull()))
}

func xmlEscape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}
