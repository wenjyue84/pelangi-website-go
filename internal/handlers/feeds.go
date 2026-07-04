package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"pelangi-website/internal/data"
)

// parseDate parses a YYYY-MM-DD post date as UTC midnight.
func parseDate(s string) time.Time {
	t, err := time.Parse("2006-01-02", s)
	if err != nil {
		return time.Time{}
	}
	return t.UTC()
}

func absImage(img string) string {
	if strings.HasPrefix(img, "http") {
		return img
	}
	return baseURL + img
}

// ─── feed.json (JSON Feed 1.1) — ported from app/feed.json/route.ts ───

type jfAuthor struct {
	Name string `json:"name"`
	URL  string `json:"url,omitempty"`
}

type jfItem struct {
	ID            string     `json:"id"`
	URL           string     `json:"url"`
	Title         string     `json:"title"`
	ContentHTML   string     `json:"content_html"`
	Summary       string     `json:"summary"`
	DatePublished string     `json:"date_published"`
	Authors       []jfAuthor `json:"authors"`
	Tags          []string   `json:"tags"`
	Language      string     `json:"language"`
	Image         string     `json:"image"`
}

type jsonFeed struct {
	Version     string     `json:"version"`
	Title       string     `json:"title"`
	HomePageURL string     `json:"home_page_url"`
	FeedURL     string     `json:"feed_url"`
	Description string     `json:"description"`
	Language    string     `json:"language"`
	Authors     []jfAuthor `json:"authors"`
	Items       []jfItem   `json:"items"`
}

func (h *Handler) feedJSON(w http.ResponseWriter, r *http.Request) {
	posts := data.PostsNewestFirst()
	if len(posts) > 10 {
		posts = posts[:10]
	}
	items := make([]jfItem, 0, len(posts))
	for _, p := range posts {
		items = append(items, jfItem{
			ID:            baseURL + "/blog/" + p.Slug,
			URL:           baseURL + "/blog/" + p.Slug,
			Title:         p.Title,
			ContentHTML:   p.Content,
			Summary:       p.Excerpt,
			DatePublished: parseDate(p.Date).Format("2006-01-02T15:04:05.000Z"),
			Authors:       []jfAuthor{{Name: p.Author}},
			Tags:          p.Tags,
			Language:      "en",
			Image:         absImage(p.FeaturedImage),
		})
	}
	feed := jsonFeed{
		Version:     "https://jsonfeed.org/version/1.1",
		Title:       "Pelangi Capsule Hostel Blog",
		HomePageURL: baseURL,
		FeedURL:     baseURL + "/feed.json",
		Description: "Travel tips, guides, and stories for budget backpackers visiting Johor Bahru and Singapore",
		Language:    "en",
		Authors:     []jfAuthor{{Name: "Pelangi Team", URL: baseURL}},
		Items:       items,
	}

	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	enc.SetEscapeHTML(false)
	enc.SetIndent("", "  ")
	_ = enc.Encode(feed)

	w.Header().Set("Content-Type", "application/feed+json; charset=utf-8")
	w.Header().Set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
	_, _ = w.Write(bytes.TrimRight(buf.Bytes(), "\n"))
}

// ─── feed.xml (RSS 2.0) — ported from app/feed.xml/route.ts ───

func escapeXMLFeed(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, `"`, "&quot;")
	s = strings.ReplaceAll(s, "'", "&apos;")
	return s
}

func (h *Handler) feedXML(w http.ResponseWriter, r *http.Request) {
	posts := data.PostsNewestFirst()
	var b strings.Builder
	b.WriteString(`<?xml version="1.0" encoding="UTF-8"?>` + "\n")
	b.WriteString(`<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">` + "\n")
	b.WriteString("  <channel>\n")
	b.WriteString("    <title>Pelangi Capsule Hostel Blog</title>\n")
	b.WriteString("    <link>" + baseURL + "</link>\n")
	b.WriteString("    <description>Travel tips, guides, and stories for budget backpackers visiting Johor Bahru and Singapore</description>\n")
	b.WriteString("    <language>en-us</language>\n")
	b.WriteString("    <lastBuildDate>" + time.Now().UTC().Format("Mon, 02 Jan 2006 15:04:05 GMT") + "</lastBuildDate>")
	for _, p := range posts {
		pub := parseDate(p.Date).Format("Mon, 02 Jan 2006 15:04:05 GMT")
		b.WriteString("\n    <item>\n")
		b.WriteString("      <title>" + escapeXMLFeed(p.Title) + "</title>\n")
		b.WriteString("      <link>" + baseURL + "/blog/" + p.Slug + "</link>\n")
		b.WriteString("      <description>" + escapeXMLFeed(p.Excerpt) + "</description>\n")
		b.WriteString("      <pubDate>" + pub + "</pubDate>\n")
		b.WriteString("      <category>" + escapeXMLFeed(p.Category) + "</category>\n")
		b.WriteString(`      <guid isPermaLink="true">` + baseURL + "/blog/" + p.Slug + "</guid>\n")
		b.WriteString("      <content:encoded><![CDATA[" + p.Content + "]]></content:encoded>\n")
		b.WriteString("    </item>\n    ")
	}
	b.WriteString("\n  </channel>\n</rss>")

	w.Header().Set("Content-Type", "application/xml")
	w.Header().Set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
	_, _ = w.Write([]byte(b.String()))
}

// ─── manifest.webmanifest — ported from app/manifest.ts ───

const webManifest = `{
  "name": "Pelangi Capsule Hostel",
  "short_name": "Pelangi",
  "description": "Japanese-style capsule accommodation in Johor Bahru from RM30/night. Free WiFi, 24/7 access, hot showers.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#fafaf9",
  "theme_color": "#fafaf9",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-192-maskable.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "screenshots": [
    { "src": "/images/screenshots/screenshot-narrow.webp", "sizes": "1080x2400", "type": "image/webp", "form_factor": "narrow", "label": "Pelangi Capsule Hostel — Home page on mobile" },
    { "src": "/images/screenshots/screenshot-wide.webp", "sizes": "2560x1600", "type": "image/webp", "form_factor": "wide", "label": "Pelangi Capsule Hostel — Home page on desktop" }
  ],
  "share_target": { "action": "/shared", "method": "GET", "params": { "title": "title", "text": "text", "url": "url" } }
}`

func (h *Handler) manifest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/manifest+json; charset=utf-8")
	w.Header().Set("Cache-Control", "public, max-age=3600")
	_, _ = w.Write([]byte(webManifest))
}

// ─── /.well-known/security.txt — ported from app/.well-known/security.txt/route.ts ───

const securityTxt = `Contact: mailto:pelangicapsule@gmail.com
Contact: https://wa.me/60127088789
Expires: 2027-03-13T00:00:00.000Z
Preferred-Languages: en, ms
Canonical: https://pelangicapsulehostel.com/.well-known/security.txt
`

func (h *Handler) securityTxt(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
	_, _ = w.Write([]byte(securityTxt))
}
