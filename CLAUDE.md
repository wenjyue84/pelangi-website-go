# CLAUDE.md — Pelangi Website

## What This Is

Marketing + booking site for **Pelangi Capsule Hostel**, Johor Bahru, Malaysia.
**Live URL:** https://pelangicapsulehostel.com
**Live app:** `go-site/` — Go rewrite (single static binary, ~11 MB RSS), in production since 2026-06-27.
**Deploy:** Hetzner VPS `5.223.54.57` + PM2 (`pelangi-website-go`) behind Cloudflare — see `go-site/DEPLOY.md` or the `/pelangi-website-deploy` skill. **NOT Vercel.**

The Next.js 16 app in `site/` is the previous implementation — stopped on the VPS (PM2 `pelangi-website`, :3000), kept as backup/reference only. Do not develop new features there.

## Architecture Integration

The website is the **static knowledge source** in a 3-service stack:
1. Rainbow AI (WhatsApp bot) syncs KB from this site via `PELANGI_WEBSITE_URL`
2. AI-readable content served at `/llms.txt` and `/llms-full.txt`
3. Webchat widget on the site routes to Rainbow AI (`/api/chat/*` proxy)
4. Full integration docs: `../rainbow-pms-pelangi-site/`

## Tech Stack (go-site — LIVE)

| Layer | Tech |
|-------|------|
| Server | Go stdlib `net/http` + `html/template`, `go:embed` (templates + static in binary) |
| Styling | Tailwind CSS 4 precompiled at build time (`styles/app.css` → `static/css/app.css`) |
| Fonts | Self-hosted Inter + Playfair Display woff2 in `static/fonts/` (embedded) |
| Client JS | Vanilla JS in `static/js/` (no React) |
| Payments | Stripe (FPX Malaysia online banking) |
| Channel Mgr | Beds24 (OTA sync: Booking.com, Agoda, Hostelworld) |
| Edge | Cloudflare (Brotli at edge — no gzip in Go server) |
| Process | PM2 `pelangi-website-go`, PORT=3001, `PUBLIC_DIR=/opt/pelangi-website/public` |

## Key Content Files (go-site)

```
go-site/internal/data/
  rooms.go            # Room types, pricing, specs
  faq.go              # FAQ items (FAQ sections + FAQPage JSON-LD)
  content.go          # llms.txt + llms-full.txt bodies (EN + ZH) ← Rainbow AI syncs these
  blog.go             # Blog posts as BlogPost structs (ReadingTimeMinutes auto-computed)
go-site/templates/    # base.html + partials/ + pages/ (one file per route)
go-site/static/       # compiled css, js, fonts (embedded in binary)
site/public/          # images etc. — served from VPS /opt/pelangi-website/public (NOT embedded)
```

## API Routes

| Route | Purpose |
|-------|---------|
| `GET /api/ari` | Live availability + rates (Beds24, 5-min cache) |
| `POST /api/create-payment-intent` | Stripe FPX payment |
| `POST /api/stripe-webhook` | Payment events |
| `POST /api/webhooks/beds24` | Channel manager sync |
| `POST /api/bookings/sync` | Booking push to Beds24 (weekend-aware pricing) |
| `GET /healthz` | Health check |

## Critical Env Vars (in `/opt/pelangi-website/.env.production` on the VPS)

| Var | Purpose |
|-----|---------|
| `RAINBOW_API_URL` | Rainbow AI URL for webchat proxy |
| `BEDS24_API_KEY` / `BEDS24_PROPERTY_ID` | Channel manager |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Payments |
| `GTM_ID` | Google Tag Manager |

## Property Facts (used by Rainbow AI KB)

- **Address:** 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru
- **Pricing (since 2026-07-03):** capsule pods **RM30/night weekdays, RM35/night weekends** (both Lower and Upper Deck); monthly from RM594. Official record: `Documents/2-areas/pelangi-capsule/wiki/pricing.md`
- **Check-in:** 3:00 PM | Check-out: 12:00 PM
- **WiFi:** Network `pelangi capsule` | Password `ilovestaycapsule`
- **Tourism Tax:** RM10/room/night (foreign tourists only)
- **Contact:** 012-708 8789 (Jay) / 016-762 0815 (Alston), WhatsApp links on `/contact`

## Development (go-site)

```bash
cd go-site
npm install          # once — Tailwind toolchain (build-time only)
npm run css          # compile CSS (REQUIRED after template class changes)
go run .             # dev server :3000 (PORT env to override)
./build.sh           # production build (linux/amd64 static binary)
```

