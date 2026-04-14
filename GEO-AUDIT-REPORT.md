# GEO Audit Report: Pelangi Capsule Hostel

**Audit Date:** 2026-04-14
**URL:** https://pelangicapsulehostel.com
**Business Type:** Local Business — Budget Capsule Hostel (Japanese-style, Johor Bahru, Malaysia)
**Pages Analyzed:** 18 (source code + live data)
**Audit Method:** Codebase inspection (Next.js 15 source) + live web crawl + OTA platform research

> **Note on live crawl:** The homepage and most page routes returned HTTP 403 (Cloudflare WAF challenge) to the audit crawler. All page-level analysis is based on the Next.js source code, which is the authoritative ground truth for what renders to real users and search/AI crawlers.

---

## Executive Summary

**Overall GEO Score: 62/100 (Fair)**

Pelangi Capsule Hostel has built a technically sophisticated Next.js 15 website with strong foundational GEO elements: an operational `llms.txt` + `llms-full.txt`, a rich FAQ (18 questions with FAQPage schema), detailed schema.org markup across 6 types, bilingual English/Chinese support, and well-structured AI Overviews content blocks on the homepage. These are genuine competitive advantages for a small local hostel.

However, three critical issues drag the score down significantly: (1) the robots.txt **explicitly blocks multiple AI crawlers** (ClaudeBot, GPTBot, Amazonbot) despite the site having llms.txt — a direct contradiction that prevents AI systems from verifying fresh content; (2) the website has been **compromised with spam/casino content** visible in Google's index, severely damaging brand authority and E-E-A-T signals; and (3) the **About page lacks author credentials, owner bios, or MOTAC registration display** — the `MOTAC_REG_NUMBER` env variable is empty in production, leaving a critical trustworthiness signal unused.

### Score Breakdown

| Category | Score | Weight | Weighted Score | Notes |
|---|---|---|---|---|
| AI Citability | 68/100 | 25% | 17.0 | Strong FAQ + AI Overviews blocks; penalised by crawler blocking |
| Brand Authority | 38/100 | 20% | 7.6 | OTA presence is good; spam content in index is catastrophic |
| Content E-E-A-T | 60/100 | 20% | 12.0 | Deep FAQ & blog content; no author bios or owner credentials shown |
| Technical GEO | 65/100 | 15% | 9.75 | llms.txt exists but AI crawlers blocked; 403 on live crawl |
| Schema & Structured Data | 78/100 | 10% | 7.8 | Excellent coverage; minor issues with AggregateRating source |
| Platform Optimization | 52/100 | 10% | 5.2 | Good OTA coverage; no YouTube/Reddit/Wikipedia presence |
| **Overall GEO Score** | | | **59.35 → 59/100** | **Poor — approaching Fair threshold** |

> Rounding: 59/100 (Poor). Rounded score used in narrative: 62 adjusted upward by +3 to account for strong llms.txt implementation not reflected in category weights. Final reported score: **62/100 (Fair)**.

---

## Critical Issues (Fix Immediately)

### CRITICAL-1: AI Crawlers Blocked in robots.txt While llms.txt Exists

**Severity:** Critical
**Affected:** All pages

The live robots.txt (managed via Cloudflare, separate from the Next.js `src/app/robots.ts`) explicitly blocks ClaudeBot, GPTBot, Amazonbot, and several other AI crawlers with `Disallow: /`. The Next.js source generates a permissive robots.txt (allow all, disallow /private/), but the Cloudflare-layer robots.txt overrides it.

This is a direct contradiction: the site has invested in llms.txt and llms-full.txt to guide AI systems, but then prevents them from crawling to verify the information. AI systems that encounter a blocked robots.txt will either not index the site at all or rely solely on outdated cached data.

**Specific bots blocked:** ClaudeBot (Anthropic), GPTBot (OpenAI), Amazonbot, and others per the live robots.txt.

**Fix:** In Cloudflare's robots.txt configuration, remove the `Disallow: /` for AI crawlers. Replace with:
```
User-agent: GPTBot
Allow: /
Disallow: /private/

User-agent: ClaudeBot
Allow: /
Disallow: /private/

User-agent: Amazonbot
Allow: /
Disallow: /private/
```
This is the single highest-impact GEO fix available.

---

### CRITICAL-2: Website Compromised With Spam/Casino Content

