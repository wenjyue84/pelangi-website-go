# Claude-for-Chrome Prompts — Pelangi SEO Off-site Tasks

> Paste each block into Claude for Chrome when you have 5 minutes. One block = one task.
> Created 2026-07-05. Tick the matching item in `seo-tasks.md` when done.

---

## 1. GBP — get review link + publish first weekly post

```
Goal: Get the Google review short-link for Pelangi Capsule Hostel AND publish this week's GBP post.

Start: https://business.google.com/
Account: wenjyue@gmail.com — pick the "Pelangi Capsule Hostel" profile (26A Jalan Perang, Taman Pelangi).

Steps:
1. Find "Ask for reviews" (or "Share review form") → copy the short link (g.page/r/...).
2. Go to "Add update" / "Add post".
3. Post text: "Pods RM35/night (RM30 first night when you book direct) — Japanese-style capsules in Taman Pelangi, 15 min from the Singapore Causeway. Free WiFi, 24/7 self check-in, hot showers. Tuesday night market right at our doorstep. Book direct: pelangicapsulehostel.com/book"
4. Attach a photo from the profile's existing photo library (pick a capsule-pod interior shot).
5. Publish.

Hand back: the review short-link URL, and confirm the post is live.
Stop and ask Jay if: any re-login or 2FA prompt appears, or Google asks to verify the business again.
```

## 2. TripAdvisor — finish claim + build out listing

```
Goal: Complete the Pelangi Capsule Hostel listing claim (if still pending) and fill out the listing.

Start: https://www.tripadvisor.com/Owners
Account: Jay's TripAdvisor-for-Business account (same one managing Makan Moments Cafe).
Listing: Pelangi Capsule Hostel, Johor Bahru — location ID 27125478
(https://www.tripadvisor.com/Hotel_Review-g298278-d27125478)

Steps:
1. If the claim is still pending legal certification / identity verification, surface exactly what it's asking for and pause for Jay.
2. Once in the management console: complete the amenities checklist (free WiFi, air-con, 24h check-in, lockers, shared kitchen, hot showers, laundry, luggage storage).
3. Set price: RM35 per night (flat). Do not enter RM30 — that is a direct-web first-night rate only.
4. Upload 10–20 photos (Jay will provide a folder — ask him for the path, or reuse photos from the website gallery at pelangicapsulehostel.com/gallery by asking Jay to save them first).
5. Answer any unanswered "Travellers ask" questions using facts from pelangicapsulehostel.com/llms.txt.

Hand back: claim status, what was filled in, what still needs Jay.
Stop and ask Jay if: identity documents or legal signature are requested — those are his to do.
```

## 3. Bing Webmaster Tools — import from GSC

```
Goal: Get pelangicapsulehostel.com verified in Bing Webmaster Tools by importing from Google Search Console.

Start: https://www.bing.com/webmasters
Account: sign in with the Microsoft account, then choose "Import from Google Search Console"
(the GSC property lives under wenjyue@gmail.com).

Steps:
1. Click "Import" from GSC → authorize with wenjyue@gmail.com → select pelangicapsulehostel.com.
2. Confirm both sitemaps are imported: sitemap.xml and image-sitemap.xml (add manually if not).
3. Note: IndexNow is ALREADY set up (key 8f4b2a1c6d9e37f0a5c8b21e4d76093a.txt served from the site, 68 URLs submitted 2026-07-05) — in the IndexNow section, just confirm it shows received URLs.

Hand back: verification status + sitemap status.
Stop and ask Jay if: 2FA appears or no Microsoft account is signed in (ask which account to use).
```

## 4. Bing Places for Business

```
Goal: Create/claim the Bing Places listing for Pelangi Capsule Hostel.

Start: https://www.bingplaces.com/
Steps:
1. Choose "Import from Google Business Profile" (fastest, keeps NAP identical) → authorize wenjyue@gmail.com.
2. Verify the imported data matches EXACTLY: "Pelangi Capsule Hostel", 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, phone 012-708 8789, website https://pelangicapsulehostel.com.
3. Complete any verification step that doesn't require a postcard (prefer phone/email).

Hand back: listing status and any pending verification.
Stop and ask Jay if: 2FA, or only postcard verification is offered.
```

## 5. Wikidata — enrich Q140363023 with external IDs

```
Goal: Add external identifiers to the Wikidata entity Q140363023 (Pelangi Capsule Hostel).

Start: https://www.wikidata.org/wiki/Q140363023
Account: "Wenjyue" (Jay's Wikidata account).

Steps (use "+ add statement"):
1. Property "TripAdvisor hotel ID" (P11701 — search "TripAdvisor" in the property picker) → value: 27125478
2. Property "Booking.com hotel ID" (search it) → value: pelangi-hostel-capsule
3. Property "Hostelworld ID" if it exists → value: 317698
4. Save each statement.

Hand back: which statements were added successfully.
Stop and ask Jay if: login is required and credentials aren't saved in the browser.
```
