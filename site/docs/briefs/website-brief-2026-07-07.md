# Website Brief — 2026-07-07 (Tue)

## Site health
- https://pelangicapsulehostel.com/ → 200 ✅
- /sitemap.xml → 200 ✅ | /llms.txt → 200 ✅
- robots.txt: no "Cloudflare Managed" marker (AI-crawler guard clean) ✅
- Deploy drift: deployed binary 2026-07-06 01:14 MYT vs newest local go-site commit 2026-07-06 01:17 MYT — 3-minute gap, consistent with commit-right-after-deploy (55399ed weekend-aware rates). No real drift suspected; verify only if ARI weekend rates misbehave.

## Guest insights (PIC - Maya Ayu group, since 2026-07-06 + live PMS)
- **Occupancy 73%** — 22/30 capsules occupied (PMS public API, Tue midday). Free: J1, J4, C5, C6, C16, C17, C21, C23.
- **Walk-in negotiation pattern:** guest asked 3-day price, settled on paying 2 nights first + extend later; C1 also extended a day. Flexible pay-as-you-go extensions are the norm for walk-ins.
- **Monthly private-room demand:** inquiry for Room 3A — RM500/month + RM250 deposit confirmed by staff. Long-stay demand beyond capsules.
- **SG-origin late arrival:** +65 guest arriving late night 07-06; Jay coordinated pre-registration + self check-in with Ayu, rent collected next day. Recurring late-arrival flow.
- **Ops incident (resolved):** C18/C24 occupant unreachable ~2 days with belongings inside; paper-notice-on-capsule procedure used; guest turned out to have paid.
- **Staff/ops:** OTA auto-sync into PMS announced to team 07-06 (Agoda/Booking.com/Trip.com/Hostelworld); aircond auto-off 7pm near C20 + 20°C at C15 (energy tuning).

## Content pipeline — SATURATED, no publish today
Newest live post: 2026-07-05. Scheduled queue already covers **07-08, 07-11, 07-14, 07-17, 07-20, 07-23** (auto-publish, no redeploy needed). Gate (≥3-day spacing) fails today and every day until ~07-26. **Persona-scoring agents skipped — no publishable slot; re-run scoring ~2026-07-24.**

Candidate topics banked for the next open slot (grounded in this week's signals):
1. Johor Offroad International Championship (31 Jul, Sutera Mall) — weekend budget-stay angle
2. Private room vs capsule for monthly JB stays (RM500 room vs RM594 capsule) — from real 3A inquiry
3. Late-night arrival in JB: step-by-step self check-in for Singapore guests
4. Pay-two-nights-extend-later: flexible stays for SG job-hunters (1.18M Malaysians in SG, contract-role hiring trend)
5. RTS Link station system testing starts Sept 2026 — milestone update post (when news confirms)

Trend sources: [LTA RTS Link](https://www.lta.gov.sg/content/ltagov/en/upcoming_projects/rail_expansion/JB-Singapore_RTS_link.html), [Railway News RTS 2026 update](https://railwaynews.net/rts-link-project-johor-bahru-singapore-lrt-system.html), [FMT Skudai jobs/SG reliance](https://www.freemalaysiatoday.com/category/nation/2026/07/02/jobs-wages-and-reliance-on-singapore-key-concerns-in-skudai), [JB events](https://thingstodoinjohorbahru.com/events/), [JBTF](https://jbtf.my/)

## Open SEO tasks (top 5 of 16)
1. GBP — review short-link + first weekly post
2. TripAdvisor — finish claim (legal cert + ID pending)
3. Bing Webmaster Tools — import from GSC
4. Bing Places — import from GBP
5. Wikidata Q140363023 — add TripAdvisor/Booking/Hostelworld external IDs

Note: untracked `_bing_status.png`, `_gbp_*.png` screenshots in repo root suggest recent Bing/GBP work — confirm with Jay before ticking tasks 1/3/4.

## Blockers
- None. All health checks green.
