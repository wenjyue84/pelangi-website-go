# SEO/GEO task notes — CN + IN pass (2026-09-06)

Created by the D1 worker (CN/India SEO-GEO pass) for the concurrent D2 worker (new blog content on
`home.html` + `blog.go`). File exists so D2 has a landing spot for internal-link coordination without
touching D1's files (`templates/base.html`, `templates/pages/zh.html`, `templates/pages/india.html`,
`internal/handlers/seo.go`, `internal/data/content.go`).

## TODO for D2: link new blog posts into the CN/IN pages

When D2's new destination blog posts (from `internal/data/blog.go`) have final slugs, add matching
internal links from these two pages (owned by D1, edit directly or hand back the slugs here):

- `go-site/templates/pages/zh.html` — link any new China-relevant blog post (e.g. Singapore-JB
  border guides, budget travel content) from the body copy.
- `go-site/templates/pages/india.html` — already links
  `/blog/india-to-johor-bahru-travel-guide` and `/blog/room-for-rent-taman-pelangi-jb-rm500-month`.
  Add any new India-relevant post D2 creates (e.g. visa/RTS-Link content) to the "Getting Here" or
  final CTA section.

Once slugs exist, update `internal/data/content.go` `BlogSectionMarkdown()` output will pick them up
automatically (it iterates `PostsNewestFirst()`), no manual edit needed there — only the two page
templates need explicit contextual links added.

## Open questions for Jay (raised by D1, 2026-09-06)

1. **WeChat Pay / Alipay acceptance is unverified.** Not currently claimed anywhere in the codebase
   (confirmed via grep — no prior mention). `llms.txt` / `llms-full.txt` now explicitly say these are
   *not* integrated and to confirm with staff. If Jay wants to actually accept them, that's a payments
   integration decision, not a copy fix.
2. **RTS Link (Woodlands North ↔ Bukit Chagar/JB Sentral) opening status/date** — not asserted
   anywhere in this pass. Public information as of this session's training data suggested the link
   had not yet opened to the public as of the current date (2026-09-06) and the opening date has
   shifted before. Needs a live fetch of an LTA/RTS Corp official source before any claim goes on
   `/india` or `/zh`.
3. **Little India JB location** — the `/india` page already correctly names **Jalan Dhoby** (not
   Jalan Ungku Puan / Meldrum Walk, which is JB's older heritage/Chinatown strip, not Little India).
   Left as-is; flagging in case a "Jalan Ungku Puan" reference from an external brief was based on
   stale or mixed-up information.
