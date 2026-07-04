package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"pelangi-website/internal/data"
)

// BlogTagPage is the view model for GET /blog/tag/{tag}.
type BlogTagPage struct {
	BasePage
	Posts          []BlogListCard
	Tag            string
	PostCount      int
	BreadcrumbJSON string
}

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		// More specific than /blog/{slug} — Go 1.22 ServeMux prefers this pattern
		// for paths like /blog/tag/johor-bahru.
		mux.HandleFunc("GET /blog/tag/{tag}", h.blogTag)
	})
}

func (h *Handler) blogTag(w http.ResponseWriter, r *http.Request) {
	tag := r.PathValue("tag")

	// Only ASCII-kebab tags get archive pages; Chinese tags are excluded.
	// Mirrors TAG_RE check + filteredPosts.length === 0 guard in tag/[tag]/page.tsx.
	if !asciiTagRE.MatchString(tag) {
		h.notFound(w, r)
		return
	}

	posts := data.GetPostsByTag(tag)
	if len(posts) == 0 {
		h.notFound(w, r)
		return
	}

	cards := blogSortNewestFirst(posts)

	desc := fmt.Sprintf(
		`Every Pelangi Capsule Hostel blog article tagged "%s" — Johor Bahru travel, food, transport, and backpacker tips.`,
		tag,
	)
	canonical := "https://pelangicapsulehostel.com/blog/tag/" + tag

	breadcrumb := map[string]any{
		"@context": "https://schema.org",
		"@type":    "BreadcrumbList",
		"itemListElement": []map[string]any{
			{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pelangicapsulehostel.com"},
			{"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://pelangicapsulehostel.com/blog"},
			{"@type": "ListItem", "position": 3, "name": "#" + tag, "item": canonical},
		},
	}
	bj, _ := json.Marshal(breadcrumb)

	p := BlogTagPage{
		BasePage: h.base(
			"#"+tag+" — JB Travel Blog | Pelangi Capsule Hostel",
			desc,
			canonical,
			"en",
			enNav,
		),
		Posts:          cards,
		Tag:            tag,
		PostCount:      len(cards),
		BreadcrumbJSON: string(bj),
	}
	h.renderPage(w, "blogTag.html", p)
}
