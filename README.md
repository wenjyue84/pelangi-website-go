# Pelangi Website — Go rewrite

A tiny, self-contained Go rewrite of the Pelangi Capsule Hostel site, replacing
the Next.js 16 app. Goal: same features, a fraction of the RAM.

## Why

The Next.js production server held the full Node + React + Next runtime resident
(~472 MB RSS on the Hetzner VPS — ~25% of a 2 GB box, forcing swap). This Go
build serves the same site from a single static binary.

| | Next.js (`next start`) | Go |
|---|---|---|
| RSS (idle) | ~472 MB | **~11 MB** (measured) |
| Deploy artifact | `node_modules` + `.next/standalone` | one binary |
| Runtime deps | Node | none |

## Architecture

- **`net/http` + `html/template`** (stdlib only) — no web framework.
- **`go:embed`** bundles `templates/` + `static/` into the binary.
- **Tailwind CSS** precompiled at build time → `static/css/app.css` (no Node at runtime).
- **Client interactivity** = small vanilla JS in `static/js/` (no React).
- **API routes** = Go handlers; in-memory TTL cache replaces ISR / `use cache`.

```
go-site/
├── main.go               # server: embed, routing, static, graceful shutdown
├── internal/
│   ├── data/             # content model ported from site/src/data + lib
│   ├── beds24/           # channel-manager client + 5-min TTL cache
│   ├── render/           # html/template engine (base + partials per page)
│   └── handlers/         # page handlers + JSON API
├── templates/
│   ├── base.html         # <html> shell, <head>, GTM, global widgets
│   ├── partials/         # header, footer (shared)
│   └── pages/            # one file per route, defines {{content}} / {{head}}
├── styles/app.css        # Tailwind input (design tokens from globals.css)
├── static/               # compiled css, js, (images TBD)
├── package.json          # build-time only (Tailwind CLI)
└── build.sh              # css build + static Linux binary
```

## Develop

```bash
npm install          # once — Tailwind toolchain (build-time only)
npm run css          # compile CSS
go run .             # serve on :3000  (PORT env to override)
```

## Build (production)

```bash
./build.sh           # → ./pelangi-go (static linux/amd64 binary)
```

## Status: LIVE in production

**This Go app IS the live pelangicapsulehostel.com** (cutover 2026-06-27). Migration
from the Next.js app at `site/` is complete — all pages, API routes, SEO surfaces
(sitemap, robots, llms.txt/llms-full.txt, feeds, JSON-LD), zh pages, and client JS
widgets reached parity. The Next.js PM2 app is stopped and kept as backup only.

Fonts (Inter + Playfair Display, latin woff2) are self-hosted under `static/fonts/`
and embedded in the binary — no fonts.googleapis.com request.

See **`DEPLOY.md`** for the production topology (Hetzner VPS, PM2 `pelangi-website-go`,
Cloudflare edge) and deploy/rollback steps.
