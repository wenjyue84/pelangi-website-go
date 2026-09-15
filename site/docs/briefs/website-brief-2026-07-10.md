# Pelangi Website Brief — 2026-07-10 (Friday)

## Site Health

| Check | Status |
|-------|--------|
| pelangicapsulehostel.com | 200 ✅ |
| /sitemap.xml | 200 ✅ |
| /llms.txt | 200 ✅ |
| robots.txt (Cloudflare managed) | 0 matches — clean ✅ |
| Deployed binary | 2026-07-08 09:34 UTC |
| Latest go-site/ commit | 2026-07-08 09:37 UTC (ba128a8) |

**Binary note:** 3-min gap (09:34 deploy, 09:37 commit) is the standard deploy-then-commit pattern. No undeployed changes.

## Occupancy

- **18/30 occupied (60%)** — Friday night
- Available: 12 pods
- Trend: healthy for a weekday-into-weekend

## Guest Insights (WhatsApp, Jul 9–10)

- Pakistani/South Asian walk-in guest checked in Jul 9; staff initially misidentified as Indian based on language similarity ("bukan, Pakistan 🤣")
- RM35/night rate confirmed (correct weekend pricing)
- Deposit collection policy queried by staff — ambiguity about whether deposit was collected; follow up with Alston
- **Dominant signal:** staff-coordination chatter; minimal direct guest contact in this window
- No booking channel mentions; walk-in arrival pattern suggests word-of-mouth or direct contact
- No complaints or unusual requests

## Content Pipeline

### Publish gate: FAILED

- Last published post: 2026-07-08 (ba128a8 — private rooms RM500/month) → 2 days ago < 3-day gate
- Scheduled queue: Jul 11, 14, 17, 20, 23 (every 3 days, queue full through Jul 23)
- **Next publish window: Jul 24–25**

### Candidate shortlist (sorted by avg persona score)

| # | Topic | Avg | Top persona |
|---|-------|-----|-------------|
| 5 | Causeway crossing tips 2026 — best times, buses, beat the queue | **8.4** | Weekend tourist + Backpacker + Visa-runner (all 9) |
| 1 | RTS Link September 2026 testing — what commuters need to prepare | **7.8** | SG commuter (9), Backpacker + Weekend tourist (8) |
| 7 | JB visa-run logistics 2026 — costs, timing, best budget base | **6.8** | Visa-runner (10), Backpacker + Job-seeker (9) |
| 2 | S-Pass & EP 2026 — step-by-step guide from a JB base | **5.8** | Job-seeker (10), SG commuter (8) |
| 4 | JB August 2026 events — Offroad Jul 31, Autoshow Aug 21, National Day | **4.4** | Weekend tourist (7) |
| 6 | Post-Johor election travel impact (results Jul 11) | **4.4** | Visa-runner (8), SG commuter (6) |
| 3 | New JB cafes July 2026 — Linn Cafe, Slowspace, Casa Quesillo | **4.2** | Weekend tourist (9), Backpacker (5) |

**Recommendation for Jul 24 slot:** Topic 5 (Causeway tips, 8.4 avg). Evergreen high-intent, four-persona crossover, nothing in the current scheduled queue covers it. Sources: CausewayTraffic.sg data + existing getting-here guide internal link.

**Runner-up for Jul 27 slot:** Topic 1 (RTS Link testing, 7.8 avg) — tie-in to scheduled post Jul 5 (RTS Link overview) for topical cluster building.

### Scheduled post going live tomorrow (Jul 11)
"RM594/Month Capsule Pod: The Honest Maths for JB-Based Singapore Commuters" — commuter persona, verifies itself on first publish cycle.

## Trend Context (July 2026)

- **RTS Link:** ~90% complete. Station systems testing Sept 2026; operations target late 2026/early 2027. Causeway still 45min–2hr on weekends.
- **Singapore work passes:** S-Pass minimum S$3,300 (most sectors) / S$3,800 (financial). LQS raised to S$1,800 Jul 1. EP COMPASS requires 40+ for renewal. Malaysia EP RM10k floor pushing mid-level talent to seek SG roles.
- **JB food openings:** Linn Cafe (rainforest-themed, char siew short ribs RM32.90), Slowspace (specialty coffee + Truffle Carbonara RM26), Casa Quesillo (Venezuelan dessert, Sunway Iskandar).
- **JB events:** Johor Offroad International Championship Jul 31 (Sutera Mall), Johor Autoshow Aug 21 (Angsana JB), National Day Aug 31.
- **Johor state election:** Jul 11 (tomorrow). Existing post published Jul 3 — no follow-up post recommended (scored 4.4 avg).

## Open SEO Tasks (Top 5)

1. 🔴 **STAAH: RM30/35 to Booking.com — CONFIRMED NOT DONE** (checked 2026-07-08, Booking.com shows only "Single Room" at RM45, no capsule pods). Alston must open capsule inventory + push rates in STAAH.
2. 🟡 **TripAdvisor claim** — legal cert + ID pending. Prompt 2 in `claude-for-chrome-prompts.md`.
3. 🟡 **GBP review-ask script → WhatsApp quick reply** — script ready in `offsite-seo-actions.md §1`; needs Jay's phone.
4. 🟡 **Weekly GBP post** — next due **Mon 2026-07-13**. Week of Jul 6 done (evidence `_gbp_post2.png`).
5. 🟡 **Reddit presence** — r/askSingapore, r/JohorBahru, r/solotravel — genuine answers to JB-stay questions (see backlog).

Full open list: `site/docs/seo-tasks.md`.

## Summary

Site healthy, 60% Friday occupancy, no blockers. Scheduled blog queue full through Jul 23. Best next post: **Topic 5 (Causeway tips, 8.4)** targeting Jul 24 slot. Critical action for Jay: **STAAH rate push** — Booking.com still showing old RM45 rate, capsule pods not listed at all.
