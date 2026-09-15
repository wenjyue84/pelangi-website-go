# Website Brief — 2026-07-16 (Thu)

## Site Health

| Check | Status |
|-------|--------|
| pelangicapsulehostel.com | ✅ 200 |
| /sitemap.xml | ✅ 200 |
| /llms.txt | ✅ 200 |
| AI-crawler guard (robots.txt) | ✅ Clean (Cloudflare managed = 0) |

### ⚠️ BLOCKER: Undeployed go-site Changes

- Binary mtime on VPS: `2026-07-15 23:51:59 MYT`
- Latest go-site git commit: `2026-07-15 23:53:18 MYT` (feat: schedule 3 posts Sep 10/13/16)
- Gap: ~2 minutes — binary predates the commit. Changes not yet deployed.
- Action: run `./build.sh` + deploy per `go-site/DEPLOY.md`.

---

## Occupancy (PMS public API — 2026-07-16 10:33 MYT)

- **Total pods:** 33
- **Available:** 15
- **Occupied:** 18
- **Occupancy rate: 54.5%** (mid-week Thu baseline, consistent with last session)

Available pods: C1, J1, J4, C5, C6, C12, C13, C16, C17, C20, C21, R3A, R7, R8, R9

---

## Guest Insights

WhatsApp (Periskope) paused until 2026-07-22 — no new signals this session. Using PMS data as proxy.

- Mid-week (Thu) 54.5% occupancy — healthy but below weekend target; weekend pods (R-series) showing good fill
- C-prefix pods most available mid-week; R-series (weekend bunks) majority occupied — suggests weekend visitors still in-house or slow weekend checkout
- No new WhatsApp guest signals available until Jul 22 resume

---

## Content Pipeline

### Publish Gate: BLOCKED

- Newest published Date in blog.go (Date ≤ 2026-07-16): **2026-07-14**
- Days since last publish: **2 days**
- Gate requires: 3-day minimum gap
- **Gate opens: 2026-07-17** — but Jul 17 already has a scheduled post
- Next clean slot: **Sep 19, 2026** (queue runs through Sep 16 at 3-day spacing)

### Trend Scan Summary (July 2026)

- **RTS Link:** 90%+ complete, systems testing Sep 2026, commercial launch Jan 2027. Fare RM15.50–RM21.70. Co-located CIQ (single checkpoint at departure station). Strong "before the wave" content angle.
- **Visa-free deadline:** China and India nationals visa-free until Dec 31, 2026 only. Expiry in ~5 months — urgency hook for SG-based Indian/Chinese expat audience.
- **MDAC:** Malaysia Digital Arrival Card replaced paper disembarkation card. First-timers frequently miss this. High search intent, practical explainer gap.
- **Causeway peaks:** Friday evenings, Sunday afternoons confirmed worst times. Cross-referencing with CausewayTraffic.sg data — timing guide has strong bookmark/return-visitor potential.
- **Supply pressure:** New JB hotel openings Jan 2026; competitor Attrus BnB using "5-min from CIQ" positioning. Differentiation on price + experience matters more now.

### Candidate Topics — Persona Scored

| # | Topic | BP | Cmtr | VR | WT | JS | **Avg** |
|---|-------|----|----|----|----|----|----|
| T5 | Beat the Causeway Jam: Best Times to Cross to JB in 2026 | 9 | 10 | 10 | 9 | 9 | **9.4** ⭐ |
| T3 | MDAC Explained: Digital Arrival Form for First-Time JB Visitors | 9 | 8 | 9 | 8 | 8 | **8.4** |
| T4 | RTS Link Monthly Commute vs JB Monthly Stay: Real Numbers | 8 | 9 | 3 | 3 | 9 | **6.4** |
| T6 | Why JB on a Weekday Beats the Weekend (First Trip Guide) | 6 | 2 | 5 | 7 | 3 | **4.6** |
| T1 | Before the RTS Rush: Why Now Is the Best Time to Stay in JB | 5 | 3 | 4 | 5 | 4 | **4.2** |
| T2 | India & China Tourists: Malaysia Visa-Free Ends December 2026 | 4 | 2 | 2 | 2 | 1 | **2.2** |

*Personas: BP=Backpacker, Cmtr=SG Daily Commuter, VR=Visa Runner, WT=Weekend Tourist, JS=Job Seeker*

**Pending — gate blocked. Top picks for Sep 19+ slot:**

1. **T5 (9.4)** — "Beat the Causeway Jam: Best Times to Cross to JB in 2026" — dominant across all 5 personas, evergreen + freshened with 2026 peak data. Bookmarkable. High-intent search. ✅ Recommend publish Sep 19.
2. **T3 (8.4)** — "MDAC Explained" — practical, fills a real information gap. Good for Sep 22.

---

## Open SEO Tasks (Top 5)

1. **⚠️ GBP weekly post — 3 DAYS OVERDUE** (due Mon Jul 13, now Thu Jul 16). Jay to post this week's GBP update ASAP.
2. **TripAdvisor claim** — SSM cert PDF ready (Google Drive id `1wPLxxl3AU59HhFn66MqTbHTitu5wX_Jc`, biz reg 202203226886). Needs browser login at tripadvisor.com/owners.
3. **CF API token** — add Zone > Analytics > Read + Zone > Cache Purge > Purge. Auth error 10000 currently blocking cache purge on deploys touching `static/js/*`.
4. **STAAH: RM30/35 not on Booking.com** — Booking.com still shows old RM45 "Single Room" only. Alston must open capsule inventory + push correct rates in STAAH.
5. **Reddit presence** — answer JB-stay questions on r/askSingapore, r/JohorBahru, r/solotravel (audit H1).

---

## Blockers

1. **Undeployed go-site changes** — deploy the Sep 10/13/16 scheduled posts binary ASAP.
2. **GBP weekly post overdue** — 3 days late as of today. Draft and post today.
3. **Publish gate blocked** — opens Jul 17 but that slot is taken; next clean slot Sep 19.
4. **Periskope paused** until Jul 22 — no WhatsApp guest insights until then.

---

*Generated: 2026-07-16 10:37 MYT*
