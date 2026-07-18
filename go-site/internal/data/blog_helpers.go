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

// slugTokens splits a slug into lowercase word tokens on hyphens.
func slugTokens(slug string) []string {
	return strings.Split(slug, "-")
}

// topicTokens returns a deduped union of slug tokens and tag tokens for a post.
func topicTokens(p BlogPost) []string {
	seen := map[string]bool{}
	var out []string
	add := func(w string) {
		if w != "" && !seen[w] {
			seen[w] = true
			out = append(out, w)
		}
	}
	for _, w := range slugTokens(p.Slug) {
		add(w)
	}
	for _, t := range p.Tags {
		for _, w := range strings.Split(t, "-") {
			add(w)
		}
	}
	return out
}

// overlapScore counts shared tokens between two token slices.
func overlapScore(a, b []string) int {
	set := make(map[string]bool, len(a))
	for _, w := range a {
		set[w] = true
	}
	n := 0
	for _, w := range b {
		if set[w] {
			n++
		}
	}
	return n
}

// GetRelatedPosts returns up to n posts related to the given slug.
// Posts are scored by slug+tag keyword overlap; recency breaks ties.
func GetRelatedPosts(slug string, n int) []BlogPost {
	cur := GetPostBySlug(slug)
	if cur == nil {
		return nil
	}
	curTokens := topicTokens(*cur)

	type scored struct {
		post  BlogPost
		score int
	}
	var candidates []scored
	for _, p := range PublishedPosts() {
		if p.Slug == slug {
			continue
		}
		candidates = append(candidates, scored{
			post:  p,
			score: overlapScore(curTokens, topicTokens(p)),
		})
	}
	sort.SliceStable(candidates, func(i, j int) bool {
		if candidates[i].score != candidates[j].score {
			return candidates[i].score > candidates[j].score
		}
		return candidates[i].post.Date > candidates[j].post.Date
	})
	out := make([]BlogPost, 0, n)
	for _, c := range candidates {
		if len(out) >= n {
			break
		}
		out = append(out, c.post)
	}
	return out
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
