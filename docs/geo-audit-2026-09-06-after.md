# GEO Audit Report (Post-Deploy): Pelangi Capsule Hostel

**Audit Date:** 2026-09-06 (after prod redeploy)
**URLs Audited:** https://pelangicapsulehostel.com (home), /zh, /india
**Method:** same as baseline (docs/geo-audit-2026-09-06-before.md) — raw curl HTML for JSON-LD/meta/hreflang counts, cross-checked against haiku-subagent WebFetch passes. Note: WebFetch strips `<script>` tags, so subagents reported 0 JSON-LD everywhere — that is a tool artifact, not a regression. All schema counts below are from curl (ground truth).

---

## Score Table

| Page | AI Citability (25%) | Brand Authority (20%)* | Content E-E-A-T (20%) | Technical GEO (15%) | Schema (10%) | Platform Opt (10%) | **Overall** | Rating | Δ vs before |
|---|---|---|---|---|---|---|---|---|---|
| Home `/` | 88 | 40 | 66 | 90 | 90 | 80 | **74** | Fair (near Good) | +1 |
| `/zh` | 60 | 40 | 50 | 90 | 55 | 55 | **58** | Poor/Fair border | 0 |
| `/india` | 78 | 40 | 62 | 90 | 80 | 78 | **69** | Fair | +1 |

*Brand Authority still not independently verified — same 40 placeholder, unchanged. No Wikipedia/Reddit/YouTube crawl was run this pass either.

---

## What Moved and Why

1. **llms.txt gained CN/IN sections** — confirmed live: `## For Chinese Travellers`, `## For Indian Travellers`, and a full `## 中文信息 (Chinese)` block with 服务/设施/地址与交通/预订联系 subsections. This nudges AI Citability up slightly on home (+3) and india (+3) since AI crawlers now get native-language and audience-targeted context in the single highest-value citability asset.
2. **India page INR figures removed** — confirmed via curl: no `₹` symbol remains anywhere on `/india`. One bare string "INR" still appears (likely a currency-code label, not a priced figure) — not a regression, but worth a follow-up glance. This fixes the stale/wrong pricing signal that was hurting Content E-E-A-T; scored +2 there.
3. **JSON-LD schema counts unchanged**: home 12 blocks, `/india` 5 blocks, `/zh` 3 blocks — identical to baseline. The 6 new blog posts and SG/Batam destination content did not add new schema, so Schema score is flat across all three pages.
4. **`/zh` is unchanged** — still 3 JSON-LD blocks, no `FAQPage`, same hreflang/canonical setup as baseline. This deploy did not touch `/zh`; the biggest gap identified in the baseline (weakest of the three pages) remains open.
5. **New backpacker blog posts and SG/Batam destination cards** were out of this audit's page scope (home/zh/india only) — likely raise site-wide topical depth but weren't scored directly; flagged for a future audit pass if Jay wants those pages included.

## Confirmed Unchanged (honest caveats)

- **Brand Authority (20% weight) is still the same unverified placeholder (40) on all three pages** — this deploy did nothing to change it, and it remains the single biggest plausible score drag once actually measured (per baseline note #3).
- `/zh` FAQPage gap and word-count deficit vs home: not addressed this deploy.
- No author attribution added to blog posts.

Full curl output (JSON-LD counts, hreflang, OG tags, llms.txt headers) captured in this session, not persisted as raw dumps to avoid bloating the docs folder.