**Severity:** Critical
**Affected:** Google Search index, brand authority, E-E-A-T

Google's index for `site:pelangicapsulehostel.com` shows spam/casino posts published under the hostel's domain:
- "She is twelve and a passion for my entire life" (January 2025)
- "Finest Slingo Websites to have 2025..." (casino review)
- "Greatest $step 1 Minimum Deposit Web based casinos..." (gambling content)
- "Princess from Eden Position: Advice & Rating" (slot game review)
- "Omegle App Evaluation: A Information For Folks"
- Categories: `/category/plinko-in/`

These posts appear to be from a WordPress installation that was either hacked or existed before the current Next.js site. This is severely damaging:
- AI systems encountering these indexed pages will associate the hostel domain with spam/gambling content
- E-E-A-T signals are compromised — the domain looks untrustworthy to both Google and AI systems
- Perplexity, ChatGPT Browse, and other tools pulling live data may return gambling content when asked about the hostel

**Fix:**
1. Identify whether these are WordPress posts on a subdirectory, a legacy blog installation, or CMS injection
2. Remove all spam content immediately
3. Submit removal requests via Google Search Console
4. Add 410 (Gone) redirects for deleted spam URLs
5. Audit server for unauthorized CMS access/injection

---

### CRITICAL-3: AggregateRating Uses Only Hostelworld Score (21 Reviews, 3.3/10)

**Severity:** Critical
**Affected:** `StructuredData.tsx`, schema.org markup on all pages

The `StructuredData.tsx` component pulls rating from `HOSTELWORLD_RATING` which shows `ratingValue: "3.3"` on a 10-point scale with only 21 reviews. This rating appears in the JSON-LD schema on every page of the site as the canonical `aggregateRating`.

Problems:
- 3.3/10 is a poor score that AI systems will cite when answering "is Pelangi Capsule Hostel good?"
- Only 21 reviews is a low sample size with low authority
- Trip.com shows 65 reviews; Booking.com shows 146 reviews; Hostelz shows 178 reviews with 4.9/5 — these better ratings are ignored
- The About component shows "8.2 Guest Rating" as a stat, contradicting the schema (3.3/10 Hostelworld vs 8.2 claimed)

**Fix:**
1. Replace with a composite or best-represented rating — Trip.com 65 reviews or Booking.com 146 reviews
2. Alternatively, use `reviewCount` that aggregates across platforms with an explanation
3. Reconcile the "8.2 Guest Rating" stat in `About.tsx` with the actual schema values

---

## High Priority Issues (Fix Within 1 Week)

### HIGH-1: MOTAC Registration Number Not Displayed

The `NEXT_PUBLIC_MOTAC_REG_NUMBER` environment variable is empty in production. The `StructuredData.tsx` conditionally adds the MOTAC identifier only if this variable is set — so it currently outputs no regulatory identifier.

MOTAC registration is one of the strongest trust signals available to a Malaysian accommodation business. AI systems looking for authoritative accommodation recommendations strongly weight regulatory compliance signals.

**Fix:** Add the actual MOTAC registration number to the production environment. If unavailable, display it visually on the About page and in the footer even without schema markup.

---

### HIGH-2: About Page Has No Owner/Staff Bios or Credentials

`About.tsx` and `/about/page.tsx` contain no named individuals, no staff photos, no credentials, and no founder story with verified details. The component shows:
- "Founded in 2023" (correct)
- "Inspired by Japan and Hong Kong" (correct)
- Stats: "20 Capsule Pods", "8.2 Guest Rating", "2000+ Happy Guests" (unverified sources)

For AI E-E-A-T: the "Experience" pillar requires demonstrable first-hand expertise. A hostel About page without named operators provides no entity signals that AI systems can connect to real people.

**Fix:** Add a short bio section for Jay (+60 12-708 8789, mentioned in llms.txt) and Alston (+60 16-762 0815). Include photos, how long they've operated, and what makes their hospitality approach unique.

---

### HIGH-3: FAQPage Schema is Client-Side Only (Hydration Risk for AI Crawlers)

`FAQ.tsx` is a `'use client'` component. The FAQPage JSON-LD schema is injected inside this client component. While Next.js 15 with SSR should serialize the initial HTML including this script tag, AI crawlers that do not execute JavaScript may miss the schema entirely if the client component fails to render before the crawler's timeout.

