# Website Brief — 2026-07-08 (Wed)

## Site health
- https://pelangicapsulehostel.com/ → 200 ✅
- /sitemap.xml → 200 ✅ | /llms.txt → 200 ✅
- robots.txt: no "Cloudflare Managed" marker (AI-crawler guard clean) ✅
- Deploy drift: deployed binary 2026-07-08 01:36 MYT vs newest local go-site commit 2026-07-08 01:40 MYT — 4-minute gap, commit-right-after-deploy pattern (a88f196 testimonials deploy). No real drift.

## 🎉 Scheduled publishing proven in production
Post #38 **"Why July Is Actually the Best Month to Visit Johor Bahru on a Budget"**
(`/blog/july-best-month-visit-johor-bahru-low-season`) went live TODAY automatically —
no redeploy. Verified: page 200, slug in sitemap (×2), IndexNow pinged (HTTP 200).
First real-world confirmation of the 2026-07-05 scheduled-publishing feature.

## Guest insights (PIC - Maya Ayu group, since 2026-07-07 + live PMS)
- **Occupancy 57%** — 17/30 capsules occupied (PMS public API, Wed midday). Down from 73% Tue. Free: C1, J1, J4, C5, C6, C11, C13, C16, C17, C18, C21, C23, C24.
- **Monthly-room demand dominates this window.** All payment talk = monthly tenants: Room 1 (RM550, tenant wants to extend; RM550 bank-transfer payment initially unverified, staff later confirmed), Room 3A (RM500/month + RM250 deposit; deposit not yet collected — "Hanya bilik sahaja tanpa deposit").
- **C4 extended** ("Sambung") — only short-stay capsule activity in this window.
- **Prospective female tenant** — Maya to call back "akak yg hari tu tanya"; room still unfilled.
- **No OTA/foreign-guest signals** in this window — no +65 numbers, no Booking.com/Agoda mentions. Purely local monthly-rental ops.
- **Ops:** partition installation arriving today 10am; payment methods observed = bank transfer, TnG, cash.

## Content pipeline — gate fails, no publish (by design)
Post published TODAY (07-08, scheduled). 3-day spacing rule blocks new publishes.
Queue still covers **07-11, 07-14, 07-17, 07-20, 07-23** — next open slot ~07-26.
Persona scoring + trend scan skipped (candidates already banked in 07-07 brief; re-score ~2026-07-24).

Signal worth banking from today's WhatsApp: **monthly private-room demand (RM500–650/mo) keeps recurring** — strengthens banked candidate #2 "Private room vs capsule for monthly JB stays".

## Open SEO tasks (top 5 of 8 open)
1. **STAAH: RM30/35 push to Booking.com NOT DONE** — Booking.com still shows only "Single Room" MYR45, no capsule pods → Alston must open capsule inventory + push rates
2. TripAdvisor — finish claim (legal cert + ID pending)
3. GBP review-ask script → WhatsApp quick reply (needs Jay's phone)
4. Ask Alston/Maya: Sleepy Bear monthly worker rate (competitive intel)
5. Reddit presence: answer JB-stay questions (r/askSingapore, r/JohorBahru) — audit H1

Recurring: next weekly GBP post due **Mon 2026-07-13**.

## Blockers
- None. All health checks green.
