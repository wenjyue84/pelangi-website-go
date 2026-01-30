# Pelangi Capsule Hostel Website Plan

**Tasks:** TASK630-635 - Website Development Series
**Priority:** High (TASK630)

---

## Executive Summary

Comprehensive website plan for Pelangi Capsule Hostel using Next.js 15 + Tailwind CSS, deployed on Vercel. The existing `builder-app` project provides the foundation.

---

## 1. Website Structure

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Landing page, key info, booking CTA |
| Book | `/book` | Pricing, booking channels, WhatsApp direct |
| Gallery | `/gallery` | Photo grid + usage video |
| Location | `/location` | Map, directions, nearby attractions |
| FAQ | `/faq` | Common questions, house rules |
| Contact | `/contact` | Staff contacts, AI chatbot |

---

## 2. Verified Business Data

| Item | Value |
|------|-------|
| Address | 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru |
| Price | RM35/night |
| Check-in | 2:00 PM |
| Check-out | 12:00 PM |
| WiFi | Network: "pelangi capsule" / Password: "ilovestaycapsule" |
| Google Maps | https://maps.app.goo.gl/maLXetUqYS5MtSLD9 |
| Photos | https://photos.app.goo.gl/NLJARWwjuLy5wdGn7 |
| Usage Video | https://photos.app.goo.gl/BLFUFfcNVJZdhKAC6 |
| Contact Jay | +60127088789 |
| Contact Alston | +60167620815 |

---

## 3. Task Dependencies

```
TASK630 (Design/Wireframes) ← START HERE
    │
    ├──► TASK631 (Content)
    │       │
    │       ├──► TASK633 (Booking Integration)
    │       ├──► TASK634 (Gallery/Video)
    │       └──► TASK635 (AI Chatbot)
    │
    └──► TASK632 (Vercel Setup) [Can run in parallel]
```

---

## 4. Tech Stack

| Component | Technology | Status |
|-----------|------------|--------|
| Framework | Next.js 15.5 | Exists in builder-app |
| React | React 19.1 | Exists |
| Styling | Tailwind CSS 4 | Exists |
| CMS | Builder.io | Exists |
| Deployment | Vercel | Target |
| UI Components | shadcn/ui | Add |
| Maps | Google Maps API | Add |
| AI Chatbot | Vercel AI SDK + OpenAI | Add |

---

## 5. Timeline Estimate

| Phase | Tasks | Duration |
|-------|-------|----------|
| Foundation | TASK630, TASK632 | 2-3 days |
| Core Content | TASK631 | 2 days |
| Booking | TASK633 | 1 day |
| Media | TASK634 | 2 days |
| AI | TASK635 | 2 days |
| Polish | Testing, optimization | 1 day |
| **Total** | | **10-12 days** |

---

## 6. Key Design Decisions

- **Mobile-first**: Budget travelers often browse on phones
- **WhatsApp prominent**: Primary booking channel
- **Fast loading**: Target <3s on 3G
- **Bilingual**: EN + CN minimum
- **Clean minimal**: Modern, trustworthy, not intimidating

---

## 7. Immediate Next Steps

1. Review full plan in `pelangi-website-full-plan.md` (detailed wireframes)
2. Start TASK630: Create wireframes in Figma or code
3. Start TASK632: Set up Vercel project, configure domain
4. Download and optimize photos from Google Photos

---

*See full detailed plan with wireframes in the companion document.*
*Generated: 2026-01-30*
