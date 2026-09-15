# RESUME — Booking→PMS walkthrough for Alston

**Created 2026-07-06 ~22:47 MYT. Resume here after /compact.**

## The ask (Jay)
1. Make sure a website booking (pelangicapsulehostel.com/book) reflects in PMS2. → **DONE / verified working, no code change needed.**
2. Do a walkthrough + screenshot the main process step-by-step **for Alston**: from a customer booking on pelangicapsulehostel.com → seeing the booking in https://pms.pelangicapsulehostel.com. → **PENDING (do this next).**

## Verified finding (no code change required)
- `/book` on the website is a reverse proxy: `go-site/internal/handlers/proxy.go:70` → PMS2 gateway (`PMS2_API_URL`, default admin.pelangicapsulehostel.com).
- Booking SPA = PMS2 `client/src/pages/public-booking.tsx`; submit `POST /api/public/booking` with `{guestName,guestEmail,guestPhone,guestNationality,numberOfGuests,checkInDate,checkOutDate,specialRequests}`.
- Handler `PMS2/go-pms/module_public_rainbow.go:395` → real INSERT into `reservations` (status `pending`, source `online`, `unit_number` NULL, server-generated PLG number). Shows in dashboard by default (`GET /api/reservations`).
- **Proof:** existing PLG-20260706-001 confirmed present in live DB (guest "lew", 07-16→17, RM30, pending/online).
- Minor non-blocking quirks: non-atomic confirmation-seq COUNT (dup risk at concurrency); `checkInLink` always null (async token discarded). Not part of this task.

## Live PMS API (service account)
- Login: `POST https://pms.pelangicapsulehostel.com/api/auth/login` JSON `{"email":"claude-code@pelangicapsulehostel.com","password":"S5DvhmB1pQmRMft7z2XleqYH"}` → returns `data.token` (use as `Authorization: Bearer <token>`).
- Query: `GET /api/reservations?search=<PLG>` or `?source=online&dateFrom=&dateTo=`.
- Service account id: 230c762f-d604-4f64-8451-ba177f5a2005 (admin, "Claude Code (AI)").

## NEXT: walkthrough plan (Jay chose: NEW clean labeled test booking, delete after)
Capture screenshots step-by-step, assemble for Alston:
1. Website `/book` page — dates + availability + RM30 rate showing (customer view).
2. Guest details form filled (use label like guestName "TEST WALKTHROUGH", real-ish phone/email, nationality, specialRequests "TEST - delete after demo").
3. "Booking Confirmed!" card with the new PLG number.
4. PMS dashboard (pms.pelangicapsulehostel.com) reservations list showing the new booking (pending / online).
5. Reservation detail view.
6. **Cleanup:** cancel/delete the test booking after screenshots (admin API or dashboard) so it doesn't occupy a bed. Note the PLG number used.

### Browser driving notes
- Use `chrome-cdp` skill (attaches to Jay's real logged-in Chrome) OR the ecc chrome-devtools MCP (clean session — can log into PMS SPA with the claude-code service account for the dashboard shots; public booking steps need no auth).
- CDP daemons drop after ~20 min idle — Jay should stay at keyboard; reconnect via `chrome-cdp` `list`.
- To create the booking cleanly without the SPA, can also `POST /api/public/booking` directly, but for a real customer-view walkthrough drive the actual /book page in the browser.

### Deliverable for Alston
Assemble the numbered screenshots into a single doc (e.g. this folder + an HTML/PDF), short captions per step, then send to Alston (WhatsApp via periskope-send-file skill once Periskope MCP is live, or hand Jay the file).
