# GEO Audit Report: Pelangi Capsule Hostel

**Audit Date:** 2026-07-05
**Target URL:** https://pelangicapsulehostel.com
**Business Type:** Local Business — Lodging / Capsule Hostel (Taman Pelangi, Johor Bahru, Malaysia)
**Stack Audited:** Go rewrite (`go-site/`) served behind Cloudflare on a Hetzner VPS
**Baseline note:** This is the **first GEO baseline for the Go site**. The previous `GEO-AUDIT-REPORT.md` was run against the retired Next.js build and is not directly comparable. Use this document as the new reference point for month-over-month tracking.
**Methodology:** `~/.claude/skills/geo-audit/SKILL.md` — orchestrator recon + 5 parallel specialist subagents (AI visibility, platform optimization, technical, content E-E-A-T, schema).

---

## Executive Summary

**Overall GEO Score: 61/100 (Fair)**

Pelangi Capsule Hostel has a genuinely strong GEO *foundation* for an independent hostel — full server-side rendering, a well-maintained `/llms.txt` and `/llms-full.txt`, a 67-URL sitemap with image sitemap and en/zh hreflang, a rich JSON-LD graph (Organization + Hostel/LodgingBusiness + FAQPage + Event + Review + BlogPosting), a Wikidata entity (Q140363023), a verified Google Business Profile, and 36 locally-specific blog posts. The content is human-curated with real insider knowledge.

Two defects and one weak category hold the score down. **(1)** Cloudflare's "Block AI Scrapers" feature is prepending `Disallow: /` stanzas for GPTBot, ClaudeBot and Google-Extended plus a `Content-Signal: ai-train=no` directive *ahead of* the origin's allow-all robots.txt — a conflict that blocks the two most important AI crawlers under first-match parsers and opts the site out of AI training. **(2)** A Go template double-encoding bug renders every blog page's `BlogPosting`/`BreadcrumbList`/`CollectionPage` JSON-LD as an escaped JSON *string* instead of a JSON object, making all 36 blog posts' structured data unparseable by Google and AI crawlers. **(3)** Brand Authority (34/100) is the weakest category — no Wikipedia, no Reddit footprint, thin third-party review linking — and it carries a 20% weight.

Fix the two defects (both are configuration/template changes, not rewrites) and invest in off-site brand signals, and this site moves from Fair into Good (75+) territory.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 77/100 | 25% | 19.25 |
| Brand Authority | 34/100 | 20% | 6.80 |
| Content E-E-A-T | 60/100 | 20% | 12.00 |
| Technical GEO | 74/100 | 15% | 11.10 |
| Schema & Structured Data | 68/100 | 10% | 6.80 |
| Platform Optimization | 52/100 | 10% | 5.20 |
| **Overall GEO Score** | | | **61.15 → 61/100** |

**Rating scale:** 90-100 Excellent · 75-89 Good · **60-74 Fair** · 40-59 Poor · 0-39 Critical

### Supporting sub-scores (for tracking)

- AI Visibility composite (AI-visibility specialist): 59/100 — Citability 77, Crawler Access 52, llms.txt 90, Brand Mentions 34
- Platform sub-scores: Google AI Overviews 62, Gemini 63, ChatGPT 52, Perplexity 44, Bing Copilot 38
- Content sub-scores: overall 60, E-E-A-T 54 (Experience 14/25, Expertise 13/25, Authoritativeness 11/25, Trust 16/25)
- Technical sub-scores: SSR 95, Mobile 90, URL 93, Meta/Indexability 75, Crawlability 68, CWV risk 65, Security headers 18

---

## Critical Issues (Fix Immediately)

