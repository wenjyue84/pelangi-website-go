# Deploying go-site (the LIVE pelangicapsulehostel.com)

> **This Go app is the production site** (since 2026-06-27). The Next.js app in `site/`
> is stopped and kept only as a backup. There is NO Vercel deploy — the old
> "Deploy: Vercel (auto from git)" docs are obsolete.

## Production topology

| Item | Value |
|------|-------|
| Server | Hetzner VPS `5.223.54.57` (Ubuntu) |
| SSH | `ssh deploy@5.223.54.57` (key `~/.ssh/id_ed25519`) |
| Binary | `/home/deploy/pelangi-go/pelangi-go` |
| Launcher | `/home/deploy/pelangi-go/run.sh` — sets `PORT=3001`, `PUBLIC_DIR=/opt/pelangi-website/public`, sources `/opt/pelangi-website/.env.production` |
| Process manager | PM2, app name **`pelangi-website-go`** |
| Public assets | `/opt/pelangi-website/public` (blog images etc. — NOT embedded in the binary; `static/` IS embedded) |
| Edge | Cloudflare (orange-cloud). Applies **Brotli** compression at the edge — do NOT add gzip middleware to the Go server, it is redundant. |
| Old Next.js app | PM2 `pelangi-website` (port 3000), **stopped** — backup only |

## Blog cover-image gate

`./build.sh` runs `node scripts/check-blog-covers.mjs` as its first step and **aborts the
build** if it fails. It checks every blog post's `FeaturedImage` in `internal/data/blog.go`
against `site/public/images/blog/`:

- every `FeaturedImage` path must exist under `site/public` with the exact filename + extension
- no two posts may reuse the same `FeaturedImage` unless they are declared language siblings of
  each other via `AlternateEN`/`AlternateZH`/`AlternateMS`

Run it standalone any time: `node scripts/check-blog-covers.mjs` (add `--live` to also HEAD-check
every image against production). **Deploy is refused if this gate fails** — fix the duplicate or
missing cover in `blog.go` (and add the image to `site/public/images/blog/`) before building again.

## Deploy steps

From `go-site/` on Windows, use Git Bash:

```bash
# 1. Build (blog-cover gate + Tailwind CSS + static linux/amd64 binary)
./build.sh

# 2. Ship the new binary alongside the live one
scp pelangi-go deploy@5.223.54.57:/home/deploy/pelangi-go/pelangi-go.new

# 3. Backup current binary, swap in the new one, restart
ssh deploy@5.223.54.57 'cd /home/deploy/pelangi-go && \
  cp pelangi-go pelangi-go.bak.$(date +%Y%m%d-%H%M%S) && \
  mv pelangi-go.new pelangi-go && chmod +x pelangi-go && \
  pm2 restart pelangi-website-go'

# 4. Verify
curl -s -o /dev/null -w "%{http_code}\n" https://pelangicapsulehostel.com/   # expect 200
curl -s https://pelangicapsulehostel.com/healthz
```

If new/changed files live under `public/` (e.g. blog images), also:

```bash
scp site/public/images/blog/<img>.jpg deploy@5.223.54.57:/opt/pelangi-website/public/images/blog/
```

## Cache notes

- Cloudflare caches static assets. After changing `static/` assets that keep the
  same URL, purge via the `/cloudflare-admin` skill (zone: pelangicapsulehostel.com)
  or wait for TTL. HTML is not cached aggressively; content changes appear on restart.
- The Go server keeps timestamped `pelangi-go.bak.*` binaries beside the live one —
  rollback = `mv` a backup over `pelangi-go` + `pm2 restart pelangi-website-go`.

## Rollback

```bash
ssh deploy@5.223.54.57 'cd /home/deploy/pelangi-go && ls -t pelangi-go.bak.* | head -3'
ssh deploy@5.223.54.57 'cd /home/deploy/pelangi-go && cp <chosen backup> pelangi-go && pm2 restart pelangi-website-go'
```
