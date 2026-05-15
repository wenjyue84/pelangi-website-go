# CLAUDE.md — Pelangi Website

## What This Is

Marketing + booking site for **Pelangi Capsule Hostel**, Johor Bahru, Malaysia.  
**Live URL:** https://pelangicapsulehostel.com  
**Deploy:** Vercel (auto from git)

## Architecture Integration

The website is the **static knowledge source** in a 3-service stack:
1. Rainbow AI (WhatsApp bot) syncs KB from this site via `PELANGI_WEBSITE_URL`
2. AI-readable content served at `/llms.txt` and `/llms-full.txt`
3. Webchat widget on the site routes to Rainbow AI via Next.js rewrite (`/api/chat/*`)
4. Full integration docs: `../rainbow-pms-pelangi-site/`

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 + React 19 + TypeScript |
| Styling | Tailwind CSS 4 + @tailwindcss/typography |
| Payments | Stripe (FPX Malaysia online banking) |
| Channel Mgr | Beds24 (OTA sync: Booking.com, Agoda, Hostelworld) |
| Email | Resend |
| Search | Fuse.js (client-side) |
| PWA | Serwist (service worker) |
| Error tracking | Sentry |
| Deploy | Vercel |

## Key Content Files

```
src/data/
  rooms.ts            # Room types, pricing, specs
  faq-items.ts        # 17 Q&A items
  amenities.ts        # Facilities list
  blog/posts.ts       # 31 blog posts (Food, Travel, Guides)
src/app/
  (routes)/           # App router pages
  api/                # API route handlers
public/
  llms.txt            # AI-readable property overview ← Rainbow AI syncs this
  llms-full.txt       # Full AI content dump ← Rainbow AI syncs this
```

## API Routes

| Route | Purpose |
|-------|---------|
| `GET /api/ari` | Live availability + rates (Beds24, 5-min cache) |
| `POST /api/create-payment-intent` | Stripe FPX payment |
| `POST /api/stripe-webhook` | Payment events |
| `POST /api/webhooks/beds24` | Channel manager sync |
| `POST /api/revalidate` | ISR cache invalidation |

## Next.js Rewrites (Integration Points)

```js
// In next.config.ts:
"/book" → "https://admin.pelangicapsulehostel.com/book"
"/api/chat/*" → Rainbow AI webchat URL (RAINBOW_API_URL env)
"/api/public/*" → PMS2 public booking API
```

## Critical Env Vars

| Var | Purpose |
|-----|---------|
| `RAINBOW_API_URL` | Rainbow AI URL for webchat rewrite |
| `BEDS24_API_KEY` | Channel manager availability |
| `BEDS24_PROPERTY_ID` | Beds24 property ID |
| `STRIPE_SECRET_KEY` | Payment processing |
| `STRIPE_WEBHOOK_SECRET` | Payment webhook validation |
| `REVALIDATE_SECRET` | ISR cache invalidation auth |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager |

## Property Facts (used by Rainbow AI KB)

- **Address:** 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru
- **Rooms:** Lower Deck Pod (RM35/night), Upper Deck Pod (RM45/night)
- **Check-in:** 3:00 PM | Check-out: 12:00 PM
- **WiFi:** Network `pelangi capsule` | Password `ilovestaycapsule`
- **Tourism Tax:** RM10/room/night
- **Contact:** Via WhatsApp links on `/contact` page

## Development

```bash
npm install
npm run dev          # Next.js dev server :3000
npm run build        # Production build
npm run typecheck    # TypeScript check
npm run test:e2e     # Playwright tests
```

## Coding Patterns

- **App Router** — all pages under `src/app/`
- **`use cache` directive** — homepage and stable pages use Next.js cache
- **ISR revalidation** — trigger via `POST /api/revalidate` with `x-revalidate-secret` header
- **PII hashing** — email/phone must be SHA-256 hashed before sending to Meta/TikTok APIs
- **No hard deletes** — content is versioned in git
- **`llms.txt` and `llms-full.txt`** — keep updated when room types or policies change; Rainbow AI reads these

## When You Update Content

If you change room prices, policies, check-in times, or amenities:
1. Update `src/data/rooms.ts` or `src/data/faq-items.ts`
2. Update `public/llms.txt` and `public/llms-full.txt` to match
3. Trigger Rainbow AI KB re-sync via admin dashboard or `POST /api/rainbow/knowledge-base/sync`