### C1. Cloudflare "Block AI Scrapers" is prepending Disallow rules that conflict with the origin robots.txt
The origin Go handler (`go-site/internal/handlers/seo.go`) serves a clean robots.txt that explicitly allows all 17 AI crawlers (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Amazonbot`, `CCBot`, etc.) plus `User-agent: * / Allow: /`. But the **live** robots.txt served through Cloudflare has a managed block **prepended on top**:

```
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /

User-agent: Amazonbot
Disallow: /
User-agent: Applebot-Extended
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: meta-externalagent
Disallow: /
...
```

...*followed by* the origin's allow-all block. Under RFC 9309 (merge groups, Allow-wins), compliant crawlers are not blocked. But conservative/first-match parsers (a documented approach for some AI bots) treat GPTBot and ClaudeBot as **blocked**, and the `Content-Signal: ai-train=no` explicitly opts the whole site out of AI training corpora even when crawling is permitted. This is the single highest-impact GEO issue and degrades AI Citability, Crawler Access, and all five platform scores at once.

**Fix:** In the Cloudflare dashboard → Security → Bots → "AI Scrapers and Crawlers", set to **Allow** (or remove the managed robots.txt / AI Audit block). Remove or change `ai-train=no`. After the change, re-fetch `/robots.txt` and confirm no `Disallow: /` precedes the origin allow rules.

### C2. Blog JSON-LD is double-encoded — all 36 blog posts' structured data is invalid
On `/blog` and every `/blog/[slug]`, the `BlogPosting`, `BreadcrumbList`, and `CollectionPage` JSON-LD is emitted as an escaped JSON **string**, not an object:

```html
<script type="application/ld+json">"{\"@context\":\"https://schema.org\",\"@type\":\"BlogPosting\",...}"</script>
```

A valid JSON-LD document must be an object/array. Google's Rich Results parser and AI crawlers reject string-scalar documents, so authorship, publication dates, headlines, breadcrumbs, and the 36-item ItemList are **invisible** on all blog pages. The homepage JSON-LD is correctly encoded, so this is a blog-template-specific bug — the Go template is marshalling an already-marshalled string (double `json.Marshal`, or `%q`/`template.JSEscapeString` on JSON output).

**Fix:** In the blog post + blog index template/handler, output the JSON-LD as a raw JSON object (`template.JS` of the marshalled bytes, marshalled exactly once). Validate with Google Rich Results Test after the fix.

---

## High Priority Issues (Fix Within 1 Week)

- **H1. Brand Authority is the weakest category (34/100).** No Wikipedia article; zero Reddit footprint across r/JohorBahru, r/solotravel, r/singapore, r/backpacking; no LinkedIn company page; TripAdvisor has only ~2 direct reviews despite 500+ aggregate. Reddit + Wikipedia are exactly the sources Perplexity and ChatGPT cite for accommodation opinions.
- **H2. Missing security headers (Technical drag, 18/100 on that sub-category).** Live responses carry only `Content-Type`, `Server: cloudflare`, `alt-svc`. No HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, or CSP. All injectable via Cloudflare Transform Rules at zero origin cost. Trust/quality signal for AI and browsers.
- **H3. On-page `sameAs` gaps and entity inconsistency.** Wikidata Q140363023 is in the `Organization` `sameAs` but **absent from the `LodgingBusiness` `sameAs`** (the primary entity type AI uses for a hostel). TripAdvisor (claimed, loc 27125478) and the GBP CID URL are missing from both. `WebSite` schema has no `SearchAction`.
- **H4. Content trust defects.** Homepage shows "4.9/5 (500+ Reviews)" while `/about` shows "8.2 Guest Rating" — two unattributed numbers that read as inconsistent. Homepage testimonials ("Sarah Jenkins (UK, Verified Guest)", "Hiroki Tanaka (Japan)", "Alex & Jordan (Australia)") are unsourced and read as fabricated — a Trust blocker for AI citation systems.
- **H5. No author bio infrastructure.** All 37 posts are bylined "Jay Lew" (good) but his name links to no author page, and blog index cards show no byline. Highest-ROI E-E-A-T fix: an `/author/jay-lew` page (photo, credentials, founding story, Person schema) lifts Experience, Expertise and Authoritativeness at once.
- **H6. No Bing presence.** No Bing Places listing, no Bing Webmaster Tools verification (`msvalidate.01`), no IndexNow. This is the bulk of the low Bing Copilot score (38).

---

## Medium Priority Issues (Fix Within 1 Month)

- **M1.** `priceRange: "$"` on LodgingBusiness is uninformative — change to `"RM35 - RM45 per night"`.
- **M2.** LodgingBusiness (homepage) has no `amenityFeature` or `openingHoursSpecification` (24/7). Amenity schema currently only lives on `/rooms` HotelRoom blocks.
- **M3.** `Organization` schema missing `description` and structured `contactPoint`; Person schemas (Jay, Alston) lack `image`, `knowsAbout`, stable `@id`, and richer `sameAs`.
- **M4.** Homepage meta description is 253 chars (truncates in SERP) — trim to ~150-160.
- **M5.** Blog posts are thin (700-1,200 words) vs 2,500-4,000-word competitors; no inter-post cross-linking; no outbound citations for factual claims.
- **M6.** No visible publication dates in the blog UI (Perplexity/ChatGPT weight visible freshness, not just schema).
- **M7.** No `speakable` on the homepage FAQ/location; BlogPosting `speakable` selector is title-only (`#post-title`) — add the lede/summary.
- **M8.** `CF-Cache-Status: DYNAMIC` on all HTML — no Cloudflare edge caching of stable pages; add `Cache-Control: public, s-maxage=300`.
- **M9.** Verify hreflang reciprocity and `x-default` on `/zh` pages (homepage declares en/zh-CN/x-default correctly).

---

## Low Priority Issues (Optimize When Possible)

- **L1.** Hero and content `<img>` tags lack `width`/`height` → CLS risk. Add intrinsic dimensions or `aspect-ratio`.
- **L2.** Twitter Card is partial (`summary_large_image` only; relies on OG fallback) — add explicit `twitter:title/description/image`.
- **L3.** Vestigial WordPress `Disallow` paths (`/wp-admin/`, `/wp-json/`, …) in robots.txt — harmless on a Go site but should be removed.
- **L4.** BlogPosting missing `wordCount`, `articleSection`, and explicit image `width`/`height`.
- **L5.** No official YouTube channel — a single 60-second pod-walkthrough video creates a Google-owned media asset Gemini can surface.
- **L6.** Alston's surname missing from `/about` and footer.
- **L7.** Some Review `datePublished` values are partial (`2025-01`) — use full ISO dates.

### Data reconciliation note
The AI-visibility specialist reported "37 blog posts return 404" based on two test slugs (`/blog/jb-budget-activities`, `/blog/jb-food-guide`). This is a **false alarm on routing**: the technical, content, and schema specialists all successfully fetched live blog posts (e.g. `/blog/ktm-ets-train-kuala-lumpur-johor-bahru-tourists`) and the live CollectionPage enumerates 36 posts. Blog routing is functional; those two specific slugs simply don't exist under those names. **Action:** verify the exact published slugs against the sitemap and add 301 redirects for any legacy/expected slugs that changed during the port.

---

## Category Deep Dives

### AI Citability (77/100)
The 15-17 item homepage FAQ is the strongest asset — self-contained, statistic-dense answers on price (RM35/night, RM10 TTx, RM594/month), location (full address, 15 min to Woodlands CIQ, RM8-12 Grab), Singapore comparison ("30 min to Marina Bay", "70% less vs Singapore hotels"), security, and the capsule-vs-dormitory distinction all score 72-83. Generic hero tagline scores low (45). Citability is real but capped by the crawler-access conflict (C1) and the blog structured-data bug (C2) — the content is quotable, but delivery to AI is throttled.

### Brand Authority (34/100)
Wikidata Q140363023 exists (label, description, inception 2022, coordinates, website, FB/IG) but lacks external-ID `sameAs` (TripAdvisor, Hostelworld, Booking.com). Solid OTA footprint (Booking.com, Agoda, Hostelworld 21 reviews/3.3, Trip.com 60 reviews/4.9, Hostelz). **Absent where AI looks hardest:** Wikipedia (0), Reddit (0 threads), LinkedIn (0), official YouTube (only one third-party review video). This is the biggest single lever on the composite (20% weight × 66-point gap).

### Content E-E-A-T (60/100)
Genuinely human, locally-specific content: named stalls with distances ("Restoran Sik Bao Sin directly opposite", "San Low Seafood 5-min walk"), market days, Causeway step-by-step. Consistent "Jay Lew" byline. The differentiated Career/Work cluster (Singapore jobs) is unique among competitor hostel blogs. Held back by: no author-bio page, thin `/about` (~150 words, initials not photos), the rating inconsistency and unverifiable testimonials (H4), thin post length, and no inter-post linking. Reads as human-edited AI — acceptable, value-delivering, but light on first-person voice.

### Technical GEO (74/100)
Excellent bones: pure Go SSR (full content in raw HTML — ideal for non-JS crawlers), clean semantic URLs, strong mobile/Tailwind responsive, correct canonical + robots meta (`index,follow,max-image-preview:large`), RSS + JSON feeds, OpenSearch, manifest, image sitemap, hero `fetchpriority=high` preload. Dragged down by the security-header gap (H2), the robots conflict (C1), CLS risk from dimensionless images (L1), no edge caching (M8), and the blog JSON-LD bug (C2, also counted in Schema).

### Schema & Structured Data (68/100)
Rich, well-intentioned graph: homepage carries 13 blocks (Organization, WebSite, Hostel+LodgingBusiness, FAQPage, 3× Review, 5× Event, speakable on /rooms). Strong design intent. Undercut by C2 (blog schema invalid), the Wikidata/`sameAs` inconsistency and missing `SearchAction` (H3), and enrichment gaps (M1-M3, M7). Fixing C2 alone would meaningfully raise this category.

### Platform Optimization (52/100)
Gemini (63) and Google AI Overviews (62) are strongest — GBP verified, Wikidata present, aggregateRating, hreflang, topical blog. ChatGPT (52) and Perplexity (44) gated by crawler conflict + zero Reddit + unconfirmed freshness signals. Bing Copilot (38) weakest — no Bing Places, no Webmaster Tools, no LinkedIn.

---

## Quick Wins (Implement This Week)

1. **Turn off Cloudflare AI-scraper blocking + remove `ai-train=no`** (C1). One dashboard toggle; unblocks GPTBot/ClaudeBot/Google-Extended and re-enables training inclusion. Highest impact, lowest effort.
2. **Fix the blog JSON-LD double-encoding bug** (C2). One template fix restores structured data on all 36 blog posts; validate in Rich Results Test.
3. **Add security headers via Cloudflare Transform Rules** (H2): HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. ~5 minutes, no origin change.
4. **Reconcile the rating numbers and attribute testimonials** (H4): label "4.9/5 on Google" / "8.2 on Booking.com", and either source each testimonial to a review URL or embed a live Google reviews widget.
5. **Add Wikidata + TripAdvisor + GBP CID to on-page `sameAs`** on both Organization and LodgingBusiness, and add `SearchAction` to WebSite (H3). Closes the entity-graph gap for ChatGPT/Gemini/Perplexity.

## 30-Day Action Plan

### Week 1: Unblock and repair (Critical)
- [ ] Disable Cloudflare "Block AI Scrapers"; remove/adjust `Content-Signal: ai-train=no`; re-fetch and verify robots.txt (C1)
- [ ] Fix blog JSON-LD double-encoding in the Go template; validate all blog types (C2)
- [ ] Add security headers via Cloudflare Transform Rules (H2)
- [ ] Verify actual blog slugs vs sitemap; add 301s for any changed legacy slugs (reconciliation note)

### Week 2: Entity graph and trust (Schema + Content)
- [ ] Add Wikidata/TripAdvisor/GBP-CID `sameAs` to LodgingBusiness + Organization; add WebSite `SearchAction` (H3)
- [ ] Fix rating inconsistency + attribute/replace homepage testimonials (H4)
- [ ] Enrich Wikidata Q140363023 with external-ID `sameAs` (TripAdvisor, Hostelworld, Booking.com) (H1)
- [ ] `priceRange`, `amenityFeature`, `openingHoursSpecification`, Organization `description`/`contactPoint` (M1-M3)

### Week 3: Authority infrastructure (Brand + E-E-A-T)
- [ ] Build `/author/jay-lew` bio page with Person schema; link bylines; add bylines to blog cards (H5)
- [ ] Expand `/about` (founder photos, 2022/2023 founding story, verification links)
- [ ] Create LinkedIn company page; claim Bing Places + Bing Webmaster Tools + `msvalidate.01` + IndexNow (H6)
- [ ] Draft a short Wikipedia article anchored to Q140363023 (H1)

### Week 4: Content depth and freshness
- [ ] Seed 1-2 authentic Reddit threads in r/JohorBahru / r/solotravel (H1)
- [ ] Add visible publication dates to blog UI; add homepage + blog `speakable` (M6, M7)
- [ ] Expand top 5 blog posts (depth, cross-links, outbound citations, first-person "Jay's tip") (M5)
- [ ] Add image `width`/`height`, trim meta description, enable edge caching, remove vestigial wp Disallows (L1, M4, M8, L3)

---

## Appendix: Audit Coverage

| Area | Specialist | Score | Method |
|---|---|---|---|
| AI visibility (citability, crawlers, llms.txt, brand mentions) | geo-ai-visibility | 59 | Live fetch + web search |
| Platform readiness (AIO, ChatGPT, Perplexity, Gemini, Copilot) | geo-platform-analysis | 52 | Live fetch + web search |
| Technical (SSR, headers, CWV, indexability) | geo-technical | 74 | Raw HTML + header inspection |
| Content E-E-A-T | geo-content | 60 | Homepage, /about, sample blog posts |
| Schema & structured data | geo-schema | 68 | Raw JSON-LD inspection per page type |
| Orchestrator recon | (this audit) | — | robots.txt, llms.txt, sitemap, homepage, Go source (`seo.go`) |

**Key infrastructure confirmed present:** robots.txt (origin allows 17 AI crawlers), `/llms.txt` + `/llms-full.txt` (updated 2026-07-03), sitemap.xml (67 URLs) + image-sitemap.xml, en/zh hreflang, Wikidata Q140363023, verified GBP, 36 blog posts, `/zh` Chinese pages, RSS/JSON feeds, full Go SSR.
