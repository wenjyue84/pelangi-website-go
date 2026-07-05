package data

import (
	"sort"
	"strings"
)

// Additional blog helpers. The core helpers — CategoryToSlug, SlugToCategory,
// GetUniqueCategories, GetPostBySlug, BlogNewestDate, BlogListMarkdown — are
// defined in blog.go (generated alongside the post data); these complement them.

// GetPostsByCategory returns all posts in the given category.
func GetPostsByCategory(category string) []BlogPost {
	var out []BlogPost
	for _, p := range PublishedPosts() {
		if p.Category == category {
			out = append(out, p)
		}
	}
	return out
}

// GetPostsByTag returns all posts carrying the given tag.
func GetPostsByTag(tag string) []BlogPost {
	var out []BlogPost
	for _, p := range PublishedPosts() {
		for _, t := range p.Tags {
			if t == tag {
				out = append(out, p)
				break
			}
		}
	}
	return out
}

// GetAllTags returns unique tags in first-seen order.
func GetAllTags() []string {
	seen := map[string]bool{}
	var out []string
	for _, p := range PublishedPosts() {
		for _, t := range p.Tags {
			if !seen[t] {
				seen[t] = true
				out = append(out, t)
			}
		}
	}
	return out
}

// GetRelatedPosts returns up to n posts related to the given slug — same
// category first, then most recent others — excluding the post itself.
func GetRelatedPosts(slug string, n int) []BlogPost {
	cur := GetPostBySlug(slug)
	if cur == nil {
		return nil
	}
	var same, other []BlogPost
	for _, p := range PublishedPosts() {
		if p.Slug == slug {
			continue
		}
		if p.Category == cur.Category {
			same = append(same, p)
		} else {
			other = append(other, p)
		}
	}
	related := append(same, other...)
	if len(related) > n {
		related = related[:n]
	}
	return related
}

// PostsNewestFirst returns published posts sorted by date descending.
func PostsNewestFirst() []BlogPost {
	out := PublishedPosts()
	sort.SliceStable(out, func(i, j int) bool {
		return out[i].Date > out[j].Date // ISO dates sort lexicographically
	})
	return out
}

// KbBlogSection builds the "# Blog & Travel Guides" markdown section for /api/kb,
// ported from buildBlogSection() in site/src/app/api/kb/route.ts.
func KbBlogSection() string {
	lines := []string{"# Blog & Travel Guides\n"}
	for _, p := range PublishedPosts() {
		lines = append(lines, "## "+p.Title)
		lines = append(lines, "*"+p.Date+" | "+p.Category+" | "+p.ReadTime+"*")
		lines = append(lines, p.Excerpt)
		lines = append(lines, "Tags: "+strings.Join(p.Tags, ", "))
		lines = append(lines, "URL: https://pelangicapsulehostel.com/blog/"+p.Slug)
		lines = append(lines, "")
	}
	return strings.Join(lines, "\n")
}
