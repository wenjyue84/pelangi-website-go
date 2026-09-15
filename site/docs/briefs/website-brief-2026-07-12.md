# Website Brief — 2026-07-12 (Sun)

## Site health
- Home / sitemap.xml / llms.txt → **all 200** ✅
- robots.txt "Cloudflare Managed" count = **0** (AI-crawler guard OK) ✅
- Deploy drift: deployed binary `2026-07-11 22:33 MYT` vs local go-site commit `22:34 MYT` — 75s newer, consistent with build-then-commit ordering. **No real drift.**
- Live occupancy (PMS): **24/30 occupied = 80%** on a Sunday morning — strong.

## Guest insights
- WhatsApp "PIC - Maya Ayu meeting" = internal staff ops only (cleaning, cash drawer, room codes, one plumbing/drain repair). **No guest nationality / stay-purpose / booking-channel signals** this cycle.
- Only guest-facing traces: "Ada customer want check in", "Saya ingat customer sampai" — no context.
- Proxy signal = 80% occupancy. Demand healthy despite RM30/35 price cut.

## Trends scanned (web)
- **myStarJob Fair 2026** — Mid Valley Southkey JB, **25–26 Jul** (job-seeker persona, near Pelangi). → already covered: post `mystarjob-fair-jb-july-2026-weekend-plan` scheduled 07-20.
- **RTS Link** end-2026 launch, 90% built, testing from Sept; co-located CIQ. → covered: `rts-link-jb-singapore-final-testing-2026` (07-05).
- **300,000 daily causeway commuters**, SG wages 2–4×, Johor–SG SEZ taking shape. → commuter/job-seeker cluster already dominant in queue.
- Johor Durian Festival (Segamat, 8–12 Jul) → covered `jb-durian-season-july-2026-budget-guide` (07-17).

## Content pipeline — GATE FAILED (spacing)
Newest published post = **2026-07-11 (rm594-month, 1 day ago)** → violates "no post in last 3 days". Deterministic block; persona scoring skipped (no score overrides spacing; spend-aware).

**Scheduled queue already full through 2026-08-04 (every ~3 days):**
| Date | Slug |
|------|------|
| 07-14 | singapore-lqs-1800-july-2026-malaysians-guide |
| 07-17 | jb-durian-season-july-2026-budget-guide |
| 07-20 | mystarjob-fair-jb-july-2026-weekend-plan |
| 07-23 | jb-transit-base-foreign-workers-guide |
| 07-26 | grab-driver-jb-guide-2026 |
| 07-29 | delivery-gig-apps-jb-comparison-2026 |
| 08-01 | gig-worker-jb-monthly-budget-guide |
| 08-04 | foodpanda-rider-jb-guide-2026 |

**Next slots (post-08-04, already chosen in seo-tasks §47):** Private-Room-vs-Capsule (persona 8.4) + Friday-walk-in post. No new topic needed today.

## Open SEO tasks (top 5)
1. **STAAH: RM30/35 NOT pushed to Booking.com** — only "Single Room" MYR45 listed, no capsule pods. Alston must open capsule inventory. (recurring)
2. CF API token: add Zone > Analytics > Read + Cache Purge > Purge (edge cache purge failing, err 10000).
3. Weekly GBP post — **next due Mon 2026-07-13** (tomorrow).
4. TripAdvisor: finish claim (legal cert + ID pending), amenities, price range, photos.
5. Ask Alston/Maya: Sleepy Bear monthly worker rate (competitor intel).

## Blockers
- None on the site. Business blocker persists: Booking.com still shows old RM45 single-room, no capsule inventory (STAAH push owed by Alston).
