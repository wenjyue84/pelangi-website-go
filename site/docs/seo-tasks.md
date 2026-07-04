# SEO Tasks — Pelangi Website

> Open action items. `/pelangi-website-brief` reads this daily and reports unchecked items.
> Off-site details: `offsite-seo-actions.md`. Paste-ready browser prompts: `claude-for-chrome-prompts.md`.

## ✅ Done (2026-07-05 session)

- [x] Cloudflare AI-crawler block removed (managed robots.txt off; self-heal via CF_BM_TOKEN wired into daily brief)
- [x] Sync RM30/RM35 pricing across site, llms.txt, JSON-LD, FAQ (deployed)
- [x] Self-host fonts (removed render-blocking Google Fonts)
- [x] Blog JSON-LD double-encoding bug fixed (safeJS) — all 36 posts' schema now parseable
- [x] Security headers (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy) served by Go middleware — audit H2
- [x] sameAs enriched with Wikidata + TripAdvisor + Agoda on Organization, Hostel (home) and LodgingBusiness (location) — audit H3 (on-page part)
- [x] Trust numbers reconciled: about-page "8.2" → "4.9/5"; homepage 500+ reviews attributed to Google/Booking/Hostelworld — audit H4 (numbers part)
- [x] Blog bylines: cards show "By Jay Lew", post byline links to /author/jay-lew (author page already had ProfilePage+Person schema) — audit H5
- [x] BlogPosting wordCount + articleSection added — audit L4
- [x] Explicit twitter:title/description/image tags — audit L2
- [x] robots.txt: removed wp-* Disallows so crawlers can see the 410s and de-index old spam faster — audit L3
- [x] IndexNow live: key file served, all 68 sitemap URLs submitted (HTTP 202) — Bing/Yandex/Naver
- [x] GEO audit baseline saved (GEO-AUDIT-2026-07.md, 61/100)
- [x] Deploy flow documented (go-site/DEPLOY.md + skill rewrite)

**Closed as obsolete:** WebSite SearchAction — Google retired the sitelinks search box (Oct 2024); site search is a client-side dialog. Not worth a /search page.

## 🧑 Jay — browser tasks (paste-ready prompts in `claude-for-chrome-prompts.md`)

- [ ] Prompt 1: GBP — get review short-link + publish first weekly post
- [ ] Prompt 2: TripAdvisor — finish claim (legal cert + ID were pending per 2026-06-26 memory), amenities, price range, photos
- [ ] Prompt 3: Bing Webmaster Tools — import from GSC (IndexNow already live)
- [ ] Prompt 4: Bing Places — import from GBP
- [ ] Prompt 5: Wikidata Q140363023 — add TripAdvisor/Booking/Hostelworld external IDs
- [ ] Save the GBP review-ask script as a WhatsApp quick reply (script in offsite-seo-actions.md §1)
- [ ] Confirm homepage testimonials are real guests (Sarah Jenkins / Hiroki Tanaka / Alex & Jordan) — if not verifiable, replace with quotes from actual Google/Booking reviews (audit H4 remainder)
- [ ] STAAH: verify RM30/35 pushed to Booking.com + capsule inventory open (price-watch 4/7 finding)
- [ ] Ask Alston/Maya: Sleepy Bear's monthly worker rate (competitive intel)

## 📋 Backlog (code/content, for future sessions)

- [ ] Add width/height (or aspect-ratio) to hero + content images to kill CLS — audit L1
- [ ] Reddit presence: genuinely answer JB-stay questions on r/askSingapore, r/JohorBahru, r/solotravel — audit H1
- [ ] Backlink outreach #1: one JB travel blogger, free night for honest review
- [ ] Apply for Visit Malaysia 2026 accommodation directory listing
- [ ] 60-second pod walkthrough video → YouTube channel — audit L5
- [ ] NAP consistency sweep (checklist in offsite-seo-actions.md §4)

## 🔁 Recurring

- [ ] Weekly GBP post (Mondays)
- [ ] Monthly: `/geo-compare` against GEO-AUDIT-2026-07.md baseline (expect Technical + Schema + Citability to jump from tonight's fixes)
- [ ] Quarterly: NAP consistency re-check
