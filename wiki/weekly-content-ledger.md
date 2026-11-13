# Weekly content ledger — pelangicapsulehostel.com

Process: `~/.claude/skills/pelangi-weekly/SKILL.md` (modelled on senaibilik-weekly). Blog = Go source; a change ships by rebuild + binary swap.

## Run 1 — 2026-10-30 (first run; Jay asked 2026-10-30)

**Shipped:** 4 new English posts + corrections to 8 older posts. Build + ACI 110/110, deployed to Hetzner (backup `pelangi-go.bak.20261030-043700`), live-verified, IndexNow 200 (4 new URLs).

### Fact-checked (8 of a planned 10; stopped on cost)
| slug | verdict | old → new, source |
|---|---|---|
| rts-link-january-2027-jb-travel-guide | corrected | "January 2027 target / fares unpublished" → opening expected around Feb 2027 subject to certification; fares to be announced by end-2026. malaymail.com 2026-10-20 |
| rts-link-johor-bahru-singapore-traveler-guide | corrected | opening table/FAQ Dec 2026–Jan 2027 → Feb 2027; Woodlands North "North-South Line" → Thomson-East Coast Line (taken from the other RTS post, not fetched) |
| malaysia-tourism-tax-jb-hostel-walk-in-guide | corrected/softened | check-in time fixed; RM10/room/night only confirmed by 2017-era news, customs.gov.my pages 404 → "check with Customs" link |
| singapore-expat-visa-run-johor-bahru-guide-2026 | corrected/softened | CW1 payment options per causewaylink.com.my (ManjaLink / contactless card / LUGO, not EZ-Link); CW1 fare softened; Singapore-citizen MDAC exemption cites thestar.com.my 2023-12-05 |
| ktm-ets-train-kuala-lumpur-johor-bahru-tourists | corrected | journey "4.5–5.5 h" → "about 4.5 h"; fare "RM90–115" → "from RM82 at launch, typical Platinum ~RM100" (paultan.org 2025-12-08); timetable line with specific departures removed (conflicting 07:55 seen) |
| zhongguo-huhao-malaxi-a-mianshen-gonglue-2026 | corrected | "no e-form needed" → MDAC required (secondary sources only); visa-free for Chinese citizens stated to end 31 Dec 2026 (agbrief.com) |
| lalamove-driver-malaysia-jb-guide | softened | unsourced "15–20% fee"/"3–5 days approval" removed; per-job pay labelled estimate; table aligned with the Foodpanda/Grab guides; official link added |
| foodpanda-rider-jb-guide-2026 | softened | requirements match rider.foodpanda.my; shift-allocation claim softened |
| grab-driver-jb-guide-2026 | ok | matches grab.com/my/driver |

Follow-up by me after the agent: CW1 "RM2.60 (~SGD0.80)" fare removed from the visa-run post (3 spots) and the ETS timetable line — both unverified.

### New posts (EN)
- `mdac-and-sg-arrival-card-jb-trip-checklist-2026` — kln.gov.my, thestar.com.my 2023-12-05, imigresen-online.imi.gov.my, ica.gov.sg. MDAC fee / one-submission-for-return not confirmed (worded as such).
- `causeway-year-end-school-holidays-2026-jb-crossing-tips` — moe.gov.sg/calendar, ica.gov.sg 2025 media release, thestar 2025-11-17. No 2026 ICA advisory found (stated); bus timetables not verified (stated).
- `jb-christmas-new-year-2026-27-school-holidays-guide` — moe.gov.sg, mom.gov.sg, malaysiapublicholiday.my, ecentral.my, legoland.com.my, johormalls.com. Johor school dates from calendar sites not the ministry circular (stated); no NYE events found.
- `money-in-jb-changing-sgd-qr-payments-guide-2026` — bnm.gov.my, mas.gov.sg. No rates quoted; QR limits/fees "not stated"; "shops give worse rates" rests on search snippets (worded as tendency).

