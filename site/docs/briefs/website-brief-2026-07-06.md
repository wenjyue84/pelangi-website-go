# Website Brief — 2026-07-06 (Mon)

## Site health
- Root / sitemap.xml / llms.txt → all **200** ✅
- robots.txt: Cloudflare-managed = **0** (AI crawlers open) ✅
- **Flag (minor):** local go-site commit `55399ed fix(ari): weekend-aware rates + PMS real-occupancy fallback` (07-06 01:17 MYT) is ~3 min newer than deployed binary (07-06 01:14 MYT). Marginal gap; live `/api/ari` already returns correct weekend split (Mon RM30 / Sat RM35), so behavior looks deployed. Offer to redeploy if Jay wants certainty.

## Guest insights — PARTIAL (real occupancy in; WhatsApp still pending restart)
- **PMS occupancy (LIVE, real): 19/30 occupied = 63%** — via no-auth `GET /api/public/capsules` (`total:30, availableCount:11`, 16:27 MYT). Replaces the earlier "SPA shell, no data" reading; the fragile WebFetch was the wrong endpoint. Skill Step 2 now curls the public API.
- Periskope WhatsApp MCP was **not connected** this session → "PIC - Maya Ayu meeting" not scanned. Local stdio server `periskope-whatsapp` now registered in `~/.claude/.mcp.json`; loads on next Claude Code restart, then re-run the brief for guest-mix signals.
- `/api/ari` returns `available_units: 18/18` (Beds24 full-inventory fallback, not real occupancy) — for occupancy use the PMS public API above, not ARI.
- **Guest-mix (nationalities/purpose) still unavailable** until WhatsApp MCP is live post-restart. Not fabricated.

## Content pipeline — HEALTHY, no publish needed
Publish gate **FAILS** (correctly): post published yesterday (07-05) + scheduled queue already spaced every 3 days:

| Date | Title | Persona |
|------|-------|---------|
| 07-05 (live) | RTS Link Final Testing Phase | commuter/tourist |
| 07-08 | Why July Is the Best Month to Visit JB on a Budget | backpacker/tourist |
| 07-11 | RM594/Month Capsule Pod: Honest Maths for SG Commuters | commuter |
| 07-14 | Singapore LQS Rises to S$1,800 July 2026 | job-seeker |
| 07-17 | JB Durian Season July 2026 Budget Guide | tourist/backpacker |
| 07-20 | myStarjob Fair JB July 2026 Weekend Plan | job-seeker |
| 07-23 | JB as a Transit Base for Foreign Workers | visa-runner/worker |

Skipped the 5-agent persona panel — hard 3-day gate cannot pass, so scoring would be wasted spend (per spend-limit rule).

**Backlog candidates (for after 07-23, grounded in today's trend scan):**
- RTS Link opens Dec 2026 (fares S$5–7, Bukit Chagar ICQ w/ 100 AI e-gates) — "book your JB base before the rush" angle
- RTS fare S$5–7 vs bus/taxi cost breakdown for daily commuters
- Bukit Chagar ICQ e-gate walkthrough — first-time border crossing guide

## Open SEO tasks (top 5)
1. GBP — review short-link + first weekly post (recurring Mon)
2. TripAdvisor — finish claim (legal cert + ID pending), amenities, photos
3. STAAH — verify RM30/35 pushed to Booking.com + capsule inventory open
4. Bing Webmaster Tools + Bing Places — import from GSC/GBP
5. Confirm homepage testimonials are real guests (else swap for real Google/Booking quotes)

## Blockers
- None hard (site fully up). Periskope MCP down = degraded guest-insight only.
