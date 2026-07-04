package handlers

import (
	"encoding/json"
	"net/http"
	"sort"
	"time"

	"pelangi-website/internal/data"
)

// BlogListCard wraps a BlogPost with a pre-formatted short date for templates.
type BlogListCard struct {
	data.BlogPost
	FormattedDate string // e.g. "20 Feb 2026"
}

// CategoryLink pairs a category display label with its URL slug.
type CategoryLink struct {
	Label string
	Slug  string
}

// BlogListPage is the view model for GET /blog.
type BlogListPage struct {
	BasePage
	Posts          []BlogListCard
	CategoryLinks  []CategoryLink // unique categories (excludes "All")
	BreadcrumbJSON string
	CollectionJSON string
}

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /blog", h.blogList)
	})
}

func (h *Handler) blogList(w http.ResponseWriter, r *http.Request) {
	posts := data.PostsNewestFirst()
	cards := make([]BlogListCard, len(posts))
	for i, p := range posts {
		cards[i] = BlogListCard{BlogPost: p, FormattedDate: blogFormatShort(p.Date)}
	}

	cats := data.GetUniqueCategories()
	catLinks := make([]CategoryLink, len(cats))
	for i, c := range cats {
		catLinks[i] = CategoryLink{Label: c, Slug: data.CategoryToSlug(c)}
	}

	// BreadcrumbList JSON-LD — mirrors blogBreadcrumbSchema in blog/page.tsx
	breadcrumb := map[string]any{
		"@context": "https://schema.org",
		"@type":    "BreadcrumbList",
		"itemListElement": []map[string]any{
			{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pelangicapsulehostel.com"},
			{"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://pelangicapsulehostel.com/blog"},
		},
	}

	// CollectionPage + ItemList JSON-LD — mirrors blogCollectionSchema in blog/page.tsx
	items := make([]map[string]any, len(posts))
	for i, p := range posts {
		items[i] = map[string]any{
			"@type":    "ListItem",
			"position": i + 1,
			"url":      "https://pelangicapsulehostel.com/blog/" + p.Slug,
			"name":     p.Title,
		}
	}
	collection := map[string]any{
		"@context":    "https://schema.org",
		"@type":       "CollectionPage",
		"@id":         "https://pelangicapsulehostel.com/blog#collection",
		"name":        "JB Travel Blog | Tips & Guides for Backpackers",
		"description": "Backpacker guides, food tips, day trip ideas, and local secrets for Johor Bahru. Written by the team at Pelangi Capsule Hostel.",
		"url":         "https://pelangicapsulehostel.com/blog",
		"isPartOf":    map[string]string{"@id": "https://pelangicapsulehostel.com/#website"},
		"mainEntity": map[string]any{
			"@type":           "ItemList",
			"numberOfItems":   len(posts),
			"itemListElement": items,
		},
	}

	bj, _ := json.Marshal(breadcrumb)
	cj, _ := json.Marshal(collection)

	p := BlogListPage{
		BasePage: h.base(
			"JB Travel Blog | Tips & Guides for Backpackers",
			"Backpacker guides, food tips, day trip ideas, and local secrets for Johor Bahru. Written by the team at Pelangi Capsule Hostel.",
			"https://pelangicapsulehostel.com/blog",
			"en",
			enNav,
		),
		Posts:          cards,
		CategoryLinks:  catLinks,
		BreadcrumbJSON: string(bj),
		CollectionJSON: string(cj),
	}
	h.renderPage(w, "blog.html", p)
}

// blogFormatShort formats an ISO date "2006-01-02" as "2 Jan 2006".
// Matches toLocaleDateString("en-MY", { day:"numeric", month:"short", year:"numeric" }).
func blogFormatShort(iso string) string {
	t, err := time.Parse("2006-01-02", iso)
	if err != nil {
		return iso
	}
	return t.Format("2 Jan 2006")
}

// blogFormatLong formats an ISO date "2006-01-02" as "2 January 2006".
// Matches toLocaleDateString("en-MY", { day:"numeric", month:"long", year:"numeric" }).
func blogFormatLong(iso string) string {
	t, err := time.Parse("2006-01-02", iso)
	if err != nil {
		return iso
	}
	return t.Format("2 January 2006")
}

// blogSortNewestFirst copies posts, sorts by Date descending, and wraps each
// in a BlogListCard with a pre-formatted short date. ISO dates sort correctly
// as plain strings (lexicographic == chronological).
func blogSortNewestFirst(posts []data.BlogPost) []BlogListCard {
	sorted := make([]data.BlogPost, len(posts))
	copy(sorted, posts)
	sort.SliceStable(sorted, func(i, j int) bool {
		return sorted[i].Date > sorted[j].Date
	})
	cards := make([]BlogListCard, len(sorted))
	for i, p := range sorted {
		cards[i] = BlogListCard{BlogPost: p, FormattedDate: blogFormatShort(p.Date)}
	}
	return cards
}
