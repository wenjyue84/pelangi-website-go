# Website Brief — 2026-07-11 (Sat)

## Site health — ✅ all green

| Check | Result |
|---|---|
| Homepage | 200 |
| /sitemap.xml | 200 |
| /llms.txt | 200 |
| robots.txt Cloudflare-managed | 0 (clean, no self-heal needed) |
| Deploy drift | Binary 2026-07-08 17:34 MYT vs last go-site commit 17:37 MYT — commit made 3 min after deploy (same session ba128a8, content verified live). Not a blocker. |
| Scheduled post #39 | **Auto-published today** — `/blog/rm594-month-jb-long-stay-singapore-commute-base` = 200 ✅ |

**Occupancy (PMS live):** 18/30 occupied (60%), 12 pods free. Same as Friday's rate.

## Guest insights (WhatsApp: PIC - Maya Ayu meeting, since 07-10)

- **Two walk-ins Friday night** — walk-in traffic real, staff coordinating live in group.
- **Walk-in #2: Indian national from KL (passport, no work permit)** — demanded a private *bilik*, refused capsule, refused ID at payment, eventually left after cash settlement (RM575). Jay's framing: Friday night, every JB room >RM100, capsule is cheapest — good retention script, worth standardising.
- **"Private room, not capsule" is the #1 walk-in friction.** Maya's counter-pitch was monthly social proof: "banyak yg duduk bulan2".
- **Rate-card gap:** staff fumbled walk-in pricing (RM48/night quoted, arithmetic confusion 48×3). RM48 ≠ published RM35 weekend — clarify if walk-in premium is intentional; give staff pinned rate card.
- **⚠️ Private room quoted RM450/month internally** (Alston to Ali's query) vs **RM500 published** on site. Align staff or confirm discount — SEO content says RM500.
- No OTA-channel or facility complaints in this batch.

## Content — pending (gate failed)

Post #39 (RM594 monthly commuter maths) went live today; queue filled through **Jul 23** (posts scheduled 07-14, 07-17, 07-20, 07-23). 3-day-spacing gate blocks new publish until ~Jul 26.

Persona-scored shortlist (5 agents: backpacker / SG commuter / visa-runner / weekend tourist / job-seeker):

| Topic | Avg | Top personas |
|---|---|---|
| Private Room vs Capsule in JB: which should you book? | **8.4** | backpacker 9, commuter 9, visa-runner 9, job-seeker 9 |
| Friday Night Walk-In in JB: why every room is RM100+ | **8.4** | backpacker 9, visa-runner 9 |
| Durian Season night markets near Taman Pelangi | 6.4 | weekend tourist 9 (time-sensitive — July peak) |
| Bukit Chagar RTS station area guide | 6.4 | commuter 9 |
| Visit Johor 2026 budget weekend itinerary | 4.8 | weekend tourist 8 |
| myStarjob Fair Southkey stay guide (Jul 25-26) | 4.6 | job-seeker 10 (but dies after Jul 26) |

**Recommendation for Jul 24+ slots:** "Private Room vs Capsule" — directly converts this week's real walk-in friction AND markets the RM500 room. Yesterday's candidate (Causeway tips, 8.4) still valid. Note: durian topic loses value after July; myStarjob topic expires Jul 26 — if wanted, would need out-of-band publish before the fair (gate override = Jay's call).

## Open SEO tasks (top 5)

1. **STAAH RM30/35 push to Booking.com — STILL NOT DONE (critical, confirmed 07-08):** Booking.com shows only "Single Room" MYR 45, no capsule inventory. Alston must fix in STAAH.
2. TripAdvisor claim — finish (legal cert + ID pending).
3. GBP review-ask script → WhatsApp quick reply (needs Jay's phone).
4. Ask Alston/Maya: Sleepy Bear's monthly worker rate (competitive intel).
5. Weekly GBP post due **Mon 2026-07-13**.

## Blockers

- None site-side. Operational: STAAH/Booking.com rate push (item 1) + RM450-vs-RM500 private-room quote misalignment.

## Addendum (12:15) — Traffic stats trace + enhancements

**Sources:** Go app request log (12 days, Jun 30–Jul 11) + nginx access logs (14 days). Cloudflare GraphQL analytics blocked — no token has zone Analytics Read (Jay: add permission to account token at dash → api-tokens). CF Web Analytics (RUM) is installed + enabled since Feb — view in dashboard.

**Traffic:** ~1.2–2k req/day; spike 4,023 on Jul 6 (IndexNow 68-URL submit). Homepage 1,354 hits/12d.

**Top blog posts (12d):** Lalamove driver guide **226** (2.6× #2), JB-SG commuter guide 86, Causeway day-trip 45, Laksa Johor 32. Career/gig cluster dominates — matches persona scores.

**GEO working:** ChatGPT sends real visitors (`utm_source=chatgpt.com` full pageview + availability API check = booking intent). AI crawlers 10d: ClaudeBot ~2.6k, ChatGPT-User 454 (live user queries!), GPTBot 235, meta-external 199, Perplexity ~130. llms.txt 42 fetches.

**Search engines:** bingbot 1,198 vs Googlebot 252 — IndexNow paying off on Bing; Google organic referrals still small (~40 real/10d, mostly homepage + Lalamove post). GSC review worth doing.

**Attack noise (handled):** wp-login/xmlrpc floods correctly get 410 from Go (de-index strategy intact). No action needed.

**Enhancements shipped:**
1. Lalamove post CTA rebuilt — RM30/35 nightly + RM594 monthly + RM500 private room, internal links to both monthly posts (commit 5262f3f, deployed, verified live, IndexNow 200).
2. Per-vhost nginx access log `/var/log/nginx/pelangi-website.access.log` (vhost format, real client IPs via CF-Connecting-IP) — clean per-site stats from today onward; nginx -t passed, reloaded, verified receiving.

**Follow-ups:** (a) Jay: add Zone Analytics Read to CF token so briefs can pull GraphQL stats; (b) content idea validated by data — more gig-driver content (Grab/Foodpanda JB guides) feeds the proven cluster; (c) commuter guide still quotes RM35–50/night (historical-prose rule — left untouched, but its CTA could get same treatment next session if Jay approves).

---

## Addendum (same day, 20:00) — Follow-ups executed + gig-cluster expansion shipped

**Follow-up (c) done:** commuter-guide closing CTA rebuilt to the Lalamove conversion pattern (RM30/35 nightly + RM594 monthly + RM500 private room + links to both monthly posts) — deployed, verified live, IndexNow 200. Historical RM35–50 prose left untouched per the historical-prose rule.

**Follow-up (b) done — gig cluster filled (commit 4220e78).** 4 scheduled posts, 3-day spacing after the Jul-23 queue, all sources verified against official driver pages:

| Live | Slug | Angle |
|------|------|-------|
| Jul 26 | grab-driver-jb-guide-2026 | PSV/EVP process, JB hotspots, realistic earnings, vs Lalamove |
| Jul 29 | delivery-gig-apps-jb-comparison-2026 | Grab vs Lalamove vs Foodpanda tables + daypart stacking (the Lalamove post's winning format) |
| Aug 1 | gig-worker-jb-monthly-budget-guide | Full JB month on gig income — RM594/RM500 rent anchor; strongest conversion post |
| Aug 4 | foodpanda-rider-jb-guide-2026 | Shift-session system, sign-up, gear, RM/hour |

All 4 slugs verified 404 today (scheduled gate correct); daily brief will verify 200 + IndexNow-ping each on go-live. Cross-links added from the Lalamove + gig-jobs posts; search index gated with live: dates.

**Follow-up (a) still Jay:** CF token needs **Zone > Analytics > Read** (GraphQL stats) — and add **Zone > Cache Purge** while in there (today's widgets_b.js purge failed auth 10000). Click path in seo-tasks.md; Claude-for-Chrome can drive it.

**Queue now booked to Aug 4.** Next slots (Aug 7+): Private-Room-vs-Capsule (8.4) + Friday-walk-in.
