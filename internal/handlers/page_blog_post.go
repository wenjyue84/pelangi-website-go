package handlers

import (
	"encoding/json"
	"net/http"
	"regexp"
	"strings"

	"pelangi-website/internal/data"
)

// asciiTagRE matches tags that have an archive page at /blog/tag/{tag}.
// Mirrors TAG_RE = /^[a-z0-9-]+$/ in blog/tag/[tag]/page.tsx.
var asciiTagRE = regexp.MustCompile(`^[a-z0-9-]+$`)

// BlogTagItem represents one tag on a post, with link-eligibility pre-computed.
type BlogTagItem struct {
	Tag    string
	Linked bool // true ⟹ tag matches asciiTagRE; render as <a href="/blog/tag/...">
}

// BlogPostPage is the view model for GET /blog/{slug}.
type BlogPostPage struct {
	BasePage
	Post           data.BlogPost
	RelatedPosts   []BlogListCard
	TagItems       []BlogTagItem
	IsZh           bool   // true for Chinese-language posts
	FormattedDate  string // "2 January 2006"
	StructuredJSON string // BlogPosting JSON-LD (safeHTML)
	BreadcrumbJSON string // BreadcrumbList JSON-LD (safeHTML)
}

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		// Go 1.22 ServeMux: /blog/category/{category} and /blog/tag/{tag} are
		// registered as more-specific patterns and take precedence over this wildcard.
		mux.HandleFunc("GET /blog/{slug}", h.blogPost)
	})
}

func (h *Handler) blogPost(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	post := data.GetPostBySlug(slug)
	if post == nil {
		h.notFound(w, r)
		return
	}

	isZh := blogContainsCJK(post.Title)
	lang := "en"
	if isZh {
		lang = "zh"
	}

	// Pre-classify tags: ASCII-kebab ones link to /blog/tag/{tag}.
	tagItems := make([]BlogTagItem, len(post.Tags))
	for i, t := range post.Tags {
		tagItems[i] = BlogTagItem{Tag: t, Linked: asciiTagRE.MatchString(t)}
	}

	// Related posts (up to 3), same-category first.
	related := data.GetRelatedPosts(slug, 3)
	relatedCards := make([]BlogListCard, len(related))
	for i, rp := range related {
		relatedCards[i] = BlogListCard{BlogPost: rp, FormattedDate: blogFormatShort(rp.Date)}
	}

	canonical := "https://pelangicapsulehostel.com/blog/" + post.Slug

	// OG / structured-data image — must be an absolute URL.
	ogImage := post.FeaturedImage
	if ogImage == "" {
		ogImage = "https://pelangicapsulehostel.com/images/og-image.png"
	} else if !strings.HasPrefix(ogImage, "http") {
		ogImage = "https://pelangicapsulehostel.com" + ogImage
	}

	// inLanguage: explicit field wins, else auto-detect from CJK chars in title.
	inLanguage := post.InLanguage
	if inLanguage == "" {
		if isZh {
			inLanguage = "zh-CN"
		} else {
			inLanguage = "en"
		}
	}
	lastModified := post.LastModified
	if lastModified == "" {
		lastModified = post.Date
	}
	imageDesc := post.ImageAlt
	if imageDesc == "" {
		imageDesc = post.Title
	}

	// BlogPosting JSON-LD — mirrors BlogStructuredData.tsx blogPostingSchema.
	blogPosting := map[string]any{
		"@context":      "https://schema.org",
		"@type":         "BlogPosting",
		"headline":      post.Title,
		"description":   post.Excerpt,
		"inLanguage":    inLanguage,
		"datePublished": post.Date,
		"dateModified":  lastModified,
		"author":        blogBuildAuthor(post.Author),
		"publisher": map[string]any{
			"@type": "Organization",
			"@id":   "https://pelangicapsulehostel.com/#organization",
			"name":  "Pelangi Capsule Hostel",
			"logo": map[string]string{
				"@type": "ImageObject",
				"url":   "https://pelangicapsulehostel.com/images/logo.png",
			},
		},
		"image": map[string]string{
			"@type":       "ImageObject",
			"url":         ogImage,
			"description": imageDesc,
		},
		"url":            canonical,
		"wordCount":      data.WordCount(post.Content),
		"articleSection": post.Category,
		"mainEntityOfPage": map[string]string{
			"@type": "WebPage",
			"@id":   canonical,
		},
		"speakable": map[string]any{
			"@type":       "SpeakableSpecification",
			"cssSelector": []string{"#post-title"},
		},
	}

	// BreadcrumbList JSON-LD — mirrors breadcrumbSchema in BlogStructuredData.tsx.
	breadcrumb := map[string]any{
		"@context": "https://schema.org",
		"@type":    "BreadcrumbList",
		"itemListElement": []map[string]any{
			{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pelangicapsulehostel.com"},
			{"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://pelangicapsulehostel.com/blog"},
			{"@type": "ListItem", "position": 3, "name": post.Title, "item": canonical},
		},
	}

	sj, _ := json.Marshal(blogPosting)
	bj, _ := json.Marshal(breadcrumb)

	bp := h.base(
		post.Title,
		post.Excerpt,
		canonical,
		lang,
		enNav,
	)
	bp.OGType = "article"
	bp.OGImage = ogImage
	bp.OGPublished = post.Date
	bp.OGModified = lastModified

	p := BlogPostPage{
		BasePage: bp,
		Post:           *post,
		RelatedPosts:   relatedCards,
		TagItems:       tagItems,
		IsZh:           isZh,
		FormattedDate:  blogFormatLong(post.Date),
		StructuredJSON: string(sj),
		BreadcrumbJSON: string(bj),
	}
	h.renderPage(w, "blogPost.html", p)
}

// blogBuildAuthor mirrors buildAuthor() in BlogStructuredData.tsx.
// "Jay Lew" resolves to the canonical Person entity; all other bylines resolve
// to the Organisation entity, preserving E-E-A-T signal consolidation.
func blogBuildAuthor(authorName string) map[string]any {
	if authorName == "Jay Lew" {
		return map[string]any{
			"@type":    "Person",
			"@id":      "https://pelangicapsulehostel.com/author/jay-lew#person",
			"name":     "Jay Lew",
			"jobTitle": "Co-Founder & Hostel Owner",
			"worksFor": map[string]any{
				"@type": "Organization",
				"@id":   "https://pelangicapsulehostel.com/#organization",
				"name":  "Pelangi Capsule Hostel",
				"url":   "https://pelangicapsulehostel.com",
			},
			"url": "https://pelangicapsulehostel.com/author/jay-lew",
			"sameAs": []string{
				"https://www.facebook.com/pelangicapsulehostel",
				"https://www.instagram.com/pelangicapsulehostel",
			},
		}
	}
	return map[string]any{
		"@type": "Organization",
		"@id":   "https://pelangicapsulehostel.com/#organization",
		"name":  authorName,
		"url":   "https://pelangicapsulehostel.com",
	}
}

// blogContainsCJK reports whether s contains any CJK Unified Ideograph (U+4E00–U+9FFF).
// Mirrors /[一-鿿]/.test(title) in the Next.js source.
func blogContainsCJK(s string) bool {
	for _, r := range s {
		if r >= 0x4E00 && r <= 0x9FFF {
			return true
		}
	}
	return false
}