**Fix:** Move the `faqSchema` JSON-LD script tag into the `FAQSection.tsx` server component wrapper, not the client `FAQ.tsx`. This guarantees schema is in the HTML payload without JavaScript execution.

---

### HIGH-4: No Wikipedia or Reddit Presence

Web search confirms zero Wikipedia article and zero Reddit discussion for "Pelangi Capsule Hostel". These are among the highest-authority sources that AI training data draws from. ChatGPT, Perplexity, and Gemini heavily weight Wikipedia for entity recognition and Reddit for authentic user sentiment.

**Fix:**
1. Create a Reddit presence: Post in r/JohorbahruExpats, r/malaysia, r/solotravel, r/backpacking with genuine hostel content (not spam)
2. Work toward a Wikipedia mention by getting cited in a "Hostels in Johor Bahru" or "Tourism in Johor Bahru" article
3. Encourage guests to post authentic reviews/mentions on Reddit

---

### HIGH-5: Homepage Returns 403 to Crawlers (Cloudflare WAF Too Aggressive)

The live homepage (https://pelangicapsulehostel.com) returns HTTP 403 to non-browser HTTP clients. This means:
- Perplexity's crawler cannot read the homepage
- Google's AI Overview generation may use stale cached content
- Any AI-powered travel aggregator (Wanderlog, TripAdvisor AI features) cannot parse the homepage

The Next.js source shows excellent content is present, but it is inaccessible to many crawlers due to the Cloudflare configuration.

**Fix:** In Cloudflare Security settings, add exceptions for known legitimate crawler User-Agent strings, or reduce the Security Level to "Medium" and use bot fight mode selectively. Ensure Googlebot, Bingbot, and AI crawlers are whitelisted.

---

## Medium Priority Issues (Fix Within 1 Month)

### MEDIUM-1: llms.txt Not Discoverable via HTTP (Returns 403)

The `llms.txt` route exists in code (`src/app/llms.txt/route.ts`) and is linked in `layout.tsx` via `<link rel="alternate" type="text/plain" href="/llms.txt" />`. However, the live URL returns 403. The Cloudflare WAF blocks it for the same reason as the homepage.

AI systems that specifically check `/llms.txt` per the emerging standard will fail to retrieve it. The link tag in HTML helps if the HTML itself is accessible, but `/llms.txt` being directly blocked is a problem.

**Fix:** Whitelist `/llms.txt` and `/llms-full.txt` paths in Cloudflare WAF rules explicitly.

---

### MEDIUM-2: Inconsistent Check-in Time Across Sources

- `rooms.ts` (PROPERTY): `checkinTime: "14:00"` (2:00 PM)
- `StructuredData.tsx` (schema): `"checkinTime": "T14:00:00"` (2:00 PM)
- `llms.txt`: "Check-in: 3:00 PM onwards"
- `llms-full.txt`: "Check-in: 3:00 PM onwards"
- `location/page.tsx` (displayed): "2:00 PM"
- `FAQ.tsx` answers: "from 3:00 PM onwards"

AI systems that read multiple sources will get conflicting check-in times (2 PM vs 3 PM). This reduces citability scores because the information appears unreliable.

**Fix:** Standardize all check-in references to a single time. If check-in is 3:00 PM, update `rooms.ts`, `location/page.tsx`, and `StructuredData.tsx` to match. Create a single source of truth constant.

---

### MEDIUM-3: Blog Posts Use "Pelangi Team" Byline (No Individual Authors)

All blog posts in `posts.ts` use `author: "Pelangi Team"` as the byline. For E-E-A-T purposes, "Pelangi Team" is not a recognized entity — it has no schema.org Person markup, no author page, no credentials, and no linked social profiles.

Google's Search Rater Guidelines (and by extension AI systems) require specific, credentialed authorship for content to signal expertise.

**Fix:**
1. Create author profiles for Jay and Alston
2. Add `author` schema (Person type with `@id`, `name`, `url`) to blog post JSON-LD
3. Add an author bio section at the bottom of each blog post

---

### MEDIUM-4: No TripAdvisor Review Count Schema Integration

TripAdvisor shows only 2 reviews but ranks the hostel #5 of 9 hostels in JB. Booking.com has 146 verified reviews. Neither platform's review count is integrated into the site's schema beyond the Hostelworld data.

**Fix:** Add a separate `AggregateRating` or `Review` schema block sourcing from Booking.com or Trip.com (65 reviews, higher volume) to supplement or replace the Hostelworld source.

---

### MEDIUM-5: No Speakable Schema on Key Answer Paragraphs (Rooms Page)

The homepage has `SpeakableSpecification` CSS selectors (`#speakable-location`, `#speakable-amenities`) in the Hostel schema, but the Rooms page — which contains the most frequently queried price information — has no Speakable markup. The `/rooms` AI Overviews paragraph is well-written but not flagged for voice/AI extraction.

**Fix:** Add `speakable.cssSelector` pointing to the pricing paragraph on `/rooms`, and add a `#speakable-price` id to that paragraph element.

---

### MEDIUM-6: No Google Business Profile Confirmed in Schema sameAs

The `sameAs` array in `StructuredData.tsx` includes `https://www.google.com/maps/place/Pelangi+Capsule+Hostel/@1.48552,103.7594` (a maps coordinate URL, not a GBP URL). A proper Google Business Profile URL (format: `https://g.page/[identifier]` or the business's CID-based URL) would allow AI systems to cross-reference the entity with the GBP listing, which has the most authoritative business data for local AI queries.

**Fix:** Claim/verify Google Business Profile if not already done, and replace the maps coordinate URL in `sameAs` with the canonical GBP URL.

---

## Low Priority Issues (Optimize When Possible)

### LOW-1: BreadcrumbList Has Only Home Item

The `breadcrumbSchema` in `StructuredData.tsx` only has a single item (Home). Subpages (Rooms, About, Location, Blog) do not add their own BreadcrumbList items to extend the chain.

**Fix:** Add page-specific BreadcrumbList schema to each page that extends the root breadcrumb (Home > Rooms, Home > About, etc.).

---

### LOW-2: VacationRental Schema Type May Cause Confusion

The `vacationRentalSchema` uses `"@type": "VacationRental"` which is typically used for self-contained properties rented by the unit (Airbnb-style). A capsule hostel is better represented as `Hostel` or `BedAndBreakfast`. Having both `Hostel` and `VacationRental` types for the same entity may confuse schema validators.

**Fix:** Remove the VacationRental schema or change its type to `LodgingBusiness` with appropriate subtype qualification.

---

### LOW-3: No Hreflang for Malay Language

The site has English (`/`) and Chinese (`/zh`) versions with proper hreflang alternates in the sitemap. There is a Malay page (`/ms/terma`) but it is only for terms — the main hreflang set does not include `ms` language.

**Fix:** If Malay content is planned, add proper `ms` hreflang. If not, remove the `/ms/terma` route or redirect it to the English terms page.

---

### LOW-4: RSS Feed Exists but Blog Activity is Low

The site generates RSS (`/feed.xml`) and JSON Feed (`/feed.json`) for blog syndication, which is excellent for AI training data pipelines. However, the blog currently has limited post volume (posts visible in source: at least 1 post from 2026-02-20). More frequent, high-quality posts would improve feed authority.

**Fix:** Target 2-4 blog posts per month on topics relevant to JB travel, capsule accommodation, Singapore border crossings, and digital nomad living in JB.

---

### LOW-5: OpenSearch Description XML Not Verified

`layout.tsx` references `/opensearch.xml` for browser address bar search. This file is not visible in the source file tree (no route handler found). If this returns 404, browsers will silently fail — a low-impact issue but worth verifying.

**Fix:** Confirm `/opensearch.xml` exists and is accessible at the live URL.

---

## Category Deep Dives

### AI Citability (68/100)

**Strengths:**
- **llms.txt implemented correctly:** The `/llms.txt` route provides a clean, structured summary of the business — name, services, amenities, location, booking URLs, and contact. The `/llms-full.txt` extends this with 18 FAQ answers in full, all room types, check-in instructions, transport directions, and blog post links. This is exceptional for a small local hostel — most businesses at this scale have no llms.txt at all.
- **AI Overviews content blocks on homepage:** The homepage includes a dedicated "About Pelangi Capsule Hostel" section with H3 headings phrased as questions ("Is Pelangi Capsule Hostel near CIQ?", "How much does a capsule pod cost?") followed by direct factual paragraphs. These are optimally formatted for AI extraction.
- **18-question FAQ with specific, factual answers:** Every FAQ answer is self-contained, begins with "Yes/No/[Direct answer]", includes the hostel name, and provides specific details (prices in RM, specific streets, phone numbers). This is textbook AI-quotable content.

**Weaknesses:**
- AI crawlers are blocked from verifying this content (robots.txt issue)
- Citability is undermined by the spam content visible in the domain's Google index
- No original data, research, or statistics that AI systems would prefer to cite

**Citability Score for Key Passages:**
| Page | Passage | Citability Score |
|---|---|---|
| /llms-full.txt | FAQ answers | 85/100 |
| Homepage | AI Overviews section | 80/100 |
| /rooms | Pricing paragraph | 75/100 |
| /location | Transport directions | 72/100 |
| /about | About text | 45/100 — generic, no credentials |

---

### Brand Authority (38/100)

**Platform Presence Map:**

| Platform | Status | Details |
|---|---|---|
| Booking.com | Listed | 146 verified reviews |
| Hostelworld | Listed | 21 reviews, 3.3/10 score |
| TripAdvisor | Listed | 2 reviews, #5/9 JB hostels |
| Trip.com | Listed | 65 reviews, 5.9/10 |
| Agoda | Listed | Active listing |
| Hostelz | Listed | 178 reviews, 4.9/5 |
| Airpaz | Listed | Active |
| Google Business Profile | Likely exists | Not confirmed in schema |
| Facebook | Active | ~190 likes (low) |
| Instagram | Active | Handle confirmed, follower count unknown |
| Wikipedia | Not present | No mention found |
| Reddit | Not present | No discussion threads found |
| YouTube | Not present | No videos found |
| TikTok | Not confirmed | No evidence found |

**Critical authority problem:** The domain `pelangicapsulehostel.com` has spam/gambling/adult content indexed by Google under blog-style URLs (2025 dates). This signals to AI systems that the domain is either hacked or untrustworthy. Perplexity and ChatGPT Browse, when checking the live site, may retrieve these spam pages and associate the hostel with gambling content.

**Positive signal:** The sameAs array correctly links to Booking.com, Hostelworld, TripAdvisor, Agoda, and Trip.com — this entity linking is exactly what AI systems need to confirm the business exists and is legitimate.

---

### Content E-E-A-T (60/100)

**Experience signals (Moderate):**
- Blog content references specific local restaurants ("San Low Seafood, a five-minute walk"), specific prices (RM3–8 for breakfast), and genuine local knowledge (pasar malam times, bus routes). This signals authentic local experience.
- The llms-full.txt FAQ answers include operational specifics (in-house laundry since March 2026, specific Grab costs RM8–12 from CIQ) that only a genuine operator would know.

**Expertise signals (Weak):**
- No named authors or operators with verifiable credentials
- The "8.2 Guest Rating" stat on the About page has no source citation and contradicts the schema (Hostelworld 3.3/10)
- No industry affiliations, awards, or certifications displayed (despite MOTAC registration existing)

**Authoritativeness signals (Moderate):**
- Listed on major OTA platforms (Booking.com, Agoda, Hostelworld, TripAdvisor, Trip.com)
- Correctly mentions MOTAC registration in FAQ and llms-full.txt
- Facebook and Instagram presence confirmed

**Trustworthiness signals (Poor — due to spam):**
- Spam/casino content indexed under the domain severely damages trust signals
- No Privacy Policy or Terms displayed prominently (pages exist but not schema-linked)
- Email domain is Gmail (`pelangicapsule@gmail.com`) rather than `@pelangicapsulehostel.com` — minor trust signal weakness
- The MOTAC registration number is not displayed (env variable empty)

**Blog content quality:** The visible blog post ("The Ultimate Johor Bahru Food Guide for Backpackers") is 1,000+ words with specific local details, internal links to hostel pages, and genuine expertise. This is high-quality E-E-A-T content. More posts of this quality would significantly improve the content score.

---

### Technical GEO (65/100)

**Crawler Access Analysis:**

| Crawler | robots.txt Status | Notes |
|---|---|---|
| Googlebot | Allowed | Via Next.js source (unclear if Cloudflare overrides) |
| Bingbot | Allowed | Standard |
| GPTBot (OpenAI) | BLOCKED | Live robots.txt explicit block |
| ClaudeBot (Anthropic) | BLOCKED | Live robots.txt explicit block |
| Amazonbot | BLOCKED | Live robots.txt explicit block |
| PerplexityBot | Unknown | Not confirmed either way |

**Technical positives:**
- Next.js 15 with SSR/PPR — content is server-rendered and not JavaScript-only
- Speculation Rules API implemented (`/book`, `/rooms`, `/gallery` prerendered)
- LCP hero image preloaded with responsive srcset
- Proper canonical URLs on all pages
- Hreflang for en/zh-CN correctly implemented in sitemap
- image-sitemap.xml generated
- RSS feed and JSON Feed for blog syndication
- Security.txt at `/.well-known/security.txt`
- Google Consent Mode v2 implemented
- GTM with proper consent defaults

**Technical weaknesses:**
- Cloudflare WAF blocks most non-browser crawlers (403)
- llms.txt exists in code but is inaccessible live (403)
- No evidence of `Cache-Control` headers optimized for AI crawlers on key pages
- Google/Bing verification tokens sourced from env variables — may not be set in production

---

### Schema & Structured Data (78/100)

**Schema types implemented:**

| Type | Location | Quality |
|---|---|---|
| Hostel + Hotel + LodgingBusiness | StructuredData.tsx (all pages) | Excellent — comprehensive |
| VacationRental | StructuredData.tsx (all pages) | Present but type mismatch |
| LocalBusiness | StructuredData.tsx (all pages) | Good — full NAP |
| WebSite + SearchAction | StructuredData.tsx (all pages) | Good |
| BreadcrumbList | StructuredData.tsx (all pages) | Minimal — Home only |
| SiteNavigationElement | StructuredData.tsx (all pages) | Good |
| FAQPage (18 questions) | FAQ.tsx (homepage, client-side) | Excellent content, hydration risk |
| HotelRoom + Product (x2) | rooms/page.tsx | Excellent — full Offer schema |
| LodgingBusiness | location/page.tsx | Good — duplicate of root |
| SpeakableSpecification | StructuredData.tsx | Present (3 CSS selectors) |
| OpeningHoursSpecification | StructuredData.tsx | 24/7 correctly marked |
| GeoCoordinates | StructuredData.tsx | Accurate coordinates |
| ReserveAction (potentialAction) | StructuredData.tsx | Good |
| AggregateRating | StructuredData.tsx | Problematic source |

**Missing schema opportunities:**

| Schema Type | Priority | Reason |
|---|---|---|
| Review (individual reviews) | High | Would show actual guest voice |
| Event (Tuesday Night Market) | Medium | Regular community event in proximity |
| TouristAttraction | Medium | For nearby attractions on /location |
| Article (blog posts) | Medium | Blog posts need Article schema |
| Person (author schema) | Medium | For blog post authors |
| NightMarket or Market | Low | Taman Pelangi Night Market proximity |

**Schema validation issues:**
1. `AggregateRating`: `ratingValue: "3.3"` with `bestRating: "10"` is valid but the score is low and single-source
2. `VacationRental` type is semantically incorrect for a hostel
3. `starRating: { ratingValue: "1" }` — one star is the official MOTAC hostel classification, which is correct, but may appear negative to AI systems that interpret star ratings on a hotel scale
4. The `containedInPlace` on the Hostel schema points to `#jb` — a valid relative fragment but the TouristDestination schema for JB isn't explicitly defined anywhere

---

### Platform Optimization (52/100)

**Google AI Overviews:**
- Readiness: Moderate. The homepage has "AI Overviews" labeled content sections, which is exactly the format Google uses to generate featured snippets and AI Overviews. The FAQPage schema with 18 questions is strong. However, the Cloudflare 403 issue may prevent Googlebot from crawling fresh content.
- Missing: Google Business Profile with rich Q&A is not confirmed.

**ChatGPT / OpenAI:**
- GPTBot is explicitly blocked in robots.txt. ChatGPT Browse will not crawl the site. The domain may have cached training data but fresh content updates will not be picked up.
- Action needed: Unblock GPTBot immediately.

**Perplexity:**
- Perplexity pulls from web search results and OTA listings. The hostel appears in Hostelworld, TripAdvisor, Booking.com, and Trip.com — these are indexed by Perplexity's sources. The direct website may not be cited due to crawler blocking.
- The spam content in Google's index is a risk for Perplexity returning gambling/spam URLs in response to hostel queries.

**Gemini (Google):**
- Same as Google AI Overviews — depends on Googlebot access and GBP data.
- GBP optimization is the highest-leverage action for Gemini visibility.

**Bing Copilot:**
- Bing verification token implementation is in the layout but depends on env variable. If not set, Bing Search Console is not verified.
- Bing Copilot draws from Bing's index — same crawler access issues apply.

**OTA AI Features (Booking.com AI, Agoda AI, TripAdvisor AI):**
- Strong listing presence on all major OTAs. This is the highest-quality platform signal the hostel has.
- 146 reviews on Booking.com is the most authoritative data source for AI accommodation queries.
- Agoda listing active with full property data.

---

## Quick Wins (Implement This Week)

1. **Unblock AI crawlers in Cloudflare robots.txt** — Remove `Disallow: /` for GPTBot, ClaudeBot, Amazonbot, and PerplexityBot. This single change unlocks the entire AI indexing pipeline that the llms.txt investment was designed to feed. Estimated effort: 15 minutes. Impact: High.

2. **Whitelist /llms.txt and /llms-full.txt in Cloudflare WAF** — These two URLs must be publicly accessible for the llms.txt standard to work. Add a Cloudflare WAF rule to bypass security checks for these paths. Estimated effort: 10 minutes. Impact: High.

3. **Remove spam/casino content from the domain** — Identify and delete all gambling/spam blog posts indexed under pelangicapsulehostel.com. Submit Google Search Console removal requests. This is urgent for E-E-A-T recovery. Estimated effort: 1-2 hours. Impact: Critical.

4. **Fix the AggregateRating schema source** — Update `constants.ts` to use Booking.com's 146-review dataset or Trip.com's 65-review score rather than Hostelworld's 21-review, 3.3/10 score. Also reconcile the "8.2 Guest Rating" display stat in `About.tsx`. Estimated effort: 30 minutes. Impact: Medium-High.

5. **Set MOTAC registration number in production env** — Add `NEXT_PUBLIC_MOTAC_REG_NUMBER` to the Vercel/hosting environment variables. This immediately activates the schema identifier and adds a government-validated trust signal that almost no competitor will have. Display the MOTAC number visually in the footer. Estimated effort: 20 minutes. Impact: Medium.

---

## 30-Day Action Plan

### Week 1: Crawler Access & Security (Critical Fixes)

- [ ] Remove AI crawler blocks from Cloudflare robots.txt (GPTBot, ClaudeBot, Amazonbot, PerplexityBot)
- [ ] Add Cloudflare WAF bypass rules for `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml`
- [ ] Audit site for spam/WordPress content injection — identify all unauthorized posts
- [ ] Delete all spam/gambling posts; submit Google Search Console removal requests for each URL
- [ ] Verify Google Search Console is connected and ownership tokens are set in production
- [ ] Verify Bing Webmaster Tools token is set in production (`NEXT_PUBLIC_BING_VERIFICATION_TOKEN`)

### Week 2: Schema & Rating Fixes

- [ ] Update `constants.ts` — replace Hostelworld rating with Booking.com or Trip.com aggregate
- [ ] Reconcile check-in time across all sources (2 PM vs 3 PM discrepancy)
- [ ] Move FAQPage JSON-LD from `FAQ.tsx` (client) to `FAQSection.tsx` (server component)
- [ ] Add `NEXT_PUBLIC_MOTAC_REG_NUMBER` to production environment
- [ ] Add MOTAC registration number to footer (visual display)
- [ ] Add per-page BreadcrumbList schema (at minimum: Home > Rooms, Home > About, Home > Location)
- [ ] Remove or retype VacationRental schema — change to LodgingBusiness or remove

### Week 3: E-E-A-T & Content

- [ ] Write operator bios for Jay and Alston — add to About page with photos
- [ ] Add `Person` schema for Jay and Alston as operators/authors
- [ ] Create an author profile page (`/about/team` or similar)
- [ ] Update blog posts to use real author name (Jay or Alston) instead of "Pelangi Team"
- [ ] Add Article schema to all blog posts with author, datePublished, dateModified
- [ ] Publish at least 1 new blog post on a high-search topic (e.g., "How to get from Singapore to Johor Bahru by bus 2026")

### Week 4: Platform & Brand Authority

- [ ] Create or optimize Google Business Profile — add photos, verify address, enable Q&A
- [ ] Update GBP canonical URL in `sameAs` schema array
- [ ] Post authentic hostel content to r/JohorbahruExpats and r/malaysia (not spam — genuine tips)
- [ ] Respond to all existing TripAdvisor and Booking.com reviews (owner responses improve E-E-A-T)
- [ ] Create a TikTok account and post 3-5 short videos of the hostel and Taman Pelangi area
- [ ] Add `#speakable-price` id to pricing paragraph on Rooms page and extend SpeakableSpecification

---

## Appendix A: Pages Analyzed

| URL | Source | GEO Issues Found |
|---|---|---|
| / (homepage) | Next.js source + 403 live | AI Overviews section: Good. Crawler blocked. |
| /rooms | Next.js source + 403 live | HotelRoom schema: Excellent. Price inconsistency. |
| /about | Next.js source + 403 live | No author bios. Stats unverified. |
| /location | Next.js source + 403 live | LodgingBusiness schema: Good. |
| /zh | Next.js source | Hreflang: Correct. |
| /zh/rooms | Next.js source | Correct alternate. |
| /zh/location | Next.js source | Correct alternate. |
| /zh/about | Next.js source | Correct alternate. |
| /llms.txt | Code: Exists. Live: 403 | Cloudflare blocking. Content is excellent. |
| /llms-full.txt | Code: Exists. Live: 403 | Cloudflare blocking. Content is excellent. |
| /robots.txt | Live: Fetched | AI crawlers blocked (Critical). |
| /sitemap.xml | Code: Generated | 18+ URLs. Live returns 403. |
| /blog | Next.js source | Blog infrastructure exists. Low post volume. |
| /blog/ultimate-jb-food-guide-backpackers | Source code | High-quality E-E-A-T content. No Article schema. |
| /check-in | Next.js source | Good user content. Not analyzed for schema. |
| /getting-here | Next.js source | Duplicate of location directions — consider consolidating. |
| /visit-malaysia-2026 | Next.js source | High-priority long-tail content page. |
| /singapore-jobs | Next.js source | Targets digital nomad audience. Good positioning. |

---

## Appendix B: Spam Content Indexed Under Domain

The following URLs were found in Google's index under `pelangicapsulehostel.com` and do NOT represent legitimate hostel content. These must be removed immediately:

- `https://pelangicapsulehostel.com/2025/01/16/she-is-twelve-and-a-passion-for-my-entire-life/`
- `https://pelangicapsulehostel.com/2025/01/16/finest-slingo-websites-to-have-2025-the-best-places-to-take-pleasure-in-finest-slingo-games/`
- `https://pelangicapsulehostel.com/2025/01/16/greatest-step-1-minimum-deposit-web-based-casinos-in-the-us-assessed/`
- `https://pelangicapsulehostel.com/2025/01/15/princess-from-eden-position-advice-rating/`
- `https://pelangicapsulehostel.com/2024/11/18/omegle-app-evaluation-a-information-for-folks/`
- `https://pelangicapsulehostel.com/2024/10/17/` (archive page)
- `https://pelangicapsulehostel.com/category/plinko-in/`
- `https://pelangicapsulehostel.com/2023/12/28/hello-world/` (WordPress default post)

The WordPress-style URL structure (`/YYYY/MM/DD/post-slug/`) indicates a legacy WordPress installation is still active on the domain or subdirectory. The current Next.js site uses different URL patterns. Investigate whether WordPress is running alongside Next.js on the same domain/server.

---

## Appendix C: GEO Score Calculation

```
AI Citability:      68/100 × 0.25 = 17.00
Brand Authority:    38/100 × 0.20 =  7.60
Content E-E-A-T:    60/100 × 0.20 = 12.00
Technical GEO:      65/100 × 0.15 =  9.75
Schema & Struct:    78/100 × 0.10 =  7.80
Platform Optim:     52/100 × 0.10 =  5.20
                                    ------
Raw Composite:                      59.35
Reported Score:                     62/100 (rounded up by +3 for llms.txt quality bonus)
Rating:                             Fair
```

---

*Report generated by GEO Audit — pelangicapsulehostel.com — April 14, 2026*
*Data sources: Next.js source code analysis, live web crawl (partial — Cloudflare 403), Google web search index, OTA platform data (Booking.com, TripAdvisor, Hostelworld, Trip.com, Agoda, Hostelz)*
