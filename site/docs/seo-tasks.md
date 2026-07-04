# SEO Tasks — Pelangi Website

> Open action items. `/pelangi-website-brief` reads this daily and reports unchecked items.
> Details for off-site items: `offsite-seo-actions.md`.

## On-site (done 2026-07-05)

- [x] Sync RM30/RM35 pricing across site, llms.txt, JSON-LD, FAQ (deployed 2026-07-05)
- [x] Self-host fonts (remove render-blocking Google Fonts) (deployed 2026-07-05)
- [x] Document real deploy flow (go-site/DEPLOY.md + skill rewrite)
- [x] GEO audit baseline for the Go site (GEO-AUDIT-2026-07.md)

## 🔴 P0 — Cloudflare is blocking AI crawlers (2-minute dashboard fix)

- [ ] **Turn OFF Cloudflare's "block AI bots" managed robots.txt** for zone
  pelangicapsulehostel.com. It currently injects `Disallow: /` for **GPTBot, ClaudeBot,
  Google-Extended, CCBot, Amazonbot, Applebot-Extended, Bytespider, meta-externalagent**
  plus `Content-Signal: ai-train=no` — overriding our allow-all robots.txt and making the
  site invisible to ChatGPT/Claude/Gemini training + crawling. This defeats the whole GEO
  strategy (llms.txt etc.).
  **Where:** dash.cloudflare.com → pelangicapsulehostel.com → **Security → Bots / AI Crawl
  Control** (a.k.a. "Block AI training bots" / managed robots.txt) → disable, then verify
  `curl https://pelangicapsulehostel.com/robots.txt` no longer contains "Cloudflare Managed content".
  (API token can't do it — zone not in the account token's scope; found by geo-audit 2026-07-05.)

## Off-site (Jay executes)

- [ ] GBP: get review short-link, save the review-ask script into WhatsApp quick replies
- [ ] GBP: first weekly post (photo + "pods from RM30/night")
- [ ] TripAdvisor: upload 15–20 photos, complete amenities, set price range
- [ ] NAP consistency sweep (checklist in offsite-seo-actions.md §4)
- [ ] Ask Alston/Maya: find Sleepy Bear's monthly worker rate (competitive intel, from pricing.md)
- [ ] STAAH: verify RM30/35 pushed to Booking.com + capsule inventory open (from price-watch 4/7 finding)
- [ ] Backlink outreach #1: pick one JB travel blogger, offer free night for review
- [ ] Apply for Visit Malaysia 2026 accommodation directory listing

## Recurring

- [ ] Weekly GBP post (Mondays)
- [ ] Monthly: re-run `/geo-compare` against GEO-AUDIT-2026-07.md baseline
- [ ] Quarterly: NAP consistency re-check
