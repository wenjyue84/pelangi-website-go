package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"pelangi-website/internal/data"
)

// BlogCategoryPage is the view model for GET /blog/category/{category}.
type BlogCategoryPage struct {
	BasePage
	Posts          []BlogListCard
	CategoryLabel  string // e.g. "Food & Drink"
	CategorySlug   string // e.g. "food-drink"
	PostCount      int
	BreadcrumbJSON string
}

// blogCategoryDescriptions mirrors the descriptions Record in category/[category]/page.tsx.
var blogCategoryDescriptions = map[string]string{
	"Food & Drink": "JB food guides, hawker recommendations, and budget eating tips for backpackers in Johor Bahru.",
	"Travel Tips":  "Practical travel tips for visiting Johor Bahru — border crossing, transport, money-saving hacks, and more.",
	"Things To Do": "The best things to do in Johor Bahru — attractions, activities, and local experiences for every budget.",
	"Local Life":   "Discover the real Johor Bahru — local culture, neighbourhoods, and daily life as seen through local eyes.",
}

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		// More specific than /blog/{slug} — Go 1.22 ServeMux prefers this pattern
		// for paths like /blog/category/food-drink.
		mux.HandleFunc("GET /blog/category/{category}", h.blogCategory)
	})
}

func (h *Handler) blogCategory(w http.ResponseWriter, r *http.Request) {
	catSlug := r.PathValue("category")
	categoryLabel := data.SlugToCategory(catSlug)
	if categoryLabel == "" {
		h.notFound(w, r)
		return
	}

	cards := blogSortNewestFirst(data.GetPostsByCategory(categoryLabel))

	desc, ok := blogCategoryDescriptions[categoryLabel]
	if !ok {
		desc = fmt.Sprintf("Browse all %s articles from the Pelangi Capsule Hostel blog.", categoryLabel)
	}

	canonical := "https://pelangicapsulehostel.com/blog/category/" + catSlug

	breadcrumb := map[string]any{
		"@context": "https://schema.org",
		"@type":    "BreadcrumbList",
		"itemListElement": []map[string]any{
			{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pelangicapsulehostel.com"},
			{"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://pelangicapsulehostel.com/blog"},
			{"@type": "ListItem", "position": 3, "name": categoryLabel, "item": canonical},
		},
	}
	bj, _ := json.Marshal(breadcrumb)

	p := BlogCategoryPage{
		BasePage: h.base(
			categoryLabel+" | JB Travel Blog | Pelangi Capsule Hostel",
			desc,
			canonical,
			"en",
			enNav,
		),
		Posts:          cards,
		CategoryLabel:  categoryLabel,
		CategorySlug:   catSlug,
		PostCount:      len(cards),
		BreadcrumbJSON: string(bj),
	}
	h.renderPage(w, "blogCategory.html", p)
}
