package data

import "regexp"

// blogLinkRE matches internal blog anchors in post HTML bodies.
var blogLinkRE = regexp.MustCompile(`<a href="/blog/([a-z0-9-]+)"[^>]*>([^<]*)</a>`)

// StripUnpublishedLinks removes anchors that point at blog posts which are not
// yet live (scheduled, future Date), leaving the anchor's inner text in place.
// Cross-links between posts in the publishing queue can then be authored once,
// up front: a live post never shows a 404 link, and the anchor reappears
// automatically the day its target goes live — same MYT gate as PublishedPosts.
func StripUnpublishedLinks(html string) string {
	published := make(map[string]bool)
	for _, p := range PublishedPosts() {
		published[p.Slug] = true
	}
	return blogLinkRE.ReplaceAllStringFunc(html, func(m string) string {
		sub := blogLinkRE.FindStringSubmatch(m)
		if published[sub[1]] {
			return m
		}
		return sub[2]
	})
}