### Open for Jay
- **Check-in time conflict:** owner-confirmed truth is **2:00 PM** (`rainbow-pms-pelangi-site/wiki/loop-ai-support-findings-2026-07-18.md`). The site `CLAUDE.md` says 3:00 PM — stale. This run briefly wrote 3 PM into 4 posts (instruction error), all reverted to 2:00 PM before build; also fixed one older post (`<strong>Check-in:</strong> 3:00 PM`). `blog.go` line ~5162 "Hours: Daily 3:00 PM – 12:00 AM" is a different thing (left).
- Site `CLAUDE.md` pricing line (RM30/35 weekday/weekend, monthly RM594) is stale vs Jay's truth (RM35 flat, RM30 first night direct, RM600/650).
- Unfixed from fact-check: CW1 fare still "RM2.60" in several other posts (secondary source says S$2.00 cashless / S$2.60 cash from Woodlands); MDAC rules from secondary sources only; Chinese ETS post (`ktm-ets-train-johor-bahru-chinese-guide`) mirrors the English one but was not edited; Chinese post says passport validity 6 months without a source; Lalamove/Grab/Foodpanda earnings bands unverifiable; "end-February" wording across some RTS posts rests on Mothership (Malay Mail says "February 2027").
- Not done: the other ~2 of 10 planned fact-checks; BM/ZH sibling versions of the 4 new posts (optional).
- Build shipped the whole `go-site` working tree incl. other uncommitted edits; nothing committed.

### Daily 2026-11-04
- `singapore-vep-fee-s50-january-2027-driving-from-jb` (EN). Sources: freemalaysiatoday.com 2026-02-06, mothership.sg 2026-04-10; LTA notice not read (stated). Cover: ZKang123, Commons, CC BY-SA 4.0.

### Daily 2026-11-05
- `deepavali-long-weekend-2026-causeway-delays-woodlands-outage` (EN). Sources: ica.gov.sg Deepavali advisory, thestar.com.my 2026-11-04. Malay Mail 403 (unread). Cover: generated (gen_blog_cover.py), no third-party licence.

### Daily 2026-11-06
- `northeast-monsoon-2026-27-johor-bahru-travel-tips` (EN). Sources: says.com 2026-10-27, thevibes.com 2026-10-27; no Johor-specific warning (stated). Cover: generated (gen_blog_cover.py), no third-party licence.

### Daily 2026-11-07
- `malaysia-multiple-entry-visa-31-nationalities-visa-run-jb` (EN). Sources: ivisa.com, visasnews.com, curlytales.com (Sept 2026), imi.gov.my title only; nationality list/existing-MEV validity unconfirmed (stated). Cover: generated (gen_blog_cover.py), no third-party licence.

### Daily 2026-11-08
- `malaysia-visa-free-india-china-ends-31-december-2026-jb-visa-run` (EN). Sources: thestar.com.my 2024-12-20, outlooktraveller.com 2025-08-13; no extension found (stated); MDAC timing not quoted. Cover: generated (gen_blog_cover.py), no third-party licence.

- Daily 2026-11-09: `singapore-vep-unpaid-fines-blocked-from-2-november-2026-driving-from-jb` (EN). Sources: LTA + MHA releases (2026-05-15), NST 2026-10-11. Cover: generated text cover, own work, no third-party licence.

- Daily 2026-11-10: `larkin-sentral-rm2-boarding-fee-singapore-bound-buses-jb` (EN). Sources: landtransportguru.net (2026-06-26), mothership.sg (2023-01-02), thestar.com.my (2026-06-25); no official notice found (stated). Cover: generated text cover, own work, no third-party licence.

- Daily 2026-11-11: `visit-johor-year-extended-2027-travel-charge-rm3-what-visitors-know` (EN). Sources: The Star 2026-10-27, NST 2026-10-26, Malay Mail 2025-11-22, Iskandarian + VnExpress 2025-11-25; charge rules unconfirmed (stated). Cover: generated text cover, own work, no third-party licence.

- Daily 2026-11-13: `cross-border-taxi-quota-500-cdg-zig-kumpool-16-november-2026-jb` (EN). Sources: thestar.com.my (2026-11-06, ST/ANN), nst.com.my (2026-11-06), littlebigreddot.com (2026-11-08); no official LTA/APAD page fetched, Malay Mail 403 (stated). Cover: generated text cover, own work, no third-party licence.
