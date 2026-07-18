# SEO Tasks — Pelangi Website

> Open action items. `/pelangi-website-brief` reads this daily and reports unchecked items.
> Off-site details: `offsite-seo-actions.md`. Paste-ready browser prompts: `claude-for-chrome-prompts.md`.

## ✅ Done (2026-07-05 session 2)

- [x] Scheduled blog publishing feature: future-dated posts in blog.go stay hidden (lists, sitemap, feeds, KB, direct URL, search index) until their Date arrives in MYT — no redeploy needed
- [x] Published RTS Link post (live) + 6 scheduled posts (Jul 8/11/14/17/20/23), all with reader-checkable Sources sections; IndexNow pinged
- [x] Booking flow tested end-to-end; 3 issues found (10–12 Jul "no beds" vs ARI mismatch, flat pricing ignoring RM30/35 weekday/weekend split, page title "PMS") — sent to Alston with screenshots for counter-check

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

- [x] Prompt 1: GBP — review short-link obtained (`https://g.page/r/CV-GmpNH-zs1EBE/review`) + first weekly post published Mon 2026-07-06 ("Pods from RM30/night on weekdays…") — evidence: `_evidence/_gbp_review.png`, `_evidence/_gbp_post2.png` (2026-07-08)
- [ ] Prompt 2: TripAdvisor — finish claim (amenities, price range, photos). **Docs located 2026-07-12** — SSM cert PDF `260426_SSM_Pelangi_Capsule_Hostel_JM0968539.pdf` (Google Drive id `1wPLxxl3AU59HhFn66MqTbHTitu5wX_Jc`); biz reg no **202203226886 (JM0968539-T)**, PERKONGSIAN, 26A Jalan Perang Taman Pelangi 80400 JB; partners FOO YUU CHUEN (IC 970815106613) + LEW WEN JYUE (IC 840816015291). Note: extract shows expiry 06-09-2023 — attach the renewed SSM if available (Notion "Ssm Pelangi Capsule Hostel old and new" fa400499). Submission still needs tripadvisor.com/owners login (browser).
- [x] Prompt 3: Bing Webmaster Tools — DONE per 2026-07-06 seo-verify session (site registered, logged in, IndexNow receiving RTS URL) — see log.md 2026-07-06
- [x] Prompt 4: Bing Places — import from GBP done, verification queued (ETA 7–12d) — evidence: `_evidence/_bing_status.png`. ⚠️ Draft wrongly "Marked as closed" on a locked field; Jay filing Bing Places support ticket (bizid d3a1e76f-3f5d-4649-a37a-38d0094046da, see log.md 2026-07-06)
- [x] Prompt 5: Wikidata Q140363023 — added P3134 Tripadvisor ID (d27125478 slug), P3607 Booking.com (`my/pelangi-hostel-capsule`), P10442 Hostelworld (`317698`), P6008 Agoda (`pelangi-hostel-capsule/hotel/johor-bahru-my`) via API 2026-07-08, verified live (revid 2514869218)
- [ ] CF API token: add **Zone > Analytics > Read** (for GraphQL traffic stats in briefs) and **Zone > Cache Purge > Purge** (deploys touching `static/js/*` currently can't purge edge cache — auth error 10000 on 2026-07-11). Dashboard-only: dash.cloudflare.com → My Profile → API Tokens (or Account API Tokens) → edit the account token → add both permissions, Zone Resources: All zones. Claude-for-Chrome can drive this.
- [ ] Save the GBP review-ask script as a WhatsApp quick reply — script is now paste-ready with the real link in offsite-seo-actions.md §1 (needs Jay's phone; Periskope API has no quick-reply endpoint)
- [x] Homepage testimonials: Sarah Jenkins / Hiroki Tanaka / Alex & Jordan NOT found among the 85 real Google reviews — replaced cards + Review JSON-LD with 3 verbatim 5★ Google reviews (Claire Tyrrell 2024, Surya Tamang 2024, Hamza Es-skali 2023), deployed + verified live 2026-07-08 (audit H4 remainder)
- [ ] STAAH: RM30/35 push to Booking.com **CONFIRMED NOT DONE** (checked 2026-07-08, weekday 08→09 AND weekend 10→11): Booking.com offers ONLY "Single Room" at MYR 45 — no capsule pods listed at all, old RM45 rate live. → Alston must open capsule inventory + push RM30/35 in STAAH
- [ ] Ask Alston/Maya: Sleepy Bear's monthly worker rate (competitive intel)

## 📋 Backlog (code/content, for future sessions)

- [x] Gig-cluster expansion (2026-07-11, commit 4220e78, data-driven from 07-11 stats trace): 4 scheduled posts — Grab driver JB (live 07-26), 4-app comparison (07-29), gig-worker monthly budget with RM594/RM500 anchor (08-01), Foodpanda rider deep-dive (08-04). Commuter-guide closing CTA rebuilt to the Lalamove conversion pattern + IndexNow pinged. Daily brief verifies each post 200 on go-live and pings IndexNow.
- [ ] Next content slots after gig queue (Aug 7+): Private-Room-vs-Capsule (8.4 persona score) + Friday-walk-in post (both from real guest friction, 07-11 brief); zh gig content = weak fit, skip.

- [x] Add width/height (or aspect-ratio) to hero + content images to kill CLS — audit L1 (2026-07-05: hero got explicit width/height; blog featured images + cards already CLS-safe via aspect-video / fixed-height wrappers)
- [ ] Reddit presence: genuinely answer JB-stay questions on r/askSingapore, r/JohorBahru, r/solotravel — audit H1
- [ ] Backlink outreach #1: one JB travel blogger, free night for honest review
- [ ] Apply for Visit Malaysia 2026 accommodation directory listing
- [ ] 60-second pod walkthrough video → YouTube channel — audit L5
- [x] NAP consistency sweep 2026-07-08 — GBP/TripAdvisor/Booking/Agoda/Hostelworld all ✅ (results in offsite-seo-actions.md §4); Facebook About + Instagram bio behind login walls → Jay to eyeball on phone; Waze/Apple Maps/Foursquare unchecked (need accounts)

## 🔁 Recurring

- [ ] Weekly GBP post (Mondays) — ✅ week of 2026-07-06 done (`_evidence/_gbp_post2.png`); next due Mon 2026-07-13
- [ ] Monthly: `/geo-compare` against GEO-AUDIT-2026-07.md baseline (expect Technical + Schema + Citability to jump from tonight's fixes)
- [ ] Quarterly: NAP consistency re-check
