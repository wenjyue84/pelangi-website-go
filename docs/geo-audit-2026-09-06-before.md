# GEO Audit Report (Pre-Deploy Baseline): Pelangi Capsule Hostel

**Audit Date:** 2026-09-06
**URLs Audited:** https://pelangicapsulehostel.com (home), /zh, /india
**Business Type:** Local Business (Hostel / Hospitality)
**Method:** WebFetch + raw HTML fetch (curl) of robots.txt, llms.txt, sitemap.xml, and the three pages. Lightweight pass (no live third-party brand-mention crawl of Wikipedia/Reddit/YouTube — Brand Authority score is an estimate flagged below, not a verified figure).

---

## Score Table

| Page | AI Citability (25%) | Brand Authority (20%)* | Content E-E-A-T (20%) | Technical GEO (15%) | Schema (10%) | Platform Opt (10%) | **Overall** | Rating |
|---|---|---|---|---|---|---|---|---|
| Home `/` | 85 | 40 | 65 | 90 | 90 | 80 | **73** | Fair (near Good) |
| `/zh` | 60 | 40 | 50 | 90 | 55 | 55 | **58** | Poor/Fair border |
| `/india` | 75 | 40 | 60 | 90 | 80 | 75 | **68** | Fair |

*Brand Authority not independently verified this pass (no Wikipedia/Reddit/YouTube crawl) — treat as placeholder, same estimate applied to all three pages since it's a site-wide entity signal, not page-specific.

---

## Evidence Collected

- **robots.txt**: fully open — explicit `Allow: /` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai. Only `/private/` blocked. Excellent.
- **llms.txt**: present, detailed, dated 2026-09-04. Covers services, pricing (RM35 flat, RM30 first-night direct), amenities, location, team, current notices (Johor election traffic advisory). Strong AI-citability asset.
- **sitemap.xml**: 180+ URLs including en/zh/ms localized paths and 60+ blog posts.
- **Home**: 12 JSON-LD blocks (`Hostel`, `FAQPage` w/ 15+ Q&A, `AggregateRating`, `Review`, `Event`, `Organization`, `WebSite`, `Person`, `GeoCoordinates`, `Place`, `PostalAddress`, `GovernmentOrganization`, `ImageObject`). OG + Twitter Card tags complete. Canonical present. `hreflang="alternate"` links present (6 found).
- **/zh**: only 3 JSON-LD blocks (`Hostel`, `WebSite`, `Organization`) — no `FAQPage` despite having FAQ-shaped content potential. OG tags present, hreflang alternates present (8), canonical correct.
- **/india**: 5 JSON-LD blocks including `FAQPage` (6 Q&A), `LodgingBusiness`, `BreadcrumbList`, `Audience`. OG present, hreflang alternates present (6), canonical correct.
- **Images**: home page has 15 `<img>` tags, 14 with alt text, 1 with empty alt (`alt=""`).

---

## Three Biggest Gaps

1. **`/zh` is missing `FAQPage` schema and has ~3x less content than home** (~1,200-1,500 words vs ~4,500-5,000) — the Chinese page is the weakest of the three and under-serves AI citation for Chinese-language queries despite the market being adjacent (Singapore/China travelers).
2. **No individual author attribution on blog posts** — dates exist but no named author/credentials, weakening E-E-A-T for the 60+ article blog that is the site's largest content asset.
3. **Brand Authority is unverified and likely low** — no confirmed presence checked on Wikipedia/Reddit/YouTube/LinkedIn for entity recognition; for a 2023-founded independent hostel this is plausibly the single biggest score drag once actually measured, and should be a follow-up audit before treating any score above as final.

Full page-level data (schema dumps, OG tags, meta descriptions) captured via curl in this session; not persisted as raw HTML in this repo to avoid bloating the docs folder.
