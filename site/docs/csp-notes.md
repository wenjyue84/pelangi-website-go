# CSP & Security-Header Notes — Pelangi Capsule Hostel

> P2 investigation findings (2026-06-26). Documentation only — no security-header
> behaviour was changed in this pass. Read before implementing CSP.

## 1. What security headers exist today

Set globally in `site/next.config.ts` via `async headers()` on `source: "/(.*)"`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |

This is a solid baseline.

## 2. Finding: there is NO Content-Security-Policy

`next.config.ts` carries a comment:

> `// CSP is now set per-request in proxy.ts (nonce-based policy)`

**This comment is inaccurate.** `site/src/proxy.ts` (the Next.js 16 proxy, formerly
middleware) does WordPress-legacy 410s, in-memory rate limiting, page-view logging,
and A/B variant assignment — but it sets **no** `Content-Security-Policy` header.
No CSP is emitted anywhere in the app today.

Action: either implement CSP (below) or, at minimum, correct/remove the misleading
comment in `next.config.ts`.

## 3. Where CSP should live: app vs nginx (Hetzner VPS)

The real deploy target is the Hetzner VPS (nginx + PM2), not Vercel.

| Option | Pros | Cons |
|--------|------|------|
| **Next.js app** (`proxy.ts`, nonce-based) | Per-request nonces enable a strict `script-src 'nonce-…'` without `'unsafe-inline'`; lives with the code; works identically in every environment | Must thread the nonce into `<script>`/GTM tags; proxy runs on every request |
| **nginx** (`add_header`) | Central, no app changes, easy to tweak without redeploy | Static policy only — cannot do per-request nonces, so inline scripts (GTM, JSON-LD, Speculation Rules, consent bootstrap) force `'unsafe-inline'`, weakening the policy |

Recommendation: **nonce-based CSP in `proxy.ts`** is the stronger option because the
site relies on several inline scripts (consent-mode bootstrap, Speculation Rules, ~12
JSON-LD blocks, GTM). A static nginx CSP would have to allow `'unsafe-inline'` for
`script-src`, which defeats much of CSP's value. If a quick win is preferred, start
with a **`Content-Security-Policy-Report-Only`** header in nginx to gather violations
before enforcing.

## 4. Example starting policy

This site loads: Google Tag Manager / GA4, YouTube embeds, a Google Maps iframe,
Stripe (FPX payments), Sentry, and Microsoft Clarity. A workable starting point
(tighten after testing in Report-Only mode):

```
default-src 'self';
script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://js.stripe.com https://www.youtube.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self' data:;
connect-src 'self' https://www.google-analytics.com https://*.sentry.io https://www.clarity.ms https://api.stripe.com;
frame-src https://www.youtube.com https://www.google.com https://js.stripe.com https://hooks.stripe.com;
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
object-src 'none';
upgrade-insecure-requests;
```

Notes:
- `style-src 'unsafe-inline'` is hard to avoid with Tailwind's injected styles and
  inline `style=` attributes; acceptable, as style-based attacks are low-risk.
- Replace `{NONCE}` per request if implementing in `proxy.ts`; drop the nonce token
  and accept `'unsafe-inline'` for `script-src` only if implementing statically in nginx.
- Verify against the live GTM container — additional vendor domains (TikTok, Meta
  Pixel) may need adding to `script-src`/`connect-src` depending on what GTM injects.

---

## Appendix A — Serwist precache of `/zh/*` (P2 item: investigated, no change)

`site/src/app/sw.ts` configures Serwist with `runtimeCaching: defaultCache` and
`navigationPreload: true`. `defaultCache` (from `@serwist/next/worker`) already applies
a runtime caching strategy to document navigations, so `/zh`, `/zh/about`, `/zh/rooms`,
and `/zh/location` are cached on first visit without an explicit precache list. The only
`additionalPrecacheEntries` entry is `/~offline` (the offline fallback). Adding the zh
routes to the precache manifest would force them to be fetched and cached at SW install
for every visitor — unnecessary cost for pages most users never open. **Decision: no
change; `/zh/*` is already covered by runtime caching.**

## Appendix B — Sentry Session Replay (P2 item: investigated, recommend, no change)

`site/src/instrumentation-client.ts` sets `replaysSessionSampleRate: 0.1` and
`replaysOnErrorSampleRate: 1.0`, so Session Replay is active (10% of sessions, 100% of
error sessions). The Replay integration is a meaningful slice of the ~120 KB gzip Sentry
client bundle. If replays are not actively used for debugging, setting both rates to `0`
stops capture (saves Sentry quota); fully removing the bundle weight requires excluding
the Replay integration from the client SDK build.

**No change made** — this file has uncommitted local edits and is error-monitoring
infrastructure; the safe call is to let the owner decide. If desired, the minimal,
reversible step is to set `replaysSessionSampleRate: 0` (keep `replaysOnErrorSampleRate`
if error replays are still wanted).