## Testing — ACI (browserless regression harness)

```bash
cd go-site
node aci.mjs describe            # capability catalog — agents START HERE
node aci.mjs test --suite=all    # 75 checks, 8 suites, ephemeral server on :3210 (~45s)
node aci.mjs test --suite=integrity   # no-server fast loop (<1s): slugs, dates, index sync
node aci.mjs gates               # authoritative: go vet + go build
```

Run `test --suite=all` after ANY go-site change, BEFORE deploy. Suites cover:
scheduled-publish gate, pricing consistency (RM45 must stay dead), JSON-LD parse,
sitemap gating/lastmod, wp-* 410s, security headers, /api/ari validation.
Agents: `pelangi-aci-deterministic` (regression) + `pelangi-aci-evaluator` (judgment)
in `.claude/agents/`. Browser automation only for pixels/events (Step 6 boundary
in the setup-aci skill) — everything else goes through the ACI.

## Blog Language Requirements

Every blog post in `go-site/internal/data/blog.go` MUST include an English version. Rules:

- **English is mandatory** for every post. Set `InLanguage: "en"` (or omit — default is EN) and write English content.
- **Other languages (BM/MS, ZH, ID)** are optional add-ons. Write them as separate `BlogPost` structs with their own slug.
- **Non-English-primary posts** (e.g. a post targeting Indonesian tourists written in Bahasa Indonesia):
  - Primary post: `InLanguage: "id"` with ID content
  - Must have a sibling EN post, linked via `AlternateEN: "<en-slug>"`
  - The EN post must link back via `AlternateMS/AlternateID` as appropriate
- **Never publish a post with ONLY a non-English version.** Every non-EN post needs an `AlternateEN` pointing to an existing EN slug.
- **Chinese posts** must have `InLanguage: "zh-CN"` set explicitly (not left empty).
- **Multilingual sets** (EN + BM + ZH): all three posts reference each other via `AlternateEN`, `AlternateZH`, `AlternateMS`.

## Coding Patterns

- One template file per route under `templates/pages/`; page handlers in `internal/handlers/page_*.go`
- Static content lives as Go structs/consts in `internal/data/` — compiled into the binary
- **PII hashing** — email/phone must be SHA-256 hashed before sending to Meta/TikTok APIs
- **No hard deletes** — content is versioned in git
- Sitemap `lastmod` is driven by the newest blog post date automatically
- **Scheduled publishing** — give a `BlogPost` a future `Date:` and it stays hidden everywhere (blog list, direct URL 404, sitemap, feeds, KB/llms, related posts) until that date arrives in MYT; goes live automatically, no redeploy. Server gate: `PublishedPosts()` in `internal/data/blog.go`. Client search index: add the entry in `static/js/widgets_b.js` with `live: "YYYY-MM-DD"` — same date as the post

## When You Update Content

If you change room prices, policies, check-in times, or amenities:
1. Update `go-site/internal/data/rooms.go` / `faq.go` **and** `content.go` (llms bodies, EN + ZH)
2. Grep templates for the old value — pricing also appears in `templates/pages/*.html` (home, rooms, zh*, visitMalaysia2026, terma…), `static/js/booking.js`, `static/js/widgets_a.js`, and JSON-LD blocks
3. Build + deploy (`go-site/DEPLOY.md`), then trigger Rainbow AI KB re-sync via admin dashboard or `POST /api/rainbow/knowledge-base/sync`

## Tools

Use these before writing an ad-hoc script. Every path below existed on disk when this block was generated (2026-09-11, hub_lint.py HUB-010); regenerate with `uv run …/_tools/hub-lint/hub_lint.py --path <this folder> --fix --rules HUB-010`.

| Kind | Command (run from this folder) | Notes |
|---|---|---|
| ACI | `node go-site/aci.mjs describe|status|query|test` | JSON out; `describe --json` lists suites. Coverage: `1-projects/chief-of-staff/wiki/aci-coverage.md` |
| npm (in `go-site/`) | `npm run css`, `npm run css:watch` | from `go-site/package.json` |
| npm (in `site/`) | `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run analyze`, `npm run size` | from `site/package.json` |
| Go | `go run .` / `go test ./...` in `go-site/` | from `go-site/go.mod` |
| scripts | `node go-site/scripts/check-blog-covers.mjs` | 1 file(s) |
