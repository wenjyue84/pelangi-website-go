package data

import (
	"math"
	"regexp"
	"strings"
	"time"
)

// BlogPost mirrors the TypeScript BlogPost interface in site/src/data/blog/posts.ts.
type BlogPost struct {
	Slug               string
	Title              string
	Excerpt            string
	Content            string
	Date               string
	LastModified       string // empty if not set
	Category           string
	Author             string
	ReadTime           string
	ReadingTimeMinutes int
	Tags               []string
	FeaturedImage      string
	ImageAlt           string // empty if not set
	InLanguage         string // empty if not set
	AlternateEN        string // slug of EN language sibling (empty if no multilingual set)
	AlternateZH        string // slug of ZH language sibling
	AlternateMS        string // slug of MS/BM language sibling
}

// _blogTagRE strips HTML tags when computing reading time.
var _blogTagRE = regexp.MustCompile(`<[^>]+>`)

// _blogCatCleanRE and _blogCatSpaceRE are used by CategoryToSlug.
var _blogCatCleanRE = regexp.MustCompile(`[^a-z0-9\s]`)
var _blogCatSpaceRE = regexp.MustCompile(`\s+`)

// WordCount returns the plain-text word count of a post's HTML content
// (used for the BlogPosting JSON-LD wordCount property).
func WordCount(html string) int {
	return len(strings.Fields(_blogTagRE.ReplaceAllString(html, " ")))
}

// _blogComputeReadingTime estimates reading time (minutes) from raw HTML using
// 200 wpm with a minimum of 1 minute — matching the TypeScript implementation.
func _blogComputeReadingTime(html string) int {
	text := _blogTagRE.ReplaceAllString(html, " ")
	words := strings.Fields(text)
	minutes := math.Ceil(float64(len(words)) / 200.0)
	if minutes < 1 {
		minutes = 1
	}
	return int(minutes)
}

// BlogPosts is the complete ordered list of every blog post (62 as of
// 2026-07-30; the old "35 posts" comment was stale — count with
// `grep -c 'Slug:' blog.go` rather than trusting a number here).
// ReadingTimeMinutes is computed from each post's HTML Content at init time.
var BlogPosts = func() []BlogPost {
	raw := []BlogPost{
		// 1
		{
			Slug:     "singapore-expat-visa-run-johor-bahru-guide-2026",
			Date:     "2026-08-07",
			Category: "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			Tags:     []string{"visa-run", "singapore", "expat", "johor-bahru", "causeway", "border-crossing", "malaysia-visa"},
			FeaturedImage: "/images/blog/singapore-expat-visa-run-johor-bahru-guide-2026.webp",
			ImageAlt:      "The Johor-Singapore Causeway border crossing used by expats doing a visa run from Singapore to Johor Bahru",
			Title:         "Singapore Expat Visa Run to Johor Bahru: 2026 Guide (Costs, Queues &amp; Where to Stay)",
			Excerpt:       "EP, S Pass, or tourist stamp expiring? JB is 15 minutes away. Border crossing tips, CW1 bus guide, queue timing, and why overnight beats same-day — all-in cost ~SGD30.",
			Content: `
<h2>What Is a Malaysia Social Visit Pass and Why Does It Expire?</h2>
<p>When you enter Malaysia without a long-term visa, immigration stamps your passport with a <strong>Social Visit Pass</strong> — Malaysia's tourist entry permit. For most nationalities, this grants a 30-day stay. The pass is tied to a single entry: once it expires, you must have exited and re-entered Malaysia to receive a new one.</p>

<p>Expats and foreigners living or working in Singapore often visit Malaysia on a Social Visit Pass for weekends and holidays. When the 30-day stamp approaches expiry, the solution is a <strong>visa run</strong>: exit Malaysia, cross back in, and receive a fresh 30-day pass from immigration.</p>

<h2>Why Johor Bahru Is the Logical Choice from Singapore</h2>
<p>JB is the closest international border to Singapore — 15 minutes from Woodlands CIQ by car, 30–45 minutes by bus including the crossing. It is also the cheapest option: a Causeway Link CW1 bus costs RM2.70 one-way (~SGD0.80). Compare that to flying to Thailand or Indonesia for the same administrative outcome.</p>

<p>Beyond logistics, JB has real overnight value: excellent food, affordable accommodation, and shopping — all at roughly one-third of Singapore prices. A JB visa run is not just an administrative chore. Done right, it is a cheap overnight break that resets your pass and your budget simultaneously.</p>

<h2>Two Border Crossings: Woodlands vs Tuas</h2>
<h3>Woodlands CIQ (Johor-Singapore Causeway) — Most Popular</h3>
<p>The main crossing used by the vast majority of foot passengers. From Singapore, take the MRT to Woodlands or bus 950/170 to Woodlands Bus Interchange, then board the Causeway Link CW1 bus directly to JB CIQ. This is the easiest route if you are on foot. The crossing takes 30–60 minutes on a normal weekday, but can stretch to 2–3 hours during peak periods.</p>

<h3>Tuas Second Link (KSAB) — Less Queue</h3>
<p>The western crossing, approximately 30 km west of the Causeway. Significantly less congested on most weekdays. Best suited for drivers or passengers in a car. There is no convenient public bus equivalent to CW1 for foot passengers at Tuas. If you are driving, the Second Link is often the faster choice when the Causeway is gridlocked — particularly on Friday evenings and before public holidays.</p>

<h2>Transport Options</h2>
<ul>
  <li><strong>Causeway Link CW1 bus</strong> — RM2.70 one-way from Woodlands Bus Interchange (Singapore) to JB CIQ. The most convenient option for foot passengers. Purchase the return ticket at JB CIQ for the same price. The bus runs frequently throughout the day and is clearly marked at Woodlands Bus Interchange.</li>
  <li><strong>Grab from JB CIQ to Pelangi</strong> — once you clear Malaysian immigration at JB CIQ, Grab to Taman Pelangi costs approximately RM8–12 and takes 10–15 minutes. Book through the Grab app using your Singapore number — it works in Malaysia.</li>
  <li><strong>Personal vehicle</strong> — toll is RM2.90 on the Malaysia side (cash or Touch 'n Go). Singapore ERP applies on the Singapore end. Fast when traffic is light; the worst option when it is not.</li>
</ul>

<h2>Best Time to Cross: Queue Guide</h2>
<p>Queue timing is the single biggest variable in a visa run. Cross at the wrong time and you lose half a day at the border. Here is the general pattern at Woodlands CIQ:</p>

<table>
<thead>
  <tr><th>Day / Time</th><th>Queue Level</th><th>Recommendation</th></tr>
</thead>
<tbody>
  <tr><td>Tue–Thu 10 AM–2 PM</td><td>Light to moderate</td><td>Best window — cross here</td></tr>
  <tr><td>Mon–Fri 7–9 AM</td><td>Heavy (SG-bound workers)</td><td>Avoid</td></tr>
  <tr><td>Mon–Fri 5–8 PM</td><td>Heavy (JB-bound return)</td><td>Avoid</td></tr>
  <tr><td>Friday evening</td><td>Very heavy</td><td>Avoid</td></tr>
  <tr><td>Weekend mornings</td><td>Moderate to heavy</td><td>Cross early if needed</td></tr>
  <tr><td>Sunday night</td><td>Heavy (SG return)</td><td>Avoid</td></tr>
  <tr><td>Public holiday eve/day</td><td>Very heavy both directions</td><td>Cross before 7 AM or after 9 PM</td></tr>
</tbody>
</table>

<p>The sweet spot is <strong>Tuesday to Thursday, mid-morning</strong>. Leave Singapore by 9 AM on a Tuesday and you will typically clear both checkpoints in under 45 minutes.</p>

<h2>Same-Day vs Overnight: Which Should You Do?</h2>
<p>A same-day visa run is technically valid: cross into JB, wait a few hours, cross back. Immigration accepts it. But it is a poor use of a day. Factor in two bus journeys, two sets of immigration queues, and the risk of hitting peak hours on either leg, and you can easily spend 4–6 hours at the border for a stamp that took 10 seconds to issue.</p>

<p>An overnight stay costs more but delivers more. Cross Tuesday morning on light queues, check into Pelangi Capsule Hostel, eat a proper Malaysian dinner, sleep well, and cross back Wednesday mid-morning — again light queues. You reset your pass without the rush, and you get a legitimate overnight break from Singapore's cost of living.</p>

<p><strong>Our recommendation: plan for overnight.</strong> Build in flexibility for queue delays. The extra cost — roughly a Pelangi capsule pod at RM35 (~SGD10) — is trivial compared to the stress of sprinting for the last bus with an expiring stamp.</p>

<h2>Realistic Cost Breakdown (SGD)</h2>
<table>
<thead><tr><th>Item</th><th>RM</th><th>~SGD</th></tr></thead>
<tbody>
  <tr><td>CW1 bus Woodlands → JB CIQ (one-way)</td><td>RM2.70</td><td>~SGD0.80</td></tr>
  <tr><td>Grab JB CIQ → Pelangi Hostel</td><td>~RM10</td><td>~SGD3</td></tr>
  <tr><td>Pelangi capsule pod (1 night, first-timer rate)</td><td>RM30</td><td>~SGD9</td></tr>
  <tr><td>Dinner + breakfast at local mamak</td><td>RM30–50</td><td>~SGD9–15</td></tr>
  <tr><td>Grab Pelangi → JB CIQ + CW1 bus (return)</td><td>~RM13</td><td>~SGD4</td></tr>
  <tr><td><strong>Total overnight visa run</strong></td><td><strong>~RM86–106</strong></td><td><strong>~SGD25–32</strong></td></tr>
</tbody>
</table>

<p>Malaysia charges no entry fee at the Causeway for most nationalities. For under SGD32, you reset your Social Visit Pass, sleep in a modern private capsule pod, and eat two proper Malaysian meals. That is less than a return taxi fare to Changi Airport.</p>

<h2>What Immigration Asks</h2>
<p>Both Malaysian and Singapore immigration officers see visa run crossings every day. There is nothing unusual about them. Here is what to expect:</p>
<ul>
  <li><strong>Malaysian immigration (entry):</strong> May ask how long you are staying and your purpose. "Tourism, one to two nights" is accurate and sufficient. Have your Pelangi booking confirmation on your phone — it removes any ambiguity and often speeds up the conversation.</li>
  <li><strong>Singapore immigration (re-entry):</strong> May ask where you have been and for how long. "Johor Bahru, one night" is a complete answer. EP/S Pass holders should have their Singapore work pass ready to present — it confirms your long-term status in Singapore.</li>
  <li><strong>Proof of funds:</strong> Keep SGD 1,000–1,500 visible in your bank app. Malaysia technically requires this for tourist entry and officers occasionally ask to see it, particularly if you are crossing frequently.</li>
</ul>

<p>Be calm and accurate. Do not volunteer more information than asked. Officers are looking for honest, consistent answers — not complicated explanations.</p>

<h2>Where to Stay: Pelangi Capsule Hostel</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> at 26A Jalan Perang, Taman Pelangi, is built for this kind of stay. Key reasons it works well for a visa run:</p>
<ul>
  <li><strong>24/7 self check-in</strong> — no reception hours to work around. Arrive at 11 PM after a long queue and check in immediately without waiting for anyone.</li>
  <li><strong>No minimum stay</strong> — one night is perfectly fine.</li>
  <li><strong>RM30 first night</strong> for new guests (RM35 from the second night onward). In SGD, that is under SGD10 for a private, lockable capsule pod with air-conditioning, WiFi, and a hot shower.</li>
  <li><strong>15 minutes from Woodlands CIQ</strong> by Grab — no need to stay in a noisy transit area near the border.</li>
  <li><strong>Shared kitchen and free WiFi</strong> — work remotely, cook a meal, or just decompress after the crossing.</li>
</ul>

<p>Book directly at <a href="/book">pelangicapsulehostel.com/book</a> — no booking fees, best rate guaranteed. WhatsApp <a href="https://wa.me/60127088789">+60 12-708 8789</a> if you need to arrange a late arrival or check availability for a specific night.</p>

<p>For the complete reference page with schema-validated FAQ, step-by-step HowTo, and transport details, see the <a href="/visa-run">Visa Run Guide</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can I do a same-day visa run from Singapore to JB?</h3>
<p>Yes — cross into Malaysia, wait, and return the same day. Immigration accepts this. However, queue times are unpredictable: a same-day run can consume 4–6 hours. An overnight stay costs ~SGD10 more and is far less stressful.</p>

<h3>Do EP or S Pass holders need to do a visa run?</h3>
<p>EP and S Pass holders have long-term Singapore work passes, so they are not subject to Singapore's 30-day tourist entry limits. However, if they hold a Malaysia Social Visit Pass that is about to expire, they still need to exit and re-enter Malaysia to reset that pass — which a JB visa run accomplishes.</p>

<h3>What bus goes from Singapore to JB CIQ?</h3>
<p>Causeway Link CW1 from Woodlands Bus Interchange. One-way fare: RM2.70 (~SGD0.80). It departs frequently and goes directly to JB CIQ terminal. From Woodlands MRT, walk 5 minutes to the bus interchange — clearly signposted for JB buses.</p>

<h3>How long does the whole visa run take?</h3>
<p>For an overnight run: depart Singapore at 9 AM, cross in 45 min (light day), Grab to Pelangi by 11 AM, check in at 2 PM, return crossing next morning by 11 AM — total ~26 hours elapsed, most of it sleeping and eating. Same-day: 4–6 hours minimum, often more.</p>

<h3>Does Malaysia charge an entry fee at the Causeway?</h3>
<p>No. Malaysia does not charge an entry fee for most nationalities crossing at the Causeway on a Social Visit Pass. The costs are transport (bus/Grab), accommodation, and meals. Confirm the current rules at <a href="https://www.imi.gov.my" target="_blank" rel="noopener noreferrer">imi.gov.my</a> for your specific nationality.</p>
`,
		},
		// 2
		{
			Slug:     "india-to-johor-bahru-travel-guide",
			Date:     "2026-08-01",
			Category: "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime: "7 min read",
			Tags:     []string{"india", "johor-bahru", "budget-travel", "travel-tips", "from-india", "malaysia"},
			FeaturedImage: "/images/blog/india-to-jb-guide.webp",
			ImageAlt:      "Johor Bahru city skyline with Indian traveler at the Causeway, JB-Singapore border",
			Title:         "India to Johor Bahru: The Complete Budget Travel Guide for 2026",
			Excerpt:       "Indian passport? RM35/night capsule. Flights from Chennai from RM280. Visa info, transport routes, vegetarian food guide — all in one place.",
			Content: `
<h2>Why Indian Travelers Are Choosing Johor Bahru</h2>
<p>Johor Bahru is quietly becoming one of the most popular weekend destinations for Indian professionals based in Singapore — and for good reason. At RM35 per night (approximately ₹630), Pelangi Capsule Hostel offers a modern, private capsule pod for less than a meal at a mid-range Singapore restaurant. The math is simple: stay in JB, cross into Singapore for the day, and pocket the savings.</p>

<p>But JB is far more than a cheap alternative to Singapore hotels. It has its own food culture, a vibrant Indian community, temples, malls, and a pace of life that feels refreshingly unhurried. For Indian travelers coming directly from India, JB is the ideal first stop in Malaysia &mdash; or a value-packed base for exploring the peninsula.</p>

<h2>Getting to JB from India</h2>

<h3>From Chennai</h3>
<p>AirAsia and IndiGo operate regular flights from Chennai (MAA) to Kuala Lumpur (KUL), with fares starting around RM280 (₹5,000) return during off-peak seasons. From KUL's TBS terminal, a direct JB bus takes approximately 4 hours and costs RM25&ndash;35. Alternatively, check for direct flights to Senai International Airport (JHB) &mdash; when available, these eliminate the KUL connection entirely.</p>

<h3>From Bangalore, Hyderabad, and Other Cities</h3>
<p>Most Indian cities connect to KUL via AirAsia, Air India, or Malaysia Airlines. Travel time is typically 4&ndash;6 hours. From KUL, take the TBS bus to JB Sentral (Larkin terminal) or JBCC City Square. A Grab from either terminal to Pelangi Capsule Hostel in Taman Pelangi takes 10&ndash;15 minutes and costs RM8&ndash;12.</p>

<h3>Via Singapore</h3>
<p>Many Indian travelers fly to Singapore first, then cross the Causeway. Take the Causeway Link CW1 bus from Queen Street Terminal or Woodlands CIQ to JB Sentral &mdash; the bus costs SGD3.30 and takes 30&ndash;45 minutes including the border crossing. From JB Sentral, a Grab to Taman Pelangi is RM8&ndash;12.</p>

<h2>Visa Information for Indian Passport Holders</h2>
<p>Most Indian travelers use the <strong>eNTRI</strong> (eNotification of Travel Information) for short stays up to 15 days. Apply online before travel at Malaysia's official immigration portal. Processing is fast and there is no visa sticker required.</p>

<p>For longer stays, apply for an <strong>eVisa</strong> through the same portal. Indian nationals holding a valid Singapore Employment Pass (EP) or S Pass entering from Singapore may enter Malaysia visa-free for short stays &mdash; confirm the current rules at <a href="https://www.imi.gov.my" target="_blank" rel="noopener noreferrer">imi.gov.my</a> before booking your trip, as conditions are subject to change.</p>

<h2>INR to MYR: The Numbers That Make JB Irresistible</h2>
<p>At current exchange rates, 1 MYR ≈ ₹18. Here is what that means in practice for a 3-night JB trip from Singapore:</p>
<ul>
<li>Hostel: RM35 × 3 nights = RM105 ≈ ₹1,890</li>
<li>Meals (3/day at mamak): RM15 × 3 days = RM45 ≈ ₹810</li>
<li>Grab rides: RM30 total ≈ ₹540</li>
<li><strong>Total: RM180 ≈ ₹3,240</strong> for 3 nights in a modern, safe hostel with food</li>
</ul>
<p>Compare that to a Singapore hotel at SGD80+/night. The JB advantage is real.</p>

<h2>Getting Around JB</h2>
<p>Grab is the primary way to move around JB. It is safe, reliable, and inexpensive &mdash; most rides within the city cost RM5&ndash;15. There is no MRT in JB (the RTS Link to Singapore is under construction), so plan for Grab or occasional taxis for longer distances.</p>

<p>For day trips: KL is 4 hours by Causeway Link bus (RM25&ndash;35), Melaka is 2 hours (RM15&ndash;20), and Desaru beaches are 1.5 hours by Grab or shared taxi.</p>

<h2>Where to Stay: Pelangi Capsule Hostel</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> is located at 26A Jalan Perang, Taman Pelangi &mdash; a central JB neighbourhood known for food, the Tuesday night market, and easy Grab access to everywhere. Each pod has a locking sliding door, air-conditioning, USB charging, and a premium mattress. Free WiFi throughout, 24/7 self check-in, personal lockers, shared kitchen, and hot showers.</p>

<p>Nightly rates start at RM30 your first night (new guests) and RM35 per night thereafter. Monthly rates from RM600/month (Upper Deck) or RM650/month (Lower Deck) &mdash; popular with Singapore-based professionals who commute back on weekends.</p>

<h2>Final Tips for Indian Travelers</h2>
<ul>
<li><strong>Currency:</strong> Exchange INR to MYR at JB CIQ money changers or City Square mall. Rates are competitive. Most ATMs accept Indian Visa/Mastercard debit cards.</li>
<li><strong>SIM card:</strong> Buy a Malaysian prepaid SIM at City Square or Larkin terminal (Digi, Maxis, Celcom all carry Indian-roaming-friendly plans).</li>
<li><strong>Food:</strong> You will not go hungry as a vegetarian. Mamak stalls and South Indian restaurants are everywhere. See our <a href="/blog/vegetarian-food-johor-bahru-indian-travelers">vegetarian food guide for JB</a>.</li>
<li><strong>Safety:</strong> JB is generally safe for solo travelers including women. Stick to populated areas at night and use Grab for late rides.</li>
</ul>
`,
		},
		// 2
		{
			Slug:     "vegetarian-food-johor-bahru-indian-travelers",
			Date:     "2026-07-28",
			Category: "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime: "5 min read",
			Tags:     []string{"food", "vegetarian", "indian-travelers", "johor-bahru", "taman-pelangi"},
			FeaturedImage: "/images/blog/jb-vegetarian-indian-food.webp",
			ImageAlt:      "Banana leaf rice spread and roti canai at a Johor Bahru mamak restaurant",
			Title:         "Vegetarian Food in Johor Bahru: An Indian Traveler's Guide",
			Excerpt:       "From banana leaf thali to roti canai — JB's Indian food scene is better than you'd expect. Best spots within 1km of Taman Pelangi.",
			Content: `
<h2>JB's Indian Food Scene: Better Than You'd Expect</h2>
<p>Johor Bahru's food culture is deeply influenced by Malaysia's large Tamil and North Indian communities. The result: a city where finding vegetarian South Indian food is easier than in many parts of South India itself. Mamak restaurants &mdash; open-air eateries run by Tamil Muslim families &mdash; serve roti canai, dhal, dosai, and teh tarik 24 hours a day, 7 days a week.</p>

<p>For Indian travelers staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi, vegetarian options are literally steps away.</p>

<h2>What You'll Find Within Walking Distance of the Hostel</h2>

<h3>Mamak Stalls (5 Minutes' Walk)</h3>
<p>Mamak stalls are the backbone of JB's food scene. Look for the open-air restaurants with fluorescent lighting and stacks of roti on the griddle. Typical prices:</p>
<ul>
<li>Roti canai plain: RM1.50</li>
<li>Roti canai with egg: RM2.50</li>
<li>Dhal curry (side): RM1.50</li>
<li>Dosai (thosai): RM3&ndash;4</li>
<li>Teh tarik: RM2</li>
<li>Milo ais: RM2.50</li>
</ul>
<p>Most mamak stalls have a full vegetarian menu &mdash; just ask for "sayur sahaja" (vegetables only) and they will prepare your roti or nasi without meat.</p>

<h3>Nasi Campur Stalls</h3>
<p>Nasi campur (mixed rice) stalls let you pick from a display of dishes. Vegetarian options typically include: tempeh goreng, sayur goreng (stir-fried vegetables), dhal, sambal terung (brinjal), and fried tofu. A plate costs RM5&ndash;8 with 3&ndash;4 side dishes.</p>

<h3>Taman Pelangi Tuesday Night Market</h3>
<p>Every Tuesday from 4:30 PM, Jalan Kuning (5 minutes from the hostel) hosts a 500-metre night market. Indian-influenced stalls sell putu piring, vadai, apom (appam), and kuih with various vegetarian fillings. Budget RM10&ndash;20 for a full evening's eating.</p>

<h2>Jalan Dhoby — Little India (10 Minutes by Grab)</h2>
<p>Jalan Dhoby is JB's Indian commercial district. Here you will find:</p>
<ul>
<li><strong>South Indian vegetarian restaurants</strong> with banana leaf rice, sambar, rasam, and a full array of vegetable curries (RM8&ndash;15 per set)</li>
<li><strong>Thali meals</strong> &mdash; unlimited rice refills with rotating curries and pickle, in the Kerala/Tamil tradition</li>
<li><strong>Indian sweets</strong> &mdash; ladoo, halwa, barfi, and murukku sold by weight at Indian provision shops</li>
<li><strong>Indian grocery stores</strong> &mdash; masala powders, pickle jars, chilli, and rice varieties from India and Sri Lanka</li>
</ul>

<h2>Key Vegetarian-Friendly Dishes to Try in JB</h2>
<table>
<thead><tr><th>Dish</th><th>Description</th><th>Typical Price</th></tr></thead>
<tbody>
<tr><td>Roti canai</td><td>Flaky flatbread with dhal and curry</td><td>RM1.50&ndash;3</td></tr>
<tr><td>Thosai (dosai)</td><td>Crispy rice-lentil crepe, served with chutney</td><td>RM3&ndash;5</td></tr>
<tr><td>Nasi lemak (veg)</td><td>Coconut rice with sambal, peanuts, cucumber</td><td>RM4&ndash;6</td></tr>
<tr><td>Char kway teow (veg)</td><td>Stir-fried flat rice noodles — ask for no cockles or lard</td><td>RM6&ndash;8</td></tr>
<tr><td>Banana leaf rice</td><td>Full South Indian meal on a banana leaf</td><td>RM10&ndash;15</td></tr>
<tr><td>Vegetable briyani</td><td>Fragrant rice with mixed vegetables and raita</td><td>RM8&ndash;12</td></tr>
</tbody>
</table>

<h2>Supermarkets and Cooking</h2>
<p>If you prefer cooking, Pelangi Capsule Hostel has a shared kitchen available to all guests. The nearest supermarket (Giant or Econsave) is a short Grab ride away. Indian ingredients &mdash; spices, lentils, basmati, canned tomatoes &mdash; are available at Indian grocery shops on Jalan Dhoby and at Cold Storage in City Square mall.</p>

<h2>Practical Tips for Vegetarian Travelers</h2>
<ul>
<li>Say <strong>"sayur sahaja"</strong> (vegetables only) or <strong>"tak nak daging"</strong> (no meat) at stalls that mix veg and non-veg dishes.</li>
<li>At mamak restaurants, clarify if dishes are cooked in the same wok as meat &mdash; most reputable stalls will accommodate your request.</li>
<li>Egg is widely used in Malaysian vegetarian dishes &mdash; specify if you need egg-free options.</li>
<li>JB has several dedicated Indian vegetarian restaurants where cross-contamination is not a concern.</li>
</ul>

<p>For more on getting to JB from India, see our <a href="/blog/india-to-johor-bahru-travel-guide">India to JB travel guide</a>. Ready to book? <a href="/book">Check availability at Pelangi Capsule Hostel</a>.</p>
`,
		},
		// 3
		{
			Slug:          "ultimate-jb-food-guide-backpackers",
			LastModified:  "2026-06-26",
			ImageAlt:      "A spread of Johor Bahru hawker dishes — roti canai, nasi lemak, and local noodles served at a Taman Pelangi food stall",
			Title:         "The Ultimate Johor Bahru Food Guide for Backpackers (2026)",
			Excerpt:       "From RM5 hawker meals to legendary seafood spots — everything a budget traveller needs to eat their way through JB like a local.",
			Date:          "2026-02-20",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "food", "backpacker", "budget-travel", "malaysia", "hawker"},
			FeaturedImage: "/images/blog/jb-food-guide.webp",
			Content: `
<h2>Why JB Is a Backpacker's Food Paradise</h2>
<p>Johor Bahru sits at the crossroads of Malay, Chinese, Indian, and Peranakan culinary traditions — and the prices are absurdly low. A full meal at a hawker centre runs RM5–12, a pulled tea costs RM2, and the quality of food rivals cities ten times its size. For backpackers crossing the border from Singapore, where a similar meal costs SGD8–15, JB feels like a food revelation.</p>

<p>The city doesn't have Michelin stars or Instagram-bait restaurants. What it has is better: generations-old recipes, family-run stalls, and an eating culture where quality is the only way to survive. If you're staying at <a href="/rooms">Pelangi Capsule Hostel in Taman Pelangi</a>, you're in one of the best food neighbourhoods in the city.</p>

<h2>Breakfast: The Malaysian Way</h2>
<p><strong>Roti canai</strong> is the quintessential Malaysian breakfast — flaky, buttery flatbread torn by hand and dipped into dhal or fish curry. Every mamak (Indian-Muslim coffee shop) makes it, and it costs RM1.50–3. Pair it with a <strong>teh tarik</strong> (pulled milk tea, RM2) and you've got a breakfast that costs less than a Singapore MRT ride.</p>

<p>If you want something heartier, try <strong>nasi lemak</strong> — coconut rice served with sambal chilli, fried anchovies, peanuts, cucumber, and a hard-boiled egg. The stall versions, wrapped in banana leaf, run RM3–5 and are available from dawn. For the adventurous, <strong>nasi kerabu</strong> (blue-coloured herbed rice) appears at Malay stalls and is worth seeking out.</p>

<h2>Lunch: Hawker Centre Essentials</h2>
<p>JB's hawker centres are the backbone of the city's food culture. At lunch, every centre buzzes with office workers, families, and the occasional bewildered tourist who can't believe the prices. Head to <strong>Sik Bao Sin</strong> near Taman Pelangi for mixed rice — point at whatever looks good behind the glass, and the uncle will pile your plate for RM5–8.</p>

<p>For noodle lovers, <strong>mee rebus</strong> is a Johorean specialty: yellow noodles in a thick, slightly sweet potato-based gravy, topped with boiled egg, tofu, and fried shallots. It's hearty, warming, and unlike anything you'll find elsewhere in Malaysia. <strong>Laksa Johor</strong> is even more distinctive — it uses spaghetti-like noodles instead of rice noodles, swimming in a rich fish-based curry. It's divisive, but locals are fiercely proud of it.</p>

<p>Check our <a href="/guide">JB Travel Guide</a> for a walking map of the best hawker centres within reach of the hostel.</p>

<h2>Dinner: Seafood and Night Markets</h2>
<p><strong>San Low Seafood</strong>, a five-minute walk from Pelangi Capsule, is legendary among locals for its <strong>San Lou Bee Hoon</strong> — dry-fried vermicelli with prawns, egg, and a savoury soy glaze. The dish looks simple but the wok technique is masterful. Budget RM15–25 per person for a seafood dinner here, which is still a fraction of Singapore prices.</p>

<p>If you prefer street food, JB's night markets (pasar malam) are unmissable. <strong>Taman Sentosa Night Market</strong> runs Thursday and Sunday nights and stretches for hundreds of metres: satay sticks (RM0.60 each), lok-lok (skewered meats dipped in boiling broth, RM1–2 per stick), martabak (stuffed pancakes), and fresh coconut water. Budget RM15–25 for a full night market feast.</p>

<h2>Snacks and Drinks</h2>
<p><strong>Otak-otak</strong> — spiced fish paste wrapped in banana leaf and grilled over charcoal — is sold by roadside vendors for RM1–2 per piece. Buy five and eat them walking. <strong>Kuih</strong> (bite-sized Malay cakes and sweets) appear at morning markets and cost RM0.50–1 each. Try <strong>kuih lapis</strong> (rainbow layered cake) and <strong>ondeh-ondeh</strong> (pandan balls filled with palm sugar).</p>

<p>For drinks, the <strong>teh tarik</strong> (pulled tea) is an art form. Watch the vendor pour boiling tea between two cups from arm's length, creating a frothy, perfectly mixed drink. <strong>Cham</strong> (coffee mixed with tea) is another local favourite. Fresh sugarcane juice costs RM3 and is the best remedy for JB's tropical heat.</p>

<h2>Budget Breakdown</h2>
<p>Here's what a day of eating in JB actually costs:</p>
<ul>
  <li><strong>Breakfast:</strong> Roti canai + teh tarik — RM5</li>
  <li><strong>Lunch:</strong> Hawker centre mixed rice — RM8</li>
  <li><strong>Snack:</strong> Otak-otak + sugarcane juice — RM5</li>
  <li><strong>Dinner:</strong> Night market feast — RM20</li>
  <li><strong>Total:</strong> RM38 per day (approximately SGD11 or USD8)</li>
</ul>

<p>That's three full meals, snacks, and drinks for less than the cost of one restaurant meal in Singapore. This is why backpackers who discover JB's food scene never want to leave.</p>

<p>Ready to eat your way through JB? <a href="/book">Book a capsule at Pelangi</a> and start your food adventure in one of the best eating neighbourhoods in the city.</p>
`,
		},
		// 2
		{
			Slug:          "singapore-to-jb-day-trip-causeway-guide",
			LastModified:  "2026-06-26",
			ImageAlt:      "The Johor–Singapore Causeway land border crossing connecting Woodlands to Johor Bahru",
			Title:         "Singapore to JB Day Trip Guide: How to Cross the Causeway (2026)",
			Excerpt:       "The complete step-by-step guide to crossing the Causeway from Singapore to Johor Bahru — transport options, immigration tips, costs, and what to do once you arrive.",
			Date:          "2026-02-25",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "9 min read",
			Tags:          []string{"johor-bahru", "singapore", "causeway", "border-crossing", "backpacker", "budget-travel"},
			FeaturedImage: "/images/blog/causeway-guide.webp",
			AlternateZH: "xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan",
			Content: `
<h2>Why Cross the Causeway?</h2>
<p>The Johor–Singapore Causeway is one of the busiest land border crossings in the world, connecting Singapore's Woodlands district to Johor Bahru, Malaysia. For travellers based in Singapore, JB offers dramatically cheaper food, shopping, and accommodation — making it the most popular day trip from the island. For backpackers, it's even more strategic: stay in JB at a fraction of Singapore prices and day-trip into Singapore whenever you want.</p>

<p>The crossing itself is straightforward once you know the drill. This guide covers every option, common mistakes, and what to expect in 2026.</p>

<h2>Option 1: Bus from Woodlands (Most Popular)</h2>
<p>The <strong>Causeway Link CW1</strong> and <strong>SBS Transit 170</strong> buses depart from Woodlands Checkpoint on the Singapore side. Here's the process:</p>
<ol>
  <li><strong>Get to Woodlands:</strong> Take the MRT to Woodlands or Kranji station. From Kranji, bus 160 goes directly to the checkpoint.</li>
  <li><strong>Clear Singapore immigration:</strong> Everyone exits the bus, walks through Singapore passport control, and re-boards.</li>
  <li><strong>Cross the Causeway:</strong> The bus drives across the 1km bridge. Takes 5 minutes without traffic.</li>
  <li><strong>Clear Malaysian immigration:</strong> Everyone exits again, clears Malaysian passport control at JB CIQ (Customs, Immigration &amp; Quarantine).</li>
  <li><strong>Arrive in JB:</strong> You're now at JB Sentral, connected to City Square Mall and the city centre.</li>
</ol>
<p>Cost: SGD1.50–2 per way. The entire crossing takes 30–60 minutes on a good day, or 2–3 hours during peak periods (Friday evenings, public holidays, school holidays).</p>

<h2>Option 2: Train (RTS Link — Coming Soon)</h2>
<p>The Johor Bahru–Singapore Rapid Transit System (RTS Link) has been in development and will eventually connect Bukit Chagar in JB to Woodlands North in Singapore. Until it's operational, the bus remains your best bet. Check KTMB for any shuttle train services that may be running between JB Sentral and Woodlands.</p>

<h2>Option 3: Private Car or Grab</h2>
<p>You can take a Grab from Singapore to JB, but you'll need to exit the car at both immigration checkpoints and re-board. Some drivers won't do cross-border trips. A more reliable option is booking a private transfer — expect SGD40–60 for the car. For solo backpackers, the bus is significantly cheaper and barely slower.</p>

<h2>Immigration Tips</h2>
<ul>
  <li><strong>Passport validity:</strong> Your passport must be valid for at least 6 months from the date of entry into Malaysia.</li>
  <li><strong>Malaysia Digital Arrival Card (MDAC):</strong> Since 2024, most nationalities must complete the MDAC online before arrival. Do this before you reach the border — it takes 5 minutes and is free.</li>
  <li><strong>Peak hours to avoid:</strong> Friday 5–9pm (Singapore to JB), Sunday 5–9pm (JB to Singapore). Weekday mornings are the smoothest.</li>
  <li><strong>Keep your departure card:</strong> Malaysian immigration staples a small card into your passport. Don't lose it — you need it when leaving Malaysia.</li>
</ul>

<h2>What to Do Once You Arrive in JB</h2>
<p>JB CIQ drops you at <strong>JB Sentral</strong>, the city's main transport hub. From here:</p>
<ul>
  <li><strong>City Square Mall</strong> is connected directly — air-conditioned shopping, food court, and money changers.</li>
  <li><strong>Jalan Tan Hiok Nee</strong> (10 min walk) — heritage street with indie cafes, art galleries, and the best street murals in JB.</li>
  <li><strong>Taman Pelangi</strong> (10 min Grab ride, RM8) — the neighbourhood where <a href="/rooms">Pelangi Capsule Hostel</a> is located, surrounded by hawker centres and local restaurants.</li>
</ul>

<p>For a complete rundown of activities, attractions, and local tips, check our <a href="/guide">JB Backpacker's Guide</a>.</p>

<h2>Costs: Singapore vs JB</h2>
<p>The whole reason to cross the Causeway is the price difference:</p>
<ul>
  <li><strong>Hostel bed:</strong> SGD40–60 in Singapore vs RM35–50 (SGD10–15) in JB</li>
  <li><strong>Hawker meal:</strong> SGD5–8 in Singapore vs RM6–12 (SGD2–4) in JB</li>
  <li><strong>Grab ride:</strong> SGD10–15 in Singapore vs RM8–15 (SGD3–5) in JB</li>
  <li><strong>Daily budget:</strong> SGD80–120 in Singapore vs RM80–120 (SGD25–35) in JB</li>
</ul>

<p>A single night in a Singapore hostel pays for nearly three nights in JB. For backpackers on a multi-week trip through Southeast Asia, that difference compounds fast.</p>

<h2>Coming Back: JB to Singapore</h2>
<p>The return process mirrors the outbound trip — bus from JB CIQ, clear Malaysian exit, cross Causeway, clear Singapore entry. Last buses run until around midnight. Keep SGD coins handy for the Singapore bus fare if you don't have an EZ-Link card.</p>

<p>The smartest strategy? Base yourself in JB, where your accommodation and food budget goes three times further, and day-trip into Singapore for the highlights. <a href="/book">Book a capsule at Pelangi</a> and make the Causeway your daily commute.</p>
`,
		},
		// 3
		{
			Slug:          "top-10-things-to-do-johor-bahru-budget",
			Title:         "Top 10 Things to Do in Johor Bahru on a Budget",
			Excerpt:       "You don't need to spend big to have a great time in JB. Here are the best free and cheap activities for backpackers exploring Johor Bahru.",
			Date:          "2026-03-01",
			Category:      "Things To Do",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "budget-travel", "backpacker", "things-to-do", "malaysia", "free-activities"},
			FeaturedImage: "/images/blog/jb-budget-activities.webp",
			Content: `
<h2>JB on a Shoestring</h2>
<p>Johor Bahru isn't on most backpacker itineraries — and that's exactly what makes it great. While tourists crowd Kuala Lumpur's Petronas Towers, JB offers authentic Malaysian life without the tourist markup. Better still, most of JB's best experiences cost little or nothing. Here are ten things to do in Johor Bahru that won't break your budget.</p>

<h2>1. Walk Jalan Tan Hiok Nee (Free)</h2>
<p>JB's heritage street is a living gallery of pre-war shophouses, street murals, indie coffee shops, and vintage boutiques. Start at the Sultan Ibrahim Building end and walk the full length, ducking into alleys for hidden street art. The <strong>JB Arts Festival</strong> often sets up installations here. Budget an hour for the walk, more if you stop for coffee (RM8–12 at the indie cafes).</p>

<h2>2. Visit the Glass Temple (Free)</h2>
<p><strong>Arulmigu Sri Rajakaliamman Temple</strong> is unlike any Hindu temple you've seen — every surface, inside and out, is covered in coloured glass mosaics. It's free to enter (dress modestly, remove shoes), and the interior sparkles in the afternoon light. Located in Taman Pelangi, it's walking distance from <a href="/rooms">Pelangi Capsule Hostel</a>.</p>

<h2>3. Eat Your Way Through a Night Market (RM15–25)</h2>
<p>JB's pasar malam (night markets) rotate across neighbourhoods throughout the week. <strong>Taman Sentosa Night Market</strong> (Thursday and Sunday) is one of the largest — stretching for hundreds of metres with satay, lok-lok, grilled corn, fresh juices, and every Malay snack imaginable. Arrive hungry, leave happy, spend under RM25.</p>

<h2>4. Day Trip to Singapore (RM10–15 return)</h2>
<p>JB's proximity to Singapore is its superpower. The Causeway Link bus costs RM3–5 each way, putting you in Singapore within 30–60 minutes. Spend the day exploring Gardens by the Bay, Chinatown, and Little India, then return to JB for dinner at hawker centre prices. Base yourself in JB and treat Singapore as a day trip rather than a destination — your budget will thank you.</p>

<h2>5. Explore Danga Bay Waterfront (Free)</h2>
<p>The <strong>Danga Bay</strong> waterfront stretches along the Straits of Johor with walking paths, food trucks, and views across to Singapore. It's best at sunset when the sky turns amber and the Singapore skyline lights up. On weekends, local vendors set up stalls selling snacks and drinks. The walk itself is free and the atmosphere is relaxed.</p>

<h2>6. Browse Pasar Karat Flea Market (Free)</h2>
<p>Every Sunday morning, <strong>Pasar Karat</strong> (the "rusty market") takes over Jalan Wong Ah Fook with hundreds of vendors selling vintage goods, old coins, secondhand electronics, antique cameras, vinyl records, and random curiosities. It's chaotic, fascinating, and completely free to browse. Arrive before 9am for the best selection.</p>

<h2>7. Visit Sultan Abu Bakar State Mosque (Free)</h2>
<p>Perched on a hilltop overlooking the Straits of Johor, this 19th-century mosque blends Victorian and Moorish architecture. The grounds are open to visitors outside prayer times, and the views of the waterfront and Singapore skyline are spectacular. Dress modestly; robes are available at the entrance.</p>

<h2>8. Café-Hop in Taman Molek (RM10–20)</h2>
<p>JB's café scene has exploded in recent years. <strong>Taman Molek</strong> and <strong>Mount Austin</strong> neighbourhoods have dozens of third-wave coffee shops with single-origin brews, specialty lattes, and brunch menus. A good flat white costs RM10–14 — fancy by JB standards, but still half the price of Singapore or KL. It's a pleasant way to spend a slow morning.</p>

<h2>9. Hike at Gunung Pulai (RM1 entry)</h2>
<p>For nature lovers, <strong>Gunung Pulai Recreation Forest</strong> is about 30 minutes north of JB city. The trail leads to a series of waterfalls surrounded by lowland rainforest. Entry is RM1. It's not a challenging hike — more of a nature walk — but the cool forest air and swimming holes make it a perfect half-day escape from the city heat. Grab a ride there for RM25–35.</p>

<h2>10. Cross Into Kampung Life (Free)</h2>
<p>Walk 15 minutes in any direction from the city centre and you'll find traditional <strong>kampung</strong> (village) neighbourhoods: wooden houses on stilts, community mosques, children playing football in the street, and the sound of the azan (call to prayer) drifting over tin rooftops. This is the Malaysia that most tourists miss entirely, and it costs nothing to experience.</p>

<p>For more local tips on getting around JB, where to eat, and what to see, read our full <a href="/guide">JB Backpacker's Guide</a>. And if you're looking for affordable accommodation in the heart of Taman Pelangi, <a href="/book">book a capsule at Pelangi</a> — your base camp for exploring everything on this list.</p>
`,
		},
		// 4
		{
			Slug:          "jb-hawker-centres-street-food-must-visit",
			Title:         "JB Street Food Hawker Centres You Must Visit",
			Excerpt:       "The best hawker centres in Johor Bahru for backpackers — where locals eat, what to order, and how to eat well for under RM15 per meal.",
			Date:          "2026-03-05",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "food", "hawker", "street-food", "backpacker", "budget-travel"},
			FeaturedImage: "/images/blog/jb-hawker-centres.webp",
			Content: `
<h2>Hawker Culture in Johor Bahru</h2>
<p>Hawker centres are the beating heart of Malaysian food culture, and Johor Bahru has some of the best in the country. Unlike restaurants, hawker centres are open-air or semi-covered food courts where independent stall operators cook single dishes to perfection. You'll find a dozen stalls under one roof, each specialising in one thing — noodles, rice, grilled meats, or desserts. Pick a seat, order from as many stalls as you want, and eat like a local for a fraction of restaurant prices.</p>

<p>For backpackers staying at <a href="/rooms">Pelangi Capsule Hostel</a>, several of JB's best hawker centres are within walking distance or a short Grab ride away. Here are the ones you absolutely should not miss.</p>

<h2>1. Restoran Sik Bao Sin (Taman Pelangi)</h2>
<p><strong>Distance from Pelangi Capsule:</strong> 2-minute walk</p>
<p>This mixed-rice institution sits directly opposite the hostel and is the default lunch spot for the neighbourhood. The concept is simple: grab a plate, point at whatever looks good behind the glass display — curried chicken, stir-fried vegetables, fried fish, sambal prawns — and the staff piles it on. A heaped plate with three dishes and rice costs RM5–8. The food rotates daily and is consistently excellent. Arrive before 12:30pm or the best dishes sell out.</p>

<h2>2. San Low Seafood Restaurant (Taman Pelangi)</h2>
<p><strong>Distance from Pelangi Capsule:</strong> 5-minute walk</p>
<p>San Low is legendary for one dish: <strong>San Lou Bee Hoon</strong>. Dry-fried vermicelli noodles tossed with prawns, egg, and a savoury soy-and-sesame glaze — it looks simple but the wok control is masterful. The restaurant also does excellent butter prawns, salted egg crab, and stir-fried vegetables. It's more expensive than a hawker stall (budget RM20–30 per person) but the quality justifies it. Go for dinner; it gets packed after 7pm.</p>

<h2>3. Taman Sentosa Night Market</h2>
<p><strong>Distance from Pelangi Capsule:</strong> 10-minute Grab ride</p>
<p>This is JB's most famous pasar malam, running on Thursday and Sunday evenings. The market stretches for hundreds of metres with stalls selling everything from satay sticks (RM0.60 each) to ramly burgers (RM5–8), martabak (stuffed pancake), grilled corn, fresh sugarcane juice, and lok-lok (choose-your-own skewers boiled or fried at the stall). Budget RM15–25 for a full dinner and dessert. Arrive by 7pm for the full experience.</p>

<h2>4. Selera Senibong Seafood (Kampung Senibong)</h2>
<p><strong>Distance from Pelangi Capsule:</strong> 15-minute Grab ride</p>
<p>For a more local experience, this waterfront seafood hawker area in Kampung Senibong is where Johorean families go on weekends. Multiple stalls line the waterfront, each with their own speciality — grilled stingray, chilli crab, butter prawns, fried squid. Point, order, and eat at plastic tables overlooking the water. Seafood here is fresher and cheaper than the city-centre restaurants. Budget RM25–40 per person for a seafood feast.</p>

<h2>5. Pasar Karat Morning Market (Jalan Wong Ah Fook)</h2>
<p><strong>Distance from Pelangi Capsule:</strong> 10-minute Grab ride</p>
<p>Best known as a flea market, Pasar Karat also has an excellent food section on Sunday mornings. Stalls sell <strong>kuih</strong> (bite-sized Malay cakes, RM0.50–1 each), <strong>nasi lemak</strong> wrapped in banana leaf (RM3–5), <strong>apam balik</strong> (crispy peanut pancake), and hot <strong>teh tarik</strong>. It's the most atmospheric place to eat breakfast in JB — surrounded by antique vendors, old men trading stories, and the smell of charcoal smoke.</p>

<h2>6. Restoran Hua Mui (Jalan Trus)</h2>
<p><strong>Distance from Pelangi Capsule:</strong> 10-minute Grab ride</p>
<p>A Hainanese kopitiam (coffee shop) that's been running since the 1940s. The star is their <strong>Hainanese chicken chop</strong> — a breaded, pan-fried chicken cutlet served with green peas, fries, and a brown gravy that tastes like your grandmother made it (if your grandmother was Hainanese). It's a JB institution. The kopi (traditional coffee) is also excellent. Budget RM12–18 per person.</p>

<h2>What to Order: Hawker Centre Cheat Sheet</h2>
<p>If you're overwhelmed by choice, start with these JB essentials:</p>
<ul>
  <li><strong>Laksa Johor</strong> — Fish curry with spaghetti noodles. Unique to Johor.</li>
  <li><strong>Mee Rebus</strong> — Yellow noodles in sweet potato gravy. A Johorean classic.</li>
  <li><strong>Roti Canai</strong> — Flaky flatbread with curry. Available at any mamak, any time.</li>
  <li><strong>Char Kway Teow</strong> — Smoky wok-fried flat noodles with cockles and Chinese sausage.</li>
  <li><strong>Nasi Lemak</strong> — Coconut rice with sambal. The national breakfast.</li>
  <li><strong>Otak-Otak</strong> — Grilled spiced fish in banana leaf. RM1–2 per piece.</li>
  <li><strong>Teh Tarik</strong> — Pulled milk tea. Watch the pour, drink the froth.</li>
</ul>

<p>For more local tips on navigating JB's food scene and the best walking routes from the hostel, check our <a href="/guide">JB Backpacker's Guide</a>. Hungry yet? <a href="/book">Book your stay at Pelangi Capsule</a> and start eating.</p>
`,
		},
		// 5
		{
			Slug:          "johor-bahru-vs-singapore-why-travellers-base-in-jb",
			LastModified:  "2026-06-26",
			ImageAlt:      "Johor Bahru city across the strait from Singapore, illustrating why budget travellers base in JB",
			Title:         "Johor Bahru vs Singapore: Why Savvy Travellers Base Themselves in JB",
			Excerpt:       "Singapore is spectacular — but staying there drains your budget fast. Smart backpackers stay in JB and day-trip into Singapore. Here's why it works.",
			Date:          "2026-03-08",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "singapore", "budget-travel", "backpacker", "malaysia", "comparison"},
			FeaturedImage: "/images/blog/jb-vs-singapore.webp",
			Content: `
<h2>The Backpacker's Dilemma</h2>
<p>Singapore is one of the most expensive cities in Asia. A hostel bed costs SGD40–60 per night. A hawker meal — the cheapest eating option — runs SGD5–8. A single day in Singapore can easily cost SGD100–150 including transport, food, and one or two attractions. For backpackers on a Southeast Asian circuit, three nights in Singapore can consume a week's budget for Thailand or Vietnam.</p>

<p>Johor Bahru is 30 minutes across the Causeway, and the cost difference is staggering. The same daily budget that barely covers a Singapore hostel bed and two meals gets you a private capsule, three full meals, transport, and evening snacks in JB. Increasingly, savvy travellers are figuring out the strategy: base yourself in JB, day-trip into Singapore for the highlights, and keep your budget intact.</p>

<h2>The Numbers: Side by Side</h2>
<p>Here's what the same trip looks like from each city:</p>
<table>
  <thead>
    <tr><th>Expense</th><th>Singapore (SGD)</th><th>JB (RM / SGD equivalent)</th></tr>
  </thead>
  <tbody>
    <tr><td>Hostel per night</td><td>SGD 45–60</td><td>RM 30–50 (SGD 9–15)</td></tr>
    <tr><td>Breakfast</td><td>SGD 5–8</td><td>RM 3–5 (SGD 1–1.50)</td></tr>
    <tr><td>Lunch</td><td>SGD 6–10</td><td>RM 6–12 (SGD 2–4)</td></tr>
    <tr><td>Dinner</td><td>SGD 8–15</td><td>RM 10–25 (SGD 3–8)</td></tr>
    <tr><td>Local transport</td><td>SGD 8–15</td><td>RM 8–15 (SGD 3–5)</td></tr>
    <tr><td>Daily total</td><td>SGD 80–120</td><td>RM 70–110 (SGD 20–35)</td></tr>
  </tbody>
</table>
<p>Over a typical five-night stay, the difference is SGD300–450 saved. That's an extra week in Bali, three days in Bangkok, or a domestic flight in Malaysia.</p>

<h2>But Won't I Waste Time Commuting?</h2>
<p>This is the most common objection — and it doesn't hold up. The Causeway Link bus from JB CIQ to Woodlands costs RM3–5 (SGD1–1.50) and takes 30–60 minutes door to door on a normal day. That's comparable to commuting from one side of Singapore to the other on the MRT. If you time your crossing to avoid peak hours (weekdays before 8am or after 10am), the process is smooth.</p>

<p>The key is planning: do Singapore in one or two focused day trips rather than commuting daily. Spend your other days exploring JB itself — which has more than enough to fill several days of its own.</p>

<h2>What JB Offers That Singapore Doesn't</h2>
<p>JB isn't just a cheap alternative — it has its own identity and attractions that Singapore can't match:</p>
<ul>
  <li><strong>Authentic hawker food culture:</strong> JB's hawker centres are untouristy, family-run, and serve dishes unique to Johor — Laksa Johor, Mee Rebus, and Otak-Otak that you won't find this good anywhere else.</li>
  <li><strong>Night markets:</strong> Singapore's night markets are curated events. JB's pasar malam are the real thing — loud, messy, delicious, and deeply local.</li>
  <li><strong>Heritage streets:</strong> Jalan Tan Hiok Nee's pre-war shophouses and street art feel unpolished and genuine in a way that Singapore's preserved districts don't.</li>
  <li><strong>Space and pace:</strong> Singapore is dense and fast. JB moves at a neighbourhood rhythm — slower, friendlier, and more human-scaled.</li>
  <li><strong>Malaysian kampung life:</strong> Walk fifteen minutes from the city centre and you're in traditional Malay villages with wooden houses, community mosques, and an entirely different pace of life.</li>
</ul>

<p>Read our full <a href="/guide">JB Backpacker's Guide</a> for detailed neighbourhood recommendations and daily itineraries.</p>

<h2>The Ideal Itinerary</h2>
<p>For a five-night trip combining both cities, here's what works:</p>
<ol>
  <li><strong>Night 1–2:</strong> Explore JB — Jalan Tan Hiok Nee, Glass Temple, night market, hawker centres</li>
  <li><strong>Night 3:</strong> Singapore day trip — Gardens by the Bay, Marina Bay, Chinatown, hawker dinner</li>
  <li><strong>Night 4:</strong> JB hidden gems — Danga Bay sunset, Pasar Karat, café hopping, seafood dinner</li>
  <li><strong>Night 5:</strong> Optional second Singapore day trip or relaxed JB farewell day</li>
</ol>
<p>You see Singapore's highlights, experience authentic Malaysia, and spend less than you would on three nights in a Singapore hostel alone.</p>

<h2>Where to Stay in JB</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi is purpose-built for this strategy. Japanese-style capsule pods from RM35/night, free WiFi, hot showers, lockers, and a shared kitchen. The hostel sits in one of JB's best food neighbourhoods, a 10-minute Grab ride from the Causeway checkpoint.</p>

<p>The math is simple: stay in JB, day-trip to Singapore, and keep your budget for the rest of Southeast Asia. <a href="/book">Book your capsule now</a> and start planning the smartest trip in the region.</p>
`,
		},
		// 6
		{
			Slug:          "hidden-gems-johor-bahru-beyond-tourist-spots",
			Title:         "Hidden Gems in Johor Bahru: Beyond the Usual Tourist Spots",
			Excerpt:       "Skip the malls and tourist traps. These are the places JB locals love — from secret waterfalls to forgotten heritage streets and underground food spots.",
			Date:          "2026-03-10",
			Category:      "Local Life",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "hidden-gems", "local-life", "backpacker", "malaysia", "off-the-beaten-path"},
			FeaturedImage: "/images/blog/jb-hidden-gems.webp",
			Content: `
<h2>The JB That Tourists Miss</h2>
<p>Most visitors to Johor Bahru follow the same script: cross from Singapore, shop at City Square, eat at a hawker centre, go home. They miss the city entirely. JB is a layered place — Malay, Chinese, Indian, and Peranakan cultures have been trading, cooking, and building here for over a century, and the results are tucked into back streets, heritage districts, and neighbourhoods that rarely make the guidebooks.</p>

<p>These are the places locals go. If you're staying at <a href="/rooms">Pelangi Capsule Hostel</a> and want to experience the real JB, this is your list.</p>

<h2>1. Jalan Dhoby: The Forgotten Heritage Lane</h2>
<p>While everyone crowds Jalan Tan Hiok Nee, the parallel <strong>Jalan Dhoby</strong> (formerly Dhoby Street, named after the Indian laundry workers who once operated here) remains overlooked. Pre-war shophouses line both sides, some beautifully restored as galleries and co-working spaces, others still in their original crumbling state. The street tells the story of JB's Indian and Chinese merchant communities, and you can walk it in ten minutes without encountering another tourist. Look for the hand-painted trade signs above old shopfronts — they're disappearing fast.</p>

<h2>2. Kampung Melayu Heritage Walk</h2>
<p>Behind the modern city centre, <strong>Kampung Melayu</strong> (Malay Village) preserves traditional wooden houses on stilts, community suraus (small mosques), and a pace of life that hasn't changed in decades. The streets are narrow, shaded by rambutan and mango trees, and the sound of roosters competes with the call to prayer. This isn't a tourist attraction — it's a living neighbourhood. Walk respectfully, smile at residents, and you'll be welcomed warmly. Some of the best home-cooked kuih (Malay cakes) are sold from front porches here.</p>

<h2>3. Gunung Pulai Waterfalls</h2>
<p>Thirty minutes north of the city centre, <strong>Gunung Pulai Recreation Forest</strong> is where JB residents go to escape the heat. A paved trail leads through lowland dipterocarp forest to a series of waterfalls with natural swimming pools. Entry costs RM1. The forest is home to monkeys, hornbills, and butterflies, and the temperature drops noticeably under the canopy. Pack a towel, bring water, and go on a weekday for solitude. Grab ride from Taman Pelangi costs RM25–35 each way.</p>

<h2>4. Tanjung Piai: Mainland Asia's Southernmost Point</h2>
<p>This one requires a half-day trip, but it's worth it for bragging rights alone. <strong>Tanjung Piai National Park</strong>, about 90 minutes from JB, is the southernmost tip of continental Asia — further south than Singapore. A boardwalk trail winds through mangrove forest to a stone marker at the point. The park is home to mudskippers, fiddler crabs, and migratory birds. Entry is RM5 for foreigners. It's beautifully quiet and wildly undervisited.</p>

<h2>5. Jalan Ngee Heng: Street Art Alley</h2>
<p>Everyone knows the murals on Jalan Tan Hiok Nee, but the more interesting street art is on <strong>Jalan Ngee Heng</strong> and the surrounding alleyways. Local artists have painted large-scale murals depicting JB's history — from its founding as a fishing village to its role as a centre of the Chinese secret societies in the 19th century. The art is grittier and more narrative than the tourist-friendly murals elsewhere. Ask at the hostel for the latest additions — new pieces appear regularly.</p>

<h2>6. Kedai Kopi (Coffee Shops) of Stulang</h2>
<p>The <strong>Stulang</strong> neighbourhood is home to some of JB's oldest kedai kopi — traditional Chinese-Malaysian coffee shops where kopi (thick, sweet coffee made with margarine-roasted beans) has been brewed the same way for fifty years. The atmosphere is everything: marble-top tables, ceiling fans, old uncles reading Chinese newspapers, and the clink of ceramic cups. Try kopi-o (black) or kopi-C (with evaporated milk). Pair it with kaya toast — coconut jam on charcoal-grilled bread. A full breakfast costs RM5.</p>

<h2>7. Lido Beach (Pantai Lido)</h2>
<p>JB has a beach — and almost nobody goes to it. <strong>Pantai Lido</strong>, a small strip of sand along the Straits of Johor near Danga Bay, is where locals come to fish, fly kites, and watch the sunset. It's not a postcard beach — no white sand or crystal water — but the views of Singapore's skyline at dusk are remarkable, and on weekday evenings you might have the whole stretch to yourself. There's a small food court nearby for RM5 drinks and satay.</p>

<h2>8. Pelangi Night Walk</h2>
<p>Finally, one of JB's best hidden experiences requires no transport at all. Taman Pelangi — the neighbourhood where our hostel sits — transforms after dark. The shophouse restaurants switch on their neon signs, the mamaks fill up with night owls, and the side streets take on a warm, lived-in glow. Walk the residential lanes behind Jalan Serampang and you'll see families eating dinner on their porches, children cycling, and the rhythms of kampung life transplanted into the suburban grid. It's quintessentially Malaysian and completely free.</p>

<p>For more ideas on what to see and do in JB, check our comprehensive <a href="/guide">JB Backpacker's Guide</a>. Ready to explore the real Johor Bahru? <a href="/book">Book a capsule at Pelangi</a> and start discovering what the guidebooks won't tell you.</p>
`,
		},
		// 7
		{
			Slug:          "how-malaysians-find-jobs-singapore-2026",
			Title:         "How Malaysians Can Find Jobs in Singapore (2026 Guide)",
			Excerpt:       "Step-by-step guide for Malaysian job seekers: job portals, work passes, salary expectations, and interview tips for landing a Singapore role.",
			Date:          "2026-04-14",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "10 min read",
			Tags:          []string{"singapore", "jobs", "career", "work-pass", "malaysia", "job-search"},
			FeaturedImage: "/images/blog/singapore-jobs-guide.webp",
			Content: `
<h2>Why Malaysians Move to Singapore</h2>
<p>Singapore attracts Malaysian professionals seeking higher salaries. A RM6,000 earner might earn SGD6,500 (RM24,000)—a massive jump. The economy, institutions, and international companies create opportunities unavailable in Malaysia. Securing a role requires strategy, timing, and understanding visa rules.</p>

<h2>Understanding Singapore Work Passes</h2>
<p>Singapore issues three main work passes for foreigners. <strong>Employment Pass (EP)</strong> is for professionals and managers earning SGD5,000+ monthly with recognised qualifications. <strong>S Pass</strong> targets skilled workers earning SGD3,150–4,999 with technical expertise or credentials or certifications. <strong>Work Permit</strong> is for semi-skilled and unskilled workers in manufacturing, construction, and service sectors.</p>
<p>Your employer must sponsor your visa—you cannot apply independently. After job offer, your sponsor submits the application to MOM (Ministry of Manpower). Processing takes 2–4 weeks. Once approved, you have 30 days to enter Singapore. Total timeline from application to starting work: typically 4–6 weeks. Plan accordingly. Most Malaysians aim for EP or S Pass.</p>

<h2>Step 1: Choose the Right Job Portals</h2>
<p>Don't apply blindly everywhere. Malaysians have five proven platforms. Set your LinkedIn profile to indicate visa sponsorship required—recruiters filter by this. Update your profile with your Malaysian location but indicate "open to relocation to Singapore." Many recruiters search specifically for Malaysian talent.</p>
<ol>
<li><strong>LinkedIn Singapore:</strong> Filter by location Singapore, set visa sponsorship required. Recruiters actively headhunt here. Direct applications bypass gatekeeping. Tailor each cover note mentioning your interest in Singapore and timeline.</li>
<li><strong>JobStreet Singapore:</strong> Malaysia's dominant job portal dominates Singapore too. Search "Work Visa Sponsorship: Yes" for 5,000+ roles monthly. Save job alerts; new roles appear daily.</li>
<li><strong>MyCareersFuture:</strong> Singapore's official government-backed portal with 20,000+ live listings. Updated daily, zero spam, zero recruiter nonsense. Most reputable employers post here first.</li>
<li><strong>Glassdoor Singapore:</strong> Research company culture, salaries, interview experiences, and manager reviews before applying. Read Malaysian employee reviews specifically—they often describe visa sponsorship processes.</li>
<li><strong>Angel List &amp; TechJobs:</strong> Startups offer better relocation packages and visa certainty than traditional corporates. Smaller companies move faster on hiring too.</li>
</ol>

<h2>Step 2: Engage Recruitment Agencies</h2>
<p>Agencies fast-track Malaysia-to-Singapore placements and negotiate salaries. Legitimate agencies never charge you—employer pays commission. Top names: <strong>Michael Page Singapore, Randstad, PageGroup, Morgan McKinley</strong>. Ask: "How many Malaysians placed in 12 months?" and "What's your visa timeline?" They handle housing, transportation, visa coordination. A good recruiter saves you RM2,000–5,000 in salary gains. Avoid upfront-fee agencies—they're scams.</p>

<h2>Step 3: Know Salary Reality</h2>
<p><strong>Entry-level (0–2yrs):</strong> SGD3,500–4,500 monthly. <strong>Mid-career (2–5yrs):</strong> SGD5,500–8,500. <strong>Senior (5+yrs):</strong> SGD12,000–20,000+. Living costs: rent SGD1,000–1,500 for shared HDB flats, transport SGD150/month, food SGD500–800. Net savings: SGD2,000–6,000/month after expenses. Always negotiate before accepting—Singapore expects it. Lowball offers set your ceiling for years. Most employers offer SGD500–800 housing allowance. Ask explicitly. Your first Singapore salary is foundational.</p>

<h2>Step 4: Master Interview Execution</h2>
<p>Singapore interviews follow a 2–3 round structure: HR screening (30 min), technical assessment (60–90 min), senior manager interview (45 min). Dress business formal. Arrive 10 minutes early. Research the company's Singapore operations, not just global operations.</p>
<p>Address visa sponsorship proactively: "I understand Singapore's visa timelines and can support documentation immediately." This signals professionalism and reduces employer hesitation. Technical interviews are rigorous—prepare live coding, case studies, or design problems. Practice mock interviews with colleagues. Anticipate salary questions and have your range ready. Singapore candidates expect you to negotiate—silence signals weakness.</p>

<h2>Step 5: Get Your Timeline Right</h2>
<p>Apply 8–12 weeks before your ideal start date. Visa processing is 2–4 weeks post-offer. Your Malaysian employer requires 30 days notice. Timeline: Apply week 1 → Interviews weeks 2–4 → Offer week 4–5 → Give notice week 5 → Visa processing weeks 5–9 → Start Singapore week 12. This buffer prevents conflicts. Some companies are slower; international tech firms move fastest (2–3 week hiring cycles). Local firms take 6–8 weeks. Ask recruiters for their average hiring timeline.</p>

<h2>Accommodation Strategy</h2>
<p>HDB flats (Housing Development Board—Singapore's public housing) are your best value: SGD1,000–1,500/month for a shared room. Private condominiums cost SGD1,800–3,000. For your first month, use <strong>HeyStay, Airbnb, PropertyGuru</strong> while apartment hunting. Once hired, contact your company's HR for corporate housing programs—many large employers have partner blocks with discounts.</p>
<p>If job-hunting while based in Malaysia, <a href="/rooms">stay at Pelangi Capsule in Johor Bahru</a>—just 20 minutes from the Causeway—at RM50–80 per night. You can interview in Singapore daily while keeping accommodation costs low.</p>

<h2>Optimize Application Materials</h2>
<p>Highlight transferable skills: leadership, languages, cross-cultural experience. Singapore values multilingual candidates. Tailor cover letters—mention Singapore specifically, not generic templates. LinkedIn is your digital resume. Get recommendations. Set headline to "Role Title | Open to Singapore Relocation". Emphasize any English, Mandarin, or Tamil skills—multinational firms value them.</p>

<h2>Common Mistakes Malaysian Job Seekers Make</h2>
<ul>
<li>Applying to roles requiring 3+ years experience when you have 1.5. Auto-rejection before visa sponsorship is even considered.</li>
<li>Falsifying qualifications or experience. Singapore employers verify credentials rigorously with universities and past employers. Visa rejection follows immediately.</li>
<li>Ignoring Glassdoor reviews. Visa sponsorship doesn't guarantee a healthy workplace. Bad companies exist everywhere.</li>
<li>Renegotiating salary after receiving a verbal offer. Once visa processing initiates, you've lost all leverage. Lock salary before saying yes.</li>
<li>Ignoring relocation costs. Factor SGD2,000–3,000 for deposits, airfare, and setup. Some sponsors offer relocation allowances—ask.</li>
</ul>

<h2>Resources &amp; Support</h2>
<p><strong>Ministry of Manpower (MOM):</strong> mom.gov.sg—official visa requirements, forms, processing status. Read Employment Pass and S Pass guides thoroughly. <strong>Expats in Singapore communities:</strong> Reddit's r/singapore and Facebook groups have active Malaysians answering relocation questions daily.</p>

<h2>Making Your Move</h2>
<p>Cross-border job hunting is achievable with clear strategy. Start applications 10 weeks ahead. Use LinkedIn and MyCareersFuture daily. Engage reputable agencies. Understand visa timelines and requirements. The salary premium is substantial—expect 3–5x growth. The process is bureaucratic but predictable. Many Malaysians hesitate due to visa complexity; educated candidates succeed. Move intentionally, and you'll cross the Causeway as a prepared professional ready to thrive in Singapore's economy.</p>
`,
		},
		// 8
		{
			Slug:          "singapore-work-pass-guide-malaysians",
			Title:         "Singapore Work Pass Guide for Malaysians: EP vs S Pass vs Work Permit",
			Excerpt:       "Understand the three main Singapore work pass types for Malaysians: Employment Pass, S Pass, and Work Permit. Compare salary minimums, eligibility, and which visa suits your career stage.",
			Date:          "2026-04-14",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "12 min read",
			Tags:          []string{"singapore", "work-pass", "career", "expat", "malaysia", "employment-pass", "visa"},
			FeaturedImage: "/images/blog/singapore-work-pass-guide.webp",
			Content: `
<h2>Singapore's Work Visa System Explained</h2>
<p>Malaysia is Singapore's top source of migrant workers, accounting for 30% of foreign labour. The Ministry of Manpower (MOM) manages work passes under three main categories: Employment Pass (EP), S Pass, and Work Permit. Each serves a different skill level and salary band. Understanding which pass you qualify for is critical before job hunting.</p>

<h2>Quick Comparison: EP vs S Pass vs Work Permit</h2>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; margin:16px 0; border-collapse:collapse;">
<tr style="background:#f5f5f5;">
<th><strong>Feature</strong></th>
<th><strong>Employment Pass (EP)</strong></th>
<th><strong>S Pass</strong></th>
<th><strong>Work Permit</strong></th>
</tr>
<tr>
<td><strong>Minimum Salary</strong></td>
<td>SGD 5,000/month</td>
<td>SGD 3,150/month</td>
<td>No fixed minimum</td>
</tr>
<tr>
<td><strong>Target Profile</strong></td>
<td>Degree-holders, senior roles</td>
<td>Diploma or 5yrs experience</td>
<td>Semi-skilled, unskilled labour</td>
</tr>
<tr>
<td><strong>Processing Time</strong></td>
<td>1-4 weeks</td>
<td>2-8 weeks</td>
<td>1-2 weeks</td>
</tr>
<tr>
<td><strong>Validity</strong></td>
<td>Up to 3 years</td>
<td>Up to 2 years</td>
<td>Up to 2 years</td>
</tr>
<tr>
<td><strong>Family Dependents</strong></td>
<td>Yes (spouse + kids)</td>
<td>Limited (with approval)</td>
<td>No</td>
</tr>
<tr>
<td><strong>Sector Restrictions</strong></td>
<td>All sectors</td>
<td>Most sectors (some restricted)</td>
<td>Only specified sectors</td>
</tr>
</table>

<h2>Employment Pass (EP): For Professionals</h2>
<p><strong>Who qualifies:</strong> Degree-holders, managers, specialists. Minimum salary SGD5,000/month. No work experience requirement, but higher salary expectation if experienced.</p>
<p><strong>Employer responsibilities:</strong> Employer files with MOM using standard form. They bear sponsorship costs (typically SGD500–1,500). Processing takes 1–4 weeks. No quota limits; approved applications are processed first-in-first-out.</p>
<p><strong>Best for:</strong> Fresh graduates from prestigious universities, tech professionals, finance roles, engineering, and management positions. If you have a degree, aim for EP—it's the most stable and flexible pass.</p>

<h2>S Pass: The Middle Ground</h2>
<p><strong>Who qualifies:</strong> Diploma holders or those with 5+ years relevant work experience. Minimum salary SGD3,150/month. Evaluated on skill level, proven experience, and salary competitiveness.</p>
<p><strong>Processing:</strong> 2–8 weeks, slower than EP because MOM evaluates local job market impact. There are annual quotas; applications processed when quota available. This pass is popular with mid-career Malaysians.</p>
<p><strong>Best for:</strong> Technicians, supervisors, mid-level specialists without university degrees. If you have strong experience but no degree, S Pass is realistic and widely available.</p>

<h2>Work Permit: For Specific Sectors</h2>
<p><strong>Who qualifies:</strong> Semi-skilled and unskilled workers in approved sectors: construction, marine, food, healthcare, domestic work. No degree required; employers must show they cannot fill role locally.</p>
<p><strong>Restrictions:</strong> Highly sector-specific. Work Permits are not portable across employers. Processing is fastest (1–2 weeks) but quotas vary by sector and are tightly managed.</p>
<p><strong>Best for:</strong> Hospitality workers, construction labourers, healthcare aides, cleaners. If you lack formal qualifications, Work Permit is the entry point.</p>

<h2>FAQ: Your Singapore Work Pass Questions Answered</h2>

<h3>Q: I have a diploma but 8 years experience. Can I get an EP?</h3>
<p><strong>A:</strong> Unlikely. MOM policy requires degree for EP unless you're a rare specialist (e.g., executive chef with global recognition). With 8 years experience, your S Pass is stronger. Some borderline cases where MOM approves EP anyway—always try, worst case is rejection. Your employer can reapply as S Pass.</p>

<h3>Q: What salary should I negotiate for?</h3>
<p><strong>A:</strong> EP minimum is SGD5,000; most employers offer SGD5,500–8,000 for mid-career (3–5 years). S Pass starts at SGD3,150 but realistic offers are SGD3,800–5,500. Never go below the MOM minimum—visa will be rejected. Always negotiate above minimum; accepting SGD5,000 EP sets your ceiling for 3 years until next renewal.</p>

<h3>Q: Can I bring my family on a Work Permit?</h3>
<p><strong>A:</strong> No. Work Permits are non-family passes. EP allows spouse + dependent children (usually up to age 22). S Pass dependents require separate approval, rarely granted. If family is priority, aim for EP. If you're Work Permit, your family stays in Malaysia.</p>

<h3>Q: How long does visa processing actually take?</h3>
<p><strong>A:</strong> MOM publishes "1–4 weeks" for EP but reality varies. Straightforward cases (degree verified, salary clear, employer reputable) process in 7–10 days. Complicated cases (foreign degree, education verification delays, conflicting documents) take 3–4 weeks. S Pass slower: 2–8 weeks. Always assume 4 weeks and plan accordingly. Ask your employer's HR for their average—top companies have precedent and process faster.</p>

<h3>Q: Can I change jobs mid-pass?</h3>
<p><strong>A:</strong> EP: Yes, new employer files for transfer. Salary can drop but not below MOM minimum. Entire transfer takes 1–2 weeks. S Pass: Yes, with same restrictions. Work Permit: No—strictly employer-locked. Changing jobs on Work Permit requires new application, often rejected if different sector.</p>

<h2>Red Flags to Avoid</h2>
<ul>
<li><strong>Underpaying offers:</strong> "We'll sponsor at SGD3,500 for EP." Reject immediately—MOM will reject it anyway, wasting 3 weeks.</li>
<li><strong>Vague timelines:</strong> "Processing usually takes 2 weeks." Push back—get written commitment on timeline.</li>
<li><strong>Company never sponsored Malaysians:</strong> High rejection risk. Ask HR for past sponsorship success rate. First-time sponsors have slower processing.</li>
</ul>

<h2>Your Next Move</h2>
<p>Identify your profile (degree? experience? target salary?) and apply strategically. EP is fastest and most flexible; push for it if degree-eligible. S Pass is realistic for experienced non-graduates. Start applications 12 weeks before desired start date. The Singapore salary premium (3–5x your Malaysia salary) justifies the bureaucracy. Move intentionally, understand your visa category, and cross the Causeway ready to thrive.</p>
`,
		},
		// 9
		{
			Slug:          "jb-singapore-commuter-guide-2026",
			Title:         "Living in Johor Bahru, Working in Singapore: The Commuter's Guide 2026",
			Excerpt:       "Cross the Causeway daily and save money. Everything Malaysians need to know about commuting from JB to Singapore: bus options, CIQ crossings, costs, and why it works.",
			Date:          "2026-04-14",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "singapore", "commuter", "work", "malaysia", "cross-border", "cost-of-living"},
			FeaturedImage: "/images/blog/jb-singapore-commuter.webp",
			Content: `
<h2>The Commuter Advantage</h2>
<p>Thousands of Malaysians cross the Causeway every weekday. The math is simple: Singapore salary (SGD4,000–8,000/month), Johor Bahru living costs (roughly RM2,500–3,500/month for rent, food, and transport). The gap between what you earn and what you spend is larger than almost any arrangement possible in either country alone. For someone on a <a href="singapore-work-pass-guide-malaysians">SGD5,000 Employment Pass</a>, living in JB typically means saving SGD2,000–3,000 every month.</p>
<p>This guide covers bus options, how the CIQ checkpoints work, realistic monthly budgets, and how to avoid the common time-wasters. There's also a section on short-term accommodation while you sort out longer-term housing.</p>

<h2>Getting Across: Your Bus Options</h2>
<p>Five daily shuttle services cross the Causeway. Most commuters use two: <strong>Causeway Link</strong> and <strong>SBS Transit</strong>. Both operate modern, air-conditioned coaches with WiFi.</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; margin:16px 0; border-collapse:collapse;">
<tr style="background:#f5f5f5;">
<th><strong>Service</strong></th>
<th><strong>Route</strong></th>
<th><strong>Price (single)</strong></th>
<th><strong>Duration</strong></th>
<th><strong>Frequency</strong></th>
</tr>
<tr>
<td><strong>Causeway Link (CW)</strong></td>
<td>JB Sentral → Singapore (multiple endpoints)</td>
<td>RM5–6 / SGD2–2.50</td>
<td>40–60 min</td>
<td>Every 5–15 min</td>
</tr>
<tr>
<td><strong>SBS Transit</strong></td>
<td>Larkin Sentral → Singapore</td>
<td>RM3–4 / SGD1.50</td>
<td>45–75 min</td>
<td>Every 10–20 min</td>
</tr>
<tr>
<td><strong>Sunrays Express</strong></td>
<td>JB CIQ → Woodlands</td>
<td>RM5 / SGD2</td>
<td>50–70 min</td>
<td>Hourly</td>
</tr>
<tr>
<td><strong>Premium (Intercity)</strong></td>
<td>JB → Singapore downtown</td>
<td>RM8–12 / SGD4–5</td>
<td>35–50 min</td>
<td>Hourly</td>
</tr>
<tr>
<td><strong>Personal vehicle</strong></td>
<td>Johor Bahru → Singapore (own car)</td>
<td>RM30–50 (toll + petrol)</td>
<td>30–45 min</td>
<td>Own schedule</td>
</tr>
</table>
<p><strong>Pro tip:</strong> Causeway Link and SBS are cheapest and most frequent. Buy monthly passes for RM60–80 (saves 20% vs daily tickets). Causeway Link passes sold at JB Sentral; SBS through their Larkin Sentral office.</p>

<h2>The CIQ Process: What to Expect</h2>
<p>CIQ stands for Customs, Immigration, Quarantine. You clear Malaysia's exit checkpoint, then Singapore's entry. On buses, everyone steps off, queues through their respective counters, and re-boards. The whole thing takes 20–40 minutes depending on how busy the checkpoint is.</p>
<p>Keep your passport and work pass accessible — not buried in your bag. Officers rarely stop regular commuters; the questions are standard ("Where do you work?" "How long have you been commuting?"). After a few weeks it becomes muscle memory.</p>
<p>The queue times vary significantly by hour. Before 7:30am and after 6pm are the most congested. If your work schedule has any flexibility, crossing mid-morning (9–11am) or mid-afternoon (2–4pm) can save 30 minutes each way — that's five hours a week compounded.</p>

<h2>Monthly Budget: JB Living, Singapore Salary</h2>
<p>Here's a realistic monthly breakdown for a single commuter earning SGD5,500/month (typical Employment Pass salary):</p>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; margin:16px 0; border-collapse:collapse;">
<tr style="background:#f5f5f5;">
<th><strong>Expense</strong></th>
<th><strong>Amount (SGD)</strong></th>
<th><strong>Amount (RM)</strong></th>
<th><strong>Notes</strong></th>
</tr>
<tr>
<td><strong>Rent (shared HDB, JB)</strong></td>
<td>SGD400–600</td>
<td>RM1,200–1,800</td>
<td>Budget shared room or low-cost private flat in Taman Pelangi area</td>
</tr>
<tr>
<td><strong>Transport (bus + local)</strong></td>
<td>SGD80–120</td>
<td>RM240–360</td>
<td>Monthly Causeway Link + local JB transport</td>
</tr>
<tr>
<td><strong>Food (breakfast + lunch + dinner)</strong></td>
<td>SGD250–350</td>
<td>RM750–1,050</td>
<td>Mix of hawker (RM5–8) and occasional restaurants</td>
</tr>
<tr>
<td><strong>Utilities (electric, water, WiFi)</strong></td>
<td>SGD40–60</td>
<td>RM120–180</td>
<td>Shared utilities in rented unit</td>
</tr>
<tr>
<td><strong>Phone + mobile data</strong></td>
<td>SGD15–25</td>
<td>RM45–75</td>
<td>Digi or Maxis unlimited plan</td>
</tr>
<tr>
<td><strong>Sundries (laundry, toiletries, misc)</strong></td>
<td>SGD50–80</td>
<td>RM150–240</td>
<td>Varies by lifestyle</td>
</tr>
<tr style="background:#f5f5f5;"><td><strong>TOTAL MONTHLY</strong></td><td><strong>SGD835–1,235</strong></td><td><strong>RM2,505–3,705</strong></td><td><strong>Leaves SGD4,265–4,665 savings monthly</strong></td>
</tr>
</table>
<p>At this spending level, a SGD5,500 earner saves <strong>SGD50,000–56,000 annually</strong>. That funds a down payment, business startup, or career transition. Living in JB while earning Singapore salary is genuinely wealth-building.</p>

<h2>Tips for Smooth Commuting</h2>
<ul>
<li><strong>Build in 15 minutes buffer.</strong> Delays happen — not every day, but often enough. Being late once or twice sets a bad tone early.</li>
<li><strong>Get the Causeway Link app.</strong> Real-time bus tracking, seat booking, and monthly pass management on iOS and Android. Saves time standing at the terminal.</li>
<li><strong>Join commuter Facebook groups.</strong> "JB to Singapore Commuters" has thousands of members sharing live traffic updates, carpool arrangements, and tips that don't appear in any guide.</li>
<li><strong>Keep your passport accessible.</strong> A small document pouch worn on your belt or tucked in a front pocket means you're through immigration faster than people digging through bags.</li>
<li><strong>Use the crossing time well.</strong> It's roughly 45 minutes each way. Commuters who read, listen to podcasts, or sleep during the trip find it much more tolerable than those who just stare at their phones.</li>
</ul>

<h2>Where to Stay When You First Arrive</h2>
<p>For the first 1–3 months while you find a longer-term place, <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi works well as a base. Japanese-style capsule pods from RM35–50/night, hot showers, lockers, and fast WiFi. The neighbourhood has hawker centres, banks, and transport options nearby. It's also where a lot of other commuters and new arrivals stay, which is useful if you're navigating this for the first time.</p>

<h2>Finding Longer-Term Housing</h2>
<p>Once your work pass is sorted, switch to a 12-month lease. Target neighbourhoods near JB Sentral and the Causeway: Taman Pelangi, Danga Bay, and Larkin are all reasonable. One-bedroom private flats in these areas run RM800–1,500/month. <a href="/getting-here">Getting to Pelangi from the Causeway</a> takes 10–15 minutes by Grab, so it's a decent indicator of transport connections for any flat you're considering in the same area.</p>

<h2>Is It Worth It?</h2>
<p>Daily commuting isn't glamorous. The Causeway is a routine, not an adventure. But most commuters settle into the rhythm within two weeks, and the financial upside — SGD50,000+ in savings annually at a mid-level salary — is hard to argue with. Weather delays are rare, roadwork is predictable, and the bus runs reliably. The 1.5-hour daily round trip is the trade. Most people find it's worth it.</p>

<h2>Make Pelangi Your Commuter Base</h2>
<p>Hundreds of cross-border commuters have used <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi as their first JB base — capsule pods are <strong>RM30/night on weekdays (RM35 weekends)</strong>, or <strong>from RM600/month</strong> (Upper Deck) / <strong>RM650/month</strong> (Lower Deck) for long-stayers, with no deposit and no minimum tenancy. Private rooms are also available from <strong>RM500/month</strong>, right above the 7-Eleven on Jalan Perang. Fast WiFi, lockers, hot showers, 24/7 self check-in for pre-dawn Causeway crossings, and the CIQ checkpoint is 10–15 minutes away.</p>
<p><a href="/book">Book a pod</a>, or compare the numbers first: the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">honest maths of RM600/month capsule living</a> and the <a href="/blog/room-for-rent-taman-pelangi-jb-rm500-month">RM500/month private room guide</a>.</p>
`,
		},
		// 10
		{
			Slug:          "gig-jobs-malaysia-waiting-singapore-work-pass",
			Title:         "5 Gig Jobs for Malaysians Waiting for Singapore Work Approval",
			Excerpt:       "Stuck in the work pass waiting period? Make money while you wait. Foodpanda, Lalamove, Grab, and more—5 flexible gig economy jobs in Malaysia with realistic earnings.",
			Date:          "2026-04-14",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "9 min read",
			Tags:          []string{"gig-economy", "malaysia", "work", "freelance", "income", "job-seeker"},
			FeaturedImage: "/images/blog/gig-jobs.webp",
			Content: `
<h2>Making Money While You Wait</h2>
<p>Singapore work pass approvals take 4–12 weeks. Pelangi guests often ask: how do I earn during this gap? The answer: Malaysia's gig economy. You can earn RM1,500–4,000/month with zero commitment. Here are 5 proven gig jobs for your transition.</p>

<h2>1. Foodpanda Delivery Rider — RM1,800–3,500/month</h2>
<p><strong>What:</strong> Deliver food via motorbike, flexible shifts, work 4–12 hours anytime.</p>
<p><strong>Requirements:</strong> Malaysian IC, motorcycle license, own motorbike, Foodpanda app. Age 18+. Background check is instant (10 minutes).</p>
<p><strong>Earnings:</strong> RM5–8 per delivery + tips. Peak hours (lunch 11am–2pm, dinner 6–9pm): RM80–120/day. Part-time: RM1,500–2,500/month. Full-time: RM3,000–3,500/month.</p>
<p><strong>Pros:</strong> Instant signup, daily payouts, complete schedule control, stay active. Popular with expats in transition.</p>
<p><strong>Cons:</strong> Weather-dependent, traffic stress, no benefits, rating-sensitive, fatigue from long hours.</p>

<h2>2. Lalamove Driver — RM2,000–3,800/month</h2>
<p><strong>What:</strong> Deliver parcels and documents across city, less frequent than food delivery but higher pay per trip.</p>
<p><strong>Requirements:</strong> Malaysian IC, driving license, own car or motorbike, insurance. Age 18+. Vetting takes 2–3 days.</p>
<p><strong>Earnings:</strong> RM8–15 per delivery (distance-based). Corporate deadlines (end-month): RM20–30 per delivery. Part-time: RM1,800–2,500/month. Full-time: RM3,000–3,800/month.</p>
<p><strong>Pros:</strong> Higher per-delivery rate, less traffic pressure (packages don't spoil), flexible shifts, same-day payout.</p>
<p><strong>Cons:</strong> Fewer orders than food delivery, vehicle damage liability, parking costs, less suitable for motorbikes.</p>

<h2>3. Grab Ride or GrabFood — RM2,500–4,200/month</h2>
<p><strong>What:</strong> GrabCar (passenger rides) or GrabFood (delivery). Grab's bigger ecosystem = more orders.</p>
<p><strong>Requirements:</strong> Malaysian IC, driving license (5+ years for GrabCar), own vehicle, car insurance. Age 21+ for rides, 18+ for food.</p>
<p><strong>Earnings:</strong> GrabCar: RM3–25 per ride. GrabFood: RM6–12 per delivery. Average 10–15 rides/day = RM80–150/day. Surge pricing (Friday evening, weekends) = 1.5–2x multiplier. Part-time: RM2,000–3,000/month. Full-time: RM3,500–4,200/month.</p>
<p><strong>Pros:</strong> Strong brand trust, transparent pay, surge pricing rewards peak work, high volume keeps you busy.</p>
<p><strong>Cons:</strong> GrabCar needs 5-year license, passenger interaction risks (safety at night), fuel costs high, wear-and-tear on car, cancellations hurt earnings.</p>

<h2>4. Part-Time F&amp;B / Cafe Work — RM1,500–2,500/month</h2>
<p><strong>What:</strong> Barista, bartender, waiter, kitchen help. Flexible shift work, common for gap periods.</p>
<p><strong>Requirements:</strong> Work visa or Malaysian employment rights, punctuality, basic English for customer roles.</p>
<p><strong>Earnings:</strong> RM8–12/hour + tips. 3–4 shifts/week, 6–8 hours = RM1,500–2,500/month. High-end bars: RM15–20/hour + 10% service split.</p>
<p><strong>Pros:</strong> Predictable hourly pay, tips add 20–30%, meals included, social environment, structured schedule.</p>
<p><strong>Cons:</strong> Fixed shifts (less flexible), standing fatigue, early/late hours, customer service stress.</p>

<h2>5. Online Freelancing — RM1,200–5,000+/month</h2>
<p><strong>What:</strong> Virtual assistant, content writing, social media, graphic design, coding, translation. Laptop-based, any time.</p>
<p><strong>Requirements:</strong> Laptop, stable internet, relevant skills, portfolio, Upwork/Fiverr/Freelancer account.</p>
<p><strong>Earnings:</strong> Entry (RM5–10/hr): RM1,200–2,000/month. Mid (RM15–30/hr): RM2,500–4,000/month. Expert (RM30–100/hr+): RM4,000–8,000+/month. Ramp-up takes 2–3 months as reviews build.</p>
<p><strong>Pros:</strong> Location-independent, work your pace, scale by reputation, no commute, leverage existing skills.</p>
<p><strong>Cons:</strong> Slow start, platform competition, time-zone issues with Western clients, payment delays (30-day holds), self-discipline needed.</p>

<h2>Combining Gigs for Max Income</h2>
<p>Smart approach: deliver food 5–6 hours/day (RM400–600) + freelance 3–4 hours evenings (RM150–300) = RM550–900/day. Pair active gigs (delivery, rides) with remote work. During slow hours (2–5pm), do freelance projects.</p>
<p>For the app-by-app breakdown — requirements, per-job pay, and the daypart rotation JB riders run — see our <a href="/blog/delivery-gig-apps-jb-comparison-2026">Grab vs Lalamove vs Foodpanda comparison</a>, and budget the whole month with the <a href="/blog/gig-worker-jb-monthly-budget-guide">gig worker JB budget guide</a>.</p>

<h2>Tax and Legal</h2>
<p>Gig income is generally taxable. Keep earnings records. Check your work visa terms—S Pass and Employment Pass typically allow gig work outside your primary job. Confirm with your employer before starting.</p>

<h2>Pelangi Guests &amp; Gap-Filling</h2>
<p>Many guests stay with us during that 4–12 week limbo. Those who pick up gig work report three wins: (1) funding relocation costs, (2) staying mentally active, (3) natural downtime when returning to Pelangi. Several guests deliver Foodpanda and work from our common areas.</p>

<h2>Next Steps</h2>
<p>Choose a gig: Foodpanda for ease, freelancing for scalability, F&amp;B for social connection. <a href="/rooms">Book a stay at Pelangi Capsule</a> as your base while you earn and prepare for Singapore.</p>
`,
		},
		// 11
		{
			Slug:          "3-day-jb-backpacker-itinerary-rm250",
			LastModified:  "2026-06-26",
			ImageAlt:      "A backpacker exploring Johor Bahru streets on a three-day budget itinerary under RM250",
			Title:         "3-Day JB Backpacker Itinerary Under RM250 (2026)",
			Excerpt:       "A complete 3-day itinerary for JB on a tight budget: RM35/night hostel, RM25/day food, RM10/day transport. Day-by-day breakdown with best food spots and activities.",
			Date:          "2026-04-14",
			Category:      "Backpacker Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "backpacker", "budget-travel", "itinerary", "malaysia", "hostel"},
			FeaturedImage: "/images/blog/jb-backpacker-itinerary.webp",
			Content: `
<h2>The RM250 Challenge: Is It Possible?</h2>
<p>Three days in Johor Bahru for under RM250 total? Yes. This includes accommodation, all meals, transport, and activities. Here's the day-by-day breakdown that proves it.</p>

<h2>Day 1: Arrival &amp; City Orientation</h2>
<p><strong>Morning (9am–12pm):</strong> Arrive at JB Sentral station. Walk or take local bus (RM2) to <a href="/book">Pelangi Capsule Hostel</a>. Check in early (RM35/night), drop bags, freshen up. Cost: RM2 transport.</p>
<p><strong>Afternoon (1pm–5pm):</strong> Lunch at Sik Bao Sin hawker centre—mixed rice with 3 items, RM6. Walk around Taman Pelangi neighbourhood (free). Visit the traditional Chinese temple nearby (free entry). Coffee at local kopitiam, RM3.</p>
<p><strong>Evening (6pm–10pm):</strong> Dinner at Taman Sentosa night market—satay skewers (5 sticks, RM3), lok-lok (RM4), teh tarik (RM2). Return to hostel. Total Day 1: RM55.</p>

<h2>Day 2: Food &amp; Culture Deep Dive</h2>
<p><strong>Morning (8am–11am):</strong> Breakfast—roti canai + teh tarik at mamak, RM5. Grab to nearby Johor Art Gallery or street art walk (free/RM5 entry). Visit local market, RM3 (exploratory snacks).</p>
<p><strong>Afternoon (12pm–4pm):</strong> Lunch at laksa stall, RM7 (laksa Johor specialty). Rest at hostel or visit free museum. Explore the Waterfront area by foot (free). Snack—martabak + juice, RM5.</p>
<p><strong>Evening (6pm–10pm):</strong> Dinner at San Low Seafood restaurant—dry-fried bee hoon (small portion), RM12. Dessert: ice kacang at hawker, RM2. Chat with other backpackers at hostel common area (free). Total Day 2: RM59.</p>

<h2>Day 3: Last Day Exploration &amp; Departure</h2>
<p><strong>Morning (8am–12pm):</strong> Breakfast—nasi lemak from stall, RM4. Visit Sultan Abu Bakar Museum or local mosque (RM5 entry or free). Shopping at Jaya Jusco mall (window shopping free, maybe grab a snack). Coffee, RM2.</p>
<p><strong>Afternoon (1pm–4pm):</strong> Lunch—chicken rice or mixed rice, RM6. Relax at hostel or visit one last hawker spot. Pack and checkout by 4pm.</p>
<p><strong>Evening (5pm+):</strong> Budget buffer for transport to airport/station (RM10–15). Total Day 3: RM27.</p>

<h2>The Budget Breakdown</h2>
<table border="1" cellpadding="10" cellspacing="0" style="width:100%; margin:15px 0; border-collapse:collapse;">
  <tr style="background-color:#f0f0f0;">
    <th style="text-align:left; padding:10px;">Category</th>
    <th style="text-align:center; padding:10px;">Per Night/Day</th>
    <th style="text-align:center; padding:10px;">3 Days Total</th>
  </tr>
  <tr>
    <td style="padding:10px;"><strong>Accommodation</strong> (Pelangi Capsule Hostel)</td>
    <td style="text-align:center; padding:10px;">RM35</td>
    <td style="text-align:center; padding:10px;">RM105</td>
  </tr>
  <tr style="background-color:#fafafa;">
    <td style="padding:10px;"><strong>Food</strong> (Breakfast + Lunch + Dinner + Snacks)</td>
    <td style="text-align:center; padding:10px;">RM25</td>
    <td style="text-align:center; padding:10px;">RM75</td>
  </tr>
  <tr>
    <td style="padding:10px;"><strong>Transport</strong> (Local buses, Grab rides)</td>
    <td style="text-align:center; padding:10px;">RM10</td>
    <td style="text-align:center; padding:10px;">RM30</td>
  </tr>
  <tr>
    <td style="padding:10px;"><strong>Activities &amp; Misc</strong> (Museum, snacks, buffer)</td>
    <td style="text-align:center; padding:10px;">RM15</td>
    <td style="text-align:center; padding:10px;">RM35</td>
  </tr>
  <tr style="background-color:#e8f5e9;">
    <td style="padding:10px;"><strong>TOTAL</strong></td>
    <td style="text-align:center; padding:10px;">—</td>
    <td style="text-align:center; padding:10px;"><strong>RM245</strong></td>
  </tr>
</table>

<h2>Money-Saving Tips</h2>
<ul>
  <li><strong>Accommodation:</strong> <a href="/book">Pelangi Capsule offers dorm beds at RM35/night</a>—one of the best value hostels in JB.</li>
  <li><strong>Food:</strong> Stick to hawker centres and night markets. Avoid tourist restaurants.</li>
  <li><strong>Transport:</strong> Use local buses (RM2–3 per trip) instead of Grab. Walk when possible.</li>
  <li><strong>Activities:</strong> Free walking tours, street art exploration, and mosque visits cost nothing.</li>
  <li><strong>Meals:</strong> Eat breakfast early (cheaper) and largest meal at lunch (peak competition = better value).</li>
</ul>

<h2>What Makes RM250 Possible</h2>
<p>JB's strength is hawker-centre pricing and no tourist markup. A hawker lunch (RM6–8) would cost SGD12–15 in Singapore—triple the price. Budget-hostel accommodation at RM35/night is rare anywhere else. Combine these and RM250 becomes comfortable, not miserable.</p>

<h2>Ready for Your RM250 Adventure?</h2>
<p><a href="/book">Book your stay at Pelangi Capsule Hostel</a> and start your three-day JB backpacking journey. It's affordable, authentic, and memorable.</p>
`,
		},
		// 12
		{
			Slug:          "xinshan-juzhu-tuijian-jiaonang-lvguan",
			Title:         "新山住宿推荐：胶囊旅馆体验指南 (2026)",
			Excerpt:       "新山最值得入住的胶囊旅馆是哪家？本文带你深入了解Pelangi胶囊旅馆——价格、设施、位置，一文读懂。",
			Date:          "2026-04-14",
			Category:      "住宿指南",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"新山", "住宿", "胶囊旅馆", "马来西亚", "背包旅行", "柔佛"},
			FeaturedImage: "/images/blog/xinshan-juzhu-tuijian-jiaonang-lvguan.webp",
			ImageAlt:      "彩虹胶囊旅馆的胶囊房间内部",
			InLanguage:    "zh-CN",
			Content: `
<h2>为什么选择胶囊旅馆？</h2>
<p>胶囊旅馆（Capsule Hostel）源自日本，以其高性价比和私密性著称。每个床位配备独立的私人舱体，拥有个人插座、USB充电口、阅读灯和拉帘，让你在共享空间中享有属于自己的小天地。对于独自旅行者、背包客和数字游民来说，胶囊旅馆是兼顾预算与品质的最佳选择。</p>

<h2>Pelangi胶囊旅馆：新山最受欢迎的背包客据点</h2>
<p><strong>彩虹胶囊旅馆（Pelangi Capsule Hostel）</strong>位于新山Taman Pelangi区，距离新山关卡（JB Sentral CIQ）约15分钟车程，交通便利，周边餐饮选择丰富。</p>

<h3>房型与价格</h3>
<ul>
  <li><strong>混合宿舍（Mixed Dorm）</strong>：每晚 RM35起，月租 RM600起（上铺）/ RM650起（下铺）</li>
  <li><strong>女生专用宿舍（Female Dorm）</strong>：同等价格，环境更安全私密</li>
  <li>所有床位均为日式胶囊设计，配备高密度记忆棉床垫</li>
</ul>

<h3>设施一览</h3>
<ul>
  <li>免费高速 WiFi（全区覆盖）</li>
  <li>24小时出入，无宵禁</li>
  <li>冷气空调（独立温控）</li>
  <li>个人储物柜（附锁）</li>
  <li>共用厨房（可自行烹饪）</li>
  <li>热水淋浴（含沐浴露和洗发水）</li>
  <li>毛巾提供</li>
  <li>洗衣服务：RM5/次</li>
  <li>24小时闭路电视保安</li>
</ul>

<h2>地理位置优势</h2>
<p>旅馆位于 <strong>Jalan Perang, Taman Pelangi</strong>，步行可达多家餐厅、便利店和夜市。每周二下午4:30，门口附近的Taman Pelangi夜市开档，是体验本地美食文化的绝佳机会。</p>

<h2>如何从新加坡前往？</h2>
<p>从新加坡出发，可乘坐地铁至<strong>兀兰北（Woodlands North）</strong>站，步行过长堤至马来西亚关卡（JB Sentral CIQ），再叫Grab前往旅馆，全程约30-45分钟，Grab约RM12-18。详细交通指南请参阅<a href="/zh/location">前往路线页面</a>。</p>

<h2>适合哪些旅客？</h2>
<ul>
  <li>从新加坡出发的一日游或短途旅行者</li>
  <li>在新山寻找月租住宿的外籍工作者</li>
  <li>背包客、独自旅行者</li>
  <li>希望节省住宿预算的商务旅客</li>
</ul>

<p>想了解更多或直接预订？访问<a href="/zh/rooms">客房介绍页面</a>或通过<strong>WhatsApp (+60 12-708 8789)</strong>联系我们。</p>
`,
		},
		// 13
		{
			Slug:          "xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan",
			Title:         "从新加坡去新山怎么去？2026最新交通全攻略",
			Excerpt:       "地铁、巴士、自驾……从新加坡前往新山的所有交通方式详细对比，附最新过关攻略和省钱小技巧。",
			Date:          "2026-04-14",
			Category:      "交通攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"新加坡", "新山", "交通", "过关", "长堤", "马来西亚"},
			FeaturedImage: "/images/blog/causeway-guide.webp",
			InLanguage:    "zh-CN",
			AlternateEN: "singapore-to-jb-day-trip-causeway-guide",
			Content: `
<h2>从新加坡去新山的主要方式</h2>
<p>新加坡与新山之间有两个陆路通关口：<strong>兀兰关卡（Woodlands / JB Sentral CIQ）</strong>和<strong>大士关卡（Tuas / Sultan Abu Bakar CIQ）</strong>。大多数旅客选择兀兰关卡，因为交通更方便。</p>

<h2>方式一：地铁 + 步行过桥（最省钱）</h2>
<p>这是背包客最常用的方式，也是最省钱的选择。</p>
<ol>
  <li>乘坐地铁汤申-东海岸线（TEL）至<strong>兀兰北站（Woodlands North）</strong></li>
  <li>沿指示牌步行至新加坡关卡（ICA Building），盖出境章</li>
  <li>步行过长堤（约1公里），或乘坐免费摆渡巴士</li>
  <li>抵达马来西亚 JB Sentral CIQ，盖入境章</li>
  <li>在 JB Sentral 叫 Grab 前往目的地</li>
</ol>
<p><strong>费用：</strong>地铁票约 SGD1.50-2.50，Grab 至 Taman Pelangi 约 RM12-18</p>
<p><strong>耗时：</strong>高峰期约 60-90 分钟，非高峰期 30-45 分钟</p>

<h2>方式二：巴士（JB Express / CW1）</h2>
<p>多家巴士公司提供从新加坡市区直达 JB Sentral 的服务，无需自行走路过桥，适合携带大行李的旅客。</p>
<ul>
  <li><strong>JB Express</strong>：从 Queen Street Terminal 或 Kranji MRT 出发，约 SGD4-5</li>
  <li><strong>Causeway Link（CW1）</strong>：从 Kranji MRT 出发，约 SGD3.5</li>
  <li>巴士直接带你通过两国关卡，下车盖章后再上车继续</li>
</ul>
<p><strong>优点：</strong>无需步行，适合行李多的旅客</p>
<p><strong>缺点：</strong>高峰期可能堵车，耗时较长</p>

<h2>方式三：Grab（最舒适）</h2>
<p>可以在新加坡叫 Grab 直接送至 JB Sentral 关卡，自行过关后在马来西亚侧再叫另一辆 Grab。注意：Grab 车辆无法直接带你过关，需要自行下车办理出入境手续。</p>
<p><strong>费用：</strong>新加坡侧 Grab 约 SGD15-25，马来西亚侧 Grab 至 Taman Pelangi 约 RM12-18</p>

<h2>过关小技巧</h2>
<ul>
  <li><strong>避开高峰期</strong>：周五下午3pm后、周末早上8-11am 和下午5-8pm 最拥挤，排队可能超过2小时</li>
  <li><strong>最佳时间</strong>：工作日早上10am-下午3pm 过关最顺畅</li>
  <li><strong>备好护照</strong>：马来西亚入境单可在关卡领取，或提前下载 MyTravelPass App 填写电子表格</li>
  <li><strong>带足现金</strong>：马来西亚林吉特（RM），许多小店和 Grab 更偏好现金</li>
  <li><strong>汇率</strong>：在新加坡兑换点兑换 RM 通常比机场或马来西亚关卡划算</li>
</ul>

<h2>抵达新山后前往彩虹胶囊旅馆</h2>
<p>从 JB Sentral CIQ 出来后，叫 Grab 前往 <strong>26A Jalan Perang, Taman Pelangi</strong>，约 5-10 分钟车程，费用 RM8-15。详细路线请查看<a href="/zh/location">前往路线页面</a>。</p>

<p>准备好了吗？<a href="/zh/rooms">查看客房</a>或<a href="/book">立即预订</a>，开始你的新山之旅！</p>
`,
		},
		// 14
		{
			Slug:          "xinshan-ziyou-xing-gonglue-2026",
			Title:         "新山自由行攻略 2026：吃喝玩乐全指南",
			Excerpt:       "新山不只是过境城市！本文带你探索新山最值得打卡的景点、美食和购物地，附三天两夜行程规划。",
			Date:          "2026-04-14",
			Category:      "旅游攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "10 min read",
			Tags:          []string{"新山", "自由行", "旅游攻略", "马来西亚", "柔佛", "Visit Malaysia 2026"},
			FeaturedImage: "/images/blog/xinshan-ziyou-xing-gonglue-2026.webp",
			ImageAlt:      "新山市区景观全景",
			InLanguage:    "zh-CN",
			Content: `
<h2>新山：被严重低估的马来西亚城市</h2>
<p>很多旅客把新山当作前往吉隆坡的中转站，却错过了这座城市本身的精彩。新山（Johor Bahru，简称 JB）是马来西亚第二大城市，拥有丰富的美食文化、独特的历史遗迹、亲民的购物商场，以及距离新加坡仅15分钟的地理优势。2026年，随着 Visit Malaysia 2026 旅游计划推出，新山更是成为热门目的地。</p>

<h2>必去景点</h2>

<h3>1. 新山古庙（华人历史文化地标）</h3>
<p>位于新山市中心的华人庙宇群，是新山华人社区数百年历史的见证。每逢农历新年和重要节日，这里香火鼎盛，是了解马来西亚华人文化的最佳地点。</p>

<h3>2. 苏丹阿布峇卡皇宫（Istana Besar）</h3>
<p>柔佛皇室的历史宫殿，现为皇家博物馆，展示柔佛苏丹王室的历史文物和皇家珍藏。门票约 RM10，是了解马来西亚王室文化的好去处。</p>

<h3>3. 达伊花园（Danga Bay）</h3>
<p>新山最大的滨海休闲区，拥有观景台、游乐设施和多家餐厅。傍晚时分在这里欣赏夕阳和新加坡天际线，是不少摄影爱好者的打卡胜地。</p>

<h3>4. Taman Pelangi彩虹花园</h3>
<p>我们旅馆所在的社区！这里是新山著名的美食区，聚集了各类传统餐厅、咖啡店和特色小吃。每周二的夜市更是不容错过。</p>

<h2>美食必吃清单</h2>
<ul>
  <li><strong>柔佛喇沙（Laksa Johor）</strong>：用意粉代替米粉的独特喇沙，是柔佛州的标志性美食</li>
  <li><strong>炒粿条（Char Kway Teow）</strong>：新山版本偏干炒，镬气十足</li>
  <li><strong>肉骨茶（Bak Kut Teh）</strong>：新山风格以香料为主，汤头清澈鲜美</li>
  <li><strong>三楼米粉（San Low Bee Hoon）</strong>：新山独创的干炒米粉，步行可从旅馆到达</li>
  <li><strong>罗惹（Rojak）</strong>：马来式水果沙拉，以虾膏酱汁拌食，酸甜开胃</li>
</ul>

<h2>购物天堂</h2>
<p>新山有多个大型购物中心，价格比新加坡便宜30-50%：</p>
<ul>
  <li><strong>AEON Tebrau City</strong>：新山最大购物中心之一，品牌齐全</li>
  <li><strong>Paradigm Mall JB</strong>：时尚购物，餐饮选择丰富</li>
  <li><strong>KSL City Mall</strong>：靠近市中心，电子产品和服装性价比高</li>
  <li><strong>Taman Pelangi夜市（周二）</strong>：本地特产、小吃、服装，从旅馆步行即达</li>
</ul>

<h2>三天两夜行程建议</h2>

<h3>第一天：抵达 + 周边探索</h3>
<ul>
  <li>下午：从新加坡过关，入住彩虹胶囊旅馆，安顿行李</li>
  <li>傍晚：步行探索 Taman Pelangi 美食区，晚餐就在附近解决</li>
  <li>晚上：在旅馆公共区域与来自世界各地的旅客交流</li>
</ul>

<h3>第二天：市区文化探索</h3>
<ul>
  <li>早餐：旅馆附近的茶餐厅，来一份咖椰吐司 + 半生熟鸡蛋 + 白咖啡</li>
  <li>上午：参观苏丹阿布峇卡皇宫和华人庙宇群</li>
  <li>午餐：新山市中心的茶餐厅，点一碗肉骨茶</li>
  <li>下午：逛 KSL City Mall 或 Paradigm Mall，购物或休息</li>
  <li>晚餐：Danga Bay 滨海区，看夕阳吃海鲜</li>
</ul>

<h3>第三天：美食扫街 + 返程</h3>
<ul>
  <li>早餐：附近 mamak 店，罗惹 + 印度煎饼（Roti Canai）</li>
  <li>上午：AEON Tebrau City 购物，带手信回去</li>
  <li>午餐：在购物中心美食广场尝试柔佛喇沙</li>
  <li>下午：返回旅馆取行李，过关返回新加坡</li>
</ul>

<h2>实用资讯</h2>
<ul>
  <li><strong>货币</strong>：马来西亚林吉特（MYR/RM），1 SGD ≈ 3.5 RM</li>
  <li><strong>交通</strong>：Grab 是新山最方便的出行方式，下载后即可使用</li>
  <li><strong>语言</strong>：新山华人众多，普通话和广东话均可沟通</li>
  <li><strong>住宿</strong>：<a href="/zh/rooms">彩虹胶囊旅馆</a>每晚仅需 RM35起，是背包客的最佳选择</li>
</ul>

<p>还在犹豫？<a href="/book">立即预订</a>，开始你的新山自由行！或通过 <strong>WhatsApp (+60 12-708 8789)</strong> 与我们联系获取更多旅游建议。</p>
`,
		},
		// 15
		{
			Slug:          "lalamove-driver-malaysia-jb-guide",
			Title:         "Lalamove Driver Guide Malaysia: Earn RM25–80 Per Job in JB",
			Excerpt:       "How to become a Lalamove driver in Malaysia, from registration to first earning. Vehicle types, RM25–80 per job, registration steps, and comparison with Foodpanda and Grab.",
			Date:          "2026-04-14",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "lalamove", "delivery", "malaysia", "side-hustle"},
			FeaturedImage: "/images/blog/lalamove-driver-guide.webp",
			Content: `
<h2>Start Earning With Lalamove in Johor Bahru</h2>
<p>Lalamove connects drivers with customers needing parcels, documents, and goods delivered. Work your own hours in JB and earn RM25–80 per job. This guide covers registration, vehicle options, earnings, and how Lalamove compares to Foodpanda and Grab.</p>

<h2>Earnings & Vehicle Types</h2>
<p><strong>Pay per job varies by distance and vehicle:</strong></p>
<ul>
  <li><strong>Bike (motorcycle):</strong> RM25–40, under 5 kg, fastest urban delivery</li>
  <li><strong>Car (sedan/SUV):</strong> RM40–65, medium loads, general parcels</li>
  <li><strong>Van:</strong> RM60–80+, heavy items, furniture, bulk orders</li>
</ul>
<p>Peak hours (12–2 pm, 5–8 pm) offer 1.5–2x surge pricing. Full-time drivers: RM200–300/day. Part-time: RM100–150/evening.</p>

<h2>Vehicle & Document Requirements</h2>
<p>To register, you'll need:</p>
<ul>
  <li>Valid driver's license and vehicle registration (current roadtax)</li>
  <li>Insurance certificate (third-party or comprehensive)</li>
  <li>Photos: License, registration, insurance, vehicle (exterior + interior), selfie with ID</li>
  <li>Malaysian bank account for payouts</li>
</ul>

<h2>5-Step Registration Process</h2>
<p><strong>Step 1:</strong> Download Lalamove Driver app → "Sign up as driver" → Enter Malaysian ID and phone number.</p>
<p><strong>Step 2:</strong> Upload clear photos of all documents (license, registration, insurance).</p>
<p><strong>Step 3:</strong> Lalamove calls to verify your identity and bank details.</p>
<p><strong>Step 4:</strong> Vehicle inspection (usually photo-based in JB; in-person if requested).</p>
<p><strong>Step 5:</strong> Approval in 3–5 days → Go live and accept jobs.</p>

<h2>Why Lalamove?</h2>
<p><strong>Flexibility:</strong> 24/7 availability, no shift requirements, no boss. Accept 2 jobs or 20 — your choice.</p>
<p><strong>Keep Your Earnings:</strong> Lalamove's 15–20% platform fee is transparent. No hidden deductions.</p>
<p><strong>Cross-Border Demand:</strong> JB's proximity to Singapore creates high demand for parcels and documents (RM50–80 for long deliveries).</p>

<h2>Lalamove vs. Foodpanda vs. Grab</h2>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="border-bottom:1px solid #ddd"><th style="text-align:left;padding:0.5rem">Platform</th><th style="padding:0.5rem">RM/Job</th><th style="padding:0.5rem">Focus</th></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:0.5rem"><strong>Lalamove</strong></td><td style="padding:0.5rem">25–80</td><td style="padding:0.5rem">General parcels, logistics</td></tr>
<tr style="border-bottom:1px solid #ddd"><td style="padding:0.5rem"><strong>Foodpanda</strong></td><td style="padding:0.5rem">15–40</td><td style="padding:0.5rem">Food delivery</td></tr>
<tr><td style="padding:0.5rem"><strong>Grab</strong></td><td style="padding:0.5rem">20–50</td><td style="padding:0.5rem">Rides + parcels</td></tr>
</table>

<p><strong>Lalamove wins:</strong> Highest payouts. No restaurant partnership needed — any customer, any parcel.</p>
<p><strong>Tip:</strong> Many drivers work all three platforms. Lalamove mornings, Foodpanda lunch, Grab evenings = maximized income. The full side-by-side is in our <a href="/blog/delivery-gig-apps-jb-comparison-2026">JB gig app comparison</a>, with deep-dives on <a href="/blog/grab-driver-jb-guide-2026">Grab driving in JB</a> and <a href="/blog/foodpanda-rider-jb-guide-2026">Foodpanda riding in JB</a>.</p>

<h2>Start Today</h2>
<p>Download Lalamove Driver, submit documents, and earn within days. You're your own boss—set your hours, keep your income, grow your earnings.</p>

<h2>Need a Cheap Base While You Drive?</h2>
<p>Many gig drivers in JB keep overheads low by staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi — capsule pods from <strong>RM30/night on weekdays (RM35 weekends)</strong>, or <strong>RM600/month</strong> for long-stayers. Private rooms are also available from <strong>RM500/month</strong>, right above the 7-Eleven on Jalan Perang. Fast WiFi for the driver app, lockers, hot showers, and a base 15 minutes from the Causeway — cross-border delivery jobs start at your doorstep.</p>
<p><a href="/book">Book a pod</a>, or compare the numbers first: the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">honest maths of RM600/month capsule living</a> and the <a href="/blog/room-for-rent-taman-pelangi-jb-rm500-month">RM500/month private room guide</a>.</p>
`,
		},
		// 16
		{
			Slug:          "taman-pelangi-tuesday-night-market-guide",
			Title:         "Taman Pelangi Tuesday Night Market — The Street Food Paradise at Our Doorstep",
			Excerpt:       "Every Tuesday from 4:30 PM, Jalan Perang transforms into a 500m street food carnival. Satay, carrot cake, martabak, fresh seafood — all steps from Pelangi Capsule Hostel.",
			Date:          "2026-04-15",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "night-market", "pasar-malam", "street-food", "taman-pelangi", "budget-travel"},
			FeaturedImage: "/images/blog/taman-pelangi-tuesday-night-market-guide.webp",
			ImageAlt:      "A Johor Bahru night market (pasar malam) with street food stalls, similar to the Taman Pelangi Tuesday market",
			AlternateZH: "taman-pelangi-xingqier-yeshi-gonglue",
			Content: `
<h2>The Night Market That's Literally Outside Our Door</h2>
<p>Every Tuesday evening, Jalan Perang — the same street where <a href="/rooms">Pelangi Capsule Hostel</a> sits — transforms into one of Johor Bahru's most beloved weekly night markets. The <strong>Taman Pelangi Pasar Malam</strong> stretches roughly 500–600 metres along the road, filling the air with the smell of charcoal satay, frying carrot cake, and freshly squeezed sugar cane juice.</p>
<p>If you're staying with us, you don't need Grab. You don't need a map. Walk out the front door, turn left, and dinner is right there.</p>

<h2>When and Where</h2>
<ul>
  <li><strong>Day:</strong> Every Tuesday (weekly, rain or shine)</li>
  <li><strong>Time:</strong> 4:30 PM – 10:00 PM (best from 5:30–8:30 PM)</li>
  <li><strong>Location:</strong> Jalan Perang, Taman Pelangi, 80400 Johor Bahru</li>
  <li><strong>Distance from hostel:</strong> ~2 minutes on foot</li>
</ul>

<h2>Must-Try Stalls</h2>

<h3>🥕 Fried Carrot Cake (Chai Tow Kway)</h3>
<p>Not made with carrots — "carrot cake" here means white radish cake stir-fried on a scorching iron plate with egg, soy sauce, and crispy lard bits. Order the <strong>black version</strong> for a sweeter, caramelised finish. Around RM5–6. You'll smell the stall from 50 metres away.</p>

<h3>🥞 Martabak Manis</h3>
<p>A thick, fluffy Indonesian-style pancake folded and stuffed with chocolate, peanut, cheese, banana — or all of the above. Fresh to order, handed over piping hot in paper. RM5–8 depending on fillings.</p>

<h3>🍢 Satay</h3>
<p>Charcoal-grilled chicken or beef skewers marinated in turmeric and spices, served with ketupat (pressed rice cake) and peanut dipping sauce. RM0.80–1.20 per stick. Order at least 10 — you'll wish you ordered more.</p>

<h3>🐟 Yong Tau Hu</h3>
<p>Tofu and vegetables stuffed with fish paste, served in clear broth or dry with sauce. A Hakka Chinese classic — light, healthy, and endlessly customisable. Point and choose your pieces. RM0.50–1 each.</p>

<h3>🌯 Popiah (Fresh Spring Rolls)</h3>
<p>Soft wheat skin rolled around braised turnip, egg, bean sprouts, and lettuce, with sweet or chilli sauce. Lighter than fried food, assembled fresh in front of you. RM3–5 per roll.</p>

<h3>🍱 Nasi Lemak</h3>
<p>Coconut-steamed rice with sambal, crispy anchovies, peanuts, cucumber, and egg. Night market versions add fried chicken on top. RM5–8. Malaysia's national dish — non-negotiable on your first visit.</p>

<h3>🍡 Onde-Onde</h3>
<p>Pandan-green glutinous rice balls filled with liquid palm sugar (gula melaka), rolled in grated coconut. Bite carefully — the sugar gushes out. 5 pieces for RM2–3. One of Malaysia's most beloved traditional sweets.</p>

<h3>🐷 Thai Moo Ping (Grilled Pork Skewers)</h3>
<p>Palm-sugar-marinated pork belly grilled over charcoal until caramelised at the edges, Thai street food style. RM2–3 per stick, usually sold with sticky rice alongside.</p>

<h3>🍮 Tau Fu Fa (Soya Beancurd Pudding)</h3>
<p>Silky-smooth warm beancurd drizzled with ginger syrup or brown sugar. The perfect closer after a walk through the market. RM2–3 per bowl.</p>

<h2>Beyond Food</h2>
<p>Walk the full 500m and you'll also find fresh tropical fruits, raw seafood at market prices, casual clothing, kitchenware, and household items — all at prices that make Singapore feel like another planet.</p>

<h2>Budget: A Full Pasar Malam Dinner</h2>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:#f5f5f5"><th style="text-align:left;padding:0.75rem;border:1px solid #ddd">Item</th><th style="padding:0.75rem;border:1px solid #ddd">Price</th></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">Fried carrot cake</td><td style="padding:0.75rem">RM5–6</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">Satay × 10 sticks</td><td style="padding:0.75rem">RM8–12</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">Popiah × 1</td><td style="padding:0.75rem">RM4</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">Sugar cane juice</td><td style="padding:0.75rem">RM2–3</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">Onde-onde × 5</td><td style="padding:0.75rem">RM2–3</td></tr>
<tr style="border:1px solid #ddd;font-weight:bold"><td style="padding:0.75rem"><strong>Total</strong></td><td style="padding:0.75rem"><strong>~RM21–28</strong></td></tr>
</table>
<p>Multiple dishes, dessert, and a drink — for under RM30 (SGD9 / USD6.50). Hard to beat anywhere in Southeast Asia.</p>

<h2>How to Get There from Pelangi Capsule Hostel</h2>
<p>Walk out the front door. Turn left on Jalan Perang. Walk 2 minutes. You're there — you'll hear it before you see it.</p>
<p>If you're visiting JB on a Tuesday, <a href="/book">book your pod now</a>. You'll have the most convenient pasar malam seat in the city.</p>
`,
		},
		// 17
		{
			Slug:          "taman-pelangi-xingqier-yeshi-gonglue",
			Title:         "彩虹花园周二夜市攻略｜就在旅馆门口的美食天堂",
			Excerpt:       "每个星期二下午4时半，Jalan Perang就变身500米美食长廊。沙爹、煎蕊、马打峇、海鲜……全在彩虹胶囊旅馆门口等着你！",
			Date:          "2026-04-15",
			Category:      "旅游攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"新山", "夜市", "pasar-malam", "彩虹花园", "街头美食", "马来西亚"},
			FeaturedImage: "/images/blog/taman-pelangi-tuesday-night-market-guide.webp",
			ImageAlt:      "新山夜市（pasar malam）的街头小吃摊位，与彩虹花园周二夜市类似",
			InLanguage:    "zh-CN",
			AlternateEN: "taman-pelangi-tuesday-night-market-guide",
			Content: `
<h2>就在旅馆门口的夜市！</h2>
<p>每个星期二傍晚，<a href="/zh/rooms">彩虹胶囊旅馆</a>门前的 Jalan Perang 就会摇身一变，成为新山其中一个最受本地人喜爱的周夜市集。<strong>彩虹花园（Taman Pelangi）Pasar Malam</strong> 沿路绵延约 500–600 米，木炭沙爹的烟香、大铁板煎萝卜糕的焦香、新鲜榨甘蔗汁的清甜……还没走到，香味已经飘来了。</p>
<p>住在我们旅馆，你不需要叫 Grab，不需要查地图。走出大门，往左走两分钟，晚餐就摆在眼前。</p>

<h2>夜市基本资讯</h2>
<ul>
  <li><strong>日期：</strong>每个星期二（每周固定，风雨不改）</li>
  <li><strong>时间：</strong>下午 4:30 – 晚上 10:00（最旺时段：5:30–8:30 PM）</li>
  <li><strong>地点：</strong>Jalan Perang, Taman Pelangi, 80400 Johor Bahru</li>
  <li><strong>距旅馆：</strong>步行约 2 分钟</li>
</ul>

<h2>必吃摊位大盘点</h2>

<h3>🥕 煎萝卜糕（Chai Tow Kway）</h3>
<p>马来西亚华人夜市的灵魂小吃。白萝卜糕切块后在大铁板上高火翻炒，加鸡蛋、酱油和猪油渣，镬气十足。建议点<strong>黑色版本</strong>（加黑酱油），焦糖化的甜香让人欲罢不能。一份约 RM5–6，五十米外就能闻到香味。</p>

<h3>🥞 马打峇马尼斯（Martabak Manis）</h3>
<p>来自印尼的厚实甜煎饼，外脆内软，现做现折，内馅任选：巧克力、花生、起司、香蕉，或全部塞进去！热腾腾用纸包好递到手上，RM5–8 一份。</p>

<h3>🍢 沙爹（Satay）</h3>
<p>木炭烤串——鸡肉或牛肉提前腌制，裹上姜黄和香料，炭火慢烤至金黄。配上菱形压缩饭（ketupat）和花生酱蘸食，是马来西亚最经典的夜市小吃。每串约 RM0.80–1.20，至少点10串起步，保证不够吃。</p>

<h3>🐟 酿豆腐（Yong Tau Hu）</h3>
<p>将鱼浆塞入豆腐、苦瓜、辣椒等食材中烹制，可选清汤或干拌，口味清淡。每件约 RM0.50–1，随手一指，阿姨帮你装好。</p>

<h3>🌯 薄饼（Popiah）</h3>
<p>用薄面皮包裹炒香的豆薯丝、鸡蛋、豆芽和生菜，淋上甜酱或辣椒酱。比油炸小吃清爽，一条约 RM3–5。</p>

<h3>🍱 椰浆饭（Nasi Lemak）</h3>
<p>用椰浆炊制的香米配上参巴辣椒酱、江鱼仔、花生和黄瓜，夜市版本通常加炸鸡。约 RM5–8，是马来西亚最具代表性的国民美食。</p>

<h3>🍡 煎蕊（Onde-Onde）</h3>
<p>以班兰调色的糯米汤圆，内藏液态椰糖，外裹鲜椰丝。咬下去的瞬间，糖汁在口中爆开，甜而不腻。五颗约 RM2–3，新山夜市最治愈的传统糕点。</p>

<h3>🐷 泰式猪颈肉串（Moo Ping）</h3>
<p>棕榈糖和香料腌制的猪颈肉，炭火慢烤至表面微焦、内里多汁。每串约 RM2–3，配糯米饭一起卖，非穆斯林游客必点。</p>

<h3>🍮 豆腐花（Tau Fu Fa）</h3>
<p>丝滑嫩白的豆花配上姜汁糖水或黑糖浆，冷热皆宜。逛完夜市，来一碗豆花甜甜收尾。RM2–3 一碗。</p>

<h2>夜市还卖什么？</h2>
<p>走完整条500米，你还会看到：新鲜时蔬水果、热带水果（应季有榴莲！）、海鲜生料、休闲服装、厨具杂货——价格比超市便宜，比新加坡便宜更多。</p>

<h2>一人逛夜市要花多少钱？</h2>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:#f5f5f5"><th style="text-align:left;padding:0.75rem;border:1px solid #ddd">食物</th><th style="padding:0.75rem;border:1px solid #ddd">价格</th></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">煎萝卜糕</td><td style="padding:0.75rem">RM5–6</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">沙爹 × 10串</td><td style="padding:0.75rem">RM8–12</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">薄饼 × 1条</td><td style="padding:0.75rem">RM4</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">甘蔗汁</td><td style="padding:0.75rem">RM2–3</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">煎蕊 × 5颗</td><td style="padding:0.75rem">RM2–3</td></tr>
<tr style="border:1px solid #ddd;font-weight:bold"><td style="padding:0.75rem"><strong>合计</strong></td><td style="padding:0.75rem"><strong>约 RM21–28</strong></td></tr>
</table>
<p>多道小吃 + 甜点 + 饮料，不超过 RM30，约合人民币 50 元。这大概是全新山性价比最高的晚餐体验。</p>

<h2>从彩虹胶囊旅馆怎么去？</h2>
<p>走出旅馆大门，左转，沿着 Jalan Perang 直走两分钟。你会先闻到，再看到整条街的灯光和摊位。</p>
<p>如果你计划周二抵达新山，<a href="/book">现在就预订</a>你的胶囊床位——用最实惠的住宿费，换一个门口就是夜市的绝佳位置。WhatsApp：<strong>+60 12-708 8789</strong>。</p>
`,
		},
		// 18
		{
			Slug:          "zhongguo-huhao-malaxi-a-mianshen-gonglue-2026",
			Title:         "中国护照去马来西亚需要签证吗？2026最新免签攻略",
			Excerpt:       "好消息！中国护照持有者赴马来西亚已享30天免签。本文详解免签条件、入境流程、注意事项，以及新山最佳住宿推荐。",
			Date:          "2026-04-14",
			Category:      "签证攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"中国游客", "马来西亚免签", "签证攻略", "新山", "柔佛", "出行攻略"},
			FeaturedImage: "/images/blog/zhongguo-huhao-malaxi-a-mianshen-gonglue-2026.webp",
			ImageAlt:      "中华人民共和国护照，赴马来西亚免签入境使用",
			InLanguage:    "zh-CN",
			Content: `
<h2>中国护照赴马来西亚：30天免签！</h2>
<p>2023年12月起，中国与马来西亚互免签证协议正式生效。<strong>中国护照持有者赴马来西亚无需申请签证，可享最长30天免签停留</strong>。这意味着你可以直接购票出发，抵达马来西亚各国际机场或陆路关卡时，只需出示护照即可入境。</p>

<p>对于想探索马来西亚的中国游客来说，新山（Johor Bahru）是最便捷的入口城市之一。从新加坡樟宜机场乘车约30分钟，或从中国直飞士乃国际机场（SZB），即可抵达这座拥有丰富美食和文化的城市。</p>

<h2>免签入境条件</h2>
<ul>
  <li><strong>护照有效期</strong>：入境时护照须有至少6个月有效期</li>
  <li><strong>停留天数</strong>：每次入境最多30天，不可延签</li>
  <li><strong>入境次数</strong>：无次数限制，可多次入境（每次重新计算30天）</li>
  <li><strong>资金证明</strong>：建议携带充足外币或银行卡，移民官可能询问</li>
  <li><strong>回程机票</strong>：建议持有回程或离境机票，以备查验</li>
  <li><strong>目的</strong>：仅限旅游、探亲、商务考察，不可打工</li>
</ul>

<h2>新山入境流程（陆路 CIQ 关卡）</h2>
<p>如果你从新加坡过来，走的是<strong>新山 CIQ（Sultan Iskandar Building）陆路关卡</strong>：</p>
<ol>
  <li>在新加坡过出境关卡（盖章离境）</li>
  <li>步行或乘接驳巴士进入马来西亚入境大厅</li>
  <li>前往外国人通道（Foreign Passport），出示中国护照</li>
  <li>移民官扫描护照、采集指纹、盖章，全程约3-5分钟</li>
  <li>入境完成！</li>
</ol>

<p><strong>注意：</strong>周五傍晚至周日，新山关卡人流众多，建议避开早7点至晚9点。平日早上或傍晚后排队最短。</p>

<h2>士乃国际机场入境（SZB/JHB）</h2>
<p>如从国内直飞新山士乃国际机场（IATA代码：JHB），流程更简单：</p>
<ol>
  <li>飞机落地后，跟随"Immigration"指示牌</li>
  <li>在外国人通道排队，出示护照和入境卡（飞机上会发放，也可提前在网上填写）</li>
  <li>采集指纹、盖章，通关完成</li>
  <li>出关后叫 Grab 前往市区（约25-35分钟，RM25-35）</li>
</ol>

<h2>常见问题</h2>

<h3>需要提前申请什么吗？</h3>
<p>无需任何申请，也无需填写电子表格（eNTRI/eVISA）。直接凭护照入境即可。</p>

<h3>可以在马来西亚工作吗？</h3>
<p>不可以。免签入境仅限旅游、探亲、短期商务。如需工作，须另行申请工作签证。</p>

<h3>能不能续签？</h3>
<p>在马来西亚境内无法延长免签期。如需更长停留，须离境（如前往泰国或新加坡）后重新入境。</p>

<h3>马来西亚治安怎么样？</h3>
<p>马来西亚整体治安良好，是东南亚最安全的国家之一。新山市中心和 Taman Pelangi 区域夜间出行均无重大安全顾虑，但建议注意随身财物，避免炫耀贵重物品。</p>

<h2>在新山住哪里？</h2>
<p>彩虹胶囊旅馆（Pelangi Capsule Hostel）是新山性价比最高的住宿选择之一。位于 Taman Pelangi 核心美食区，距 CIQ 关卡约15分钟 Grab 车程。</p>
<ul>
  <li>每晚 <strong>RM35</strong>起，约合人民币 60-70 元</li>
  <li>24小时自助入住，无需等前台</li>
  <li>免费高速 WiFi，普通话友好</li>
  <li>旁边就是每周二夜市，步行可达多家餐厅</li>
</ul>
<p><a href="/zh/rooms">查看房型</a> 或 <a href="/book">立即预订</a>，直接通过 WhatsApp 联系，无需平台手续费。</p>
`,
		},
		// 19
		{
			Slug:          "xinshan-weixin-zhifubao-zhongguo-youke-zhifu-zhinan",
			Title:         "新山可以用微信支付和支付宝吗？中国游客支付完全指南 2026",
			Excerpt:       "好消息：新山越来越多商家接受微信支付和支付宝！本文整理哪些地方可用、如何换汇、及现金与手机支付的实用建议。",
			Date:          "2026-04-14",
			Category:      "签证攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"中国游客", "微信支付", "支付宝", "新山", "马来西亚", "换汇"},
			FeaturedImage: "/images/blog/xinshan-weixin-zhifubao-zhongguo-youke-zhifu-zhinan.webp",
			ImageAlt:      "中国常用的微信支付和支付宝二维码移动支付",
			InLanguage:    "zh-CN",
			Content: `
<h2>微信支付 / 支付宝在新山能用吗？</h2>
<p><strong>可以用，而且越来越普遍！</strong> 近年来，随着中国游客赴马来西亚人数大幅增长，新山越来越多的商家开始接受微信支付（WeChat Pay）和支付宝（Alipay）。特别是在购物中心、连锁餐厅、药妆店和旅游景点，扫码支付已经非常普遍。</p>

<h2>哪些地方接受微信支付/支付宝？</h2>

<h3>✅ 大概率接受的场所</h3>
<ul>
  <li><strong>购物中心</strong>：Aeon Tebrau City、Paradigm Mall、KSL City Mall 内的大部分品牌门店</li>
  <li><strong>连锁餐厅</strong>：麦当劳、肯德基、必胜客、星巴克、老虎堂等</li>
  <li><strong>便利店</strong>：7-Eleven、99 Speedmart（部分门店）</li>
  <li><strong>药妆店</strong>：Watsons、Guardian</li>
  <li><strong>旅游景点</strong>：部分景点售票处</li>
</ul>

<h3>❌ 通常不接受的场所</h3>
<ul>
  <li><strong>路边小贩/夜市摊</strong>：大多数只收马来西亚现金（RM）</li>
  <li><strong>传统茶餐厅和小食摊</strong>：现金为主</li>
  <li><strong>Grab 打车</strong>：需绑定马来西亚银行卡或国际信用卡（VISA/Mastercard）</li>
  <li><strong>小型杂货店</strong>：只收现金</li>
</ul>

<h2>如何在马来西亚使用支付宝/微信支付？</h2>

<h3>支付宝（Alipay）</h3>
<p>在马来西亚，支付宝通过其国际版（Alipay+）合作当地支付商。使用步骤：</p>
<ol>
  <li>打开支付宝 App → 首页点击「境外支付」或直接扫码</li>
  <li>扫描商家的支付宝/Alipay+ 二维码</li>
  <li>输入金额（系统自动按实时汇率换算）</li>
  <li>付款从人民币余额扣除</li>
</ol>
<p><strong>注意：</strong> 国内开通的支付宝境外支付功能，每日限额约等值 2,000 元人民币。超额需使用其他支付方式。</p>

<h3>微信支付（WeChat Pay）</h3>
<p>微信支付在马来西亚同样可用，但接受范围略窄于支付宝。扫商家二维码后，系统会自动换算成令吉（RM）金额，从人民币余额扣除。</p>

<h2>最划算的换汇方式</h2>
<p>现金在新山的小吃摊和夜市是必需品。换汇建议：</p>

<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:#f5f5f5"><th style="text-align:left;padding:0.75rem;border:1px solid #ddd">换汇方式</th><th style="padding:0.75rem;border:1px solid #ddd">汇率</th><th style="padding:0.75rem;border:1px solid #ddd">建议</th></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem"><strong>新山市区换汇店</strong></td><td style="padding:0.75rem">最优</td><td style="padding:0.75rem">✅ 推荐，汇率最好</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem"><strong>银行ATM取现</strong></td><td style="padding:0.75rem">较好</td><td style="padding:0.75rem">✅ 用 Visa/Master 银行卡，按实时汇率</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem"><strong>支付宝/微信扫码</strong></td><td style="padding:0.75rem">实时汇率+小幅手续费</td><td style="padding:0.75rem">✅ 便捷，适合大商场</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem"><strong>机场换汇</strong></td><td style="padding:0.75rem">较差</td><td style="padding:0.75rem">❌ 汇率差，仅换少量应急</td></tr>
</table>

<p><strong>实用建议：</strong> 入境时先换 RM100-200 的现金（够用2-3天的小吃和 Grab 费用），其余在市区换汇店用人民币现钞换取，汇率明显更优。</p>

<h2>信用卡在新山好用吗？</h2>
<p>VISA 和 Mastercard 在购物中心和连锁店普遍接受。建议携带一张无境外手续费的信用卡作为备用。银联卡在部分商场和银行柜台也可使用，但覆盖面不如前两者广。</p>

<h2>住宿推荐</h2>
<p><a href="/zh/rooms">彩虹胶囊旅馆</a>接受网上银行转账和 WhatsApp 直接预订，方便中国游客操作。每晚 RM35起，约合人民币 55-65 元。<a href="/book">点击预订</a>或 WhatsApp 联系 +60 12-708 8789。</p>
`,
		},
		// 20
		{
			Slug:          "xinshan-gouwu-gonglue-zhongguo-youke-2026",
			Title:         "新山购物完全攻略 2026｜中国游客必逛！比国内便宜多少？",
			Excerpt:       "新山购物比新加坡便宜40%，比国内还有价格优势！本文盘点最值得逛的商场、必买清单、讲价技巧，以及从彩虹旅馆出发的最佳路线。",
			Date:          "2026-04-14",
			Category:      "旅游攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"中国游客", "新山购物", "马来西亚购物", "柔佛", "攻略", "AEON"},
			FeaturedImage: "/images/blog/xinshan-gouwu-gonglue-zhongguo-youke-2026.webp",
			ImageAlt:      "新山 City Square 购物商场内部",
			InLanguage:    "zh-CN",
			Content: `
<h2>为什么中国游客要来新山购物？</h2>
<p>新山（Johor Bahru）紧邻新加坡，却拥有马来西亚的物价水平——这意味着同款商品，比新加坡便宜 30-50%，部分进口保健品和奢侈品价格也比国内更具吸引力。加上中国护照赴马来西亚30天免签，越来越多的中国游客把新山纳入东南亚行程，专程来购物。</p>

<h2>必逛购物商场</h2>

<h3>1. AEON Tebrau City — 综合型大商场</h3>
<p>新山最大的购物中心之一，品牌齐全，超市面积庞大。适合采购：</p>
<ul>
  <li><strong>马来西亚特产零食</strong>：老干妈、Myojo 泡面、Munchy's 饼干等品牌价格约为国内1/2</li>
  <li><strong>保健品</strong>：Blackmores、Swisse、Shaklee 等澳洲/美国品牌，比国内便宜20-40%</li>
  <li><strong>日用品</strong>：洗发水、护肤品、婴儿用品，价格实惠</li>
</ul>
<p>从彩虹胶囊旅馆乘 Grab 约 8-12 分钟（RM8-12）。</p>

<h3>2. Paradigm Mall JB — 时尚购物</h3>
<p>定位偏年轻时尚，品牌包括 Uniqlo、H&amp;M、Cotton On、Charles &amp; Keith 等，价格比新加坡便宜约30%，比国内也有优势。</p>
<ul>
  <li><strong>Uniqlo</strong>：RM59-199（约人民币 100-350 元），尤其是联名款和功能性内衣</li>
  <li><strong>Charles &amp; Keith 包包</strong>：比新加坡便宜约 20-30%</li>
</ul>

<h3>3. KSL City Mall — 电子产品 + 平价服装</h3>
<p>靠近新山市中心，以电子产品和平价服装著称。这里有大量本地手机配件店，价格极为便宜。如需购买充电线、数据线、手机壳等，KSL 是首选。</p>

<h3>4. Johor Premium Outlets (JPO) — 奥特莱斯折扣购物</h3>
<p>距市区约20分钟车程，汇聚 Coach、Michael Kors、Kate Spade、Polo Ralph Lauren 等大牌折扣门店，折扣通常在30-70%。对于喜欢轻奢品牌的游客，JPO 是不可错过的目的地。</p>
<p>从彩虹旅馆乘 Grab 约 25-35 分钟（RM20-30）。</p>

<h2>中国游客必买清单</h2>

<h3>🧴 保健品 / 保养品</h3>
<ul>
  <li>Blackmores / Swisse 系列维生素（比国内便宜30-50%）</li>
  <li>燕窝、蜂蜜（马来西亚特产，品质优）</li>
  <li>Cosrx、Some By Mi 韩国护肤品（比国内代购价低）</li>
</ul>

<h3>🍫 零食 / 手信</h3>
<ul>
  <li>Beryl's 巧克力（马来西亚本土品牌，品质不输进口）</li>
  <li>Old Town White Coffee 白咖啡（机场版贵，超市购买最划算）</li>
  <li>EQ 榴莲饼干、Mamee 泡面、Tiger 啤酒（送人亲友必备）</li>
  <li>马来西亚辣椒酱、椰糖、班兰叶精华</li>
</ul>

<h3>👗 服装 / 配件</h3>
<ul>
  <li>Uniqlo 功能性衣物（东南亚版本有独家款式）</li>
  <li>Charles &amp; Keith、Pedro 包鞋</li>
  <li>本地设计师品牌，价格亲民且有特色</li>
</ul>

<h2>讲价技巧</h2>
<p>马来西亚大商场标价固定，不能讲价。但在以下场所可以试试：</p>
<ul>
  <li><strong>夜市摊位</strong>：购买多件时可询问"可以便宜点吗？"（Can discount?）</li>
  <li><strong>电子产品小店</strong>：KSL 或旧街场的独立小店通常有议价空间</li>
  <li><strong>换汇店</strong>：换大额（RM500以上）时可询问更优惠汇率</li>
</ul>

<h2>从彩虹旅馆出发的购物路线</h2>
<p>住在<a href="/zh/rooms">彩虹胶囊旅馆</a>（Taman Pelangi）的最优购物路线建议：</p>
<ul>
  <li><strong>上午</strong>：Grab 前往 AEON Tebrau City（约10分钟），超市扫货 + 品牌购物</li>
  <li><strong>午餐</strong>：在商场美食广场解决，约RM15-25</li>
  <li><strong>下午</strong>：Grab 转至 Paradigm Mall 或 KSL（约15分钟），时装 + 电子产品</li>
  <li><strong>傍晚</strong>：返回旅馆，步行至 Taman Pelangi 夜市（周二）扫最后一批零食</li>
</ul>

<h2>行李超重怎么办？</h2>
<p>购物太多行李超重是常见问题！解决方案：</p>
<ul>
  <li>在旅馆附近寄送：马来西亚 Pos Laju 或 J&amp;T Express 可寄国际包裹</li>
  <li>提前在航空公司官网购买额外行李额（比机场便宜50%）</li>
  <li>带一个可折叠的备用行李袋（旅馆有推荐本地文具店）</li>
</ul>

<p>准备好购物了吗？<a href="/zh/rooms">预订彩虹胶囊旅馆</a>，RM35/晚起，步行即达夜市，Grab 直达各大商场。<a href="/book">立即预订</a>或 WhatsApp：+60 12-708 8789。</p>
`,
		},
		// 21
		{
			Slug:          "xinshan-zhongguo-youke-bichi-mishi-gonglue",
			Title:         "中国游客在新山必吃什么？清真与非清真美食完全指南",
			Excerpt:       "马来西亚是美食天堂，但清真（Halal）规定让部分中国游客摸不着头脑。本文教你如何分辨，以及中国游客最爱的新山美食推荐。",
			Date:          "2026-04-14",
			Category:      "住宿指南",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"中国游客", "新山美食", "清真美食", "马来西亚饮食", "柔佛", "吃喝攻略"},
			FeaturedImage: "/images/blog/xinshan-zhongguo-youke-bichi-mishi-gonglue.webp",
			ImageAlt:      "马来沙爹在炭火上烧烤，清真美食的代表之一",
			InLanguage:    "zh-CN",
			Content: `
<h2>中国游客在新山吃饭：你需要了解的基本知识</h2>
<p>马来西亚是多元文化融合的美食天堂，但"清真"（Halal）这个概念可能让初次到访的中国游客感到困惑。别担心——新山有大量<strong>非清真华人餐厅</strong>，肉骨茶、烧腊、猪肉炒粉一样都少不了。同时，清真美食的品质也极高，绝对值得尝试。本文帮你理清楚，按自己的饮食习惯放心吃。</p>

<h2>清真（Halal）vs 非清真：怎么分辨？</h2>

<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:#f5f5f5"><th style="text-align:left;padding:0.75rem;border:1px solid #ddd">特征</th><th style="padding:0.75rem;border:1px solid #ddd">清真餐厅</th><th style="padding:0.75rem;border:1px solid #ddd">华人非清真餐厅</th></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">门口标志</td><td style="padding:0.75rem">Halal 认证标志（JAKIM）</td><td style="padding:0.75rem">无 Halal 标志；可能有猪肉/烧腊图片</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">猪肉</td><td style="padding:0.75rem">无猪肉</td><td style="padding:0.75rem">有猪肉菜肴</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">酒精</td><td style="padding:0.75rem">不提供酒精饮料</td><td style="padding:0.75rem">通常有啤酒</td></tr>
<tr style="border:1px solid #ddd"><td style="padding:0.75rem">经营者</td><td style="padding:0.75rem">通常为马来人或穆斯林</td><td style="padding:0.75rem">通常为华人</td></tr>
</table>

<p><strong>实用技巧：</strong> 看店名和招牌就能大致判断。带"汤"、"茶"、"粉"等中文字的路边档通常是华人经营；带"Nasi"、"Mamak"字样的多为清真。</p>

<h2>中国游客最爱：华人非清真美食</h2>

<h3>🥩 肉骨茶（Bak Kut Teh）</h3>
<p>用猪排骨加药材熬制的浓汤，是新山华人早餐和宵夜的经典。新山版本偏干（干茶），药材香浓，与其他地区不同。一碗约 RM15-20，配白米饭和油条，非常满足。</p>
<p><strong>推荐：</strong> 旅馆附近的 Taman Pelangi 有几家老字号肉骨茶，步行5-10分钟可达。</p>

<h3>🦞 海鲜大排档</h3>
<p>新山靠海，海鲜新鲜且价格实惠。螃蟹、虾、蚝、鱿鱼按市价计算，通常比广州、上海便宜30-50%。旅馆附近的三楼米粉（San Low Bee Hoon）也是附近居民极力推荐的本地名店。</p>

<h3>🍜 炒粿条 / 福建面</h3>
<p>炒粿条是马来西亚华人最具代表性的炒面之一，镬气大火翻炒，配虾、蚶和豆芽。新山版本比槟城更咸香，适合重口味食客。</p>

<h3>🫕 云吞面</h3>
<p>以猪肉虾云吞配弹性幼面，干捞或汤版均有。价格 RM8-15，是快速解决一餐的好选择。</p>

<h2>值得尝试的清真美食</h2>

<h3>🥘 印度煎饼（Roti Canai）</h3>
<p>马来西亚最著名的早餐，薄脆酥香的手拉饼配咖喱蘸酱，一份约 RM2-3。来到马来西亚不尝印度煎饼，等于没来过！</p>

<h3>🍛 椰浆饭（Nasi Lemak）</h3>
<p>椰汁炊的香米配上参巴辣椒酱、江鱼仔、花生、黄瓜和半熟蛋，马来西亚国民早餐。华人版通常加炸鸡，分量更足，约 RM5-8。</p>

<h3>🧆 沙爹（Satay）</h3>
<p>炭烤鸡肉或牛肉串，配花生酱蘸食，是夜市摊位必点小吃。每串约 RM1-2，多买多便宜。</p>

<h3>🍢 路路（Lok Lok）</h3>
<p>类似国内麻辣烫的街边小吃：各种食材串签放入沸腾汤锅中烫熟，配酱料食用。每串 RM1-2，边走边吃，是夜市定番。</p>

<h2>中国游客在新山吃饭实用贴士</h2>
<ul>
  <li><strong>语言</strong>：新山华人众多，大部分餐厅老板能说普通话或广东话，沟通无障碍</li>
  <li><strong>付款</strong>：夜市和路边小摊只收现金（RM），商场内可用支付宝/微信扫码</li>
  <li><strong>辣度</strong>：点菜时说"少辣"或"不辣"（马来语："kurang pedas" / "tidak pedas"）即可</li>
  <li><strong>水</strong>：路边摊的饮用水安全可靠；避免点冰饮（sensitive 肠胃者）</li>
  <li><strong>时间</strong>：夜市通常从傍晚6点到深夜，正餐时间（12-2pm、6-9pm）人多需等位</li>
</ul>

<h2>从彩虹旅馆出发的美食探索</h2>
<p>住在<a href="/zh/rooms">彩虹胶囊旅馆（Taman Pelangi）</a>，美食就在门口：</p>
<ul>
  <li>步行5分钟：肉骨茶、炒粿条、云吞面早餐选择</li>
  <li>步行10分钟：Taman Pelangi / Taman Sentosa 夜市（周二、周四）</li>
  <li>步行8分钟：San Low 海鲜大排档（本地人最爱，外国游客必访）</li>
  <li>Grab 8分钟：新山著名印度煎饼老店</li>
</ul>

<p>饿了吗？先<a href="/book">预订旅馆</a>，再来新山大吃特吃！WhatsApp 联系：+60 12-708 8789。</p>
`,
		},
		// 22
		{
			Slug:          "getting-around-johor-bahru-no-car-guide",
			LastModified:  "2026-06-26",
			ImageAlt:      "Larkin Bus Terminal in Johor Bahru, a hub for local and regional buses",
			Title:         "Getting Around Johor Bahru Without a Car — Transport Guide for Backpackers",
			Excerpt:       "Master JB transport on a budget: Grab (RM5–15), Rapid JB buses (RM1–3), walking Taman Pelangi, and crossing to Singapore. Complete price comparison.",
			Date:          "2026-04-14",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "transport", "backpacker", "budget-travel", "grab", "bus", "getting-around"},
			FeaturedImage: "/images/blog/getting-around-johor-bahru-no-car-guide.webp",
			Content: `
<h2>Getting Around JB Without a Car</h2>
<p>You don't need a car in JB. You have Grab, buses, walking, and cross-border rides to Singapore — all on a backpacker budget.</p>

<h2>Grab: Fast and Flexible (RM5–15)</h2>
<p><strong>Grab</strong> is the fastest way to move around JB. Download the app, enter your destination, and a driver arrives in 3–5 minutes. Prices are predictable and surge only during peak hours (lunch and evening rush).</p>
<ul>
  <li><strong>Short rides (2–3 km):</strong> RM5–8 (e.g., Taman Pelangi to Aeon Tebrau)</li>
  <li><strong>Medium rides (5–7 km):</strong> RM10–15 (e.g., hostel to JB Sentral or Danga Bay)</li>
  <li><strong>Long rides (10+ km):</strong> RM20–35 (e.g., to Desaru beach, one-way)</li>
</ul>
<p>Peak hour surge: Expect 1.2–1.5x multiplier on lunch (12–2 pm) and evening (5–8 pm) rides. Early morning (7–9 am) rides are cheapest.</p>

<h2>Rapid JB Buses: Cheapest Option (RM1–3)</h2>
<p><strong>Rapid JB</strong> is the city's public bus network. Buses are air-conditioned, reliable, and cost a fraction of Grab. Download the Rapid JB app or buy a physical card at any station.</p>
<ul>
  <li><strong>Taman Pelangi to City Centre:</strong> Routes 2M, 13A — RM2, 20 minutes</li>
  <li><strong>Hostel to Aeon Tebrau:</strong> Route 5 — RM3, 25 minutes</li>
  <li><strong>Hostel to JB Sentral:</strong> Route 2A — RM2.50, 30 minutes</li>
  <li><strong>Single journey card:</strong> RM1 minimum; load credit for discounts</li>
</ul>
<p>Buses run 6 am–11 pm. Peak hours (8–9 am, 5–7 pm) are crowded but reliable. Use Google Maps or the Rapid JB app to plan routes.</p>

<h2>Walking: Taman Pelangi Is a Walkable Neighbourhood</h2>
<p>If you're staying at Pelangi Capsule, you're in luck. Taman Pelangi is dense with hawker centres, food stalls, and shops. Walk 10 minutes in any direction and you'll find breakfast, lunch, dinner, and coffee.</p>
<ul>
  <li><strong>Nearby hawker centres:</strong> Sik Bao Sin, Taman Sentosa food stalls — 5–10 min walks</li>
  <li><strong>Supermarkets:</strong> Aeon BigExtra (15 min walk), Tesco (20 min walk)</li>
  <li><strong>Night market:</strong> Taman Sentosa pasar malam (Thurs, Sun) — 10 min walk</li>
</ul>
<p>Walking is free, you get to know the neighbourhood, and you'll stumble upon local spots tourists miss. JB is flat, so walking is comfortable year-round (though midday heat is intense).</p>

<h2>Crossing to Singapore: Budget Buses and Grab</h2>
<p>Day-tripping to Singapore from JB is popular and affordable. Options:</p>
<ul>
  <li><strong>Rapid JB to Larkin Terminal:</strong> Take Rapid JB bus to Larkin Bus Terminal → Bus to Woodlands Checkpoint (SGD2–3) → MRT into Singapore city</li>
  <li><strong>Grab to border:</strong> Grab to Malaysia-side checkpoint (RM8–12) → Walk through immigration → Grab in Singapore (SGD8–15)</li>
  <li><strong>Cross-border bus:</strong> Causeway Link or SBS Transit buses (SGD2–4) from JB Sentral to Singapore</li>
</ul>
<p><strong>Tip:</strong> Weekday mornings (before 10 am) have the shortest border wait times. Friday evenings and Sundays are packed; expect 1–2 hour delays.</p>

<h2>Transport Price Comparison Table</h2>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:#f0f0f0">
<th style="text-align:left;padding:0.75rem;border:1px solid #ddd"><strong>Trip</strong></th>
<th style="padding:0.75rem;border:1px solid #ddd"><strong>Grab</strong></th>
<th style="padding:0.75rem;border:1px solid #ddd"><strong>Bus</strong></th>
<th style="padding:0.75rem;border:1px solid #ddd"><strong>Time</strong></th>
</tr>
<tr style="border:1px solid #ddd">
<td style="padding:0.75rem"><strong>Pelangi → Aeon Tebrau</strong></td>
<td style="padding:0.75rem">RM8–10</td>
<td style="padding:0.75rem">RM2–3</td>
<td style="padding:0.75rem">5 min / 25 min</td>
</tr>
<tr style="border:1px solid #ddd">
<td style="padding:0.75rem"><strong>Pelangi → JB Sentral</strong></td>
<td style="padding:0.75rem">RM12–15</td>
<td style="padding:0.75rem">RM2.50</td>
<td style="padding:0.75rem">10 min / 30 min</td>
</tr>
<tr style="border:1px solid #ddd">
<td style="padding:0.75rem"><strong>Pelangi → Danga Bay</strong></td>
<td style="padding:0.75rem">RM15–20</td>
<td style="padding:0.75rem">RM3–4</td>
<td style="padding:0.75rem">15 min / 40 min</td>
</tr>
<tr style="border:1px solid #ddd">
<td style="padding:0.75rem"><strong>JB → Singapore (Grab)</strong></td>
<td style="padding:0.75rem">SGD8–15</td>
<td style="padding:0.75rem">SGD2–4</td>
<td style="padding:0.75rem">20 min / 45 min</td>
</tr>
</table>

<h2>Pro Tips</h2>
<ul>
  <li><strong>Bus card:</strong> Load RM20–50 for 10–15% savings vs. single journeys.</li>
  <li><strong>Off-peak rides:</strong> Travel 10–11 am or 3–4 pm to save RM5–10 vs. rush hours.</li>
  <li><strong>Ask locals:</strong> Hostel staff know shortcuts and hidden food spots.</li>
</ul>

<h2>Bottom Line</h2>
<p>JB is one of Southeast Asia's most affordable cities to navigate. A day of transport — two Grab rides plus meals — costs under RM30. Many backpackers never need a car. Buses are reliable, Grab is cheap, and walking Taman Pelangi connects you to everything. Stay at <a href="/book">Pelangi Capsule Hostel</a>, grab a Rapid JB card, and explore JB like a pro.</p>
`,
		},
		// 23
		{
			Slug:          "laksa-johor-guide-best-places-to-eat",
			Title:         "Laksa Johor Guide — Authentic Dish, Where to Eat, and What Makes It Unique (2026)",
			Excerpt:       "Deep-dive guide on Laksa Johor—a creamy coconut-based noodle dish unique to Johor. Covers history, what makes it different from other laksa variants, and the best stalls in JB.",
			Date:          "2026-04-15",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"food", "johor", "specialty-dish", "jb-guide"},
			FeaturedImage: "/images/blog/laksa-johor-guide.webp",
			Content: `
<h2>What Is Laksa Johor?</h2>
<p><strong>Laksa Johor</strong> is a creamy coconut-based noodle soup unique to the state of Johor. Unlike laksa from other regions in Malaysia (Laksa Lemak from KL, Laksa Penang, Laksa Sarawak), Laksa Johor uses thick spaghetti noodles instead of rice noodles, giving it a distinctly different texture and mouthfeel. The broth is rich, aromatic, and infused with fish, coconut milk, and spices — making it one of the most indulgent noodle dishes in Malaysia.</p>
<p>It's a fiercely regional dish. Walk into a hawker centre in Johor Bahru and locals will defend their stall's laksa recipe with pride. For visitors staying at <a href="/rooms">Pelangi Capsule Hostel</a>, tasting an authentic bowl of Laksa Johor is non-negotiable.</p>

<h2>Key Ingredients That Make It Special</h2>
<ul>
  <li><strong>Thick spaghetti noodles:</strong> Not rice noodles. The thickness absorbs the broth and provides a satisfying chew.</li>
  <li><strong>Coconut milk (santan):</strong> The base that makes Laksa Johor creamy and rich. Often 2–3 cups per pot.</li>
  <li><strong>Fresh fish or fish paste:</strong> Adds depth and umami. Some stalls use ikan kembung (mackerel), others use salted fish.</li>
  <li><strong>Bean sprouts:</strong> Fresh and crunchy, a crucial contrast to the soft noodles and creamy broth.</li>
  <li><strong>Hard-boiled eggs:</strong> Halved and placed on top, adds richness and protein.</li>
  <li><strong>Sambal (chilli paste):</strong> Served on the side, added to taste for heat and punch.</li>
  <li><strong>Aromatic spices:</strong> Turmeric, galangal, shallots, garlic, lemongrass — ground into a paste (rempah).</li>
  <li><strong>Fish cake or tau pok (fried tofu):</strong> Optional toppings that absorb the broth.</li>
</ul>

<h2>Top Stalls to Try in Johor Bahru</h2>
<p><strong>1. Laksa Auntie Nur — Taman Pelangi</strong><br>Family-run stall operating for 20+ years. Laksa served in a generous bowl with extra toppings. Known for thick, creamy broth and generous portions. Budget: RM8–10 per bowl.</p>

<p><strong>2. Laksa Johor Larkin — Larkin Terminal</strong><br>Popular spot near the bus terminal; serves commuters and tourists daily. Quick service, consistent quality. Broth is balanced between rich and not overpowering. Budget: RM7–9 per bowl.</p>

<p><strong>3. San Low Laksa — Taman Sentosa</strong><br>Modern kopitiam with laksa as a speciality. Cleaner environment than traditional hawker stalls, slightly pricier but excellent quality. Allows customization (spice level, extra toppings). Budget: RM10–12 per bowl.</p>

<p><strong>4. Laksa Mak Cik — Jalan Wong Ah Fook</strong><br>Street stall in downtown JB, minimal seating, authentic old-school vibe. Broth made fresh daily. Worth the hunt if you want the "real deal." Budget: RM6–8 per bowl.</p>

<p><strong>5. Laksa Ayah Wan — Danga Bay</strong><br>Slightly upscale but still hawker-style. Uses premium fish and generous amounts of coconut milk. Good for groups. Budget: RM9–11 per bowl.</p>

<h2>How to Order and Eat Laksa Johor</h2>
<p>Walk up to the stall and say "Satu Laksa" (one Laksa) or "Dua Laksa" (two). Specify if you want extra toppings or less sambal. The aunty will ladle hot broth over spaghetti noodles, top with bean sprouts, egg halves, and fish cake, then hand you a bowl. Sambal comes on the side in a small container.</p>
<p><strong>Eating etiquette:</strong> Slurp loudly (it's expected and helps cool the noodles). Mix the sambal into the broth gradually—taste as you go. Most locals finish the broth at the end, drinking it directly from the bowl for every last drop of flavour. It's a complete eating experience, not just a meal.</p>

<h2>FAQ: Is Laksa Johor Different From Laksa Lemak?</h2>
<p><strong>Q: What's the main difference between Laksa Johor and Laksa Lemak (KL laksa)?</strong></p>
<p><strong>A:</strong> Yes, they're distinctly different dishes:</p>
<ul>
  <li><strong>Noodles:</strong> Laksa Johor uses thick spaghetti; Laksa Lemak uses thin rice noodles.</li>
  <li><strong>Broth:</strong> Laksa Johor is heavier and more coconut-forward; Laksa Lemak is more balanced with more visible spices.</li>
  <li><strong>Fish content:</strong> Laksa Johor emphasizes fresh or salted fish; Laksa Lemak uses ground fish paste.</li>
  <li><strong>Texture:</strong> Laksa Johor is creamier and richer; Laksa Lemak is lighter and more delicate.</li>
  <li><strong>Regional pride:</strong> Johor locals consider Laksa Lemak a different (inferior) dish. Don't confuse them.</li>
</ul>

<p><strong>Q: Where should I try it first?</strong></p>
<p><strong>A:</strong> If staying at <a href="/rooms">Pelangi Capsule Hostel</a>, walk to Laksa Auntie Nur in Taman Pelangi—closest and most consistent. For a broader JB experience, visit Larkin Terminal stall during lunch hours (11am–2pm) when the broth is freshest.</p>

<p><strong>Q: Is it very spicy?</strong></p>
<p><strong>A:</strong> The broth itself is mild. Heat comes from the sambal paste served on the side. Add it gradually. Most stalls offer a milder version if you ask ("sedikit pedas" = a little spicy).</p>

<h2>When to Visit & Best Times</h2>
<p>Laksa Johor is available year-round but best during lunch (11am–2pm) and early dinner (5–7pm) when the broth is freshest. Many stalls close by 8–9pm. Weekday lunch is less crowded than weekends; come early to secure a seat at popular stalls.</p>

<h2>Next Steps</h2>
<p>Now that you know what to look for, <a href="/book">book a stay at Pelangi Capsule</a> and make Laksa Johor one of your first meals in the city. It's a dish that defines Johor's food culture.</p>
`,
		},
		// 24
		{
			Slug:          "mee-rebus-johor-bahru-guide",
			Title:         "Mee Rebus Johor — History, Best Stalls, and the Famous Haji Wahid Legacy (2026)",
			Excerpt:       "Explore Mee Rebus Johor, a thick sweet-savory gravy noodle with roots dating back to 1918. Discover what makes it unique compared to KL style, and where to find the legendary Haji Wahid stalls.",
			Date:          "2026-04-15",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"food", "johor", "specialty-dish", "heritage-food"},
			FeaturedImage: "/images/blog/mee-rebus-johor-guide.webp",
			Content: `
<h2>What Is Mee Rebus Johor?</h2>
<p><strong>Mee Rebus Johor</strong> is a comfort noodle dish unique to Johor—yellow egg noodles swimming in a thick, slightly sweet potato-based gravy infused with dried shrimp, garlic, and spices. Unlike Mee Rebus from Kuala Lumpur, which is spicier and uses a more watery gravy, the Johor version is creamier, richer, and distinctly sweet. The dish has roots tracing back to 1918 when Chinese immigrants blended Malay-inspired gravies with noodle cooking techniques, creating what locals now fiercely protect as a Johor heritage dish.</p>
<p>For backpackers and visitors staying at <a href="/rooms">Pelangi Capsule Hostel</a>, Mee Rebus is the ultimate late-night comfort meal—warming, affordable (RM6–9), and found at hawker stalls across the city.</p>

<h2>The Gravy That Makes It Special</h2>
<p>The soul of Mee Rebus Johor is its gravy, a complex blend that takes hours to perfect:</p>
<ul>
  <li><strong>Potato base:</strong> Boiled potatoes mashed into the gravy create its signature thickness and slight sweetness.</li>
  <li><strong>Dried shrimp & fish paste:</strong> Provides umami depth. Stalls often use salted fish or shrimp stock as the broth base.</li>
  <li><strong>Spice paste (rempah):</strong> Ground garlic, shallots, chilies, turmeric, and galangal create layers of flavor.</li>
  <li><strong>Sweet element:</strong> A pinch of sugar balances the spices—it's subtle, not dessert-like.</li>
  <li><strong>Toppings:</strong> Hard-boiled egg halves, tofu, bean sprouts, fried shallots, and boiled potato cubes sink into the gravy.</li>
</ul>

<h2>Mee Rebus JB vs. Mee Rebus KL — What's the Difference?</h2>
<p><strong>Johor Mee Rebus</strong> is creamier, thicker, and sweeter, with a focus on the potato's subtle sweetness and the umami from dried seafood. <strong>KL Mee Rebus</strong> is more assertively spicy, with a thinner, more chili-forward gravy. Johor locals debate passionately that theirs is the "authentic" version—a claim they back up by saying the dish originated in Johor's trading ports, not the capital. Choose a Johor stall and you're choosing heritage.</p>

<h2>Top 3 Stalls (Including Haji Wahid Legacy)</h2>
<p><strong>1. Haji Wahid — Jalan Tan Hiok Nee (Original Stall)</strong><br>The legend. Haji Wahid first opened in 1952, continuing a tradition rooted back to 1918. His family still runs the original stall; the gravy recipe is guarded and made fresh daily. Lines form at lunch and dinner. This is pilgrimage-level Mee Rebus. Budget: RM7–9 per bowl.</p>

<p><strong>2. Mee Rebus Haji Wahid (Branch) — Larkin Terminal</strong><br>A licensed branch operated by the Haji Wahid family. Same gravy quality as the original, with more seating. Ideal if you're catching a bus or prefer a less chaotic environment. Budget: RM7–9 per bowl.</p>

<p><strong>3. Mee Rebus Auntie Kim — Taman Pelangi Hawker Centre</strong><br>Just a 5-minute walk from <a href="/rooms">Pelangi Capsule Hostel</a>. Auntie Kim's version is slightly less sweet than Haji Wahid's, with a richer shrimp-forward gravy. Consistent quality, friendly service, and worth trying for comparison. Budget: RM6–8 per bowl.</p>

<h2>How to Order and Eat</h2>
<p>Say "Satu Mee Rebus" (one Mee Rebus) or "Dua" if ordering for two. Specify if you want extra egg or tofu. The aunty will ladle hot gravy over yellow noodles, top with boiled egg, tofu, bean sprouts, and fried shallots, then hand you a bowl. Grab a spoon and pair it with a sip of cold sugarcane juice or iced tea to balance the richness.</p>

<h2>Why Visit Pelangi Capsule to Try Mee Rebus?</h2>
<p>Pelangi Capsule sits in Taman Pelangi, home to some of Johor's best heritage Mee Rebus stalls. Stepping out your hostel door, you're minutes from comfort food that locals have eaten for generations. <a href="/book">Book a stay</a> and make Mee Rebus your first taste of Johor's food heritage.</p>
`,
		},
		// 25
		{
			Slug:          "best-roti-canai-johor-bahru-breakfast-guide",
			Title:         "Best Roti Canai in Johor Bahru — Breakfast Guide Near Taman Pelangi (2026)",
			Excerpt:       "5 top mamak stalls for roti canai within walking distance of Taman Pelangi. Price comparisons, opening hours, and a quick explainer on roti canai vs prata for Singaporean visitors.",
			Date:          "2026-04-15",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"food", "breakfast", "roti-canai", "taman-pelangi", "budget-food"},
			FeaturedImage: "/images/blog/best-roti-canai-johor-bahru.webp",
			Content: `
<h2>Roti Canai vs Prata — Same Dish, Different Name</h2>
<p>If you're crossing from Singapore, you already know <strong>prata</strong>. In Malaysia, the exact same flatbread is called <strong>roti canai</strong> (pronounced "cha-nai"). Same flaky, buttery dough, same technique — just a different name across the Causeway. One key difference: Malaysian roti canai is almost always cheaper (RM1–2 per piece vs SGD2–3 in Singapore) and served at open-air mamak stalls 24 hours a day. The dhal curry and fish curry sides are also richer and more generous in JB.</p>

<h2>5 Best Roti Canai Stalls Near Taman Pelangi</h2>
<p><strong>1. Restoran Selera Rakyat — Jalan Petrie (5 min walk)</strong><br>The closest mamak to Pelangi Capsule. Roti canai plain: RM1.20. Roti telur: RM2.00. Opens 6am–midnight daily. Best for early breakfast straight off the bus from Singapore.</p>

<p><strong>2. Restoran Kafe Taman Pelangi — Taman Pelangi (8 min walk)</strong><br>Neighborhood staple with reliable teh tarik. Roti canai plain: RM1.30. Roti bawang (onion): RM2.00. Opens 6:30am–11pm daily. Slightly crispier roti than most stalls.</p>

<p><strong>3. Restoran Kapitan — Jalan Wong Ah Fook (15 min walk / RM5 Grab)</strong><br>City-centre landmark mamak. Roti canai plain: RM1.50. Roti tissue: RM4.50. Opens 24 hours daily. Famous among late-night crowd and tourists. Best roti tissue in JB according to locals.</p>

<p><strong>4. Anjung Selera — Jalan Abdul Samad (12 min walk)</strong><br>Large hawker complex with multiple mamak stalls. Roti canai plain: RM1.20. Roti sardin: RM2.50. Opens 7am–10pm daily. Good for groups — plenty of seating and other food options.</p>

<p><strong>5. Restoran Hameediyah — Jalan Ibrahim (20 min walk / RM6 Grab)</strong><br>Heritage mamak near the old town. Roti canai plain: RM1.30. Roti cheese: RM3.00. Opens 7am–9pm (closed Friday lunch). Slower pace, old-school atmosphere, exceptional dhal curry.</p>

<h2>Price Comparison: JB vs Singapore</h2>
<table><tr><th>Item</th><th>JB (RM)</th><th>SGD equivalent</th><th>Singapore (SGD)</th></tr><tr><td>Roti canai plain</td><td>RM1.20–1.50</td><td>~SGD0.35–0.45</td><td>SGD1.50–2.00</td></tr><tr><td>Roti telur</td><td>RM2.00–2.50</td><td>~SGD0.60–0.75</td><td>SGD2.50–3.50</td></tr><tr><td>Teh tarik</td><td>RM2.00–2.50</td><td>~SGD0.60–0.75</td><td>SGD1.80–2.50</td></tr></table>
<p>You can eat a full roti canai breakfast with teh tarik for under RM5 (~SGD1.50) at any of these stalls.</p>

<h2>What to Order as a First-Timer</h2>
<p>Start with <strong>roti canai plain</strong> and ask for both dhal (lentil curry) and fish curry on the side. Add a glass of <strong>teh tarik</strong> (pulled milk tea). If you want something more filling, order <strong>roti telur</strong> (egg roti) — it's flipped on the griddle with a beaten egg inside, creating a heartier meal. Avoid "roti tissue" as a first meal — it's paper-thin and sweet, more dessert than breakfast.</p>

<h2>Best Time to Visit</h2>
<p>Go between 7–9am for the freshest roti — the dough is made in the morning and quality drops by midday at most stalls. Mamak stalls near Taman Pelangi are quieter on weekday mornings. Weekends get busy by 8:30am, especially at Selera Rakyat.</p>

<p>Staying at <a href="/rooms">Pelangi Capsule Hostel</a>? Walk to Restoran Selera Rakyat first — it's 5 minutes and opens at 6am, perfect if you're catching an early bus back to Singapore. <a href="/book">Book a room</a> and make roti canai your first JB meal.</p>
`,
		},
		// 26
		{
			Slug:          "taman-pelangi-johor-bahru-neighborhood-guide",
			Title:         "Taman Pelangi Neighborhood Guide: Food, Shops & Things to Do (2026)",
			Excerpt:       "The ultimate guide to Taman Pelangi, Johor Bahru. Discover the best food, shopping, and hidden gems within walking distance of Pelangi Capsule Hostel.",
			Date:          "2026-04-15",
			Category:      "Local Guide",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"taman-pelangi", "jb-neighborhood", "local-guide", "johor-bahru"},
			FeaturedImage: "/images/blog/taman-pelangi-neighborhood-guide.webp",
			Content: `
<h2>Getting Here</h2>
<p><strong>Taman Pelangi</strong> is a mature residential and commercial district in central Johor Bahru, about 3 km from JB Sentral. From Singapore: take the MRT to Woodlands, cross via Causeway Link bus (RM3.50), then a 10-minute Grab (~RM8) or bus 23/41 from the JB Sentral bus terminal directly to Taman Pelangi. From JB City Centre: 10-minute Grab (RM8–12) or a 25-minute walk via Jalan Abdul Samad.</p>

<h2>Where to Eat</h2>
<p><strong>Taman Pelangi Hawker Centre</strong> — The neighborhood's main food hub. Open daily 6am–10pm. Highlights: Mee Rebus Auntie Kim (legit old-school gravy), char kway teow, and fresh sugarcane juice. Budget RM5–10 per meal.</p>
<p><strong>Restoran Selera Rakyat</strong> — Best mamak for roti canai and teh tarik. Open 6am–midnight. Roti canai from RM1.20, teh tarik RM2.</p>
<p><strong>Jalan Kenanga Food Street</strong> — Evening street food strip with satay, grilled fish, and BBQ corn. Best after 6pm on weekends.</p>
<p><strong>99 Speedmart &amp; 7-Eleven</strong> — Both within 3 min walk for snacks, drinks, and top-ups around the clock.</p>

<h2>Shopping</h2>
<p><strong>Taman Pelangi Commercial Centre</strong> — Row of shophouses with pharmacies, hardware, convenience stores, and a few clothing boutiques. All walkable from the hostel.</p>
<p><strong>KSL City Mall</strong> — 15 min by Grab (~RM10). Full shopping mall with AEON, H&amp;M, and a food court. Good for groceries and electronics.</p>
<p><strong>Morning market (Pasar Taman Pelangi)</strong> — Saturdays 7–11am. Fresh produce, local snacks, and cheap household goods. A great slice of everyday JB life.</p>

<h2>Night Life</h2>
<p>Taman Pelangi is a quiet residential area — night life here is relaxed rather than loud. Local kopitiams stay open until midnight serving beer and snacks. For live music and bars, head to Jalan Dhoby or Jalan Ayer Molek (20 min by Grab). The nearest 24-hour mamak is Restoran Selera Rakyat — a JB tradition is to end the night with roti and teh tarik.</p>

<h2>Why Stay Here</h2>
<p><strong>Pelangi Capsule Hostel</strong> puts you at the heart of Taman Pelangi — walking distance from the hawker centre, mamak stalls, and the morning market. It's quieter than staying in the city centre but still 10 minutes from JB Sentral by Grab. If you want to experience Johor Bahru like a local rather than a tourist, Taman Pelangi is the right base. <a href="/rooms">Book a capsule</a> and explore the neighborhood on foot.</p>
`,
		},
		// 27
		{
			Slug:          "johor-premium-outlets-vs-singapore-malls-shopping-guide",
			Title:         "Johor Premium Outlets vs Singapore Outlet Malls: Where to Save More (2026)",
			Excerpt:       "Comparing JPO, IMM, and Changi City Point for Singaporeans planning a shopping trip. Brands, discounts, transport costs, and the honest answer to: is JPO worth the trip?",
			Date:          "2026-04-15",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"shopping", "jpo", "johor-premium-outlets", "singapore-shoppers"},
			FeaturedImage: "/images/blog/johor-premium-outlets.webp",
			Content: `
<h2>Quick Comparison: JPO vs Singapore Outlet Malls</h2>
<table>
  <thead><tr><th>Factor</th><th>JPO (Johor)</th><th>IMM / Changi City Point (SG)</th></tr></thead>
  <tbody>
    <tr><td>Premium Brands</td><td>Coach, Michael Kors, Kate Spade, Polo Ralph Lauren, Burberry</td><td>Mostly mid-range: Levi's, Bossini, Puma, Nike</td></tr>
    <tr><td>Discount Level</td><td>30–70% off RRP</td><td>10–40% off RRP</td></tr>
    <tr><td>Transport from Woodlands MRT</td><td>Causeway Link bus + Grab (~SGD7–10, 60–90 min)</td><td>MRT direct (SGD1.50–2.50, 15–30 min)</td></tr>
    <tr><td>Opening Hours</td><td>10am–10pm daily</td><td>10am–10pm daily</td></tr>
    <tr><td>Parking</td><td>Free (ample)</td><td>Paid (SGD2–5/hr)</td></tr>
  </tbody>
</table>

<h2>Johor Premium Outlets (JPO)</h2>
<p>JPO is Malaysia's first premium outlet centre with 130+ stores in an open-air village layout. Key brands: <strong>Coach, Michael Kors, Kate Spade, Polo Ralph Lauren, Bottega Veneta, Nike, Adidas, Samsonite</strong>. Discounts run 30–70% below regular retail. The Nike and Adidas stores are consistently well-stocked for footwear. JPO is in Indahpura, Kulai — 40 km north of the Causeway. Best for big-ticket branded purchases.</p>

<h2>Singapore Outlet Malls: IMM & Changi City Point</h2>
<p><strong>IMM (Jurong)</strong> is Singapore's largest outlet mall with 90+ stores. Good for mid-range brands but limited premium label depth. <strong>Changi City Point</strong> has a smaller outlet section — convenient for airport shoppers but not a full outlet experience. Both are MRT-accessible with no border crossing.</p>

<h2>Getting to JPO from Singapore</h2>
<p>Take MRT to <strong>Woodlands MRT (NS9)</strong>, then board <strong>Causeway Link CW2 express bus</strong> directly to JPO (departs from Queen Street or Woodlands). Journey: 60–90 min including customs. Cost: SGD4–5 one way. Alternatively, book a private shuttle from Bugis or Woodlands.</p>
<p>Staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi? JPO is just 30 min by Grab (~RM30) — far faster than traveling from Singapore.</p>

<h2>FAQ: Is It Worth Going to JPO?</h2>
<p><strong>Q: Is JPO better than IMM for branded goods?</strong><br/>Yes — JPO carries premium Western labels at 30–70% off. IMM is more accessible but lacks luxury brand depth.</p>
<p><strong>Q: How much should I budget for transport from Singapore?</strong><br/>SGD8–12 return (Causeway Link bus + Grab from JB Sentral). Add 1 hour per crossing for customs.</p>
<p><strong>Q: What are JPO's opening hours?</strong><br/>Daily 10am–10pm. Most stores are open year-round; some may close on Malaysian public holidays.</p>
<p><strong>Q: Is JPO cheaper than airport duty-free for bags?</strong><br/>Often yes — Coach and Kate Spade outlet prices at JPO (40–60% off) typically beat airport duty-free pricing.</p>
<p><strong>Q: Is JPO worth the trip for just one item?</strong><br/>For 2+ premium purchases, the savings easily cover transport. For a single small item, the 3+ hour round trip may not be worth it unless you combine with other JB activities.</p>

<p>Planning a JPO shopping day? <a href="/book">Stay at Pelangi Capsule Hostel</a> the night before — skip the morning Causeway rush and reach JPO at opening time.</p>
`,
		},
		// 28
		{
			Slug:          "cheap-eats-johor-bahru-under-rm10-budget-guide",
			Title:         "15 Cheap Eats in Johor Bahru Under RM10 - Budget Food Guide (2026)",
			Excerpt:       "Complete list of the best budget-friendly dishes in Johor Bahru, from hawker stalls to kopitiam classics — all under RM10. Perfect for backpackers.",
			Date:          "2026-04-15",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"budget-food", "cheap-eats", "johor-bahru", "hawker-food"},
			FeaturedImage: "/images/blog/jb-cheap-eats.webp",
			Content: `
<h2>Food in JB vs Singapore: The Price Difference</h2>
<p>A full meal in Singapore's hawker centres costs SGD5–8 (RM17–27). Cross the Causeway into Johor Bahru, and that same meal costs RM5–8 (SGD1.50–2.50). For budget travellers, the food price difference alone makes JB worth a visit — but the quality is just as good. Here are 15 authentic, delicious, and absurdly cheap dishes you can find throughout JB, all under RM10.</p>

<h2>15 Cheap Eats Under RM10</h2>
<ul>
  <li><strong>Nasi Lemak (RM3–5)</strong> — Coconut rice with sambal, fried anchovies, peanuts, egg. Find it at Taman Pelangi Hawker Centre or any morning market.</li>
  <li><strong>Mee Rebus (RM4–6)</strong> — Yellow noodles in thick potato gravy, topped with egg and fried shallots. Signature dish at Taman Pelangi Hawker Centre.</li>
  <li><strong>Roti Canai + Teh Tarik (RM3–4)</strong> — Flaky flatbread + pulled milk tea. Available at any mamak shop. Restoran Selera Rakyat is a local favourite.</li>
  <li><strong>Char Kway Teow (RM5–7)</strong> — Flat rice noodles with soy sauce, seafood, and egg. Best at Taman Pelangi Hawker Centre during lunch.</li>
  <li><strong>Laksa Johor (RM6–8)</strong> — Spaghetti noodles in rich fish curry. A Johorean specialty with loyal locals. Try any hawker centre lunch crowd.</li>
  <li><strong>Satay Sticks (RM0.60 per stick)</strong> — Grilled meat skewers with peanut dipping sauce. Night markets and street vendors. Buy 5–10 sticks for RM3–6.</li>
  <li><strong>Lok Lok (RM1–2 per stick)</strong> — Meats and vegetables dipped in boiling broth. Night markets (Taman Sentosa every Thursday &amp; Sunday). Budget RM10–15 for a feast.</li>
  <li><strong>Otak-Otak (RM1–2 per piece)</strong> — Spiced fish paste grilled in banana leaf. Roadside vendors near hawker centres. Grab 5 pieces for RM5–7.</li>
  <li><strong>Nasi Kuning (RM4–6)</strong> — Fragrant turmeric rice with chicken and sambal. Available at Taman Pelangi Hawker Centre and morning markets.</li>
  <li><strong>Kuih-Muih (RM0.50–1 per piece)</strong> — Bite-sized Malay cakes and sweets. Morning markets (Taman Pelangi every Saturday 7–11am). Kuih lapis, ondeh-ondeh, and sticky rice specialties.</li>
  <li><strong>Cendol (RM3–4)</strong> — Shaved ice, green rice flour jelly, palm sugar syrup, and coconut milk. Perfect for hot afternoons. Hawker centres year-round.</li>
  <li><strong>Sugarcane Juice (RM3–4)</strong> — Fresh-pressed sugarcane, no added sugar. Street vendors near hawker centres. Drink immediately for best taste.</li>
  <li><strong>Chicken Rice (RM5–7)</strong> — Steamed or roasted chicken on rice with ginger paste and soy sauce. Every hawker centre lunch service.</li>
  <li><strong>Fish Ball Noodle Soup (RM5–6)</strong> — Silky noodles in mild broth with fish balls and greens. Comfort food staple at lunch-time hawker centres.</li>
  <li><strong>Rojak (RM4–5)</strong> — Fruit and vegetable fritters with sweet peanut dipping sauce. Pasar Karat (Sunday mornings) and night markets.</li>
</ul>

<h2>Best Places to Eat Cheap</h2>
<p><strong>Taman Pelangi Hawker Centre</strong> — The hub for lunch (11am–2pm) and dinner (6–9pm). Dozens of stalls, fresh food, loud and authentic.</p>
<p><strong>Taman Sentosa Night Market</strong> — Thursday and Sunday evenings. Best for satay, lok-lok, grilled corn, and casual street eating.</p>
<p><strong>Any Mamak Shop</strong> — Open early morning and late night. Roti canai, teh tarik, and comfort food staples.</p>
<p><strong>Morning Markets (Pasar)</strong> — Saturday mornings in Taman Pelangi. Fresh-cooked dishes and local snacks from 7–11am.</p>

<h2>Budget Breakdown</h2>
<p>A full day of eating in JB: breakfast (RM5) + lunch (RM7) + snack (RM4) + dinner (RM8) = RM24. Add drinks and you're at RM28–30 for a day of eating. That's less than one restaurant meal in Singapore.</p>

<p>Ready to eat cheap and eat well? <a href="/book">Book a capsule at Pelangi</a> and dive into JB's food scene.</p>
`,
		},
		// 29
		{
			Slug:          "changi-airport-transit-budget-stay-johor-bahru",
			Title:         "Changi Airport Transit? Stay in Johor Bahru and Save Hundreds (2026)",
			Excerpt:       "Skip overpriced Changi airport hotels and stay in Johor Bahru for RM30-35/night instead. Here's exactly how to get there, what it costs, and why budget travellers are making the switch.",
			Date:          "2026-04-15",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "10 min read",
			Tags:          []string{"changi-airport", "singapore", "johor-bahru", "transit", "budget-travel", "airport-hotel-alternative", "malaysia"},
			FeaturedImage: "/images/blog/changi-airport-transit-jb.webp",
			AlternateZH: "zhangyi-jichang-zhongzhuan-xinshan-shengqian-zhinan",
			Content: `
<h2>The Changi Airport Hotel Problem</h2>
<p>You've got a long layover at Changi Airport. Maybe your connecting flight is tomorrow morning. Maybe you landed at midnight and your next leg doesn't leave until noon. Either way, you need somewhere to sleep.</p>
<p>So you search for hotels near Changi Airport. And then you close the tab.</p>
<p>The Crowne Plaza at Changi runs SGD250-350 per night. YOTEL, the "budget" capsule option inside the airport, charges SGD80-120 for a few hours. The Ambassador Transit Hotel? SGD70-90 for a 6-hour block. Even the cheapest airport-adjacent hotels on Booking.com start at SGD100+.</p>
<p>For a bed. For one night. When you're just passing through.</p>
<p>If you're a budget traveller, this math doesn't work. You're spending more on a transit sleep than on entire days in Southeast Asia. There's a city 90 minutes south where a clean capsule pod costs SGD10-13 per night, the food is incredible, and you actually get to explore a real place instead of staring at departure boards.</p>
<p>It's Johor Bahru.</p>
<h2>The JB Alternative: RM30-35 Per Night Instead of SGD150+</h2>
<p>Johor Bahru sits at the southern tip of Peninsular Malaysia, connected to Singapore by the Causeway. It's about 1.5 hours from Changi Airport by public transport, and prices are in a completely different league.</p>
<p>At <a href="/rooms">Pelangi Capsule Hostel</a>, a pod costs <strong>RM30/night on weekdays and RM35/night on weekends</strong> — Upper and Lower Deck (ground-level, no ladder) are the same price. That's roughly SGD9-11. Each pod comes with an LED reading light, USB charging port, and personal locker. The hostel is in Taman Pelangi, one of JB's best food neighbourhoods. Hawker centres and local restaurants are everywhere.</p>
<p>Think about it. One night at YOTEL Changi costs the same as <strong>three to four nights</strong> in a JB capsule. One night at the Crowne Plaza Changi equals <strong>a full week</strong> at Pelangi. And instead of sleeping in an airport terminal, you're sleeping in a real neighbourhood where a plate of chicken rice costs RM6 and the teh tarik flows freely.</p>
<p>Non-Malaysian guests pay an additional RM10/room/night tourism tax, so your all-in nightly cost is RM40-45 (SGD11-13). Still dirt cheap.</p>
<h2>How to Get from Changi Airport to Johor Bahru</h2>
<p>Three options, cheapest to most convenient.</p>
<h3>Option 1: Public Transport (SGD5, 1.5-2 hours)</h3>
<ol>
  <li><strong>Changi Airport to Kranji MRT:</strong> Take the East-West Line from Changi Airport station. Change at Tanah Merah. Ride to Kranji. ~50 minutes, ~SGD2.</li>
  <li><strong>Kranji to JB CIQ:</strong> CW1 (Causeway Link) bus, SGD1.50-2. Drops you at JB immigration.</li>
  <li><strong>JB CIQ to Pelangi Capsule:</strong> Grab, ~10 minutes, RM6-10.</li>
</ol>
<p><strong>Total cost:</strong> ~SGD5-6. <strong>Total time:</strong> 1.5-2 hours.</p>
<p>You can also take the Thomson-East Coast Line to Woodlands North, walk through Singapore immigration, then take CW1 across.</p>
<h3>Option 2: Direct Coach (SGD10-15, 1.5-2 hours)</h3>
<p><strong>Transtar</strong> and <strong>Causeway Link</strong> run coaches from Queen Street Bus Terminal (near Bugis) to JB Sentral every 15-30 minutes. Cost SGD10-15. Comfortable seats, aircon, driver handles border crossings.</p>
<p>For the full Causeway crossing guide, see <a href="/blog/singapore-to-jb-day-trip-causeway-guide">our complete guide</a>.</p>
<h3>Option 3: Grab or Private Transfer (SGD50-70, 1-1.5 hours)</h3>
<p>Cross-border Grab from Changi: SGD50-70. Private transfer on Klook/KKday: SGD60-80. Door-to-door. Best if splitting with 2-3 people.</p>
<h2>How to Get Back to Changi Airport</h2>
<p>Reverse the route. Key number: <strong>leave JB 3-4 hours before your flight</strong>.</p>
<ul>
  <li><strong>30-60 minutes:</strong> Immigration at Causeway</li>
  <li><strong>45-60 minutes:</strong> Transit from JB CIQ to Changi</li>
  <li><strong>60 minutes:</strong> Buffer + Changi check-in</li>
</ul>
<p>For a <strong>6:00 AM flight</strong>, leave by 2:00-2:30 AM. Grab runs 24/7; Causeway is empty at that hour.</p>
<h2>Cost Comparison: Changi Hotel vs. JB Stay</h2>
<table>
  <thead><tr><th>Expense</th><th>Changi Hotel (1 night)</th><th>JB Stay (1 night)</th></tr></thead>
  <tbody>
    <tr><td>Accommodation</td><td>SGD120</td><td>SGD9-11 (RM30-35)</td></tr>
    <tr><td>Tourism Tax</td><td>-</td><td>SGD3 (RM10)</td></tr>
    <tr><td>Transport (round trip)</td><td>SGD0</td><td>SGD10-12</td></tr>
    <tr><td>Meals (dinner + breakfast)</td><td>SGD25-40</td><td>SGD5-8</td></tr>
    <tr><td><strong>Total</strong></td><td><strong>SGD145-160</strong></td><td><strong>SGD28-36</strong></td></tr>
    <tr><td><strong>Savings</strong></td><td>-</td><td><strong>SGD110-130 saved</strong></td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>Duration</th><th>Changi Hotel</th><th>JB Stay</th><th>You Save</th></tr></thead>
  <tbody>
    <tr><td>1 night</td><td>SGD145-160</td><td>SGD28-36</td><td>~SGD120</td></tr>
    <tr><td>2 nights</td><td>SGD290-320</td><td>SGD44-60</td><td>~SGD245</td></tr>
    <tr><td>3 nights</td><td>SGD435-480</td><td>SGD60-84</td><td>~SGD370</td></tr>
  </tbody>
</table>
<h2>What to Do in JB While You Wait</h2>
<h3>Food Near the Hostel</h3>
<ul>
  <li><strong>San Low Seafood</strong> (5 min walk) — San Lou Bee Hoon. RM15-25.</li>
  <li><strong>IT Roo Cafe</strong> — kaya toast, soft-boiled eggs. Under RM8.</li>
  <li><strong>Restoran Hua Mui</strong> — Taman Pelangi institution since 1940s. Hainanese chicken chop. RM12-15.</li>
  <li><strong>Salahuddin Bakery</strong> — banana cake and curry puffs under RM5.</li>
</ul>
<h3>Quick JB Highlights</h3>
<ul>
  <li><strong>Tan Hiok Nee Street</strong> — heritage shophouses, indie cafes, street art. 10 min by Grab.</li>
  <li><strong>Night Markets</strong> — pasar malam on different nights. Satay RM0.60/stick.</li>
  <li><strong>KSL City Mall</strong> — aircon, food, cinema.</li>
  <li><strong>JPO</strong> — 30 min by Grab (RM20-25). Nike, Adidas, Coach at 30-70% off.</li>
</ul>
<h2>Practical Details</h2>
<ul>
  <li><strong>Check-in:</strong> 2:00 PM | <strong>Check-out:</strong> 12:00 PM</li>
  <li><strong>Address:</strong> 26A Jalan Perang, Taman Pelangi, 80400 JB. 10-min Grab from CIQ.</li>
  <li><strong>WiFi:</strong> Free. Network: pelangi capsule.</li>
  <li><strong>Currency:</strong> SGD1 ≈ RM3.40. Withdraw RM200-300 for 1-2 nights.</li>
  <li><strong>Immigration:</strong> Download Malaysia MDAC at imigresen-online.imi.gov.my. Saves time at counter.</li>
</ul>
<h2>Who This Works Best For</h2>
<ul>
  <li><strong>Long layovers (8+ hours)</strong> — time to get to JB, sleep, eat, and return.</li>
  <li><strong>Red-eye departures</strong> — spend afternoon in JB, have dinner, Grab to Changi at 9-10 PM.</li>
  <li><strong>Early arrivals</strong> — 24-hour gap? JB capsule + three meals = SGD30 total.</li>
  <li><strong>Budget travellers on long routes</strong> — JB turns a dead layover into a mini side trip.</li>
</ul>
<h2>The Bottom Line</h2>
<p>Changi is a great airport and an expensive place to sleep. If you have 8+ hours and you're watching your budget, JB is 90 minutes south, five times cheaper, and far more interesting than Terminal 3.</p>
<p><strong>Pods from RM30/night on weekdays, RM35/night on weekends — Upper and Lower Deck same price.</strong> <a href="/book">Book your pod at Pelangi Capsule Hostel</a> and turn your Changi layover into a budget win.</p>
`,
		},
		// 30
		{
			Slug:          "jb-budget-base-singapore-day-trips-save-money",
			Title:         "Use JB as Your Budget Base for Singapore Day Trips (2026 Guide)",
			Excerpt:       "Stay in Johor Bahru for RM30-35/night and day-trip into Singapore — save up to 70% on accommodation and food while seeing everything the city-state has to offer.",
			Date:          "2026-04-15",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "11 min read",
			Tags:          []string{"johor-bahru", "singapore", "day-trip", "budget-travel", "backpacker", "malaysia", "accommodation"},
			FeaturedImage: "/images/blog/jb-singapore-day-trip-base.webp",
			AlternateZH: "xinshan-zhu-xingjiapo-wan-yiri-you-shengqian-gonglue",
			Content: `
<h2>The Strategy: Sleep in JB, Explore Singapore</h2>
<p>Here's a travel hack Southeast Asia backpackers have used for years: stay in Johor Bahru, Malaysia, and day-trip into Singapore. The two cities are connected by a 1km causeway, and the price gap is enormous.</p>
<p>A dorm bed in Singapore costs SGD40-60 per night. A capsule pod at <a href="/rooms">Pelangi Capsule Hostel</a> costs RM30-35 per night — that's SGD9-11. You're saving SGD30-50 every single night just by sleeping 30 minutes further north.</p>
<p>Accommodation is only half of it. A plate of chicken rice in Singapore runs SGD5-7. The same dish in JB costs RM5-8 (SGD1.50-2.30). Over a 5-day trip, the savings add up to enough for an extra week of travel.</p>
<p>The causeway crossing takes 45-90 minutes depending on traffic. That's the trade-off: about an hour each way in exchange for cutting your daily budget by 60-70%.</p>
<h2>The Numbers: 5-Day Trip Comparison</h2>
<table>
  <thead><tr><th>Expense</th><th>Stay in Singapore</th><th>Stay in JB</th></tr></thead>
  <tbody>
    <tr><td><strong>Accommodation (5 nights)</strong></td><td>SGD200-300</td><td>RM175-225 / SGD50-65</td></tr>
    <tr><td><strong>Breakfast (5 days)</strong></td><td>SGD25-40</td><td>RM25-40 / SGD7-12</td></tr>
    <tr><td><strong>Lunch (5 days, SG both)</strong></td><td>SGD50-75</td><td>SGD50-75</td></tr>
    <tr><td><strong>Dinner (5 days)</strong></td><td>SGD75-125</td><td>RM40-75 / SGD12-22</td></tr>
    <tr><td><strong>SG internal transport</strong></td><td>SGD30-50</td><td>SGD30-50</td></tr>
    <tr><td><strong>Causeway crossing (return x3)</strong></td><td>SGD0</td><td>RM15-30 / SGD5-9</td></tr>
    <tr><td><strong>5-Day Total</strong></td><td><strong>SGD380-590</strong></td><td><strong>SGD154-233</strong></td></tr>
    <tr><td><strong>Savings</strong></td><td>—</td><td><strong>SGD226-357 (up to 60%)</strong></td></tr>
  </tbody>
</table>
<p>That covers a flight to Bali, three nights in Bangkok, or a week of meals in Vietnam.</p>
<p><strong>Note:</strong> Malaysia charges a Tourism Tax of RM10/room/night for foreign visitors.</p>
<h2>How the Causeway Commute Works</h2>
<h3>JB to Singapore (Morning)</h3>
<ol>
  <li>Grab ride to JB CIQ (RM8-12, 10-15 min)</li>
  <li>Clear Malaysian exit (auto-gates, 5-10 min)</li>
  <li>CW1 Causeway Link bus to Woodlands (RM2.50, 5-10 min)</li>
  <li>Clear Singapore entry — have SG Arrival Card ready (myica.ica.gov.sg)</li>
  <li>MRT North-South Line to city centre (30-40 min)</li>
</ol>
<h3>Timing Tips</h3>
<ul>
  <li><strong>Best times:</strong> Weekday mornings 8-10am, evenings before 6pm. Budget 45-60 min.</li>
  <li><strong>Avoid:</strong> Friday evenings, Sunday evenings, public holidays — 2-3 hour waits.</li>
  <li><strong>Pro tip:</strong> Cross into SG by 9am, return by 5-6pm. Full 8-9 hours in Singapore.</li>
</ul>
<h2>Best Singapore Day Trips from JB</h2>
<h3>Day Trip 1: Classic Singapore Highlights</h3>
<ul>
  <li><strong>Gardens by the Bay</strong> — outdoor gardens free. Supertree Grove, OCBC Skyway.</li>
  <li><strong>Marina Bay Sands waterfront</strong> — free from outside.</li>
  <li><strong>Merlion Park</strong> — free.</li>
  <li><strong>Chinatown lunch</strong> — Maxwell Food Centre. Tian Tian Chicken Rice SGD6.</li>
  <li><strong>Orchard Road</strong> — window shop, air conditioning, bubble tea.</li>
</ul>
<p><strong>Cost:</strong> SGD5-10 MRT + SGD10-15 lunch = full day under SGD25.</p>
<h3>Day Trip 2: Sentosa Beach Day</h3>
<ul>
  <li>MRT to HarbourFront, boardwalk (free) or monorail (SGD4) to Sentosa.</li>
  <li>Palawan Beach, Siloso Beach, Tanjong Beach — all free.</li>
  <li>Pack snacks from JB to save on overpriced island food.</li>
</ul>
<h3>Day Trip 3: Culture and Heritage</h3>
<ul>
  <li><strong>Little India</strong> — Tekka Centre dosai breakfast SGD5. Sri Veeramakaliamman Temple free.</li>
  <li><strong>Kampong Glam</strong> — Sultan Mosque free. Bussorah Street cafes.</li>
  <li><strong>Haji Lane</strong> — indie boutiques, street art.</li>
  <li><strong>National Gallery Singapore</strong> — some exhibitions free.</li>
</ul>
<h3>Half-Day: Jewel Changi Airport</h3>
<ul>
  <li>Rain Vortex — world's tallest indoor waterfall, free.</li>
  <li>Canopy Park — SGD5-27 depending on attractions.</li>
  <li>MRT to Changi Airport station. Budget 2-3 hours.</li>
</ul>
<h2>Return to JB for Dinner</h2>
<p>Instead of SGD15-25 dinner in Singapore, cross back and eat for RM8-15. Near <a href="/rooms">Pelangi Capsule</a>:</p>
<ul>
  <li><strong>IT Roo Cafe</strong> — claypot dishes, RM12-18.</li>
  <li><strong>Restoran Hua Mui</strong> — Hainanese chicken chop, RM10-15.</li>
  <li><strong>Selera Pelangi Hawker Centre</strong> — 2-minute walk, RM8-12.</li>
  <li><strong>Mamak restaurants</strong> — open late, RM5-10.</li>
</ul>
<h2>Sample 5-Night Itinerary</h2>
<h3>Day 1: Arrive in JB</h3>
<ul>
  <li>Check into <a href="/book">Pelangi Capsule</a>. Walk Taman Pelangi.</li>
  <li>Dinner at Restoran Hua Mui or Selera Pelangi hawker centre.</li>
  <li>Tuesday? Hit Taman Pelangi night market.</li>
</ul>
<h3>Day 2: Singapore Classic Highlights</h3>
<ul>
  <li>Cross causeway by 9am. Gardens by the Bay, Marina Bay, Merlion.</li>
  <li>Lunch Maxwell Food Centre. Afternoon Orchard Road.</li>
  <li>Back by 5-6pm. Dinner Taman Pelangi.</li>
</ul>
<h3>Day 3: JB Hidden Gems</h3>
<ul>
  <li>Morning: Tan Hiok Nee Heritage Street.</li>
  <li>Lunch: hawker centre.</li>
  <li>Afternoon: JB city attractions, Glass Temple, old town.</li>
</ul>
<h3>Day 4: Sentosa Day Trip</h3>
<ul>
  <li>Early crossing, beach day at Palawan or Siloso.</li>
  <li>Return to JB for dinner. Mamak supper.</li>
</ul>
<h3>Day 5: Food Crawl and Departure</h3>
<ul>
  <li>Sleep in. Breakfast crawl: nasi lemak, char kway teow, cendol.</li>
  <li>Check out by noon.</li>
</ul>
<p><strong>Total estimated cost for 5 nights:</strong> roughly SGD200-250 all-in.</p>
<h2>Practical Tips</h2>
<ul>
  <li><strong>Malaysian SIM card</strong> — Digi or Celcom, RM10-15. Need for Grab.</li>
  <li><strong>Carry MYR and SGD</strong> — moneychangers at JB CIQ and Woodlands.</li>
  <li><strong>EZ-Link card</strong> — Singapore transit, SGD5 + top-up. Or use contactless Visa/Mastercard.</li>
  <li><strong>Passport always on you</strong> — international border every crossing.</li>
  <li><strong>SG Arrival Card online</strong> — myica.ica.gov.sg, up to 3 days before first crossing.</li>
  <li><strong>Pack light for day trips</strong> — small daypack with passport, phone, water, sunscreen.</li>
</ul>
<h2>Why Pelangi Capsule Is the Ideal Base</h2>
<ul>
  <li><strong>RM30/night on weekdays (Upper or Lower Deck)</strong> — cheapest clean, private sleeping space in JB.</li>
  <li><strong>RM35/night on weekends</strong> — same pods, weekend rate; Lower Deck is ground-level with easier access.</li>
  <li><strong>Taman Pelangi</strong> — hawker centres, mamak, cafes, night markets walking distance.</li>
  <li><strong>15 min from CIQ</strong> — quick Grab to causeway checkpoint.</li>
  <li><strong>Lockers</strong> — secure laptop, cash, documents while in Singapore.</li>
  <li><strong>24/7 access</strong> — no curfew, no lockouts.</li>
</ul>
<p><a href="/book">Book your capsule at Pelangi Capsule Hostel</a> and start saving from night one.</p>
`,
		},
		// 31
		{
			Slug:          "zhangyi-jichang-zhongzhuan-xinshan-shengqian-zhinan",
			Title:         "樟宜机场中转？住新山胶囊旅馆省几百新币（2026攻略）",
			Excerpt:       "新加坡樟宜机场中转住宿太贵？从机场到新山只要1.5小时，胶囊旅馆每晚仅RM35起（约SGD10），帮你省下几百新币。本文详解交通方式、费用对比和中国游客实用信息。",
			Date:          "2026-04-15",
			Category:      "交通攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "9 min read",
			Tags:          []string{"樟宜机场", "新加坡", "新山", "中转", "省钱", "胶囊旅馆", "马来西亚"},
			FeaturedImage: "/images/blog/changi-airport-transit-jb.webp",
			InLanguage:    "zh-CN",
			AlternateEN: "changi-airport-transit-budget-stay-johor-bahru",
			Content: `
<h2>樟宜机场住宿太贵了</h2>
<p>在樟宜机场中转要过夜？打开订房App那一刻你就懂了——机场周边酒店SGD150-300一晚（约人民币800-1600），机场里的胶囊休息室也要SGD50+（约人民币270+）。就睡一觉，这价格真的肉疼。</p>
<p>大部分人到这一步就认命了：要么咬牙订酒店，要么在候机椅上躺一夜。但有个<strong>大多数中国游客根本不知道的办法</strong>：跑去马来西亚新山住。</p>
<h2>新山：过个关就能住白菜价</h2>
<p>新山（Johor Bahru，简称JB）在马来西亚最南端，跟新加坡就隔一条海峡。从樟宜机场过去，<strong>1.5小时到新山市区</strong>。</p>
<p>关键是价格差太多了——新山住宿只要新加坡的<strong>十分之一</strong>。拿<a href="/rooms">Pelangi Capsule Hostel（彩虹胶囊旅馆）</a>来说：</p>
<ul>
<li><strong>平日（周一至周四）：RM30/晚</strong>（约SGD9 / 约人民币48）—— 上下层同价</li>
<li><strong>周末（周五至周日）：RM35/晚</strong>（约SGD10 / 约人民币56）—— 下层舱位无需爬梯</li>
</ul>
<p><strong>一晚直接省SGD100+。</strong>中转时间长的话，住两三晚省下的钱够买张国际机票。</p>
<p><strong>注意：</strong>非马来西亚公民需额外支付旅游税RM10/房/晚。</p>
<h2>樟宜机场到新山怎么走？</h2>
<h3>方案一：公共交通（最省钱）</h3>
<p>全程约SGD5，1.5-2小时。</p>
<ol>
<li>樟宜机场坐<strong>MRT</strong>到兀兰站（Woodlands）——约45分钟，SGD2-3</li>
<li>在兀兰关口坐<strong>CW1巴士</strong>过柔佛海峡大桥——SGD1-2</li>
<li>过新加坡出境和马来西亚入境（新山CIQ关口）</li>
<li>从CIQ打<strong>Grab</strong>到旅馆——约RM8-12，5分钟</li>
</ol>
<p>周末和节假日过关排队30-60分钟很正常，工作日快很多。尽量别赶周五晚和周日晚高峰。</p>
<h3>方案二：跨境大巴（省心）</h3>
<p><strong>Transtar</strong>、<strong>Causeway Link</strong>有新加坡到新山的直达车，票价SGD10-15。Redbus或官网提前买票。</p>
<h3>方案三：Grab / 私人包车（最省事）</h3>
<p>直接从樟宜机场叫<strong>Grab</strong>到新山，SGD50-70。两三个人一起叫的话，人均SGD20左右。</p>
<h2>从新山回樟宜机场</h2>
<p>回程反着走。<strong>记住：提前3-4小时出发。</strong>时间紧就直接叫跨境Grab，最省事。</p>
<p>交通细节见：<a href="/blog/xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan">新加坡去新山交通指南</a></p>
<h2>费用对比：到底省多少？</h2>
<table>
<thead>
<tr><th>项目</th><th>樟宜机场酒店</th><th>新山胶囊旅馆</th><th>你省了</th></tr>
</thead>
<tbody>
<tr><td><strong>1晚住宿</strong></td><td>SGD150-300（¥800-1600）</td><td>RM30-35（SGD9-10 / ¥48-56）</td><td><strong>SGD140-290</strong></td></tr>
<tr><td><strong>2晚住宿</strong></td><td>SGD300-600</td><td>RM70-90（SGD20-26）</td><td><strong>SGD274-580</strong></td></tr>
<tr><td><strong>3晚住宿</strong></td><td>SGD450-900</td><td>RM105-135（SGD30-39）</td><td><strong>SGD411-870</strong></td></tr>
<tr><td><strong>交通成本（往返）</strong></td><td>—</td><td>SGD10-30</td><td>算上交通依然大省</td></tr>
</tbody>
</table>
<h2>新山有啥好玩的？</h2>
<h3>吃的</h3>
<ul>
<li><strong>Taman Pelangi夜市</strong>——从旅馆走过去就到，人均RM15吃到撑</li>
<li><strong>San Low海鲜</strong>——本地人排队吃的老字号，人均RM15-25</li>
<li><strong>肉骨茶</strong>——新山干式，跟新加坡汤式完全不一样，必试</li>
<li><strong>拉茶（Teh Tarik）</strong>——RM2一杯，随便找个Mamak档就有</li>
</ul>
<h3>逛的</h3>
<ul>
<li><strong>陈旭年街</strong>——百年老街+文艺咖啡馆+壁画</li>
<li><strong>City Square购物中心</strong>——紧挨CIQ关口</li>
<li><strong>便利店</strong>——马来西亚零食是新加坡的1/3-1/2价格</li>
</ul>
<h2>中国游客实用信息</h2>
<h3>签证</h3>
<p><strong>中国护照免签入境马来西亚，可停留30天。</strong>旅馆地址：26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru。</p>
<h3>支付与汇率</h3>
<ul>
<li>微信支付/支付宝在大商场和连锁餐厅可用，带点现金保险</li>
<li>Grab绑国际信用卡（Visa/Mastercard）使用</li>
<li>1人民币 ≈ 0.65马币（RM） | 1新币 ≈ 3.4马币</li>
</ul>
<h3>通讯</h3>
<p>到新山买本地SIM卡（Digi、Celcom），7天套餐RM15-25。旅馆有免费WiFi。</p>
<h2>入住须知</h2>
<ul>
<li><strong>地址：</strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</li>
<li><strong>入住：</strong>下午2:00 | <strong>退房：</strong>中午12:00</li>
<li><strong>房型：</strong>平日RM30/晚，周末RM35/晚（上下层同价）</li>
<li><strong>WiFi：</strong>全馆免费，网速够用</li>
</ul>
<p><a href="/book">现在就订</a>，省下的钱路上花。</p>
`,
		},
		// 32
		{
			Slug:          "xinshan-zhu-xingjiapo-wan-yiri-you-shengqian-gonglue",
			Title:         "住新山玩新加坡：一日游省钱攻略（2026最新）",
			Excerpt:       "新山住宿只要RM35起，吃饭RM5一顿，每天过关去新加坡玩，5天能省下上千块——这篇攻略教你怎么操作。",
			Date:          "2026-04-15",
			Category:      "旅游攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "10 min read",
			Tags:          []string{"新山", "新加坡", "一日游", "省钱", "背包旅行", "马来西亚", "住宿"},
			FeaturedImage: "/images/blog/jb-singapore-day-trip-base.webp",
			InLanguage:    "zh-CN",
			AlternateEN: "jb-budget-base-singapore-day-trips-save-money",
			Content: `
<h2>住新山、玩新加坡——最聪明的省钱方式</h2>
<p>第一次来东南亚的朋友，十有八九直接订新加坡的酒店。但玩过的人都知道：<strong>住在马来西亚新山（Johor Bahru），白天坐巴士过关去新加坡逛，晚上回来吃饭睡觉</strong>。两座城就隔一条海峡，过关45分钟到1个半小时，省下来的钱够你多玩好几天。</p>
<p>对比住宿：新加坡青旅一晚SGD40-60（约¥210-315），稍微像样的酒店SGD150-200起步。新山<a href="/rooms">彩虹胶囊旅馆</a>胶囊舱位平日只要<strong>RM30/晚（约¥48）</strong>，周末<strong>RM35/晚（约¥56）</strong>，上下层同价。一晚的差价够你在新山吃三天。</p>
<p>吃饭差距更大：新加坡随便吃一顿SGD10-15，新山路边档口一碗面RM5-8（约¥8-13）。<strong>同样的钱，在新山能吃三倍的量</strong>。</p>
<h2>五天花费对比</h2>
<table>
  <thead>
    <tr><th>项目</th><th>住新加坡（SGD）</th><th>住新山（MYR）</th><th>住新山（人民币约）</th></tr>
  </thead>
  <tbody>
    <tr><td>住宿（5晚）</td><td>SGD 200-300</td><td>RM 175-225</td><td>¥280-360</td></tr>
    <tr><td>早餐（5天）</td><td>SGD 40-50</td><td>RM 25-40</td><td>¥40-64</td></tr>
    <tr><td>午餐（5天）</td><td>SGD 50-75</td><td>SGD 50-75（在新加坡吃）</td><td>¥263-394</td></tr>
    <tr><td>晚餐（5天）</td><td>SGD 50-75</td><td>RM 40-75</td><td>¥64-120</td></tr>
    <tr><td>市内交通</td><td>SGD 30-50</td><td>SGD 30-50 + RM 30</td><td>¥206-311</td></tr>
    <tr><td>过关交通（5天来回）</td><td>—</td><td>RM 25-50</td><td>¥40-80</td></tr>
    <tr><td><strong>5天总花费</strong></td><td><strong>SGD 370-550</strong></td><td><strong>约 SGD 200-330</strong></td><td><strong>¥893-1,329</strong></td></tr>
    <tr><td><strong>节省金额</strong></td><td>—</td><td colspan="2"><strong>省 SGD 170-220（约¥890-1,160）</strong></td></tr>
  </tbody>
</table>
<p><strong>住新山5天能省将近1000块人民币</strong>，够再买一张环球影城的门票。</p>
<h2>过关实操指南</h2>
<h3>从新山到新加坡（去程）</h3>
<ol>
  <li>Grab打车到新山CIQ关口（RM6-10，15分钟）</li>
  <li>马来西亚出境，盖出境章</li>
  <li>坐CW1巴士过长堤（RM2.50，投币）</li>
  <li>新加坡兀兰（Woodlands）入境，盖入境章</li>
  <li>搭MRT进市区（汤申-东海岸线，30-40分钟）</li>
</ol>
<p>更多细节：<a href="/blog/xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan">新加坡去新山怎么去？交通指南</a></p>
<h3>避开高峰期</h3>
<ul>
  <li><strong>最堵：</strong>周五晚、周六早、周日晚——堵2-3小时很正常</li>
  <li><strong>最顺：</strong>工作日上午9-10点出发，下午5点前回来</li>
  <li><strong>预留时间：</strong>一般留45-90分钟给过关</li>
</ul>
<h2>新加坡一日游推荐路线</h2>
<h3>路线一：经典打卡</h3>
<ol>
  <li>滨海湾花园（室外免费）→ 金沙酒店（外观免费）→ 鱼尾狮（免费）</li>
  <li>牛车水午饭（小贩中心SGD5-8）→ 乌节路</li>
</ol>
<h3>路线二：圣淘沙</h3>
<ol>
  <li>免费沙滩（巴拉湾、西乐索），环球影城（SGD82起，看预算）</li>
</ol>
<h3>路线三：文化之旅</h3>
<ol>
  <li>小印度（印度煎饼SGD3）→ 甘榜格南（苏丹回教堂免费）→ 哈芝巷</li>
</ol>
<h3>路线四：星耀樟宜（半天）</h3>
<ol>
  <li>雨漩涡（世界最高室内瀑布，免费）→ 森林谷 → 免税店</li>
</ol>
<h2>回新山吃晚餐——省钱的精髓</h2>
<p>白天新加坡逛，晚上回新山吃。同一道菜差3-4倍：</p>
<ul>
  <li>炒粿条——新山RM8-12 vs 新加坡SGD6-8</li>
  <li>肉骨茶——新山RM12-18 vs 新加坡SGD8-12</li>
  <li>海南鸡饭——新山RM8-12 vs 新加坡SGD5-8</li>
  <li>印度煎饼——新山RM2-3 vs 新加坡SGD3-5</li>
</ul>
<p><a href="/rooms">彩虹胶囊旅馆</a>就在Taman Pelangi美食区，出门走5分钟，十几家档口随你挑。San Low Bee Hoon（三楼米粉）和附近Mamak档24小时开门。</p>
<h2>中国游客实用贴士</h2>
<ul>
  <li><strong>签证：</strong>马来西亚和新加坡均免签30天</li>
  <li><strong>SIM卡：</strong>落地买Hotlink或Digi（RM15-30），才能用Grab</li>
  <li><strong>现金：</strong>备马币和新币，路边档口只收现金</li>
  <li><strong>EZ-Link卡：</strong>新加坡MRT用，SGD10含SGD5储值</li>
  <li><strong>护照随身带：</strong>每次过关都要盖章</li>
</ul>
<h2>为什么推荐彩虹胶囊旅馆？</h2>
<ul>
  <li>胶囊舱位平日RM30/晚（约¥48），周末RM35/晚（约¥56），上下层同价</li>
  <li>Taman Pelangi美食区，到CIQ关口15分钟车程</li>
  <li>每个舱位配储物柜，白天去新加坡贵重东西锁好</li>
  <li>24小时出入，没有门禁</li>
</ul>
<p>想试试这个玩法？<strong><a href="/book">直接预订彩虹胶囊旅馆</a></strong>，花最少的钱把新加坡和新山都玩一遍。</p>
`,
		},
		// 33
		{
			Slug:          "ktm-ets-train-kuala-lumpur-johor-bahru-tourists",
			Title:         "KTM ETS Train: Kuala Lumpur to Johor Bahru for Tourists (2026)",
			Excerpt:       "The KTM ETS train is one of the most comfortable and affordable ways to travel between Kuala Lumpur and Johor Bahru. Here's everything you need to know about classes, booking, fares, and arriving in JB.",
			Date:          "2026-06-18",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "9 min read",
			Tags:          []string{"ktm-ets", "train", "kuala-lumpur", "johor-bahru", "travel-tips", "tourist", "ktmb"},
			FeaturedImage: "/images/blog/ets-train-jb.webp",
			AlternateZH: "ktm-ets-train-johor-bahru-chinese-guide",
			Content: `
<h2>Why Take the Train to Johor Bahru?</h2>
<p>Flying between Kuala Lumpur and Johor Bahru is fast, but when you factor in getting to the airport, checking in, and making your way into JB from Senai Airport, the time advantage shrinks quickly. The KTM ETS (Electric Train Service) pulls into <strong>JB Sentral</strong> — right in the heart of the city, next to the Causeway immigration complex. No airport buses, no long Grab rides from Senai. You step off the train and you are already in Johor Bahru.</p>
<p>It is also one of the most scenic ways to see Peninsular Malaysia. The route passes through towns, palm plantations, and jungle-edged hills that you would miss entirely at 35,000 feet. For budget travellers, the price is also hard to argue with.</p>
<h2>Understanding the KTM ETS Route</h2>
<p>The KTM ETS network connects most major cities on the west coast of Peninsular Malaysia. The Kuala Lumpur to Johor Bahru route typically runs <strong>KL Sentral to JB Sentral</strong>, with the train passing through Seremban, Gemas, Segamat, Kluang, and Kempas Baru, among other stops.</p>
<p>One practical note: some services run directly through, while on certain schedules passengers may need to <strong>change trains at Gemas</strong>. If your ticket shows a change at Gemas, the connecting service departs from the same station, usually with a short wait. Check your itinerary when booking.</p>
<p>The approximate journey time from KL Sentral to JB Sentral is <strong>around 4.5 to 5.5 hours</strong> on faster services.</p>
<h2>ETS Train Classes</h2>
<ul>
  <li><strong>ETS Platinum:</strong> Fastest services, fewer stops, wider seats with good legroom. Preferred for KL–JB.</li>
  <li><strong>ETS Gold:</strong> Slightly slower, more intermediate stops. Comfortable seats.</li>
  <li><strong>ETS Business:</strong> Premium tier on select services, larger seats. Check availability when booking.</li>
</ul>
<p>For most tourists, <strong>ETS Platinum is the go-to choice</strong>. Fares approximately <strong>RM79 to RM110</strong> for KL Sentral to JB Sentral — check the KTMB website for current pricing.</p>
<h2>How to Book KTM ETS Tickets</h2>
<h3>KTMB Official Website and App</h3>
<p><strong>KTMB official website (www.ktmb.com.my)</strong> or KTM mobile app. Pay by credit or debit card, receive e-tickets on your phone. No third-party markup.</p>
<h3>Online Travel Platforms</h3>
<p><strong>Easybook</strong> and <strong>Redbus</strong> sell KTM ETS tickets with a cleaner interface and more payment options. Small booking fee included.</p>
<h3>Station Ticket Counters</h3>
<p>Available at KL Sentral. Queues can be long at peak times and trains fill up days in advance on popular routes.</p>
<h3>Book Early for Peak Periods</h3>
<p><strong>Buy early.</strong> KL–JB tickets sell out fast, particularly Friday evenings (KL to JB) and Sunday evenings (JB to KL). Book 1–2 weeks ahead; for Hari Raya and Chinese New Year, book a month or more in advance.</p>
<h2>Travelling from KL Sentral</h2>
<p>KL Sentral is connected to the KTM Komuter, MRT, LRT, monorail, KLIA Ekspres, and city buses. Arrive at least <strong>30 minutes before departure</strong>. Stock up at station shops for the journey.</p>
<h2>The Journey: What to Expect on Board</h2>
<p>ETS trains are clean, air-conditioned, and comfortable. Each seat has adequate legroom and a fold-down tray table. Food trolley service available. Power sockets at most seats on ETS trains. Free WiFi on many services, though connectivity varies.</p>
<h2>Arriving at JB Sentral</h2>
<p>JB Sentral is directly adjacent to the <strong>Kotaraya-CIQ complex</strong> — minutes from the Singapore Causeway checkpoint if continuing to Singapore. City Square Mall is next door with food, shops, and money changers.</p>
<p>Grab from JB Sentral to <strong>Pelangi Capsule Hostel in Taman Pelangi</strong>: approximately <strong>10 minutes</strong>, around <strong>RM8 to RM12</strong>. Enter "26A Jalan Perang, Taman Pelangi" in the Grab app.</p>
<h2>Tips for a Smooth Journey</h2>
<ul>
  <li><strong>Book a window seat</strong> — scenery through Johor is worth watching.</li>
  <li><strong>Bring snacks and water.</strong> Stocking up at KL Sentral is cheaper than the trolley.</li>
  <li><strong>Download your e-ticket before boarding.</strong> Mobile data can be spotty in rural stretches.</li>
  <li><strong>Check for a Gemas change</strong> on your itinerary — well-signposted at the station.</li>
  <li><strong>Avoid Friday and Sunday evenings</strong> — busiest periods, queues and fuller trains.</li>
  <li><strong>Keep your ticket handy.</strong> Inspectors check tickets during the journey.</li>
</ul>
<h2>Staying in Taman Pelangi After the Train</h2>
<p>Taman Pelangi is one of JB's most food-rich neighbourhoods. Within walking distance: hawker centres, old-school kopitiams, seafood restaurants, and late-night mamak stalls.</p>
<p>Check-in at Pelangi is from <strong>2:00 PM</strong>. Drop your bags earlier and head out to explore. <a href="/rooms">Pods from RM30/night on weekdays (RM35 weekends)</a> — Upper and Lower Deck same price.</p>
<p><a href="/book">Book your pod at Pelangi Capsule Hostel</a> and make the most of your JB trip.</p>
`,
		},
		// 34
		{
			Slug:          "arriving-jb-by-train-jb-sentral-to-taman-pelangi",
			Title:         "Arriving in JB by Train: JB Sentral to Taman Pelangi",
			Excerpt:       "Just stepped off the KTM ETS at JB Sentral and not sure what to do next? Here is exactly how to get from the train station to Taman Pelangi and Pelangi Capsule Hostel in about 10 minutes.",
			Date:          "2026-06-18",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"jb-sentral", "train", "taman-pelangi", "arrival", "travel-tips", "tourist", "getting-here"},
			FeaturedImage: "/images/blog/jb-sentral-arrival.webp",
			Content: `
<h2>You've Just Arrived at JB Sentral — Now What?</h2>
<p>JB Sentral is a busy, multi-level transport hub that doubles as a border crossing complex. For first-time visitors, stepping off the train and being confronted with signs for immigration, City Square Mall, taxis, buses, and the CIQ checkpoint all at once can feel a little overwhelming. Take a breath. Getting from here to Taman Pelangi is genuinely easy and takes about 10 minutes.</p>
<p>This guide is for travellers who have just arrived by KTM ETS train and want to reach <strong>Pelangi Capsule Hostel in Taman Pelangi</strong> as simply as possible.</p>
<h2>Understanding the JB Sentral Layout</h2>
<p>JB Sentral station is connected to <strong>City Square Mall</strong> (directly adjoining the station), the <strong>JB CIQ</strong> building for those heading to or from Singapore, and a bus terminal. The whole area is enclosed and air-conditioned.</p>
<p>When you exit the train platform, follow signs for the main station exit or City Square Mall. The ground floor has money changers, convenience stores, food courts, ATMs, and a pharmacy. If you see signs for the Singapore Causeway or CIQ — that is the border crossing to Singapore, not what you want. Make your way toward the station taxi/Grab pick-up areas.</p>
<h2>Getting from JB Sentral to Taman Pelangi</h2>
<h3>Option 1: Grab (Recommended)</h3>
<p><strong>Grab</strong> is Southeast Asia's ride-hailing app — the regional equivalent of Uber. Works well in JB, drivers are plentiful, fare displayed upfront.</p>
<ul>
  <li><strong>Fare:</strong> approximately <strong>RM8 to RM12</strong></li>
  <li><strong>Journey time:</strong> around <strong>8 to 12 minutes</strong></li>
  <li><strong>Destination:</strong> "Pelangi Capsule Hostel" or 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. Driver matched in 1–3 minutes.</li>
</ul>
<p>Pay by card, e-wallet, or cash. Wait at the designated ride-hailing pickup zone outside the main entrance, separate from the taxi stand.</p>
<h3>Option 2: Metered Taxi</h3>
<p>Available outside JB Sentral. Fares to Taman Pelangi: roughly <strong>RM10 to RM15</strong> by meter. Ask driver to use meter before getting in. Avoid drivers who approach inside the station and quote flat fares — walk to the official taxi stand.</p>
<h3>Option 3: Local Bus</h3>
<p>JB has a local bus network with some routes near Taman Pelangi. Routes and schedules change, stops can be hard to identify. For most tourists with luggage after a long train journey, Grab is the better call.</p>
<h2>What's Around Taman Pelangi?</h2>
<ul>
  <li><strong>Hawker stalls and kopitiams:</strong> Open from early morning — kaya toast, soft-boiled eggs, chicken rice, teh tarik. Under RM10 for full breakfast.</li>
  <li><strong>San Low Seafood:</strong> 5 minutes on foot, known for San Low Bee Hoon. Popular for dinner.</li>
  <li><strong>Mamak restaurants:</strong> Open late (some 24 hours) — roti canai, mee goreng, teh tarik. Perfect for late arrivals.</li>
  <li><strong>Convenience stores:</strong> 7-Eleven and 99 Speedmart within walking distance.</li>
  <li><strong>ATMs:</strong> Multiple banks nearby for Ringgit withdrawal.</li>
</ul>
<h2>Checking In at Pelangi Capsule Hostel</h2>
<ul>
  <li><strong>Check-in time:</strong> 2:00 PM. Bag drop available for early arrivals.</li>
  <li><strong>Check-out time:</strong> 12:00 PM (noon).</li>
  <li><strong>Address:</strong> 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru.</li>
  <li><strong>WiFi:</strong> Free throughout. Network: pelangi capsule, password: ilovestaycapsule.</li>
  <li><strong>Pods:</strong> <a href="/rooms">RM30/night on weekdays, RM35/night on weekends</a> — Upper and Lower Deck same price. LED reading light, USB charging port, personal locker per pod.</li>
  <li><strong>Tourism tax:</strong> Non-Malaysian guests pay RM10 per room per night at check-in.</li>
</ul>
<p>Arriving late or have questions? Reach us via the WhatsApp link on our <a href="/getting-here">Getting Here page</a>.</p>
<h2>First Evening in JB: What to Do</h2>
<p>If you arrive in the afternoon with energy, a 10-minute Grab ride takes you to <strong>Tan Hiok Nee Heritage Street</strong> in JB Old Town — restored 19th-century shophouses, artisan cafes, and street art worth an hour of your time.</p>
<p>If you're tired from the journey: drop your bags, find the nearest kopitiam, order something local, and let JB do its thing. The city has a way of growing on you quickly.</p>
<p><a href="/rooms">Browse room types</a> or <a href="/book">book your stay at Pelangi Capsule Hostel</a>.</p>
`,
		},
		// 35
		{
			Slug:          "ktm-ets-train-johor-bahru-chinese-guide",
			Title:         "坐火车游新山：KTM ETS 完全攻略",
			Excerpt:       "从吉隆坡坐 KTM ETS 火车去新山，经济实惠又舒适。本文详解车票预订、车程票价、抵达 JB Sentral 后如何前往 Taman Pelangi 彩虹胶囊旅馆，助你轻松出行。",
			Date:          "2026-06-18",
			Category:      "交通攻略",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"ktm-ets", "火车", "新山", "交通攻略", "旅游", "kuala-lumpur"},
			FeaturedImage: "/images/blog/ets-train-jb.webp",
			AlternateEN: "ktm-ets-train-kuala-lumpur-johor-bahru-tourists",
			Content: `
<h2>为什么选择坐火车去新山？</h2>
<p>很多游客去新山（Johor Bahru，简称JB）会选择飞机或大巴，但 <strong>KTM ETS 电气化列车</strong>其实是更舒适、更省心的选择——尤其是从吉隆坡出发的旅客。</p>
<p>ETS 直接开进 <strong>JB Sentral（新山中央火车站）</strong>，就在市中心，旁边就是 City Square 购物中心和新柔长堤关口。不像飞到仙奈机场（Senai Airport）还要再打车进城，下了火车基本上就到了。</p>
<p>吉隆坡到新山的 ETS 票价约 <strong>RM79 至 RM110 左右</strong>（视座位等级和班次），比机票便宜，还省去了机场来回的时间。</p>
<h2>KTM ETS 是什么？</h2>
<p>KTM ETS（Electric Train Service）是马来西亚国家铁路公司 KTMB 运营的城际列车，连接半岛西海岸各大城市。<strong>吉隆坡到新山</strong>是主要干线，途经芙蓉（Seremban）、格马斯（Gemas）、昔加末（Segamat）、居銮（Kluang）等城市，最终抵达 JB Sentral。</p>
<p>全程约 <strong>4.5 至 5.5 小时</strong>。部分班次需要在 <strong>格马斯（Gemas）换乘</strong>——站内有清晰指示牌，换乘不复杂，订票时注意看行程单。</p>
<h2>ETS 座位等级</h2>
<ul>
  <li><strong>ETS Platinum（白金级）：</strong>最快班次，停靠站少，座椅宽敞舒适。推荐首选。</li>
  <li><strong>ETS Gold（黄金级）：</strong>速度稍慢，停靠站较多。座位舒适。</li>
  <li><strong>ETS Business（商务级）：</strong>部分班次提供，座椅更宽。班次和路线不一，预订时确认。</li>
</ul>
<p>对于大多数从吉隆坡去新山的游客，<strong>ETS Platinum 是最推荐的选择</strong>：速度快、直达率高。</p>
<h2>如何预订 KTM ETS 车票？</h2>
<h3>KTMB 官网 / 官方 App</h3>
<p>通过 <strong>KTMB 官网（www.ktmb.com.my）</strong>或 KTM 官方 App 购票。支持 Visa / Mastercard，购票后收电子票，手机出示即可上车。官方渠道不收附加费。</p>
<h3>第三方购票平台</h3>
<p><strong>Easybook</strong>、<strong>Redbus</strong> 等平台界面更友好，支持更多支付方式（含电子钱包）。手续费略高，但对外国游客更方便。</p>
<h3>车站窗口购票</h3>
<p>可在吉隆坡中央车站（KL Sentral）售票窗口购票。但周末和节假日热门班次很容易售罄，不建议临行前才碰运气。</p>
<h3>提前购票很重要</h3>
<p><strong>提前买票。</strong>KL–JB 线路非常热门，周五晚和周日晚基本一票难求。普通周末建议提前 1–2 周购票，大假期建议提前 1 个月以上。</p>
<h2>从吉隆坡中央车站（KL Sentral）出发</h2>
<p>KL Sentral 接驳 KTM Komuter、MRT、LRT、KLIA 快铁等多条线路，从市区任何地方过来都方便。建议<strong>提前 30 分钟到站</strong>。候车期间在站内便利店买些零食和饮料带上车。</p>
<h2>车厢内体验</h2>
<p>ETS 列车全程冷气，座椅整洁，有折叠小桌板。大多数 ETS Platinum 座位配有<strong>电源插座</strong>——5 小时旅程充个电很合适。部分班次提供车载 WiFi，但偏远路段信号不稳定，建议提前把电子票和离线地图下载好。</p>
<h2>抵达 JB Sentral</h2>
<p>JB Sentral 站内直连 <strong>City Square 购物中心</strong>，周边有换钱处、便利店、餐厅和 ATM。</p>
<p>从 JB Sentral 前往 <a href="/rooms">彩虹胶囊旅馆（Pelangi Capsule Hostel）</a>，最方便的方式是打 <strong>Grab</strong>：</p>
<ul>
  <li><strong>车费：</strong>约 <strong>RM8 至 RM12</strong></li>
  <li><strong>车程：</strong>约 <strong>10 分钟</strong></li>
  <li><strong>目的地：</strong>输入 "26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru"</li>
</ul>
<p>Grab 在新山覆盖很好，通常 1–3 分钟就能配到司机。详细抵达指引见<a href="/getting-here">交通指引页面</a>。</p>
<h2>Taman Pelangi 周边</h2>
<ul>
  <li><strong>传统咖啡店（Kopitiam）：</strong>椰酱吐司、半熟蛋、南洋奶茶，人均 RM6–8。</li>
  <li><strong>San Low 海鲜：</strong>招牌三楼米粉必点，人均 RM15–25。</li>
  <li><strong>Mamak 档口：</strong>24 小时营业，煎饼、炒面、拉茶随时有。</li>
  <li><strong>便利店：</strong>7-Eleven 和 99 Speedmart，矿泉水、零食、洗漱用品一站搞定。</li>
</ul>
<h2>入住须知</h2>
<ul>
  <li><strong>地址：</strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</li>
  <li><strong>入住时间：</strong>下午 2:00 | <strong>退房时间：</strong>中午 12:00</li>
  <li><strong>房型：</strong>平日 RM30/晚，周末 RM35/晚（上下层同价）。独立阅读灯、USB 充电口和个人储物柜。</li>
  <li><strong>旅游税：</strong>非马来西亚公民额外 RM10/房/晚，入住时缴纳。</li>
  <li><strong>WiFi：</strong>全馆免费，网络名：pelangi capsule，密码：ilovestaycapsule。</li>
</ul>
<h2>出行小贴士</h2>
<ul>
  <li>提前购票，避开周五晚和周日晚高峰</li>
  <li>确认是否需要在格马斯换乘，预留时间</li>
  <li>带好充电宝和耳机，5 小时车程备好娱乐</li>
  <li>到站后第一件事是打 Grab，不要跟随意搭话的司机走</li>
  <li>随身带马币现金，小吃档和路边摊只收现金</li>
</ul>
<p>现在就<a href="/book">预订你的舱位</a>，开启你的新山之旅吧。</p>
`,
		},
		// 36
		{
			Slug:          "johor-state-election-2026-travellers-guide",
			LastModified:  "2026-07-03",
			ImageAlt:      "Bangunan Sultan Ibrahim, the Johor state government building in Johor Bahru",
			Title:         "Johor State Election 11 July 2026: What Travellers to JB Need to Know",
			Excerpt:       "Johor votes on Saturday 11 July 2026 — a public holiday in the state. Here's how the election weekend affects your JB trip: Causeway traffic, shop hours, safety, and why it's actually a great weekend to stay put in Johor Bahru.",
			Date:          "2026-07-03",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "johor-election", "public-holiday", "causeway", "travel-tips", "malaysia"},
			FeaturedImage: "/images/blog/johor-state-election-2026-travellers-guide.webp",
			Content: `
<h2>The Short Version</h2>
<p>Johor holds its <strong>16th State Assembly election</strong> with polling on <strong>Saturday 11 July 2026</strong>. Polling day is a <strong>public holiday in Johor state</strong> (not in the rest of Malaysia or Singapore). Early voting for police and military personnel happens on 7 July, and campaigning runs until 11:59 PM on 10 July.</p>
<p>For travellers, the practical impacts are simple: a much busier Causeway from <strong>10–12 July</strong>, some shops opening late on polling day, and higher demand for JB accommodation that weekend. Everything else — attractions, malls, transport, and <a href="/rooms">your capsule pod at Pelangi</a> — runs as normal. See our dedicated <a href="/johor-election-2026">election weekend guide for guests</a> for the quick-reference version.</p>

<h2>Why the Causeway Gets Crazy</h2>
<p>Hundreds of thousands of Johoreans live and work in Singapore, and Malaysian elections require voting in person in your home constituency. That means a huge wave of voters crossing back into JB on <strong>Friday night 10 July</strong> and <strong>Saturday morning 11 July</strong>, then returning to Singapore on <strong>Sunday 12 July</strong> — on top of the normal weekend crowd.</p>
<p>During the last state election in 2022, Causeway queues on election eve stretched for hours. Expect the same pattern at both the Causeway (Woodlands) and the Second Link (Tuas).</p>
<h3>How to beat the queue</h3>
<ul>
  <li><strong>Cross before 7 AM or after 9 PM</strong> — the golden rule applies double on election weekend.</li>
  <li><strong>Take the bus.</strong> Bus CW1 from Kranji and bus 170 from Queen Street use bus lanes that clear far faster than car queues. Full details in our <a href="/blog/singapore-to-jb-day-trip-causeway-guide">Causeway crossing guide</a>.</li>
  <li><strong>Shift your crossing day.</strong> If your plans are flexible, cross on Thursday 9 July or Monday 13 July instead.</li>
  <li><strong>Or just stay in JB.</strong> Skip the border entirely — base yourself in Taman Pelangi for the weekend and explore JB while the queues rage on.</li>
</ul>

<h2>What's Open on Polling Day</h2>
<p>Saturday 11 July is a public holiday in Johor, which affects businesses differently:</p>
<ul>
  <li><strong>Open as usual:</strong> malls, convenience stores, cinemas, most tourist-area restaurants, Grab, and the CIQ border checkpoints (24/7 as always).</li>
  <li><strong>Open, but maybe late:</strong> smaller kopitiam, mamak stalls, and family-run shops — many owners vote in the morning and open by lunchtime.</li>
  <li><strong>Closed:</strong> banks, government offices, and some offices/factories.</li>
</ul>
<p>In Taman Pelangi, you'll still find breakfast — just with slightly fewer choices before noon than a typical Saturday.</p>

<h2>Is It Safe to Visit During an Election?</h2>
<p>Yes. Malaysian elections are orderly, festive affairs — think flags, banners, campaign trucks with loudspeakers, and lively kopitiam debates rather than anything worrying. Voting happens quietly at schools and community halls, and by evening everyone is glued to the results coverage.</p>
<p>Two small courtesies for visitors: don't photograph people inside polling centres, and avoid wearing political party colours or logos near polling stations on the day.</p>

<h2>Why Election Weekend Is Actually a Great Time to Stay in JB</h2>
<ul>
  <li><strong>The atmosphere.</strong> Election night in a Malaysian kopitiam — live results on every screen, teh tarik flowing — is a genuine cultural experience you can't book a ticket for.</li>
  <li><strong>Singapore day-trippers thin out.</strong> With locals focused on voting, some attractions and cafes are quieter than a normal Saturday.</li>
  <li><strong>You're not going anywhere anyway.</strong> If you're mid-way through a JB↔SG itinerary, riding out the border rush from a RM35 pod beats sitting in a bus queue for three hours.</li>
</ul>

<h2>Your Stay at Pelangi Capsule Hostel</h2>
<p>We operate <strong>completely as usual</strong> through the election weekend:</p>
<ul>
  <li><strong>Check-in:</strong> 2:00 PM onwards (24/7 self check-in — arrive any time)</li>
  <li><strong>Check-out:</strong> before 12:00 PM</li>
  <li><strong>Address:</strong> 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</li>
  <li><strong>WhatsApp:</strong> +60 12-708 8789 if you need anything</li>
</ul>
<p>One honest tip: <strong>book early for 10–12 July</strong>. Returning voters and their families snap up budget beds in JB faster than a normal weekend, and pods are limited. <a href="/book">Reserve your pod</a> now and cross the Causeway on your own schedule.</p>
`,
		},
		// 37
		{
			Slug:          "rts-link-jb-singapore-final-testing-2026",
			ImageAlt:      "Vehicles crossing the Johor–Singapore Causeway, soon to be relieved by the RTS Link rail line connecting Bukit Chagar to Woodlands North",
			Title:         "JB–Singapore RTS Link 2026: What the Final Testing Phase Means for Travellers",
			Excerpt:       "The RTS Link is now in comprehensive testing with customs and immigration agencies from both countries. Here is what the timeline means for commuters and travellers planning a stay in Johor Bahru before and after opening.",
			Date:          "2026-07-05",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"rts-link", "johor-bahru", "singapore", "commuter", "causeway", "jb-travel-2026", "rail"},
			FeaturedImage: "/images/blog/rts-link-jb-singapore-final-testing-2026.webp",
			Content: `
<h2>The Short Version</h2>
<p>The Johor Bahru–Singapore RTS Link is a 4 km light rail line connecting <strong>Bukit Chagar station (JB)</strong> to <strong>Woodlands North station (Singapore)</strong>. Trials began in December 2025 without passengers, and from July 2026 the project entered its final comprehensive testing phase — the most complex stretch, involving customs, immigration, and security agencies from both countries simultaneously. Targeted completion remains <strong>31 December 2026</strong>, with full public operations expected by <strong>January 2027</strong>.</p>
<p>If you are planning a trip to JB in the second half of 2026, or thinking about commuting between both cities once the line opens, this is the timeline you need to understand.</p>

<h2>Where the Project Stands Right Now</h2>
<p>As of mid-2026, systems and operational works had passed <strong>65% completion</strong> (per the November 2025 progress report). The current July–December 2026 testing window is the critical final hurdle: it is not just testing the trains themselves but validating the integrated operations of both countries' border agencies in a live environment. That is a much harder coordination challenge than running empty trains on a track.</p>
<p>Key facts about the line:</p>
<ul>
  <li><strong>Length:</strong> 4 km, connecting the two border districts</li>
  <li><strong>Journey time:</strong> approximately 5 minutes between the two terminals</li>
  <li><strong>Rolling stock:</strong> 8 train sets, 4 coaches each</li>
  <li><strong>Capacity:</strong> up to 10,000 passengers per hour per direction</li>
  <li><strong>Expected one-way fare:</strong> S$5–S$7 (final fares to be confirmed in the second half of 2026)</li>
</ul>
<p>The fare range, once confirmed, will make crossing dramatically faster than sitting in Causeway traffic — and far more predictable.</p>

<h2>What This Means If You Are Commuting Now</h2>
<p>The RTS Link is not open yet. Until it is, the two main options remain:</p>
<ul>
  <li><strong>Causeway buses:</strong> CW1 (Larkin ↔ Kranji MRT) and bus 170 (Larkin ↔ Queen Street). Budget RM5–RM10 one-way depending on operator, plus queuing time at the checkpoint.</li>
  <li><strong>KTM Shuttle Tebrau:</strong> Runs between JB Sentral and Woodlands CIQ. Short hop, roughly RM5 from the JB side, useful for avoiding the Causeway pedestrian queue.</li>
</ul>
<p>The current crossing experience — functional, but queues at peak hours can stretch 30–90 minutes — is exactly why the RTS Link is being watched so closely. <a href="/blog/jb-singapore-commuter-guide-2026">Our JB–Singapore commuter guide covers current crossing options in detail.</a> The <a href="/blog/singapore-to-jb-day-trip-causeway-guide">day-trip Causeway guide</a> is also worth reading if you are visiting from Singapore for the first time.</p>

<h2>The Accommodation Logic for 2026 and Early 2027</h2>
<p>Once the RTS Link opens, Bukit Chagar becomes the new focal point for travellers crossing from Singapore. Demand for accommodation within easy reach of that station will increase — it is a straightforward consequence of making the crossing faster and more predictable.</p>
<p>Pelangi Capsule Hostel is roughly <strong>10 minutes' drive from the Bukit Chagar station area</strong>, putting you in the same corridor as JB Sentral and the causeway checkpoint. The same proximity that makes us convenient for current bus and KTM crossings will hold once the RTS opens.</p>

<table>
  <thead>
    <tr>
      <th>Period</th>
      <th>Best crossing method</th>
      <th>Estimated crossing time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Now (July 2026)</td>
      <td>Causeway bus CW1/170, or KTM Shuttle</td>
      <td>45–90 min including queue</td>
    </tr>
    <tr>
      <td>From Jan 2027 (projected)</td>
      <td>RTS Link (Bukit Chagar ↔ Woodlands North)</td>
      <td>~5 min rail + immigration time</td>
    </tr>
  </tbody>
</table>

<h2>Planning Your Stay Around the Timeline</h2>
<p>If you are visiting JB now, treat the current situation as business as usual — Causeway crossings are manageable with the right timing (avoid Sunday evenings, Malaysian public holidays, and peak-hour Fridays). If you are planning a trip for early 2027, it is worth watching LTA's official updates before booking transport, as the January 2027 operational date could shift slightly depending on how the remaining testing phases resolve.</p>
<p>For commuters already living between both cities, JB accommodation is increasingly a practical choice. At <strong>RM30/night on weekdays</strong> and <strong>RM35/night on weekends</strong>, a monthly stay from <strong>RM600/month</strong>, and a 10-minute drive to the crossing — the numbers work well as a base while the RTS testing phase completes.</p>
<p>We offer <strong>24/7 self check-in</strong>, free WiFi, and standard check-in from <strong>2:00 PM</strong> (check-out by <strong>12:00 PM</strong>). WhatsApp us on <strong>+60 12-708 8789</strong> if you have questions about long stays or flexible arrangements.</p>
<p>See our <a href="/blog/3-day-jb-backpacker-itinerary-rm250">3-day JB backpacker itinerary</a> if you are still working out what to do once you arrive.</p>

<h2>Book a Pod</h2>
<p>Whether you are crossing for a day trip, a week of work, or planning ahead for the RTS era, Pelangi gives you a quiet, affordable base close to the action. <a href="/book">Book your capsule pod here</a> — or check <a href="/rooms">room types and pricing</a> if you want to compare weekday and weekend rates before committing.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.lta.gov.sg/content/ltagov/en/upcoming_projects/rail_expansion/JB-Singapore_RTS_link.html" target="_blank" rel="noopener">Land Transport Authority (Singapore) — JB–Singapore RTS Link project page</a></li>
  <li><a href="https://paultan.org/2025/11/04/rts-link-first-trial-phase-to-begin-in-december-without-passengers-still-targeted-for-dec-2026-completion/" target="_blank" rel="noopener">paultan.org — RTS Link first trial phase to begin in December, still targeted for Dec 2026 completion</a></li>
  <li><a href="https://www.mot.gov.sg/news-resources/newsroom/singapore-and-malaysia-commemorate-the-unveiling-of-the--first-johor-bahru---singapore-rts-link-train/" target="_blank" rel="noopener">Ministry of Transport Singapore — Unveiling of the first JB–Singapore RTS Link train</a></li>
</ul>
`,
		},
		// 38 — scheduled: goes live 2026-07-08
		{
			Slug:          "july-best-month-visit-johor-bahru-low-season",
			ImageAlt:      "Quiet morning at a Johor Bahru attraction during July low season, with short queues and overcast tropical sky",
			Title:         "Why July Is Actually the Best Month to Visit Johor Bahru on a Budget",
			Excerpt:       "Low season in JB means shorter queues, cheaper pods, and durian at its absolute peak. Here is an honest look at what July offers — and one thing worth planning around.",
			Date:          "2026-07-08",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"johor-bahru", "july", "low-season", "durian-season", "budget-travel", "things-to-do", "travel-tips"},
			FeaturedImage: "/images/blog/july-best-month-visit-johor-bahru-low-season.webp",
			Content: `
<h2>The Short Version</h2>
<p>July is a low-season month for JB tourism. That means shorter queues at LEGOLAND and other attractions, easier table-finding at popular restaurants, and the same accommodation you would pay a premium for in December available at everyday rates. It also coincides with <strong>peak durian season</strong> — arguably the single best reason to be in Johor in the middle of the year. There is one scheduling note worth knowing about (more on that below), but overall, July is quietly one of the better months to visit if you are travelling on a budget.</p>

<h2>Low Season — What That Actually Means</h2>
<p>JB tourism peaks around school holidays (June, November–December) and major Malaysian public holidays. July sits in a quieter window. In practical terms:</p>
<ul>
  <li><strong>LEGOLAND Malaysia and other paid attractions:</strong> Same-day tickets are usually available. Weekday mornings are noticeably calm. Weekend slots at popular spots can still fill, so booking a day ahead remains sensible.</li>
  <li><strong>Restaurants:</strong> Popular local spots — especially the hawker centres near Jalan Tan Hiok Nee — are easier to get into on weekday evenings.</li>
  <li><strong>Causeway crossings:</strong> Still busy during Friday evenings and Sunday returns, but weekday crossings are generally smoother than peak season. See <a href="/blog/singapore-to-jb-day-trip-causeway-guide">our Causeway day-trip guide</a> for timing advice.</li>
</ul>
<p>Low season does not mean empty — JB has year-round domestic tourism from KL and Singapore. It means the difference between a 45-minute queue and a 20-minute queue, a full restaurant and a table in ten minutes. Meaningful differences if you are trying to get the most out of a short trip.</p>

<h2>Durian Season: The Real Reason to Come in July</h2>
<p>Johor's durian season typically peaks in July, and it is not a minor occasion. <strong>Musang King (D197)</strong> is widely available — the variety that commands the highest prices in Singapore supermarkets is here in JB at a fraction of the cost, sold straight from lorry beds and roadside stalls.</p>
<p>Where to find it:</p>
<ul>
  <li><strong>Jalan Tan Hiok Nee and surrounding streets:</strong> Night stalls set up from around 6 PM, with fruit arriving from Pahang and Johor highland farms. You can usually smell them before you see them.</li>
  <li><strong>Pasar malam (night markets):</strong> Rotating locations around the city throughout the week — ask at the hostel for the current schedule.</li>
  <li><strong>Roadside lorries:</strong> Trucks from Pahang park along major roads and offer unsealed fruit by weight. No frills, often better value than fixed stalls.</li>
</ul>
<p>If you have never eaten durian sitting on a plastic stool at 10 PM in Malaysia, July is the month to fix that.</p>

<h2>One Thing to Plan Around: Johor State Election, 11 July 2026</h2>
<p>Johor state election day falls on <strong>Saturday, 11 July 2026</strong>, which is a public holiday in Johor. This creates predictable congestion: many Malaysian voters working in Singapore return home to cast ballots, meaning the <strong>Causeway will be unusually busy on Friday 10 July</strong> (people going home) and <strong>Sunday 12 July</strong> (people returning). If your trip overlaps with that weekend, either build in extra crossing time or shift your arrival and departure to avoid those specific days.</p>
<p>We have a separate post covering this in more detail: <a href="/blog/johor-state-election-2026-travellers-guide">Johor State Election 2026 — traveller's guide</a>. The short version: the election weekend is manageable with a bit of planning, and the rest of July is unaffected.</p>

<h2>Honest Note on July Weather</h2>
<p>JB sits close to the equator, and July afternoons bring convective thunderstorms — typically arriving between 2 PM and 5 PM and clearing within an hour or two. Morning and evening temperatures are comfortable for walking. The practical approach: do outdoor activities in the morning, eat or rest during the afternoon downpour, then go out again in the evening. This rhythm works naturally with how JB operates anyway — most good food action starts after 7 PM.</p>

<h2>A Budget Week Skeleton</h2>
<p>If you are planning a week in JB on a tight budget, arriving on a weekday is the straightforward move — capsule pods at Pelangi are <strong>RM30/night on weekdays</strong>, versus <strong>RM35/night on weekends</strong>. Across a 5-night weekday stay, that is RM150 for accommodation.</p>

<table>
  <thead>
    <tr>
      <th>Day</th>
      <th>Activity sketch</th>
      <th>Approx. cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Weekday arrival</td>
      <td>Check in from 2 PM, walk to Taman Pelangi eateries for dinner</td>
      <td>RM10–15 dinner</td>
    </tr>
    <tr>
      <td>Day 2</td>
      <td>Morning: hawker breakfast + explore Jalan Dhoby heritage area. Afternoon: rest during thunderstorm window. Evening: durian stalls near Jalan Tan Hiok Nee</td>
      <td>RM25–35 food + durian</td>
    </tr>
    <tr>
      <td>Day 3</td>
      <td>LEGOLAND or Desaru (book day before). Same-day tickets available in July.</td>
      <td>RM75–120 entry + transport</td>
    </tr>
    <tr>
      <td>Day 4</td>
      <td>Free morning at Danga Bay waterfront, afternoon KSL City Mall or City Square for air-conditioned reset</td>
      <td>RM10–20 food</td>
    </tr>
    <tr>
      <td>Day 5 (weekend)</td>
      <td>Check out by 12 PM or extend at weekend rate (RM35). Night bus or crossing to Singapore.</td>
      <td>RM35 pod if extending</td>
    </tr>
  </tbody>
</table>

<p>For a more detailed day-by-day plan with specific food stops and transport, see our <a href="/blog/3-day-jb-backpacker-itinerary-rm250">3-day JB backpacker itinerary</a>.</p>

<h2>Pelangi in July</h2>
<p>We are a short walk from Taman Pelangi's row of kopitiam and casual restaurants, and roughly <strong>10 minutes' drive from JB Sentral and the CIQ causeway checkpoint</strong>. 24/7 self check-in means no pressure to arrive at a particular hour — useful if your bus from Singapore runs late. Standard check-in is from <strong>2:00 PM</strong>; check-out by <strong>12:00 PM</strong>. Free WiFi throughout. WhatsApp us on <strong>+60 12-708 8789</strong> for any questions about July availability or longer stays (monthly rates from <strong>RM600</strong> for those considering an extended base).</p>
<p>See <a href="/blog/jb-singapore-commuter-guide-2026">our commuter guide</a> if you are crossing regularly and want to understand current options while the <a href="/blog/rts-link-jb-singapore-final-testing-2026">RTS Link completes testing</a>.</p>

<h2>Book Your July Pod</h2>
<p>Weekday availability in July is generally good, but specific dates around the election weekend (10–12 July) may move faster than usual. <a href="/book">Book your capsule pod here</a>, or check <a href="/rooms">room types and current rates</a> to compare options before you decide.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://thingstodoinjohorbahru.com/month/july/" target="_blank" rel="noopener">Things to Do in Johor Bahru — July guide</a></li>
  <li><a href="https://thingstodoinjohorbahru.com/events/" target="_blank" rel="noopener">Things to Do in Johor Bahru — Events calendar</a></li>
</ul>
`,
		},
		// 39 — scheduled: goes live 2026-07-11
		{
			Slug:          "rm594-month-jb-long-stay-singapore-commute-base",
			ImageAlt:      "Inside a capsule pod at Pelangi Capsule Hostel, Johor Bahru — monthly stays from RM600 for Singapore commuters",
			Title:         "RM600/Month Capsule Pod: The Honest Maths for JB-Based Singapore Commuters",
			Excerpt:       "If you're starting a new job in Singapore and not ready to sign a 12-month tenancy, a monthly capsule pod in JB changes the financial equation significantly. Here's how the numbers actually stack up.",
			Date:          "2026-07-11",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"monthly-stay", "jb-singapore-commute", "budget-accommodation", "johor-bahru", "long-stay", "capsule-hostel", "cost-of-living"},
			FeaturedImage: "/images/blog/rm594-month-jb-long-stay-singapore-commute-base.webp",
			Content: `
<h2>The Problem With Signing a Tenancy Before Your Job Starts</h2>
<p>You've landed a job offer in Singapore. The start date is three weeks away. Your new employer wants you at the office in Toa Payoh. You're sitting in Johor Bahru, Googling "room rental JB near CIQ" and realising that every room listing comes with strings attached: two months deposit, one month advance, 12-month contract, utilities separate.</p>
<p>For someone on probation — typically three to six months — signing a 12-month tenancy before you even know if the role works out is a significant financial bet. This post runs through the honest maths of using a monthly capsule pod at <strong>Pelangi Capsule Hostel</strong> as your base during those first months, versus committing to a conventional room rental. It's not the right answer for everyone, and I'll be clear about who it suits and who it doesn't.</p>

<h2>What a Monthly Stay at Pelangi Actually Costs</h2>
<p>Monthly stays at Pelangi start from <strong>RM600/month</strong>. That rate covers your capsule pod, utilities, and WiFi — no separate bills, no deposit contract, no minimum tenure beyond the month you pay for. You can check in on a Monday and check out 30 days later if something changes.</p>
<p>The nightly rate for short stays is <strong>RM30 on weekdays and RM35 on weekends</strong>. If you're doing a full calendar month of 30 nights at those nightly rates you'd pay more — the monthly rate is specifically designed for people settling in for the longer haul. Check-in is 2:00 PM, check-out 12:00 PM, and the building has 24/7 self check-in, which matters if you're crossing the Causeway on irregular shift times.</p>
<p>For a full look at room types and availability, see our <a href="/rooms">rooms page</a>.</p>

<h2>What a Conventional JB Room Rental Actually Costs</h2>
<p>Looking at current listings on property portals, a single room in a shared house in areas like Taman Pelangi, Mount Austin, or Bukit Indah typically runs somewhere in the <strong>RM500–RM900/month</strong> range, depending on location, furnishing, and whether air conditioning is included. Most landlords ask for a deposit structure of two months security plus one month advance — so you're paying roughly <strong>RM1,500–RM2,700 upfront</strong> before you sleep a single night.</p>
<p>On top of that, utilities — electricity, water, sometimes wifi — are usually billed separately or split among housemates. It adds up. The commitment is typically a 12-month tenancy, which means if the job falls through or you decide to relocate to Singapore-side after probation, you're negotiating an early exit or forfeiting your deposit.</p>
<p><em>Ranges cited are approximate based on listings as of July 2026. Check iProperty or similar portals for current figures in your preferred area.</em></p>

<h2>The Commuter Maths: JB to Singapore Daily</h2>
<p>The Causeway crossing is the constant in this equation. Pelangi is roughly a <strong>10-minute drive</strong> from JB Sentral and the CIQ checkpoint. From Taman Pelangi you can take a Grab or local taxi to the checkpoint, then cross via bus into Singapore.</p>
<p>The two main bus options are <strong>CW1 (to Kranji MRT)</strong> and <strong>bus 170 (to Queen Street terminal)</strong>. Both run regularly and connect you to Singapore's MRT network. From Kranji you can reach most of Singapore's commercial districts in under 40 minutes by train.</p>
<p>The practical golden rule that experienced commuters follow: <strong>cross before 7:00 AM or after 9:00 PM</strong> on weekdays to avoid peak congestion at the checkpoint. If your employer requires a fixed 9 AM start, work backwards — a 6:00 AM departure from Taman Pelangi is realistic. It's a discipline, but tens of thousands of Malaysians do it every working day.</p>
<p>For a more detailed breakdown of the crossing options, timing, and costs, read our post on the <a href="/blog/jb-singapore-commuter-guide-2026">JB–Singapore commuter guide</a>.</p>

<h2>Side-by-Side Cost Comparison</h2>
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Pelangi Monthly Pod</th>
      <th>JB Room Rental (typical)</th>
      <th>Singapore Room Rental (typical)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monthly accommodation</td>
      <td>RM600</td>
      <td>RM500–900</td>
      <td>S$700–1,200 (≈RM2,300–4,000)</td>
    </tr>
    <tr>
      <td>Upfront deposit</td>
      <td>None (pay monthly)</td>
      <td>≈RM1,500–2,700 (2+1 months)</td>
      <td>≈S$1,400–2,400 (typically 2 months)</td>
    </tr>
    <tr>
      <td>Utilities</td>
      <td>Included</td>
      <td>Extra (split or billed separately)</td>
      <td>Sometimes included, sometimes extra</td>
    </tr>
    <tr>
      <td>WiFi</td>
      <td>Included (free)</td>
      <td>Often separate or shared plan</td>
      <td>Usually included</td>
    </tr>
    <tr>
      <td>Minimum commitment</td>
      <td>1 month</td>
      <td>Typically 12 months</td>
      <td>Typically 6–12 months</td>
    </tr>
  </tbody>
</table>
<p><em>Singapore room rental ranges from Wise's cost-of-living guidance for Malaysians working in Singapore. All figures approximate and dated July 2026. Note: Malaysia's RM10/night Tourism Tax applies to foreign tourists only — Malaysian citizens are exempt.</em></p>

<h2>Who This Actually Suits</h2>
<p>A capsule pod is a practical base for someone who is:</p>
<ul>
  <li><strong>Single, travelling light</strong> — one bag, a work laptop, minimal belongings</li>
  <li><strong>On probation or a short-term contract</strong> — not ready to lock capital into deposits</li>
  <li><strong>Uncertain about their long-term base</strong> — might move to Singapore-side after six months, or transfer to a different city</li>
  <li><strong>Prioritising cash flow</strong> — RM600/month leaves more runway than a tenancy deposit during the gap between job start and first payslip</li>
  <li><strong>Crossing the Causeway daily</strong> — the 10-minute proximity to JB Sentral and CIQ is the whole point</li>
</ul>

<h2>Who It Doesn't Suit</h2>
<p>I'd rather be honest here than sell a pod to someone it won't work for. A capsule hostel is <strong>not</strong> the right answer if you:</p>
<ul>
  <li>Are moving with a partner or family — a shared pod room isn't a family home</li>
  <li>Work from home or need a private desk for video calls during the day — capsule pods are for sleeping, not working</li>
  <li>Have a lot of belongings — storage in a pod is limited; a locker is available but it's not a wardrobe</li>
  <li>Value long-term rental stability and plan to stay in JB for more than six months with certainty — at that point, a conventional room with a proper lock-in may actually work out cheaper per month</li>
</ul>
<p>If you're in the second camp but want to read more about finding work in Singapore while based in JB, the posts on <a href="/blog/singapore-work-pass-guide-malaysians">Singapore work pass types for Malaysians</a> and <a href="/blog/how-malaysians-find-jobs-singapore-2026">how Malaysians find jobs in Singapore</a> are worth reading first.</p>

<h2>The Practical Verdict</h2>
<p>The RM600/month pod isn't for everyone, and it isn't supposed to be. But for a single person starting a new Singapore role and wanting to preserve cash flow during probation, it removes a significant upfront cost (no deposit lock-in) and keeps your options open. Food in Taman Pelangi is within walking distance — hawker meals from RM5–8 — and the crossing to Singapore is a known quantity once you build the rhythm into your mornings.</p>
<p>If you have questions about availability or want to talk through whether a monthly stay suits your situation, WhatsApp us at <strong>+60 12-708 8789</strong> directly.</p>
<p>Ready to check availability and book? <a href="/book">See current availability and rates here</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.iproperty.com.my/" target="_blank" rel="noopener">iProperty — JB room rental listings (typical ranges, July 2026)</a></li>
  <li><a href="https://wise.com/my/blog/singapore-work-permit-for-malaysian" target="_blank" rel="noopener">Wise — Singapore work permit and cost context for Malaysians</a></li>
</ul>
`,
		},
		// 40 — scheduled: goes live 2026-07-14
		{
			Slug:          "singapore-lqs-1800-july-2026-malaysians-guide",
			ImageAlt:      "Malaysian workers boarding a Causeway bus at JB Sentral for the daily commute to Singapore",
			Title:         "Singapore LQS Rises to S$1,800 in July 2026: What Malaysian Job Seekers Need to Know",
			Excerpt:       "Singapore's Local Qualifying Salary increased to S$1,800 on 1 July 2026. If you're a Malaysian applying for or renewing a Work Permit or S Pass, here's what the change actually means for your job hunt and timing.",
			Date:          "2026-07-14",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"singapore", "work-permit", "lqs", "s-pass", "malaysian-workers", "career", "policy-2026"},
			FeaturedImage: "/images/blog/singapore-lqs-1800-july-2026-malaysians-guide.webp",
			Content: `
<h2>Singapore's Local Qualifying Salary Changed on 1 July 2026</h2>
<p>If you're a Malaysian looking for work in Singapore — or already there on a Work Permit or S Pass and due for renewal — there's a policy update that directly affects your chances of getting hired or renewed: the <strong>Local Qualifying Salary (LQS) rose from S$1,600 to S$1,800</strong> effective 1 July 2026.</p>
<p>This isn't just a wage floor for Singapore citizens. It has a direct knock-on effect on how many foreign workers — including Malaysians on Work Permits — a company is allowed to employ. This post explains what LQS is, how it affects you practically, and what the current salary thresholds are for the main pass types Malaysians use.</p>
<p><strong>Important disclaimer:</strong> Policy figures change, and this post reflects what is publicly confirmed as of early July 2026. Always verify current figures directly on MOM's official website before making any decisions about employment or pass applications.</p>

<h2>What Is the Local Qualifying Salary?</h2>
<p>The LQS is the <strong>minimum salary a Singapore citizen or permanent resident must be paid</strong> in order to count as a full local employee in a firm's headcount for workforce quota purposes.</p>
<p>Singapore's foreign worker quota system works like this: for most sectors, a company can only hire a certain ratio of foreign workers relative to its local workforce. If a local employee earns below the full LQS, they count as only a partial employee (in some cases 0.5, in others 0) toward that quota. This matters because if a company's local headcount shrinks — or effectively shrinks because local staff are below the new LQS — the number of foreign workers they're permitted to hire or renew drops with it.</p>
<p>From 1 July 2026, the new threshold is <strong>S$1,800/month</strong>. Any local staff still on S$1,600–S$1,799 now fall below the qualifying line until their employer adjusts their salary.</p>

<h2>How This Affects Malaysian Job Seekers and Work Permit Holders</h2>
<p>The practical effect: if an employer hasn't raised local staff salaries to match the new LQS, their foreign-worker quota headroom may have effectively reduced on 1 July 2026. This can mean:</p>
<ul>
  <li><strong>New hire delays</strong> — An employer who wants to bring in a new Work Permit holder may find they no longer have quota space until they sort out local salary compliance</li>
  <li><strong>Renewal complications</strong> — Existing Work Permit holders up for renewal at employers with tight or non-compliant quotas may face delays or non-renewal</li>
  <li><strong>Sectors most affected</strong> — F&B, retail, cleaning, and other services sectors typically have the highest ratios of lower-wage local staff and are most sensitive to LQS changes</li>
</ul>
<p>The practical question to ask any potential employer: <em>"Is your local workforce quota headroom in order after the July 2026 LQS update?"</em> A good employer will have an answer. If they don't, that tells you something about how prepared they are.</p>

<h2>Current Pass Thresholds for Malaysians (July 2026)</h2>
<p>Here's a reference table of the current salary thresholds for the three main pass types Malaysians use. These are <strong>minimums at the time of writing</strong> — confirm on MOM's site for your specific sector and situation:</p>
<table>
  <thead>
    <tr>
      <th>Pass Type</th>
      <th>Current Minimum Salary</th>
      <th>Upcoming Change</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Work Permit (Malaysian)</td>
      <td>No fixed minimum salary</td>
      <td>—</td>
      <td>Eligible age 18–58 (vs 18–50 for non-Malaysians — a real advantage)</td>
    </tr>
    <tr>
      <td>S Pass</td>
      <td>S$3,300/month</td>
      <td>S$3,600 from 1 Jan 2027 (new applications)</td>
      <td>Levy S$650/month payable by employer; subject to quota ceiling</td>
    </tr>
    <tr>
      <td>Employment Pass</td>
      <td>S$5,600/month</td>
      <td>S$6,000 from 1 Jan 2027 (all sectors except financial services)</td>
      <td>Financial services sector has a higher threshold — check MOM directly</td>
    </tr>
  </tbody>
</table>
<p>For most Malaysians entering Singapore's workforce in services, F&B, construction, or manufacturing, the <strong>Work Permit</strong> is the relevant pass — and the extended age eligibility to 58 (vs 50 for other nationalities) is a concrete advantage that's worth knowing. The LQS change affects you indirectly via your employer's quota, not via your own salary requirement on the permit itself.</p>

<h2>The January 2027 Changes Are Already Coming</h2>
<p>If you're targeting an S Pass or EP, note that the qualifying salary thresholds are rising again in January 2027. For S Pass applicants, the minimum goes from S$3,300 to <strong>S$3,600</strong>. For Employment Pass, from S$5,600 to <strong>S$6,000</strong>.</p>
<p>If you're currently at S$3,300–S$3,599 on an S Pass, your renewal in 2027 will require a salary uplift — something worth discussing with your employer well before the renewal date rather than two weeks before it expires.</p>

<h2>What You Can Do While You Wait</h2>
<p>Job searches take time. Permit approvals take time. Employer quota complications take time. If you're based in JB, working through that gap without burning through savings is a real practical problem.</p>
<p>Some options worth considering:</p>
<ul>
  <li><strong>Gig work in JB</strong> — delivery, freelance, or short-term local work while the Singapore application is processed. Read our post on <a href="/blog/gig-jobs-malaysia-waiting-singapore-work-pass">gig jobs in Malaysia while waiting for a Singapore work pass</a> for specifics.</li>
  <li><strong>Keep accommodation flexible</strong> — if you're not certain when the Singapore role will start or whether it will start, committing to a 12-month JB tenancy before you have a confirmed offer is a financial risk. A monthly stay option keeps your options open without a large deposit outlay.</li>
  <li><strong>Understand your employer's pass situation before you resign from your current job</strong> — if they're scrambling with LQS compliance, a new Work Permit application for you may take longer than either of you expect.</li>
</ul>
<p>For a broader guide to the job-hunting process itself, see <a href="/blog/how-malaysians-find-jobs-singapore-2026">how Malaysians find jobs in Singapore in 2026</a> and the full <a href="/blog/singapore-work-pass-guide-malaysians">Singapore work pass guide for Malaysians</a>.</p>

<h2>Staying at Pelangi During the Transition Period</h2>
<p>Pelangi Capsule Hostel is a 10-minute drive from JB Sentral and CIQ. If you're commuting daily to Singapore for interviews, trial shifts, or your first weeks on a new job, the location works in your favour. Pods are <strong>RM30/night on weekdays and RM35/night on weekends</strong>, with monthly rates from <strong>RM600</strong> (utilities and WiFi included). No deposit, no minimum tenancy — monthly stays renew on your terms.</p>
<p>24/7 self check-in means the building works around your hours, not the other way around. If you're crossing before 7:00 AM to beat the Causeway rush, that flexibility matters.</p>
<p>Questions? WhatsApp us directly at <strong>+60 12-708 8789</strong>.</p>
<p><a href="/book">Check availability and book a stay here.</a></p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.mom.gov.sg/employment-practices/progressive-wage-model/local-qualifying-salary" target="_blank" rel="noopener">Ministry of Manpower Singapore — Local Qualifying Salary official page</a></li>
  <li><a href="https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-059.html" target="_blank" rel="noopener">KPMG — Singapore Budget 2026 Flash Alert (GMS Flash Alert 2026-059)</a></li>
  <li><a href="https://www.humanresourcesonline.net/legal-and-policy-changes-to-look-out-for-across-singapore-and-malaysia-in-2026" target="_blank" rel="noopener">Human Resources Online — Legal and policy changes across Singapore and Malaysia in 2026</a></li>
</ul>
`,
		},
		// 41 — scheduled: goes live 2026-07-17
		{
			Slug:          "jb-durian-season-july-2026-budget-guide",
			ImageAlt:      "Durian stalls at night along Jalan Tan Hiok Nee heritage street, Johor Bahru, with crates of Musang King and D24",
			Title:         "JB Durian Season July 2026: A Budget Traveller's Guide to Eating Well Without Getting Ripped Off",
			Excerpt:       "July is peak durian season in Johor Bahru, and Jalan Tan Hiok Nee lights up every night with stalls piled high with Musang King, D24, and kampung varieties. Here is how to eat smart and avoid the common traps.",
			Date:          "2026-07-17",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"durian-season", "johor-bahru", "food", "musang-king", "budget-travel", "tan-hiok-nee", "night-stalls"},
			FeaturedImage: "/images/blog/jb-durian-season-july-2026-budget-guide.webp",
			Content: `
<h2>Why July Is the Best Time to Visit JB for Durian</h2>
<p>If you time your trip to Johor Bahru in July, you land in the middle of peak durian season. Supply trucks roll down from Pahang and Johor's inland orchards every night, and the heritage streets around <strong>Jalan Tan Hiok Nee</strong> transform into a durian lover's circuit from early evening onwards. Stalls stack crates three rows deep, and the smell hits you from the end of the street — you will not miss them.</p>
<p>This is not just a local thing. Durian tourists cross the Causeway specifically for this window. The difference between eating durian in JB versus Singapore is significant — better freshness, more variety, and prices that reflect local supply rather than import premiums.</p>

<h2>The Three Varieties You Need to Know</h2>
<p>Before you sit down at any stall, understand what you are ordering. The board price changes nightly depending on that evening's supply, so do not anchor on what you read online. Here is a practical breakdown of the main types you will encounter:</p>

<table>
  <thead>
    <tr>
      <th>Variety</th>
      <th>Flavour Profile</th>
      <th>Relative Price Tier</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Musang King (Mao Shan Wang)</strong></td>
      <td>Rich, creamy, bittersweet with a thick golden flesh; low seed-to-flesh ratio</td>
      <td>Premium — highest price on the board</td>
    </tr>
    <tr>
      <td><strong>D24 (Sultan)</strong></td>
      <td>Slightly bitter, silky texture, less intense than Musang King; widely available</td>
      <td>Mid-range — good value for the quality</td>
    </tr>
    <tr>
      <td><strong>Kampung (Wild/Village)</strong></td>
      <td>Variable by tree — can be thin-fleshed but highly fragrant; rustic character</td>
      <td>Budget — the most affordable option</td>
    </tr>
  </tbody>
</table>

<p>If this is your first time eating durian, start with D24. If you are a returning durian traveller with a budget, kampung varieties offer the best value. Musang King is the headline act — worth trying once, but it commands a premium that swings sharply on nights when supply is tight.</p>

<h2>How to Buy Without Getting Caught Out</h2>
<p>There are a few simple rules that will save you from an unpleasant surprise at the till:</p>
<ul>
  <li><strong>Check the board price first.</strong> Every reputable stall posts the current price per kg on a whiteboard at the front. If there is no board, ask before you sit. Prices change nightly with supply — what you paid last Tuesday may be different on Saturday.</li>
  <li><strong>Confirm the weight before the stall opens the durian.</strong> Once it is open, it is yours. Ask the vendor to place it on the scale and show you the weight before they crack it. This is normal practice and no decent vendor will object.</li>
  <li><strong>Carry cash.</strong> Most stalls at the Tan Hiok Nee night cluster are cash-only. A small number accept DuitNow QR, but do not rely on it. Draw cash before you head out.</li>
  <li><strong>Arrive by 8 PM for best selection.</strong> Stalls open from early evening, and the better boxes of Musang King sell out first. If you want first pick, do not leave it until 10 PM.</li>
</ul>

<h2>Getting There from Taman Pelangi</h2>
<p>Jalan Tan Hiok Nee is roughly a 10-minute Grab ride from <strong>Taman Pelangi</strong>, where Pelangi Capsule Hostel is based. Factor in evening Grab surge pricing on weekends — it is still a short, inexpensive ride. Alternatively, Tan Hiok Nee is walkable from JB Sentral if you combine it with a day trip through the city centre.</p>
<p>For a full picture of the food scene around the hostel and the wider city, see our <a href="/blog/ultimate-jb-food-guide-backpackers">ultimate JB food guide for backpackers</a> and the <a href="/blog/jb-hawker-centres-street-food-must-visit">JB hawker centres guide</a>. Taman Pelangi itself has its own weekly food event worth knowing about — the <a href="/blog/taman-pelangi-tuesday-night-market-guide">Tuesday night market</a> is five minutes' walk from the hostel.</p>

<h2>The Durian-in-Room Rule (and Why It Exists)</h2>
<p>One thing worth knowing before you plan your evening: <strong>durian is not permitted inside the hostel</strong>, as is standard practice across most accommodation in Malaysia. The smell is exceptionally persistent and permeates soft furnishings for days — it is a genuine concern for other guests, not just a house rule for the sake of it.</p>
<p>The good news is that this is not a problem in practice. Eating at the stall is the correct way to eat durian. Pull up a plastic chair, eat it fresh, and leave the shells at the stall. It is a better experience than eating it in a room anyway.</p>

<h2>What Else Is On in JB in July</h2>
<p>July is a strong month for JB beyond durian. The city runs a steady calendar of events through the month. Check the <a href="https://thingstodoinjohorbahru.com/events/" target="_blank" rel="noopener">Things to Do in Johor Bahru events page</a> for what is running during your specific dates.</p>

<h2>Staying Near the Action</h2>
<p>Pelangi Capsule Hostel puts you in Taman Pelangi — close to the city's food belt, ~10 minutes from JB Sentral and the CIQ checkpoint, and a short Grab from Tan Hiok Nee. <a href="/rooms">Capsule pods</a> are RM30/night on weekdays and RM35/night on weekends, with monthly rates from RM600. Check-in is 2:00 PM, check-out 12:00 PM, and the property runs 24/7 self check-in — so if your durian run goes late, there is no reception cut-off to worry about. WhatsApp us at <strong>+60 12-708 8789</strong> if you have any questions before you arrive.</p>
<p>Ready to book your July stay? <a href="/book">Check availability and secure your pod here.</a></p>

<h2>Sources</h2>
<ul>
  <li><a href="https://thingstodoinjohorbahru.com/month/july/" target="_blank" rel="noopener">Things to Do in Johor Bahru — July guide</a></li>
  <li><a href="https://thingstodoinjohorbahru.com/events/" target="_blank" rel="noopener">Things to Do in Johor Bahru — Events listing</a></li>
</ul>
`,
		},
		// 42 — pulled forward to 2026-07-12 for max indexing runway before the 25-26 Jul fair
		{
			Slug:          "mystarjob-fair-jb-july-2026-weekend-plan",
			ImageAlt:      "Job fair exhibition hall at Mid Valley Southkey Johor Bahru with attendees in business attire visiting employer booths",
			Title:         "myStarjob Fair JB July 2026: A Job-Hunter's Weekend Plan on a Budget",
			Excerpt:       "The myStarjob Fair returns to Mid Valley Southkey on 25–26 July 2026. Here is how to plan a productive two-day job-hunting weekend in JB — what to bring, how to prepare, and how to keep your total spend around RM125.",
			Date:          "2026-07-12",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"job-fair", "johor-bahru", "jobs", "work-in-singapore", "career", "budget-weekend", "mid-valley-southkey"},
			FeaturedImage: "/images/blog/mystarjob-fair-jb-july-2026-weekend-plan.webp",
			Content: `
<h2>The myStarjob Fair Is Coming to JB — Here Is How to Make the Most of It</h2>
<p>The <strong>myStarjob Fair</strong> is scheduled for <strong>Saturday 25 and Sunday 26 July 2026</strong>, from 11:00 AM, at <strong>Mid Valley Exhibition Centre, Mid Valley Southkey, Johor Bahru</strong>. It brings together employers from Malaysia and Singapore under one roof — which makes it genuinely worth planning a weekend trip around if you are a job-hunter based in Johor or crossing from Singapore.</p>
<p><strong>Important:</strong> event schedules can shift. Before you travel, confirm the current times and any entry requirements directly on the organiser's page. Links are in the Sources section below.</p>

<h2>Why This Fair Matters for JB-Based Job Seekers</h2>
<p>Job fairs in Johor Bahru carry additional weight because of the cross-border dimension. Many of the employers at myStarjob events are recruiting for Singapore-based roles, which means this is not just a local employment event — it is a live opportunity to meet hiring managers you would otherwise only reach via email or LinkedIn.</p>
<p>For Malaysians considering working across the Causeway, the practical information on work passes is worth understanding before you walk through the door. Our post on the <a href="/blog/singapore-work-pass-guide-malaysians">Singapore work pass guide for Malaysians</a> covers the main routes — including the S Pass, which currently carries a minimum qualifying salary of S$3,300 per month, and the Work Permit route for specific sectors. Reading that before the fair means you can ask targeted questions at employer booths rather than spending time on basics. If you are exploring gig or contract work as a bridge, see also our guide on <a href="/blog/how-malaysians-find-jobs-singapore-2026">how Malaysians find jobs in Singapore in 2026</a>.</p>

<h2>What to Bring — The Non-Negotiable Checklist</h2>
<p>Job fairs reward preparation. Here is what to have ready before you leave the hostel on Saturday morning:</p>
<ul>
  <li><strong>Printed CVs — at least 15 copies.</strong> Not every booth has a scanner, and handing a physical CV signals preparation. Print them the night before; do not rely on finding a print shop on the day.</li>
  <li><strong>IC and passport copies.</strong> Bring photocopies of your MyKad and, if applicable, your passport. Some booths request these on the spot for data-entry or on-site applications.</li>
  <li><strong>A pen.</strong> Forms, consent slips, and booth sign-in sheets are ubiquitous at these events. Carry your own rather than hunting for one.</li>
  <li><strong>A printed or digital portfolio</strong> if your field is design, architecture, or any visual/technical discipline. A phone portfolio is fine; a printed one is better if you can manage it.</li>
  <li><strong>A bag that keeps your documents flat.</strong> Crumpled CVs create a poor first impression before you have said a word.</li>
</ul>

<h2>Dress Code</h2>
<p>Business casual is the baseline — long trousers, a collared shirt or blouse, clean shoes. If you are applying for finance, legal, or corporate roles, step it up to business formal. The fair is an air-conditioned exhibition hall, so you will be comfortable in professional dress. Avoid overly casual clothes; this is an interview environment, not a career talk.</p>

<h2>Arrive Early, Leave With Leads</h2>
<p>Doors open at 11:00 AM. Arriving within the first hour gives you access to booths before queues build and before the most engaged hiring managers move on to back-to-back conversations. Plan to spend at least three to four hours if you want to cover the hall properly.</p>
<p>For Singapore-employer booths specifically, prepare a 60-second summary of your experience, your target role, and your available start date. Many Singapore HR teams at these fairs have decision-making authority — they are not just collecting CVs for head office review. A focused conversation can move quickly.</p>

<h2>Getting to Mid Valley Southkey from Taman Pelangi</h2>
<p>Mid Valley Southkey is approximately a 10-minute Grab ride from Taman Pelangi, where Pelangi Capsule Hostel sits. Budget RM8–12 each way depending on traffic and time of day. Saturday morning Grab rides in JB are generally reliable — leave by 10:30 AM to arrive with time to get your bearings before the hall fills up.</p>

<h2>The Budget Breakdown: Around RM125 for the Whole Weekend</h2>
<p>Here is a realistic two-night budget for the fair weekend staying at Pelangi Capsule Hostel:</p>

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Estimated Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Friday night pod (weekend rate)</td>
      <td>RM35</td>
    </tr>
    <tr>
      <td>Saturday night pod (weekend rate)</td>
      <td>RM35</td>
    </tr>
    <tr>
      <td>Grab to/from Mid Valley Southkey (×2)</td>
      <td>~RM20–25</td>
    </tr>
    <tr>
      <td>Meals (hawker centres, Taman Pelangi area)</td>
      <td>~RM25–30</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>~RM115–125</strong></td>
    </tr>
  </tbody>
</table>

<p>That covers accommodation, transport, and food for the full fair weekend. If you print CVs at a local print shop the evening before, add roughly RM5–8 for 15 copies in colour. Still around RM130 all-in.</p>
<p>The Taman Pelangi area has a strong selection of affordable hawker food within walking distance — breakfast and dinner sorted without effort. See our <a href="/blog/jb-hawker-centres-street-food-must-visit">JB hawker centres guide</a> for options nearby.</p>

<h2>Using Friday Night Productively</h2>
<p>If you arrive Friday evening, use that time well. Print and organise your CVs into a folder. Research two or three specific employers you want to prioritise at the fair — check their current job listings online so you can reference specific roles in conversation. Lay out your outfit. Get an early night. Job fairs are more physically and mentally demanding than they look; showing up rested makes a measurable difference.</p>
<p>The hostel runs <strong>24/7 self check-in</strong>, so if you are arriving late Friday after work or the commute from Singapore, there is no reception deadline to worry about. Check in at whatever time suits you.</p>

<h2>Booking Your Stay</h2>
<p>Pelangi Capsule Hostel is at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong>. Pods are <strong>RM30/night weekdays and RM35/night weekends</strong>, with 24/7 self check-in, free WiFi, and check-out at 12:00 PM — giving you a relaxed Sunday morning before heading back. WhatsApp us on <strong>+60 12-708 8789</strong> with any questions.</p>
<p><a href="/book">Book your fair-weekend stay now before pods fill up.</a> Weekend dates around large job fairs move quickly.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://allevents.in/johor-bahru/all" target="_blank" rel="noopener">AllEvents — Johor Bahru events listing</a></li>
  <li><a href="https://10times.com/johorbahru-my" target="_blank" rel="noopener">10times — Johor Bahru events and exhibitions</a></li>
</ul>
`,
		},
		// 43 — scheduled: goes live 2026-07-23
		{
			Slug:          "jb-transit-base-foreign-workers-guide",
			ImageAlt:      "Capsule pod interior at Pelangi Capsule Hostel, Johor Bahru — clean sleeping pod with privacy screen for transit workers",
			Title:         "Using Johor Bahru as a Transit Base: A Practical Guide for Foreign Workers",
			Excerpt:       "If you're between Singapore work contracts or heading home on a budget flight, JB is a cheaper, practical overnight base than any airport hotel — here's how to make it work.",
			Date:          "2026-07-23",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "transit", "foreign-workers", "senai-airport", "changi", "budget-accommodation", "causeway"},
			FeaturedImage: "/images/blog/jb-transit-base-foreign-workers-guide.webp",
			Content: `
<h2>The Short Version</h2>
<p>We see this pattern regularly at Pelangi Capsule Hostel: a guest from Myanmar, Indonesia, or the Philippines checks in late at night, sleeps, and is gone by morning to catch a flight or cross back into Singapore. Sometimes it's two or three nights while they sort paperwork or wait on a work-permit outcome. JB has become a quiet but reliable transit hub for foreign workers in the region — and this guide explains why, and how to plan it properly.</p>

<h2>Why JB Makes Sense as a Transit Base</h2>
<p>The cost logic is straightforward. A capsule pod at Pelangi is <strong>RM30 per night on weekdays and RM35 on weekends</strong>, with monthly stays from RM600. Compare that to airport hotel rates in Singapore or even budget hostels near Changi — you are almost always paying significantly more on the Singapore side. For workers who are between contracts, waiting on documentation, or simply passing through on their way home, those savings compound over even a short stay.</p>
<p>Beyond cost, JB gives you options. You have two realistic routes for your onward journey: fly out of <strong>Senai International Airport (JHB)</strong> or cross the Causeway and use <strong>Changi Airport (SIN)</strong>. Both are covered below.</p>

<h2>Option 1: Flying from Senai International Airport</h2>
<p>Senai is roughly 30–40 minutes from Taman Pelangi by Grab, depending on traffic. It is AirAsia's main hub in Johor, with direct routes to regional destinations — Kuala Lumpur, Penang, Jakarta, and more. Fares on regional routes from Senai are often notably cheaper than equivalent flights from Changi, particularly on AirAsia's network. Check the current route map on Senai Airport's official site before booking.</p>
<p>If your flight departs early morning, this is where 24/7 self check-in matters. <strong>You can arrive at the hostel at 1 AM, sleep, and leave by 4 AM for a 6 AM flight without waking anyone or paying extra.</strong> Our check-in is self-managed around the clock. Check-in time is from 2:00 PM and check-out is by 12:00 PM, but arrival time is genuinely flexible.</p>
<p>Our <a href="/blog/changi-airport-transit-budget-stay-johor-bahru">Changi transit guide</a> also covers how the two airports compare for regional travel.</p>

<h2>Option 2: Crossing to Changi Airport</h2>
<p>If your airline operates out of Changi, or if you have a layover there, the crossing is straightforward but needs time built in. Allow <strong>3–4 hours total</strong> to cover: Grab to CIQ or JB Sentral (about 10 minutes from Taman Pelangi), queue at Malaysian immigration departure, bus or coach through the Causeway, Singapore immigration arrival, and then MRT or bus to Changi. Immigration queues are the variable — they can be smooth or they can add an hour. Do not cut it close.</p>
<p>See <a href="/blog/singapore-to-jb-day-trip-causeway-guide">our full Causeway guide</a> for queue timing tips, transport options, and what to expect at both checkpoints.</p>

<h2>Practical Checklist for Transit Workers</h2>
<p>Use this before you travel. Small oversights cause real problems at immigration counters.</p>
<ul>
  <li><strong>Passport validity:</strong> Both Malaysia and Singapore require at least 6 months validity remaining. Check your passport before you book anything. Airlines will deny boarding; immigration will turn you around.</li>
  <li><strong>Onward ticket proof:</strong> If entering Malaysia on a social visit pass, immigration officers may ask to see an onward ticket. Have it accessible on your phone or printed.</li>
  <li><strong>Singapore entry requirements:</strong> If you're crossing into Singapore — whether to catch a flight or to report to an employer — know your visa status. See <a href="/blog/singapore-work-pass-guide-malaysians">our Singapore work pass guide</a> for permit types and processes.</li>
  <li><strong>Cash in MYR:</strong> Bring some Malaysian Ringgit. Money changers operate in the main JB malls (City Square, KSL, Paradigm) and rates are generally reasonable. ATMs are widely available but card acceptance varies at smaller shops and eateries.</li>
  <li><strong>SIM card or eSIM:</strong> A local or regional SIM makes navigation, Grab bookings, and WhatsApp communication much easier. eSIMs can be set up before you arrive. Alternatively, grab a local SIM at any convenience store or mall.</li>
  <li><strong>Luggage:</strong> The hostel is luggage-friendly. If you arrive with a large bag and need to go out before check-in time, ask about storage.</li>
</ul>

<h2>Waiting on a Singapore Work Permit?</h2>
<p>We regularly host workers who are in a holding pattern — permit applications submitted, MOM processing ongoing, and a decision still pending. Waiting that out in JB is significantly cheaper than staying in Singapore on a tourist budget. RM30–35 per night for a clean capsule pod with free WiFi gives you a workable base: you can monitor email, respond to your employer or agent, and stay close enough to cross over quickly when called.</p>
<p>The <a href="/blog/singapore-work-pass-guide-malaysians">Singapore work pass guide</a> covers the main permit types, processing timelines, and what workers typically need to prepare during the waiting period.</p>

<h2>What Pelangi Offers Transit Guests</h2>
<table>
  <thead>
    <tr>
      <th>Detail</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nightly rate (weekday)</td>
      <td>RM30</td>
    </tr>
    <tr>
      <td>Nightly rate (weekend)</td>
      <td>RM35</td>
    </tr>
    <tr>
      <td>Monthly stay</td>
      <td>From RM600</td>
    </tr>
    <tr>
      <td>Check-in / check-out</td>
      <td>2:00 PM / 12:00 PM (24/7 self check-in available)</td>
    </tr>
    <tr>
      <td>WiFi</td>
      <td>Free, included</td>
    </tr>
    <tr>
      <td>Distance to JB Sentral / CIQ</td>
      <td>~10 min by Grab</td>
    </tr>
    <tr>
      <td>Distance to Senai Airport</td>
      <td>~30–40 min by Grab</td>
    </tr>
    <tr>
      <td>WhatsApp</td>
      <td>+60 12-708 8789</td>
    </tr>
  </tbody>
</table>
<p>If you have questions about the area, transport, or your stay, message us on WhatsApp before you arrive. We know JB well and can point you in the right direction.</p>
<p>Ready to sort your accommodation? <a href="/book"><strong>Book your pod here</strong></a> or <a href="/rooms">view room details and photos</a> before you decide.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.senaiairport.com/" target="_blank" rel="noopener">Senai International Airport — Official site (routes, terminal info)</a></li>
  <li><a href="https://www.changiairport.com/" target="_blank" rel="noopener">Changi Airport Group — Official site (terminal guides, transport)</a></li>
</ul>
`,
		},
		// 44
		{
			Slug:          "room-for-rent-taman-pelangi-jb-rm500-month",
			ImageAlt:      "Private room for monthly rent above the 7-Eleven in Taman Pelangi, Johor Bahru — from RM500 per month",
			Title:         "Room for Rent in Taman Pelangi, Johor Bahru: Private Rooms from RM500/Month",
			Excerpt:       "Looking for a bilik sewa in central JB without the usual two-plus-one deposit? We rent private rooms above the 7-Eleven in Taman Pelangi from RM500/month with a flat RM250 deposit — managed by the Pelangi Capsule Hostel team.",
			Date:          "2026-07-08",
			Category:      "Accommodation",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"room-for-rent", "bilik-sewa", "taman-pelangi", "johor-bahru", "monthly-rental", "long-stay", "budget-accommodation"},
			FeaturedImage: "/images/blog/room-for-rent-taman-pelangi-jb-rm500-month.webp",
			Content: `
<h2>The Short Version</h2>
<p>Alongside our capsule pods, we rent out <strong>private rooms on a monthly basis from RM500/month</strong>, located above the 7-Eleven in Taman Pelangi — a short walk from Pelangi Capsule Hostel and managed by the same team. The deposit is a flat <strong>RM250</strong>, not the two-months-plus-one-month advance that most JB room rentals ask for. If you want your own lockable room in one of JB's most convenient neighbourhoods without signing a 12-month tenancy, this is that option.</p>

<h2>What You Get for RM500/Month</h2>
<p>This is a straightforward private room: your own door, your own space, month-to-month terms. It suits people who have outgrown a dorm bed but do not want the overheads of renting a whole unit.</p>
<table>
  <thead>
    <tr><th>Item</th><th>Detail</th></tr>
  </thead>
  <tbody>
    <tr><td>Monthly rent</td><td>From RM500/month</td></tr>
    <tr><td>Deposit</td><td>RM250 (flat, one-time)</td></tr>
    <tr><td>Minimum stay</td><td>1 month, renew month to month</td></tr>
    <tr><td>Location</td><td>Above the 7-Eleven, Taman Pelangi, 80400 Johor Bahru</td></tr>
    <tr><td>Managed by</td><td>Pelangi Capsule Hostel team (same people, same WhatsApp)</td></tr>
  </tbody>
</table>
<p>Room availability changes month to month — WhatsApp us at <strong>+60 12-708 8789</strong> to ask what is open, arrange a viewing, and confirm the exact rate for the room you want.</p>

<h2>Why the Deposit Structure Matters</h2>
<p>Most room rentals in Johor Bahru — on Facebook groups, iBilik, or through agents — ask for <em>two months' deposit plus one month advance</em> before you get a key. On a RM600 room that is RM1,800 upfront. Our structure is one month's rent plus RM250 deposit: <strong>RM750 total to move in</strong> on a RM500 room. For workers starting a new job, people between contracts, or anyone whose plans might change in three months, that difference is real money kept in your pocket.</p>

<h2>The Location, Honestly</h2>
<p>Taman Pelangi is one of the most walkable neighbourhoods in central JB, and this room puts a convenience store literally downstairs.</p>
<ul>
  <li><strong>7-Eleven downstairs</strong> — top-ups, snacks, essentials, 24 hours.</li>
  <li><strong>Taman Pelangi Night Market</strong> — every Tuesday from 4:30 PM, 500+ metres of food stalls nearby.</li>
  <li><strong>Hawker food from RM5–8</strong> — dozens of kopitiam and restaurants within walking distance, including the heritage Restoran Hua Mui area a short ride away.</li>
  <li><strong>15 minutes to CIQ</strong> — if you commute to Singapore, the Causeway checkpoint is a quick Grab or bus ride. See our <a href="/getting-here">getting-here guide</a> for routes.</li>
  <li><strong>KOMTAR JBCC and city centre</strong> — a short ride for malls, banks, and government offices.</li>
</ul>

<h2>Private Room vs Monthly Capsule: Which One?</h2>
<p>We offer both, so here is the honest comparison rather than a sales pitch:</p>
<table>
  <thead>
    <tr><th></th><th>Private Room</th><th>Monthly Capsule Pod</th></tr>
  </thead>
  <tbody>
    <tr><td>Price</td><td>From RM500/month + RM250 deposit</td><td>From RM600/month, no deposit contract</td></tr>
    <tr><td>Space</td><td>Full room, your own door</td><td>Enclosed pod with sliding door</td></tr>
    <tr><td>Best for</td><td>Longer stints, more possessions — anyone who needs room to live</td><td>Solo stays, lighter packers, hostel amenities on tap</td></tr>
    <tr><td>Amenities</td><td>7-Eleven downstairs, neighbourhood on foot</td><td>Hostel WiFi, kitchen, lounge, laundry at RM5/load</td></tr>
  </tbody>
</table>
<p>If you are weighing the capsule option, the <a href="/rooms">rooms page</a> has full pod details, and nightly stays run RM30 on weekdays / RM35 on weekends if you want to trial the area before committing to a month.</p>

<h2>Who This Suits</h2>
<ul>
  <li><strong>Workers based in JB</strong> — factory, retail, F&amp;B staff who want their own room near the city at a flat, predictable cost.</li>
  <li><strong>Singapore commuters</strong> — a JB base at a fraction of Singapore rent; cross the Causeway daily and bank the difference.</li>
  <li><strong>Job-seekers and new starters</strong> — low move-in cost while you wait for the first payslip.</li>
  <li><strong>Anyone between houses</strong> — month-to-month terms mean no penalty when your situation changes.</li>
</ul>

<h2>How to Enquire</h2>
<p>No forms, no agents, no agent fees. WhatsApp <strong>+60 12-708 8789</strong> (Jay) or <strong>+60 16-762 0815</strong> (Alston) and ask about the monthly rooms above the 7-Eleven. We will tell you what is available, the exact price for that room, and set up a viewing. You can also reach us through the <a href="/contact">contact page</a>. If a room is not free, we will offer you a monthly capsule pod or put you on the list for the next opening — no pressure either way.</p>
`,
		},
		// 45 — scheduled: goes live 2026-07-26
		{
			Slug:          "grab-driver-jb-guide-2026",
			ImageAlt:      "E-hailing driver's view of Johor Bahru city traffic near the CIQ checkpoint — Grab driving in JB",
			Title:         "Becoming a Grab Driver in Johor Bahru 2026: PSV Licence, Sign-Up, and Realistic Earnings",
			Excerpt:       "Everything you need to drive for Grab in JB: the PSV licence and EVP process, what Grab subsidises, where the demand hotspots are, and how e-hailing compares with delivery work.",
			Date:          "2026-07-26",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "grab", "e-hailing", "driver", "malaysia", "side-hustle"},
			FeaturedImage: "/images/blog/grab-driver-jb-guide-2026.webp",
			Content: `
<h2>Why Grab Works in JB</h2>
<p>Johor Bahru is one of the busiest e-hailing markets in Malaysia outside the Klang Valley, and the reason is simple: the Causeway. Every day, travellers land at JB Sentral and the CIQ checkpoint needing rides, Singaporeans cross over for weekend food runs and mall trips, and locals move between Taman Pelangi, City Square, KSL, and Mid Valley Southkey. That steady cross-border churn means demand does not depend on one office crowd — it runs mornings, evenings, and weekends.</p>
<p>This guide covers what you legally need to drive for Grab in Malaysia, the sign-up process, where JB's demand actually concentrates, and how e-hailing stacks up against delivery gigs like <a href="/blog/lalamove-driver-malaysia-jb-guide">Lalamove</a>.</p>

<h2>What You Need (the Legal Bits)</h2>
<p>Since October 2019, e-hailing drivers in Malaysia must hold a <strong>PSV (Public Service Vehicle) licence</strong>. Grab's current requirements, per its official driver page:</p>
<ul>
  <li><strong>Age 21–69</strong>, Malaysian citizen with a valid blue NRIC</li>
  <li>Valid Malaysian competent driving licence</li>
  <li><strong>E-hailing PSV licence</strong> (Grab currently subsidises the PSV training, licence, and medical check-up)</li>
  <li><strong>EVP (E-Hailing Vehicle Permit)</strong> — Grab applies for this on your behalf</li>
  <li>A car <strong>not older than 15 years</strong>, registered in your own name</li>
  <li><strong>Puspakom inspection</strong> if the vehicle is older than 3 years</li>
  <li>Personal bank account under the same NRIC, plus a background check</li>
</ul>
<p>The PSV step is what puts most people off, but in practice it is a short course plus a test, and with the cost currently subsidised the main investment is your time — typically a few days to two weeks from registration to approval, depending on how fast your documents and inspection clear.</p>

<h2>Sign-Up in Five Steps</h2>
<p><strong>Step 1:</strong> Download the Grab Driver app and register with your NRIC and phone number.</p>
<p><strong>Step 2:</strong> Upload documents — licence, NRIC, vehicle registration with valid roadtax, insurance.</p>
<p><strong>Step 3:</strong> Complete the PSV course and medical check-up (book through the app flow).</p>
<p><strong>Step 4:</strong> Send the car for Puspakom inspection if it is older than 3 years; Grab processes your EVP.</p>
<p><strong>Step 5:</strong> Pass the background check, activate, and start accepting jobs.</p>

<h2>Realistic Earnings in JB</h2>
<p>Ignore the recruitment-poster numbers. Based on what driver-guests staying with us report, and consistent with the per-job ranges in our <a href="/blog/lalamove-driver-malaysia-jb-guide">Lalamove guide</a>, JB e-hailing looks like this:</p>
<table>
  <thead>
    <tr><th>Pattern</th><th>Typical Take</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Per trip (short urban)</td><td>RM5–12</td><td>Taman Pelangi to City Square class of trip</td></tr>
    <tr><td>Per trip (longer / airport)</td><td>RM20–50</td><td>Senai Airport runs and cross-town trips pay best</td></tr>
    <tr><td>Part-time evening (4–5 hrs)</td><td>RM60–120</td><td>Dinner-to-midnight window, weekend surges help</td></tr>
    <tr><td>Full-time day (10–12 hrs)</td><td>RM150–250</td><td>Before petrol; incentive quests can add more</td></tr>
  </tbody>
</table>
<p>Petrol, tolls, and car wear come out of that, so a full-time JB Grab driver clearing RM2,500–4,000 a month is a realistic band — not the RM8,000 fantasy figures you see in ads. Weekend nights and public holidays around the malls and checkpoint are where surge pricing genuinely moves the number.</p>

<h2>Where the Demand Is: JB Hotspots</h2>
<ul>
  <li><strong>CIQ / JB Sentral</strong> — the single most reliable queue in the city. Arrivals from Singapore need rides all day; peak after work hours and weekend mornings.</li>
  <li><strong>City Square, KSL, Mid Valley Southkey, Paradigm</strong> — mall runs are short but constant; weekend afternoons stack trips back-to-back.</li>
  <li><strong>Taman Pelangi and Taman Sentosa</strong> — dense food-and-shophouse neighbourhoods with steady local demand, especially on <a href="/blog/taman-pelangi-tuesday-night-market-guide">Tuesday night market</a> evenings.</li>
  <li><strong>Senai Airport</strong> — fewer jobs but the highest per-trip fares; worth positioning for morning flight banks.</li>
</ul>

<h2>Grab E-Hailing vs GrabFood vs Lalamove</h2>
<p>If your car is too old for the EVP, or the PSV step is a blocker, delivery is the alternative path — GrabFood and Lalamove both take motorcycles, and Lalamove takes cars and vans for parcels without a PSV requirement.</p>
<table>
  <thead>
    <tr><th></th><th>Grab (e-hailing)</th><th>Lalamove (parcels)</th></tr>
  </thead>
  <tbody>
    <tr><td>Licence hurdle</td><td>PSV + EVP required</td><td>Standard licence (GDL for van/lorry)</td></tr>
    <tr><td>Per job</td><td>RM5–50</td><td>RM25–80</td></tr>
    <tr><td>Demand pattern</td><td>Commute peaks, weekends, malls</td><td>Business hours, cross-border parcels</td></tr>
    <tr><td>Vehicle</td><td>Car under 15 years, own name</td><td>Bike, car, van, 4x4, lorry</td></tr>
  </tbody>
</table>
<p>Many JB drivers run both: passengers during commute peaks, parcels in the flat mid-afternoon. Our <a href="/blog/delivery-gig-apps-jb-comparison-2026">full JB gig-app comparison</a> breaks down all four major platforms daypart by daypart.</p>

<h2>A Cheap Base Makes the Maths Work</h2>
<p>The biggest lever on gig income is not the app — it is your fixed costs. Drivers staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi pay <strong>RM30/night on weekdays (RM35 weekends)</strong>, or <strong>RM600/month</strong> for long-stayers, with private rooms from <strong>RM500/month</strong> above the 7-Eleven on Jalan Perang. You are 10–15 minutes from the CIQ queue, in the middle of the mall belt, with fast WiFi for the driver app and 24/7 self check-in after late shifts.</p>
<p><a href="/book">Book a pod</a>, or run the numbers first with our <a href="/blog/gig-worker-jb-monthly-budget-guide">gig worker monthly budget guide</a> and the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">RM600/month capsule maths</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.grab.com/my/driver/" target="_blank" rel="noopener">Grab Malaysia — Official driver sign-up page (requirements, PSV and EVP process)</a></li>
</ul>
`,
		},
		// 46 — scheduled: goes live 2026-07-29
		{
			Slug:          "delivery-gig-apps-jb-comparison-2026",
			ImageAlt:      "Delivery riders from different gig platforms waiting outside a Johor Bahru mall with thermal bags and parcels",
			Title:         "Grab vs Lalamove vs Foodpanda in JB 2026: Which Gig App Actually Pays?",
			Excerpt:       "The honest side-by-side for Johor Bahru gig workers: per-job pay, licence hurdles, vehicle requirements, and which app to run at which time of day.",
			Date:          "2026-07-29",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "grab", "lalamove", "foodpanda", "delivery", "comparison"},
			FeaturedImage: "/images/blog/delivery-gig-apps-jb-comparison-2026.webp",
			Content: `
<h2>The Question Every New JB Gig Worker Asks</h2>
<p>Which app should I sign up for first? The honest answer for Johor Bahru in 2026: it depends on your vehicle, your licence, and which hours you can actually work. Each platform has a different sweet spot, and the drivers earning the most here run two or three of them in rotation rather than staying loyal to one.</p>
<p>This post puts the three main platforms side by side, with the requirements taken from each company's official driver page, then shows you the stacking pattern that works in JB.</p>

<h2>The Big Comparison</h2>
<table>
  <thead>
    <tr><th></th><th>Grab (e-hailing)</th><th>Lalamove</th><th>Foodpanda</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Work type</strong></td><td>Passenger rides</td><td>Parcels, documents, goods</td><td>Food delivery</td></tr>
    <tr><td><strong>Per job (JB)</strong></td><td>RM5–50</td><td>RM25–80</td><td>RM5–8 + tips</td></tr>
    <tr><td><strong>Vehicle</strong></td><td>Car under 15 years, own name</td><td>Bike, car, van, 4x4, lorry</td><td>Motorcycle (min. P licence)</td></tr>
    <tr><td><strong>Licence hurdle</strong></td><td>PSV licence + EVP</td><td>Standard licence; GDL for van/lorry</td><td>Standard bike licence, age 18+</td></tr>
    <tr><td><strong>Schedule model</strong></td><td>Fully open — drive any time</td><td>Fully open — accept any job</td><td>Book shift sessions in advance</td></tr>
    <tr><td><strong>Approval speed</strong></td><td>Slowest (PSV course, Puspakom if car over 3 years)</td><td>3–5 days, virtual training</td><td>Fast — days, minimal steps</td></tr>
    <tr><td><strong>Best hours</strong></td><td>Commute peaks, weekend nights</td><td>Business hours, mornings</td><td>Lunch 11am–2pm, dinner 6–9pm</td></tr>
  </tbody>
</table>
<p>ShopeeFood also operates food delivery in parts of Malaysia, but its JB rider coverage and terms change frequently — check availability in the Shopee app before counting on it. We have left it out of the earnings table rather than quote numbers we cannot stand behind.</p>

<h2>Barrier to Entry: Who Can Start This Week</h2>
<p><strong>Foodpanda is the fastest start.</strong> Official requirements are minimal: age 18+, Malaysian citizen, a motorcycle with valid licence (P licence accepted) and roadtax, a smartphone, and a bank account. If your documents are in order, you can be booking shift sessions within days. Our <a href="/blog/foodpanda-rider-jb-guide-2026">Foodpanda rider deep-dive</a> covers the batch and shift system in detail.</p>
<p><strong>Lalamove is the best pay-per-job with a normal licence.</strong> No PSV needed for parcel delivery — bike, car, van, 4x4, or lorry, with a GDL only for van and lorry classes. Approval takes about 3–5 days including virtual training. Full walkthrough in our <a href="/blog/lalamove-driver-malaysia-jb-guide">Lalamove driver guide</a>.</p>
<p><strong>Grab has the highest hurdle but the steadiest demand.</strong> The PSV licence and EVP take real effort (currently subsidised by Grab), and your car must be under 15 years old and registered in your name. In exchange, you get JB's deepest ride queue: the CIQ, JB Sentral, and the mall belt. See the <a href="/blog/grab-driver-jb-guide-2026">Grab driver JB guide</a> for the full process.</p>

<h2>The Stacking Strategy: One Day, Three Apps</h2>
<p>The pattern that keeps showing up among the gig workers who stay with us:</p>
<table>
  <thead>
    <tr><th>Daypart</th><th>App</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>8–11 am</td><td>Lalamove</td><td>Businesses ship parcels and documents in the morning; highest per-job rates</td></tr>
    <tr><td>11 am–2 pm</td><td>Foodpanda</td><td>Lunch surge — short, dense food runs around the malls and offices</td></tr>
    <tr><td>2–5 pm</td><td>Lalamove or rest</td><td>Flattest demand window across all apps</td></tr>
    <tr><td>5–9 pm</td><td>Grab or Foodpanda</td><td>Commute peak and dinner surge; weekend nights favour Grab around CIQ and the malls</td></tr>
  </tbody>
</table>
<p>A motorcycle rider can stack Lalamove and Foodpanda with nothing but a standard licence. Add Grab only if you have a qualifying car and are ready for the PSV step — it is the highest fixed investment but fills the evening slot best.</p>

<h2>What This Adds Up To</h2>
<p>Stacked across a full week in JB, part-timers working evenings and weekends typically land in the RM1,500–2,500/month band, and full-timers running the three-app rotation report RM2,500–4,000 before petrol. The single biggest difference between the two ends of that range is not speed or luck — it is fixed costs and hours worked. Which brings us to rent.</p>

<h2>Keep Your Overheads Gig-Sized</h2>
<p>A 12-month tenancy with a two-plus-one deposit makes no sense when your income flexes week to week. <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi — mid-belt between the CIQ, City Square, and KSL — runs <strong>RM30/night on weekdays (RM35 weekends)</strong>, <strong>RM600/month</strong> for capsule long-stayers, and private rooms from <strong>RM500/month</strong> above the 7-Eleven on Jalan Perang, all with fast WiFi and 24/7 self check-in for late shifts.</p>
<p><a href="/book">Book a pod</a>, or see exactly how a gig income covers a JB month in our <a href="/blog/gig-worker-jb-monthly-budget-guide">gig worker monthly budget guide</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.grab.com/my/driver/" target="_blank" rel="noopener">Grab Malaysia — Official driver requirements</a></li>
  <li><a href="https://www.lalamove.com/en-my/driver" target="_blank" rel="noopener">Lalamove Malaysia — Official driver page (vehicle types, GDL, training)</a></li>
  <li><a href="https://rider.foodpanda.my/" target="_blank" rel="noopener">foodpanda Malaysia — Official rider sign-up page (requirements, sessions)</a></li>
</ul>
`,
		},
		// 47 — scheduled: goes live 2026-08-01
		{
			Slug:          "gig-worker-jb-monthly-budget-guide",
			ImageAlt:      "Monthly budget planning for a gig worker in Johor Bahru — calculator, hawker meal, and capsule hostel room keys",
			Title:         "Living in JB on Gig Income: The Full Monthly Budget (RM600 Rent, RM10 Meals, Real Numbers)",
			Excerpt:       "What a month in Johor Bahru actually costs a delivery rider or e-hailing driver: rent from RM500–594, hawker food at RM10–15 a meal, petrol, data — and how much a stacked gig income leaves over.",
			Date:          "2026-08-01",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "budget", "cost-of-living", "monthly-stay", "long-stay", "delivery"},
			FeaturedImage: "/images/blog/gig-worker-jb-monthly-budget-guide.webp",
			Content: `
<h2>The Question Behind Every Gig Sign-Up</h2>
<p>Can I actually live on this? Delivery and e-hailing income in JB flexes week to week, so the way to answer it is from the cost side: pin your fixed costs low enough that an average month clears them comfortably, and a bad month still covers them. This post lays out a complete, honest month of JB costs for a gig worker — no aspirational condo rent, no pretending you cook every meal.</p>

<h2>The Whole Month in One Table</h2>
<table>
  <thead>
    <tr><th>Item</th><th>Lean</th><th>Comfortable</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Rent — capsule pod (monthly)</strong></td><td>RM600</td><td>RM600</td><td>Utilities and WiFi included, no deposit, month to month</td></tr>
    <tr><td><strong>— or private room</strong></td><td>RM500</td><td>RM600+</td><td>Above the 7-Eleven, Taman Pelangi; flat RM250 deposit</td></tr>
    <tr><td><strong>Food</strong></td><td>RM600</td><td>RM900</td><td>Hawker meals run RM10–15; RM20–30/day is realistic eating out every meal</td></tr>
    <tr><td><strong>Petrol (motorcycle)</strong></td><td>RM150</td><td>RM250</td><td>Full-time delivery riding; car drivers budget 2–3x this</td></tr>
    <tr><td><strong>Phone data</strong></td><td>RM35</td><td>RM60</td><td>Unlimited-data prepaid plans; the driver apps eat data all day</td></tr>
    <tr><td><strong>Laundry</strong></td><td>RM20</td><td>RM40</td><td>RM5/load at the hostel</td></tr>
    <tr><td><strong>Buffer / misc</strong></td><td>RM100</td><td>RM250</td><td>Bike servicing, phone holder, rain gear, the odd kopitiam session</td></tr>
    <tr><td><strong>TOTAL</strong></td><td><strong>~RM1,400–1,500</strong></td><td><strong>~RM2,000–2,100</strong></td><td>Using the RM500–594 rent anchor</td></tr>
  </tbody>
</table>
<p>That is the entire month. Notice what is missing: no utility bills (included), no internet bill (included), no 12-month tenancy, no two-months-plus-one deposit locked up with a landlord.</p>

<h2>The Income Side, Honestly</h2>
<p>From our gig-app guides — <a href="/blog/lalamove-driver-malaysia-jb-guide">Lalamove</a>, <a href="/blog/grab-driver-jb-guide-2026">Grab</a>, <a href="/blog/foodpanda-rider-jb-guide-2026">Foodpanda</a>, and the <a href="/blog/delivery-gig-apps-jb-comparison-2026">full comparison</a> — realistic JB bands look like:</p>
<ul>
  <li><strong>Part-time (evenings + weekends):</strong> RM1,500–2,500/month</li>
  <li><strong>Full-time, single app:</strong> RM2,000–3,000/month</li>
  <li><strong>Full-time, stacked apps (the rotation strategy):</strong> RM2,500–4,000/month before petrol</li>
</ul>
<p>Set those against the cost table and the arithmetic is straightforward: a lean month costs about RM1,400–1,500, so even a part-time gig income covers life in JB, and a stacked full-time month can bank RM1,000–2,000. A bad week does not put your housing at risk, because your housing renews monthly and costs less than a single good weekend of stacked deliveries.</p>

<h2>Why Taman Pelangi Specifically</h2>
<ul>
  <li><strong>You live inside the demand zone.</strong> Taman Pelangi sits mid-belt between the CIQ (10–15 minutes), City Square, KSL, and the shophouse food streets — you start your shift already positioned instead of dead-heading across town.</li>
  <li><strong>Food is genuinely RM10–15 a meal.</strong> Dozens of kopitiam and hawker options on foot, plus the <a href="/blog/taman-pelangi-tuesday-night-market-guide">Tuesday night market</a> for RM5–8 dinners. See our <a href="/blog/ultimate-jb-food-guide-backpackers">JB cheap-eats guide</a>.</li>
  <li><strong>The 7-Eleven is downstairs</strong> from the private rooms — top-ups, snacks, and essentials at 2 am after a late shift.</li>
  <li><strong>24/7 self check-in</strong> at the hostel means late-shift hours are not a problem on day one.</li>
</ul>

<h2>Capsule or Private Room?</h2>
<p>Both are run by the same team, so pick on space, not trust:</p>
<table>
  <thead>
    <tr><th></th><th>Monthly Capsule — RM600</th><th>Private Room — from RM500</th></tr>
  </thead>
  <tbody>
    <tr><td>Move-in cost</td><td>RM600, no deposit</td><td>First month + flat RM250 deposit</td></tr>
    <tr><td>Space</td><td>Enclosed pod, locker, shared facilities</td><td>Full room with your own door</td></tr>
    <tr><td>Included</td><td>WiFi, utilities, kitchen, lounge</td><td>7-Eleven downstairs, neighbourhood on foot</td></tr>
    <tr><td>Suits</td><td>Light packers, first 1–3 months in JB</td><td>Longer stints, more gear, couples of possessions</td></tr>
  </tbody>
</table>
<p>Full details in the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">RM600/month capsule maths</a> and the <a href="/blog/room-for-rent-taman-pelangi-jb-rm500-month">RM500/month private room guide</a>.</p>

<h2>Start the Month</h2>
<p>Nightly pods are <strong>RM30 on weekdays and RM35 on weekends</strong> if you want to trial the area for a week before committing to a month. <a href="/book">Book a pod here</a>, browse <a href="/rooms">room details and photos</a>, or WhatsApp <strong>+60 12-708 8789</strong> and ask about monthly capsule or private-room availability — we will tell you straight what is open.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.grab.com/my/driver/" target="_blank" rel="noopener">Grab Malaysia — Official driver page</a></li>
  <li><a href="https://www.lalamove.com/en-my/driver" target="_blank" rel="noopener">Lalamove Malaysia — Official driver page</a></li>
  <li><a href="https://rider.foodpanda.my/" target="_blank" rel="noopener">foodpanda Malaysia — Official rider page</a></li>
</ul>
`,
		},
		// 48 — scheduled: goes live 2026-08-04
		{
			Slug:          "foodpanda-rider-jb-guide-2026",
			ImageAlt:      "foodpanda delivery rider on a motorcycle with pink thermal bag navigating a Johor Bahru street at dusk",
			Title:         "Foodpanda Rider in JB 2026: Shifts, Sign-Up, Gear, and What You Really Earn Per Hour",
			Excerpt:       "The deep-dive for Johor Bahru foodpanda riders: how the shift-session system works, the minimal sign-up requirements (P licence accepted), what gear you need, and honest RM-per-hour numbers.",
			Date:          "2026-08-04",
			Category:      "Career & Work",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "foodpanda", "delivery", "rider", "malaysia", "side-hustle"},
			FeaturedImage: "/images/blog/foodpanda-rider-jb-guide-2026.webp",
			Content: `
<h2>The Lowest Barrier in the JB Gig Economy</h2>
<p>Of the major gig platforms operating in Johor Bahru, foodpanda has the gentlest entry requirements — which is exactly why it is the first app most new riders activate. Per foodpanda Malaysia's official rider page, you need:</p>
<ul>
  <li>Age <strong>18 or above</strong>, Malaysian citizen</li>
  <li>A motorcycle with valid licence and roadtax — <strong>a P licence is accepted</strong></li>
  <li>A smartphone (iOS 11.2+ or Android 5.0+)</li>
  <li>A personal bank account</li>
</ul>
<p>No PSV course, no vehicle-age rule, no Puspakom. If a Grab e-hailing application takes weeks, a foodpanda application is measured in days. That makes it the standard first move for anyone who needs income now — including guests of ours waiting out a <a href="/blog/singapore-work-pass-guide-malaysians">Singapore work pass decision</a>.</p>

<h2>How the Shift System Actually Works</h2>
<p>Foodpanda is the odd one out among JB gig apps: you do not simply go online whenever you feel like it. Riders <strong>book shift sessions in advance</strong> through the rider platform, choosing the time blocks that suit them. In practice:</p>
<ul>
  <li><strong>Sessions are released in batches</strong>, and riders with better performance stats generally get earlier access to pick the prime slots.</li>
  <li><strong>The prime slots are exactly when you would guess:</strong> lunch (11 am–2 pm) and dinner (6–9 pm), plus weekend evenings.</li>
  <li><strong>Booking a shift is a commitment</strong> — repeated no-shows hurt your standing and your access to good future slots.</li>
</ul>
<p>The upside of the structure: during a booked peak shift, orders come to you steadily instead of you fishing for jobs. The downside: less spontaneity than Lalamove or Grab, where you just switch on. Treat shift booking like a weekly planning session — lock your lunch and dinner blocks, and leave the dead afternoon free (or fill it with <a href="/blog/lalamove-driver-malaysia-jb-guide">Lalamove parcels</a>).</p>

<h2>Sign-Up, Step by Step</h2>
<p><strong>Step 1:</strong> Register on the official foodpanda rider site (rider.foodpanda.my) with your IC and phone number.</p>
<p><strong>Step 2:</strong> Upload documents — licence, roadtax, bank details.</p>
<p><strong>Step 3:</strong> Complete the onboarding and get your rider account activated.</p>
<p><strong>Step 4:</strong> Collect or buy your thermal bag, book your first sessions, and start delivering.</p>

<h2>Gear That Pays for Itself</h2>
<ul>
  <li><strong>Thermal delivery bag</strong> — required kit; keep it clean, complaints about cold food hit your ratings.</li>
  <li><strong>Phone mount and power bank</strong> — the rider app plus navigation drains a battery in half a shift.</li>
  <li><strong>Full rain suit</strong> — JB rains hard and briefly; the riders who keep working through a downpour own the surge window that follows.</li>
  <li><strong>Unlimited-data prepaid plan</strong> — RM35–60/month; the app is useless on a throttled connection.</li>
</ul>

<h2>What You Really Earn in JB</h2>
<table>
  <thead>
    <tr><th>Pattern</th><th>Typical Take</th></tr>
  </thead>
  <tbody>
    <tr><td>Per delivery</td><td>RM5–8 + tips</td></tr>
    <tr><td>Peak-shift hour (lunch/dinner)</td><td>RM15–25</td></tr>
    <tr><td>Off-peak hour</td><td>RM8–12</td></tr>
    <tr><td>Strong full day (both peaks)</td><td>RM80–120</td></tr>
    <tr><td>Part-time month</td><td>RM1,500–2,500</td></tr>
    <tr><td>Full-time month</td><td>RM3,000–3,500</td></tr>
  </tbody>
</table>
<p>Those bands assume JB order density — the mall belt (City Square, KSL, Mid Valley Southkey) and the dense food neighbourhoods like Taman Pelangi and Taman Sentosa are where stacked orders happen. Riding a quiet suburb halves the numbers.</p>

<h2>Foodpanda vs the Other Apps</h2>
<p>Short version: foodpanda is the easiest start and the most predictable during booked peaks; Lalamove pays more per job with a fully open schedule; Grab has the deepest demand but a real licensing hurdle. The full side-by-side — requirements, pay, and the three-app daily rotation JB riders actually run — is in our <a href="/blog/delivery-gig-apps-jb-comparison-2026">JB gig app comparison</a>.</p>

<h2>A Rider's Base in Taman Pelangi</h2>
<p>Your shift schedule is peaks-based, so live where the peaks are. <a href="/rooms">Pelangi Capsule Hostel</a> puts you inside the delivery zone: pods at <strong>RM30/night weekdays (RM35 weekends)</strong>, <strong>RM600/month</strong> for monthly capsule stays, and private rooms from <strong>RM500/month</strong> above the 7-Eleven on Jalan Perang. Hot showers after a rain shift, lockers for your gear, fast WiFi for session booking, and 24/7 self check-in when dinner peak runs late.</p>
<p><a href="/book">Book a pod</a>, or plan the whole month first with the <a href="/blog/gig-worker-jb-monthly-budget-guide">gig worker JB budget guide</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://rider.foodpanda.my/" target="_blank" rel="noopener">foodpanda Malaysia — Official rider sign-up page (requirements, session system)</a></li>
</ul>
`,
		},
		// 49 — scheduled: goes live 2026-08-07
		{
			Slug:          "medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs",
			ImageAlt:      "Red and white emergency department sign at a hospital entrance in Johor Bahru, Malaysia",
			Title:         "Medical Emergency in Johor Bahru: Hospitals, Clinics & Foreigner Costs (2026)",
			Excerpt:       "What to do in a medical emergency in Johor Bahru — from dialling 999 to choosing between government and private hospitals, plus honest foreigner price ranges.",
			Date:          "2026-08-07",
			Category:      "Local Life",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"johor-bahru", "hospitals", "medical-emergency", "foreigner-travel", "health", "expat"},
			FeaturedImage: "/images/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs.webp",
			Content: `
<h2>First: Call 999 (MERS)</h2>
<p>In any life-threatening emergency — chest pain, severe injury, unconscious person, difficulty breathing — your first call is <strong>999</strong>. This is Malaysia's unified emergency hotline, operated by the <strong>Malaysian Emergency Response Service (MERS 999)</strong>. It connects you to ambulance, fire rescue, police, and civil defence from a single number.</p>
<ul>
  <li><strong>999</strong> — standard emergency number (works on all Malaysian networks)</li>
  <li><strong>112</strong> — international GSM emergency number; works even on a locked phone with no SIM credit</li>
  <li>Calls are answered within 10 seconds by trained emergency officers who dispatch the nearest available ambulance</li>
  <li>Download the <strong>SaveME999 app</strong> (iOS/Android) — it sends your GPS coordinates automatically with the call, cutting response time when you cannot describe your location</li>
</ul>
<p>999 is free. You do not need phone credit. You do not need a Malaysian SIM. Dial it first; sort out hospital logistics after.</p>

<h2>Hospital Sultanah Aminah — Public (Government) Hospital</h2>
<p>For non-critical emergencies or if cost is a concern, <strong>Hospital Sultanah Aminah (HSA)</strong> is Johor's largest government hospital and the main public emergency facility in JB city centre.</p>
<ul>
  <li><strong>Address:</strong> Jalan Persiaran Abu Bakar Sultan, 80100 Johor Bahru</li>
  <li><strong>Phone:</strong> 07-223 1666</li>
  <li><strong>Emergency:</strong> 24-hour Accident &amp; Emergency department</li>
  <li><strong>Beds:</strong> 857 (main referral centre for all of Johor state)</li>
  <li>Established 1882; full spectrum of specialties including cardiology, neurology, orthopaedics, and obstetrics</li>
</ul>
<h3>What foreigners pay at government hospitals</h3>
<p>Government hospitals charge non-citizens a higher rate than Malaysians under the Fees Act 1951 (Second Schedule). These are still far below private hospital rates. Current indicative figures (amended 2017 gazette):</p>
<table>
  <thead><tr><th>Service</th><th>Non-Citizen Rate (indicative)</th></tr></thead>
  <tbody>
    <tr><td>Outpatient / A&amp;E visit</td><td>RM40 – RM100</td></tr>
    <tr><td>Outpatient specialist clinic</td><td>RM120</td></tr>
    <tr><td>3rd class ward (per day)</td><td>RM126</td></tr>
    <tr><td>2nd class ward (per day)</td><td>RM200+</td></tr>
    <tr><td>1st class ward (per day)</td><td>RM400+</td></tr>
    <tr><td>Normal delivery</td><td>RM800+</td></tr>
    <tr><td>C-section</td><td>RM3,000+</td></tr>
  </tbody>
</table>
<p><em>Verify current figures directly with the hospital — gazetted rates are subject to change and individual charges depend on treatment rendered.</em></p>
<p>Expect long waits. The A&amp;E triage system prioritises by severity, not arrival time. For true emergencies you will be seen fast; for minor issues, a private clinic will be quicker.</p>

<h2>Private Hospitals in Johor Bahru</h2>
<p>Private hospitals offer shorter waits, English-speaking coordinators, single rooms, and the ability to choose your consultant. They cost significantly more than HSA but are the practical choice for most travellers and cross-border visitors who carry travel insurance.</p>

<h3>KPJ Johor Specialist Hospital</h3>
<ul>
  <li><strong>Address:</strong> 39-B, Jalan Abdul Samad, 80100 Johor Bahru (city centre)</li>
  <li><strong>Phone:</strong> 07-225 3000</li>
  <li><strong>Emergency:</strong> 24-hour A&amp;E</li>
  <li><strong>Beds:</strong> 282; centres of excellence in cardiology, oncology, and IVF</li>
  <li>Dedicated international patient department with coordinators for foreign visitors</li>
  <li><strong>Indicative foreigner costs:</strong> Specialist consultation RM150–350 (first visit); facility and procedure fees additional. As of July 2025, a 6% SST applies to treatment for foreign nationals at Malaysian private hospitals.</li>
</ul>

<h3>Gleneagles Hospital Medini (IHH Healthcare)</h3>
<ul>
  <li><strong>Address:</strong> No. 2, Jalan Medini Utara 4, Medini Iskandar, 79250 Iskandar Puteri, Johor</li>
  <li><strong>Phone:</strong> 07-560 1000 | <strong>Emergency line:</strong> 07-560 1111</li>
  <li><strong>Emergency:</strong> 24-hour A&amp;E; 300 beds</li>
  <li>IHH flagship for cross-border Singapore patients; <strong>Medisave-accredited</strong> — Singaporeans can use CPF Medisave for eligible treatments here</li>
  <li>International patient team handles insurance claims, flight bookings, visa arrangements, and airport transfers</li>
  <li><strong>Indicative costs:</strong> Specialist consultation RM200–500+; major surgical cases RM3,000–RM10,000+ depending on procedure</li>
</ul>

<h3>Columbia Asia Hospital — Iskandar Puteri</h3>
<ul>
  <li><strong>Address:</strong> Persiaran Afiat, Taman Kesihatan Afiat, 79250 Iskandar Puteri, Johor</li>
  <li><strong>Phone:</strong> 07-233 9999</li>
  <li><strong>Emergency:</strong> 24-hour A&amp;E</li>
  <li>Mid-size private hospital with a reputation for shorter wait times; good option for non-critical urgent care in the Iskandar Puteri / Nusajaya area</li>
  <li><strong>Indicative costs:</strong> GP/emergency consultation RM100–250; specialist RM150–400</li>
</ul>

<h3>Regency Specialist Hospital — Masai</h3>
<ul>
  <li><strong>Address:</strong> No. 1, Jalan Suria, Bandar Seri Alam, 81750 Masai, Johor</li>
  <li><strong>Phone:</strong> 07-381 7700 | <strong>24-hour A&amp;E hotline:</strong> 1-800-22-2505</li>
  <li><strong>Emergency:</strong> 24-hour A&amp;E staffed by board-certified emergency medicine specialists</li>
  <li>Located east of JB city; good choice if you are in the Masai / Pasir Gudang / Seri Alam corridor</li>
  <li>International Patient Services department; also reachable via 365Care: +65-9099-1662</li>
  <li><strong>Indicative costs:</strong> Consultation RM150–350; procedures and ward fees additional</li>
</ul>

<h2>GP Clinics — For Minor, Non-Emergency Issues</h2>
<p>For fever, mild infection, diarrhoea, minor cuts, sore throat, or a prescription refill, a <strong>GP (general practitioner) clinic</strong> is faster and cheaper than any hospital emergency department. Every neighbourhood in JB has multiple GP clinics.</p>
<ul>
  <li><strong>Typical GP consultation fee:</strong> RM25–60 per visit, including basic medication</li>
  <li>Walk-in only; most open 8am–10pm, some 24 hours</li>
  <li>Taman Pelangi and surrounding areas have several clinics within a 5-minute walk or Grab ride from the hostel</li>
  <li>Ask at the hostel reception — staff can point you to the nearest clinic and help with translation if needed</li>
</ul>

<h2>Pharmacies</h2>
<p>For mild symptoms or over-the-counter medicines, pharmacies are your first stop before spending time in a clinic queue.</p>
<ul>
  <li><strong>Guardian, Watsons, Caring Pharmacy</strong> — the three main chains with branches throughout JB malls and shophouses. Aeon Tebrau and KSL City Mall both have at least one chain pharmacy each.</li>
  <li>Pharmacists in Malaysia are licensed to counsel on OTC medications including antihistamines, antidiarrheals, rehydration salts, pain relief, and basic wound care</li>
  <li>Paracetamol (Panadol), ibuprofen, oral rehydration salts, and most common travel medicines are available without prescription</li>
  <li><strong>Hours:</strong> Mall-based pharmacies follow mall hours (10am–10pm). Standalone Caring/Guardian branches in shophouses often open from 8:30am</li>
</ul>

<h2>Travel Insurance — Get It Before You Arrive</h2>
<p>Private hospital bills in Malaysia add up fast. A single night in a private ward plus specialist consultation can run RM1,500–5,000 before procedures. Travel insurance covering medical evacuation and hospitalisation is strongly recommended for all visitors.</p>
<ul>
  <li>Check that your policy covers <strong>Malaysia specifically</strong> and includes emergency hospitalisation, not just outpatient treatment</li>
  <li>Gleneagles Medini is <strong>Medisave-accredited</strong> — Singaporeans with CPF Medisave can use it for eligible inpatient and day surgery claims</li>
  <li>Keep your insurer's emergency hotline number saved on your phone before you travel</li>
  <li>Many insurers require you to call their hotline <em>before</em> admission for non-emergency procedures — check your policy terms</li>
  <li>Government hospital (HSA) costs are significantly lower and manageable even without insurance; private hospital costs are where insurance matters most</li>
</ul>

<h2>Quick Reference: Who to Call</h2>
<table>
  <thead><tr><th>Situation</th><th>Where to Go</th><th>Contact</th></tr></thead>
  <tbody>
    <tr><td>Life-threatening emergency</td><td>Call ambulance first</td><td>999 or 112</td></tr>
    <tr><td>Serious but not immediately life-threatening</td><td>KPJ Johor or Gleneagles Medini A&amp;E</td><td>07-225 3000 / 07-560 1111</td></tr>
    <tr><td>Budget emergency option</td><td>Hospital Sultanah Aminah A&amp;E</td><td>07-223 1666</td></tr>
    <tr><td>East JB / Masai area</td><td>Regency Specialist Hospital</td><td>1-800-22-2505</td></tr>
    <tr><td>Iskandar Puteri / Nusajaya area</td><td>Columbia Asia or Gleneagles Medini</td><td>07-233 9999 / 07-560 1000</td></tr>
    <tr><td>Minor illness / prescription</td><td>Any GP clinic near your location</td><td>Ask hostel staff</td></tr>
    <tr><td>OTC medicine only</td><td>Guardian / Watsons / Caring Pharmacy</td><td>Walk-in</td></tr>
  </tbody>
</table>

<h2>Staying at Pelangi Capsule Hostel</h2>
<p>If you are staying with us at <strong>Pelangi Capsule Hostel</strong> (26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru), our front desk staff can help you identify the nearest clinic, arrange a Grab to the hospital, or assist with basic communication. WhatsApp us any time at <a href="https://wa.me/60127088789" target="_blank" rel="noopener">+60 12-708 8789</a>.</p>
<p>Our pods start at <strong>RM30/night weekdays</strong> and <strong>RM35/night weekends</strong>, with monthly stays from <strong>RM600</strong>. Check-in from 2:00 PM, check-out by 12:00 PM. <a href="/book">Book your stay</a> and travel with one less thing to worry about.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://en.wikipedia.org/wiki/Sultanah_Aminah_Hospital" target="_blank" rel="noopener">Wikipedia — Sultanah Aminah Hospital</a></li>
  <li><a href="https://www.civildefence.gov.my/999-emergency-services/?lang=en" target="_blank" rel="noopener">Malaysia Civil Defence Department — 999 Emergency Services</a></li>
  <li><a href="https://www.nst.com.my/news/nation/2025/11/1319952/how-use-malaysias-new-emergency-app-saveme999" target="_blank" rel="noopener">New Straits Times — SaveME999 App Guide</a></li>
  <li><a href="https://kpjhealth.com.my/johor" target="_blank" rel="noopener">KPJ Johor Specialist Hospital — Official Site</a></li>
  <li><a href="https://gleneagles.com.my/medini-johor/contactus" target="_blank" rel="noopener">Gleneagles Hospital Medini — Contact &amp; Emergency</a></li>
  <li><a href="https://www.columbiaasia.com/malaysia/hospitals/iskandar-puteri/" target="_blank" rel="noopener">Columbia Asia Hospital Iskandar Puteri — Official Site</a></li>
  <li><a href="https://www.regencyspecialist.com/contact-us" target="_blank" rel="noopener">Regency Specialist Hospital — Contact Us</a></li>
  <li><a href="https://calculatormalaysia.com/health/medical-cost-malaysia/" target="_blank" rel="noopener">Calculator Malaysia — Medical Cost Malaysia 2026 (non-citizen fee schedule)</a></li>
  <li><a href="https://www.medisata.com/kpj-johor" target="_blank" rel="noopener">MediSata — KPJ Johor (consultation fees, SST note)</a></li>
  <li><a href="https://trekmedics.org/database/malaysia-2/" target="_blank" rel="noopener">Trek Medics — How to Call an Ambulance in Malaysia</a></li>
  <li><em>All price figures are indicative ranges only. Verify current charges directly with each hospital before treatment. Fees are subject to change without notice and vary by treatment rendered.</em></li>
</ul>
`,
		},
		// 50 — scheduled: goes live 2026-08-10
		{
			Slug:          "online-friend-romance-scam-safety-johor-bahru",
			ImageAlt:      "Smartphone wrapped in chain and padlock symbolising online scam safety in Johor Bahru",
			Title:         "Online Scams in JB: How to Spot Romance, Job-Lure, and Macau Scams Before They Strike",
			Excerpt:       "Budget travellers and cross-border workers in Johor Bahru face a rising tide of romance scams, fake job offers, and police-impersonation calls. Here is how to recognise them and who to call.",
			Date:          "2026-08-10",
			Category:      "Local Life",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"safety", "scam-awareness", "johor-bahru", "travel-tips", "local-life"},
			FeaturedImage: "/images/blog/online-friend-romance-scam-safety-johor-bahru.webp",
			Content: `
<h2>Why JB Is a High-Risk Zone for Scams</h2>
<p>Johor Bahru sits at one of Southeast Asia's busiest crossroads. Every day, tens of thousands of Malaysians commute to Singapore for work, and budget travellers pass through on their way to or from the Causeway. That constant flow of people — many of them young, mobile, and far from their support networks — makes JB a prime hunting ground for scam syndicates.</p>
<p>Malaysia loses tens of billions of ringgit to scams every year. The three types most likely to hit someone in or passing through JB are romance scams, fake job-lure trafficking schemes, and Macau-style police-impersonation calls. Knowing how each one works can save you from becoming the next victim.</p>

<h2>1. Romance Scams: Tinder, WeChat, and the Long Con</h2>
<p>A 28-year-old delivery worker in Johor Baru lost RM63,000 to a woman he met on WeChat in early 2025. A woman in Sibu lost RM86,841 to a Tinder match posing as a Korean man in 2024. These are not isolated cases — Malaysian police reported <strong>RM23.3 million lost to online love scams by women alone in the first half of 2024</strong>.</p>

<h3>How it works</h3>
<ol>
  <li>Scammer creates a polished profile — often using stolen photos of an attractive foreign national (a soldier, engineer, or doctor working overseas).</li>
  <li>Contact starts on a dating app (Tinder, MiCo) or social platform (WeChat, Instagram, Facebook).</li>
  <li>They invest weeks or months building an emotional bond — daily messages, voice notes, small "gifts."</li>
  <li>Once trust is established, a crisis emerges: they need money urgently for a medical emergency, customs clearance, or a business opportunity that "only you can help with."</li>
  <li>Requests escalate. The "person" is never able to meet in real life — there is always a reason.</li>
</ol>

<h3>Red flags</h3>
<ul>
  <li>Profile seems too perfect; photos look like a model or stock image.</li>
  <li>Claims to be overseas (often military, oil rig, or international business).</li>
  <li>Conversation moves very quickly to declarations of love or strong attachment.</li>
  <li>Avoids video calls, or appears only briefly and in poor lighting.</li>
  <li>Eventually asks you to transfer money, buy gift cards, or invest in a cryptocurrency platform they recommend.</li>
</ul>

<h3>What to do</h3>
<ul>
  <li>Reverse image-search their profile photo using Google Images or TinEye before trusting anyone you meet online.</li>
  <li>Never send money to someone you have not met in person, regardless of how long you have been talking.</li>
  <li>Check suspicious phone numbers or bank accounts at <a href="https://semakmule.rmp.gov.my/" target="_blank" rel="noopener">Semak Mule (semakmule.rmp.gov.my)</a> — PDRM's free portal to verify if a number or account has been flagged for fraud.</li>
  <li>If you have already transferred money, call <strong>NSRC 997</strong> immediately (8 AM–8 PM daily, including public holidays). Speed is critical — early reports have recovered nearly all funds; an 8-hour delay can mean recovering only a fraction.</li>
</ul>

<h2>2. Fake Job Offers: The JB–Singapore–Southeast Asia Pipeline</h2>
<p>This scam specifically targets people in the JB–Singapore corridor. The pitch sounds legitimate: a high-paying clerical, customer service, or IT job in Singapore or elsewhere in Southeast Asia, with no interview required and all travel arranged. The reality is a guarded scam compound in Cambodia, Myanmar, or Laos — and you are the product, not the employee.</p>
<p>In one documented case, <strong>Nur Elisha, a 23-year-old diploma holder from Johor Bahru</strong>, was approached in November 2023 with a fake clerical job in Singapore. She was instead flown through Changi Airport to Phnom Penh, Cambodia, held in a compound, and forced to run online scams targeting others. She eventually escaped with help from her family, the Malaysian Humanitarian Organisation, and the Malaysian embassy — returning home via KLIA.</p>

<h3>How it works</h3>
<ol>
  <li>A recruiter contacts you on Telegram, WhatsApp, Facebook, or through a mutual acquaintance.</li>
  <li>The offer involves unusually high pay for simple work (data entry, customer chat, social media management).</li>
  <li>They handle everything: flights, accommodation, visa — so you have no control over the itinerary.</li>
  <li>On arrival, your passport is confiscated. You are taken to a compound and told to run scam operations or face violence, being sold to a worse compound, or debt bondage.</li>
</ol>

<h3>Red flags</h3>
<ul>
  <li>Job offer arrives unsolicited via Telegram or WhatsApp from someone you barely know.</li>
  <li>Pay is disproportionately high for unskilled work (RM5,000–RM15,000/month for basic tasks).</li>
  <li>No formal interview, no employment contract, no verifiable company address.</li>
  <li>They urgently want you to leave within days and arrange your travel themselves.</li>
  <li>The destination keeps changing or is vague ("Southeast Asia," "border area").</li>
  <li>They ask for your passport details before you have signed anything.</li>
</ul>

<h3>What to do</h3>
<ul>
  <li>Verify any overseas job offer by checking the company's official website independently — do not click links they send you.</li>
  <li>Search the company name plus "scam" on Google before agreeing to anything.</li>
  <li>Tell a trusted person where you are going and keep control of your own passport and travel documents at all times.</li>
  <li>If you suspect a job offer is a trafficking lure, report it to <strong>PDRM CCID Infoline: 013-211 1222</strong> or lodge a report at <a href="https://ccid.rmp.gov.my/" target="_blank" rel="noopener">ccid.rmp.gov.my</a>.</li>
  <li>If you are already trapped overseas, contact the <strong>Malaysian embassy</strong> in that country immediately.</li>
  <li>Singapore-side workers: verify suspicious recruitment via <a href="https://www.scamshield.gov.sg/" target="_blank" rel="noopener">ScamShield</a> at <strong>1799</strong> (24/7) or the Singapore Police Force anti-scam channels.</li>
</ul>

<h2>3. Macau Scam / Police-Impersonation Calls</h2>
<p>Despite the name, this scam has nothing to do with Macau. It involves a caller who claims to be from PDRM, the courts, Bank Negara Malaysia, the Inland Revenue Board (LHDN), or customs. They tell you that your identity has been used in a crime, your bank account is frozen, or there is a warrant for your arrest — and that you must transfer money to a "safe account" to cooperate with an investigation.</p>

<h3>How it works</h3>
<ol>
  <li>You receive a call — sometimes preceded by an automated message — from someone claiming to be a government official.</li>
  <li>They provide a fake badge number, case number, or "official" reference to sound credible.</li>
  <li>The call is transferred to a supposed "superior officer" or "Bank Negara officer" who escalates the pressure.</li>
  <li>They insist you keep the call secret and not tell family members — a classic isolation tactic.</li>
  <li>You are told to transfer your savings to a designated account immediately to "protect" them or to prove your innocence.</li>
</ol>

<h3>Red flags</h3>
<ul>
  <li>Any government agency asking you to transfer money over the phone is a scam. PDRM, BNM, and LHDN do not call you and demand bank transfers.</li>
  <li>The caller asks you to keep the conversation secret from your family.</li>
  <li>There is pressure to act immediately — "the warrant will be issued in one hour."</li>
  <li>The call is transferred multiple times between "departments."</li>
  <li>They ask for your banking credentials, TAC/OTP codes, or online banking login details.</li>
</ul>

<h3>What to do</h3>
<ul>
  <li>Hang up immediately. No legitimate government agency will demand money over the phone.</li>
  <li>Call the agency they claimed to be from directly using the official number from their website — not the number the caller gave you.</li>
  <li>If you have transferred money, call <strong>NSRC 997</strong> right away (8 AM–8 PM). Outside those hours, call your bank's 24/7 fraud line to freeze the transaction.</li>
  <li>Check if the phone number or account number has been flagged at <a href="https://semakmule.rmp.gov.my/" target="_blank" rel="noopener">Semak Mule</a>.</li>
</ul>

<h2>Your Quick-Reference Toolkit</h2>
<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>What It Does</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>NSRC Hotline</strong></td>
      <td>Emergency scam response — freeze funds, lodge report</td>
      <td><strong>997</strong> (8 AM–8 PM daily incl. public holidays)</td>
    </tr>
    <tr>
      <td><strong>PDRM CCID Infoline</strong></td>
      <td>Cybercrime reports and enquiries</td>
      <td><strong>013-211 1222</strong></td>
    </tr>
    <tr>
      <td><strong>Semak Mule</strong></td>
      <td>Check if a bank account or phone has been flagged as a mule</td>
      <td><a href="https://semakmule.rmp.gov.my/" target="_blank" rel="noopener">semakmule.rmp.gov.my</a></td>
    </tr>
    <tr>
      <td><strong>ScamShield (SG)</strong></td>
      <td>Singapore scam helpline and app — verify suspicious contacts</td>
      <td><strong>1799</strong> (24/7) or <a href="https://www.scamshield.gov.sg/" target="_blank" rel="noopener">scamshield.gov.sg</a></td>
    </tr>
    <tr>
      <td><strong>MyCERT</strong></td>
      <td>Cybersecurity incident reporting</td>
      <td>1-300-88-2999 or <a href="https://www.mycert.org.my/" target="_blank" rel="noopener">mycert.org.my</a></td>
    </tr>
    <tr>
      <td><strong>Your bank's 24/7 fraud line</strong></td>
      <td>Freeze transactions outside NSRC hours</td>
      <td>Number on the back of your bank card</td>
    </tr>
  </tbody>
</table>

<h2>A Safe Base in JB</h2>
<p>If you are passing through or staying in Johor Bahru, having a secure, reliable base helps. At <strong>Pelangi Capsule Hostel</strong>, we host a mix of budget travellers, Singapore commuters, and cross-border workers every week — and we are always happy to share local knowledge, including what to watch out for in the area.</p>
<p>We are located at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong>. Capsule pods start from <strong>RM30/night on weekdays</strong> and <strong>RM35/night on weekends</strong>, with monthly packages from <strong>RM600</strong>. Check-in is at 2 PM and check-out at 12 PM. <a href="/book">Book your pod here</a> or <a href="/contact">reach us on WhatsApp at +60 12-708 8789</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://semakmule.rmp.gov.my/" target="_blank" rel="noopener">PDRM CCID Semak Mule portal — semakmule.rmp.gov.my</a></li>
  <li><a href="https://nfcc.jpm.gov.my/index.php/en/about-nsrc" target="_blank" rel="noopener">National Scam Response Centre (NSRC) — nfcc.jpm.gov.my</a></li>
  <li><a href="https://www.thestar.com.my/news/nation/2026/03/04/call-997-if-you-are-scammed-says-fahmi" target="_blank" rel="noopener">The Star: Call 997 if you've been scammed, says Fahmi (March 2026)</a></li>
  <li><a href="https://www.nst.com.my/news/nation/2023/03/885495/national-scam-response-centres-997-hotline-be-available-around-the-clock" target="_blank" rel="noopener">New Straits Times: National Scam Response Centre's 997 hotline (2023)</a></li>
  <li><a href="https://www.nst.com.my/news/crime-courts/2025/01/1156724/delivery-worker-loses-rm63000-online-love-scam" target="_blank" rel="noopener">NST: Delivery worker loses RM63,000 in online love scam, Johor Baru (January 2025)</a></li>
  <li><a href="https://www.malaymail.com/news/malaysia/2024/09/06/bukit-aman-women-hit-hard-by-online-love-scams-rm233m-lost-in-2024-alone/149503" target="_blank" rel="noopener">Malay Mail: Bukit Aman — RM23.3m lost to love scams by women in 2024</a></li>
  <li><a href="https://www.malaymail.com/news/malaysia/2024/11/16/tinder-oppa-tricks-sibu-woman-out-of-rm86841-in-love-scam/157080" target="_blank" rel="noopener">Malay Mail: Tinder 'oppa' tricks Sibu woman out of RM86,841 (November 2024)</a></li>
  <li><a href="https://www.thevibes.com/index.php/articles/news/111093/job-offer-turns-nightmare-as-malaysian-woman-tricked-into-scam-syndicate" target="_blank" rel="noopener">The Vibes: Job offer turns nightmare — JB woman trafficked to Cambodia (July 2025)</a></li>
  <li><a href="https://www.kln.gov.my/web/guest/-/malaysia-takes-firm-action-against-job-scam-syndicates-a-key-focus-of-the-2025-asean-chairmanship" target="_blank" rel="noopener">Malaysia MFA: Action against job scam syndicates — ASEAN 2025 Chairmanship</a></li>
  <li><a href="https://www.rhbgroup.com/others/fraud-awareness/macau-scam/index.html" target="_blank" rel="noopener">RHB Bank: Macau Scam — how it works and red flags</a></li>
  <li><a href="https://www.scamshield.gov.sg/" target="_blank" rel="noopener">ScamShield Singapore — scamshield.gov.sg (helpline 1799, 24/7)</a></li>
  <li><a href="https://www.mycert.org.my/" target="_blank" rel="noopener">MyCERT — CyberSecurity Malaysia (1-300-88-2999)</a></li>
  <li><strong>Image credit:</strong> <a href="https://www.pexels.com/photo/close-up-of-a-smart-phone-with-a-lock-11391947/" target="_blank" rel="noopener">Pexels — "Close up of a Smart Phone with a Lock" by Towfiqu barbhuiya</a> (Pexels Free License)</li>
  <li><em>Hotline numbers and URLs change. Always verify current details at official government websites before relying on them.</em></li>
</ul>
`,
		},
		// 51 — scheduled: goes live 2026-08-13
		{
			Slug:          "cheap-mixed-rice-economy-rice-taman-pelangi-jb",
			ImageAlt:      "A spread of economy rice with multiple dishes — braised meat, stir-fried vegetables, tofu, and egg on white rice, typical of Malaysian chap fan hawker stalls",
			Title:         "Cheap Eats in Taman Pelangi: Your Guide to Economy Rice (Chap Fan) Near the Hostel",
			Excerpt:       "Economy rice — known as chap fan in Chinese, nasi campur in Malay — is the most honest meal in Malaysia: you point at what you want, someone scoops it onto rice, and you pay for what you take. Here is where to find it within walking distance of Pelangi Capsule Hostel.",
			Date:          "2026-08-13",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"economy-rice", "chap-fan", "nasi-campur", "taman-pelangi", "cheap-food", "hawker", "johor-bahru", "budget-travel"},
			FeaturedImage: "/images/blog/cheap-mixed-rice-economy-rice-taman-pelangi-jb.webp",
			Content: `
<h2>What Is Economy Rice?</h2>
<p>Economy rice goes by several names depending on who you ask. Chinese Malaysians call it <strong>chap fan</strong> (杂饭) or <em>cai fan</em>. Malay Malaysians call it <strong>nasi campur</strong>. Indian Malaysians have their own mixed-rice tradition with banana-leaf service. The mechanics are the same across all three: a stall sets out 10 to 20 pre-cooked dishes in trays — braised meats, stir-fried vegetables, tofu, eggs, curries, sambal — you point at what you want, the server scoops it onto rice, and you pay based on what you picked.</p>
<p>Locals call this system <strong>point-point</strong>. No menu, no waiting for orders, no guesswork about what is fresh. Everything in the tray was cooked that morning.</p>
<p>A typical plate with rice and two to three dishes costs between <strong>RM5 and RM10</strong> at most hawker stalls in Johor Bahru. If you stick to one meat dish and one vegetable, you can eat well for under RM7. Add a second protein and a drink and you are still under RM12.</p>

<h2>How the Point-Point System Works</h2>
<ol>
  <li><strong>Walk up to the counter.</strong> The dishes are laid out in metal trays, clearly visible. No need to speak Mandarin or Malay — pointing works fine at every economy rice stall in JB.</li>
  <li><strong>Pick your rice portion first.</strong> White rice is the base. Some stalls ask if you want a lot or a little; others just scoop. If you want less, say "sikit" (a little in Malay).</li>
  <li><strong>Point at your dishes.</strong> Typically you pick two or three items. One meat or fish dish, one vegetable, and maybe an egg or tofu. The server portions everything onto one plate.</li>
  <li><strong>Pay at the counter or cashier.</strong> Price is calculated on the spot based on what you chose. More expensive items (seafood, big cuts of meat) cost more than a simple stir-fried vegetable.</li>
  <li><strong>Bring cash.</strong> Most economy rice stalls in JB do not accept cards or e-wallets. RM20 in your pocket covers a meal with a drink and change left over.</li>
</ol>
<p><strong>Sharing tip:</strong> Two people ordering three dishes each can combine six flavours without paying for two full plates. Economy rice rewards sharing — order one extra dish and split it across both plates.</p>

<h2>Economy Rice vs Nasi Campur vs Chap Fan: Is There a Difference?</h2>
<p>In practice, the terms are used interchangeably in JB. A Chinese kopitiam will advertise <em>chap fan</em> or <em>economy rice</em>. A Malay stall uses <em>nasi campur</em>. An Indian stall may say <em>mixed rice</em> or simply plate it on a banana leaf. The pick-and-pay model is the constant. The dishes change by ethnicity and the cook's preference that day — which is exactly what makes it interesting.</p>
<p>Taman Pelangi has all three variants within a short walk. The neighbourhood's mix of Chinese kopitiams, Malay gerai stalls, and mamak restaurants means you can eat a different style every day of the week.</p>

<h2>Where to Eat Economy Rice Near Pelangi Capsule Hostel</h2>
<p>The hostel is at <strong>26A Jalan Perang</strong>. Everything below is on the same street or within five minutes on foot.</p>

<h3>Bar Wang Rice — 25 Jalan Perang, Taman Pelangi</h3>
<p>Directly along the same street as the hostel. Bar Wang Rice is a well-known JB chain with a Taman Pelangi outlet on Jalan Perang. The format is economy rice with braised pork (lu rou) as the centrepiece — rice loaded with braised meat, a soft-boiled egg, and your choice of vegetable sides. It is filling, it is quick, and it is the kind of stall that regulars visit three times a week without needing to think about it. Available on Foodpanda for delivery if you want to eat in the pod, but the walk is negligible.</p>
<p><strong>Estimated cost per plate:</strong> RM6–10 depending on dishes chosen. Opening hours approximately 9:30 am to 9:00 pm.</p>

<h3>FECA &amp; Kopi — 44 Jalan Perang, Taman Pelangi</h3>
<p>A popular kopitiam a short walk from the hostel serving affordable Malaysian breakfast and lunch staples. While not a dedicated economy rice stall, FECA &amp; Kopi serves rice-based dishes including nasi lemak and daily specials alongside their famous kaya toast and Nanyang coffee. Their all-day lunch set runs <strong>RM10.90</strong> — a beverage, a main, and a large drumstick. Gets busy by mid-morning; go early. Closes around 5 pm.</p>

<h3>Taman Pelangi Hawker Centre — 1 Jalan Perang, Taman Pelangi</h3>
<p>The neighbourhood's old-school evening food court, operating from approximately 5 pm to 10 pm. Multiple stalls under one roof: claypot chicken rice, char kway teow, laksa yong tau foo, Hokkien mee, and more. Budget around <strong>RM10–15 per person</strong> for a full hawker dinner with a drink. This is the place if you arrive back at the hostel after dark and want a proper hot meal without going far.</p>

<h3>Nasi Ayam Kian Huat — 135 Jalan Sri Pelangi, Taman Pelangi</h3>
<p>A well-regarded chicken rice stall that has been running in Taman Pelangi for years. Not economy rice in the strict chap fan sense, but offers a similar pick-a-dish-with-rice model centred on poached and roasted chicken. Plates are priced accessibly — expect <strong>RM6–9</strong> for chicken rice with soup and chili. Opens from around 7:30 am to 3 pm, so it covers breakfast and early lunch. A short walk from the hostel.</p>

<h2>How to Keep a Plate Under RM8</h2>
<ul>
  <li><strong>Pick one meat, one vegetable.</strong> Two dishes plus rice sits comfortably at RM5–7 at most JB economy rice stalls.</li>
  <li><strong>Go for egg or tofu as your protein.</strong> Braised egg and tofu are the cheapest items at most stalls — filling, tasty, and RM1–2 each.</li>
  <li><strong>Skip the drink at the stall.</strong> A canned drink from the 7-Eleven downstairs is RM1.50 vs RM2.50–3.50 at the stall. Saves RM1 every meal.</li>
  <li><strong>Go before 12:30 pm.</strong> The best dishes go fast. Economy rice stalls in JB often run out of the popular items by early afternoon and may close by 2 pm.</li>
  <li><strong>Order vegetables generously.</strong> Stir-fried vegetables cost less than meat and take up the same amount of plate space. A plate of three vegetable dishes and rice can keep you full for under RM6.</li>
  <li><strong>Share dishes when eating with someone.</strong> One extra dish between two people costs RM2–4 and adds variety without doubling the bill.</li>
</ul>

<h2>What a Typical Week of Economy Rice Costs</h2>
<table>
  <thead>
    <tr><th>Meal</th><th>Low estimate</th><th>Comfortable estimate</th></tr>
  </thead>
  <tbody>
    <tr><td>Rice + 1 meat + 1 veg (no drink)</td><td>RM5–6</td><td>RM7–8</td></tr>
    <tr><td>Rice + 2 meats + 1 veg</td><td>RM7–9</td><td>RM10–12</td></tr>
    <tr><td>+ Iced drink at stall</td><td>+RM2</td><td>+RM3</td></tr>
    <tr><td>Full hawker dinner (Taman Pelangi FC)</td><td>RM10</td><td>RM15</td></tr>
    <tr><td>7 economy rice lunches in a week</td><td>RM35–42</td><td>RM49–56</td></tr>
  </tbody>
</table>
<p>At the lower end, you can eat a full cooked lunch every day for a week on about <strong>RM35–42</strong>. That is roughly <strong>RM150/month</strong> for daily lunches alone — or under RM300 if you add dinners at the hawker centre. These are cross-checked estimates based on current JB economy rice price bands; individual stalls vary. Verify prices on the day.</p>

<h2>Practical Tips for First-Timers</h2>
<ul>
  <li><strong>Arrive early.</strong> Economy rice stalls run out of the best dishes by 1 pm. The prime window is 11 am to 12:30 pm.</li>
  <li><strong>Bring small notes.</strong> RM10 and RM5 notes make payment fast. Most stalls cannot break a RM50 easily.</li>
  <li><strong>Don't overthink the language.</strong> Point at the dish, hold up fingers for how many scoops. The server has seen it thousands of times.</li>
  <li><strong>Ask "berapa?" (how much?) if the price isn't clear.</strong> Asking before paying avoids surprises. Stalls in Taman Pelangi are generally straightforward about pricing to tourists.</li>
  <li><strong>Look for the crowd.</strong> A long queue at a stall is the most reliable signal of quality and freshness. Economy rice gets replenished less often in slow stalls.</li>
</ul>

<h2>Beyond Economy Rice: More Cheap Eats in Taman Pelangi</h2>
<p>Economy rice is one slice of the cheap-food ecosystem here. Taman Pelangi also has mamak stalls open until midnight, a <a href="/blog/taman-pelangi-tuesday-night-market-guide">Tuesday night market</a> where mains run RM5–8, and old-school kopitiams serving kaya toast breakfasts for under RM5. If you want the full neighbourhood food map, see our <a href="/blog/ultimate-jb-food-guide-backpackers">JB cheap eats guide for backpackers</a>.</p>

<h2>Staying Close to the Food</h2>
<p>Pelangi Capsule Hostel is at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong> — the same street as Bar Wang Rice and FECA &amp; Kopi, two minutes from the hawker centre. Pods start at <strong>RM30/night on weekdays and RM35 on weekends</strong>. Monthly stays from <strong>RM600</strong>. Check-in from 2 PM, check-out by 12 PM. Questions? WhatsApp us at <strong>+60 12-708 8789</strong>.</p>
<p><a href="/book">Book a pod</a> or <a href="/contact">get in touch</a> if you want to know more about what is walking distance from the hostel.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://my.asiafirms.com/johor/bar-wang-rice-4taman-pelangi-598807.html" target="_blank" rel="noopener">Bar Wang Rice Taman Pelangi — asiafirms.com business listing (address: 25 Jalan Perang)</a></li>
  <li><a href="https://www.foodpanda.my/restaurant/j5st/bar-wang-rice-lu-rou-ba-wang-fan-taman-pelangi" target="_blank" rel="noopener">Bar Wang Rice Taman Pelangi — Foodpanda listing</a></li>
  <li><a href="https://sgmytrips.com/taman-pelangi-food/" target="_blank" rel="noopener">16 Best Food &amp; Restaurants in Taman Pelangi JB — sgmytrips.com (FECA &amp; Kopi, 44 Jalan Perang)</a></li>
  <li><a href="https://www.discoverjb.com/%E6%96%B0%E5%B1%B1%E7%BE%8E%E9%A3%9F-johor-bahru-food/taman-pelangi-breakfast/" target="_blank" rel="noopener">Taman Pelangi Breakfast Guide — discoverjb.com (FECA &amp; Kopi confirmed, 44 Jalan Perang)</a></li>
  <li><a href="https://johorkaki.blogspot.com/2017/06/cheap-good-chicken-rice-at-kim-kooi.html" target="_blank" rel="noopener">Nasi Ayam Kian Huat — Johor Kaki blog (135 Jalan Sri Pelangi, Taman Pelangi)</a></li>
  <li><a href="https://johorkaki.blogspot.com/2012/10/makan-blitz-with-makan-kakis-taman.html" target="_blank" rel="noopener">Taman Pelangi Food Centre — Johor Kaki makan blitz (stall inventory, evening hawker centre)</a></li>
  <li><a href="https://smartdory.com/smartdory-penang-food-blog/economy-rice/" target="_blank" rel="noopener">Economy Rice in Malaysia: A Local's Guide to Chap Fan — smartdory.com (price range, system explainer)</a></li>
  <li><a href="https://weirdkaya.com/heres-everything-you-need-to-know-about-economy-rice-the-meal-every-msian-loves/" target="_blank" rel="noopener">Everything You Need to Know About Economy Rice — WeirdKaya (pick-and-pay system, sharing tips)</a></li>
  <li><a href="https://www.pexels.com/photo/authentic-indonesian-nasi-padang-meal-display-37062603/" target="_blank" rel="noopener">Featured image: Mixed rice meal spread — Kandhi Bharata via Pexels (free license)</a></li>
</ul>
<p><em>Prices are estimates based on published sources and typical JB economy rice price bands as of mid-2026. Individual stalls vary — verify current prices on the day.</em></p>
`,
		},
		// 52 — scheduled: goes live 2026-08-16
		{
			Slug:          "language-exchange-partner-johor-bahru-practice-english",
			ImageAlt:      "Two friends from different backgrounds chatting over coffee at a cafe table — language exchange in Johor Bahru",
			Title:         "How to Find a Language Exchange Partner in Johor Bahru (English, Mandarin, Malay)",
			Excerpt:       "Apps like Tandem and HelloTalk connect you with JB students in minutes. Here's how to find a language practice partner in Johor Bahru safely — online and face-to-face.",
			Date:          "2026-08-16",
			Category:      "Local Life",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "language-exchange", "english-practice", "mandarin", "malay", "students", "local-life"},
			FeaturedImage: "/images/blog/language-exchange-partner-johor-bahru-practice-english.webp",
			Content: `
<h2>Why JB Is Unusually Good for Language Exchange</h2>
<p>Johor Bahru sits at the intersection of three languages used every day — English, Mandarin, and Bahasa Malaysia — plus a daily flow of Singaporeans, Indonesian workers, and travellers from all over Southeast Asia. That mix means genuine demand on both sides of any language swap. A local student who wants to sharpen their English can offer you Mandarin or Malay in return. A foreign visitor who wants to practise Bahasa Malaysia can offer English. The supply of willing partners is there; what most people lack is a way to find them efficiently and meet safely.</p>
<p>This guide covers the three apps that actually work for finding a language partner in JB, where to meet locals offline, how to handle the first meeting safely, and why the common room at a hostel is a surprisingly effective shortcut.</p>

<h2>Three Apps Worth Installing</h2>
<p>All three below are real, active platforms verified against their official sites. Each takes a different approach — pick the one that fits how you prefer to communicate.</p>

<table>
  <thead>
    <tr><th>App</th><th>Best for</th><th>Free?</th><th>Format</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tandem</strong></td>
      <td>Structured 1-on-1 exchange with text, voice notes, and video</td>
      <td>Yes (Pro tier optional)</td>
      <td>Mobile + Web</td>
    </tr>
    <tr>
      <td><strong>HelloTalk</strong></td>
      <td>Social feed + live voice rooms; 70 million+ users, 260+ languages</td>
      <td>Yes</td>
      <td>Mobile + Web</td>
    </tr>
    <tr>
      <td><strong>Conversation Exchange</strong></td>
      <td>Simple web-based pen-pal matching; filter by country and language</td>
      <td>Yes</td>
      <td>Web only</td>
    </tr>
  </tbody>
</table>

<h3>Tandem (tandem.net)</h3>
<p>Tandem pairs you with a native speaker of your target language who is also learning yours. You can filter by location — search for partners in Malaysia or specifically JB — and the app supports text, voice notes, and video calls within a single chat thread. A built-in Grammar Check tool lets your partner correct your messages directly in the thread, which makes feedback immediate rather than awkward. The free tier covers everything you need to start; Tandem Pro adds profile-visit notifications and unlimited translation.</p>

<h3>HelloTalk (hellotalk.com)</h3>
<p>HelloTalk's Moments feed works like a public social wall where language learners share short posts and native speakers reply with corrections. The Voicerooms feature lets you drop into a live group conversation on a topic — useful when you want to practise listening without the pressure of a 1-on-1. With over 70 million registered users it is the largest of the three platforms, which translates into more partners available in Southeast Asian languages like Malay and Mandarin.</p>

<h3>Conversation Exchange (conversationexchange.com)</h3>
<p>The oldest of the three and deliberately simple: create a profile, specify your native language and target language, and browse partners by country. It supports face-to-face meetups, text correspondence, and voice/video chat. Because it is web-based and has been running for years, it attracts a more serious learner demographic — less social feed noise, more people who actually want to practise.</p>

<h2>Finding Partners Offline: Universities and Meetups</h2>
<p>Apps get you started but face-to-face practice cements the habit. JB has two universities with active student populations close enough to matter.</p>

<h3>UTM — Universiti Teknologi Malaysia (Skudai)</h3>
<p>UTM's main campus is in Skudai, about 20 km north of Johor Bahru city centre — roughly 30 minutes by Grab. The university's Language Academy runs English and foreign-language programmes and hosts a Toastmasters club on campus. UTM also has a large international student intake, so the campus population includes students who want English conversation practice with native or fluent speakers. If you are staying in JB for more than a week, reaching out through UTM's Language Academy Facebook page (<a href="https://www.facebook.com/languageacademyutm/" target="_blank" rel="noopener">Language Academy, UTM</a>) is a legitimate way to find a motivated partner.</p>

<h3>Southern University College (Skudai)</h3>
<p>Southern UC is a private, non-profit university college also based in Skudai, Johor. It has a strong Mandarin-medium academic tradition and an international student exchange programme, which means its student body regularly includes learners who want to improve their English while you might want to improve your Mandarin or Malay. Southern UC is worth checking directly (southern.edu.my) for any student-organised language events or bulletin boards.</p>

<h3>Meetup.com</h3>
<p>Meetup's Johor Bahru language category lists active groups for language and cultural exchange. The <a href="https://www.meetup.com/en-AU/cities/my/johor_bahru/language/" target="_blank" rel="noopener">JB language groups page on Meetup</a> is the fastest way to see what is currently running. Groups range from casual coffee catch-ups to structured practice sessions. Numbers fluctuate, so check the event calendar rather than group member count — a group with 200 members and a session next Saturday is more useful than one with 2,000 members whose last event was six months ago.</p>

<h2>First-Meeting Etiquette and Safety</h2>
<p>Most language exchange partners are exactly what they present themselves as: students and professionals who want to practise. A small minority are not. The same principles that apply to <a href="/blog/online-friend-romance-scam-safety-johor-bahru">avoiding romance and friendship scams in JB</a> apply here.</p>
<ul>
  <li><strong>Meet in public the first time.</strong> A kopitiam, a mall food court, or a hostel common room — anywhere with other people around. Decline any invitation to a private home or unfamiliar address for a first meeting.</li>
  <li><strong>Keep personal information vague early.</strong> Your neighbourhood, workplace, and daily routine are things you share over time, not in the first message. A language partner does not need your home address.</li>
  <li><strong>Use the app's chat before exchanging numbers.</strong> Most of the platforms above have in-app calling. Stick to that until you are confident about the person.</li>
  <li><strong>Split the session time equally.</strong> A genuine language exchange is reciprocal — roughly half the time in each language. If your partner only wants to practise their target language and shows no interest in helping you with yours, that is a red flag worth noting.</li>
  <li><strong>Trust your instincts.</strong> If a conversation shifts quickly from language practice to requests for money, investment tips, or cryptocurrency, end it. That is a script, not a friendship.</li>
</ul>

<h2>How to Structure a Practice Session</h2>
<p>A good first session runs 60–90 minutes and has a loose structure so neither person ends up dominating:</p>
<ol>
  <li><strong>10 minutes:</strong> Introductions in Language A (the partner's target language).</li>
  <li><strong>20–25 minutes:</strong> Free conversation in Language A. Partner corrects gently — write corrections down, do not interrupt flow.</li>
  <li><strong>Switch.</strong> Repeat in Language B.</li>
  <li><strong>5 minutes at the end:</strong> Agree on one thing each person will practise before you meet again. This is what separates a productive exchange from just chatting.</li>
</ol>
<p>Pick a topic beforehand — news, food, weekend plans, a TV show. Open-ended topics produce more natural sentences than grammar drills.</p>

<h2>The Common Room Shortcut</h2>
<p>If you are staying at a hostel, you already have a built-in language exchange venue. Common rooms attract travellers from Singapore, Indonesia, mainland China, Japan, Korea, and Europe — all in the same space, all open to conversation by definition. The social dynamic of a hostel lounge is lower-stakes than a formal meetup: you start talking about the food you just ate, and twenty minutes later you are explaining idioms to each other.</p>
<p>At <strong>Pelangi Capsule Hostel</strong> in Taman Pelangi, the common area is where guests naturally gather in the evenings. We have hosted guests from across Southeast Asia and beyond, and informal language exchanges happen here without anyone organising them. It is the most frictionless way to start — no app needed, no scheduling, just show up.</p>
<p>Pods start at <strong>RM30/night on weekdays, RM35 on weekends</strong>, with monthly stays from <strong>RM600</strong>. Check-in is from 2:00 PM, check-out by 12:00 PM. Find us at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. WhatsApp us at <strong>+60 12-708 8789</strong> or <a href="/book">book a pod online</a> — and start practising from day one.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://tandem.net/" target="_blank" rel="noopener">Tandem — Official language exchange app (tandem.net)</a></li>
  <li><a href="https://www.hellotalk.com/en" target="_blank" rel="noopener">HelloTalk — Official language learning app (hellotalk.com)</a></li>
  <li><a href="https://www.conversationexchange.com/" target="_blank" rel="noopener">Conversation Exchange — Official platform (conversationexchange.com)</a></li>
  <li><a href="https://www.utm.my/about/utm-campus/" target="_blank" rel="noopener">UTM — About Campus (utm.my) — main campus in Skudai, Johor Bahru</a></li>
  <li><a href="https://www.southern.edu.my/" target="_blank" rel="noopener">Southern University College — Official site (southern.edu.my)</a></li>
  <li><a href="https://www.meetup.com/en-AU/cities/my/johor_bahru/language/" target="_blank" rel="noopener">Meetup — Language groups in Johor Bahru</a></li>
  <li><a href="https://humanities.utm.my/languageacademy/" target="_blank" rel="noopener">UTM Language Academy — Humanities portal</a></li>
  <li><a href="https://www.pexels.com/photo/cheerful-diverse-friends-talking-at-table-with-coffee-in-cafe-6457517/" target="_blank" rel="noopener">Featured image: Alexander Suhorucov via Pexels (free license)</a></li>
</ul>
`,
		},
		// 53 — scheduled: goes live 2026-08-19
		{
			Slug:          "malaysia-tourism-tax-jb-hostel-walk-in-guide",
			ImageAlt:      "Budget traveller arriving at a JB hostel reception desk, paying cash for a pod",
			Title:         "Malaysia Tourism Tax at JB Hostels: What Foreign Guests Pay — and Why Walk-In Cash Visits Can Be Different",
			Excerpt:       "Foreign visitors pay RM10 per night in tourism tax at most Malaysian accommodation. But walk-in cash bookings are handled differently in practice. Here's what the tax covers, who it applies to, and why budget travellers arriving in person sometimes find a lower final bill.",
			Date:          "2026-08-19",
			Category:      "Practical Guides",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"tourism-tax", "budget-travel", "johor-bahru", "cash-payment", "walk-in", "malaysia-travel", "practical-guide"},
			FeaturedImage: "/images/blog/malaysia-tourism-tax-jb-hostel-walk-in-guide.webp",
			Content: `
<h2>What Is Malaysia's Tourism Tax?</h2>
<p>Malaysia introduced the Tourism Tax (TTx) in 2017 under the Tourism Tax Act. The rate is <strong>RM10 per room per night</strong>, and it applies to registered accommodation properties — which includes most hotels, guesthouses, serviced apartments, and hostels in Johor Bahru.</p>
<p>The tax is collected by the accommodation operator and remitted to the Malaysian government. You do not pay it to any government office directly — it is added to your bill by the property at check-in or checkout.</p>

<h2>Who Has to Pay It?</h2>
<p>Only <strong>foreign tourists</strong> — non-Malaysian citizens and non-permanent residents — are subject to the tourism tax. Malaysian citizens and MyPR holders do not pay it.</p>
<p>For a short stay, RM10/night adds up fast: a 3-night stay is RM30, a week is RM70. On top of a capsule pod rate of RM30–35 per night, that is a meaningful percentage of your total.</p>

<h2>Online and OTA Bookings: Tourism Tax Is Automatic</h2>
<p>When you book through Booking.com, Agoda, Hostelworld, or a property's own online system, the platform typically captures your nationality at checkout. If you are a foreign visitor, the tourism tax is either factored into the total or listed separately at payment.</p>
<p>Your passport is verified at check-in to confirm your foreign status — the tax is confirmed and collected. The process is largely automated: your nationality is on record before you arrive, so the property charges accordingly.</p>

<h2>Walk-In Cash Visits: A Different Process</h2>
<p>Walk-in bookings — where you arrive in person, request a bed, and pay cash at the front desk — go through a different administrative process. There is no pre-submitted passport, no online form capturing your nationality in advance, and no system automatically applying the tax before you step inside.</p>
<p>Individual properties have some discretion in how they handle on-site registration for cash walk-in guests. Some run a streamlined check-in focused on room assignment and payment rather than detailed document verification. Guests who have booked this way have reported that the tourism tax was not added to their bill.</p>
<p>This is not universal — some properties are diligent about collecting TTx from all guests regardless of booking method. But the administrative difference between a pre-registered online booking and a cash walk-in is real, and that difference can result in a lower final bill.</p>
<p><em>Note: Under Malaysian law, the obligation to collect and remit tourism tax sits with the accommodation operator, not the guest. If a property does not charge it, that is a matter between the operator and the relevant authority.</em></p>

<h2>Other Reasons to Walk In and Pay Cash</h2>
<p>Tourism tax aside, there are several practical reasons why budget travellers prefer to book in person:</p>
<ul>
  <li><strong>No booking platform fees baked in</strong> — OTAs charge operators 15–18% commission, often reflected in listed rates. Properties may price walk-in rates lower to avoid that overhead.</li>
  <li><strong>Negotiate directly</strong> — If a property has empty beds tonight, a face-to-face request has a better chance of landing a small discount than an online form.</li>
  <li><strong>No credit card needed</strong> — Pay in ringgit, no card surcharge, no pre-authorisation hold on your account.</li>
  <li><strong>See the room first</strong> — Check the pod, the air conditioning, the locker size before handing over cash.</li>
  <li><strong>Flexible stay length</strong> — Extend or cut short your stay with a direct conversation rather than a platform modification request.</li>
</ul>

<h2>Walk-In Rates at Pelangi Capsule Hostel</h2>
<p>At <strong>Pelangi Capsule Hostel</strong>, capsule pods start at <strong>RM30/night on weekdays, RM35/night on weekends</strong>. Monthly stays from <strong>RM600</strong>. Walk-in guests are welcome — no reservation required if beds are available.</p>
<p>We are at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru — about 10 minutes by Grab from JB Sentral or the Causeway CW1/CW2 bus stops. Check-in from 2:00 PM, checkout by 12:00 PM.</p>
<p>Want to check availability before walking in? <a href="/book">See live availability here</a> or WhatsApp us at +60 12-708 8789. Full specs and photos at our <a href="/rooms">rooms page</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.customs.gov.my/en/tt/Pages/Overview-of-Tourism-Tax.aspx" target="_blank" rel="noopener">Royal Malaysian Customs Department — Tourism Tax overview</a></li>
  <li><a href="https://www.motac.gov.my/" target="_blank" rel="noopener">Ministry of Tourism, Arts and Culture Malaysia</a></li>
</ul>
`,
		},
		// 54 — scheduled: goes live 2026-08-22
		{
			Slug:          "jalan-perang-food-guide-taman-pelangi",
			ImageAlt:      "Jalan Perang food street in Taman Pelangi JB with lit-up restaurant signage at night",
			Title:         "What to Eat on Jalan Perang: A Food Street Guide from Pelangi Capsule Hostel's Doorstep",
			Excerpt:       "Five confirmed-open restaurants within a short walk of the hostel — Korean BBQ, Japanese-Western fusion, heritage zi char from 1979, Teochew fish head soup, and halal Korean-Japanese. All on the same street.",
			Date:          "2026-08-22",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "food-guide", "taman-pelangi", "jalan-perang", "korean-bbq", "halal", "budget-food", "local-eats"},
			FeaturedImage: "/images/blog/jalan-perang-food-guide-taman-pelangi.webp",
			Content: `
<h2>Five Restaurants on the Hostel's Own Street</h2>
<p>Jalan Perang is one of Taman Pelangi's best-kept food secrets. Within a five-minute walk from Pelangi Capsule Hostel, you have Korean BBQ, Japanese-Western fusion, Teochew fish soup, and one of JB's most famous heritage zi char restaurants — all on the same street. No Grab needed.</p>
<p>Every restaurant on this list was verified as open as of mid-2026 using multiple independent sources. Hours and menus can change, so confirm by phone or Google Maps before visiting — especially if you are planning a specific day.</p>

<h2>1. Dusk by Mok Mok — Japanese-Western Fusion (No. 49)</h2>
<p>The most photographed cafe on the street. Dusk by Mok Mok occupies a converted shophouse styled with rattan furniture, trailing plants, and neon signage that reads like a Bali-Tokyo crossover. It is the sister outlet to the original Mok Mok Brunch and Bistro.</p>
<p>The kitchen runs a Japanese-Western menu built around JB's love of seafood. The standout is the <strong>Chilli Crab Pasta (RM36)</strong> — fresh crab sauce over al dente pasta with a proper chilli kick. The <strong>Curry Karaage Risotto (RM32)</strong> is a close second. Cash or bank transfer only (no credit cards as of last check). Parking on the street fills up by 7 PM on weekends — walk from the hostel instead.</p>
<ul>
  <li><strong>Address:</strong> 49 Jalan Perang, Taman Pelangi</li>
  <li><strong>Hours:</strong> Daily approximately 10:00 AM – 10:00 PM</li>
  <li><strong>Halal:</strong> Not certified (no pork, no lard)</li>
  <li><strong>Phone:</strong> +60 19-771 0068</li>
  <li><strong>Price range:</strong> RM16–RM36 per main</li>
</ul>

<h2>2. Yeon Cafe — Korean-Japanese, Halal (No. 12)</h2>
<p>Yeon is the most popular halal option on the street and probably the most Instagrammed. Minimalist Korean interior — pastel tones, clean lines, soft K-pop in the background — and a menu that blends Korean and Japanese techniques effectively.</p>
<p>The <strong>Salmon Yuzu Ochazuke (RM33)</strong> is the dish to order: green tea broth poured over rice and salmon, fragrant and light. The <strong>Rainbow Kimbap (RM18)</strong> works as a snack or side. For dessert, the Genmaicha Mochi Tart (RM12) sells out early.</p>
<p>Some older sources mention Yeon closes on Tuesdays — call ahead if that is your day.</p>
<ul>
  <li><strong>Address:</strong> 12 Jalan Perang, Taman Pelangi</li>
  <li><strong>Hours:</strong> Daily 10:30 AM – 10:00 PM (call to confirm Tuesday hours)</li>
  <li><strong>Halal:</strong> Yes — certified</li>
  <li><strong>Phone:</strong> +60 18-385 6899</li>
  <li><strong>Price range:</strong> RM12–RM33 per dish</li>
</ul>

<h2>3. Korean BBQ Nam Moon — 17 Years on Jalan Perang (No. 29–31)</h2>
<p>Nam Moon is the oldest Korean restaurant on the street and the one most frequented by Korean expats in JB — a reliable indicator of authenticity. The family has been running it for about 17 years, with smokeless sunken charcoal grills still going strong.</p>
<p>Lunch sets (noon–2 PM) start from around RM12: rice, kimchi soup, and up to 8 house-made banchan side dishes. Dinner group BBQ sets run from RM115 for 2 pax with pork belly, pork jowl, marinated spare ribs, and marbled beef ribs. House-made makgeolli rice wine is available.</p>
<ul>
  <li><strong>Address:</strong> 29–31 Jalan Perang, Taman Pelangi</li>
  <li><strong>Hours:</strong> Daily 11:00 AM – 10:00 PM</li>
  <li><strong>Halal:</strong> No (pork served)</li>
  <li><strong>Phone:</strong> +60 7-331 5573</li>
  <li><strong>Price range:</strong> Lunch from RM12 | Dinner sets from RM115 for 2 pax</li>
</ul>

<h2>4. CM Restaurant — Teochew Fish Head Soup (No. 21)</h2>
<p>No signage, no social media, no hype. CM Restaurant has been in the same Jalan Perang shophouse for over 30 years, now run by the second generation of the Chew family. The regulars order without looking at the menu.</p>
<p>Traditional Teochew seafood: fish head soup, steamed fish with preserved turnip, sweet potato leaves with garlic. These are not dishes you describe — they are dishes you eat slowly. Closed Sundays.</p>
<ul>
  <li><strong>Address:</strong> 21 Jalan Perang, Taman Pelangi</li>
  <li><strong>Hours:</strong> Mon–Sat 11:00 AM – 9:00 PM (closed Sundays)</li>
  <li><strong>Halal:</strong> No</li>
  <li><strong>Phone:</strong> +60 12-774 7775</li>
</ul>

<h2>5. Restoran Ah Kaw — Original San Lou Mee Hoon Since 1979 (No. 33)</h2>
<p>Ah Kaw is the reason food writers make the trip to Jalan Perang. Established in 1979, this zi char restaurant is widely credited as the original creator of San Lou Mee Hoon — the charred, wok-fragrant fried vermicelli that later spread across JB and into Singapore.</p>
<p>Order the <strong>San Lou Mee Hoon (RM9)</strong>. The Shrimp Paste Chicken (RM17) and Fried Squid with Salted Egg (RM20) round out a solid table. Cash preferred. Closed Tuesdays.</p>
<ul>
  <li><strong>Address:</strong> 33 Jalan Perang, Taman Pelangi</li>
  <li><strong>Hours:</strong> Wed–Mon, 12:00 PM – 3:30 PM and 6:00 PM – 10:00 PM (closed Tuesdays)</li>
  <li><strong>Halal:</strong> No (zi char)</li>
  <li><strong>Phone:</strong> +60 7-334 0590</li>
  <li><strong>Price range:</strong> RM9–RM20 per dish</li>
</ul>

<h2>Practical Tips</h2>
<ul>
  <li><strong>Walk from the hostel</strong> — Pelangi Capsule Hostel is at 26A Jalan Perang, so all five restaurants are a short walk in either direction.</li>
  <li><strong>Halal visitors</strong> — Yeon Cafe (No. 12) is the only halal-certified option on this list.</li>
  <li><strong>Tuesday</strong> — Ah Kaw is definitely closed. Yeon Cafe — call ahead to confirm.</li>
  <li><strong>Sunday</strong> — CM Restaurant is closed.</li>
  <li><strong>Budget</strong> — Ah Kaw and CM Restaurant are lowest cost. Dusk and Yeon run RM25–40 for a full meal.</li>
</ul>

<p>Staying on Jalan Perang makes it easy — check in at <a href="/book">Pelangi Capsule Hostel</a> (from RM30/night on weekdays) and walk out for dinner. Full room specs at <a href="/rooms">our rooms page</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://rubbisheatrubbishgrow.com/" target="_blank" rel="noopener">Rubbish Eat Rubbish Grow — Dusk by Mok Mok, June 2026</a></li>
  <li><a href="https://wanderlog.com" target="_blank" rel="noopener">Wanderlog — Yeon Cafe (797 reviews, May 2026) and Nam Moon (626 reviews, Dec 2025)</a></li>
  <li><a href="https://sethlui.com" target="_blank" rel="noopener">Sethlui.com — Nam Moon Korean BBQ, updated January 2026</a></li>
  <li><a href="https://johor.makan.fans/" target="_blank" rel="noopener">JohorKaki — CM Restaurant, updated October 2024</a></li>
  <li><a href="https://explorejb.sg" target="_blank" rel="noopener">ExploreJB.sg — Restoran Ah Kaw, updated October 2025</a></li>
</ul>
`,
		},
		// 55 — scheduled: goes live 2026-08-25
		{
			Slug:          "new-cafes-taman-pelangi-jb-2025-2026",
			ImageAlt:      "Interior of a modern cafe in Taman Pelangi JB with warm lighting and artisan drinks",
			Title:         "3 New Cafes and Bars That Opened in Taman Pelangi JB in 2025 and 2026",
			Excerpt:       "Rowan & Betty (brunch), Cha Haus (artisan Chinese tea), and Bar9 (JB's first meatless bar with live music) — all confirmed open in Taman Pelangi as of mid-2026, all within a short walk of each other.",
			Date:          "2026-08-25",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"taman-pelangi", "johor-bahru", "new-cafe", "brunch", "tea", "bar", "2026", "jb-food"},
			FeaturedImage: "/images/blog/new-cafes-taman-pelangi-jb-2025-2026.webp",
			Content: `
<h2>Taman Pelangi's Cafe Scene Is Growing Fast</h2>
<p>Taman Pelangi has had a strong food reputation for years — Korean BBQ, heritage zi char, and late-night seafood along Jalan Perang. But its cafe scene has expanded quickly in the last twelve months. Three new venues opened in 2025 and early 2026, covering brunch, artisan tea, and nightlife. All three are confirmed open as of mid-2026 with multiple independent sources.</p>

<h2>Rowan & Betty — Brunch Cafe (Opened 2026)</h2>
<p>The newer sister brand of Rowan & Parsley, a popular brunch spot in JB's CIQ corridor. Rowan & Betty opened in 2026 at a 2nd-floor unit on Jalan Sri Pelangi 3 — reached by lift, with a retro/vintage interior that is warmer and more relaxed than its older sibling.</p>
<p>The menu blends Western brunch with Asian inflections. The <strong>Chopped Beef Cornedict (RM39)</strong> is the signature — slow-cooked beef, hollandaise, toasted muffin. The <strong>Chicken Tikka Masala with Roti Canai (RM22)</strong> is a lower-cost option that works better than it sounds. Salmon Donburi (RM38) is the safe bet for Japanese-leaning guests. Not halal-certified but no pork or lard — confirmed with staff.</p>

<table>
  <thead><tr><th>Item</th><th>Price</th></tr></thead>
  <tbody>
    <tr><td>Chopped Beef Cornedict</td><td>RM39</td></tr>
    <tr><td>Salmon Donburi</td><td>RM38</td></tr>
    <tr><td>Chicken Tikka Masala + Roti Canai</td><td>RM22</td></tr>
    <tr><td>French Toast</td><td>RM20</td></tr>
    <tr><td>Truffle Fries</td><td>RM16</td></tr>
    <tr><td>Black coffee</td><td>RM9</td></tr>
  </tbody>
</table>

<ul>
  <li><strong>Address:</strong> 27-02, Jalan Sri Pelangi 3, Taman Pelangi (2nd floor — take the lift)</li>
  <li><strong>Hours:</strong> Sun–Thu 10:00 AM – 6:00 PM | Fri–Sat 10:00 AM – 10:00 PM</li>
  <li><strong>Halal:</strong> Not certified (no pork/lard)</li>
  <li><strong>Instagram:</strong> @rowanandbetty</li>
</ul>

<h2>Cha Haus — Modern Chinese Tea House (Opened September 2025)</h2>
<p>Cha Haus (chahaustea.com) is a registered specialty tea house that opened in September 2025 at Pusat Komersial Pelangi on Jalan Sri Pelangi 4. The concept is rooted in new Chinese tea culture — loose-leaf brews, ceramic service, and a quieter pace that stands apart from bubble tea chains. The owner trained extensively in tea before opening.</p>
<p>Signature teas include Mountain Bloom, Jade Dew, and CocoJuju, served with complimentary mini egg tarts. The pastry selection runs to Longan & Oolong Tea Jelly Cake and Pistachio Basque Cheesecake. A Tea Beers product line (non-alcoholic, tea-infused) was launching in mid-2026. 120-minute dine limit during peak hours.</p>
<ul>
  <li><strong>Address:</strong> Block B, #05-02, Pusat Komersial Pelangi, Jalan Sri Pelangi 4 (2nd floor)</li>
  <li><strong>Hours:</strong> Daily 10:00 AM – 10:00 PM</li>
  <li><strong>Website:</strong> chahaustea.com</li>
  <li><strong>Instagram:</strong> @chahaus.my</li>
</ul>

<h2>Bar9 — JB's First Meatless Bar (Rebranded May 2025)</h2>
<p>Bar9 has operated in Taman Pelangi for several years but repositioned in May 2025 as JB's first meatless bar — vegetarian food with a full drinks menu. It is one of the few venues in the neighbourhood with regular live music (Friday and Saturday nights) and a midnight licence.</p>
<p>The food menu is vegetarian Asian-Western: mushroom pizza (RM28.90), aglio olio (RM23.90), mala fried rice, tempeh fries, satay. Draft Tiger and Guinness on tap. Weekday cocktail promotions. Private room available for events. Pet-friendly on the outdoor section. Google rating 4.7/5 across 74 reviews; live Eatigo bookings available as of July 2026.</p>
<ul>
  <li><strong>Address:</strong> 1A, Jalan Kuning 1, Taman Pelangi (2nd floor shophouse — entrance can be easy to miss)</li>
  <li><strong>Hours:</strong> Daily 3:00 PM – 12:00 AM</li>
  <li><strong>Halal:</strong> Not halal (serves alcohol)</li>
  <li><strong>Phone:</strong> +60 16-798 9120</li>
  <li><strong>Instagram:</strong> @bar9pelangi</li>
</ul>

<h2>Getting Here from Pelangi Capsule Hostel</h2>
<p>All three venues are within Taman Pelangi. Rowan & Betty and Cha Haus are near the commercial centre on Jalan Sri Pelangi — about a 10–15 minute walk or short Grab ride from the hostel at 26A Jalan Perang. Bar9 is on Jalan Kuning, roughly midway.</p>
<p>Pods at <a href="/rooms">Pelangi Capsule Hostel</a> start from <strong>RM30/night on weekdays, RM35 on weekends</strong>. <a href="/book">Check live availability here</a>, or walk in at 26A Jalan Perang.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://eatbook.sg/taman-pelangi-jb-cafes/" target="_blank" rel="noopener">Eatbook — Taman Pelangi JB Cafes guide (Rowan & Betty, Cha Haus)</a></li>
  <li><a href="https://eatbook.sg/new-jb-cafes-2026/" target="_blank" rel="noopener">Eatbook — New JB Cafes 2026</a></li>
  <li><a href="https://chahaustea.com/" target="_blank" rel="noopener">Cha Haus official website</a></li>
  <li><a href="https://www.tripadvisor.com/Restaurant_Review-g298278-d24919606-Reviews-Restaurant_Bar_9-Johor_Bahru_Johor_Bahru_District_Johor.html" target="_blank" rel="noopener">TripAdvisor — Bar9 Taman Pelangi</a></li>
  <li><a href="https://eatigo.com/en/branches/3395165844327" target="_blank" rel="noopener">Eatigo — Bar9 live bookings, July 2026</a></li>
</ul>
`,
		},
		// 59 — scheduled: goes live 2026-09-07
		{
			Slug:          "monthly-stay-capsule-hostel-jb-workers-interns-2026",
			ImageAlt:      "Inside a capsule pod at Pelangi Capsule Hostel, Taman Pelangi",
			Title:         "Monthly Stay at a JB Capsule Hostel: The Worker and Intern Guide (2026)",
			Excerpt:       "RM600/month all-in, no deposit, no utility bills, free Wi-Fi — why more workers and interns are choosing Pelangi Capsule Hostel over monthly room rentals in Johor Bahru.",
			Date:          "2026-09-07",
			Category:      "Living in JB",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor bahru", "monthly stay", "budget accommodation", "workers", "jb capsule hostel", "long stay"},
			FeaturedImage: "/images/blog/monthly-stay-worker-intern-capsule-pod-2026.webp",
			Content: `
<p>I run Pelangi Capsule Hostel at 26A Jalan Perang, Taman Pelangi, Johor Bahru — and over the past year, something has quietly shifted. We started as a backpacker hostel. We still are. But a growing share of our beds are now filled by workers: engineers commuting to Iskandar Puteri, interns on three-month placements in JB, and Malaysians who cross daily into Singapore for work and need a clean, affordable base on this side of the Causeway. This post is for all of them.</p>

<h2>Why Monthly Capsule Instead of Renting a Room?</h2>
<p>The standard advice when you move to JB for work is to rent a room. Simple enough — until you do the actual math.</p>
<p>A room in Taman Pelangi currently lists on iBilik at RM750–800/month for a common or middle room, with master rooms at RM850 and above. That sounds reasonable. But add in the two-month deposit (RM1,500–1,700), one month advance rent, an Unifi line you need to set up yourself (RM100+ installation, RM79–99/month contract), electricity and water split with housemates (RM60–150/month depending on aircon usage), and the mattress and basic furniture you need to buy if the room is unfurnished. Your so-called RM800 room costs you RM2,500–3,000 to move into before you sleep in it a single night.</p>
<p>At Pelangi Capsule Hostel, a monthly capsule stay is <strong>RM600/month all-in</strong>. No deposit. No utility bills. No setup cost. No lease to sign. Free Wi-Fi. A/C. Shared bathrooms that are cleaned daily. You arrive with a bag and you are set up.</p>
<p>For a worker on a 3-month internship or a probationary employee not yet sure if the job is permanent, the flexibility alone is worth the price difference.</p>

<h2>The JS-SEZ Factor — Why More Workers Are Coming to JB</h2>
<p>The demand for worker accommodation in Johor Bahru has accelerated significantly since January 2025, when Malaysian Prime Minister Anwar Ibrahim and Singaporean Prime Minister Lawrence Wong signed the agreement to officially establish the <strong>Johor-Singapore Special Economic Zone (JS-SEZ)</strong>.</p>
<p>The JS-SEZ spans over 3,500 km² across southern Johor, covering nine flagship zones including Johor Bahru City Centre, Iskandar Puteri, Forest City, and Senai. It targets 11 sectors: business services, digital economy, manufacturing, logistics, healthcare, and more. Key worker incentives include a 15% flat income tax rate for eligible knowledge workers for up to 10 years, and a 5% corporate tax rate to attract companies. The Invest Malaysia Facilitation Centre-Johor (IMFC-J) opened in February 2025 as a one-stop permit approval centre.</p>
<p>What this means practically: companies are setting up Malaysian operations in Iskandar Puteri and Medini, and they need staff. Many of those staff are new to JB, on short-term contracts, or have not yet decided where to live permanently. A no-commitment monthly capsule stay makes a lot of sense as a landing pad.</p>
<p><em>Sources: <a href="https://www.js-sez.com.my/about-js-sez/" target="_blank" rel="noopener">JS-SEZ official site</a>; <a href="https://www.reedsmith.com/articles/singapore-and-malaysia-officially-launch-the-johorsingapore-special/" target="_blank" rel="noopener">Reed Smith — JS-SEZ launch, January 2025</a></em></p>

<h2>The Singapore Daily Commuter Angle</h2>
<p>A significant number of our monthly guests are Malaysians who work in Singapore and cross the Causeway every day. For them, the maths is even clearer.</p>
<p>The cheapest monthly room rental in Singapore — a budget compact room converted from a utility or study space — starts at SGD600–900/month (approximately RM2,700–4,050 at current rates), according to <a href="https://www.zrooom.com/blogs/details/cost-of-renting-in-singapore-updated-2026" target="_blank" rel="noopener">Zrooom's 2026 Singapore rental guide</a>. Common rooms run SGD1,000–1,600. You are also competing for those rooms in one of the world's tightest rental markets.</p>
<p>Pelangi Capsule Hostel is located in Taman Pelangi, approximately 10 minutes by Grab from JB Sentral CIQ — the main Causeway crossing point. Our guests catch the Causeway Link bus from near JB Sentral each morning. Monthly Causeway Link bus pass options exist for frequent crossers. The math versus Singapore accommodation is not even close: RM600 all-in versus SGD600+ for the most basic Singapore room, before bus fares, food costs, and Singapore cost-of-living add up.</p>

<h2>What RM600/Month Gets You</h2>
<p>No fine print. Here is exactly what is included:</p>
<ul>
  <li><strong>A/C capsule pod</strong> — your own enclosed sleeping space with privacy curtain, personal light, and charging points</li>
  <li><strong>Free Wi-Fi</strong> — property-wide, suitable for remote work and video calls</li>
  <li><strong>Shared bathrooms</strong> — cleaned daily, hot shower</li>
  <li><strong>Common area</strong> — table space for working, eating, or winding down</li>
  <li><strong>Secure storage</strong> — locker for your valuables and luggage</li>
  <li><strong>No utility bills</strong> — electricity and water included</li>
  <li><strong>No deposit</strong> — nothing to lose if your plans change</li>
  <li><strong>No minimum lease</strong> — month-to-month, not a tenancy agreement</li>
</ul>
<p>What it is not: it is not a private room, and it is not for everyone. If you need a full kitchen or complete solitude, a capsule is not the right fit. But for workers who eat out (JB food is RM5–12 a meal — there are five hawker options within walking distance of this hostel), sleep, shower, and leave early, it covers every base.</p>

<h2>The Private Room Option — RM500/Month</h2>
<p>If you do need more privacy — a couple, or a worker who simply values a door that closes — we have a private room option above the 7-Eleven in the same Taman Pelangi area, available from <strong>RM500/month</strong>. This is a furnished private room with A/C, separate from the hostel pod area. Contact us directly to ask about current availability; these are limited and tend to fill through word of mouth.</p>

<h2>Cost Comparison: Your Real Options for Monthly Accommodation in JB</h2>
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Monthly Cost</th>
      <th>Setup / Deposit</th>
      <th>Utilities</th>
      <th>Wi-Fi</th>
      <th>Flexibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pelangi Capsule (pod)</strong></td>
      <td><strong>RM600 all-in</strong></td>
      <td>None</td>
      <td>Included</td>
      <td>Free</td>
      <td>Month-to-month</td>
    </tr>
    <tr>
      <td><strong>Pelangi Private Room</strong></td>
      <td><strong>RM500/month</strong></td>
      <td>None</td>
      <td>Included</td>
      <td>Free</td>
      <td>Month-to-month</td>
    </tr>
    <tr>
      <td>Room rental, JB (middle/common)</td>
      <td>RM750–900 + RM150–200 utilities</td>
      <td>RM1,500–2,000 deposit + advance</td>
      <td>Extra</td>
      <td>Extra or shared</td>
      <td>Tenancy (min 6–12 months)</td>
    </tr>
    <tr>
      <td>Airbnb monthly, JB</td>
      <td>RM1,200–2,000+</td>
      <td>None</td>
      <td>Usually included</td>
      <td>Included</td>
      <td>Flexible but pricier</td>
    </tr>
    <tr>
      <td>Budget room, Singapore</td>
      <td>SGD600–900 (RM2,700–4,050)</td>
      <td>SGD600–900 deposit</td>
      <td>Sometimes included</td>
      <td>Sometimes included</td>
      <td>Month-to-month possible</td>
    </tr>
  </tbody>
</table>
<p><em>JB room rental rates from <a href="https://www.ibilik.my/rooms/johor_bahru" target="_blank" rel="noopener">iBilik Johor Bahru listings, July 2026</a>. Singapore room rates from <a href="https://www.zrooom.com/blogs/details/cost-of-renting-in-singapore-updated-2026" target="_blank" rel="noopener">Zrooom Singapore rental guide 2026</a>.</em></p>

<h2>Who Is Actually Staying Here?</h2>
<p>Without naming names: our monthly guests currently include engineers on 3–6 month secondments to companies in Iskandar Puteri, fresh graduates doing internships at JB-based firms, Malaysians doing daily Causeway commutes who want to stop paying Singapore rent, and a few remote workers who discovered that RM600/month of overhead in JB goes much further than their previous city.</p>
<p>The common thread: they are here to work, not to holiday. They need clean, reliable, affordable, and flexible. That is what we try to deliver.</p>

<h2>How to Arrange a Monthly Stay</h2>
<p>Monthly stays are not available through standard OTA booking channels — availability is managed directly. The best way to arrange one is to WhatsApp us at <a href="https://wa.me/60127088789">012-708 8789</a> with your intended start date and duration. We will confirm availability and walk you through the simple check-in process. You can also browse the <a href="/rooms">rooms page</a> or go straight to <a href="/book">check live availability</a>.</p>
<p>We are at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru — about 10 minutes by Grab from JB Sentral CIQ. Come have a look before you commit if you want; we are happy to show you around.</p>

<h2>Frequently Asked Questions</h2>

<h2>What is included in the RM600/month capsule stay at Pelangi Capsule Hostel?</h2>
<p>The RM600/month rate covers your A/C capsule pod, free property-wide Wi-Fi, daily-cleaned shared bathrooms with hot shower, use of the common area, and secure locker storage. All utility costs (electricity, water) are included. There is no deposit and no minimum lease beyond the monthly arrangement.</p>

<h2>Do I need to pay a deposit for a monthly stay at Pelangi Capsule Hostel?</h2>
<p>No deposit is required for a monthly capsule stay at Pelangi Capsule Hostel. This is one of the key advantages over a standard room rental in Johor Bahru, which typically requires a two-month deposit plus one month advance — often RM1,500–2,000 upfront before you move in.</p>

<h2>Is there a private room option for monthly stays at Pelangi Capsule Hostel?</h2>
<p>Yes. A private room is available from RM500/month, located above the 7-Eleven in the same Taman Pelangi area. This is suited to couples or workers who need a door that closes. Private room availability is limited — contact us directly via WhatsApp at <a href="https://wa.me/60127088789">012-708 8789</a> to enquire.</p>

<h2>How close is Pelangi Capsule Hostel to JB Sentral and the Causeway?</h2>
<p>Pelangi Capsule Hostel at 26A Jalan Perang, Taman Pelangi is approximately 10 minutes by Grab from JB Sentral CIQ — the main Johor Bahru Causeway crossing point to Singapore. Causeway Link buses serving the Singapore crossing depart from near JB Sentral, making the hostel a practical base for daily Singapore commuters.</p>
`,
		},
		// 56 — scheduled: goes live 2026-08-28
		{
			Slug:          "taman-pelangi-jb-development-rts-link-2026",
			ImageAlt:      "Aerial view of Taman Pelangi Johor Bahru neighbourhood with development cranes in the background",
			Title:         "Why Taman Pelangi in Johor Bahru Is Worth Visiting Now — Before the RTS Link Changes Everything",
			Excerpt:       "The JB-Singapore RTS Link is targeted to open by end of 2026. Taman Pelangi sits approximately 3 km from Bukit Chagar station and is already seeing developer attention — RM1.5 billion in new residential projects, 90% sold at launch. Budget accommodation is still RM30/night.",
			Date:          "2026-08-28",
			Category:      "Travel & Transport",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"rts-link", "johor-bahru", "taman-pelangi", "singapore", "property", "travel", "budget-travel", "commuter"},
			FeaturedImage: "/images/blog/taman-pelangi-jb-development-rts-link-2026.webp",
			Content: `
<h2>The RTS Link Is Coming — and Taman Pelangi Is 3 km Away</h2>
<p>The Johor Bahru–Singapore RTS Link is targeted to open by end of 2026. When it does, the journey between Bukit Chagar station in JB and Woodlands North in Singapore will take approximately five minutes. For Malaysians working in Singapore, for Singaporeans visiting JB for food and a weekend away, and for budget travellers using JB as a cheaper base — this changes the map significantly.</p>
<p>Taman Pelangi is approximately 3 km from Bukit Chagar station (according to Mah Sing, the developer of the area's largest new project — cited across Bernama, The Star, and KLSE Screener). That is a 10-minute Grab or a manageable commute. And right now, before the RTS Link opens, it is still one of JB's most affordable neighbourhoods with its local character intact.</p>

<h2>What the RTS Link Actually Is</h2>
<p>The RTS Link will connect <strong>Bukit Chagar station (Johor Bahru)</strong> to <strong>Woodlands North station (Singapore)</strong> in approximately 5 minutes, operated by a joint venture of SMRT Singapore and Prasarana Malaysia.</p>
<p>Key confirmed facts as of July 2026:</p>
<ul>
  <li><strong>Target opening:</strong> by end of December 2026 — confirmed jointly by Singapore Acting Minister for Transport Jeffrey Siow and Malaysia Minister of Transport Anthony Loke on 30 June 2025</li>
  <li><strong>Capacity:</strong> 8 trains, 4 cars each, capacity for 10,000+ passengers per hour at peak</li>
  <li><strong>Journey time:</strong> approximately 5 minutes between stations</li>
  <li><strong>Fares:</strong> not yet confirmed — expected announcement in second half of 2026. Early analyst estimates: S$5–S$7 one-way (approximately RM15–22)</li>
  <li><strong>Immigration:</strong> cleared at departure station only — no double queueing at both ends, unlike the current Causeway crossing</li>
  <li><strong>Progress:</strong> First train arrived at Woodlands North test site on 5 February 2026 (Malay Mail). Rail systems were 56% complete as of June 2025</li>
</ul>

<h2>What Is Happening in Taman Pelangi Right Now</h2>
<p>Property developers noticed the RTS effect before most travellers did. Two major new projects launched in Taman Pelangi in 2025:</p>
<p><strong>M Grand Minori by Mah Sing</strong> is a 5.99-acre freehold mixed-use development on Jalan Kuning, Taman Pelangi — 1,733 serviced apartment units across two 59-storey towers, total GDV RM1.5 billion. Phase 1 launched at the sales gallery on 11 August 2025 and achieved a <strong>90% take-up rate over a single weekend</strong> (Bernama; The Star, 11 Aug 2025). Phase 1 prices started at RM390,000 for a 403 sq ft studio, up to RM769,000 for 835 sq ft. Phase 2 was targeting a Q2–Q3 2026 launch.</p>
<p><strong>Residensi Maxim by Maxim Global</strong> launched 1,026 units in November 2025, from 450–865 sq ft at RM426,000–RM816,000 (The Edge Malaysia Q4 2025 JB Property Monitor).</p>
<p>A 90% take-up rate in a single weekend is not speculative hype. It reflects buyers who are convinced that a 5-minute rail link to Singapore will materially increase the value — and the demand — for accommodation in this neighbourhood.</p>

<h2>What This Means for Budget Travellers Right Now</h2>
<p>The short version: <strong>Taman Pelangi is still at pre-RTS prices, and that window is finite.</strong></p>
<p>A capsule pod at Pelangi Capsule Hostel — located at 26A Jalan Perang in Taman Pelangi — costs <strong>RM30/night on weekdays, RM35 on weekends</strong>. Monthly stays from RM600. The street outside has a Korean BBQ that has been running for 17 years, a heritage zi char restaurant dating to 1979, Japanese-Western fusion cafes, and new brunch spots that opened in 2025 and 2026. It is a neighbourhood that still functions like one.</p>
<p>When the RTS Link opens and weekend visitors from Singapore begin flowing through Bukit Chagar in volume, demand for affordable accommodation in the area will grow. Property developers have already priced that in. Short-stay rates have not — yet.</p>

<h2>Practical Notes for Visitors</h2>
<ul>
  <li><strong>Getting from Bukit Chagar to Taman Pelangi:</strong> approximately 3 km by road, 8–12 minutes by Grab from JB Sentral (near the Bukit Chagar area). The RTS Link is not yet open — until then, crossing by Causeway or Second Link is the standard route from Singapore</li>
  <li><strong>From JB Sentral now:</strong> Causeway Link CW1/CW2 buses stop near JB Sentral, then about 10 minutes by Grab to Taman Pelangi</li>
  <li><strong>Food nearby:</strong> Five confirmed-open restaurants on <a href="/blog/jalan-perang-food-guide-taman-pelangi">Jalan Perang</a> within walking distance of the hostel; <a href="/blog/new-cafes-taman-pelangi-jb-2025-2026">three new cafes and bars</a> that opened in 2025–2026</li>
  <li><strong>Stay:</strong> <a href="/rooms">Capsule pods at Pelangi Capsule Hostel</a> from RM30/night. <a href="/book">Check live availability here</a></li>
</ul>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.mot.gov.sg/news-resources/newsroom/singapore-and-malaysia-commemorate-the-unveiling-of-the--first-johor-bahru---singapore-rts-link-train/" target="_blank" rel="noopener">MOT Singapore — RTS Link joint statement, 30 June 2025</a></li>
  <li><a href="https://www.lta.gov.sg/content/ltagov/en/upcoming_projects/rail_expansion/JB-Singapore_RTS_link.html" target="_blank" rel="noopener">LTA Singapore — JB-Singapore RTS Link project page</a></li>
  <li><a href="https://bernama.com/en/news.php?id=2453653" target="_blank" rel="noopener">Bernama — M Grand Minori 90% take-up at launch weekend</a></li>
  <li><a href="https://www.thestar.com.my/metro/metro-news/2025/08/11/90-take-up-rate-for-housing-project-over-a-weekend" target="_blank" rel="noopener">The Star — M Grand Minori sales launch, 11 August 2025</a></li>
  <li><a href="https://theedgemalaysia.com/node/798249" target="_blank" rel="noopener">The Edge Malaysia — M Grand Minori Phase 1 and Phase 2 details</a></li>
  <li><a href="https://theedgemalaysia.com/node/798459" target="_blank" rel="noopener">The Edge Malaysia — Q4 2025 JB property monitor (Residensi Maxim)</a></li>
</ul>
`,
		},
		// 57 — scheduled: goes live 2026-09-01
		{
			Slug:          "is-jb-worth-staying-overnight-2026",
			Title:         "Is Johor Bahru Worth Staying Overnight? (An Honest 2026 Answer)",
			Excerpt:       "More than 11 million Singaporeans crossed into Johor in the first 7 months of 2025 — almost all as day-trippers. Here is what they missed, and why one night changes everything.",
			Date:          "2026-09-01",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"johor bahru", "singapore", "budget travel", "overnight stay", "taman pelangi"},
			FeaturedImage: "/images/blog/is-jb-worth-staying-overnight-2026.webp",
			ImageAlt:      "Johor Bahru night skyline viewed from across the Strait of Johor, with the city lights reflecting on the water",
			InLanguage:    "en",
			Content: `
<p>Close to <strong>11 million Singaporeans visited Johor in the first seven months of 2025 alone</strong> — that is more than double Singapore's entire population, crossing the border in under half a year (source: Mothership.sg, citing Malaysia Tourism data, August 2025). And the vast majority of them went home the same day. They ate, they shopped, they grabbed a massage, then they queued back through Woodlands and Tuas.</p>

<p>If that is you — and honestly, it probably is — I want to make a case for one small change. Stay one night. Because what you are missing by leaving before dark is not minor. It is, arguably, the best part of JB.</p>

<h2>What the Numbers Actually Tell Us</h2>

<p>In 2025, Singaporeans spent an estimated <strong>S$1 billion in Johor between January and August</strong> (source: The Independent Singapore, citing Bank Negara and DBS card data). That works out to roughly S$91 per trip — mostly on food, groceries, and petrol. Useful spending, but transactional. In and out.</p>

<p>The single busiest day ever recorded at Singapore's land checkpoints was <strong>19 December 2025, when close to 589,000 travellers crossed in a single day</strong> (source: Immigration and Checkpoints Authority Singapore, January 2026). For context: that is roughly 1 in every 10 Singapore residents crossing in 24 hours. The queues that day stretched back 90 minutes past the Woodlands checkpoint from the JB side.</p>

<p>Here is the thing no one tells you: the people who stayed overnight in JB that weekend woke up on Saturday morning with zero queue stress, ate dim sum at 8am, and crossed back at 11am when the worst of it had cleared.</p>

<h2>What You Miss on a Day Trip</h2>

<p>This is the honest conversion argument, so let me be specific.</p>

<p><strong>The Tuesday Night Pasar Malam at Taman Pelangi.</strong> Every Tuesday from around 4:30pm, the car park near Leisure Mall Taman Pelangi transforms into a proper night market — cooked food stalls, fresh produce, clothing, seafood, local kuih. Popiah, laksa, carrot cake, yong tau hu, soya beancurd. It runs until about 10pm, it is walkable from Taman Pelangi accommodation, and it is exactly the kind of market that does not make it onto TripAdvisor's top-ten lists because locals do not think of it as a tourist attraction. They think of it as Tuesday.</p>

<p>You cannot do this on a day trip unless you happen to cross on a Tuesday afternoon and leave after dark — which most day-trippers do not, because the evening queue back is brutal.</p>

<p><strong>JB supper culture.</strong> Malaysia runs on late-night eating in a way Singapore stopped doing when rents got expensive. Seafood places in JB are still buzzing at 11pm. The char kuey teow uncle at the coffee shop near Jalan Perang has been frying since 9pm and will keep going past midnight. You cannot experience this as a day-tripper because you are already back in Singapore.</p>

<p><strong>Morning hawker markets before 9am.</strong> The best plates of nasi lemak and roti canai are gone by 9:30am. Day-trippers almost never make it to JB before 10am — the Causeway is already jammed by then. Staying overnight means you wake up five minutes from a morning market that has not been touched by the weekend crowd yet.</p>

<p><strong>The Sunday-evening Woodlands jam — skipped entirely.</strong> If you have done a JB day trip on a Sunday, you know this: the drive or bus ride back from Woodlands checkpoint between 5pm and 9pm is genuinely painful. 90 minutes is optimistic. Staying Sunday night and crossing Monday morning means you sidestep it completely.</p>

<h2>The Cost Comparison: Day Trip vs Overnight</h2>

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Day Trip (SGD)</th>
      <th>Overnight Stay (SGD)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Causeway Link bus, return</td>
      <td>~S$4–6</td>
      <td>~S$4–6 (same)</td>
    </tr>
    <tr>
      <td>Food (JB prices, ~RM40–60/day)</td>
      <td>~S$13–19</td>
      <td>~S$26–38 (two days of eating)</td>
    </tr>
    <tr>
      <td>Sleep (capsule pod, RM30 weekday)</td>
      <td>—</td>
      <td>~S$9.50 (RM30 at ~3.15 rate)</td>
    </tr>
    <tr>
      <td>Evening activities (market, supper)</td>
      <td>—</td>
      <td>~S$8–15</td>
    </tr>
    <tr>
      <td><strong>Estimated total</strong></td>
      <td><strong>~S$17–25</strong></td>
      <td><strong>~S$47–68</strong></td>
    </tr>
  </tbody>
</table>

<p><em>SGD/MYR rate approximately 3.15 as of July 2026 (source: Xe.com). Food estimates based on mid-range hawker spending, not restaurants.</em></p>

<p>The overnight trip costs roughly S$30–45 more. For that, you get an extra full day of meals (which are so cheap they almost pay for themselves by Singapore standards), the night market, supper, a stress-free morning, and no Sunday evening queue. By any reasonable value calculation, that is an excellent S$30–45.</p>

<h2>What About the RTS Link?</h2>

<p>The JB–Singapore RTS Link — a 4 km cross-border rail connecting Bukit Chagar in JB to Woodlands North in Singapore — is targeted to open by end of December 2026, with some reports flagging a possible slip to early January 2027 as systems testing progresses (sources: YouTrip Singapore; JBSkyOne, July 2026). The journey time will be approximately five minutes. Indicative fares are S$5–7 one way.</p>

<p>When it opens, day-tripping will become even easier — which means even more Singaporeans will do it, and the Causeway crowd will redistribute rather than disappear. The Tuesday night market will still be on Tuesdays. Supper will still run past midnight. The morning dim sum queue will still be shorter at 8am than at 10am. The overnight advantage does not go away when the RTS opens — if anything, having a five-minute crossing option makes a spontaneous Tuesday-to-Wednesday overnight trip more practical, not less.</p>

<h2>Where to Stay: Pelangi Capsule Hostel, Taman Pelangi</h2>

<p>If you are doing this for the first time and want to keep costs low, a capsule pod hostel is the right call. <a href="/rooms">Pelangi Capsule Hostel</a> is at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong> — walking distance from the Tuesday night market, a 10-minute Grab from JB Sentral, and surrounded by the food scene described above.</p>

<ul>
  <li><strong>Weekday pods:</strong> RM30/night (~S$9.50)</li>
  <li><strong>Weekend pods:</strong> RM35/night (~S$11)</li>
  <li><strong>Monthly stay:</strong> from RM600/month (~S$188)</li>
  <li><strong>Check-in:</strong> 3:00 PM | <strong>Check-out:</strong> 12:00 PM</li>
  <li><strong>WiFi:</strong> Free, included</li>
  <li><strong>Booking:</strong> <a href="/book">Check live availability</a> or walk in</li>
</ul>

<p>The pods have hot showers, lockers, and air-conditioning. It is not a hotel — it is a clean, social, budget base that makes a S$9.50 sleep in JB genuinely viable. I have stayed here enough times to say: the value-for-money is hard to argue with when the alternative is a Singapore hostel at S$40–60 for a similar pod.</p>

<h2>The Honest Answer</h2>

<p>Is JB worth staying overnight? Yes — but with one condition: you need to actually use the extra time, not just sleep through it. The Tuesday night market, an evening of supper culture, a slow morning at a hawker centre before 9am, crossing back on your own schedule without the Sunday jam — these are real things that actually improve the trip. They are not marketing copy. They are what JB residents do every week.</p>

<p>The day-trip version of JB is real and enjoyable. The overnight version is just more of it, at a cost that is lower than most Singapore dinners.</p>

<p><a href="/book">Book a pod at Pelangi Capsule Hostel</a> and check what Tuesday looks like. You can always be back in Singapore by Wednesday lunch.</p>

<h2>Frequently Asked Questions</h2>

<h2>What time does the Taman Pelangi Pasar Malam start?</h2>
<p>The Taman Pelangi night market (pasar malam) runs every Tuesday from approximately 4:30 PM to 10:00 PM. It is located near Leisure Mall Taman Pelangi — key in "Taman Pelangi" on Grab and look for the stalls from the roadside. Arrive before 7 PM for the best stall selection before the crowd builds (source: Wanderlog; Lemon8 community guide).</p>

<h2>Is it safe to walk at night in Taman Pelangi, Johor Bahru?</h2>
<p>Taman Pelangi is one of JB's more established residential and commercial neighbourhoods with active street-level activity well into the evening — restaurants, cafes, and convenience shops stay open past 11 PM. Standard precautions apply: stay on main streets, use Grab rather than walking long distances after midnight, and keep valuables out of sight. The area immediately around Jalan Perang and the commercial centre is well-lit and regularly trafficked.</p>

<h2>How much does a capsule hostel cost in Johor Bahru in 2026?</h2>
<p>At Pelangi Capsule Hostel (26A Jalan Perang, Taman Pelangi), capsule pods cost <strong>RM30/night on weekdays and RM35/night on weekends</strong>. At the July 2026 exchange rate of approximately SGD 1 = RM3.15, that works out to roughly S$9.50–S$11 per night — significantly cheaper than comparable capsule hostels in Singapore (typically S$35–60/night). Monthly stays are available from RM600.</p>

<h2>Is the Causeway crowded in the morning when crossing from Singapore to JB?</h2>
<p>Causeway traffic from Singapore into JB is typically lightest on weekday mornings between 6am and 8am, and heaviest on Friday evenings, Saturday mornings, and Sunday evenings returning to Singapore. The record single-day crossing was 589,000 travellers on 19 December 2025 (source: ICA Singapore). If you are crossing on a weekend, the 9am–11am window is usually better than midday. Staying overnight in JB and crossing back on a weekday morning almost entirely eliminates queue time.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://mothership.sg/2025/08/how-many-singaporeans-visit-johor-malaysia-yearly/" target="_blank" rel="noopener">Mothership.sg — Singaporeans visiting Johor Jan–Jul 2025 (11 million)</a></li>
  <li><a href="https://theindependent.sg/johor-in-numbers-11-million-visitors-from-singapore-spent-s1-billion-so-far-in-2025/" target="_blank" rel="noopener">The Independent Singapore — S$1 billion Singaporean spending in Johor, Jan–Aug 2025</a></li>
  <li><a href="https://www.scmp.com/week-asia/economics/article/3344371/cross-border-trips-johor-push-singapore-checkpoint-traffic-record-high-2025" target="_blank" rel="noopener">SCMP — ICA Singapore checkpoint record, 589,000 crossings on 19 December 2025</a></li>
  <li><a href="https://www.you.co/sg/blog/rts-link-jb/" target="_blank" rel="noopener">YouTrip Singapore — RTS Link fares, stations, and opening date guide</a></li>
  <li><a href="https://www.jbskyone.com/jb-singapore-rts-link-guide" target="_blank" rel="noopener">JBSkyOne — JB–Singapore RTS Link complete guide (2027)</a></li>
  <li><a href="https://wanderlog.com/place/details/3824590/taman-pelangi-night-market" target="_blank" rel="noopener">Wanderlog — Taman Pelangi Night Market details and timings</a></li>
  <li><a href="https://www.xe.com/currencyconverter/convert/?Amount=1&From=SGD&To=MYR" target="_blank" rel="noopener">Xe.com — SGD to MYR exchange rate, July 2026</a></li>
</ul>
`,
		},
		// 58 — scheduled: goes live 2026-09-04
		{
			Slug:          "singapore-to-jb-transport-guide-avoid-scams-2026",
			ImageAlt:      "Causeway buses queuing at Woodlands Checkpoint for the Singapore to Johor Bahru crossing",
			Title:         "How to Get from Singapore to JB Without Getting Scammed (2026 Guide)",
			Excerpt:       "First time crossing to Johor Bahru from Singapore? Here is every transport option, how to dodge the taxi touts at CIQ, how to use Grab on the JB side, and the one app you need to download before you leave.",
			Date:          "2026-09-04",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"johor bahru", "singapore", "causeway", "transport", "travel tips", "jb sentral"},
			FeaturedImage: "/images/blog/singapore-to-jb-transport-guide-avoid-scams-2026.webp",
			Content: `
<p>The moment you step out of Malaysian customs at JB Sentral, someone will probably approach you. They look confident, they know exactly what you need, and they will tell you the taxi queue is broken or the meter is not working or there is a much better option — their option. This has been happening for years, and it still catches first-timers every single time. I run a hostel at 26A Jalan Perang, Taman Pelangi, and I hear the same story from guests who arrived here via a RM60 "uncle taxi" that should have cost RM10. This guide exists so that does not happen to you.</p>

<h2>Step-by-Step: How to Cross from Singapore to JB Safely</h2>
<ol>
  <li><strong>Download MyNIISe before you leave Singapore.</strong> Since 28 February 2026, MyNIISe has fully replaced MyBorderPass as Malaysia's official immigration clearance app (Malay Mail, January 2026; Lowyat.NET, 2026). It works for both Malaysians and tourists from 63 eligible countries. One QR code clears your whole group — no scanning one by one. If you are travelling with family or friends, this alone can shave 15–20 minutes off your queue time. Download it, register, and have it ready before you board the bus in Singapore.</li>
  <li><strong>Get to Kranji MRT or Queen Street Bus Terminal in Singapore.</strong> These are your two bus boarding points for JB. From Kranji, take SBS Transit 170X. From Queen Street (Bugis area), take SBS Transit 170. Both accept EZ-Link, contactless Mastercard/Visa, Apple Pay, and Google Pay (SBS Transit, 2026). The fare to JB Sentral on EZ-Link runs approximately S$1.28–S$2.50 depending on where you board and which service you take — the cheapest legal crossing in either direction.</li>
  <li><strong>Clear Singapore immigration at Woodlands Checkpoint.</strong> Everyone exits the bus, walks through Singapore passport control, and re-boards. This is normal — do not panic if it looks chaotic. Stay with your luggage and follow the crowd.</li>
  <li><strong>Cross the Causeway.</strong> About 1 km across the water. Five minutes without traffic, up to two hours on a Friday evening (more on timing below).</li>
  <li><strong>Clear Malaysian immigration at JB CIQ.</strong> Use your MyNIISe QR code at the autogate if available. Follow the signs for "Arrivals" and ignore anyone who approaches you before you are fully through customs.</li>
  <li><strong>Only speak to transport options AFTER you have cleared the customs hall and are outside the building.</strong> This is where the touts operate. Step outside, find a seat, connect to WiFi or your Malaysian SIM, and open Grab. Do not negotiate with anyone who approached you inside or immediately at the exit.</li>
  <li><strong>Book Grab from your Malaysian number or tourist SIM.</strong> You cannot book Grab in Singapore to ride into JB — it requires a Malaysian-registered account and a Malaysian SIM or data connection to function in Johor. SIM card stalls are available inside JB Sentral and at the adjacent City Square Mall, selling Celcom, Digi, Maxis, and U Mobile tourist prepaid cards (TripAdvisor JB Forum; Instarem Travel Guide, 2025). A tourist SIM with a few GB of data runs about RM10–15. Worth every ringgit.</li>
</ol>

<h2>Transport Options Compared</h2>
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Cost (approx.)</th>
      <th>Time to Taman Pelangi</th>
      <th>Scam Risk</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bus 170 / 170X from SG + Grab from JB Sentral</td>
      <td>S$1.28–S$2.50 bus + RM8–12 Grab</td>
      <td>30–50 min (no traffic)</td>
      <td>Very low</td>
      <td>Cheapest option; requires Malaysian SIM for Grab</td>
    </tr>
    <tr>
      <td>Grab cross-border (SG-JB service)</td>
      <td>S$30–S$50+ one-way</td>
      <td>40–60 min (border included)</td>
      <td>Zero — app-priced</td>
      <td>Grab was awarded the first Cross-Border Ride-Hail Service Operator Licence in April 2026; door-to-door but premium price (The Smart Local, 2026)</td>
    </tr>
    <tr>
      <td>Official licensed taxi (JB-side metered)</td>
      <td>RM15–25 to Taman Pelangi</td>
      <td>10–15 min</td>
      <td>Low if from official counter</td>
      <td>Only use the official taxi counter inside JB Sentral — never a driver who approaches you first</td>
    </tr>
    <tr>
      <td>Unlicensed tout taxi</td>
      <td>"Negotiated" RM40–80+</td>
      <td>Same road, different wallet</td>
      <td>High</td>
      <td>No meter, no receipt, no recourse. Just do not.</td>
    </tr>
  </tbody>
</table>

<h2>The Taxi Tout Problem at JB CIQ — What Actually Happens</h2>
<p>This is not a rare edge case. In December 2025, Mothership.sg documented touts at JB Sentral quoting S$120 for rides to Singapore — switching to Singapore dollars mid-sentence when they spot a Singaporean face. The Stomp.sg forums have had complaints stretching back years: touts tell passengers the taxi queue is full or broken, offer a "special deal," then charge three to four times the proper fare once the passenger is in the car (Stomp.sg; Mothership.sg, 2025).</p>
<p>The organised approach is worth understanding: one person spots you and asks where you are going, a second one appears to "confirm the price," and a third leads you to a waiting car. By the time you realise something is off, you are already committed. The tell is always the same: <strong>they approached you, not the other way around.</strong></p>

<h2>What to Do If a Tout Approaches You</h2>
<ul>
  <li><strong>Do not engage with the price.</strong> Once you start negotiating, you are already in their frame. The correct answer is "no thank you" and keep walking.</li>
  <li><strong>Do not let them carry your bag.</strong> This is a classic pressure tactic — once they have your luggage, you feel obligated to continue.</li>
  <li><strong>Walk past and find a seat inside or near JB Sentral.</strong> Connect to WiFi, open Grab, book a car. The Grab pick-up points at JB Sentral are clearly marked.</li>
  <li><strong>If you need an official taxi and do not have a Malaysian SIM yet</strong>, go to the official taxi counter inside JB Sentral. Ask for the counter explicitly. It is staffed, metered (for local trips), and the drivers are licensed.</li>
  <li><strong>Say you have already booked.</strong> If they are persistent, showing them your Grab app (even a blank screen) usually ends the conversation.</li>
</ul>

<h2>When to Cross: Avoid These Windows</h2>
<p>The crossing is manageable if you time it right. Based on consistent data from Causeway traffic trackers (CausewayTraffic.sg; sgmytravel.com, 2026):</p>
<ul>
  <li><strong>Worst time to cross SG to JB:</strong> Friday 5–9 PM. Malaysian workers going home plus Singaporean weekend visitors all converging at once. Two-hour queues are common.</li>
  <li><strong>Worst time to return JB to SG:</strong> Sunday 3–9 PM. The Sunday evening queue back to Singapore can stretch private car lines over 2 km from the gantry.</li>
  <li><strong>Best windows:</strong> Weekday mornings or afternoons (before noon is best), Saturday before 7 AM, or any night after 10 PM.</li>
  <li><strong>Public holidays:</strong> Treat the day before a Malaysian or Singapore public holiday like a Friday night — avoid if possible. Long weekends produce multi-hour queues in both directions.</li>
</ul>
<p>If your schedule is flexible, a Tuesday or Wednesday morning crossing feels almost relaxed. You will clear CIQ in under 20 minutes and wonder what all the fuss is about.</p>

<h2>Getting to Taman Pelangi from JB Sentral</h2>
<p>From JB Sentral / CIQ, Taman Pelangi is approximately 10–15 minutes by Grab, depending on traffic. The Grab fare typically runs RM8–12. Type in "26A Jalan Perang, Taman Pelangi" as your destination — the driver will know the area.</p>
<p>If you are coming in the afternoon on a weekday, traffic along Jalan Tun Abdul Razak can add 5–10 minutes. Evening rush (5–7 PM) can push it to 20–25 minutes. Still faster and cheaper than negotiating with a tout at the exit.</p>

<h2>The One App You Actually Need</h2>
<p>Download <strong>MyNIISe</strong> before you cross. It replaced MyBorderPass on 28 February 2026 and is now the official group QR clearance system at Johor Bahru checkpoints, including Sultan Iskandar Building and Sultan Abu Bakar Complex (Malaysia Immigration Department, via WeirdKaya; paultan.org, 2026). Register your passport details, generate a QR code, and use it at the autogate. For groups, one QR covers everyone — the old system required individual scans. The time saving is real.</p>
<p>After that, have Grab installed and a Malaysian SIM ready. Those two things — MyNIISe and Grab — will handle 90% of what goes wrong for first-time crossers.</p>

<p>Once you clear customs safely and land in JB, your first decision is where to stay. <a href="/book">Pelangi Capsule Hostel</a> is at 26A Jalan Perang, Taman Pelangi — about 10 minutes by Grab from JB Sentral. Pods from <strong>RM30/night weekdays, RM35/night weekends</strong>, monthly from RM600. No deposit headaches, 24/7 self check-in, and WiFi that actually works. <a href="/book">Check availability here</a> or WhatsApp us at <strong>+60 12-708 8789</strong>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Grab available in Johor Bahru?</h3>
<p>Yes, Grab works well throughout JB. You need a Malaysian phone number or a Malaysian tourist SIM to book on the Malaysian side. Download the Grab app, set your region to Malaysia, and book after you clear customs at JB CIQ — not before. Tourist SIM cards are available at stalls inside JB Sentral and at City Square Mall for around RM10–15.</p>

<h3>Can I book Grab from Singapore to go to JB?</h3>
<p>Not in the standard way. The regular Grab Malaysia service requires you to be on the JB side and have a Malaysian number. However, Grab launched an official cross-border taxi service in May 2026 after receiving Singapore's first Cross-Border Ride-Hail Service Operator Licence — this can be booked from the Singapore side but costs S$30–S$50+ one-way. For budget travellers, the better approach is to take Bus 170 or 170X across and book a regular Grab on the Malaysian side once through customs.</p>

<h3>How long does it take to cross the Causeway from Singapore to JB?</h3>
<p>On a good weekday morning, total border crossing time (both immigration halls plus bus travel) is 30–50 minutes. On a Friday evening or before a public holiday, it can take 2–3 hours. The physical distance across the Causeway is about 1 km, which takes 5 minutes by bus when traffic is clear. Queue at immigration — not the bridge itself — is what determines your total time. Check CausewayTraffic.sg before you leave for live traffic conditions.</p>

<h3>Is there an easier way to cross the Causeway in 2026?</h3>
<p>The MyNIISe app (which replaced MyBorderPass on 28 February 2026) significantly reduces queue time at the autogate lanes — especially for groups, since one QR code now clears everyone together. Download and register before you travel. Beyond that, timing your crossing outside of Friday evening and Sunday evening peaks makes the biggest practical difference. The Johor Bahru–Singapore RTS Link rail service is targeted to open by end of 2026, which will add a 5-minute train option between Bukit Chagar (JB) and Woodlands North (Singapore), but it is not yet operational as of the date of this post.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.malaymail.com/news/malaysia/2026/01/13/what-is-mydigital-id-and-myniise-and-why-malaysians-now-need-both-to-travel/204775" target="_blank" rel="noopener">Malay Mail — What is MyDigital ID and MyNIISe (January 2026)</a></li>
  <li><a href="https://www.lowyat.net/2026/379550/immigration-department-myborderpass-myniise-mydigital-id/" target="_blank" rel="noopener">Lowyat.NET — Immigration Department clarifies MyBorderPass vs MyNIISe (2026)</a></li>
  <li><a href="https://weirdkaya.com/using-myborderpass-before-youll-need-to-know-this-about-myniise/" target="_blank" rel="noopener">WeirdKaya — MyNIISe replaces MyBorderPass: what you need to know</a></li>
  <li><a href="https://www.sbstransit.com.sg/Service/BusService?ServiceNo=170X&amp;ServiceType=Basic&amp;Dir=2" target="_blank" rel="noopener">SBS Transit — Bus 170X service information (2026)</a></li>
  <li><a href="https://thesmartlocal.com/read/public-bus-to-jb/" target="_blank" rel="noopener">The Smart Local — Guide to taking a bus to JB (2026)</a></li>
  <li><a href="https://mothership.sg/2025/12/malaysia-taxi-touting/" target="_blank" rel="noopener">Mothership.sg — Malaysia taxi touts quoting inflated fares (December 2025)</a></li>
  <li><a href="https://thesmartlocal.com/read/grab-cross-border-taxis-sg-jb/" target="_blank" rel="noopener">The Smart Local — Grab cross-border taxi service SG-JB (2026)</a></li>
  <li><a href="https://sgmytravel.com/how-to-avoid-jam-when-traveling-between-singapore-jb/" target="_blank" rel="noopener">SGMYTravel — Causeway jam guide: best times to cross (2026)</a></li>
  <li><a href="https://causewaytraffic.sg/guides/" target="_blank" rel="noopener">CausewayTraffic.sg — Causeway traffic guides and peak-hour data</a></li>
</ul>
`,
		},
		// 60 — scheduled: goes live 2026-09-10
		{
			Slug:          "rts-link-january-2027-jb-travel-guide",
			Title:         "RTS Link Opens January 2027: What JB Travellers Need to Know Now",
			Excerpt:       "The Johor Bahru–Singapore RTS Link is 90%+ complete and targeting January 2027. Here's what co-located CIQ, RM15–21 fares, and a 5-minute crossing mean for your next JB stay.",
			Date:          "2026-09-10",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"rts-link", "johor-bahru", "singapore", "border-crossing", "commuter", "travel-tips"},
			FeaturedImage: "/images/blog/rts-link-january-2027-jb-travel-guide.webp",
			ImageAlt:      "RTS Link elevated rail structure at Bukit Chagar station in Johor Bahru under construction, nearly complete in 2026",
			InLanguage:    "en",
			Content: `
<h2>What the RTS Link Means for JB Travellers</h2>

<p>The Johor Bahru–Singapore Rapid Transit System (RTS Link) is now more than 90% complete, with full passenger operations targeted for January 2027. Systems testing begins September 2026. After years of delays and negotiations, the cross-border rail link is finally close enough to plan around — and if you're staying in JB, it changes the calculus on how you commute, visit, or base yourself on the Malaysian side of the causeway.</p>

<p>This guide covers the confirmed facts: fares, stations, journey time, immigration process, and what the opening means practically for travellers staying near <a href="/getting-here">Taman Pelangi</a>.</p>

<h2>Key RTS Link Details at a Glance</h2>

<p>The RTS Link is a 4-kilometre elevated rail line connecting Bukit Chagar station in Johor Bahru to Woodlands North station in Singapore. On the Singapore side, Woodlands North connects directly to the Thomson-East Coast Line (TEL), meaning onward travel to Orchard, Marina Bay, or Changi is a single-transfer ride with no additional border crossing.</p>

<ul>
  <li><strong>JB Station:</strong> Bukit Chagar — located near JB Sentral and the current Customs, Immigration and Quarantine (CIQ) complex</li>
  <li><strong>Singapore Station:</strong> Woodlands North — direct interchange with Thomson-East Coast Line</li>
  <li><strong>Journey time:</strong> approximately 5 minutes across the strait</li>
  <li><strong>Expected fare:</strong> RM15.50–RM21.70 one way (approximately S$5–S$7)</li>
  <li><strong>Systems testing:</strong> begins September 2026</li>
  <li><strong>Full operations target:</strong> January 2027</li>
  <li><strong>Construction progress:</strong> 90%+ complete as of May 2026</li>
</ul>

<h2>Single Immigration Clearance — No More Double Queue</h2>

<p>This is the detail most travellers care about. Singapore's Parliament passed the Cross-Border Railways (Border Control Co-Location) Bill in May 2026. Under co-location arrangements, travellers clear both Malaysian and Singapore immigration at the <em>departing</em> station before boarding. That means one checkpoint, one queue, one process — then you're on the train and done.</p>

<p>If you're departing from Bukit Chagar (heading to Singapore), you clear Malaysian exit and Singapore entry at Bukit Chagar. If you're returning from Woodlands North, you handle both at Woodlands North before boarding. There is no secondary inspection mid-journey or on arrival. This is a meaningful improvement over the current bus and taxi crossings, where passengers queue at Malaysian customs, cross the causeway, then queue again at Singapore's Woodlands checkpoint.</p>

<h2>RTS Link vs Current Crossing Options</h2>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Journey Time</th>
      <th>Approximate Cost</th>
      <th>Immigration Process</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RTS Link (from Jan 2027)</td>
      <td>~5 min rail + clearance time</td>
      <td>RM15.50–RM21.70 one way</td>
      <td>Single checkpoint at departing station</td>
      <td>Connects to TEL at Woodlands North</td>
    </tr>
    <tr>
      <td>Causeway Link / SBS Express Bus</td>
      <td>45 min–2+ hours (traffic dependent)</td>
      <td>RM5–RM10 one way</td>
      <td>Two checkpoints (Malaysian + Singapore)</td>
      <td>Cheapest option; slowest in peak hours</td>
    </tr>
    <tr>
      <td>Grab / Taxi (private car)</td>
      <td>30 min–2+ hours (traffic dependent)</td>
      <td>RM30–RM80+ depending on demand</td>
      <td>Two checkpoints</td>
      <td>Convenient but expensive; surge pricing at peak</td>
    </tr>
    <tr>
      <td>Motorcycle (own vehicle)</td>
      <td>Variable</td>
      <td>Road tax + toll</td>
      <td>Two checkpoints</td>
      <td>For residents with bikes only</td>
    </tr>
  </tbody>
</table>

<p>The RTS Link won't be the cheapest option — buses will still run cheaper for budget travellers who can tolerate the queue. But for daily commuters and anyone crossing more than once or twice a week, the time savings will be substantial. A 5-minute ride replacing a 90-minute morning commute is a different lifestyle, not just a faster trip.</p>

<h2>Getting from Taman Pelangi to Bukit Chagar Station</h2>

<p>Taman Pelangi sits approximately 3 km from Bukit Chagar station — about a 10-minute Grab or taxi ride under normal traffic conditions. The neighbourhood is centrally located within JB, which means access to the RTS Link will be straightforward once it opens.</p>

<p>For current transport options between Taman Pelangi and the causeway, see our <a href="/getting-here">getting here page</a>, which covers Grab routes, bus stops, and landmarks near the hostel.</p>

<h2>What This Means for Monthly Stays in JB</h2>

<p>The RTS Link is likely to accelerate what's already a visible trend: Singapore-based workers and professionals choosing to live in JB and commute. Monthly rental demand in neighbourhoods close to Bukit Chagar — including Taman Pelangi — has been rising in anticipation. The combination of a predictable 5-minute crossing, co-located immigration, and significantly lower cost of living in JB makes the calculus straightforward for anyone whose Singapore work schedule has any flexibility.</p>

<p>For travellers testing the JB lifestyle before committing to a long-term lease, a monthly stay at a capsule hostel is a low-risk way to experience the neighbourhood, the commute options, and the daily routines before signing anything. Monthly <a href="/rooms">capsule pods</a> at Pelangi are available from RM600.</p>

<h2>FAQ: RTS Link for JB Travellers</h2>

<h3>When exactly does the RTS Link open?</h3>
<p>The confirmed target is January 2027. Systems testing begins in September 2026. No specific opening date within January 2027 has been officially announced. Track updates from Prasarana (Malaysia) and the Land Transport Authority (Singapore) for confirmed dates closer to opening.</p>

<h3>How much will a single trip cost?</h3>
<p>Expected fares are in the range of RM15.50–RM21.70 one way, equivalent to approximately S$5–S$7. These are projected fares based on planning documents — final confirmed pricing has not been officially published as of mid-2026. Fares may vary by time of day or distance-based calculation once the ticketing system is finalised.</p>

<h3>Do I still need to carry my passport?</h3>
<p>Yes. The RTS Link is a cross-border rail service; you are crossing an international boundary. You will need a valid travel document — passport for most nationalities — for immigration clearance at the departing station. The co-location arrangement streamlines the process, but does not remove the immigration requirement.</p>

<h3>Will the RTS Link reduce congestion on the Causeway?</h3>
<p>The RTS Link is designed to carry up to 10,000 passengers per hour per direction at capacity — which would represent a meaningful reduction in vehicle and bus crossings over time. However, car and truck crossings are unaffected; the Causeway will continue to carry road traffic. Reduced passenger bus volumes may ease Causeway congestion somewhat during peak hours, but private vehicle crossings will remain unchanged.</p>

<h2>Plan Your JB Stay Around the RTS Link</h2>

<p>If you're arriving in JB before January 2027, the current crossing options remain: express buses via Larkin or Queen Street terminal, or Grab across the Causeway. Once the RTS Link opens, Bukit Chagar becomes a practical base for anyone commuting into Singapore regularly — and Taman Pelangi, 10 minutes away by Grab, will be well-positioned for that new commuter pattern.</p>

<p>Pelangi Capsule Hostel offers <a href="/rooms">capsule pods</a> from RM30/night on weekdays and RM35/night on weekends, with monthly rates from RM600. Whether you're visiting JB to scope out the neighbourhood ahead of the RTS Link opening, or you're a commuter looking for a flexible short-term base, <a href="/book">book a stay</a> and see the area for yourself.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://railwaynews.net/rts-link-project-johor-bahru-singapore-lrt-system.html" target="_blank" rel="noopener">Railway News — RTS Link Project: Johor Bahru–Singapore LRT System</a> (construction progress, January 2027 target, September 2026 systems testing)</li>
  <li><a href="https://mediaselangor.com/en/2026/05/355590" target="_blank" rel="noopener">Media Selangor — Singapore Parliament passes Cross-Border Railways Bill, May 2026</a> (co-location immigration arrangement)</li>
</ul>
`,
		},
		// 61 — scheduled: goes live 2026-09-13
		{
			Slug:          "jb-visa-run-cheapest-routes-thailand-brunei-indonesia",
			Title:         "JB Visa Run 2026: Cheapest Routes to Thailand, Brunei & Indonesia from Johor Bahru",
			Excerpt:       "Already in Malaysia and need to reset your Social Visit Pass? From Hat Yai buses to Batam ferries — every route out of JB, what each costs, and how long you get on re-entry.",
			Date:          "2026-09-13",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"visa-run", "johor-bahru", "thailand", "brunei", "indonesia", "budget-travel", "border-crossing", "malaysia-visa"},
			FeaturedImage: "/images/blog/jb-visa-run-cheapest-routes-thailand-brunei-indonesia.webp",
			ImageAlt:      "Larkin Sentral bus terminal in Johor Bahru, the departure point for cross-border buses to Thailand and beyond for visa runners",
			InLanguage:    "en",
			Content: `
<p>If you're staying in Johor Bahru on a Malaysia Social Visit Pass and the 30-day clock is ticking, you have more exit options than most people realise. You don't need to fly. From JB you can reach Thailand, Indonesia, Brunei, or even just pop into Singapore and back — each with different trade-offs in cost, travel time, and immigration scrutiny.</p>

<p>This guide covers every practical route out of JB, what each one costs, where to book, and how long you'll get on re-entry. It assumes you're already in Malaysia and need to reset your visitor stamp — not that you're planning a day trip from Singapore.</p>

<h2>Understanding the Malaysia Social Visit Pass</h2>

<p>Most nationalities entering Malaysia on a passport receive a Social Visit Pass on arrival — typically <strong>30 days</strong> for Western, Southeast Asian, and many other nationalities, though citizens of some countries (notably the UK, Australia, New Zealand, Canada, the US, and EU states) may receive 90 days. The pass is stamped into your passport at the immigration counter; there is no visa sticker involved for visa-exempt countries.</p>

<p>When the pass expires, you must leave Malaysia. Upon re-entering through any official point of entry, immigration stamps a fresh pass. There is no fixed statutory limit on how many times you can do this — but Malaysian immigration officers have broad discretionary power. If you re-enter repeatedly within a short window with no visible means of support, you may be questioned or denied entry. More on that in the FAQ below.</p>

<h2>Route 1: Hat Yai, Thailand — The Classic Budget Run</h2>

<p>Hat Yai in southern Thailand is the most popular visa run destination from JB for a simple reason: it's the cheapest international crossing you can make overland, and the round trip can be done in two days without flying.</p>

<h3>How to get there</h3>
<p>Head to <strong>Larkin Sentral Bus Terminal</strong> in JB — the main long-distance bus hub, about 5 km north of JB city centre (roughly RM10–15 by Grab). Operators including <strong>KPB Express</strong> and <strong>Transnasional</strong> run direct coaches to Hat Yai. The journey typically takes <strong>5–7 hours</strong> depending on border queues at Bukit Kayu Hitam/Sadao, though KPB's published schedule lists it at around 5 hours on a good day. Overnight departures are available, letting you sleep on the bus and arrive in Hat Yai in the morning.</p>

<h3>Cost</h3>
<ul>
  <li>Bus ticket JB → Hat Yai: approximately <strong>RM55–80 one way</strong> (book at the Larkin terminal counter or via Easybook.com)</li>
  <li>Return bus Hat Yai → JB: similar fare</li>
  <li>Budget for a night's accommodation in Hat Yai: from THB 300–600 (~RM40–80) in a guesthouse near the clock tower area</li>
  <li>Total round trip (transport only): roughly <strong>RM110–160</strong></li>
</ul>

<h3>Re-entry</h3>
<p>You exit Malaysia at the Bukit Kayu Hitam checkpoint, cross into Thailand, then re-enter Malaysia on the way back. Each Malaysia entry gets you a fresh 30-day (or 90-day, depending on your passport) Social Visit Pass stamp.</p>

<h3>Hassle level: Low–Medium</h3>
<p>The border crossing at Bukit Kayu Hitam can get congested on weekends and public holidays. Early morning crossings are fastest. You do not need a Thai visa if your country is on Thailand's visa-exemption list (most Western passports get 60 days visa-free; ASEAN passports get 30 days).</p>

<h2>Route 2: Batam or Bintan, Indonesia — The Fastest Crossing</h2>

<p>The Indonesian islands of Batam and Bintan in the Riau Islands are a quick ferry hop away and offer a legitimately different country exit — useful if you want to vary your travel history rather than doing the same Thailand border run every time.</p>

<h3>How to get there from JB</h3>
<p>The most reliable JB–Batam ferry route departs from <strong>Stulang Laut Ferry Terminal</strong> (near JB city centre) or from <strong>Pasir Gudang</strong>. Ferries also run from Tanah Merah Ferry Terminal in Singapore if you're transiting through Singapore first. Operators include <strong>Batam Fast</strong> and others. The crossing takes approximately <strong>1–1.5 hours</strong>.</p>

<h3>Cost</h3>
<ul>
  <li>Ferry JB → Batam one way: approximately <strong>RM100–120</strong> (prices vary by operator and season)</li>
  <li>Indonesian entry: Malaysian and Singaporean passport holders enter Batam/Riau Islands visa-free for 30 days. Most other nationalities can get a <strong>Visa on Arrival (VoA)</strong> at the Batam ferry terminal — IDR 500,000 (~RM150 / ~SGD 45) for a 30-day stay, or a cheaper 7-day VoA (IDR 250,000) exclusive to the Riau Islands zone</li>
  <li>Total round trip (transport only): roughly <strong>RM200–250</strong> depending on nationality and operator</li>
</ul>

<h3>Re-entry</h3>
<p>Exit Malaysia via Stulang Laut or Pasir Gudang port, enter Indonesia at Batam Centre ferry terminal, then return to Malaysia for a fresh stamp.</p>

<h3>Hassle level: Low</h3>
<p>Indonesian immigration at Batam is generally efficient for ferry arrivals. The VoA process is straightforward. This is a solid alternative to the Thailand run and a shorter total travel time if you keep the Indonesia stay brief.</p>

<h2>Route 3: Singapore — The Simplest Exit (Use With Caution)</h2>

<p>The most obvious route: cross the Causeway or Second Link from JB into Singapore, spend a few hours, and re-enter Malaysia. No bus to Hat Yai, no ferry to Batam — just a 20-minute Grab or bus ride across the border.</p>

<h3>How to get there</h3>
<p>Take the <strong>Causeway Link</strong> CW1 or CW2 bus from JB Sentral to Woodlands CIQ (~RM3.50 one way), or take a Grab across the Second Link (Tuas). The crossing itself takes 20–40 minutes depending on traffic.</p>

<h3>Cost</h3>
<ul>
  <li>Bus JB → Singapore one way: <strong>RM3.50–5</strong></li>
  <li>No Singapore visa required for most nationalities (30-day social visit)</li>
  <li>Budget for a few hours in Singapore: food, transport — SGD 20–40 is typical</li>
  <li>Total round trip: effectively <strong>RM10–15 in transport</strong>, plus whatever you spend in Singapore</li>
</ul>

<h3>Re-entry</h3>
<p>You exit Malaysia at Johor Bahru CIQ and re-enter the same day or next day. In theory, this resets your Malaysia Social Visit Pass. In practice, Malaysian immigration at JB CIQ is aware that Singapore crossings are commonly used as visa runs, and officers may question frequent re-entrants.</p>

<h3>Hassle level: Medium–High for frequent runners</h3>
<p>The Singapore route is fine for a one-off or occasional reset. If you've done it multiple times in recent months, expect more questions at the counter. Vary your routes if you're a long-term visa runner.</p>

<h2>Route 4: Brunei — The Long-Haul Circuit</h2>

<p>Brunei is a legitimate visa run destination and produces a convincingly "different" travel record, but it is not a quick trip. Overland from JB, you must cross through Sarawak (Kuching, Sibu, Miri) before reaching Brunei — a journey of roughly <strong>18–24 hours</strong> by bus if you do it in stages, or 12–14 hours if you take a direct overnight express and push through.</p>

<h3>How to get there</h3>
<p>From Larkin Sentral, operators run coaches to Kuching, Miri, and onward to Brunei. The full overland route: JB → Kuching (~10h) → Miri (~10h) → Brunei Border at Sungai Tujuh (~1h). Alternatively, fly JB to Kota Kinabalu or Miri (AirAsia from Senai International Airport) and bus to Brunei — this saves 10+ hours.</p>

<h3>Cost</h3>
<ul>
  <li>Full overland (bus stages): RM150–250 in bus fares total</li>
  <li>Fly + bus (e.g. JB → Miri, then bus to Brunei): RM180–350+ depending on flight availability</li>
  <li>Brunei entry: most nationalities enter visa-free for 14–30 days (check your passport's bilateral treaty with Brunei)</li>
  <li>Accommodation en route: budget BND 30–60/night (~RM100–200)</li>
</ul>

<h3>Re-entry</h3>
<p>Entering Malaysia from Brunei via Sarawak counts as a fresh entry into Malaysia, resetting your Social Visit Pass. Note that Sarawak and Sabah operate additional immigration controls — you'll receive a Sarawak entry stamp as well as the federal Malaysia stamp.</p>

<h3>Hassle level: High (travel time), Low (immigration)</h3>
<p>The Brunei route is rarely questioned by immigration officers since it represents a genuine multi-day trip. The downside is time and cost — this is not a weekend run. Most people save Brunei for when they want a proper side trip rather than a pure immigration reset.</p>

<h2>Route Comparison Table</h2>

<table>
  <thead>
    <tr>
      <th>Route</th>
      <th>Approx. Cost (Return)</th>
      <th>Total Travel Time</th>
      <th>Re-entry Stamp</th>
      <th>Hassle Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hat Yai, Thailand (bus)</td>
      <td>RM110–160</td>
      <td>10–14h round trip</td>
      <td>30 or 90 days (nationality-dependent)</td>
      <td>Low–Medium</td>
    </tr>
    <tr>
      <td>Batam, Indonesia (ferry)</td>
      <td>RM200–250 + VoA</td>
      <td>3–4h round trip</td>
      <td>30 or 90 days</td>
      <td>Low</td>
    </tr>
    <tr>
      <td>Singapore (Causeway)</td>
      <td>RM10–15 + spending</td>
      <td>2–4h round trip</td>
      <td>30 or 90 days</td>
      <td>Medium–High (if frequent)</td>
    </tr>
    <tr>
      <td>Brunei (overland/fly)</td>
      <td>RM300–600+</td>
      <td>2–4 days</td>
      <td>30 or 90 days</td>
      <td>Low (immigration) / High (effort)</td>
    </tr>
  </tbody>
</table>

<h2>Practical Tips Before You Go</h2>

<ul>
  <li><strong>Check your passport's remaining validity.</strong> Malaysia requires at least 6 months of passport validity to grant entry. If your passport expires within 6 months, renew before your visa run.</li>
  <li><strong>Carry proof of onward travel or accommodation.</strong> Malaysian immigration can ask for evidence that you're not intending to stay indefinitely. A hostel booking confirmation helps.</li>
  <li><strong>Avoid school holidays and Malaysian public holidays for border crossings.</strong> The Johor CIQ and Bukit Kayu Hitam checkpoints can be severely congested — add 2–3 hours to your estimates during peak periods.</li>
  <li><strong>Book buses in advance for Thailand.</strong> Larkin Sentral counter seats for Hat Yai sell out on Fridays. Use <a href="https://www.easybook.com" target="_blank" rel="noopener noreferrer">Easybook.com</a> or buy tickets a day before.</li>
  <li><strong>Bring cash in the destination currency.</strong> THB for Thailand, IDR for Indonesia, SGD for Singapore, BND for Brunei.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>How many times can I do a visa run in Malaysia?</h3>
<p>Malaysian law does not specify a maximum number of Social Visit Pass entries per year. However, Malaysian Immigration (Jabatan Imigresen Malaysia) officers have full discretionary authority to deny entry to any visitor they believe is misusing the tourist entry system to live in Malaysia indefinitely. In practice, doing a visa run more than 3–4 times in a 12-month period — especially using the same border crossing each time — increases your risk of being questioned or denied entry. If you need to stay in Malaysia long-term, explore the MM2H programme, a student visa, or a DE Rantau digital nomad pass instead.</p>

<h3>Will Malaysia immigration question me when I re-enter?</h3>
<p>Possibly, and you should be prepared for it. Common questions include: Where are you staying? What is your purpose of visit? Do you have enough money to support your stay? Have a clear, honest answer. A hostel booking printout, a bank statement showing sufficient funds, and a plausible reason for being in Malaysia (tourism, visiting friends, awaiting a longer-term application) all help. Do not lie to an immigration officer. If denied entry, you may be held and returned on the next available transport at your own cost.</p>

<h3>How long before my visa expires should I do the run?</h3>
<p>Do not wait until the last day. Aim to cross out of Malaysia with at least <strong>2–3 days remaining</strong> on your current pass. This gives you buffer if there's a queue delay, a bus breakdown, or unexpected documentation issues at the border. Overstaying a Malaysian Social Visit Pass — even by one day — results in a fine, and repeated overstays can result in a ban from re-entry.</p>

<h3>Does the Malaysia re-entry stamp always give me another 30 days?</h3>
<p>Not automatically. The duration of your new Social Visit Pass is at the discretion of the immigration officer, based on your nationality's bilateral agreement with Malaysia. Most Western passports get 30 days per entry (some nationalities receive 90 days). The officer can also grant fewer days if they are suspicious of your intentions. Check <a href="https://www.imi.gov.my" target="_blank" rel="noopener noreferrer">imi.gov.my</a> for the official list of nationalities and their permitted stay durations.</p>

<h2>Your JB Base Before and After the Run</h2>

<p>Whether you're catching a 6 AM bus to Hat Yai from Larkin or an early ferry to Batam, having a comfortable and affordable base in JB makes the logistics much easier. <a href="/rooms">Pelangi Capsule Hostel</a> is located in Taman Pelangi — a 10-minute Grab ride from Larkin Sentral and 15 minutes from Stulang Laut Ferry Terminal.</p>

<p>Capsule pods start from <strong>RM30/night on weekdays and RM35/night on weekends</strong>. You get a private sleeping pod with curtain, your own power socket and USB charging, air-conditioning, and free high-speed WiFi — everything you need to plan your crossing, rest up before an early departure, and settle back in after the run. Monthly stays from RM600/month are also available for longer-term visitors managing repeated visa resets. For dedicated visa-run logistics and transport options, see our <a href="/visa-run">visa-run page</a>.</p>

<p><a href="/book">Book your pod at Pelangi Capsule Hostel</a> — no OTA fees, best rate guaranteed direct.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.imi.gov.my/index.php/en/main-services/pass/visitor-pass/social-visit-pass/short-term-social-visit-pass/" target="_blank" rel="noopener noreferrer">Malaysian Immigration Department — Short-Term Social Visit Pass</a></li>
  <li><a href="https://www.easybook.com/ferry/booking/johor-to-batam" target="_blank" rel="noopener noreferrer">Easybook — Johor to Batam Ferry Tickets</a></li>
  <li><a href="https://discoverbatam.com/en/essentials" target="_blank" rel="noopener noreferrer">Discover Batam — Visa &amp; Entry Essentials</a></li>
  <li><a href="https://citizenremote.com/visas/malaysia-short-term-social-visit-pass/" target="_blank" rel="noopener noreferrer">Citizen Remote — Malaysia Short-Term Social Visit Pass Guide 2026</a></li>
</ul>
`,
		},
		// 62 — scheduled: goes live 2026-09-16
		{
			Slug:          "capsule-pod-vs-private-room-jb-which-to-book",
			Title:         "Capsule Pod vs Private Room in JB: Which Should You Book?",
			Excerpt:       "RM30 pods or RM80–300 private rooms — an honest breakdown of who should choose each, what the tradeoffs are, and when paying more actually makes sense.",
			Date:          "2026-09-16",
			Category:      "Accommodation",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"capsule-hostel", "private-room", "johor-bahru", "accommodation", "budget-travel", "backpacker", "solo-travel"},
			FeaturedImage: "/images/blog/capsule-pod-vs-private-room-jb-which-to-book.webp",
			ImageAlt:      "Interior of a capsule pod at Pelangi Capsule Hostel Taman Pelangi JB, showing privacy curtain, personal power socket and reading light",
			InLanguage:    "en",
			Content: `
<p>Johor Bahru has no shortage of places to sleep. Budget guesthouses, Airbnbs, 3-star hotels, and capsule hostels all compete for the same travellers crossing the Causeway. So when you're comparing capsule pods against private rooms, the decision usually comes down to one question: what are you actually paying for?</p>

<p>This guide lays out the honest tradeoffs. No spin — just the information you need to pick the right bed for your trip.</p>

<h2>The Price Gap Is Real</h2>

<p>Let's start with money, because that's usually what brings people to a capsule hostel in the first place.</p>

<p>At <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi, a capsule pod is <strong>RM30 for a first-time guest's first night</strong> and <strong>RM35 per night from the second night onward</strong>; repeat guests pay RM35 throughout. For a monthly stay, it starts from <strong>RM600</strong> — that includes WiFi and no deposit required.</p>

<p>Compare that to the private room market in JB:</p>

<ul>
  <li>Budget guesthouses: RM80–RM150/night</li>
  <li>3-star hotels: RM150–RM300/night</li>
  <li>Airbnb private rooms: RM60–RM120/night</li>
  <li>Monthly private room rentals: typically RM800–RM1,200/month</li>
</ul>

<p>A solo traveller spending three nights in JB saves roughly RM150–RM350 by choosing a pod over a budget private room. Over a month, that difference can fund two weeks of hawker meals. For longer stays the maths compounds quickly.</p>

<p>But cheaper accommodation only makes sense if it suits the way you travel. So let's be direct about what each option actually delivers.</p>

<h2>Side-by-Side Comparison</h2>

<table>
  <thead>
    <tr>
      <th>Factor</th>
      <th>Capsule Pod</th>
      <th>Private Room</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Price (per night)</strong></td>
      <td>RM30 (weekday) / RM35 (weekend)</td>
      <td>RM60–RM300 depending on type</td>
    </tr>
    <tr>
      <td><strong>Privacy</strong></td>
      <td>Privacy curtain, personal pod space — shared bathroom and common areas</td>
      <td>Full room to yourself; en-suite or shared bathroom depending on property</td>
    </tr>
    <tr>
      <td><strong>Storage</strong></td>
      <td>Personal locker inside pod</td>
      <td>Room wardrobe, under-bed storage — varies by property</td>
    </tr>
    <tr>
      <td><strong>Noise</strong></td>
      <td>Shared dorm environment — earplugs recommended for light sleepers</td>
      <td>Significantly quieter; you control your own space</td>
    </tr>
    <tr>
      <td><strong>Amenities in room</strong></td>
      <td>Power socket, USB charging, reading light, privacy curtain</td>
      <td>Full room amenities vary — TV, desk, sometimes kettle</td>
    </tr>
    <tr>
      <td><strong>Best for</strong></td>
      <td>Solo travellers, backpackers, visa runners, monthly workers</td>
      <td>Couples, business travellers, light sleepers, longer leisure stays</td>
    </tr>
  </tbody>
</table>

<h2>Who Should Book a Capsule Pod</h2>

<p>Capsule pods work well for a specific type of traveller. If you recognise yourself in this list, a pod is probably the smarter choice:</p>

<ul>
  <li><strong>Solo travellers and backpackers</strong> who treat the room as a place to sleep and store their bag — nothing more. You're out exploring JB during the day, and you need a clean, secure bed at night.</li>
  <li><strong>Budget travellers</strong> who'd rather spend RM100 on food and experiences than RM100 on a nicer pillow. JB's hawker scene — five minutes from Pelangi — is one of the best value food corridors in Malaysia. Put the savings there.</li>
  <li><strong>Visa runners</strong> doing a quick overnight from Singapore. You need a bed for one or two nights, not a suite. A RM30 pod with 24/7 self check-in at <a href="/amenities">Pelangi</a> is purpose-built for this.</li>
  <li><strong>Workers and interns on monthly stay</strong>. At RM600/month including WiFi, no deposit, and no utility bills, a monthly pod is materially cheaper than renting a private room (RM800–RM1,200/month in Taman Pelangi). That's a genuine financial advantage if you're working in JB for a few months.</li>
  <li><strong>People who are comfortable with shared bathrooms and a hostel vibe</strong>. There's a social dimension to hostel life that some travellers actively enjoy. If you don't mind sharing facilities and occasional noise, a pod gives you excellent value.</li>
</ul>

<h2>Who Should Book a Private Room</h2>

<p>Capsule pods are not for everyone, and it's better to know that before you arrive than after. A private room is the right call if:</p>

<ul>
  <li><strong>You're travelling as a couple.</strong> Pods are individual — there's no shared pod option. Couples wanting to sleep in the same space need a private room.</li>
  <li><strong>You have early business calls or need guaranteed quiet.</strong> A dorm environment is unpredictable. Even with a privacy curtain, you're exposed to other guests' schedules. If you need complete silence for a 7am video call, book a private room.</li>
  <li><strong>You're staying four nights or longer on a leisure trip.</strong> A few nights is manageable; a full week or more in a shared dorm requires a higher tolerance for noise and limited personal space. The incremental savings start to feel less worth it the longer you stay without the flexibility of a private room.</li>
  <li><strong>You are a genuinely light sleeper.</strong> Capsule pods have curtains and personal reading lights, but they don't eliminate ambient noise from a shared dorm. If you wake up at every sound, pay the premium for a private room. A bad night's sleep every night is not worth the saving.</li>
</ul>

<h2>What Pelangi's Pods Actually Offer</h2>

<p>Each pod at <a href="/rooms">Pelangi Capsule Hostel</a> (26A Jalan Perang, Taman Pelangi) includes:</p>

<ul>
  <li>Privacy curtain across the pod entrance</li>
  <li>Personal power socket and USB charging point</li>
  <li>Reading light inside the pod</li>
  <li>Personal locker for valuables and luggage</li>
  <li>Shared bathroom facilities</li>
  <li>Free WiFi throughout the hostel</li>
  <li>24/7 self check-in — no front desk, no curfew</li>
</ul>

<p>There is no kitchen at Pelangi. This is worth knowing upfront. However, hawker stalls and food courts are within a five-minute walk — JB's food scene means this is rarely a problem in practice, and eating out costs less than running a kitchen anyway.</p>

<h2>Frequently Asked Questions</h2>

<h3>Are capsule pods safe for solo female travellers?</h3>
<p>Capsule hostels are one of the more popular accommodation types for solo female travellers precisely because the pod format gives a defined personal space with a curtain, and lockers mean your belongings are secured. That said, comfort levels vary. If you prefer a female-only dorm or a private room for additional peace of mind, that's a completely valid call — prioritise what makes you feel comfortable on the road.</p>

<h3>Can couples share a capsule pod?</h3>
<p>No. Pods at Pelangi are designed for one person. The bunk-style layout and dimensions mean two people cannot share a pod. Couples who want to stay together should look at private room options in JB.</p>

<h3>Is there air conditioning in the pods?</h3>
<p>The hostel has air conditioning. Individual pod climate control is not listed among the pod specs — the AC operates at a shared facility level, which is standard for capsule hostels. If precise temperature control matters to you, confirm the current setup directly with the hostel before booking.</p>

<h3>Is a capsule pod worth it for a visa run from Singapore?</h3>
<p>For most visa runners, yes. You typically need one or two nights, a secure place to leave luggage, reliable WiFi, and easy access in and out — all of which a capsule pod covers at the lowest practical price point. The 24/7 self check-in at Pelangi is particularly useful if your bus or train arrives late.</p>

<h2>The Bottom Line</h2>

<p>A capsule pod is the right choice if you're a solo traveller, you're watching your budget, or you're doing a short practical stay in JB. The savings are real, the pod specs are solid for what they are, and the Taman Pelangi location puts you close to food and transport.</p>

<p>A private room is the right choice if you're travelling with a partner, you need guaranteed quiet, or you simply value personal space over the price difference. That's a legitimate preference — the extra RM50–RM150 a night is worth it for the right person.</p>

<p>Neither option is objectively better. It depends on how you travel.</p>

<p>If a capsule pod sounds like your kind of stay, <a href="/rooms">check the full pod specs here</a> or <a href="/book">view availability and book directly</a>.</p>
`,
		},
		// 63 — Chelsea v JDT, 9 Aug 2026. Same night as Singapore National Day.
		{
			Slug:          "chelsea-jdt-friendly-jb-where-to-stay-2026",
			LastModified:  "2026-07-30",
			ImageAlt:      "Aerial view of Sultan Ibrahim Stadium in Iskandar Puteri, Johor",
			Title:         "Chelsea vs JDT in Johor, 9 August 2026 — Where to Stay and How to Get There",
			Excerpt:       "Chelsea play Johor Darul Ta'zim at Sultan Ibrahim Stadium on Sunday 9 August 2026 — the same night as Singapore's National Day. Here is what that does to JB beds, and how to plan around it.",
			Date:          "2026-07-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "events", "football", "jdt", "budget-travel", "singapore"},
			FeaturedImage: "/images/blog/chelsea-jdt-friendly-jb-where-to-stay-2026.webp",
			InLanguage:    "en",
			Content: `
<h2>The Fixture</h2>

<p>Chelsea play Johor Darul Ta'zim at Sultan Ibrahim Stadium in Iskandar Puteri on <strong>Sunday 9 August 2026, kick-off 8:00 PM Malaysian time</strong>. The match was originally set for 11 August and was brought forward two days by mutual agreement between the clubs (source: Free Malaysia Today, 9 June 2026). It is the last stop of Chelsea's pre-season tour before the Premier League restarts on 22 August (source: Chelsea FC official site).</p>

<p>The stadium holds about 40,000. Tickets went on general sale through the club's appointed Malaysian ticketing partner — check the official channels rather than resale listings, and confirm the kick-off time on the day, because pre-season fixtures do move.</p>

<h2>Why Beds Will Be Tight That Weekend</h2>

<p>Two things land on the same date, and this is the part most people miss.</p>

<p><strong>9 August 2026 is also Singapore's National Day</strong>, and it falls on a Sunday — which means Monday 10 August is a public holiday in lieu for anyone whose rest day falls on the 9th (source: Singapore Ministry of Manpower public holidays list). So Singapore has a long weekend at exactly the moment 40,000 people are heading to a stadium 20 minutes from the border.</p>

<p>Translation: the Causeway will be busy, and JB accommodation across every price band will be booked earlier than usual. If you are coming for the match, or just crossing for a normal weekend and did not realise the match was on, book before the first week of August.</p>

<h2>Getting to the Stadium</h2>

<p>Sultan Ibrahim Stadium is in Iskandar Puteri, west of Johor Bahru city centre — not in the city itself. From central JB it is a Grab ride; budget more time and more money than usual on match day, because surge pricing and traffic around a full stadium are guaranteed.</p>

<p>Plan the return leg before you go. Leaving a 40,000-capacity stadium at roughly 10 PM with everyone else calling a Grab at the same time is the part of the evening that goes wrong. Either wait it out somewhere nearby, or agree a pickup point away from the stadium exits.</p>

<h2>Where to Stay</h2>

<p>Staying in the city centre rather than next to the stadium is usually the better trade: more food, more transport options, and a short ride back to the border the next morning.</p>

<p><a href="/rooms">Pelangi Capsule Hostel</a> is in Taman Pelangi, central JB. A pod is <strong>RM30 for a first-time guest's first night and RM35 per night after that</strong>; repeat guests pay RM35 throughout. Malaysia Tourism Tax of RM10 per room per night applies to foreign tourists only — Malaysians and permanent residents are exempt.</p>

<p>Check-in is from 2:00 PM, check-out by 12:00 PM, and self check-in runs 24 hours with no curfew — which matters when you are getting back from a night match. Luggage storage before check-in and after check-out is free.</p>

<h2>Crossing the Causeway on Match Weekend</h2>

<p>Standard JB advice applies, only more so:</p>

<ul>
  <li>Cross very early or very late. Mid-morning Saturday and late Sunday evening are the worst windows on a normal weekend, and this is not a normal weekend.</li>
  <li>Bus CW1 from Woodlands or bus 170 from Queen Street both reach JB Sentral; motorcycles and buses clear immigration faster than cars.</li>
  <li>From JB CIQ or JB Sentral to Taman Pelangi is a RM8–12 Grab ride.</li>
</ul>

<p>Our full route breakdown is in the <a href="/blog/singapore-to-jb-day-trip-causeway-guide">Causeway crossing guide</a>, and there is a separate piece on <a href="/blog/singapore-to-jb-transport-guide-avoid-scams-2026">avoiding transport scams on the JB side</a>.</p>

<h2>If You Are Not Here for the Football</h2>

<p>You still get the crowds. If your trip is flexible, shift it a week either side and JB goes back to normal pricing and normal queues. If it is not flexible, book the bed now and cross at an unfashionable hour.</p>

<p><a href="/book">Check availability and book directly</a> — no booking fee, no OTA commission. See what else is on in <a href="/events">our JB events calendar</a>.</p>
`,
		},
		// 64 — Johor Industrial Fair, 19–21 Aug 2026. Dates confirmed on the
		// organiser's own domain (johorexpo.com), not an aggregator.
		{
			Slug:          "johor-industrial-fair-2026-jb-budget-stay",
			LastModified:  "2026-07-30",
			ImageAlt:      "Austin International Convention Centre (AICC) in Johor Bahru, venue for trade fairs",
			Title:         "Johor Industrial Fair 2026 (19–21 August) — Budget Stay Near AICC for Exhibitors and Trade Visitors",
			Excerpt:       "Three days of manufacturing and automation trade at Austin International Convention Centre. If you are exhibiting or visiting on a per-diem, here is what a bed actually costs in JB and how to get to Mount Austin.",
			Date:          "2026-07-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "events", "trade-fair", "business-travel", "budget-travel", "mount-austin"},
			FeaturedImage: "/images/blog/johor-industrial-fair-2026-jb-budget-stay.webp",
			InLanguage:    "en",
			Content: `
<h2>The Details</h2>

<p>Johor Industrial Fair 2026 runs <strong>19–21 August 2026, 10:00 AM to 5:00 PM daily</strong>, at Austin International Convention Centre (AICC) in Mount Austin, Johor Bahru. The organiser is FBI Publications (M) Sdn Bhd (source: johorexpo.com, the organiser's own site, checked July 2026).</p>

<p>Two things to know before you turn up:</p>

<ul>
  <li><strong>Admission is free, but trade only.</strong> You register for a visitor badge online in advance, or on-site with a business card.</li>
  <li><strong>Under-16s are not admitted.</strong> This is not a family day out — it is a manufacturing and industrial automation trade show.</li>
</ul>

<h2>Why This Post Exists</h2>

<p>Most JB accommodation writing is aimed at tourists and Causeway day-trippers. Trade-show travel is a different problem: you are here on a company per-diem or your own margin, you need three nights near a convention centre, and you would rather not burn RM250 a night on a business hotel to sleep six hours between stand duty and dinner.</p>

<h2>Getting to AICC From Central JB</h2>

<p>AICC is in Mount Austin, east of the city centre — not walkable from anywhere you would normally stay as a visitor. From Taman Pelangi it is a Grab ride; budget 20–30 minutes in morning traffic, and order earlier than you think on the first morning of a fair.</p>

<p>If you are driving in from Senai Airport or from the Causeway, Mount Austin is straightforward on the Tebrau highway corridor.</p>

<h2>What a Bed Costs</h2>

<p>At <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi, a capsule pod is <strong>RM30 for a first-time guest's first night and RM35 per night after that</strong>; repeat guests pay RM35 throughout. Malaysia Tourism Tax of RM10 per room per night applies to foreign tourists only — Malaysians and permanent residents are exempt.</p>

<p>For a three-night fair, that is RM100 in room charges for a first-time Malaysian guest. Each pod is an enclosed space with a door that locks from the inside, personal air-conditioning, a reading light, USB charging and a power socket, plus a locker in the pod room. Free WiFi throughout, including inside the pods — adequate for email and video calls.</p>

<h2>The Practical Bits for Trade Travel</h2>

<ul>
  <li><strong>Check-in from 2:00 PM, check-out by 12:00 PM.</strong> Self check-in runs 24 hours with no curfew, so a late arrival the night before setup is fine.</li>
  <li><strong>Free luggage storage</strong> before check-in and after check-out — useful if your flight out is in the evening of the last day.</li>
  <li><strong>Food.</strong> Taman Pelangi is surrounded by kopitiam, mamak and restaurants; a local breakfast runs RM3–8. See the <a href="/blog/jalan-perang-food-guide-taman-pelangi">Jalan Perang food guide</a>.</li>
  <li><strong>Receipts.</strong> Ask at check-in if you need something for a claim.</li>
</ul>

<h2>One Caveat</h2>

<p>A capsule pod is a shared-bathroom, single-occupancy space. If you are hosting clients, or need to take confidential calls in your room, book a hotel — this is the wrong product for that. If you just need somewhere clean and secure to sleep between fair days, it does the job at a fraction of the price.</p>

<h2>Book</h2>

<p>Fair weeks tighten up JB's budget beds, so book ahead rather than walking in. <a href="/book">Check availability and book directly</a> — no booking fee, no OTA commission. Other dated JB events are in the <a href="/events">events calendar</a>.</p>
`,
		},
		// 65 — Merdeka + Malaysia Day 2026.
		{
			Slug:          "merdeka-malaysia-day-2026-jb-long-weekend-guide",
			LastModified:  "2026-07-30",
			ImageAlt:      "A Hari Merdeka parade in Malaysia marking National Day celebrations",
			Title:         "Merdeka and Malaysia Day 2026 in Johor Bahru — Dates, Crowds and Where to Stay",
			Excerpt:       "Merdeka Day falls on Monday 31 August 2026 and Malaysia Day on Wednesday 16 September. Here is what each date actually does to JB — and which one is the long weekend.",
			Date:          "2026-07-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "merdeka", "malaysia-day", "public-holiday", "budget-travel", "events"},
			FeaturedImage: "/images/blog/merdeka-malaysia-day-2026-jb-long-weekend-guide.webp",
			InLanguage:    "en",
			AlternateEN:   "merdeka-malaysia-day-2026-jb-long-weekend-guide",
			AlternateMS:   "cuti-merdeka-2026-johor-bahru-bajet",
			Content: `
<h2>The Two Dates</h2>

<ul>
  <li><strong>Merdeka Day — Monday 31 August 2026.</strong> A national public holiday in Malaysia, and it lands on a Monday, so most of the country gets a three-day weekend running Saturday 29 to Monday 31 August.</li>
  <li><strong>Malaysia Day — Wednesday 16 September 2026.</strong> Also a national public holiday, but midweek. No long weekend attached.</li>
</ul>

<p>(Dates checked against the Johor state holiday list on publicholidays.com.my, July 2026.)</p>

<h2>What That Means If You Are Coming From Singapore</h2>

<p>Worth being precise here, because a lot of travel content gets it wrong: <strong>neither date is a Singapore public holiday.</strong> Merdeka and Malaysia Day are Malaysian holidays. So the crowd on those dates is mostly domestic — Malaysians travelling within Malaysia, and Johoreans working in Singapore heading home.</p>

<p>The practical effect on a Singapore-based traveller is one-directional: the Causeway gets heavy in the JB-bound direction on the Friday and Saturday before Merdeka, and heavy back toward Singapore on Monday evening. JB itself is busier, malls are full, and accommodation books out earlier than a normal weekend.</p>

<p>If you want a quiet JB weekend, the weekend after Merdeka is a much better bet than the weekend of it.</p>

<h2>Note on Johor's Weekend</h2>

<p>Worth clearing up, because a lot of older travel content still gets this wrong: <strong>Johor's weekend is Saturday and Sunday</strong>, the same as the rest of Malaysia and the same as Singapore. The state ran a Friday–Saturday weekend from 2014 but reverted on 1 January 2025 (source: The Star, 7 October 2024, reporting the Regent of Johor's announcement). If you read somewhere that Johor offices close on Fridays, that guide is out of date.</p>

<h2>What Is Open</h2>

<p>On both holidays: banks and government offices close, malls and convenience stores open, most restaurants and hawker stalls open, though smaller kopitiam may start late. The Taman Pelangi night market runs every Tuesday from 4:30 PM regardless — 1 September is a Tuesday, so the market runs the day after Merdeka.</p>

<h2>Where to Stay</h2>

<p><a href="/rooms">Pelangi Capsule Hostel</a> is in Taman Pelangi, central JB: pods at <strong>RM30 for a first-time guest's first night, RM35 per night after that</strong>, repeat guests RM35 throughout. Malaysia Tourism Tax of RM10 per room per night applies to foreign tourists only.</p>

<p>Self check-in runs 24 hours with no curfew, so a late Causeway crossing is not a problem. Luggage storage before check-in and after check-out is free.</p>

<h2>Booking Advice</h2>

<p>For a Malaysian public-holiday weekend, book two to three weeks out. The pattern in JB is that the cheap beds go first and the mid-range hotels hold their rooms at raised rates — so waiting rarely wins.</p>

<p><a href="/book">Check availability</a>, or see what else is coming up in the <a href="/events">JB events calendar</a>. If you are travelling without a car, the <a href="/blog/getting-around-johor-bahru-no-car-guide">no-car transport guide</a> covers buses, Grab and what things cost.</p>
`,
		},
		// 65 — BM twin of the Merdeka post.
		{
			Slug:          "cuti-merdeka-2026-johor-bahru-bajet",
			LastModified:  "2026-07-30",
			ImageAlt:      "Perbarisan sambutan Hari Merdeka di Malaysia",
			Title:         "Cuti Merdeka 2026 di Johor Bahru: Panduan Bajet untuk Hujung Minggu Panjang",
			Excerpt:       "Hari Merdeka jatuh pada Isnin 31 Ogos 2026 — cuti hujung minggu tiga hari. Ini kadar penginapan sebenar di Taman Pelangi, keadaan lalu lintas Tambak Johor, dan apa yang buka.",
			Date:          "2026-07-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "merdeka", "cuti-umum", "bajet", "taman-pelangi", "bahasa-melayu"},
			FeaturedImage: "/images/blog/merdeka-malaysia-day-2026-jb-long-weekend-guide.webp",
			InLanguage:    "ms",
			AlternateEN:   "merdeka-malaysia-day-2026-jb-long-weekend-guide",
			AlternateMS:   "cuti-merdeka-2026-johor-bahru-bajet",
			Content: `
<h2>Tarikh Cuti</h2>

<ul>
  <li><strong>Hari Merdeka — Isnin, 31 Ogos 2026.</strong> Cuti umum seluruh negara. Kerana ia jatuh pada hari Isnin, kebanyakan negeri mendapat cuti hujung minggu tiga hari (Sabtu 29 hingga Isnin 31 Ogos).</li>
  <li><strong>Hari Malaysia — Rabu, 16 September 2026.</strong> Cuti umum juga, tetapi pada pertengahan minggu. Tiada hujung minggu panjang.</li>
</ul>

<p>(Tarikh disemak dengan senarai cuti umum negeri Johor di publicholidays.com.my, Julai 2026.)</p>

<h2>Minggu Kerja di Johor</h2>

<p>Perlu diperjelas, kerana banyak panduan lama masih salah tentang ini: <strong>hujung minggu di Johor ialah Sabtu dan Ahad</strong>, sama seperti negeri lain dan sama seperti Singapura. Johor mengamalkan hujung minggu Jumaat–Sabtu sejak 2014, tetapi kembali kepada Sabtu–Ahad mulai 1 Januari 2025 (sumber: The Star, 7 Oktober 2024, melaporkan pengumuman Tunku Mahkota Johor). Kalau anda terbaca yang pejabat di Johor tutup hari Jumaat, panduan itu sudah lapuk.</p>

<h2>Lalu Lintas Tambak Johor</h2>

<p>Hari Merdeka bukan cuti umum di Singapura. Jadi aliran utama adalah rakyat Malaysia yang bekerja di Singapura pulang ke Johor pada Jumaat dan Sabtu sebelum cuti, dan kembali ke Singapura pada petang Isnin.</p>

<p>Kalau anda melintas, elakkan waktu pagi Sabtu dan petang Isnin. Lintas sebelum 7 pagi atau selepas 9 malam. Bas CW1 dari Woodlands dan bas 170 dari Queen Street sampai ke JB Sentral; motosikal dan bas lebih cepat melepasi imigresen berbanding kereta.</p>

<h2>Apa yang Buka</h2>

<p>Bank dan pejabat kerajaan tutup. Pusat beli-belah, kedai serbaneka dan kebanyakan restoran serta gerai buka seperti biasa, cuma sesetengah kedai kopi kecil mungkin buka lewat.</p>

<p>Pasar malam Taman Pelangi beroperasi setiap Selasa mulai 4:30 petang — 1 September 2026 ialah hari Selasa, jadi pasar malam berjalan sehari selepas Merdeka.</p>

<h2>Kadar Penginapan</h2>

<p>Di <a href="/rooms">Pelangi Capsule Hostel</a>, Taman Pelangi:</p>

<ul>
  <li><strong>RM30</strong> — malam pertama untuk tetamu kali pertama</li>
  <li><strong>RM35</strong> — malam kedua dan seterusnya; tetamu berulang RM35 sepanjang penginapan</li>
  <li><strong>RM600 sebulan</strong> untuk penginapan bulanan</li>
  <li>Cukai Pelancongan RM10 sebilik semalam — pelancong asing sahaja; rakyat Malaysia dan pemastautin tetap dikecualikan</li>
</ul>

<p>Daftar masuk dari 2:00 petang, daftar keluar sebelum 12:00 tengah hari. Daftar masuk sendiri 24 jam, tiada waktu kunci pintu. Simpanan bagasi percuma sebelum daftar masuk dan selepas daftar keluar.</p>

<h2>Tempah Awal</h2>

<p>Untuk hujung minggu cuti umum, tempah dua hingga tiga minggu awal. Katil bajet di JB habis dahulu.</p>

<p><a href="/book">Semak ketersediaan dan tempah terus</a> — tiada yuran tempahan, tiada komisen OTA. Panduan lain dalam Bahasa Melayu: <a href="/blog/hotel-murah-johor-bahru-taman-pelangi-panduan">hotel murah di Taman Pelangi</a>.</p>
`,
		},
		// 66 — scheduled: goes live 2026-10-25, ahead of the Deepavali weekend.
		{
			Slug:          "deepavali-2026-jb-long-weekend-guide",
			LastModified:  "2026-10-25",
			ImageAlt:      "A decorative kolam laid out for Deepavali celebrations in Malaysia",
			Title:         "Deepavali 2026 in Johor Bahru — A Long Weekend on Both Sides of the Causeway",
			Excerpt:       "Deepavali falls on Sunday 8 November 2026, with Monday 9 November as the holiday in lieu in both Malaysia and Singapore. That makes it one of the few genuinely two-country long weekends of the year.",
			Date:          "2026-10-25",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "deepavali", "public-holiday", "events", "budget-travel", "singapore"},
			FeaturedImage: "/images/blog/deepavali-2026-jb-long-weekend-guide.webp",
			InLanguage:    "en",
			Content: `
<h2>The Dates</h2>

<p><strong>Deepavali 2026 falls on Sunday 8 November.</strong> In Malaysia, Monday 9 November is the public holiday observance (source: Johor state holiday list, publicholidays.com.my). In Singapore, Deepavali is also a public holiday on 8 November, with Monday 9 November a holiday in lieu for anyone whose rest day falls on the Sunday (source: Singapore Ministry of Manpower).</p>

<p>That combination is rarer than it sounds. Most Malaysian public holidays are not Singapore public holidays and vice versa. Deepavali 2026 is a long weekend on <em>both</em> sides of the border at once — which is why it behaves differently from a Merdeka weekend.</p>

<h2>What That Does to JB</h2>

<p>Demand comes from two directions simultaneously: Singaporeans crossing over for a three-day break, and Malaysians travelling home or travelling domestically. Expect the Causeway to be heavy in both directions, expect malls to be full, and expect budget accommodation to book out well before the week itself.</p>

<p>If your dates are flexible, the following weekend is dramatically calmer.</p>

<h2>Crossing</h2>

<ul>
  <li>Cross before 7 AM or after 9 PM. The Friday evening and Saturday morning windows are the worst.</li>
  <li>Bus CW1 from Woodlands or bus 170 from Queen Street to JB Sentral. Buses and motorcycles clear immigration faster than cars.</li>
  <li>JB CIQ or JB Sentral to Taman Pelangi is a RM8–12 Grab ride.</li>
</ul>

<h2>What Is Open</h2>

<p>Banks and government offices close on the holiday. Malls, convenience stores and most restaurants stay open. Some family-run Indian restaurants close for the day itself — if there is a specific place you want to eat at, message them first rather than turning up.</p>

<p>The Taman Pelangi night market runs every Tuesday from 4:30 PM, so 10 November — the day after the holiday — is a market night.</p>

<h2>Where to Stay</h2>

<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi: pods at <strong>RM30 for a first-time guest's first night, RM35 per night after that</strong>, repeat guests RM35 throughout. Tourism Tax of RM10 per room per night applies to foreign tourists only — Malaysians and permanent residents are exempt.</p>

<p>Self check-in runs 24 hours, no curfew, and luggage storage before check-in and after check-out is free. Central Taman Pelangi means food is walkable and Grab rides are short.</p>

<h2>Book Early</h2>

<p>For a two-country long weekend, three to four weeks ahead is not too early. <a href="/book">Check availability and book directly</a> — no booking fee, no OTA commission.</p>

<p>More dates in the <a href="/events">JB events calendar</a>. If you are new to crossing, start with the <a href="/blog/singapore-to-jb-day-trip-causeway-guide">Causeway guide</a>.</p>
`,
		},
		// 67 — scheduled: goes live 2026-11-20, ahead of CNY 2027 booking season.
		{
			Slug:          "cny-2027-jb-long-weekend-singapore-guide",
			LastModified:  "2026-11-20",
			ImageAlt:      "Red lanterns strung up for Chinese New Year celebrations in Malaysia",
			Title:         "Chinese New Year 2027 in Johor Bahru — Dates, Causeway Crowds and Booking Timeline",
			Excerpt:       "CNY 2027 falls on Saturday 6 and Sunday 7 February, with Monday 8 February as the holiday in lieu in both Malaysia and Singapore. JB's single busiest weekend of the year — here is how to plan it.",
			Date:          "2026-11-20",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "chinese-new-year", "public-holiday", "events", "budget-travel", "singapore"},
			FeaturedImage: "/images/blog/cny-2027-jb-long-weekend-singapore-guide.webp",
			InLanguage:    "en",
			Content: `
<h2>The Dates</h2>

<p><strong>Chinese New Year 2027 falls on Saturday 6 and Sunday 7 February.</strong> Monday 8 February is the holiday in lieu — in Malaysia per the Johor state holiday list (publicholidays.com.my), and in Singapore for anyone whose rest day falls on the Sunday (Singapore Ministry of Manpower).</p>

<p>So: a three-day weekend on both sides of the Causeway, landing on the one festival where cross-border family travel peaks. This is the heaviest travel window JB sees all year.</p>

<h2>Why It Is Different From Every Other Long Weekend</h2>

<p>A normal long weekend brings tourists. CNY brings tourists <em>and</em> the annual homecoming — Johoreans working in Singapore returning to family, Malaysians travelling up and down the peninsula, and Singaporean families crossing for reunion dinners. The Causeway does not have a quiet hour on CNY eve.</p>

<p>Reunion dinner is the night before the first day, so the crush is on Friday 5 February 2027.</p>

<h2>Booking Timeline</h2>

<p>For CNY, the useful rule in JB is: budget beds go first, and they go early. Six to eight weeks out is normal for this weekend; four weeks out you are choosing from what is left. If your dates are fixed by family, book as soon as you know them.</p>

<p>If your dates are flexible, note that the week <em>after</em> CNY is one of the quietest of the year in JB — hotels discount, queues vanish, and most things reopen by the third day.</p>

<h2>Crossing</h2>

<ul>
  <li>Avoid Friday 5 February entirely if you can. If you cannot, cross before dawn.</li>
  <li>Bus CW1 from Woodlands or bus 170 from Queen Street to JB Sentral; buses and motorcycles clear immigration faster than cars.</li>
  <li>JB CIQ or JB Sentral to Taman Pelangi is a RM8–12 Grab ride, longer than usual on CNY eve.</li>
</ul>

<h2>What Is Open</h2>

<p>Many Chinese-run businesses in JB close for the first two or three days of CNY, including a large share of the hawker stalls and kopitiam. Malls, convenience stores, mamak stalls and Malay and Indian eateries stay open. Plan meals accordingly — this catches out visitors expecting the usual food scene.</p>

<p>The Taman Pelangi night market runs Tuesdays from 4:30 PM; 9 February 2027 is a Tuesday, but expect a reduced turnout that week.</p>

<h2>Where to Stay</h2>

<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi: pods at <strong>RM30 for a first-time guest's first night, RM35 per night after that</strong>, repeat guests RM35 throughout. Tourism Tax of RM10 per room per night applies to foreign tourists only.</p>

<p>Self check-in runs 24 hours with no curfew — useful when the crossing takes three hours longer than planned. Luggage storage before check-in and after check-out is free.</p>

<p><a href="/book">Check availability and book directly</a>. Other dated JB events are listed in the <a href="/events">events calendar</a>.</p>
`,
		},
		// 68 — EN sibling of hotel-murah-johor-bahru-taman-pelangi-panduan
		{
			Slug:          "budget-accommodation-johor-bahru-taman-pelangi-guide",
			LastModified:  "2026-07-30",
			ImageAlt:      "Worker at a desk in a modern capsule hostel common area in Johor Bahru, laptop open, capsule pods in background",
			Title:         "Budget Accommodation in Johor Bahru: A Traveller's Guide to Capsule Pods in Taman Pelangi (2026)",
			Excerpt:       "Looking for cheap accommodation in Johor Bahru near JB Sentral? Real rates, location details, check-in process and everything you need to know about Pelangi Capsule Hostel in Taman Pelangi.",
			Date:          "2026-07-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "budget-accommodation", "capsule-hostel", "taman-pelangi", "cheap-stay", "jb-hostel"},
			FeaturedImage: "/images/blog/monthly-stay-capsule-hostel-jb-workers-interns-2026.webp",
			InLanguage:    "en",
			AlternateEN:   "budget-accommodation-johor-bahru-taman-pelangi-guide",
			AlternateMS:   "hotel-murah-johor-bahru-taman-pelangi-panduan",
			Content: `
<h2>What Does Budget Accommodation in Johor Bahru Actually Cost?</h2>

<p>Most searches for "cheap hotel Johor Bahru" return prices that swing wildly by date. So let's start with our own numbers, stated plainly:</p>

<ul>
  <li><strong>RM30</strong> — first night only, for first-time guests</li>
  <li><strong>RM35</strong> — second night onwards; returning guests pay RM35 throughout</li>
  <li><strong>RM600 per month</strong> — monthly rate, WiFi included, no deposit</li>
  <li><strong>RM10 Tourism Tax</strong> per room per night — applies to foreign tourists only. Malaysian citizens and permanent residents are exempt</li>
</ul>

<p>Those are the rates for a capsule pod at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi. Booking direct through our website carries no booking fee and no OTA commission.</p>

<h2>Capsule Pod — Not an Open Dorm Bed</h2>

<p>Many travellers assume "hostel" means a bunk in an open room. A capsule pod is different. Each pod is an enclosed sleeping space with a sliding door that locks from the inside.</p>

<p>Inside every pod you get a mattress, personal fan and air-conditioning controls, an adjustable LED reading light, USB charging ports, and a power socket. Personal lockers are provided in the pod room. Fresh towels are included; soap and shampoo are available in the shared bathrooms.</p>

<p>We have 30 pods in total — 24 Lower Deck (ground-level, no ladder) and 6 Upper Deck (slightly quieter). Full details are on the <a href="/rooms">rooms page</a>.</p>

<h2>Location: Taman Pelangi — 15 Minutes from Woodlands CIQ</h2>

<p>Our address is 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru.</p>

<ul>
  <li><strong>From Woodlands CIQ (Singapore):</strong> 15 minutes by car</li>
  <li><strong>From JB CIQ / JB Sentral:</strong> Grab fare approximately RM8–12</li>
  <li><strong>By public bus:</strong> CW1 from Woodlands or bus 170 from Queen Street to JB Sentral, then Grab</li>
  <li><strong>On foot from the hostel:</strong> coffee shops, mamak stalls and restaurants throughout Taman Pelangi</li>
</ul>

<p>The Taman Pelangi night market runs every Tuesday from 4:30 PM — one of the most popular pasar malam in JB, and it's right in the neighbourhood. Full directions are on the <a href="/getting-here">getting here page</a>.</p>

<h2>Daily Stay vs Monthly Stay</h2>

<p>If you need <strong>short-stay accommodation in JB</strong> for one or two nights — a business trip, a Causeway transit, or a stopover before Singapore — a daily pod is the cheapest way to get a lockable private space without paying hotel prices.</p>

<p>If you need somewhere longer-term, our monthly rate starts at RM600 per month. We also have separate monthly rooms from RM500 per month (RM250 deposit) above the Taman Pelangi 7-Eleven, managed by the same team.</p>

<h2>Check-In and Check-Out Times</h2>

<p>Check-in from 2:00 PM, check-out by 12:00 PM noon. Self check-in operates 24 hours, so you can arrive any time after 2:00 PM without waiting at a counter — useful if you're crossing the Causeway late at night. There is no curfew.</p>

<p>Luggage storage before check-in and after check-out is free. Step-by-step check-in instructions are on the <a href="/check-in">check-in guide page</a>.</p>

<h2>Security</h2>

<p>The building has 24-hour CCTV, a keypad-locked entrance, and personal lockers inside the pod room. Each pod also has a door that locks from the inside.</p>

<h2>FAQ</h2>

<h3>Is there air-conditioning?</h3>
<p>Yes. Every pod has individual climate controls — both a fan and air-conditioning.</p>

<h3>What payment methods do you accept?</h3>
<p>Cash (Malaysian Ringgit), DuitNow QR (all major local banks and e-wallets including Touch 'n Go, Boost and GrabPay), and credit cards.</p>

<h3>Is breakfast included?</h3>
<p>Breakfast is not included in the room rate, but there is a shared kitchen on-site. Nasi lemak or roti canai from nearby stalls costs around RM3–8.</p>

<h3>Do Malaysians pay the Tourism Tax?</h3>
<p>No. The RM10 per room per night Tourism Tax applies to foreign tourists only. Malaysian citizens and permanent residents are exempt.</p>

<h3>Can two people share one pod?</h3>
<p>No. Each pod is designed for one person only.</p>

<h2>Ready to Book?</h2>

<p>Browse pod types on the <a href="/rooms">rooms page</a>, or go straight to <a href="/book">check availability and book</a>. Weekends and school holidays fill up fast — book early to secure a pod.</p>
`,
		},
		// 68 — first Bahasa Melayu post on the site (InLanguage must be set
		// explicitly; blogContainsCJK only auto-detects Chinese).
		{
			Slug:          "hotel-murah-johor-bahru-taman-pelangi-panduan",
			LastModified:  "2026-07-30",
			ImageAlt:      "Worker at a desk in a modern capsule hostel common area in Johor Bahru, laptop open, capsule pods in background",
			Title:         "Hotel Murah Johor Bahru: Panduan Bilik Sewa Harian di Taman Pelangi (2026)",
			Excerpt:       "Cari hotel murah di Johor Bahru atau bilik sewa harian dekat JB Sentral? Ini kadar sebenar, lokasi, cara sampai dan apa yang anda dapat di Pelangi Capsule Hostel, Taman Pelangi.",
			Date:          "2026-07-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "hotel-murah", "bilik-sewa-harian", "taman-pelangi", "bajet", "bahasa-melayu"},
			FeaturedImage: "/images/blog/monthly-stay-capsule-hostel-jb-workers-interns-2026.webp",
			InLanguage:    "ms",
			AlternateEN:   "budget-accommodation-johor-bahru-taman-pelangi-guide",
			AlternateMS:   "hotel-murah-johor-bahru-taman-pelangi-panduan",
			Content: `
<h2>Berapa Sebenarnya Kos Hotel Murah di Johor Bahru?</h2>

<p>Kebanyakan carian "hotel murah Johor Bahru" berakhir dengan senarai harga yang berubah-ubah mengikut tarikh. Jadi kami mulakan dengan nombor kami sendiri, terus terang:</p>

<ul>
  <li><strong>RM30</strong> — malam pertama, untuk tetamu kali pertama sahaja</li>
  <li><strong>RM35</strong> — malam kedua dan seterusnya; tetamu berulang bayar RM35 sepanjang penginapan</li>
  <li><strong>RM600 sebulan</strong> — kadar penginapan bulanan, WiFi termasuk, tiada deposit</li>
  <li><strong>Cukai Pelancongan RM10</strong> sebilik semalam — dikenakan kepada pelancong asing sahaja. Rakyat Malaysia dan pemastautin tetap dikecualikan</li>
</ul>

<p>Itu kadar untuk satu pod kapsul di <a href="/rooms">Pelangi Capsule Hostel</a>, Taman Pelangi. Tempahan terus melalui laman web kami tiada yuran tempahan dan tiada komisen OTA.</p>

<h2>Pod Kapsul, Bukan Katil Dorm</h2>

<p>Ramai yang menyangka "hostel" bermaksud katil bertingkat dalam bilik terbuka. Pod kapsul berbeza: setiap pod adalah ruang tertutup dengan pintu gelangsar yang boleh dikunci dari dalam.</p>

<p>Dalam setiap pod anda dapat tilam, kipas dan penghawa dingin peribadi, lampu bacaan LED yang boleh dilaraskan, port pengecas USB dan soket kuasa. Loker peribadi disediakan di dalam bilik pod. Tuala bersih diberi kepada setiap tetamu, manakala sabun mandi dan syampu disediakan di bilik air kongsi.</p>

<p>Kami ada 30 pod kesemuanya — 24 Lower Deck (aras bawah, tiada tangga) dan 6 Upper Deck (aras atas, lebih sunyi). Butiran penuh ada di <a href="/ms/amenities">halaman kemudahan</a>.</p>

<h2>Lokasi: Taman Pelangi, Dekat JB Sentral dan CIQ</h2>

<p>Alamat kami ialah 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru.</p>

<ul>
  <li><strong>Dari Woodlands CIQ (Singapura):</strong> 15 minit dengan kereta</li>
  <li><strong>Dari JB CIQ / JB Sentral:</strong> tambang Grab sekitar RM8–12</li>
  <li><strong>Pengangkutan awam:</strong> bas CW1 dari Woodlands atau bas 170 dari Queen Street ke JB Sentral, kemudian Grab</li>
  <li><strong>Berjalan kaki:</strong> kedai kopi, gerai mamak dan restoran di sekitar Taman Pelangi</li>
</ul>

<p>Pasar malam Taman Pelangi beroperasi setiap hari Selasa mulai 4:30 petang — antara pasar malam paling terkenal di JB, dan ia betul-betul di kawasan ini. Arah penuh ada di <a href="/getting-here">halaman panduan perjalanan</a>.</p>

<h2>Bilik Sewa Harian vs Penginapan Bulanan</h2>

<p>Kalau anda cari <strong>bilik sewa harian JB</strong> untuk satu atau dua malam — urusan kerja, transit, atau singgah sebelum ke Singapura — pod harian adalah pilihan paling murah untuk mendapatkan ruang peribadi berkunci.</p>

<p>Kalau anda perlu tempat jangka panjang, kadar bulanan bermula RM600 sebulan. Kami juga ada bilik sewa bulanan berasingan dari RM500 sebulan (deposit rata RM250) di atas 7-Eleven Taman Pelangi, diuruskan oleh pasukan yang sama.</p>

<h2>Waktu Daftar Masuk dan Keluar</h2>

<p>Daftar masuk bermula 2:00 petang, daftar keluar sebelum 12:00 tengah hari. Daftar masuk sendiri (self check-in) beroperasi 24 jam, jadi anda boleh tiba bila-bila masa selepas 2:00 petang tanpa menunggu kaunter — berguna kalau anda lintas Tambak Johor lewat malam. Tiada waktu kunci pintu (curfew).</p>

<p>Simpanan bagasi sebelum daftar masuk dan selepas daftar keluar adalah percuma. Langkah-langkah daftar masuk ada di <a href="/ms/check-in">panduan daftar masuk</a>.</p>

<h2>Keselamatan</h2>

<p>Bangunan ini dilengkapi CCTV 24 jam, pintu masuk berkunci pad nombor, dan loker peribadi di dalam bilik pod. Setiap pod pula ada pintu yang berkunci dari dalam.</p>

<h2>Soalan Lazim</h2>

<h3>Ada penghawa dingin?</h3>
<p>Ya. Setiap pod ada kawalan suhu peribadi — kipas dan penghawa dingin.</p>

<h3>Boleh bayar dengan DuitNow QR?</h3>
<p>Boleh. Kami terima tunai (Ringgit Malaysia), DuitNow QR (semua bank tempatan dan e-dompet utama termasuk Touch 'n Go, Boost dan GrabPay), serta kad kredit.</p>

<h3>Ada sarapan?</h3>
<p>Sarapan tidak termasuk dalam kadar bilik, tetapi ada dapur kongsi yang lengkap. Sarapan nasi lemak atau roti canai di gerai berdekatan sekitar RM3–8.</p>

<h3>Rakyat Malaysia kena bayar Cukai Pelancongan?</h3>
<p>Tidak. Cukai Pelancongan RM10 sebilik semalam dikenakan kepada pelancong asing sahaja. Rakyat Malaysia dan pemastautin tetap dikecualikan.</p>

<h3>Boleh dua orang kongsi satu pod?</h3>
<p>Tidak boleh. Setiap pod direka untuk seorang sahaja.</p>

<h2>Nak Tempah?</h2>

<p>Lihat jenis pod di <a href="/rooms">halaman bilik</a>, atau terus <a href="/book">semak ketersediaan dan tempah</a>. Hujung minggu dan musim cuti sekolah cepat penuh — tempah awal.</p>
`,
		},
		// --- BUS ROUTES (EN) ---
		{
			Slug:          "jb-public-bus-guide-budget-backpackers",
			Date:          "2026-08-01",
			LastModified:  "2026-08-01",
			Title:         "JB Public Bus Guide for Budget Backpackers (2026)",
			Excerpt:       "Skip the Grab. Johor Bahru's public buses are cheap, air-conditioned, and easy once you know the routes. Complete guide for backpackers — CIQ to Taman Pelangi and beyond.",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "bus", "backpacker", "budget-travel", "public-transport", "taman-pelangi"},
			FeaturedImage: "/images/blog/jb-bus-guide.webp",
			ImageAlt:      "A Causeway Link CT1 bus at JB Sentral bus terminal heading toward Taman Pelangi",
			AlternateEN:   "jb-public-bus-guide-budget-backpackers",
			AlternateZH:   "xinshan-gonggong-qiche-zhinan-beibaoke",
			AlternateMS:   "panduan-bas-awam-jb-pelancong-bajet",
			Content: `
<h2>Why Take the Bus in JB?</h2>
<p>Grab is convenient, but for backpackers watching every ringgit, Johor Bahru's public bus network is a revelation. A single ride costs RM1.20–2.00, covers most tourist routes, and the buses are air-conditioned. Once you understand three key routes, you can navigate the city without ever opening a ride-hailing app.</p>

<p>This guide covers the routes most useful for guests staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi — particularly how to arrive from JB CIQ/JB Sentral and how to reach nearby attractions by bus.</p>

<h2>First Stop: JB Sentral Bus Terminal</h2>
<p>Almost every public bus journey in JB starts at <strong>JB Sentral</strong>, the city's main transport interchange connected to the KTM train station and City Square Mall. If you're arriving from Singapore via the Causeway, good news: after clearing immigration at <strong>JB CIQ</strong>, the JB Sentral bus terminal is a 5-minute indoor walk through an air-conditioned corridor. No taxi needed just to get to the bus station.</p>

<p>At JB Sentral, head to the <strong>ground floor bus terminal</strong>. Buses are numbered and displayed on digital boards. You can pay with cash (exact change helpful) or a <strong>Touch 'n Go eWallet</strong> card — if you plan to take more than two bus trips, a Touch 'n Go card pays for itself.</p>

<h2>Route 1: CT1 — The Backpacker's Best Friend to Taman Pelangi</h2>
<p>The <strong>Causeway Link CT1</strong> (JB Sentral → Bayu Puteri) is the only public bus that goes directly into the Taman Pelangi residential area. For guests of Pelangi Capsule Hostel, this is your route:</p>
<ol>
  <li>Board CT1 at JB Sentral, direction <strong>Bayu Puteri</strong></li>
  <li>Alight at <strong>"Opp Pelangi Leisure Mall"</strong> stop on Jalan Serampang</li>
  <li>Walk approximately <strong>2 minutes (160m)</strong> to Pelangi Capsule Hostel at 26A Jalan Perang</li>
</ol>
<p><strong>Fare:</strong> ~RM2 &nbsp;|&nbsp; <strong>Frequency:</strong> every 80 minutes<br>
<strong>Departures from JB Sentral:</strong> 07:00, 08:20, 09:40, 11:00, 12:20, 15:50, 17:10, 18:30, 19:50<br>
⚠️ No CT1 service 12:20–15:50 (plan around this gap)</p>

<h2>Route 2: J15 — Most Frequent to the Taman Pelangi Area</h2>
<p><strong>BAS.MY J15</strong> runs from JB Sentral every 20 minutes (05:00 to midnight) — the highest frequency of any route serving this area. However, it stops on <strong>Jalan Tebrau</strong> (the main highway), not inside the residential estate. The "Opp Plaza Pelangi" stop is about 1.5km from Pelangi Leisure Mall.</p>
<ul>
  <li>Board J15 at JB Sentral (Bus Bay 5), direction Mid Valley Southkey</li>
  <li>Alight at <strong>"Opp Plaza Pelangi"</strong> on Jalan Tebrau — cross the overhead bridge</li>
  <li>Walk 15–20 minutes through Taman Pelangi to the hostel, OR book a short Grab (~RM5–8, 5 min)</li>
</ul>
<p><strong>Fare:</strong> ~RM1.20 &nbsp;|&nbsp; <strong>Frequency:</strong> every 20 min &nbsp;|&nbsp; Best option when CT1 is not running</p>
<p>Routes <strong>J11, J20, J22</strong> also stop at "Opp Plaza Pelangi" and work as J15 alternatives when one is delayed.</p>

<h2>Route 3: Larkin Sentral for Long-Distance Buses</h2>
<p>Arriving from Kuala Lumpur, Penang, or other Malaysian cities? Your express bus will drop you at <strong>Larkin Sentral</strong>, JB's long-distance bus terminal, about 5km north of JB Sentral. From Larkin, take <strong>bus T13</strong> to JB Sentral (fare ~RM1.40), then connect to CT1 or J15 for Taman Pelangi. Total cost: under RM4. Grab direct from Larkin to Pelangi Capsule runs ~RM10–15.</p>

<h2>Getting Around JB by Bus: Nearby Destinations</h2>
<table>
  <thead><tr><th>Destination</th><th>Bus</th><th>Alight At</th><th>Fare</th></tr></thead>
  <tbody>
    <tr><td>JB Sentral / City Square</td><td>CT1 or J15 (reverse)</td><td>JB Sentral</td><td>RM1.20–2</td></tr>
    <tr><td>Komtar JBCC / Jalan Wong Ah Fook</td><td>J15 inbound</td><td>Jalan Wong Ah Fook</td><td>RM1.20</td></tr>
    <tr><td>Mid Valley Southkey</td><td>J15</td><td>Mid Valley Southkey</td><td>RM1.20</td></tr>
    <tr><td>KSL City Mall</td><td>J11 or J22</td><td>KSL City</td><td>RM1.40</td></tr>
    <tr><td>Larkin Sentral (intercity buses)</td><td>T13</td><td>Larkin Sentral</td><td>RM1.40</td></tr>
  </tbody>
</table>

<h2>Essential Tips for First-Time Riders</h2>
<ul>
  <li><strong>Touch 'n Go eWallet:</strong> Buy a TnG card at convenience stores or 7-Eleven. Tap-in, tap-out. Saves fumbling for coins.</li>
  <li><strong>No change given:</strong> Bring small notes or exact coins if paying cash. Drivers don't carry change.</li>
  <li><strong>Google Maps works:</strong> Enter your destination and select "Transit" — JB buses are mapped and include departure times. Moovit app also shows live arrivals.</li>
  <li><strong>Night travel:</strong> J15 runs until midnight. CT1's last bus from JB Sentral is 19:50 — after that, take J15 + short Grab.</li>
  <li><strong>Stay hydrated:</strong> JB heat is intense between buses. Carry water. The wait for a CT1 (every 80 min) in open sun is rough — time your arrival using Moovit.</li>
</ul>

<h2>Budget Breakdown: Bus vs Grab</h2>
<ul>
  <li><strong>CIQ → Pelangi Capsule by CT1 bus:</strong> RM2 per person</li>
  <li><strong>CIQ → Pelangi Capsule by Grab:</strong> RM10–15 per trip</li>
  <li><strong>Daily bus pass (all-day unlimited, if available):</strong> check Causeway Link app</li>
  <li><strong>Saving per trip:</strong> RM8–13 — enough for a full hawker meal</li>
</ul>

<p>For a 3-day trip with two bus rides daily, taking the bus saves you roughly RM50–75 compared to Grab — enough to cover two extra nights at <a href="/rooms">Pelangi Capsule</a>. The trade-off is waiting. If you're on a schedule, Grab wins. If you have time and a Touch 'n Go card, the bus is the smarter move.</p>

<p>Questions about getting here? Our AI assistant Rainbow on the <a href="/">website chat</a> can answer bus timing and directions 24/7.</p>
`,
		},
		// --- BUS ROUTES (BM) ---
		{
			Slug:          "panduan-bas-awam-jb-pelancong-bajet",
			Date:          "2026-08-01",
			LastModified:  "2026-08-01",
			InLanguage:    "ms",
			Title:         "Panduan Bas Awam JB untuk Pelancong Bajet 2026",
			Excerpt:       "Tak perlu Grab setiap masa. Bas awam Johor Bahru murah, berhawa dingin dan mudah bila anda tahu laluan yang betul. Panduan lengkap dari CIQ ke Taman Pelangi.",
			Category:      "Tips Perjalanan",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "bas", "pelancong-bajet", "pengangkutan-awam", "taman-pelangi"},
			FeaturedImage: "/images/blog/jb-bus-guide.webp",
			ImageAlt:      "Bas Causeway Link CT1 di terminal JB Sentral menuju Taman Pelangi",
			AlternateEN:   "jb-public-bus-guide-budget-backpackers",
			AlternateZH:   "xinshan-gonggong-qiche-zhinan-beibaoke",
			AlternateMS:   "panduan-bas-awam-jb-pelancong-bajet",
			Content: `
<h2>Kenapa Naik Bas di JB?</h2>
<p>Grab memang senang, tapi bagi pelancong yang jimat belanja, sistem bas awam Johor Bahru adalah pilihan bijak. Setiap perjalanan hanya RM1.20–2.00, bas berhawa dingin, dan mudah bila anda tahu tiga laluan utama. Anda boleh explore bandar tanpa buka aplikasi ride-hailing langsung.</p>

<p>Panduan ini fokus kepada laluan yang paling berguna untuk tetamu yang menginap di <a href="/rooms">Pelangi Capsule Hostel</a> di Taman Pelangi — terutamanya cara tiba dari JB CIQ/JB Sentral dan cara ke tempat tarikan berdekatan.</p>

<h2>Titik Mula: Terminal Bas JB Sentral</h2>
<p>Hampir semua perjalanan bas awam di JB bermula di <strong>JB Sentral</strong>, hab pengangkutan utama bandar yang disambungkan ke stesen KTM dan City Square Mall. Jika anda tiba dari Singapura melalui Tambak Johor, berita baik: selepas selesai urusan imigresen di <strong>JB CIQ</strong>, terminal bas JB Sentral hanya 5 minit jalan kaki dalam koridor berhawa dingin. Tak perlu teksi semata-mata untuk sampai ke stesen bas.</p>

<p>Di JB Sentral, pergi ke <strong>terminal bas tingkat bawah</strong>. Bas bernombor dan ditunjukkan pada papan digital. Anda boleh bayar tunai (duit syiling lebih mudah) atau guna kad <strong>Touch 'n Go eWallet</strong> — kalau rancang naik bas lebih dari dua kali, kad TnG memang berbaloi.</p>

<h2>Laluan 1: CT1 — Sahabat Terbaik Pelancong Bajet ke Taman Pelangi</h2>
<p><strong>Causeway Link CT1</strong> (JB Sentral → Bayu Puteri) adalah satu-satunya bas awam yang masuk terus ke kawasan kediaman Taman Pelangi. Untuk tetamu Pelangi Capsule Hostel, ini laluan anda:</p>
<ol>
  <li>Naik CT1 di JB Sentral, arah <strong>Bayu Puteri</strong></li>
  <li>Turun di hentian <strong>"Opp Pelangi Leisure Mall"</strong> di Jalan Serampang</li>
  <li>Jalan kira-kira <strong>2 minit (160m)</strong> ke Pelangi Capsule Hostel di 26A Jalan Perang</li>
</ol>
<p><strong>Tambang:</strong> ~RM2 &nbsp;|&nbsp; <strong>Kekerapan:</strong> setiap 80 minit<br>
<strong>Waktu berlepas dari JB Sentral:</strong> 07:00, 08:20, 09:40, 11:00, 12:20, 15:50, 17:10, 18:30, 19:50<br>
⚠️ Tiada perkhidmatan CT1 12:20–15:50 (rancang perjalanan anda)</p>

<h2>Laluan 2: J15 — Bas Paling Kerap ke Kawasan Taman Pelangi</h2>
<p><strong>BAS.MY J15</strong> beroperasi dari JB Sentral setiap 20 minit (05:00 hingga tengah malam) — kekerapan tertinggi bagi laluan yang berkhidmat di kawasan ini. Walau bagaimanapun, ia berhenti di <strong>Jalan Tebrau</strong> (lebuh raya utama), bukan dalam kawasan kediaman. Hentian "Opp Plaza Pelangi" kira-kira 1.5km dari Pelangi Leisure Mall.</p>
<ul>
  <li>Naik J15 di JB Sentral (Bay 5), arah Mid Valley Southkey</li>
  <li>Turun di <strong>"Opp Plaza Pelangi"</strong> di Jalan Tebrau — seberang menggunakan jambatan pejalan kaki</li>
  <li>Jalan 15–20 minit melalui Taman Pelangi ke hostel, ATAU tempah Grab pendek (~RM5–8, 5 minit)</li>
</ul>
<p><strong>Tambang:</strong> ~RM1.20 &nbsp;|&nbsp; <strong>Kekerapan:</strong> setiap 20 minit &nbsp;|&nbsp; Pilihan terbaik bila CT1 tidak beroperasi</p>

<h2>Laluan 3: Larkin Sentral untuk Bas Jarak Jauh</h2>
<p>Tiba dari Kuala Lumpur, Pulau Pinang atau bandar lain? Bas ekspres anda akan menurunkan anda di <strong>Larkin Sentral</strong>, terminal bas jarak jauh JB, kira-kira 5km utara JB Sentral. Dari Larkin, naik <strong>bas T13</strong> ke JB Sentral (tambang ~RM1.40), kemudian sambung CT1 atau J15 ke Taman Pelangi. Jumlah kos: bawah RM4. Grab terus dari Larkin ke Pelangi Capsule lebih kurang RM10–15.</p>

<h2>Destinasi Berdekatan dengan Bas</h2>
<table>
  <thead><tr><th>Destinasi</th><th>Bas</th><th>Turun Di</th><th>Tambang</th></tr></thead>
  <tbody>
    <tr><td>JB Sentral / City Square</td><td>CT1 atau J15 (balik)</td><td>JB Sentral</td><td>RM1.20–2</td></tr>
    <tr><td>Komtar JBCC / Jalan Wong Ah Fook</td><td>J15 masuk</td><td>Jalan Wong Ah Fook</td><td>RM1.20</td></tr>
    <tr><td>Mid Valley Southkey</td><td>J15</td><td>Mid Valley Southkey</td><td>RM1.20</td></tr>
    <tr><td>KSL City Mall</td><td>J11 atau J22</td><td>KSL City</td><td>RM1.40</td></tr>
    <tr><td>Larkin Sentral (bas antara bandar)</td><td>T13</td><td>Larkin Sentral</td><td>RM1.40</td></tr>
  </tbody>
</table>

<h2>Tips Penting untuk Penumpang Baru</h2>
<ul>
  <li><strong>Touch 'n Go eWallet:</strong> Beli kad TnG di kedai serbaneka atau 7-Eleven. Tap masuk, tap keluar. Jimat masa cari duit syiling.</li>
  <li><strong>Tiada baki diberikan:</strong> Bawa wang kecil atau duit syiling tepat jika bayar tunai. Pemandu tidak bawa baki.</li>
  <li><strong>Google Maps berfungsi:</strong> Masukkan destinasi dan pilih "Transit" — bas JB dipetakan termasuk waktu berlepas. Aplikasi Moovit juga tunjukkan ketibaan langsung.</li>
  <li><strong>Perjalanan malam:</strong> J15 beroperasi hingga tengah malam. Bas terakhir CT1 dari JB Sentral ialah 19:50 — selepas itu, naik J15 + Grab pendek.</li>
</ul>

<h2>Perbandingan Kos: Bas vs Grab</h2>
<ul>
  <li><strong>CIQ → Pelangi Capsule dengan bas CT1:</strong> RM2 seorang</li>
  <li><strong>CIQ → Pelangi Capsule dengan Grab:</strong> RM10–15 setiap perjalanan</li>
  <li><strong>Penjimatan setiap perjalanan:</strong> RM8–13 — cukup untuk satu hidangan di gerai makan</li>
</ul>

<p>Untuk lawatan 3 hari dengan dua perjalanan bas sehari, menggunakan bas jimatkan kira-kira RM50–75 berbanding Grab — cukup untuk dua malam tambahan di <a href="/rooms">Pelangi Capsule</a>. Pertukaran yang berbaloi jika anda tidak tergesa-gesa.</p>

<p>Ada soalan tentang cara ke sini? Pembantu AI kami Rainbow di <a href="/">chat laman web</a> boleh jawab soalan laluan bas dan arah 24 jam sehari.</p>
`,
		},
		// --- BUS ROUTES (ZH) ---
		{
			Slug:          "xinshan-gonggong-qiche-zhinan-beibaoke",
			Date:          "2026-08-01",
			LastModified:  "2026-08-01",
			InLanguage:    "zh-CN",
			Title:         "新山公共巴士省钱攻略｜背包客出行指南 2026",
			Excerpt:       "不用每次都叫 Grab！新山公共巴士便宜、冷气足，搞清楚这三条路线就够了。从 JB CIQ 到彩虹胶囊旅舍完整指南。",
			Category:      "旅行贴士",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "bas", "backpacker", "budget-travel", "public-transport", "taman-pelangi"},
			FeaturedImage: "/images/blog/jb-bus-guide.webp",
			ImageAlt:      "Causeway Link CT1 巴士在 JB Sentral 车站候客，前往 Taman Pelangi",
			AlternateEN:   "jb-public-bus-guide-budget-backpackers",
			AlternateZH:   "xinshan-gonggong-qiche-zhinan-beibaoke",
			AlternateMS:   "panduan-bas-awam-jb-pelancong-bajet",
			Content: `
<h2>为什么要乘公共巴士？</h2>
<p>Grab 方便，但对节省预算的背包客来说，新山的公共巴士系统是个宝藏。单程票价 RM1.20–2.00，车内有冷气，搞清楚三条主要路线就能游遍整个城市，不需要打开任何叫车 App。</p>

<p>本指南专为住在 Taman Pelangi <a href="/rooms">彩虹胶囊旅舍</a> 的旅客而写，重点介绍从 JB CIQ / JB Sentral 抵达旅舍的方式，以及如何用巴士去周边景点。</p>

<h2>出发点：JB Sentral 巴士总站</h2>
<p>新山几乎所有公共巴士路线都从 <strong>JB Sentral</strong> 出发，这里是全市最大的交通枢纽，与 KTM 火车站和 City Square 购物中心相连。如果你从新加坡经长堤入境，好消息是：在 <strong>JB CIQ</strong> 完成海关检查后，只需步行 5 分钟（全程冷气走廊），就能走到 JB Sentral 巴士站，完全不需要另外叫车。</p>

<p>到了 JB Sentral，前往<strong>底层巴士总站</strong>。巴士编号清晰显示在电子告示牌上。可以用现金（最好备好零钱）或 <strong>Touch 'n Go eWallet</strong> 卡付款——如果打算乘坐两次以上的巴士，办一张 TnG 卡非常划算。</p>

<h2>路线一：CT1 — 距离旅舍最近的选择</h2>
<p><strong>Causeway Link CT1</strong>（JB Sentral → Bayu Puteri）是唯一一条直接进入 Taman Pelangi 住宅区的公共巴士。对彩虹胶囊旅舍的旅客来说，这是首选路线：</p>
<ol>
  <li>在 JB Sentral 乘坐 CT1，方向 <strong>Bayu Puteri</strong></li>
  <li>在 Jalan Serampang 的 <strong>"Opp Pelangi Leisure Mall"</strong> 站下车</li>
  <li>步行约 <strong>2 分钟（160 米）</strong>即到达 Pelangi Capsule Hostel（26A Jalan Perang）</li>
</ol>
<p><strong>票价：</strong>约 RM2 &nbsp;|&nbsp; <strong>班距：</strong>每 80 分钟一班<br>
<strong>从 JB Sentral 出发时间：</strong>07:00、08:20、09:40、11:00、12:20、15:50、17:10、18:30、19:50<br>
⚠️ 12:20–15:50 期间停运（请避开这段时间或改乘 J15）</p>

<h2>路线二：J15 — 班次最密，适合灵活出行</h2>
<p><strong>BAS.MY J15</strong> 每 20 分钟一班（05:00 至凌晨），是本区班次最频繁的路线。但它停靠在 <strong>Jalan Tebrau 主干道</strong>旁边，不进入住宅区。"Opp Plaza Pelangi" 站距 Pelangi Leisure Mall 约 1.5 公里。</p>
<ul>
  <li>在 JB Sentral Bus Bay 5 乘 J15，方向 Mid Valley Southkey</li>
  <li>在 Jalan Tebrau 的 <strong>"Opp Plaza Pelangi"</strong> 站下车 — 走天桥过马路</li>
  <li>步行 15–20 分钟穿过 Taman Pelangi 住宅区，或叫短途 Grab（约 RM5–8，5 分钟）</li>
</ul>
<p><strong>票价：</strong>约 RM1.20 &nbsp;|&nbsp; <strong>班距：</strong>每 20 分钟 &nbsp;|&nbsp; CT1 停运期间的最佳替代选择</p>
<p><strong>J11、J20、J22</strong> 路线同样停靠"Opp Plaza Pelangi"，可作 J15 的替代选项。</p>

<h2>路线三：Larkin Sentral 长途巴士总站</h2>
<p>从吉隆坡、槟城或其他城市乘长途客车抵达？你的客车会在 <strong>Larkin Sentral</strong>（新山长途巴士总站，距 JB Sentral 约 5 公里）下客。从 Larkin 乘 <strong>T13</strong> 巴士到 JB Sentral（约 RM1.40），再换乘 CT1 或 J15 前往 Taman Pelangi，总花费不到 RM4。从 Larkin 直接叫 Grab 到旅舍约 RM10–15。</p>

<h2>巴士可到达的周边目的地</h2>
<table>
  <thead><tr><th>目的地</th><th>路线</th><th>下车站</th><th>票价</th></tr></thead>
  <tbody>
    <tr><td>JB Sentral / City Square</td><td>CT1 或 J15（反向）</td><td>JB Sentral</td><td>RM1.20–2</td></tr>
    <tr><td>Komtar JBCC / 旺阿福街</td><td>J15 入城方向</td><td>Jalan Wong Ah Fook</td><td>RM1.20</td></tr>
    <tr><td>Mid Valley Southkey</td><td>J15</td><td>Mid Valley Southkey</td><td>RM1.20</td></tr>
    <tr><td>KSL City Mall</td><td>J11 或 J22</td><td>KSL City</td><td>RM1.40</td></tr>
    <tr><td>Larkin Sentral（长途巴士）</td><td>T13</td><td>Larkin Sentral</td><td>RM1.40</td></tr>
  </tbody>
</table>

<h2>新手必看乘车贴士</h2>
<ul>
  <li><strong>Touch 'n Go eWallet：</strong>在便利店或 7-Eleven 购买 TnG 卡，刷卡上下车，省去找零烦恼。</li>
  <li><strong>不找零：</strong>现金支付请准备好零钱，司机不找零。</li>
  <li><strong>Google Maps 可用：</strong>输入目的地选"公交"，新山巴士已收录并显示发车时间。Moovit App 也能查实时到站信息。</li>
  <li><strong>夜间出行：</strong>J15 运营至凌晨。CT1 末班车从 JB Sentral 出发时间为 19:50 — 之后请乘 J15 再加短途 Grab。</li>
  <li><strong>补水很重要：</strong>新山天气炎热，等车时记得带水。CT1 每 80 分钟才一班，用 Moovit 查好时间再出门。</li>
</ul>

<h2>费用对比：巴士 vs Grab</h2>
<ul>
  <li><strong>CIQ → 彩虹胶囊旅舍（CT1 巴士）：</strong>RM2 / 人</li>
  <li><strong>CIQ → 彩虹胶囊旅舍（Grab）：</strong>RM10–15 / 次</li>
  <li><strong>每次节省：</strong>RM8–13 — 够吃一顿饱饱的小贩美食</li>
</ul>

<p>3 天行程每天乘两趟巴士，与全程叫 Grab 相比，大约可省下 RM50–75 — 相当于又多住两晚 <a href="/rooms">彩虹胶囊</a>。如果你时间充裕、不赶时间，公共巴士绝对是更聪明的选择。</p>

<p>有关于来旅舍路线的问题？我们的 AI 助手 Rainbow 在<a href="/">网站聊天窗口</a>24 小时在线，可以回答巴士时刻和路线问题。</p>
`,
		},
		// --- TMIYC (EN) ---
		{
			Slug:          "tmiyc-johor-bahru-free-outdoor-park-guide",
			Date:          "2026-08-01",
			LastModified:  "2026-08-01",
			Title:         "TMIYC Johor Bahru: Free Outdoor Park Guide for Backpackers (2026)",
			Excerpt:       "Free entry, open until 11pm, glowing canopy walk, skate park, BMX track and forest trails — TMIYC is JB's best-kept secret for budget travellers. Complete guide from Pelangi Hostel.",
			Category:      "Things To Do",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "tmiyc", "free", "outdoor", "backpacker", "activities", "hutan-bandar"},
			FeaturedImage: "/images/blog/tmiyc-jb.webp",
			ImageAlt:      "The illuminated canopy walk at TMIYC Johor Bahru glowing at night inside Hutan Bandar urban forest",
			AlternateEN:   "tmiyc-johor-bahru-free-outdoor-park-guide",
			AlternateZH:   "tmiyc-xinshan-mianfei-huodong-gongyuan",
			AlternateMS:   "tmiyc-johor-bahru-panduan-taman-riadah-percuma",
			Content: `
<h2>What Is TMIYC Johor Bahru?</h2>
<p><strong>Tunku Mahkota Ismail Youth Centre</strong> (TMIYC) is a free outdoor recreation complex managed by Johor Bahru City Council (MBJB), tucked inside <strong>Hutan Bandar MBJB</strong> — the city's urban forest park in the Ulu Air Molek area. Opened in December 2020, it's become one of JB's most popular evening hangout spots for locals and the city's best-kept secret for backpackers who stumble upon it.</p>

<p>The combination of purpose-built sports facilities, forest trails, and an Instagram-famous glowing canopy walk — all completely free — makes TMIYC a rare find in any Southeast Asian city.</p>

<h2>What's Inside TMIYC</h2>

<h3>🌿 Canopy Walk (Glow in the Dark)</h3>
<p>The star attraction. An elevated treetop walkway winds through the urban forest canopy, and after dark it glows — the walkway lights up in shifting colours, creating a genuinely magical atmosphere that's been widely shared on social media. Arrive after sunset for the full effect. No booking required, no fee.</p>

<h3>🛹 Skate Park</h3>
<p>A full concrete outdoor skatepark with rails, quarter pipes, ramps, and flatground. Well-lit at night and popular with JB's local skate scene. Skateboards, scooters, and rollerblades all welcome. If you travel with a board, this is a must-visit.</p>

<h3>🚵 BMX Pump Track and Mountain Bike Trails</h3>
<p>A flowing pump track for BMX and mountain bikes, plus forest trails through Hutan Bandar. Bicycle and scooter rental is available on site — you don't need to bring your own. Rates vary by session length.</p>

<h3>🧗 Rock Climbing and Parkour Park</h3>
<p>An outdoor climbing wall and dedicated parkour obstacles make TMIYC popular with the active crowd. Suitable for beginners wanting to try something new in JB on zero budget.</p>

<h3>🍜 Food and Drinks</h3>
<p>The F&amp;B area inside TMIYC has several outlets described locally as "hipster" — think local bites alongside trendy drinks. Quality varies but prices are fair, and it means you can make a full evening of the park without leaving for dinner. There are also florist kiosks and handicraft stalls if you want to pick up a souvenir.</p>

<h2>Opening Hours and Entry</h2>
<ul>
  <li><strong>Hours:</strong> Daily, 7:00 AM – 11:00 PM</li>
  <li><strong>Entry:</strong> Free (no admission charge)</li>
  <li><strong>Bicycle/scooter rental:</strong> Paid (rate on site)</li>
  <li><strong>Best time:</strong> After 7:00 PM for the canopy walk lights and cooler temperatures</li>
</ul>

<h2>Getting There from Pelangi Capsule Hostel</h2>
<p>TMIYC is located at Hutan Bandar MBJB, Jalan Yahya Awal, Ulu Air Molek, 80200 Johor Bahru — approximately <strong>3–5 km</strong> from Pelangi Capsule Hostel by road.</p>

<p><strong>Recommended: Grab</strong> (~RM5–8 one-way, 10–15 minutes). This is the most straightforward option from Taman Pelangi. It's cheap enough that even strict budget travellers will find it reasonable — especially when split between two people.</p>

<p><strong>Budget tip:</strong> Grab a group of 3–4 from the hostel and split the fare. RM2 per person each way is exceptional value for a full evening out. Use the hostel common area to find fellow travellers heading in the same direction.</p>

<p>Public bus options exist but require changes at JB Sentral — check Moovit for current Causeway Link routes toward Tasek Utara / Air Molek. Not recommended for a first visit due to the walking distance from bus stops to the park entrance.</p>

<h2>Why Backpackers Love TMIYC</h2>
<ul>
  <li><strong>Completely free entry</strong> — rare for an attraction of this quality</li>
  <li><strong>Open until 11pm</strong> — perfect for the hostel crowd who explore in the evenings</li>
  <li><strong>Local atmosphere</strong> — the skate park and trails draw JB youth, not tourist buses; you get an authentic slice of local life</li>
  <li><strong>Urban forest escape</strong> — rare to have genuine forest trails inside a city; great contrast after a day of malls and hawker food</li>
  <li><strong>Photo-worthy</strong> — the canopy walk is genuinely beautiful at night and earns its Instagram reputation</li>
  <li><strong>Food on site</strong> — no need to leave the park for dinner</li>
</ul>

<h2>Combine With Other Nearby Attractions</h2>
<p>TMIYC pairs well with a JB evening itinerary. From Pelangi Capsule:</p>
<ol>
  <li><strong>5:00 PM</strong> — Grab to TMIYC (arrive before sunset)</li>
  <li><strong>5:30–7:00 PM</strong> — Explore trails, skate park, climbing wall while it's light</li>
  <li><strong>7:00–8:30 PM</strong> — Canopy walk after dark + dinner at F&amp;B area</li>
  <li><strong>8:30 PM</strong> — Grab back to hostel or continue to Taman Pelangi's nightlife scene</li>
</ol>

<p>The Taman Pelangi area itself has speakeasy bars, karaoke, and night-market food stalls within walking distance of the hostel — so the evening can continue long after TMIYC closes.</p>

<p>Ready to explore JB? <a href="/book">Book a capsule at Pelangi</a> and use it as your base for TMIYC, the night markets, and everything else JB has to offer.</p>
`,
		},
		// --- TMIYC (BM) ---
		{
			Slug:          "tmiyc-johor-bahru-panduan-taman-riadah-percuma",
			Date:          "2026-08-01",
			LastModified:  "2026-08-01",
			InLanguage:    "ms",
			Title:         "TMIYC Johor Bahru: Panduan Taman Riadah Percuma 2026",
			Excerpt:       "Masuk percuma, buka hingga 11 malam, laluan kanopi bercahaya, gelanggang skate, trek BMX dan hutan bandar — TMIYC adalah destinasi tersembunyi terbaik JB untuk pelancong bajet.",
			Category:      "Aktiviti",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "tmiyc", "percuma", "riadah", "pelancong-bajet", "hutan-bandar"},
			FeaturedImage: "/images/blog/tmiyc-jb.webp",
			ImageAlt:      "Laluan kanopi TMIYC Johor Bahru yang bercahaya pada waktu malam dalam Hutan Bandar",
			AlternateEN:   "tmiyc-johor-bahru-free-outdoor-park-guide",
			AlternateZH:   "tmiyc-xinshan-mianfei-huodong-gongyuan",
			AlternateMS:   "tmiyc-johor-bahru-panduan-taman-riadah-percuma",
			Content: `
<h2>Apa Itu TMIYC Johor Bahru?</h2>
<p><strong>Pusat Belia Tunku Mahkota Ismail</strong> (TMIYC) adalah kompleks riadah luar percuma yang diuruskan oleh Majlis Bandaraya Johor Bahru (MBJB), terletak dalam <strong>Hutan Bandar MBJB</strong> di kawasan Ulu Air Molek. Dibuka pada Disember 2020, ia kini menjadi salah satu tempat lepak petang paling popular di JB — dan rahsia terbaik yang belum ramai pelancong tahu.</p>

<p>Gabungan kemudahan sukan bertaraf tinggi, laluan hutan, dan laluan kanopi yang viral di media sosial — semuanya percuma — menjadikan TMIYC satu keunikan yang jarang ada di mana-mana bandar di Asia Tenggara.</p>

<h2>Apa Yang Ada di TMIYC</h2>

<h3>🌿 Laluan Kanopi (Glow in the Dark)</h3>
<p>Tarikan utama. Laluan kanopi yang ditinggikan mengular melalui hutan bandar, dan selepas gelap ia bercahaya — lampu bertukar warna menghasilkan suasana yang memukau. Tiba selepas matahari terbenam untuk pengalaman penuh. Tiada tempahan diperlukan, masuk percuma.</p>

<h3>🛹 Gelanggang Skate</h3>
<p>Gelanggang skate luar konkrit penuh dengan rel, quarter pipe, ramp, dan flatground. Berlampu terang pada waktu malam dan popular dalam kalangan komuniti skate JB. Papan luncur, skuter, dan rollerblade dialu-alukan.</p>

<h3>🚵 Trek Pam BMX dan Laluan Basikal Gunung</h3>
<p>Trek pam yang mengalir untuk BMX dan basikal gunung, ditambah laluan hutan melalui Hutan Bandar. Sewa basikal dan skuter tersedia di tapak — anda tidak perlu bawa sendiri.</p>

<h3>🧗 Panjat Tebing dan Taman Parkour</h3>
<p>Dinding panjat tebing luar dan halangan parkour khusus. Sesuai untuk pemula yang ingin mencuba aktiviti baharu di JB tanpa kos masuk.</p>

<h3>🍜 Makanan dan Minuman</h3>
<p>Kawasan F&amp;B dalam TMIYC ada beberapa gerai yang dikenali sebagai "hipster" oleh warga tempatan — pelbagai juadah tempatan dan minuman menarik. Harga berpatutan, dan ini bermakna anda boleh habiskan satu malam penuh di taman tanpa perlu keluar untuk makan malam.</p>

<h2>Waktu Operasi dan Yuran Masuk</h2>
<ul>
  <li><strong>Waktu Buka:</strong> Setiap hari, 7:00 pagi – 11:00 malam</li>
  <li><strong>Masuk:</strong> Percuma</li>
  <li><strong>Sewa basikal/skuter:</strong> Berbayar (kadar di tapak)</li>
  <li><strong>Masa terbaik:</strong> Selepas 7:00 malam untuk laluan kanopi bercahaya dan suhu lebih sejuk</li>
</ul>

<h2>Cara Ke Sana dari Pelangi Capsule Hostel</h2>
<p>TMIYC terletak di Hutan Bandar MBJB, Jalan Yahya Awal, Ulu Air Molek, 80200 Johor Bahru — kira-kira <strong>3–5 km</strong> dari Pelangi Capsule Hostel melalui jalan raya.</p>

<p><strong>Disyorkan: Grab</strong> (~RM5–8 sehala, 10–15 minit). Ini pilihan paling mudah dari Taman Pelangi. Murah dari segi nilai, terutama jika dikongsi antara dua orang.</p>

<p><strong>Tips jimat:</strong> Ajak rakan sebilik atau pelancong lain dari hostel untuk pergi bersama dan kongsi tambang. RM2 seorang setiap perjalanan adalah nilai yang luar biasa untuk satu malam penuh di luar.</p>

<h2>Kenapa Pelancong Bajet Suka TMIYC</h2>
<ul>
  <li><strong>Masuk percuma</strong> — jarang ada tarikan sebegini tanpa bayaran</li>
  <li><strong>Buka hingga 11 malam</strong> — sesuai untuk kelompok hostel yang suka terokai pada waktu malam</li>
  <li><strong>Suasana tempatan</strong> — gelanggang skate dan laluan menarik belia JB, bukan bas pelancong; anda dapat mengalami kehidupan sebenar warga tempatan</li>
  <li><strong>Pelarian hutan bandar</strong> — jarang ada laluan hutan tulen di dalam bandar; kontras yang menyegarkan selepas seharian di pusat membeli-belah dan gerai makan</li>
  <li><strong>Berbaloi difoto</strong> — laluan kanopi sangat cantik pada waktu malam</li>
  <li><strong>Ada makanan di tapak</strong> — tak perlu keluar taman untuk makan malam</li>
</ul>

<p>Bersedia untuk terokai JB? <a href="/book">Tempah kapsul di Pelangi</a> dan jadikannya sebagai pangkalan untuk TMIYC, pasar malam, dan segala-galanya yang JB ada untuk ditawarkan.</p>
`,
		},
		// --- TMIYC (ZH) ---
		{
			Slug:          "tmiyc-xinshan-mianfei-huodong-gongyuan",
			Date:          "2026-08-01",
			LastModified:  "2026-08-01",
			InLanguage:    "zh-CN",
			Title:         "TMIYC 新山免费户外活动公园｜背包客必去景点 2026",
			Excerpt:       "免费入场、开放至晚上11点、发光天空步道、溜冰场、BMX 跑道和城市森林径 — TMIYC 是新山预算旅行者最值得去的隐藏宝地。",
			Category:      "玩乐活动",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "tmiyc", "free", "outdoor", "backpacker", "activities", "hutan-bandar"},
			FeaturedImage: "/images/blog/tmiyc-jb.webp",
			ImageAlt:      "TMIYC 新山城市森林内夜间发光的天空步道",
			AlternateEN:   "tmiyc-johor-bahru-free-outdoor-park-guide",
			AlternateZH:   "tmiyc-xinshan-mianfei-huodong-gongyuan",
			AlternateMS:   "tmiyc-johor-bahru-panduan-taman-riadah-percuma",
			Content: `
<h2>TMIYC 新山是什么？</h2>
<p><strong>敦古马赫科达伊斯迈青年中心</strong>（Tunku Mahkota Ismail Youth Centre，TMIYC）是由新山市议会（MBJB）管理的免费户外休闲综合设施，坐落在 Ulu Air Molek 区的 <strong>Hutan Bandar MBJB 城市森林公园</strong>内。2020 年 12 月开幕，如今已成为新山最受本地年轻人欢迎的夜间聚点，也是背包客圈子里的隐藏宝地。</p>

<p>齐全的运动设施、森林步道，再加上那条在社交媒体上爆红的发光天空步道——全部免费——让 TMIYC 成为东南亚城市中罕见的存在。</p>

<h2>TMIYC 里面有什么</h2>

<h3>🌿 天空步道（夜间发光）</h3>
<p>最吸引眼球的主角。一条高架步道蜿蜒穿越城市森林树冠，天黑后灯光亮起——七彩变换的灯光在夜色中营造出梦幻氛围，无数照片流传社交媒体。日落后抵达效果最佳。无需预约，免费进入。</p>

<h3>🛹 溜冰场（Skate Park）</h3>
<p>全混凝土户外溜冰场，配备栏杆、四分之一管道、坡道和平地区。夜间灯光充足，深受新山本地滑板圈欢迎。滑板、滑板车、旱冰鞋均可使用。如果你带着滑板旅行，这里不可错过。</p>

<h3>🚵 BMX 泵道和山地车径</h3>
<p>适合 BMX 和山地车的泵道，以及穿越 Hutan Bandar 的林间小径。场地内提供单车和电动滑板车租赁，无需自带装备。</p>

<h3>🧗 攀岩和跑酷公园</h3>
<p>户外攀岩墙和专属跑酷障碍区，适合零基础初学者体验，完全免费。</p>

<h3>🍜 餐饮区</h3>
<p>TMIYC 内的餐饮区有多家本地人称为"文艺风"的摊位，提供各类小吃和特色饮料。价格合理，让你可以在园区内度过完整的夜晚而无需外出觅食。园内还有花摊和手工艺品小摊。</p>

<h2>开放时间和门票</h2>
<ul>
  <li><strong>开放时间：</strong>每天 7:00 AM – 11:00 PM</li>
  <li><strong>门票：</strong>免费入场</li>
  <li><strong>单车/滑板车租赁：</strong>收费（现场询问价格）</li>
  <li><strong>最佳时间：</strong>晚上 7 点后，天空步道亮灯，气温也凉快许多</li>
</ul>

<h2>从彩虹胶囊旅舍出发怎么去</h2>
<p>TMIYC 位于 Hutan Bandar MBJB，Jalan Yahya Awal，Ulu Air Molek，80200 新山——距离 Pelangi Capsule Hostel 约 <strong>3–5 公里</strong>（乘车）。</p>

<p><strong>推荐方式：Grab</strong>（单程约 RM5–8，车程 10–15 分钟）。这是从 Taman Pelangi 出发最方便的方式，价格对背包客来说非常划算——如果两人合乘更实惠。</p>

<p><strong>省钱小技巧：</strong>在旅舍公共区域招募同伴一起出发，3–4 人拼车，每人单程只需约 RM2，性价比极高。</p>

<h2>背包客为什么爱 TMIYC</h2>
<ul>
  <li><strong>完全免费</strong>——这种配置的设施收费都应该的，但它不收</li>
  <li><strong>开放至晚上 11 点</strong>——非常适合旅舍旅客的夜间行程</li>
  <li><strong>地道本地氛围</strong>——溜冰场和林径聚集的是新山本地年轻人，不是旅游团，体验真实的本地生活</li>
  <li><strong>城市森林逃离</strong>——在闹市里拥有真正的林间步道，是逛完购物中心和小贩中心后的完美解压</li>
  <li><strong>出片率极高</strong>——夜间天空步道颜值在线，值得专程来打卡</li>
  <li><strong>餐饮一站搞定</strong>——无需离园觅食，可在公园内度过完整的夜晚</li>
</ul>

<h2>推荐一日行程搭配</h2>
<ol>
  <li><strong>下午 5:00</strong> — 从旅舍叫 Grab 前往 TMIYC（日落前到达）</li>
  <li><strong>5:30–7:00 PM</strong> — 趁天亮探索林间步道、溜冰场、攀岩墙</li>
  <li><strong>7:00–8:30 PM</strong> — 日落后游览发光天空步道 + 在餐饮区用晚餐</li>
  <li><strong>8:30 PM</strong> — Grab 回旅舍，或继续探索 Taman Pelangi 的夜生活区</li>
</ol>

<p>Taman Pelangi 区域内有酒吧、卡拉 OK 和夜市小吃，步行即可到达，TMIYC 之后的夜晚可以继续精彩。</p>

<p>准备出发了吗？<a href="/book">预订彩虹胶囊旅舍</a>，以此为基地探索 TMIYC、夜市、以及新山的一切精彩。</p>
`,
		},
		// 72
		{
			Slug:          "malaysia-digital-nomad-johor-bahru-guide",
			Date:          "2026-08-05",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"digital-nomad", "remote-work", "johor-bahru", "malaysia", "budget-travel", "work-from-jb"},
			FeaturedImage: "/images/blog/malaysia-digital-nomad-johor-bahru-guide.webp",
			ImageAlt:      "A digital nomad working remotely on a laptop from a cafe",
			Title:         "Malaysia Is the World's Top Digital Nomad Destination — Here's Why Johor Bahru Should Be Your Base",
			Excerpt:       "Malaysia ranked #1 for digital nomads in 2026. Forget KL — Johor Bahru gives you Singapore-tier connectivity at a fraction of the price, a legal 12-month nomad visa, and capsule accommodation from RM30/night (~US$7).",
			Content: `
<h2>Malaysia: The World's Best Country for Digital Nomads</h2>
<p>It is no longer a secret. Malaysia has been named the <strong>best country in the world for digital nomads</strong> by the Rumavi Global Relocation Index 2026, which scores 192 countries on cost of living, tax rules, safety, visa access, and digital infrastructure. Malaysia scored 80 out of 100 for digital infrastructure alone — ahead of Portugal, Thailand, and every other Southeast Asian competitor. <a href="https://www.timeout.com/news/malaysia-the-best-country-for-digital-nomads-080326" target="_blank" rel="noopener noreferrer">Time Out reported the finding in March 2026</a>.</p>

<p>The Rumavi index evaluates six different relocation profiles — retirees, families, entrepreneurs, and remote workers among them — re-weighting the same 24 indicators for each group. Under the digital-nomad profile, Malaysia ranks first globally: ahead of Portugal (#2), Thailand (#3), Georgia (#4), and Taiwan (#5). Malaysia's overall score across all profiles was 72.0 out of 100, placing it among the top three countries in the world for any type of relocation, <a href="https://theindependent.sg/singapore-ranks-second-in-2026-global-relocation-index/" target="_blank" rel="noopener noreferrer">as The Independent SG reported</a>.</p>

<p>The reasons are practical: fast fibre internet, English widely spoken, halal and non-halal food everywhere, low crime, modern hospitals, and a cost of living that makes Southeast Asian neighbours look expensive.</p>

<h2>The DE Rantau Nomad Pass: Malaysia's Legal 12-Month Visa for Remote Workers</h2>
<p>Malaysia is one of the few countries in Asia with a dedicated legal pathway for digital nomads. The <strong>DE Rantau Nomad Pass</strong>, launched by the Malaysia Digital Economy Corporation (MDEC), allows remote workers earning at least USD&nbsp;24,000 per year to live and work legally in Malaysia for 12 months, renewable for up to three years. Dependants can join on the same pass.</p>

<p>In June 2024, eligibility was expanded to include founders, CEOs, accountants, legal professionals, and writers — not just software engineers. This makes JB viable for a much broader range of remote professionals. Apply through the official <a href="https://derantau.mdec.com.my" target="_blank" rel="noopener noreferrer">DE Rantau portal</a>. Processing is straightforward; many applicants report approval within two to four weeks.</p>

<h2>Why Johor Bahru — Not KL, Not Penang</h2>
<p>Kuala Lumpur gets the headlines. But for digital nomads who need Singapore as a backup office, visa run destination, or client hub, <strong>Johor Bahru is strategically superior</strong>.</p>

<h3>Singapore Is 30 Minutes Away — And Getting Even Closer</h3>
<p>The Johor–Singapore Causeway is one of the busiest border crossings in the world. From JB Sentral, the Causeway Link bus costs SGD&nbsp;3.30 and drops you at Kranji MRT in Singapore. For nomads with Singapore-based clients, co-working meetings, or bank accounts, JB is effectively a satellite suburb of Singapore — at one-fifth of the cost.</p>
<p>The <strong>RTS Link</strong> — a 4 km rail connection between Bukit Chagar (JB) and Woodlands North (Singapore) — is scheduled to open by end-2026. The crossing will take under five minutes and carry up to 10,000 passengers per hour each way. When it opens, Singapore becomes even more accessible from JB without the queuing variability of the road causeway.</p>

<h3>Cost of Living: The JB Advantage</h3>
<p>Here is what a nomad's monthly budget looks like in JB versus its competitors:</p>
<ul>
  <li><strong>Accommodation (capsule/shared):</strong> from RM30/night (~US$7) at Pelangi Capsule vs SGD&nbsp;70–120/night in Singapore</li>
  <li><strong>Your daily "office" — JB café style:</strong> order a drink for RM15 or less (~US$4) and work the entire day on free WiFi. That is the real cost of a nomad workspace in JB.</li>
  <li><strong>Co-working day pass:</strong> RM30–50 (~US$7–12) in JB vs SGD&nbsp;35–60 in Singapore and RM80–120 in KL's central business district</li>
  <li><strong>Grab ride across the city:</strong> RM8–15 in JB vs SGD&nbsp;15–30 in Singapore</li>
  <li><strong>Meals at local restaurants:</strong> RM6–12/meal in JB vs SGD&nbsp;15–25 in Singapore</li>
</ul>
<p>A nomad living comfortably in JB — café-working, eating out, and making occasional Singapore day trips — can budget RM3,000–4,500/month (~US$730–1,100) total. The same lifestyle in Singapore costs SGD&nbsp;4,000–6,000 per month.</p>

<h3>Connectivity Is Not a Compromise</h3>
<p>JB's fibre infrastructure is excellent. Most cafés, co-working spaces, and hostels in the central city districts serve speeds of 100–300&nbsp;Mbps. Video calls, large file uploads, and cloud-based workflows run without friction. Unifi and TIME fibre, Malaysia's two leading ISPs, both have strong JB coverage. You are not roughing it — you are working efficiently from a city where your money goes further.</p>

<h3>Proximity to the Rest of Malaysia</h3>
<p>From JB, the rest of peninsular Malaysia is within easy reach: KL is a 4-hour bus ride (RM25–35), Melaka is 2 hours, and Desaru's beaches are under 90 minutes. Penang, Langkawi, and the Cameron Highlands are budget-flight or overnight-bus territory. JB is a sensible anchor point for nomads who want to explore without burning through their budget on internal flights.</p>

<h2>Where to Stay: Budget-Smart Capsule Accommodation in JB</h2>
<p>For nomads who prioritise working budget and flexibility over hotel points, capsule accommodation makes sense. <a href="/rooms">Pelangi Capsule Hostel</a> (JB Capsule) in Taman Pelangi offers private locking pod rooms <strong>from RM30/night (~US$7)</strong>, with fast WiFi, USB charging in-pod, air-conditioning, and personal lockers. There is no minimum stay. Monthly rates are available for longer-term nomads.</p>

<p>Taman Pelangi is a central JB neighbourhood with direct Grab access to JB Sentral (Causeway buses), City Square mall, and the main co-working belt. Staying here keeps your daily costs low without sacrificing convenience.</p>

<h2>Practical Notes for Digital Nomads Arriving in JB</h2>
<ul>
  <li><strong>SIM card:</strong> Pick up a Digi, Maxis, or Celcom prepaid at JB Sentral or City Square. 30GB data for RM30–40/month is standard.</li>
  <li><strong>Banking:</strong> Wise and Revolut work well in Malaysia. Local ATMs accept international Visa/Mastercard. Open a Malaysian bank account (Maybank, CIMB) if staying longer-term.</li>
  <li><strong>Co-working:</strong> Colony @ JB, Common Ground Paradigm, and several independent cafés in the city centre offer reliable day passes. Many nomads work from laptop-friendly cafés in Taman Pelangi, Bukit Indah, or Medini.</li>
  <li><strong>DE Rantau hubs:</strong> MDEC has designated several JB co-working spaces as official DE Rantau hubs — check the <a href="https://derantau.mdec.com.my" target="_blank" rel="noopener noreferrer">MDEC site</a> for the current list.</li>
  <li><strong>Tax:</strong> Income earned from foreign employers is generally not subject to Malaysian income tax for non-residents. Consult a tax professional for your specific situation.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Do I need the DE Rantau pass to work remotely in JB?</h3>
<p>Not for short stays. Malaysia's standard tourist entry (visa-free for most nationalities, 30–90 days) permits leisure stays. However, if you are earning income while in Malaysia, the DE Rantau pass provides a legal framework and longer permitted stay. For extended nomad stays, the pass is strongly recommended.</p>

<h3>Is JB safe for solo digital nomads?</h3>
<p>Yes. JB has improved substantially in safety perception over the past five years. Stick to central districts (Taman Pelangi, City Square, Bukit Indah, Medini), use Grab for late-night travel, and exercise standard urban awareness. Most nomads and expats report feeling comfortable and welcomed.</p>

<h3>How fast is the internet at Pelangi Capsule Hostel?</h3>
<p>We run Unifi fibre with speeds consistently above 100&nbsp;Mbps. The connection handles simultaneous video calls, large uploads, and cloud sync without issue. If you need a dedicated wired connection for critical work, ask at the front desk.</p>

<h3>Can I use JB as a base and commute to Singapore for work?</h3>
<p>Many residents do exactly this. The Causeway crossing takes 20–60 minutes depending on traffic. Peak hours (7–9am into Singapore, 5–8pm returning to JB) are busier; off-peak crossings are quick. Most Singapore-bound nomads and workers time their crossings to avoid peak flow.</p>

<p>Ready to make JB your nomad base? <a href="/book">Book a pod at Pelangi Capsule Hostel</a> — no minimum stay, flexible check-in, and a community of travellers and remote workers passing through every week.</p>
`,
		},
		{
			Slug:          "johor-bahru-food-guide-near-city-centre",
			Date:          "2026-08-06",
			Category:      "Food & Drink",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"food", "johor-bahru", "city-centre", "cheap-eats", "hawker-food", "travel-guide", "budget-food"},
			FeaturedImage: "/images/blog/johor-bahru-food-guide-near-city-centre.webp",
			ImageAlt:      "Jalan Wong Ah Fook in Johor Bahru's city centre, home to heritage kopitiams",
			Title:         "Johor Bahru Food Guide: Best Cheap Eats Near the City Centre (2026)",
			Excerpt:       "The best food in JB isn't in the tourist traps. It's in the shophouse kopitiam on Jalan Wong Ah Fook, the heritage kopitiam near the Chinese temple, and the basement food court beneath KOMTAR. Under RM15, every meal.",
			Content: `
<h2>Where Is the Best Food in Johor Bahru City Centre?</h2>
<p>The best food in JB city centre is scattered across three zones: the old-town shophouse strip on Jalan Wong Ah Fook, the heritage kopitiam cluster near the Chinese temple, and the basement food court beneath KOMTAR JBCC mall. Most dishes run RM5&ndash;12, and the quality is far higher than the price suggests. Skip the chain restaurants and follow the crowds to the hawker stalls that have been feeding JB since before anyone alive can remember.</p>

<h2>What Is KOMTAR JBCC and Why Should I Eat There?</h2>
<p>KOMTAR JBCC (Johor Bahru City Centre) is a mixed-use development anchored by a sprawling basement food court that locals treat as a daily canteen. You will find stalls selling nasi lemak, char kway teow, pan mee, laksa, and economy rice &mdash; most priced between RM6 and RM12 per plate. The air-conditioned environment makes it especially popular at lunch, and the variety means groups with different dietary preferences can all find something to eat in one place.</p>

<h2>What Can I Eat on Jalan Wong Ah Fook?</h2>
<p>Jalan Wong Ah Fook is the commercial backbone of JB old town, lined with pre-war shophouses that have been converted into kopitiams, bakeries, and traditional Chinese medicine halls. Street-level stalls and kopitiam kitchens open from early morning, serving kopi-o (black coffee with sugar, RM1.50), half-boiled eggs, and toast with kaya butter. By noon the lunch crowd fills the five-foot walkways with plates of economy rice (nasi campur) for RM5&ndash;7 &mdash; choose your protein and vegetable combination and pay by the scoop.</p>

<h2>Where Is the JB Old Chinese Temple and What Food Is Nearby?</h2>
<p>The Johor Bahru Old Chinese Temple (Kuil Cina Tua JB) on Jalan Trus is one of the oldest temples in the state and sits in the heart of the original Chinese quarter. The surrounding streets are where you find JB's most celebrated heritage food: hand-pulled wonton mee at RM7&ndash;9 per bowl, char kway teow (stir-fried flat rice noodles with egg and beansprouts) at RM6&ndash;8, and iced cendol &mdash; a shaved-ice dessert with palm sugar syrup and pandan jelly &mdash; for RM4&ndash;5. Go before noon; the best stalls sell out by 1pm.</p>

<h2>What Is Restoran Hua Mui and Is It Worth Visiting?</h2>
<p>Restoran Hua Mui on Jalan Tan Hiok Nee has been operating since 1939, making it one of the oldest surviving kopitiam in Johor Bahru. The menu has barely changed in decades: Hainanese chicken chop (RM18&ndash;22), pork chop with baked beans, and thick toast with homemade kaya. It is not the cheapest meal in the city centre, but the experience &mdash; ceiling fans, marble-top tables, and coffee served in ceramic cups &mdash; is part of JB's living heritage. Arrive before 10am or after 2pm to beat the queue.</p>

<h2>Where Can I Eat Seafood Near the City Centre?</h2>
<p>Tepian Tebrau, the waterfront promenade along the Straits of Johor, is JB's most atmospheric dining strip. Several seafood restaurants here face Singapore across the water, and the sunsets are worth timing a meal around. Expect to spend RM30&ndash;60 per person for a full seafood dinner with steamed fish, butter prawns, and stir-fried vegetables &mdash; higher than hawker prices but significantly cheaper than equivalent meals in Singapore. Grab from the city centre to Tepian Tebrau costs around RM8&ndash;12.</p>

<h2>What Is Pasar Karat and When Does It Open?</h2>
<p>Pasar Karat (literally "rusty market") is JB's famous flea market and morning bazaar held along Joo Chiat Road near the city centre, running daily from 6am to 11am. Despite the name, it is better known for its morning food stalls than its antiques: fresh-cut fruit, Hokkien mee, popiah (fresh spring rolls), and kuih (traditional Malay cakes) are all available from RM2&ndash;6. Arrive by 8am for the best selection before the sun gets too hot and the stalls begin packing up.</p>

<h2>What Are the Cheapest Ways to Eat in JB City Centre?</h2>
<p>Economy rice (nasi campur) is the city's unofficial budget staple: RM5&ndash;7 buys a plate of rice with two or three dishes chosen from a counter display. Mamak restaurants &mdash; Tamil Muslim-run eateries serving roti canai, dhal curry, and teh tarik &mdash; operate 24 hours a day and are the go-to for meals under RM5. For late-night hunger, any mamak within the city centre will serve you a RM2.50 roti canai and a RM2 glass of teh tarik at 2am without question.</p>

<h2>Quick Reference: City Centre Food by Dish</h2>
<table>
<thead>
<tr><th>Dish</th><th>Where to Find It</th><th>Price (RM)</th></tr>
</thead>
<tbody>
<tr><td>Economy rice (nasi campur)</td><td>Jalan Wong Ah Fook kopitiams</td><td>5&ndash;7</td></tr>
<tr><td>Wonton mee</td><td>Old Chinese Temple area</td><td>7&ndash;9</td></tr>
<tr><td>Char kway teow</td><td>Old Chinese Temple area</td><td>6&ndash;8</td></tr>
<tr><td>Cendol (iced dessert)</td><td>Old Chinese Temple area</td><td>4&ndash;5</td></tr>
<tr><td>Hainanese chicken chop</td><td>Restoran Hua Mui, Jalan Tan Hiok Nee</td><td>18&ndash;22</td></tr>
<tr><td>Kopi-o &amp; kaya toast set</td><td>Jalan Wong Ah Fook kopitiam</td><td>3&ndash;5</td></tr>
<tr><td>Mixed food court plate</td><td>KOMTAR JBCC basement food court</td><td>6&ndash;12</td></tr>
<tr><td>Roti canai + teh tarik</td><td>Any mamak, 24/7</td><td>4&ndash;5</td></tr>
<tr><td>Seafood dinner (per person)</td><td>Tepian Tebrau waterfront</td><td>30&ndash;60</td></tr>
<tr><td>Morning market kuih &amp; fruit</td><td>Pasar Karat, Joo Chiat Road (6&ndash;11am)</td><td>2&ndash;6</td></tr>
<tr><td>Popiah (fresh spring rolls)</td><td>Pasar Karat morning market</td><td>3&ndash;5</td></tr>
</tbody>
</table>

<h2>How Do I Get from Pelangi Capsule Hostel to the City Centre Food Belt?</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi is approximately 10 minutes from the JB city centre food belt by Grab, with typical fares of RM6&ndash;8 each way. The hostel's location in Taman Pelangi also puts you within walking distance of its own excellent food street on Jalan Perang &mdash; so you have two great food zones for the price of one stay. Book a Grab in the evening to catch Tepian Tebrau at sunset, or set an early alarm and head to Pasar Karat for a RM4 breakfast before the city wakes up.</p>

<h2>Final Tips for Eating Well in JB City Centre</h2>
<p>The golden rule in JB city centre is to eat where the locals eat, not where the menus have photos and English translations. If a stall has a queue of aunties with shopping bags, the food is good. Pay cash &mdash; most hawker stalls do not accept cards, though Touch 'n Go e-wallet is increasingly accepted at newer food courts like KOMTAR JBCC. Finally, eat early: the best heritage stalls at the Old Chinese Temple area open at 7am and close by 1pm when the good stuff runs out. Plan around that window and you will eat better in JB than almost anywhere in the region for under RM15 a meal.</p>
`,
		},
		{
			Slug:          "female-solo-travel-johor-bahru",
			Date:          "2026-08-06",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"solo-travel", "female-travel", "safety", "johor-bahru", "women-travelers", "budget-travel"},
			FeaturedImage: "/images/blog/female-solo-travel-johor-bahru.webp",
			ImageAlt:      "A street view of Johor Bahru city",
			Title:         "Solo Female Travel in Johor Bahru: Safety Guide & Honest Advice (2026)",
			Excerpt:       "Is JB safe for solo female travellers? Honest answer: yes, with the same common-sense precautions you'd use in any city. What to know about safety, transport, accommodation, and what to do.",
			Content: `<p>Johor Bahru gets a mixed reputation online &mdash; some travellers love it, others share horror stories. The reality for solo female travellers is more measured: JB is a functional, busy Malaysian city where millions of people live and move around safely every day. You do not need to be fearful, but you do need to be informed. This guide gives you the honest picture.</p>

<h2>Is Johor Bahru Safe for Solo Female Travellers?</h2>
<p>Generally yes &mdash; with the same street-smart habits you would apply in Kuala Lumpur, Bangkok, or any mid-size Southeast Asian city. Violent crime against tourists is rare. The risk profile is dominated by petty theft: phone snatching by motorcyclists (locally called <em>mat rempit</em>) is the single most reported incident. Keep your phone in a bag rather than your hand when walking, especially near roads. Do not walk while looking at your screen.</p>
<p>JB is not dangerous at night, but it is not uniformly lit or pedestrian-friendly either. Stick to commercial areas (City Square, KOMTAR JBCC, Jalan Wong Ah Fook, Jalan Dhoby) after dark. Avoid poorly lit back lanes and deserted carparks alone. This is the same common sense you would apply anywhere.</p>

<h2>Which Neighbourhood Should You Stay In?</h2>
<p>Taman Pelangi is one of the better choices for solo female travellers. It is a quiet, established residential neighbourhood &mdash; think leafy streets, kopitiam culture, and locals going about daily life rather than the hustle of the city centre. It sits about 8 minutes from JB Sentral by Grab, so you are connected without being in the thick of the noise.</p>
<p><strong>Pelangi Capsule Hostel</strong> is located at <strong>26A Jalan Perang, Taman Pelangi</strong>. The hostel is purpose-built for solo travellers and takes security seriously: 24/7 CCTV coverage throughout the property, keypad-only entry to the building and rooms, and each sleeping pod has its own locking sliding door so you have a genuinely private space within the shared dormitory. At <strong>RM35 per night</strong>, it is honest value for what you get. You are not just buying a bed &mdash; you are buying a controlled, secure environment where your belongings stay yours.</p>

<h2>How Do You Get Around JB Safely as a Solo Female Traveller?</h2>
<p>Use <strong>Grab exclusively</strong> for all point-to-point travel. Do not hail taxis off the street &mdash; unmetered taxis in JB have a long-standing reputation for overcharging and occasional intimidation of tourists. Grab solves this: fixed price, driver identity, GPS tracking, and a record of your ride in the app. The Grab app also offers a <strong>female driver preference option</strong> which you can select if you prefer.</p>
<p>Getting to Taman Pelangi from JB Sentral (the main train terminal connecting to Singapore KTM) costs roughly RM8&ndash;12 by Grab and takes about 8 minutes. From Queen Street Bus Terminal in Singapore, you would take the bus across the Causeway to JB Sentral, then Grab to the hostel &mdash; total journey around 60&ndash;90 minutes depending on Causeway immigration queues.</p>
<p><strong>Avoid crossing the Causeway alone on foot late at night.</strong> The walkway between Woodlands Checkpoint and JB Sentral is not dangerous per se, but it can be deserted after midnight, and immigration queues create situations where you may end up waiting in an underlit area alone. If you are coming back from Singapore late, take a bus service rather than crossing solo in the small hours.</p>

<h2>What Is the Culture Like for Women Travelling Alone?</h2>
<p>Malaysia is a moderate Muslim-majority country, and JB reflects that. As a solo female traveller &mdash; regardless of your background or religion &mdash; dressing modestly is both respectful and practically useful. You do not need to cover your hair or wear abayas. Modest here means covered shoulders and knees in most public settings, especially if you are visiting markets, food courts, or local neighbourhoods away from tourist-facing malls.</p>
<p>In practice: lightweight linen trousers or midi skirts work well in the heat. Carry a sarong or lightweight scarf in your bag &mdash; it doubles as sun protection and as a cover-up if you enter a mosque or traditional space.</p>
<p>Solo female travellers do not attract unusual attention in JB. You will be treated as any other customer in a restaurant, any other passenger in a Grab, any other guest at a hostel. Ask for directions and you will usually get a helpful response.</p>

<h2>What Should You Do in Johor Bahru?</h2>
<p>JB is often used as a day-trip base for Singapore, but it deserves more time than that. Here is what solo female travellers consistently enjoy:</p>
<ul>
<li><strong>KOMTAR JBCC and City Square Mall</strong> &mdash; two large malls in the city centre, air-conditioned, with food courts, pharmacies, and everything you might need. Good orientation points when you first arrive.</li>
<li><strong>Jalan Dhoby</strong> &mdash; a street lined with independent cafes, art spaces, and vintage shops. Walkable, low-key, and very photogenic without feeling manufactured.</li>
<li><strong>Pasar malam (night markets)</strong> &mdash; JB has several weekly night markets rotating through different neighbourhoods. Taman Pelangi has its own on Tuesdays. The food is the point: grilled corn, cendol, char kuey teow, satay. Arrive with small cash and eat your way through.</li>
<li><strong>Spa treatments</strong> &mdash; JB has a strong spa and reflexology culture, significantly cheaper than Singapore or KL. A 60-minute foot massage typically runs RM35&ndash;RM50. Many hostels, including Pelangi, can recommend nearby trusted spots.</li>
<li><strong>Day trips to Singapore</strong> &mdash; the Causeway crossing is straightforward. From Taman Pelangi, factor about 45&ndash;60 minutes to reach central Singapore.</li>
<li><strong>Tepian Tebrau waterfront</strong> &mdash; the Singapore Strait views from JB's waterfront are underrated. Good for an evening walk before dinner.</li>
</ul>

<h2>Is Street Food Safe to Eat Alone?</h2>
<p>Yes. Eating alone at Malaysian hawker centres and kopitiams is completely normal &mdash; you will see local women doing it every day. Sit anywhere there is a spare plastic chair. Most dishes are ordered at individual stalls and brought to your table. Point at what you want if the language is a barrier; most stall operators understand basic orders from tourists.</p>
<p>Taman Pelangi itself has several kopitiams within walking distance of the hostel. Ask staff at Pelangi for current recommendations &mdash; they know what is good and open at any given time better than any app does.</p>

<h2>Packing and Safety Tips for JB</h2>
<ul>
<li><strong>Keep your phone in your bag, not your hand.</strong> Phone snatching is the primary risk. A crossbody bag worn at the front is the practical solution.</li>
<li><strong>Carry small denominations of ringgit cash.</strong> Many hawker stalls and pasar malam vendors are cash-only. RM50&ndash;100 in small notes covers a day of food and transport comfortably.</li>
<li><strong>Download Grab before you land.</strong> Set up your payment method in advance. It works seamlessly in JB.</li>
<li><strong>Bring a small padlock.</strong> A TSA-approved padlock for your bag gives peace of mind in shared spaces, even with the hostel's secure pod doors.</li>
<li><strong>Modest clothing for hot weather.</strong> Linen, cotton, and moisture-wicking fabrics. Light colours. Covered shoulders and knees as a default.</li>
<li><strong>A lightweight scarf or sarong.</strong> Fits in any bag, serves multiple purposes.</li>
<li><strong>Portable charger.</strong> You will use Grab, Google Maps, and WhatsApp constantly. Keep your phone topped up.</li>
<li><strong>Share your location with someone.</strong> Tell a friend or family member your hostel name and address. Basic safety practice anywhere.</li>
<li><strong>Avoid the Causeway crossing after midnight alone.</strong> If plans run late in Singapore, take a reputable bus service rather than crossing solo in the small hours.</li>
</ul>

<h2>Where Should a Solo Female Traveller Stay in JB?</h2>
<p>Pelangi Capsule Hostel consistently works well for solo female travellers for three concrete reasons: the neighbourhood is quiet and residential rather than chaotic; the physical security (keypad entry, 24/7 CCTV, locking pod doors) is genuine rather than decorative; and at RM35 per night, the price point makes a longer stay in JB financially viable rather than just a rushed overnight.</p>
<p>The hostel is at <strong>26A Jalan Perang, Taman Pelangi, Johor Bahru</strong> &mdash; 8 minutes from JB Sentral by Grab, and within walking distance of kopitiams, a Tuesday night market, and quiet streets where you can sit outside in the evening without feeling exposed.</p>
<p>If your JB plans involve early Singapore crossings, late returns, or simply wanting a base you can trust while you figure out the city, <a href="/book">book a pod at Pelangi Capsule Hostel</a> &mdash; it covers what actually matters for a solo trip done right.</p>
`,
		},
		{
			Slug:          "singapore-to-johor-bahru-guide",
			Date:          "2026-08-06",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "8 min read",
			Tags:          []string{"singapore", "johor-bahru", "causeway", "transport", "budget-travel", "first-time", "travel-guide"},
			FeaturedImage: "/images/blog/singapore-to-johor-bahru-guide.webp",
			ImageAlt:      "The Singapore-Johor Causeway connecting Woodlands to Johor Bahru",
			Title:         "Singapore to Johor Bahru: The Complete First-Timer's Guide (2026)",
			Excerpt:       "First time crossing from Singapore to JB? Three transport options, SGD3.30 bus or RM8 Grab, what happens at immigration, where to stay, what to eat. Everything in one guide.",
			Content: `
<p>Johor Bahru is Singapore's closest neighbour and one of Southeast Asia's best-value city breaks &mdash; a short crossing away, yet most first-timers have no idea where to start. This guide answers every question a first-timer needs: how to get there, what happens at the border, where to stay, what to eat, and how to get around once you arrive. If you have never crossed to JB before, start here.</p>

<h2>Why Should I Go to Johor Bahru?</h2>
<p>JB offers Singaporean-quality food and shopping at Malaysian prices. A hawker meal costs RM5&ndash;8 (roughly SGD1.50&ndash;2.50). A decent hotel room runs RM120&ndash;200 per night; a capsule bed at <strong>Pelangi Capsule Hostel</strong> starts at <strong>RM35/night</strong>. Add duty-free petrol, cheap massages, good coffee, and a surprisingly vibrant street food scene, and JB punches well above its reputation.</p>
<ul>
<li><strong>Food:</strong> Dim sum, crab bee hoon, roti canai, seafood &mdash; all at a fraction of Singapore prices.</li>
<li><strong>Shopping:</strong> City Square Mall and KSL City Mall are steps from JB Sentral and CIQ.</li>
<li><strong>Leisure:</strong> LEGOLAND Malaysia, Danga Bay waterfront, escape rooms, and some of the best value spas in the region.</li>
<li><strong>Day trip or overnight:</strong> You can do JB in a day, but one night unlocks the evening hawker scene that most day-trippers miss.</li>
</ul>

<h2>How Do I Get from Singapore to Johor Bahru?</h2>
<p>There are three practical options for most travellers: the public bus (cheapest), a direct coach (most comfortable), or a cross-border Grab (fastest and most convenient). All three cross via the <strong>Johor&ndash;Singapore Causeway</strong> at Woodlands. Journey time is 30&ndash;90 minutes depending on traffic and border queue length.</p>

<table>
<thead>
<tr><th>Option</th><th>Cost (one-way)</th><th>Journey time</th><th>Best for</th></tr>
</thead>
<tbody>
<tr><td>Causeway Link CW1 (Kranji MRT &rarr; JB Sentral)</td><td>SGD3.30 (EZ-Link / contactless)</td><td>30&ndash;60 min</td><td>Budget travellers</td></tr>
<tr><td>MyLink / Handal direct coach (Queen Street &rarr; JB Sentral)</td><td>SGD5&ndash;8</td><td>45&ndash;75 min</td><td>Comfort, air-con seat, no MRT needed</td></tr>
<tr><td>Cross-border Grab (SG address &rarr; JB address)</td><td>SGD30&ndash;50</td><td>40&ndash;70 min</td><td>Groups, heavy luggage, door-to-door</td></tr>
<tr><td>KTM Shuttle Tebrau (Woodlands CIQ &rarr; JB Sentral)</td><td>SGD5 / RM5</td><td>5 min train ride</td><td>Avoiding the pedestrian Causeway walk</td></tr>
</tbody>
</table>

<h3>Option 1: Causeway Link CW1 Bus &mdash; SGD3.30</h3>
<p>Take the North-South MRT line to <strong>Kranji MRT</strong>. Exit and board <strong>Causeway Link CW1</strong> at the bus terminal directly outside the station. Pay SGD3.30 with your EZ-Link card, contactless Mastercard/Visa, or Apple/Google Pay. The bus crosses the Causeway, stops at Woodlands Checkpoint (Singapore immigration &mdash; everyone exits, clears passport control, re-boards), then delivers you to <strong>JB Sentral</strong> on the Malaysian side where you clear Malaysian immigration. This is the cheapest crossing available.</p>
<p><strong>Also available from Queen Street Bus Terminal</strong> (near Bugis MRT): SBS Transit <strong>bus 170</strong> and <strong>170X</strong> serve the same Causeway route at similar fares.</p>

<h3>Option 2: MyLink / Handal Direct Coach &mdash; SGD5&ndash;8</h3>
<p><strong>MyLink Express</strong> and <strong>Handal Indah</strong> run air-conditioned coaches from Queen Street Bus Terminal (adjacent to Bugis MRT, Exit A) directly to JB Sentral every 15&ndash;30 minutes. Cost is SGD5&ndash;8 one-way. Comfortable reclining seats; you still exit and clear immigration on both sides, but the experience is more relaxed than a standing city bus.</p>

<h3>Option 3: Cross-Border Grab &mdash; SGD30&ndash;50</h3>
<p>Grab operates a licensed cross-border service between Singapore and Johor. Book from your Singapore address; the driver handles both checkpoints. Cost is SGD30&ndash;50 depending on time of day. Worth it for families with children, heavy luggage, or late-night arrivals. Once you arrive in JB, you need a Malaysian-registered Grab account and a Malaysian SIM to book rides locally &mdash; see the Grab section below.</p>

<h2>What Happens at Immigration?</h2>
<p>Every crossing involves two immigration checkpoints &mdash; one on each side of the Causeway. Allow 20&ndash;60 minutes for both combined on a normal weekday; 60&ndash;120 minutes on Friday evenings, long weekends, and public holidays. Here is exactly what to expect:</p>
<ol>
<li><strong>Singapore Departure (Woodlands Checkpoint):</strong> Exit the bus or taxi, queue at Singapore passport control, scan your passport or Singapore IC, re-board. The queue here is usually faster than the Malaysian side.</li>
<li><strong>Malaysian Arrival (Sultan Iskandar CIQ, JB Sentral):</strong> Enter Malaysia via the arrivals hall. Tourist visitors from most countries get a 30-day or 90-day visa on arrival. Use the <strong>MyNIISe app</strong> (Malaysia's official immigration app, free download) to generate a QR code that clears your group at the autogate &mdash; significantly faster than queuing at a manual counter.</li>
<li><strong>After clearance:</strong> Exit the customs hall, connect to WiFi inside JB Sentral, buy a tourist SIM if needed, then book your onward transport via Grab.</li>
</ol>
<p><strong>Key tip:</strong> Download and register on MyNIISe before you leave Singapore. It stores your travel QR code offline so you don't need mobile data at the border.</p>

<h2>How Do I Get Around JB Once I Arrive?</h2>
<p><strong>Grab is the answer for almost everything.</strong> A ride from JB Sentral to Taman Pelangi (where most restaurants, cafes, and Pelangi Capsule Hostel are located) costs <strong>RM8&ndash;12 and takes 8 minutes</strong>. To use Grab in JB you need a Malaysian-registered account and a Malaysian phone number or data connection.</p>
<p>Tourist SIM cards are sold inside JB Sentral and City Square Mall. Celcom, Maxis, Digi, and U Mobile all have counters. A prepaid tourist SIM with 5&ndash;10 GB of data costs RM10&ndash;15 and activates in minutes. Buy one as your first stop after clearing customs &mdash; it unlocks Grab, Google Maps, and WhatsApp for your entire stay.</p>
<p><strong>Avoid unlicensed taxis.</strong> Drivers will approach you immediately after you exit customs offering rides at 3&ndash;5 times the proper fare. Walk past, connect to WiFi, and open Grab. If you genuinely need a taxi without a Malaysian SIM yet, use the <strong>official taxi counter</strong> inside JB Sentral &mdash; staffed, metered, and licensed.</p>

<h2>Where Should I Stay in JB?</h2>
<p>Taman Pelangi is the best neighbourhood for first-timers. It sits 8 minutes by Grab from JB Sentral (RM8&ndash;12), surrounded by hawker centres, independent cafes, and local restaurants, with easy access to City Square Mall and the waterfront.</p>
<p><strong>Pelangi Capsule Hostel</strong> is located at <strong>26A Jalan Perang, Taman Pelangi</strong>. Capsule beds start at <strong>RM35/night</strong> &mdash; private capsule pod, air conditioning, reading light, personal locker, hot shower, and fast WiFi. It is the most cost-effective base in JB for solo travellers and backpackers. <a href="/book">Check availability and book direct</a> (no booking fee).</p>

<h2>What Should I Eat in Johor Bahru?</h2>
<p>JB has its own distinct food identity, separate from KL and Singapore. Johorean cuisine leans on rich spice pastes, coconut, and fresh seafood. Here is what to prioritise on a first visit:</p>
<ul>
<li><strong>Mee bandung Muar</strong> &mdash; thick yellow noodles in a prawn-and-beef-based red gravy, a Johor signature. Find it at hawker stalls around Jalan Tan Hiok Nee.</li>
<li><strong>Roti canai and teh tarik</strong> &mdash; RM2&ndash;3 at any mamak open 24 hours. JB mamaks are often better than their Singapore counterparts and less than half the price.</li>
<li><strong>Otak-otak</strong> &mdash; spiced fish paste grilled in banana leaf. RM1&ndash;1.50 per piece at most hawker centres.</li>
<li><strong>Dim sum on a Sunday morning</strong> &mdash; Taman Pelangi has multiple dim sum shops that fill up by 8 AM. Arrive early or expect a queue.</li>
<li><strong>Seafood at Danga Bay</strong> &mdash; chilli crab, butter prawn, and steamed fish at about a third of Singapore prices.</li>
</ul>
<p>Budget for food: RM25&ndash;50 per day eating hawker and kopitiam. You would spend that on one meal in Singapore.</p>

<h2>Is JB Safe for First-Timers?</h2>
<p>JB is safe for tourists exercising normal city caution. The city's rough reputation in some Singaporean circles reflects conditions from ten-plus years ago, not today's reality. A few specific precautions apply:</p>
<ul>
<li><strong>Phone snatching:</strong> Keep your phone in your pocket when walking on quieter streets. In cafes and hawker centres, you are fine.</li>
<li><strong>Transport scams:</strong> The only consistent tourist trap is the unlicensed taxi at CIQ. Use Grab and the official taxi counter exclusively.</li>
<li><strong>Drugs:</strong> Malaysia has mandatory minimum sentences for drug possession and trafficking. Zero tolerance, no exceptions for tourists.</li>
</ul>

<h2>When Is the Best Time to Cross?</h2>
<p>Avoid <strong>Friday 5&ndash;9 PM</strong> (SG to JB) and <strong>Sunday 3&ndash;9 PM</strong> (JB back to SG). These windows regularly produce 60&ndash;120-minute queues. Weekday mornings and any crossing after 10 PM are significantly faster &mdash; often clearing both checkpoints in under 20 minutes.</p>

<h2>First-Timer's Checklist</h2>
<ul>
<li>Download <strong>MyNIISe</strong> and register before leaving Singapore</li>
<li>Charge your EZ-Link card or enable contactless payment for the CW1 bus</li>
<li>Buy a Malaysian tourist SIM at JB Sentral immediately after clearing customs (RM10&ndash;15)</li>
<li>Carry ringgit cash &mdash; RM100&ndash;200 covers a full day; money changers at People's Park Complex in Singapore often beat Changi rates</li>
<li>Do not book taxis from anyone who approaches you unprompted at CIQ</li>
<li>If staying overnight: <a href="/book">book Pelangi Capsule Hostel direct</a> at RM35/night, 8 minutes from JB Sentral by Grab</li>
</ul>

<p>JB is one of the easiest international crossings in the world once you know the steps. The logistics are manageable, the value is real, and the food alone justifies the trip. Cross once and you will understand why so many Singaporeans make it a monthly habit.</p>
`,
		},
		// --- Indonesian transit workers (BI) ---
		{
			Slug:          "menginap-murah-jb-pekerja-indonesia-batam",
			Date:          "2026-08-07",
			LastModified:  "2026-08-07",
			InLanguage:    "id",
			AlternateEN:   "monthly-stay-capsule-hostel-jb-workers-interns-2026",
			Title:         "Menginap Murah di Johor Bahru untuk Orang Indonesia dari Batam — Panduan Praktis 2026",
			Excerpt:       "Bolak-balik Batam–JB atau sedang cari kerja di Malaysia? Panduan lengkap rute feri, biaya hidup hemat, dan kenapa capsule hostel di Taman Pelangi jadi pilihan paling cerdas.",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"johor-bahru", "indonesia", "batam", "pekerja-indonesia", "budget-travel", "feri-batam-jb", "menginap-murah"},
			FeaturedImage: "/images/blog/menginap-murah-jb-pekerja-indonesia-batam.webp",
			ImageAlt:      "Terminal Feri Batam Centre, titik keberangkatan feri ke Johor Bahru dan Singapura",
			Content: `
<p>Bagi banyak orang Indonesia, Johor Bahru bukan sekadar kota tujuan wisata. JB adalah batu loncatan — tempat singgah sebelum ke Singapura, kota tempat melamar kerja, atau tujuan sementara sambil menunggu izin kerja keluar. Kalau kamu sering bolak-balik antara Batam dan JB, atau baru tiba dan belum tahu mau menginap di mana, panduan ini dibuat khusus untuk situasimu.</p>

<h2>Kenapa JB Jadi Pilihan Banyak Orang Indonesia?</h2>
<p>JB menawarkan kombinasi langka: biaya hidup jauh lebih murah dari Singapura, tapi infrastruktur dan fasilitas tetap modern. Dari Batam, kamu bisa mencapai JB dalam <strong>45–60 menit</strong> naik feri langsung — tanpa harus transit di Singapura. Begitu tiba, kamu akan menemukan kota yang fasih berbahasa Melayu, banyak masjid, makanan halal di mana-mana, dan komunitas Indonesia yang cukup besar.</p>
<ul>
  <li><strong>Makanan:</strong> Nasi campur mulai RM5, roti canai RM2, teh tarik RM2. Kalau dirupiahkan, jauh lebih terjangkau dari Jakarta.</li>
  <li><strong>Transport:</strong> Grab tersedia 24 jam, ongkos rata-rata RM8–15 untuk dalam kota.</li>
  <li><strong>Bahasa:</strong> Melayu Malaysia dan Bahasa Indonesia sangat mirip — kamu tidak akan bingung berkomunikasi.</li>
  <li><strong>Posisi strategis:</strong> JB berbatasan langsung dengan Singapura. Kalau akhirnya kamu dapat kerja di SG, tetap bisa tinggal di JB dan commutte harian.</li>
</ul>

<h2>Rute Feri dari Batam ke Johor Bahru</h2>
<p>Rute tercepat dan termurah dari Batam ke JB adalah feri langsung dari <strong>Batam Centre Ferry Terminal</strong> ke <strong>Stulang Laut Ferry Terminal (JB International Ferry Terminal)</strong>. Dua operator utama melayani rute ini:</p>
<ul>
  <li><strong>Batam Fast Ferry</strong> — armada feri cepat, waktu tempuh sekitar <strong>45–55 menit</strong>. Tersedia beberapa jadwal per hari. Harga tiket berkisar <strong>RM35–45 satu arah</strong> (setara IDR 110.000–145.000 kurs 2026).</li>
  <li><strong>Sindo Ferry</strong> — alternatif dengan jadwal berbeda, harga serupa.</li>
</ul>
<p>Alternatif lain: naik feri dari Batam ke Harbourfront Singapura, lalu menyeberang ke JB via bus CW1 Causeway Link (RM2.70 dari Woodlands). Rute ini lebih panjang dan butuh lebih banyak cap di paspor, tapi bisa jadi pilihan jika jadwal feri langsung tidak cocok.</p>
<p><strong>Tips penting:</strong> Pastikan paspormu masih berlaku minimal 6 bulan. Bawa dokumen perjalanan dan, jika ada, surat penawaran kerja atau referensi. Imigrasi Malaysia berhak menanyakan tujuan kunjungan dan dana yang dibawa.</p>

<h2>Dari Stulang Laut ke Taman Pelangi</h2>
<p>Begitu turun dari feri dan melewati imigrasi di Stulang Laut, langkah berikutnya adalah menuju tempat menginap. <strong>Pelangi Capsule Hostel</strong> di Taman Pelangi berjarak sekitar <strong>15–20 menit</strong> dari terminal dengan Grab, ongkos <strong>RM10–15</strong>. Buka aplikasi Grab — nomor Indonesia aktif di Malaysia selama roaming — dan pesan langsung dari area parkir terminal.</p>
<p>Jangan ambil taksi liar yang sering menawarkan diri di depan terminal. Gunakan Grab atau konter taksi resmi di dalam terminal.</p>

<h2>Perbandingan Biaya Hidup: JB vs Batam</h2>
<p>Salah satu alasan JB menarik bagi orang Indonesia adalah biaya hidupnya yang relatif terjangkau dibanding gajinya jika bekerja di sektor formal Malaysia atau Singapura.</p>
<table>
  <thead><tr><th>Kebutuhan</th><th>JB (Ringgit)</th><th>Perkiraan IDR</th></tr></thead>
  <tbody>
    <tr><td>Capsule hostel / malam</td><td>RM 35</td><td>~IDR 115.000</td></tr>
    <tr><td>Makan 3x sehari (hawker)</td><td>RM 20–30</td><td>~IDR 65.000–100.000</td></tr>
    <tr><td>Transport dalam kota (Grab)</td><td>RM 10–20</td><td>~IDR 33.000–65.000</td></tr>
    <tr><td>SIM card lokal (10 GB)</td><td>RM 15</td><td>~IDR 50.000</td></tr>
    <tr><td>Total per hari (hemat)</td><td><strong>RM 75–80</strong></td><td>~IDR 245.000–260.000</td></tr>
  </tbody>
</table>
<p>Untuk tinggal jangka panjang, <strong>paket mingguan atau bulanan</strong> di Pelangi Capsule Hostel jauh lebih hemat dari sewa kamar harian. Hubungi kami langsung untuk harga khusus monthly stay.</p>

<h2>Kenapa Capsule Hostel Lebih Cerdas dari Kamar Hotel atau Kost</h2>
<p>Banyak orang Indonesia yang baru tiba di JB langsung mencari kost bulanan — tapi ini justru sering menjadi pilihan yang kurang efisien di awal. Berikut perbandingannya:</p>
<ul>
  <li><strong>Kost bulanan:</strong> Deposit 1–2 bulan di awal, minimal komitmen 3 bulan, lokasi tidak selalu strategis, tidak termasuk kebersihan.</li>
  <li><strong>Hotel budget:</strong> Lebih mahal per malam dari capsule, tidak ada komunitas, tidak ada loker aman.</li>
  <li><strong>Capsule hostel (Pelangi):</strong> RM35/malam atau lebih murah per minggu/bulan, <em>no deposit</em>, bisa check-out kapan saja, WiFi cepat, loker personal bergembok, AC, kamar mandi bersih. Cocok untuk yang belum pasti berapa lama akan berada di JB.</li>
</ul>
<p>Posisi Pelangi di Taman Pelangi juga strategis: dekat dengan pusat bisnis JB, mudah ke JB Sentral (stasiun KTM ke KL), dan hanya 8 menit Grab ke CIQ untuk kembali ke Singapura atau Stulang Laut.</p>

<h2>Soal Izin Tinggal: Social Visit Pass Malaysia</h2>
<p>Warga negara Indonesia yang masuk Malaysia melalui pintu imigrasi resmi mendapatkan <strong>Social Visit Pass (izin kunjungan sosial)</strong> — stempel di paspor yang mengizinkan tinggal hingga <strong>30 hari</strong> tanpa biaya. Ini berlaku untuk masuk ke Malaysia via jalur darat, udara, maupun laut, termasuk feri dari Batam.</p>
<p>Beberapa hal penting yang perlu kamu ketahui:</p>
<ul>
  <li>Social Visit Pass <strong>tidak mengizinkan bekerja secara formal</strong> di Malaysia. Untuk bekerja secara legal, diperlukan Visa Pekerjaan (Employment Pass, Work Permit, dll.) yang diproses oleh majikan.</li>
  <li>Pass ini bisa diperbarui dengan cara <strong>keluar dan masuk kembali ke Malaysia</strong> (exit-reentry), misalnya menyeberang ke Singapura sebentar lalu kembali ke JB.</li>
  <li>Jika kamu sedang dalam proses melamar kerja dan menunggu izin resmi diproses, pastikan selalu memperpanjang pass-mu sebelum habis masa berlakunya.</li>
</ul>
<p>Rekomendasi: selalu jujur kepada petugas imigrasi mengenai tujuanmu. Menyembunyikan informasi atau memberikan keterangan palsu bisa berakibat penolakan masuk atau larangan kembali ke Malaysia.</p>

<h2>Tips Mencari Kerja Legal di Malaysia dari JB</h2>
<p>JB memiliki kawasan industri yang cukup besar (Pasir Gudang, Senai, Nusajaya/Iskandar Puteri) dengan permintaan tenaga kerja di bidang manufaktur, logistik, konstruksi, dan jasa. Beberapa langkah yang bisa kamu lakukan:</p>
<ol>
  <li><strong>Daftar di Jobstreet atau Maukerja</strong> — dua platform rekrutmen terbesar di Malaysia. Filter lokasi ke "Johor Bahru".</li>
  <li><strong>Hubungi agen tenaga kerja berlisensi</strong> — pastikan agen terdaftar di Jabatan Tenaga Kerja Malaysia (JTK). Hindari agen tidak resmi yang meminta biaya rekrutmen besar di muka.</li>
  <li><strong>Manfaatkan jaringan komunitas</strong> — ada grup Facebook dan WhatsApp komunitas Indonesia di JB yang sering share info lowongan dan tips birokrasi.</li>
  <li><strong>Siapkan dokumen dari awal</strong> — ijazah, transkrip nilai, sertifikasi keahlian, dan riwayat kerja. Terjemahkan ke Bahasa Malaysia atau Inggris jika perlu.</li>
</ol>

<h2>Pelangi Capsule Hostel — Base Camp Terbaik di JB</h2>
<p>Apapun tujuanmu di JB — transit, cari kerja, atau sekadar eksplorasi kota — <strong>Pelangi Capsule Hostel</strong> menyediakan tempat yang aman, nyaman, dan terjangkau. Lokasinya di <strong>26A Jalan Perang, Taman Pelangi</strong>, mudah dijangkau dari mana saja di JB.</p>
<p>Fasilitas yang kamu dapat: kapsul pribadi ber-AC, loker personal dengan kunci, WiFi cepat, kamar mandi bersih, dan area dapur bersama. Tidak perlu deposit besar atau komitmen kontrak panjang.</p>
<p><a href="/book">Pesan langsung di sini</a> — tidak ada biaya booking tambahan.</p>

<h2>Sumber &amp; Referensi</h2>
<ul>
  <li><strong>Jadwal &amp; rute feri Batam–JB:</strong> <a href="https://www.batamfast.com" rel="noopener noreferrer" target="_blank">Batam Fast Ferry (batamfast.com)</a> — operator feri resmi rute Batam Centre–Stulang Laut JB.</li>
  <li><strong>Social Visit Pass Malaysia:</strong> <a href="https://www.imi.gov.my/index.php/en/main-services/pas-lawatan-sosial.html" rel="noopener noreferrer" target="_blank">Jabatan Imigresen Malaysia (imi.gov.my)</a> — ketentuan resmi izin kunjungan sosial bagi WNA.</li>
  <li><strong>Pencarian kerja di Malaysia:</strong> <a href="https://www.jobstreet.com.my" rel="noopener noreferrer" target="_blank">Jobstreet Malaysia</a> — platform rekrutmen terbesar di Malaysia.</li>
  <li><strong>Agen tenaga kerja berlisensi:</strong> <a href="https://ejtk.mohr.gov.my" rel="noopener noreferrer" target="_blank">Jabatan Tenaga Kerja Semenanjung Malaysia (ejtk.mohr.gov.my)</a> — direktori agen resmi.</li>
</ul>
`,
		},
		// 85 — scheduled: goes live 2026-08-08
		{
			Slug:          "johor-zoo-guide-budget-travellers",
			Title:         "Johor Zoo Guide: Tickets, Tips &amp; What to Expect in 2026",
			Excerpt:       "One of Southeast Asia's oldest zoos, recently renovated and reopened — here is how to visit, what it costs, and how to pair it with a budget stay in JB.",
			Date:          "2026-08-08",
			Category:      "Attractions",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-zoo", "johor-bahru", "attractions", "budget-travel", "wildlife", "family", "day-trip"},
			FeaturedImage: "/images/blog/johor-zoo-guide-budget-travellers.webp",
			ImageAlt:      "The entrance to Zoo Johor in Johor Bahru",
			InLanguage:    "en",
			Content: `
<p>Johor Zoo — locally known as <strong>Zoo Johor</strong> — is one of the oldest public zoos in Malaysia, established in 1928. After closing for an extensive multi-year renovation, it has reopened with upgraded enclosures and improved visitor facilities, making it one of the most accessible family and budget attractions in Johor Bahru. At under RM15 for adult entry, it offers strong value for solo travellers, families, and anyone wanting a half-day break from JB's malls and food streets.</p>

<h2>Where Is Johor Zoo?</h2>
<p>Johor Zoo is located at <strong>Jalan Gertak Merah, Johor Bahru</strong>, approximately 2 km from JB Sentral and 3 km from JB City Square. From Taman Pelangi, the most convenient option is Grab — typically RM6–10 and 10–15 minutes depending on traffic. There is no direct city bus route from Taman Pelangi to the zoo, so Grab or a private vehicle is practical for most visitors.</p>

<h2>Opening Hours and Tickets</h2>
<p>Johor Zoo is typically open from <strong>9 AM to 5 PM daily</strong>, including public holidays. Ticket counters usually close one hour before closing time. Admission prices as of 2026:</p>
<ul>
  <li><strong>Adults (Malaysian):</strong> RM8</li>
  <li><strong>Adults (Foreign visitors):</strong> RM12–15</li>
  <li><strong>Children (Malaysian):</strong> RM4</li>
  <li><strong>Children (Foreign visitors):</strong> RM6–8</li>
</ul>
<p>Confirm current prices at the zoo entrance or via the Johor Tourism Board website, as rates may be updated seasonally. Cash and card payments are both accepted at the ticket counter.</p>

<h2>What You Will See</h2>
<p>Johor Zoo covers approximately 12.5 hectares and houses over 100 animal species, including Malayan tigers, sun bears, orangutans, giraffes, meerkats, reptiles, and a wide variety of bird species. The renovated enclosures are notably more naturalistic than the previous setup, with wider walking paths and shaded rest areas. The zoo is compact enough to cover in two to three hours at a relaxed pace.</p>

<p>Feeding sessions for select animals occur at scheduled times throughout the day — check the board at the entrance for the day's schedule when you arrive.</p>

<h2>Best Time to Visit</h2>
<p>Morning is the best time to visit for animal activity. Most animals are more alert before 11 AM; by early afternoon in Malaysian heat, many retreat to shaded spots. Aim to arrive by <strong>9 AM or 10 AM</strong> to cover the zoo before the midday sun peaks. Weekday mornings are significantly less crowded than weekends.</p>

<h2>What to Bring</h2>
<ul>
  <li><strong>Water:</strong> The zoo has drink stalls, but bringing a refillable bottle saves money and keeps you hydrated in the tropical heat.</li>
  <li><strong>Sunscreen and a hat:</strong> Several sections have minimal shade.</li>
  <li><strong>Light rain jacket:</strong> Afternoon showers are common in JB year-round.</li>
  <li><strong>Comfortable walking shoes:</strong> The zoo involves uneven ground and moderate walking distances.</li>
</ul>

<h2>Pairing Johor Zoo with a Half-Day in JB</h2>
<p>Johor Zoo works well as a morning activity before heading to lunch at one of JB's hawker centres. From the zoo, Grab to <strong>Jalan Wong Ah Fook</strong> or <strong>Pasar Larkin</strong> takes around 10–15 minutes and puts you within range of JB's most accessible street food. For a full day around the area, combine with a visit to the <strong>Sultan Abu Bakar State Mosque</strong> (5 minutes away by Grab) or <strong>Istana Besar royal museum</strong> (10 minutes).</p>

<h2>Where to Stay Near Johor Zoo</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi is one of JB's most convenient bases for visiting the zoo. At <strong>RM35/night</strong> for a private capsule pod, you get air-conditioning, a personal locker, free WiFi, and a shared kitchen — all within a 10-minute Grab ride of the zoo and walking distance of Taman Pelangi's Tuesday night market. Long-stay rates start from RM600/month with no deposit required.</p>

<p><a href="/book">Book your stay at Pelangi Capsule Hostel</a> — direct booking, no OTA fees, best rate guaranteed.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Johor Zoo suitable for solo travellers?</h3>
<p>Yes. The zoo is well-signposted in English and Malay, compact enough to navigate independently, and open to individual visitors without a tour group. Solo travellers can complete the circuit in 1.5–2 hours if moving at pace.</p>

<h3>Can I buy tickets online?</h3>
<p>Walk-in tickets are always available at the entrance. Check the Johor Tourism Board or Zoo Johor's official channels for online booking options — availability varies seasonally.</p>

<h3>Is the zoo accessible for wheelchair users or visitors with mobility needs?</h3>
<p>The renovated zoo has smoother pathways than the previous layout, but some sections involve inclines and uneven ground. Contact the zoo directly before visiting if accessibility is a concern.</p>
`,
		},
		// 86 — scheduled: goes live 2026-08-09
		{
			Slug:          "sultan-abu-bakar-mosque-johor-bahru-visitor-guide",
			Title:         "Sultan Abu Bakar State Mosque: Johor Bahru's Landmark Visitor Guide",
			Excerpt:       "JB's most iconic building sits on a hill above the Strait of Johor. Here is how to visit, what to wear, when to go, and what to see inside.",
			Date:          "2026-08-09",
			Category:      "Attractions",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"sultan-abu-bakar-mosque", "johor-bahru", "attractions", "mosque", "heritage", "culture", "budget-travel"},
			FeaturedImage: "/images/blog/sultan-abu-bakar-mosque-johor-bahru-visitor-guide.webp",
			ImageAlt:      "The Sultan Abu Bakar State Mosque, Johor Bahru's landmark waterfront mosque",
			InLanguage:    "en",
			Content: `
<p>The <strong>Sultan Abu Bakar State Mosque</strong> (Masjid Negeri Sultan Abu Bakar) is Johor Bahru's most recognisable landmark. Built between 1892 and 1900 during the reign of Sultan Abu Bakar, it combines Victorian and Moorish architectural styles in a way that is unlike any other mosque in Malaysia — white minarets, blue-tiled domes, and arched colonnades set on a hilltop overlooking the Strait of Johor and Singapore's Woodlands beyond. Entry is free for visitors, and it remains one of JB's most rewarding stops for anyone with an interest in architecture or Islamic heritage.</p>

<h2>Location and Getting There</h2>
<p>The mosque is located at <strong>Jalan Skudai, Johor Bahru</strong>, approximately 1.5 km from JB Sentral. From Taman Pelangi, Grab takes around 10–12 minutes and costs RM6–9. There is no convenient walking route from the city centre due to the hill approach, so Grab or a private vehicle is practical. Ask the driver to drop you at the mosque's main gate on Jalan Skudai — Google Maps handles this destination accurately.</p>

<h2>Opening Hours for Visitors</h2>
<p>The mosque is open to non-Muslim visitors during specific hours when prayers are not in session:</p>
<ul>
  <li><strong>Saturday to Thursday:</strong> 9 AM–12 PM and 2:30 PM–5 PM</li>
  <li><strong>Friday:</strong> Closed to non-Muslim visitors (Friday prayers)</li>
  <li><strong>During prayer times (all days):</strong> Closed to visitors — typically 5 times daily</li>
</ul>
<p>These times are guidelines; check current schedules with the mosque's management on arrival. Public holidays and Ramadan observance may affect access.</p>

<h2>Dress Code</h2>
<p>Modest dress is required for all visitors entering the mosque grounds and building:</p>
<ul>
  <li>Shoulders and knees must be covered</li>
  <li>Women must wear a headscarf inside the prayer hall — scarves are typically available to borrow at the entrance</li>
  <li>Shoes must be removed before entering the prayer hall</li>
  <li>Tight-fitting or revealing clothing is not permitted</li>
</ul>
<p>The mosque provides robes and headscarves for visitors who arrive without appropriate clothing. This service is usually free or available for a small deposit.</p>

<h2>What to See</h2>
<p>The mosque's exterior is the primary draw for most visitors — the contrast of the white Victorian façade with the blue-green Strait of Johor in the background makes it one of the most photographed views in Malaysia. The best light for photography is early morning, when the sun hits the white walls without harsh midday glare. From the hilltop, Singapore's Woodlands and the industrial skyline of Jurong Island are visible on a clear day.</p>

<p>Inside the main prayer hall, the ornate plasterwork, stained glass, and Italian marble floors reflect the eclectic colonial-era influences. The hall can accommodate up to 2,000 worshippers and is one of the largest prayer spaces in Johor.</p>

<h2>Combining with Nearby Attractions</h2>
<p>The Sultan Abu Bakar State Mosque pairs well with <strong>Istana Besar</strong> (the Royal Museum of Johor), which is a 5-minute Grab ride away on Jalan Tun Dr Ismail. Both sites can be covered in a half-day heritage circuit. From there, the old waterfront area along <strong>Jalan Meldrum</strong> has several kopitiam and local food options for lunch. The <strong>Johor Bahru Old Chinese Temple</strong> is approximately 10 minutes by Grab for a full multi-faith heritage day.</p>

<h2>Is There an Entrance Fee?</h2>
<p>Entry to the mosque and its grounds is free for all visitors. A small optional donation to the mosque's welfare fund is appreciated but not required.</p>

<h2>Where to Stay in JB</h2>
<p>Taman Pelangi — where <a href="/rooms">Pelangi Capsule Hostel</a> is located — puts you within a short Grab ride of the mosque and all of JB's major heritage sites. Capsule pods start at <strong>RM35/night</strong> with free WiFi, private lockers, and 24/7 self check-in. For longer stays, monthly rates start from RM600 with no deposit.</p>

<p><a href="/book">Book at Pelangi Capsule Hostel</a> — direct booking, no fees, best rate guaranteed.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can non-Muslims visit Sultan Abu Bakar State Mosque?</h3>
<p>Yes. Non-Muslim visitors are welcome during designated visiting hours outside of prayer times. Respectful behaviour and modest dress are required throughout the visit.</p>

<h3>How long does a visit take?</h3>
<p>Most visitors spend 30–60 minutes at the mosque — time for exterior photos, exploring the grounds, and a look inside the prayer hall. Allow more time if you want unhurried photography of the Strait views.</p>

<h3>Can I visit on a Friday?</h3>
<p>The mosque is closed to non-Muslim visitors on Fridays due to Friday prayers. Plan your visit for any other day of the week.</p>
`,
		},
		// 87 — scheduled: goes live 2026-08-10
		{
			Slug:          "glass-temple-johor-bahru-visitor-guide",
			Title:         "Arulmigu Sri Rajakaliamman Glass Temple: JB's Unique Hindu Landmark",
			Excerpt:       "JB's Glass Temple is one of a kind in Malaysia — every interior surface is tiled with coloured glass. Here is how to visit, what it costs, and what makes it worth the trip.",
			Date:          "2026-08-10",
			Category:      "Attractions",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"glass-temple", "johor-bahru", "attractions", "hindu-temple", "heritage", "culture", "budget-travel"},
			FeaturedImage: "/images/blog/glass-temple-johor-bahru-visitor-guide.webp",
			ImageAlt:      "The Arulmigu Sri Rajakaliamman Glass Temple in Johor Bahru, decorated with mosaic glass",
			InLanguage:    "en",
			Content: `
<p>The <strong>Arulmigu Sri Rajakaliamman Glass Temple</strong> in Johor Bahru is one of Malaysia's most visually arresting religious sites. Dedicated to Goddess Kaliamman, the temple's entire interior — walls, pillars, ceilings, and altar surrounds — is covered in millions of pieces of coloured glass mosaic. The effect is kaleidoscopic and genuinely unlike any other temple in Southeast Asia. Entry costs a few ringgit and takes around 30 minutes, making it one of JB's most rewarding quick stops.</p>

<h2>Location</h2>
<p>The temple is located at <strong>Jalan Tan Hiok Nee, Johor Bahru</strong>, in the heart of JB's heritage district, a short walk from Jalan Wong Ah Fook and approximately 1 km from JB City Square. From Taman Pelangi, Grab takes around 10–12 minutes and costs RM6–10. The temple is walkable from JB Sentral if you enjoy a 15–20 minute walk through the older parts of the city centre.</p>

<h2>Opening Hours and Entry Fee</h2>
<p>The temple is typically open to visitors from <strong>8 AM to noon and 4 PM to 8 PM daily</strong>. Entry includes a small fee of approximately <strong>RM3–5</strong> for adults (check at the gate, as fees may be updated). Photography inside is permitted with respectful behaviour — the temple management actively welcomes visitors and tourists.</p>

<h2>What Makes It Unique</h2>
<p>Most Hindu temples feature intricate painted sculptures and carved gopurams. The Sri Rajakaliamman temple took a different approach: beginning in the 1990s, the community began covering every interior surface with hand-set glass tiles in jewel-toned colours — blue, green, gold, red, and white. The process took years and continues to be refined. The result is that even at midday, when natural light enters through coloured glass panels, the interior glows.</p>

<p>The temple is dedicated to Goddess Kaliamman, a form of the goddess Kali worshipped primarily by Tamil Hindus. It serves as an active place of worship for JB's Indian community, not just a tourist attraction — visitors are asked to behave respectfully, remove shoes, and speak quietly inside.</p>

<h2>What to Wear</h2>
<p>Modest dress is required:</p>
<ul>
  <li>Shoulders and knees should be covered</li>
  <li>Remove shoes before entering the main hall</li>
  <li>Avoid wearing leather items inside the main sanctuary (temple etiquette)</li>
</ul>
<p>Sarongs are sometimes available to borrow at the entrance for visitors who need one.</p>

<h2>Best Time to Visit</h2>
<p>Morning visits (8–11 AM) catch the best light inside the temple and are less crowded. The temple can be busy during Hindu festival periods — <strong>Thaipusam</strong>, <strong>Deepavali</strong>, and <strong>Aadi Perukku</strong> — when devotional activity peaks and the atmosphere is more immersive. Visiting during a festival is not problematic for tourists, but expect larger crowds and more restricted photography access near the main altar during active puja.</p>

<h2>Combining with Nearby Attractions</h2>
<p>The Glass Temple is located near <strong>Tan Hiok Nee Heritage Street</strong> — JB's most photogenic colonial shophouse row, now home to independent cafes, vintage shops, and street art. From there, the <strong>Johor Bahru Old Chinese Temple</strong> is a 5-minute walk, and <strong>Jalan Wong Ah Fook</strong>'s hawker food stalls are within easy reach for lunch. This heritage district can be covered on foot in a relaxed half-day.</p>

<h2>Where to Stay in JB</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi is a 10-minute Grab ride from the Glass Temple district. Private capsule pods from <strong>RM35/night</strong> with free WiFi, personal locker, and 24/7 self check-in. Monthly stays available from RM600 with no deposit.</p>

<p><a href="/book">Book directly at pelangicapsulehostel.com</a> — no OTA fees, best rate guaranteed.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can non-Hindus visit the Glass Temple?</h3>
<p>Yes. The temple actively welcomes visitors of all backgrounds. Respectful behaviour, modest dress, and removing shoes before entry are the main requirements.</p>

<h3>Is photography allowed?</h3>
<p>Photography inside the temple is generally permitted for personal use. Flash photography near the main altar during active worship should be avoided. Ask the temple attendants if you are unsure.</p>

<h3>How long does a visit take?</h3>
<p>Most visitors spend 20–40 minutes inside. The temple is compact, but the detailed glasswork rewards slow looking.</p>
`,
		},
		// 88 — scheduled: goes live 2026-08-11
		{
			Slug:          "pasar-karat-jb-flea-market-guide",
			Title:         "Pasar Karat JB: Johor Bahru's Flea Market Guide for Travellers",
			Excerpt:       "Open six nights a week from 6 PM to 2 AM, Pasar Karat is JB's most eclectic night market — vintage goods, street food, local snacks, and genuine bargains.",
			Date:          "2026-08-11",
			Category:      "Food &amp; Markets",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"pasar-karat", "johor-bahru", "night-market", "flea-market", "budget-travel", "food", "shopping"},
			FeaturedImage: "/images/blog/pasar-karat-jb-flea-market-guide.webp",
			ImageAlt:      "Karat Market, a Malaysian night flea market similar to Pasar Karat in Johor Bahru",
			InLanguage:    "en",
			Content: `
<p><strong>Pasar Karat</strong> (literally "rust market" in Malay — a reference to the antique and second-hand goods sold here) is one of JB's most distinctive night markets. Operating six nights a week from 6 PM to 2 AM, it draws a mix of locals hunting for bargains, visitors looking for something beyond mall shopping, and collectors seeking vintage electronics, old coins, retro cameras, and odds and ends you cannot find at any other market in the city. The food section alone makes it worth a visit.</p>

<h2>Location</h2>
<p>Pasar Karat is located at <strong>Jalan Serampang, Johor Bahru</strong>, in the JB city centre area near the older shophouse district. From Taman Pelangi, Grab costs approximately RM8–12 and takes 10–15 minutes. It is also accessible via the public bus network — ask your hostel for the nearest stop — though Grab is more direct after dark.</p>

<h2>Opening Days and Hours</h2>
<p>Pasar Karat operates <strong>Tuesday through Sunday, 6 PM to 2 AM</strong>. It is closed on Mondays. The market is livelier on Thursday through Saturday evenings, when the vendor density is highest and the crowds are thicker. Arriving between 7 PM and 9 PM hits the sweet spot: vendors are fully set up, the street food is fresh, and it is not yet uncomfortably crowded.</p>

<h2>What You Will Find</h2>

<h3>Vintage and Second-Hand Goods</h3>
<p>The "rust market" reputation comes from this section: old coins, stamps, postcards, vintage watches, retro electronics (cassette players, old phones, transistor radios), second-hand books in multiple languages, antique kerosene lamps, and genuine odds and ends that resist categorisation. Quality varies widely — some stalls have authentic collectibles, others have reproduction pieces. Haggling is expected and generally friendly.</p>

<h3>Street Food</h3>
<p>The food section at Pasar Karat is substantial and worth the visit in its own right. Expect:</p>
<ul>
  <li>Char kway teow and fried rice from wok stalls</li>
  <li>Rojak (Malaysian fruit and vegetable salad with peanut-shrimp sauce)</li>
  <li>Satay — chicken and beef skewers with peanut dipping sauce</li>
  <li>Apam balik (thick peanut pancakes) and other Malay kuih</li>
  <li>Chilled coconut water and fresh-cut fruit</li>
  <li>Noodle soups from push-cart vendors</li>
</ul>
<p>Most food items cost RM3–8. Bring small notes (RM1, RM5, RM10) — many food vendors prefer cash and may not carry change for large bills.</p>

<h3>New Goods and Bargains</h3>
<p>Beyond vintage items, Pasar Karat also has stalls selling new clothing, phone accessories, tools, household items, and local snacks at lower prices than malls. It is a useful stop for budget travellers who need an item without paying mall retail.</p>

<h2>Tips for First-Time Visitors</h2>
<ul>
  <li><strong>Bring cash.</strong> Most stalls are cash-only, though some accept DuitNow QR for payment. ATMs are available nearby but not inside the market.</li>
  <li><strong>Wear comfortable shoes.</strong> The market is mostly outdoors on uneven ground.</li>
  <li><strong>Bargain respectfully.</strong> Offering half the asking price as an opener is generally acceptable. Sellers will counter.</li>
  <li><strong>Watch your belongings.</strong> In any crowded night market, keep bags zipped and phones in a front pocket.</li>
  <li><strong>Eat early in the session.</strong> Popular food stalls sell out by 10–11 PM.</li>
</ul>

<h2>Pasar Karat vs Taman Pelangi Night Market</h2>
<p>JB has two distinct night market experiences worth knowing about. The <a href="/blog/taman-pelangi-tuesday-night-market-guide">Taman Pelangi Tuesday Night Market</a> (right outside Pelangi Capsule Hostel) runs every Tuesday from 4:30 PM and focuses on fresh produce, local Malay food, and everyday household goods at neighbourhood prices. Pasar Karat has a more eclectic, late-night character with its vintage section and stays open until 2 AM. Both are free to enter.</p>

<h2>Where to Stay</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi is a convenient base for both night markets. The Tuesday Taman Pelangi market is literally at the front door; Pasar Karat is a short Grab ride away. Capsule pods from <strong>RM35/night</strong>, no minimum stay, 24/7 self check-in.</p>

<p><a href="/book">Book at pelangicapsulehostel.com</a> — no booking fees, best rate guaranteed direct.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Pasar Karat open every day?</h3>
<p>Tuesday through Sunday, 6 PM to 2 AM. Closed on Mondays.</p>

<h3>Is it safe to visit Pasar Karat at night?</h3>
<p>Pasar Karat is a well-established public market in a busy area of JB city centre. It is generally safe for tourists. Standard night market precautions apply: keep valuables secure and stay aware of your surroundings in crowded sections.</p>

<h3>Can I find genuine antiques at Pasar Karat?</h3>
<p>Some stalls carry genuinely old items — coins, stamps, and old electronics that are decades old. As with any flea market, provenance is usually unverifiable. Treat it as an interesting browse rather than an investment and you will enjoy it far more.</p>
`,
		},
		// 89 — scheduled: goes live 2026-08-12
		{
			Slug:          "tan-hiok-nee-heritage-street-johor-bahru-guide",
			Title:         "Tan Hiok Nee Heritage Street: JB's Best Old Quarter for Travellers",
			Excerpt:       "Johor Bahru's most photogenic colonial street — 19th-century shophouses, independent cafes, street art, and the Glass Temple on the corner. Here is what to see and do.",
			Date:          "2026-08-12",
			Category:      "Attractions",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"tan-hiok-nee", "johor-bahru", "heritage", "culture", "cafes", "walking", "budget-travel", "old-quarter"},
			FeaturedImage: "/images/blog/tan-hiok-nee-heritage-street-johor-bahru-guide.webp",
			ImageAlt:      "Jalan Tan Hiok Nee heritage street in Johor Bahru's old quarter",
			InLanguage:    "en",
			Content: `
<p><strong>Tan Hiok Nee Street</strong> (Jalan Tan Hiok Nee) is the heart of Johor Bahru's surviving colonial heritage district. The street is lined with 19th-century shophouses — the two-storey terrace buildings with covered "five-foot ways" that defined commercial architecture across British Malaya. Unlike many Malaysian cities where these buildings were demolished in development booms, Tan Hiok Nee's heritage row has been progressively restored and now hosts a mix of independent cafes, vintage shops, art galleries, and cultural spaces that make it one of the most walkable and photogenic streets in JB.</p>

<h2>Where Is It?</h2>
<p>Tan Hiok Nee Street is located in the <strong>Johor Bahru city centre</strong>, running parallel to Jalan Wong Ah Fook and approximately 500 m from JB City Square. From Taman Pelangi, Grab costs RM8–12 and takes around 10–12 minutes. The street is walkable from JB Sentral in about 20 minutes if you prefer to arrive on foot through the old city.</p>

<h2>What to See and Do</h2>

<h3>Colonial Shophouse Architecture</h3>
<p>The shophouses on Tan Hiok Nee date primarily from the late 19th to early 20th century, built during the reign of Sultan Abu Bakar and the early British administration period. The characteristic features — narrow floor plans, ornate plasterwork facades, and the covered pedestrian walkway at ground level — are well preserved on this block. Even if you are not interested in history, the visual character is a clear contrast to JB's modern malls and a good backdrop for photography.</p>

<h3>Independent Cafes</h3>
<p>Several independent cafes have opened on and around Tan Hiok Nee, making it one of JB's best streets for coffee that is not a chain. Expect specialty brews, locally roasted options, and cafe interiors that lean into the heritage aesthetic with exposed brick, ceiling fans, and old timber furniture. Prices are typically RM8–18 per drink — slightly above hawker prices but below KL or Singapore cafe norms.</p>

<h3>Street Art</h3>
<p>Murals and painted installations appear on several walls in the Tan Hiok Nee precinct, commissioned as part of JB's city beautification and heritage tourism efforts. The art ranges from figurative portraits of historical figures to abstract pieces. It has made the area popular with Instagram-era visitors, but it does not feel commercialised — the street still functions as a real neighbourhood.</p>

<h3>Arulmigu Sri Rajakaliamman Glass Temple</h3>
<p>The famous <a href="/blog/glass-temple-johor-bahru-visitor-guide">Glass Temple</a> is located on Jalan Tan Hiok Nee itself, making it a natural anchor for any walk through the heritage district. The temple's mosaicked interior can be visited in about 30 minutes for a small entrance fee.</p>

<h3>Johor Bahru Old Chinese Temple</h3>
<p>A short walk from Tan Hiok Nee, the Johor Bahru Old Chinese Temple (built in 1870) is dedicated to five deities representing JB's five founding Chinese dialect communities — Teochew, Hokkien, Cantonese, Hakka, and Hainanese. The temple plays a central role in the annual <strong>Chingay Parade Johor Bahru</strong>, one of the largest Chinese procession events in Malaysia.</p>

<h2>Best Time to Visit</h2>
<p>Morning (9 AM–noon) is ideal: the light is good for photography, the cafes are open for breakfast and coffee, and the street is quiet enough to walk without crowds. By Saturday afternoon, the area can be busy. Avoid rainy season afternoon downpours by building your visit around a morning arrival and lunch at Jalan Wong Ah Fook before heading to other parts of the city.</p>

<h2>How to Combine with a Half-Day Heritage Circuit</h2>
<p>Tan Hiok Nee works well as part of a self-guided heritage walk covering:</p>
<ol>
  <li><strong>Tan Hiok Nee Street</strong> — shophouses, cafes, street art (1 hour)</li>
  <li><strong>Glass Temple</strong> — 5-minute walk from Tan Hiok Nee (30–45 minutes)</li>
  <li><strong>Old Chinese Temple</strong> — 5-minute walk from Glass Temple (20–30 minutes)</li>
  <li><strong>Jalan Wong Ah Fook hawker stalls</strong> — lunch, 5-minute walk (1 hour)</li>
  <li><strong>Sultan Abu Bakar State Mosque</strong> — 10-minute Grab (45–60 minutes)</li>
</ol>
<p>This full circuit covers the major heritage sites within 5 km of central JB in a single morning-plus-lunch day.</p>

<h2>Where to Stay</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi is a 10-minute Grab ride from Tan Hiok Nee. Capsule pods from <strong>RM35/night</strong> — private sleeping space, personal locker, free WiFi, and 24/7 self check-in. Monthly rates from RM600 with no deposit.</p>

<p><a href="/book">Book directly at pelangicapsulehostel.com</a> — no OTA fees, best rate guaranteed.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Tan Hiok Nee Street worth visiting even if I am not into history?</h3>
<p>Yes. The combination of good coffee, walkable distance between cafes and street art, and visual character makes it worth 1–2 hours even for visitors who are not specifically interested in heritage architecture. The Glass Temple alone is a compelling reason to visit.</p>

<h3>Are there food options beyond cafes on Tan Hiok Nee?</h3>
<p>The street itself is mostly cafes and small shops. For full hawker meals, walk or Grab to Jalan Wong Ah Fook (parallel street, 5 minutes) which has more traditional coffee shops and stalls at lower price points.</p>

<h3>Can I park near Tan Hiok Nee?</h3>
<p>Street parking is available but limited. The closest large car park is near JB City Square. Grab drop-off directly on the street is straightforward.</p>
`,
		},
		// 90 — scheduled: goes live 2026-08-13
		{
			Slug:          "desaru-beach-day-trip-from-jb-guide",
			Title:         "Desaru Beach Day Trip from Johor Bahru: How to Get There and What to Expect",
			Excerpt:       "Malaysia's longest beach resort strip is 90 minutes from JB by road. Here is the honest guide to costs, getting there, and whether a day trip is worth it.",
			Date:          "2026-08-13",
			Category:      "Day Trips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"desaru", "desaru-beach", "johor-bahru", "day-trip", "beach", "budget-travel", "malaysia"},
			FeaturedImage: "/images/blog/desaru-beach-day-trip-from-jb-guide.webp",
			ImageAlt:      "Desaru Beach on Johor's east coast, a popular day-trip destination from Johor Bahru",
			InLanguage:    "en",
			Content: `
<p>Desaru is Johor's primary beach destination — a 25-kilometre stretch of sand on the eastern coast of Johor state, facing the South China Sea. It is about 90 minutes by road from JB city centre, making it the most accessible Malaysian beach escape for travellers based in JB or crossing from Singapore. The area has both a backpacker-accessible public beach section and a premium resort zone (Desaru Coast), so the experience you get depends entirely on which part you head to and how you plan.</p>

<h2>How to Get to Desaru from JB</h2>

<h3>By Car or Grab Intercity</h3>
<p>The most straightforward option from JB. From Taman Pelangi or JB Sentral, the drive to Desaru takes approximately <strong>80–100 minutes</strong> via the Eastern Dispersal Link (EDL) expressway and Jalan Kota Tinggi-Desaru (Route 92). A private car hire or intercity Grab from central JB costs approximately <strong>RM80–130 one-way</strong> depending on the service and destination within Desaru.</p>

<h3>By Bus</h3>
<p>Kota Tinggi–Desaru buses depart from <strong>Larkin Sentral Bus Terminal</strong> in JB. The journey requires changing buses at Kota Tinggi town, with the Kota Tinggi–Desaru leg adding another 45–60 minutes. Total journey time by public bus is 2.5–3.5 hours. Bus fares total approximately RM10–15 for the combined journey. This option is viable but demands flexibility — bus frequency is limited, particularly for the Kota Tinggi–Desaru leg.</p>

<h3>By Ferry from Singapore</h3>
<p>There is a direct catamaran ferry from <strong>Tanah Merah Ferry Terminal in Singapore</strong> to <strong>Desaru Coast Ferry Terminal</strong>, operated by Sindo Ferry. The journey takes approximately 60 minutes one-way. This is the fastest option from Singapore and the preferred choice for travellers who want to combine a Desaru day trip with a JB stay — take the ferry from Singapore, spend the day at Desaru, then proceed to JB by car or transport for your onward travel. Check Sindo Ferry's current schedules and prices at sindoferry.com.sg.</p>

<h2>What to Do at Desaru</h2>

<h3>Public Beach (Pantai Desaru)</h3>
<p>The public beach section of Desaru is free to access. The sand is light brown, the water is warm, and the casuarina trees lining the shore provide shade. Facilities at the public beach include basic changing rooms, toilets, and small food stalls. The waves can be stronger here than at calmer beaches — always check local conditions before swimming. Lifeguards are not always stationed at the public section.</p>

<h3>Desaru Coast (Resort Zone)</h3>
<p>The northern section of Desaru has been developed as <strong>Desaru Coast</strong>, a premium integrated resort destination. It includes the Desaru Coast Adventure Waterpark (one of Malaysia's largest), Hard Rock Hotel Desaru Coast, Els Club golf courses, and The Westin Desaru. Day passes to the waterpark cost approximately <strong>RM100–170 for adults</strong> — not budget territory, but comparable to similar waterparks in Malaysia and Singapore. The beach in the resort zone is cleaner and calmer due to breakwaters.</p>

<h2>Is a Day Trip from JB Worth It?</h2>
<p>Honestly — it depends on your priorities:</p>
<ul>
  <li><strong>If you want a beach day cheaply:</strong> The public beach section is worth it if you have a car or are willing to bus. Budget RM50–80 per person for transport plus food.</li>
  <li><strong>If you want a waterpark:</strong> Desaru Coast Adventure Waterpark is one of Malaysia's best. Factor in RM130–200+ per person for transport plus entry.</li>
  <li><strong>If you just want the experience of visiting a Malaysian beach:</strong> The public section delivers this for a modest investment. The beach is not as developed or clean as Langkawi or Tioman, but it is accessible and genuine.</li>
</ul>

<h2>What to Pack</h2>
<ul>
  <li>Sunscreen (SPF50+) — tropical sun is intense at Desaru</li>
  <li>Rash guard or UV shirt if spending extended time in the water</li>
  <li>Cash — the public beach food stalls and nearby town stalls are mostly cash-only</li>
  <li>Drinking water — buy extra; the public beach facilities have limited supply</li>
  <li>Beach footwear — the sand gets very hot by midday</li>
</ul>

<h2>Where to Stay Before or After Desaru</h2>
<p>Most travellers use JB as the base for a Desaru day trip and return the same day. If you want to overnight in the area, Desaru town has budget guesthouses from around RM80–120/night. For those who prefer central JB as the base:</p>

<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi puts you in the right location for an early departure — close to the EDL expressway entry point and Larkin Sentral for bus options. Capsule pods from <strong>RM35/night</strong>, 24/7 self check-in, free WiFi. No minimum stay — if you return from Desaru in the evening and depart the next morning, a single-night stay works perfectly.</p>

<p><a href="/book">Book at pelangicapsulehostel.com</a> — direct booking, no fees, best rate guaranteed.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can I swim at Desaru Beach?</h3>
<p>Yes, swimming is permitted and common at the public beach. Conditions vary — monsoon season (November to January) brings stronger waves and the beach can be rough. The resort zone's lagoon pools offer calmer swimming year-round.</p>

<h3>What is the best time of year to visit Desaru?</h3>
<p>March to October (outside the northeast monsoon season) offers the calmest sea conditions. July and August are peak dry season — sunny days, lower humidity, and good beach conditions.</p>

<h3>How far is Desaru from Johor Bahru city centre?</h3>
<p>Approximately 90–100 km by road via the EDL expressway. Travel time by car is 80–100 minutes in normal traffic conditions.</p>
`,
		},
		// 91 — scheduled: goes live 2026-08-14
		{
			Slug:          "legoland-malaysia-johor-bahru-visitor-guide",
			Title:         "LEGOLAND Malaysia Guide: Tickets, Tips &amp; Getting There from JB",
			Excerpt:       "Malaysia's only LEGOLAND is in Nusajaya, 20 minutes from JB city centre. Here is what to expect, how much it costs, and how to make the most of a day there.",
			Date:          "2026-08-14",
			Category:      "Attractions",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"legoland", "legoland-malaysia", "johor-bahru", "attractions", "family", "theme-park", "nusajaya", "budget-travel"},
			FeaturedImage: "/images/blog/legoland-malaysia-johor-bahru-visitor-guide.webp",
			ImageAlt:      "LEGOLAND Malaysia Resort in Nusajaya, Johor Bahru",
			InLanguage:    "en",
			Content: `
<p><strong>LEGOLAND Malaysia</strong> in Nusajaya (Iskandar Puteri) is the first LEGOLAND theme park in Asia and one of Malaysia's most visited attractions. It operates both a theme park and a separate water park, with the resort including a hotel and SEA LIFE aquarium. Whether you are visiting with family, travelling as part of a group, or simply curious about the largest LEGO installation in Southeast Asia, the park is a genuine half-day to full-day experience within easy reach of JB city centre.</p>

<h2>Location</h2>
<p>LEGOLAND Malaysia is located in <strong>Medini, Nusajaya (Iskandar Puteri)</strong>, Johor — approximately 20–30 km west of JB city centre. Travel time from JB Sentral or Taman Pelangi by Grab is around <strong>25–35 minutes</strong> and costs approximately RM25–40 one-way. The park is also accessible from Singapore via the Tuas Second Link (Second Causeway) — the LEGOLAND Malaysia Hotel offers a dedicated shuttle service from Singapore.</p>

<h2>Tickets and Pricing</h2>
<p>Tickets in 2026 (check LEGOLAND Malaysia's official website for current rates and online discounts):</p>
<ul>
  <li><strong>Theme Park only — Adult (Malaysian):</strong> approximately RM110–130</li>
  <li><strong>Theme Park only — Adult (Foreign visitor):</strong> approximately RM130–160</li>
  <li><strong>Water Park only — Adult:</strong> approximately RM90–110</li>
  <li><strong>Combined Theme Park + Water Park — Adult:</strong> approximately RM180–230</li>
  <li><strong>Children (below 110 cm height):</strong> often discounted or free with an adult</li>
</ul>
<p>Online booking through LEGOLAND Malaysia's official site typically saves 10–20% over gate prices. Klook and other third-party platforms also offer discounted tickets.</p>

<h2>What Is in the Theme Park</h2>

<h3>MINILAND</h3>
<p>The most iconic feature of any LEGOLAND — a scaled recreation of Asian landmarks built from over 30 million LEGO bricks. The Asian MINILAND includes models of iconic structures from across Southeast and East Asia: KL's Petronas Towers, Singapore's Marina Bay Sands, Bangkok's temples, and more. Impressive in scale and detail, and the best photography location in the park.</p>

<h3>Rides and Zones</h3>
<p>The park has seven themed zones: LEGO City, LEGO Kingdoms, Adventure, LEGO NINJAGO World, LEGO Technic, IMAGINATION, and Land of Adventure. Ride intensity ranges from gentle carousel-style attractions for young children to moderate coaster rides. The coasters here are family-friendly rather than thrill-seeker grade — most adults will find them low-intensity compared to a standard theme park.</p>

<h3>SEA LIFE Malaysia Aquarium</h3>
<p>Attached to the LEGOLAND resort, SEA LIFE Malaysia features ocean tunnels and marine species displays. Combined tickets with LEGOLAND are available and often better value than buying separately.</p>

<h2>Water Park</h2>
<p>The LEGOLAND Water Park has nearly 20 slides and attractions, including a lazy river, wave pool, and several family slides. It is separate from the theme park and requires its own ticket (or a combo). Lockers are available inside for a fee. Bring your own towel — rental towels are available but limited.</p>

<h2>Best Time to Visit</h2>
<p>Weekday mornings are significantly less crowded than weekends and Malaysian school holidays. Arrive at park opening (10 AM) to get through the most popular rides before queues build. Avoid Malaysian public holidays and Singapore school holidays — these are peak crowd days.</p>

<h2>What to Bring</h2>
<ul>
  <li>Sunscreen (SPF50+) — the park is mostly outdoors</li>
  <li>Comfortable walking shoes — the theme park covers significant ground</li>
  <li>Swimwear if visiting the water park (or buy at the park shop)</li>
  <li>Reusable water bottle — the park has filling stations</li>
  <li>Snacks to reduce food spend inside (outside food is permitted in designated areas)</li>
</ul>

<h2>Where to Stay Before or After</h2>
<p>LEGOLAND Malaysia Hotel is the most immersive option, but at RM500–900/night it is beyond budget territory. <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi offers capsule pods from <strong>RM35/night</strong> — a 25-minute Grab to LEGOLAND and walking distance to JB's hawker food for dinner after the park. 24/7 self check-in means a late return from the park is not a problem.</p>

<p><a href="/book">Book at pelangicapsulehostel.com</a> — direct booking, no OTA fees, best rate guaranteed.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is LEGOLAND Malaysia worth it for adults without children?</h3>
<p>MINILAND and the Water Park are enjoyable for adults. The rides themselves are primarily designed for families with children under 12 — adult thrill-seekers may find the coasters mild. If the primary draw is MINILAND and novelty, it is worth a half-day visit. If you want intense rides, Sunway Lagoon in KL is a better adult-oriented option.</p>

<h3>How do I get to LEGOLAND Malaysia from Singapore?</h3>
<p>LEGOLAND operates a shuttle service from multiple Singapore points. Alternatively, cross via the Tuas Second Link by car or take a taxi from the Malaysian side. The park is less convenient from Singapore than from JB — budget an extra 45–60 minutes compared to departing from JB city centre.</p>

<h3>Can I visit LEGOLAND and JB attractions in the same day?</h3>
<p>LEGOLAND warrants a full day if you are visiting both the theme park and water park. A half-day at LEGOLAND (theme park only) leaves time for dinner at JB hawker centres in the evening. Combining LEGOLAND with major JB city sights in a single day would be rushed.</p>
`,
		},
		// 92 — scheduled: goes live 2026-08-15
		{
			Slug:          "rts-link-johor-bahru-singapore-traveler-guide",
			Title:         "RTS Link JB–Singapore: Fares, Stations, and What Changes When It Opens",
			Excerpt:       "The Rapid Transit System Link between Woodlands North and Bukit Chagar opens by end-2026, cutting the crossing to 5 minutes. Here is every confirmed detail — fares, e-gates, and what it means for your JB trip.",
			Date:          "2026-08-15",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"rts-link", "singapore", "johor-bahru", "transport", "woodlands-north", "bukit-chagar", "border-crossing"},
			FeaturedImage: "/images/blog/rts-link-johor-bahru-singapore-traveler-guide.webp",
			ImageAlt:      "The Bukit Chagar RTS Link station under construction in Johor Bahru",
			Content: `
<p>The Johor Bahru–Singapore Rapid Transit System (RTS) Link is the most significant cross-border infrastructure project between Malaysia and Singapore in decades. When it opens — targeted for December 2026 or January 2027 — it will reduce the physical crossing time between the two countries from 30–90 minutes by bus to approximately <strong>5 minutes by train</strong>. Here is every confirmed detail you need to plan your JB trip around it.</p>

<h2>What Is the RTS Link?</h2>
<p>The RTS Link is a light rail transit line connecting <strong>Woodlands North MRT station</strong> in Singapore to <strong>Bukit Chagar station</strong> in Johor Bahru. It runs entirely on an elevated viaduct across the Strait of Johor — a separate crossing from the existing Johor-Singapore Causeway. The 4 km line takes approximately 5 minutes from platform to platform.</p>
<p>Both stations double as integrated immigration, customs, and quarantine (CIQ) facilities. You clear both countries' passport control inside the station — no more walking between checkpoints in open air, no more bus transfer.</p>

<h2>Confirmed Details as of Mid-2026</h2>
<table>
<thead>
  <tr><th>Detail</th><th>Status</th></tr>
</thead>
<tbody>
  <tr><td>Journey time (train only)</td><td>~5 minutes</td></tr>
  <tr><td>Target opening</td><td>December 2026 – January 2027</td></tr>
  <tr><td>Expected one-way fare</td><td>S$5–S$7 (adult)</td></tr>
  <tr><td>Daily capacity at launch</td><td>~40,000 passengers/day</td></tr>
  <tr><td>Ultimate daily capacity</td><td>~140,000 passengers/day</td></tr>
  <tr><td>Singapore terminal</td><td>Woodlands North MRT (North-South Line)</td></tr>
  <tr><td>JB terminal</td><td>Bukit Chagar, central JB</td></tr>
  <tr><td>Immigration clearance</td><td>AI-assisted e-gates — targeted 7-second clearance time</td></tr>
</tbody>
</table>
<p>Fares have not been finalised at the time of writing. The S$5–S$7 range comes from official briefings and press reports through mid-2026. Confirm current fares on the <a href="https://www.mot.gov.sg" target="_blank" rel="noopener noreferrer">Singapore Ministry of Transport website</a> before you travel.</p>

<h2>How the Immigration Process Changes</h2>
<p>Currently, crossing by bus requires two stops: Singapore departure (Woodlands Checkpoint) and Malaysian arrival (Sultan Iskandar CIQ, JB Sentral) — two queues, two buildings, sometimes two buses. The RTS Link consolidates this into a single, climate-controlled station experience at each end.</p>
<p>Both the Woodlands North and Bukit Chagar stations are designed with AI-assisted e-gates that process biometric data and scan passports in a target of <strong>7 seconds per traveller</strong>. For context: the current manual counter average runs 30–120 seconds per person. At scale, this could reduce total crossing time — including immigration — to under 20 minutes on a busy day.</p>
<p>The MyNIISe app (Malaysia's official immigration QR code system) is expected to remain the standard method for pre-generating your travel document on the Malaysian side. Register before you travel.</p>

<h2>What Does Not Change</h2>
<p>The Causeway bus options — Causeway Link CW1 from Kranji, bus 170 from Queen Street, MyLink coaches — are not going away. For budget travellers, the bus at SGD3.30 one-way will remain cheaper than the RTS fare. The RTS Link is fastest and most convenient, not cheapest.</p>
<p>Cross-border Grab and taxis also continue operating via the Causeway for those with luggage, families, or door-to-door requirements.</p>

<h2>Getting to Bukit Chagar Station (JB Side)</h2>
<p>Bukit Chagar is in central Johor Bahru, near City Square Mall and JB Sentral. From there, Grab to <strong>Taman Pelangi</strong> (where Pelangi Capsule Hostel is located) takes approximately 10 minutes and costs RM8–12 — the same as arriving at JB Sentral today. The routing does not change significantly for hostel guests.</p>

<h2>Should You Wait for the RTS Before Planning Your JB Trip?</h2>
<p>No. The bus crossing works perfectly well for most travellers. The RTS Link will add a faster, premium option — it will not make bus crossings worse. Book your JB trip now, use the bus, and upgrade to RTS once it is running.</p>
<p>If you are specifically planning a day trip optimised for speed (crossing quickly, spending maximum time in JB, crossing back), the RTS Link will be worth the higher fare once it opens. For an overnight or weekend stay, the marginal time difference matters less.</p>

<h2>Plan Your JB Stay</h2>
<p>However you cross, <a href="/rooms">Pelangi Capsule Hostel</a> at 26A Jalan Perang, Taman Pelangi is a 10-minute Grab from both JB Sentral and the future Bukit Chagar station. Capsule pods start at <strong>RM35/night</strong> — private pod, air-conditioning, hot shower, fast WiFi, and 24/7 self check-in. No minimum stay.</p>
<p><a href="/book">Check availability and book direct</a>. WhatsApp us at +60 12-708 8789 for any questions.</p>

<h2>Frequently Asked Questions</h2>

<h3>When does the RTS Link open?</h3>
<p>The target is December 2026, with some official sources citing January 2027. The date has not been locked in at the time of writing. Follow Singapore's Ministry of Transport and Malaysia's Ministry of Works for the final announcement.</p>

<h3>How much does the RTS Link cost?</h3>
<p>The expected fare is S$5–S$7 one-way for adults. Official pricing has not been confirmed. For comparison, the Causeway Link CW1 bus costs SGD3.30 one-way.</p>

<h3>Do I still need to clear immigration on the RTS Link?</h3>
<p>Yes. Both the Woodlands North and Bukit Chagar stations include full immigration, customs, and quarantine facilities. The difference is that you clear both countries at the station rather than at separate standalone checkpoints.</p>

<h3>Can I still use the bus after the RTS opens?</h3>
<p>Yes. Bus services across the Causeway will continue operating. The RTS Link is an additional option, not a replacement for existing transport.</p>
`,
		},
		// 93 — scheduled: goes live 2026-08-16
		{
			Slug:          "jb-grocery-run-guide-singaporeans",
			Title:         "The JB Grocery Run: What to Buy, Where to Shop, and How Much You Actually Save",
			Excerpt:       "A typical Singapore household saves SGD200–400 a month on a weekly JB grocery run. Here is the practical guide: best supermarkets, what to buy first, the customs limit, and how to make it worth the trip.",
			Date:          "2026-08-16",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"singapore", "johor-bahru", "grocery", "shopping", "budget", "savings", "causeway", "mydin", "aeon"},
			FeaturedImage: "/images/blog/jb-grocery-run-guide-singaporeans.webp",
			ImageAlt:      "Mydin hypermarket in Mutiara Rini, Johor Bahru — the kind of supermarket Singaporean shoppers visit on a JB grocery run",
			Content: `
<p>Johor Bahru's grocery run has become one of the most searched travel topics among Singapore households. The maths is simple: a four-person family running a weekly shop in JB typically saves <strong>SGD200–400 per month</strong> compared to shopping at Cold Storage or FairPrice in Singapore. That is enough to cover the transport costs, the border crossing time, and still come out well ahead. This guide covers where to go, what to buy, and what you need to know before you cross.</p>

<h2>Why JB Groceries Are Cheaper</h2>
<p>The price gap comes from a combination of factors: lower Malaysian import duties on food, a weaker ringgit (roughly SGD1 = RM3.3 in 2026), lower supermarket operating costs, and the fact that many products sold in JB are manufactured locally in Malaysia with no import premium. Fresh produce — vegetables, tropical fruits, eggs — reflects local farming supply rather than import logistics.</p>
<p>The strongest savings are on: <strong>fresh produce (30–50% cheaper), pantry staples (rice, cooking oil, sugar), processed snacks, toiletries, and baby products</strong>. The weakest savings — items where the gap narrows — are electronics, alcohol (high Malaysian duty), and imported branded goods priced in foreign currency.</p>

<h2>Best Supermarkets for Singaporeans</h2>

<h3>AEON — Best Overall Selection</h3>
<p>AEON operates two major JB outlets: <strong>AEON Tebrau City</strong> and <strong>AEON Mall Bukit Indah</strong>. Both are Japanese-style department store supermarkets with wide aisles, strong fresh produce sections, and decent Japanese and Korean import ranges. AEON is the best choice if you want a full supermarket experience similar to Singapore's FairPrice Finest but at significantly lower prices. Parking is free. Touch 'n Go e-wallet and major credit cards accepted.</p>

<h3>Mydin — Bulk Buy Value</h3>
<p>Mydin is Malaysia's largest Muslim-operated hypermarket chain. The <strong>Mydin Hypermarket JB</strong> outlet near Tesco carries bulk quantities of dry goods, pantry staples, cleaning products, and household items at wholesale-adjacent prices. It is the best destination for rice (10kg or 25kg sacks), cooking oil, and household consumables. Bare-bones experience, but the prices are genuinely the lowest for staples.</p>

<h3>Giant (in KOMTAR JBCC)</h3>
<p>Giant Hypermarket inside KOMTAR JBCC (near JB Sentral) is convenient for travellers arriving by bus — it is a short Grab from CIQ. Good for snacks, fresh produce, and Malaysian-made products. Smaller floor space than AEON or Mydin, but central location is useful if you're combining grocery shopping with a day trip.</p>

<h2>What to Buy First</h2>
<p>If this is your first JB grocery run, focus on the categories with the widest price gap:</p>
<ul>
  <li><strong>Fresh vegetables and herbs:</strong> Kai lan, kangkong, lemongrass, pandan, and most leafy greens are 30–50% cheaper than Singapore's wet markets. Buy what you will use within 3–4 days.</li>
  <li><strong>Eggs:</strong> A tray of 30 eggs in JB costs approximately RM15–18 (~SGD4.50–5.50) versus SGD9–11 at FairPrice. One of the biggest per-unit savings available.</li>
  <li><strong>Malaysian snacks:</strong> Beryl's chocolates, Hup Seng cream crackers, Famous Amos Malaysia, Gardenia bread, Aik Cheong coffee mix, Old Town White Coffee sachets — all made domestically and priced accordingly. Popular as gifts too.</li>
  <li><strong>Cooking oil and rice:</strong> 5kg bag of Thai jasmine rice is roughly RM20–22 in JB. The same bag would cost SGD12–18 at FairPrice. Cooking oil (5L palm oil) costs approximately RM30 in JB versus SGD15–18 in Singapore — similar after FX, but Malaysian brands have more variety.</li>
  <li><strong>Toiletries and personal care:</strong> Shampoo, toothpaste, body wash — major brands like Dove, Pantene, and Colgate are 20–40% cheaper due to lower import duties.</li>
  <li><strong>Baby products:</strong> Diapers, baby formula, and baby food are frequently cited as the strongest savings category. A box of Huggies diapers saves SGD8–12 compared to Singapore pricing.</li>
</ul>

<h2>Singapore Customs: What You Can Bring Back</h2>
<p>Singapore customs allows travellers returning from Malaysia to bring back a limited amount of duty-free goods. Key limits as of 2026:</p>
<ul>
  <li><strong>Alcohol:</strong> 1 litre of spirits, 1 litre of wine, 1 litre of beer — per person. No duty-free alcohol if you have been away less than 48 hours.</li>
  <li><strong>Tobacco:</strong> No duty-free concession for cigarettes brought into Singapore from Malaysia. All cigarettes must be declared and duty paid.</li>
  <li><strong>Goods for personal use:</strong> Up to SGD500 in value after 48 hours away, SGD100 after less than 48 hours. Groceries for personal consumption typically do not attract GST below this threshold.</li>
  <li><strong>Pork products:</strong> Singapore restricts import of certain meat products from Malaysia. Cooked pork products in sealed, commercially packaged form are generally permitted; fresh or raw pork from Malaysia is not. When in doubt, check the Singapore Food Agency website.</li>
</ul>
<p>Enforce good habits: declare at the red channel if uncertain rather than risking a fine. For a standard grocery run of vegetables, snacks, and household products, you will comfortably stay within personal use quantities.</p>

<h2>Making the Trip Worth It</h2>
<p>The grocery run pays off when you are buying items with a significant price gap and buying enough of them to offset the transport time. Practical tips:</p>
<ul>
  <li><strong>Bring reusable bags.</strong> Malaysia charges for plastic bags and many supermarkets have limited carrier availability.</li>
  <li><strong>Cross midweek morning.</strong> Tuesday to Thursday, before noon, gives you the lightest Causeway queues. The grocery run plus return crossing takes 3–4 hours on a good weekday.</li>
  <li><strong>Use Touch 'n Go or DuitNow QR for payment.</strong> Most JB supermarkets accept these. Having ringgit cash as backup is sensible for smaller purchases.</li>
  <li><strong>Pair with lunch.</strong> Eating at a JB hawker stall while there turns the trip into a genuine outing rather than a pure logistics exercise. Factor in RM20–30 for two people at a hawker centre — the meal alone is cheaper than equivalent food in Singapore.</li>
</ul>

<h2>Stay Overnight and Save More</h2>
<p>Some Singapore households make the grocery run monthly rather than weekly, turning it into a proper overnight trip: cross Friday evening, shop Saturday morning at AEON when it opens, explore JB in the afternoon, eat a proper Malaysian dinner, and return Sunday.</p>
<p><a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi offers capsule pods at <strong>RM35/night</strong> (~SGD10.50). A two-person overnight grocery weekend — accommodation plus two days of eating out — adds roughly SGD25–40 per person in costs, easily covered by what you save on a single month's shopping. <a href="/book">Book direct here</a>.</p>
`,
		},
		// 94 — scheduled: goes live 2026-08-17
		{
			Slug:          "jb-singapore-immigration-tips-beat-queue-2026",
			Title:         "JB–Singapore Immigration: How to Beat the Queue in 2026 (MyNIISe, E-Gates & Timing)",
			Excerpt:       "Singaporeans can now clear JB immigration in seconds with a QR code. E-gates are live. Checkpoint.sg shows live queue times. Here is the full guide to crossing faster in 2026.",
			Date:          "2026-08-17",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"immigration", "singapore", "johor-bahru", "causeway", "myniise", "e-gate", "queue", "border-crossing", "travel-tips"},
			FeaturedImage: "/images/blog/jb-singapore-immigration-tips-beat-queue-2026.webp",
			ImageAlt:      "Woodlands Checkpoint on the Singapore side of the JB-Singapore immigration crossing",
			Content: `
<p>The JB–Singapore border crossing has changed significantly in 2025–2026. Singaporean travellers can now clear Malaysian immigration with a QR code using a mobile app — no passport stamping at the counter, no manual queue for eligible holders. E-gates are live at Sultan Iskandar CIQ. Real-time queue tracking is available on your phone. If you are still crossing the old way, you are almost certainly waiting longer than you need to. This guide covers every tool and technique available right now.</p>

<h2>Tool 1: MyNIISe App — QR Code Immigration Clearance</h2>
<p>The <strong>MyNIISe app</strong> (available on iOS and Android, free) is Malaysia's official immigration pre-clearance system. As of September 2025, Singaporean travellers can generate a QR code that clears Malaysian immigration at the autogate — without queuing at a manual counter. A group travelling together can even share a single QR code at the gate.</p>
<p>How to set it up:</p>
<ol>
  <li>Download MyNIISe from the App Store or Google Play.</li>
  <li>Register with your passport details and create an account.</li>
  <li>Generate a Travel QR Code before your crossing — it stores offline, so you do not need data at the border.</li>
  <li>At JB CIQ: scan your QR code at the designated autogate lane. The system reads your biometric data and clears you without a manual stamp.</li>
</ol>
<p><strong>First-time requirement:</strong> You must have cleared Malaysian immigration manually at least once before — the system needs your biometric data registered in Malaysia's immigration database. After that first crossing, you can use the QR code for all subsequent visits.</p>
<p>The MyNIISe autogate is currently available at Sultan Iskandar CIQ (JB Sentral) and progressively rolling out to other entry points. It does not yet cover the Tuas Second Link — use the manual counter there.</p>

<h2>Tool 2: Malaysia E-Gate — Fingerprint Clearance</h2>
<p>Separate from MyNIISe, Malaysia operates <strong>biometric e-gates</strong> at JB CIQ where eligible travellers scan their passport and verify fingerprints to clear immigration in under a minute. Singaporeans are eligible to use the e-gate on the Malaysian arrival side.</p>
<p>The e-gate is most useful when you have registered biometrics but have not set up MyNIISe. It is faster than the manual counter but slower than the QR code autogate on an uncrowded day. The two systems serve the same purpose — use whichever lane is shorter on your crossing day.</p>

<h2>Tool 3: Checkpoint.sg — Live Queue Monitoring</h2>
<p>The <strong>Checkpoint.sg</strong> app (iOS and Android) and the companion <strong>Beat the Jam</strong> app provide live camera views and estimated waiting times at both Woodlands Checkpoint (Singapore side) and Sultan Iskandar CIQ (Malaysian side). Checking the app before you leave saves you from arriving mid-surge.</p>
<p>The Singapore ICA (Immigration &amp; Checkpoints Authority) also publishes real-time traffic advisories during expected peak periods — worth following on their social channels before holiday weekends.</p>

<h2>Best and Worst Times to Cross</h2>
<p>Technology helps, but timing is still the single biggest factor in crossing speed. The pattern at Woodlands CIQ has been consistent for years:</p>
<table>
<thead>
  <tr><th>Window</th><th>Direction</th><th>Queue Level</th></tr>
</thead>
<tbody>
  <tr><td>Tuesday–Thursday 9 AM–2 PM</td><td>Either</td><td>Light — best window</td></tr>
  <tr><td>Monday–Friday 7–9 AM</td><td>SG-bound (workers returning)</td><td>Heavy</td></tr>
  <tr><td>Friday 5–10 PM</td><td>JB-bound</td><td>Very heavy</td></tr>
  <tr><td>Sunday 3–9 PM</td><td>SG-bound</td><td>Very heavy</td></tr>
  <tr><td>Any day after 10 PM</td><td>Either</td><td>Light — often under 15 min total</td></tr>
  <tr><td>Public holiday eve</td><td>JB-bound</td><td>Extreme — 2–3 hours possible</td></tr>
  <tr><td>Public holiday evening</td><td>SG-bound return</td><td>Extreme — 2–3 hours possible</td></tr>
</tbody>
</table>
<p>Late-night crossings (after 10 PM) are consistently the fastest for non-peak days. If you have flexibility, arriving in JB after midnight on a Thursday or leaving JB before 7 AM on a Sunday cuts total crossing time dramatically.</p>

<h2>Motorcycles and Buses Clear Faster Than Cars</h2>
<p>At the Causeway, motorcycles and buses use dedicated lanes that move faster than the private car queue — particularly on heavy weekends. If you are crossing by foot on the CW1 bus or bus 170, you will typically clear faster than someone in a car, even on a busy Friday evening. This is a structural advantage of bus travel that is often overlooked when comparing options.</p>

<h2>Tuas Second Link: The Underused Alternative</h2>
<p>The <strong>Tuas Second Link</strong> (KSAB) in the west is consistently less congested than the Causeway on most weekdays and many weekends. It is primarily a vehicle crossing — there is no direct public bus equivalent to CW1 for foot passengers at Tuas. If you are driving or being driven, check Checkpoint.sg and compare both queues before committing to a route. On a bad Friday, the extra 30-minute drive to Tuas can save 60–90 minutes of waiting.</p>

<h2>What to Carry for Smooth Crossing</h2>
<ul>
  <li><strong>Valid passport</strong> (at least 6 months validity from travel date)</li>
  <li><strong>MyNIISe app</strong> installed and QR code generated before you leave Singapore</li>
  <li><strong>Proof of funds:</strong> Malaysia technically requires RM500 or equivalent accessible funds. Have your bank app ready to show.</li>
  <li><strong>Accommodation booking:</strong> If asked by Malaysian immigration, a booking confirmation (Pelangi Capsule Hostel for example) is clear proof of plans. Officers rarely ask on a normal weekday; useful to have if your crossing timing looks unusual.</li>
  <li><strong>Return transport:</strong> Bus 170 or CW1 goes from JB Sentral back to Singapore — no advance booking needed. Or use cross-border Grab for door-to-door.</li>
</ul>

<h2>After You Cross</h2>
<p>Once through Malaysian immigration at JB CIQ, connect to the free WiFi inside JB Sentral and open Grab. A ride to Taman Pelangi (central JB, where Pelangi Capsule Hostel is located) costs RM8–12 and takes 8–10 minutes. Do not accept taxi offers from drivers approaching you at the exit — use Grab or the official taxi counter inside the terminal.</p>
<p>Staying overnight? <a href="/book">Book a capsule pod at Pelangi</a> — RM35/night, 24/7 self check-in, no reception hours to work around. <a href="https://wa.me/60127088789">WhatsApp us</a> if you need to arrange a late arrival.</p>
`,
		},
		// 95 — scheduled: goes live 2026-08-18
		{
			Slug:          "new-jb-malls-2026-singaporeans-guide",
			Title:         "New Malls in JB 2026: SKS City Mall, Horizon Mall and What Singaporeans Need to Know",
			Excerpt:       "Johor Bahru opened two new malls in 2025–2026 — SKS City Mall targeting Gen Z with viral TikTok brands, and Horizon Mall with open-air garden shopping. Here is what is there and whether it is worth the trip.",
			Date:          "2026-08-18",
			Category:      "Shopping",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"shopping", "johor-bahru", "singapore", "sks-city-mall", "horizon-mall", "malls", "budget-travel", "kkv"},
			FeaturedImage: "/images/blog/new-jb-malls-2026-singaporeans-guide.webp",
			ImageAlt:      "Interior of Johor Bahru City Square shopping mall",
			Content: `
<p>JB's mall landscape has shifted noticeably in 2025–2026. Two new openings — SKS City Mall and Horizon Mall — have added options beyond the well-established KSL City Mall, AEON Tebrau, and KOMTAR JBCC. If you have not visited JB in the past year, this guide covers what is new, what is worth your time, and how the new malls fit into a shopping day from Singapore.</p>

<h2>SKS City Mall (JBCC) — The Gen Z Destination</h2>
<p>SKS City Mall, often referred to as JBCC, has positioned itself as the mall for younger shoppers and viral retail concepts. Its anchor tenant draw is <strong>KKV</strong> — the Chinese lifestyle brand that went viral on TikTok for its visually dense, grid-format stores selling stationery, pop culture merchandise, skincare, and accessories at very competitive prices. KKV stores have driven significant foot traffic in KL and have the same effect in JB.</p>
<p>Beyond KKV, SKS City Mall houses an <strong>indoor playground and family entertainment zone</strong> that has drawn families from Singapore for day trips — a category of visitor not traditionally well-served by JB's older malls. The food court skews younger too, with bubble tea chains and Instagram-friendly dessert spots concentrated on the upper floors.</p>
<p>What to expect: busier on weekends, good for browsing and entertainment, targeted at the 18–35 age bracket. Credit cards and e-wallets widely accepted.</p>
<p><strong>Getting there:</strong> Grab from JB Sentral CIQ takes approximately 10–15 minutes. From Taman Pelangi (Pelangi Capsule Hostel), it is a 12-minute Grab.</p>

<h2>Horizon Mall — Garden Shopping Experience</h2>
<p>Horizon Mall opened in May 2026 with a distinct identity: an <strong>open-air, alfresco shopping concept</strong> with garden landscaping integrated into the retail layout. The design borrows from Bangkok's open-mall formats — covered walkways, greenery, and outdoor dining rather than the enclosed air-conditioned box that most Malaysian malls follow.</p>
<p>The food and beverage offer here has been the strongest draw for Singaporean visitors. The outdoor dining area concentrates local JB food, artisan coffee, and international concepts in a setting that feels less like a mall food court and more like a curated food street. Evening visits — after the heat breaks — have become a popular social outing for JB residents and Singaporean day-trippers.</p>
<p><strong>Note:</strong> The open-air format means it is significantly warmer than a conventional mall on sunny afternoons. Plan your Horizon Mall visit for after 6 PM to get the best of the evening food scene without the midday heat.</p>
<p><strong>Getting there:</strong> Grab from JB Sentral or JB CIQ takes 15–20 minutes.</p>

<h2>The Established Malls: Still Worth It</h2>
<p>The new openings do not make the existing JB malls obsolete. A quick reference for first-timers:</p>
<table>
<thead>
  <tr><th>Mall</th><th>Best For</th><th>Distance from JB CIQ</th></tr>
</thead>
<tbody>
  <tr><td><strong>KSL City Mall</strong></td><td>Fashion, electronics, mid-range F&amp;B, supermarket</td><td>10 min Grab</td></tr>
  <tr><td><strong>KOMTAR JBCC</strong> (City Square)</td><td>Closest to CIQ, Giant supermarket, convenience shopping</td><td>5 min walk / Grab</td></tr>
  <tr><td><strong>AEON Tebrau City</strong></td><td>Grocery run, Japanese lifestyle, wide range</td><td>15 min Grab</td></tr>
  <tr><td><strong>Johor Premium Outlets (JPO)</strong></td><td>Outlet shopping — Coach, Polo, Nike, etc.</td><td>30 min Grab</td></tr>
  <tr><td><strong>Mid Valley Southkey</strong></td><td>Largest selection, cinema, anchor department stores</td><td>15 min Grab</td></tr>
  <tr><td><strong>SKS City Mall</strong> (new)</td><td>KKV, Gen Z brands, entertainment</td><td>12 min Grab</td></tr>
  <tr><td><strong>Horizon Mall</strong> (new)</td><td>Evening F&amp;B, open-air dining, artisan concepts</td><td>18 min Grab</td></tr>
</tbody>
</table>

<h2>Practical Shopping Day from Singapore</h2>
<p>A typical one-day shopping itinerary for Singaporeans visiting JB:</p>
<ul>
  <li><strong>Morning (9–10 AM):</strong> Cross via Causeway Link CW1 bus (light queues weekdays). Buy Malaysian tourist SIM at JB Sentral — RM10–15, activates in minutes, enables Grab.</li>
  <li><strong>Morning to early afternoon:</strong> Grocery run at AEON Tebrau or Mydin. Focus on produce, snacks, and household staples with the widest price gap.</li>
  <li><strong>Lunch:</strong> Hawker centres in Taman Pelangi or Jalan Tan Hiok Nee. RM15–25 per person for a proper meal.</li>
  <li><strong>Afternoon:</strong> SKS City Mall or KSL City for fashion and retail browsing. Or JPO if outlet shopping is the priority.</li>
  <li><strong>Evening (6 PM onward):</strong> Horizon Mall or the Taman Pelangi night market (Tuesdays). Dinner at a hawker centre or street food stall.</li>
  <li><strong>Return crossing:</strong> Cross before 9 PM or after 10 PM for lighter queues heading back to Singapore.</li>
</ul>

<h2>Payment in JB Malls</h2>
<p>All major JB malls accept Visa and Mastercard credit/debit cards at most retailers. Touch 'n Go e-wallet and DuitNow QR codes are widely accepted. Cash (ringgit) remains useful for food courts, smaller stalls, and night markets. A rough rule: bring RM100–200 in cash, use card or e-wallet for larger purchases.</p>

<h2>Staying in JB to Make the Most of It</h2>
<p>The shopping day from Singapore is realistic, but an overnight stay unlocks the evening food scene that most day-trippers miss. <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi offers capsule pods at <strong>RM35/night</strong> — a 10-minute Grab from KSL City, SKS City Mall, and the Taman Pelangi night market. <a href="/book">Book direct here</a> — no OTA fees, 24/7 self check-in.</p>
`,
		},
		// 96 — scheduled: goes live 2026-08-19
		{
			Slug:          "cross-border-grab-singapore-johor-bahru-guide",
			Title:         "Cross-Border Grab from Singapore to JB: Fares, Rules, and When It's Worth It",
			Excerpt:       "Grab launched official cross-border service between Singapore and Johor Bahru in 2026. No more unmarked taxis, no more negotiating. Here is what it costs, how to book, and when to use it versus the bus.",
			Date:          "2026-08-19",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"grab", "singapore", "johor-bahru", "transport", "cross-border", "causeway", "budget-travel", "travel-tips"},
			FeaturedImage: "/images/blog/cross-border-grab-singapore-johor-bahru-guide.webp",
			ImageAlt:      "Traffic crossing the Johor-Singapore Causeway between Singapore and Johor Bahru",
			Content: `
<p>Grab officially joined Malaysia's licensed cross-border taxi scheme in May 2026, allowing passengers to book a single Grab ride from a Singapore address directly to a Johor Bahru address — or vice versa. The driver handles both immigration checkpoints; you stay in the car. It is the most convenient door-to-door option now available, and it closes the gap that previously pushed many travellers toward informal transport. Here is how it works and when it is the right choice.</p>

<h2>How Cross-Border Grab Works</h2>
<p>Cross-border Grab rides are booked through the standard Grab app from your Singapore phone. Select your Singapore pickup address, enter a JB address as your destination, and the app will show you the cross-border option with a fare estimate. The driver is licensed for cross-border operation — this is not an informal arrangement.</p>
<p>At each checkpoint, you and your driver handle immigration normally: exit the vehicle, queue at passport control, return to the car. The driver waits on the other side. There are no additional fees at the border beyond the metered fare shown in the app.</p>
<p>Payment is via your existing Grab-linked card or GrabPay — no cash required, no FX conversion needed.</p>

<h2>Typical Fares (2026)</h2>
<p>Cross-border Grab fares are higher than local JB rides because the driver must account for two-way immigration time and the return crossing. Typical range from Singapore to central JB destinations:</p>
<table>
<thead>
  <tr><th>Route</th><th>Approximate Fare</th><th>Typical Duration</th></tr>
</thead>
<tbody>
  <tr><td>Singapore address → JB Sentral / CIQ area</td><td>SGD30–45</td><td>40–90 min (traffic dependent)</td></tr>
  <tr><td>Singapore address → Taman Pelangi / KSL City</td><td>SGD35–50</td><td>50–100 min</td></tr>
  <tr><td>Singapore address → AEON Tebrau</td><td>SGD40–55</td><td>55–110 min</td></tr>
  <tr><td>JB address → Singapore address (reverse)</td><td>Similar range, priced in SGD</td><td>Same</td></tr>
</tbody>
</table>
<p>Fares surge during peak hours — Friday evenings, Sunday afternoons, and public holiday periods. If your budget allows, booking off-peak reduces cost and travel time simultaneously.</p>

<h2>When Cross-Border Grab Makes Sense</h2>
<p>Cross-border Grab is the right choice in specific situations:</p>
<ul>
  <li><strong>Large luggage or lots of grocery bags.</strong> The bus is impractical with more than one large bag; Grab gives you full boot space.</li>
  <li><strong>Families with children.</strong> Multiple border crossings with young children are significantly easier in a private vehicle than on a standing bus.</li>
  <li><strong>Late-night arrivals or early morning departures.</strong> If your timing does not fit bus schedules, or you want door-to-door at 11 PM, Grab solves the problem the bus cannot.</li>
  <li><strong>Groups of 3–4 people.</strong> Split between four passengers, SGD40–50 per ride becomes SGD10–12 per person — competitive with the bus on a per-head basis and far more comfortable.</li>
</ul>

<h2>When the Bus Is Still Better</h2>
<p>For solo travellers with light luggage on a budget, the <strong>Causeway Link CW1 bus</strong> from Kranji MRT remains the better choice. At SGD3.30 one-way, it is 10–15 times cheaper than cross-border Grab. Queue times are similar for both (you clear immigration either way); the bus does not skip the checkpoint queue just because it is Grab.</p>
<p>A practical decision tree:</p>
<ul>
  <li>Solo, under 2 bags, daytime → take the bus</li>
  <li>Group of 3–4, any time → Grab often wins on per-person cost and convenience</li>
  <li>Heavy bags or grocery return trip → Grab</li>
  <li>Late night (no buses) → Grab</li>
  <li>Flexible on timing, want cheapest → bus on a mid-week morning</li>
</ul>

<h2>After You Arrive: Getting Around JB</h2>
<p>Once in JB, you will need the local JB Grab service for rides within the city. This requires a Malaysian-registered Grab account and a Malaysian phone number. The easiest solution: buy a tourist SIM at JB Sentral immediately after clearing customs (RM10–15 for 5–10 GB of data, available from Celcom, Maxis, or U Mobile counters inside JB Sentral).</p>
<p>Alternatively, if you arrive by cross-border Grab directly at your destination (such as Pelangi Capsule Hostel in Taman Pelangi), you may not need local Grab at all until you are ready to explore.</p>

<h2>What About Unlicensed Taxis?</h2>
<p>At JB CIQ exit gates, unofficial taxi drivers will approach you immediately. Their fares are typically 3–5 times higher than Grab, there is no recourse if something goes wrong, and the vehicles are not licensed for cross-border operation. Walk past them, connect to the free JB Sentral WiFi, and open your app. If you need a taxi immediately without a SIM, the official metered taxi counter is located inside JB Sentral — staffed, licensed, and priced with a meter.</p>

<h2>Staying in JB</h2>
<p>Whether you arrive by bus or cross-border Grab, <a href="/rooms">Pelangi Capsule Hostel</a> at 26A Jalan Perang, Taman Pelangi is 10 minutes from JB Sentral CIQ and a direct Grab destination in the app. Capsule pods from <strong>RM35/night</strong>, 24/7 self check-in, no minimum stay. <a href="/book">Book direct</a> for the best rate — or <a href="https://wa.me/60127088789">WhatsApp us</a> if you need to check a specific date.</p>
`,
		},

		// SG National Day 2026 long weekend JB getaway
		{
			Slug:          "singapore-national-day-2026-long-weekend-johor-bahru",
			Date:          "2026-08-09",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"singapore-national-day", "sg61", "long-weekend", "johor-bahru", "causeway", "singapore", "jb-getaway", "budget-travel"},
			FeaturedImage: "/images/blog/singapore-national-day-2026-long-weekend-johor-bahru.webp",
			ImageAlt:      "National Day fireworks near Marina Bay Sands, Singapore",
			Title:         "SG National Day 2026 Long Weekend: Why Singaporeans Are Crossing Over to JB",
			Excerpt:       "SG61 falls on a Sunday — 10 August is a public holiday in lieu, making it a 3-day weekend. Here's why JB is the natural escape, when to cross, and what to do once you're here.",
			Content: `
<p>Singapore's 61st National Day (<strong>SG61</strong>) lands on Sunday, 9 August 2026. Because the holiday falls on a weekend, <strong>Monday 10 August 2026 is gazetted as a public holiday in lieu</strong> — giving most Singaporeans a 3-day break from Saturday to Monday. For those who want to step out of the city without flying, Johor Bahru is 15 minutes away.</p>

<h2>What the SG National Day Weekend Means for JB</h2>
<p>Every Singapore public holiday sends a wave of travellers north across the Causeway. National Day is one of the biggest — the long weekend lines up with families, couples, and solo travellers all looking for the same thing: a short break that doesn't cost a fortune.</p>
<p>JB delivers exactly that. Food is excellent and affordable, shopping malls are modern, and the distance is short enough that you can leave Saturday morning and be back Monday night in time for work Tuesday. A one-night capsule stay here costs roughly what a single restaurant meal costs in Singapore.</p>

<h2>The Causeway Reality: When to Cross</h2>
<p>The Woodlands and Tuas checkpoints will be busy. Here's what the data from past National Day weekends shows:</p>

<h3>Friday / Eve of the long weekend (7 Aug)</h3>
<ul>
  <li><strong>SG → JB peak:</strong> 5pm–9pm — worst of the weekend. Waits of 3–7 hours have been reported in prior years.</li>
  <li><strong>Best window:</strong> Before noon, or after 10pm.</li>
</ul>

<h3>Saturday 8 Aug</h3>
<ul>
  <li>Heavy in both directions all day. The Causeway is not a quick hop on this day.</li>
  <li>If you plan to cross on Saturday, go early — before 9am — or after 9pm.</li>
</ul>

<h3>Sunday 9 Aug (National Day itself)</h3>
<ul>
  <li>SG → JB lighter in the morning; many Singaporeans stay put for NDP events.</li>
  <li>JB → SG picks up from 3pm as day-trippers return.</li>
</ul>

<h3>Monday 10 Aug (Public Holiday in lieu)</h3>
<ul>
  <li>JB → SG <strong>3pm–9pm</strong> is the crunch point — everyone returning to Singapore before Tuesday.</li>
  <li><strong>Best return window:</strong> Before 1pm, or after 10pm.</li>
</ul>

<p>ICA publishes holiday delay notices on <a href="https://www.ica.gov.sg" target="_blank" rel="noopener">ica.gov.sg</a> and their social channels — check before you leave.</p>

<h3>Tuas vs Woodlands</h3>
<p>Tuas Second Link tends to be slightly lighter on public holidays. If you're driving, it's worth the longer route. If you're taking the bus, Woodlands CIQ / Causeway Link CW1 is the standard option.</p>

<h2>What to Do in JB Over the Long Weekend</h2>
<p>Three days is plenty to eat well, shop, and relax. A rough itinerary that works for most:</p>

<h3>Saturday: Arrive, Settle, Eat</h3>
<ul>
  <li>Cross early to beat the afternoon rush. Check in, drop your bags.</li>
  <li>Lunch at <strong>Pasar Karat</strong> (flea market + hawker stalls near Jalan Wong Ah Fook) — open air, very local.</li>
  <li>Afternoon: <strong>AEON Tebrau City</strong> or <strong>KSL City</strong> for shopping if that's your thing; both are large malls with Malaysian-priced food courts.</li>
  <li>Dinner in <strong>Taman Pelangi</strong> — the neighbourhood around the hostel has a dense cluster of Chinese kopitiam and mamak joints, open late.</li>
</ul>

<h3>Sunday: Day Trip Options</h3>
<ul>
  <li><strong>Danga Bay</strong> — waterfront promenade with sea views and food stalls. Low-key, easy on foot.</li>
  <li><strong>Johor Bahru Old Chinese Temple</strong> — free entry, right in the city centre, worth 45 minutes.</li>
  <li><strong>Paradigm Mall</strong> — the newest large mall in JB with a good food court and cinema.</li>
  <li>Optional: <strong>Legoland Malaysia</strong> (20 minutes from central JB) — best for families with kids; book tickets online in advance during holiday weekends.</li>
</ul>

<h3>Monday: Return Day — Go Slow</h3>
<ul>
  <li>Morning: kopitiam breakfast, final rounds of whatever you didn't finish.</li>
  <li>Check out, head to the checkpoint before 1pm to beat the return wave.</li>
  <li>Or: stay, eat lunch, and cross after 10pm instead.</li>
</ul>

<h2>About the RTS Link</h2>
<p>You may have heard that a new rail link between JB (Bukit Chagar) and Singapore (Woodlands North) is under construction. The target opening is <strong>December 2026</strong>, but system integration testing is still scheduled to begin around September 2026, and a slip into early 2027 is possible. For this National Day weekend, the Causeway and Tuas remain your only crossing options.</p>

<h2>Staying Near the Causeway</h2>
<p><a href="/rooms">Pelangi Capsule Hostel</a> is 10 minutes from JB Sentral CIQ by Grab. Capsule pods from <strong>RM35/night</strong>, 24/7 self check-in via a digital keypad — no front desk queue. <a href="/book">Book a bed</a> for your next long-weekend crossing, or <a href="https://wa.me/60127088789">WhatsApp us</a> to check availability for a specific date.</p>

<h2>Upcoming Singapore Long Weekends: Plan Ahead</h2>
<p>The next Singapore long weekend after National Day is <strong>Deepavali, 7–9 November 2026</strong> — Deepavali falls on Sunday 8 November, so Monday 9 November is a public holiday in lieu. Christmas 2026 lands on a Friday for another 3-day break, and 2027 has a strong lineup. Start planning early; JB accommodation fills up fast around these dates.</p>

<h3>Rest of 2026</h3>
<table>
  <thead>
    <tr><th>Date</th><th>Day</th><th>Holiday</th><th>Long Weekend?</th></tr>
  </thead>
  <tbody>
    <tr><td>8–9 Nov 2026</td><td>Sun–Mon</td><td>Deepavali + in lieu</td><td>3 days (Sat–Mon)</td></tr>
    <tr><td>25 Dec 2026</td><td>Fri</td><td>Christmas Day</td><td>3 days (Fri–Sun)</td></tr>
  </tbody>
</table>

<h3>2027 Long Weekends (Singapore)</h3>
<table>
  <thead>
    <tr><th>Date</th><th>Day</th><th>Holiday</th><th>Long Weekend?</th></tr>
  </thead>
  <tbody>
    <tr><td>1 Jan 2027</td><td>Fri</td><td>New Year's Day</td><td>3 days (Fri–Sun)</td></tr>
    <tr><td>6–8 Feb 2027</td><td>Sat–Mon</td><td>Chinese New Year + in lieu Mon</td><td>3 days</td></tr>
    <tr><td>26–28 Mar 2027</td><td>Fri–Sun</td><td>Good Friday</td><td>3 days</td></tr>
    <tr><td>15–17 May 2027</td><td>Sat–Mon</td><td>Hari Raya Haji</td><td>3 days</td></tr>
    <tr><td>7–9 Aug 2027</td><td>Sat–Mon</td><td>National Day</td><td>3 days</td></tr>
    <tr><td>28–31 Oct 2027</td><td>Thu–Sun</td><td>Deepavali (Thu) + bridge leave Fri</td><td>4 days with 1 day leave</td></tr>
    <tr><td>25 Dec 2027</td><td>Sat</td><td>Christmas Day</td><td>No automatic 3-day</td></tr>
  </tbody>
</table>
<p><em>Sources: MOM Singapore official public holidays 2026 and 2027 press releases.</em></p>

<h2>Frequently Asked Questions</h2>

<h3>Is 10 August 2026 a public holiday in Singapore?</h3>
<p>Yes. Because National Day (9 August) falls on a Sunday in 2026, Monday 10 August is gazetted as a public holiday in lieu under Singapore's Employment Act. This is confirmed on the MOM Singapore official public holidays page.</p>

<h3>How long does it take to cross the Causeway during National Day weekend?</h3>
<p>During peak windows (Friday evening SG→JB, Monday afternoon JB→SG), waits of 3–7 hours at Woodlands CIQ have been recorded in prior years. Crossing before noon or after 10pm reduces waits significantly. Check ICA's website or social channels for real-time advisories.</p>

<h3>Can I get from Singapore to JB by train?</h3>
<p>Not yet. The Johor Bahru–Singapore Rapid Transit System (RTS Link) is targeting a December 2026 opening, though an early 2027 slip is possible. For the August 2026 weekend, your options are the Causeway Link CW1 bus (from Kranji MRT), cross-border Grab, or private car.</p>

<h3>Is it worth crossing to JB just for one night?</h3>
<p>Yes — for most Singaporeans, a single overnight in JB is worth it. You save money on food and accommodation versus staying in Singapore, you get a genuine change of scenery, and the logistics are simple if you time the crossing well.</p>

<h3>Where is Pelangi Capsule Hostel relative to JB Sentral?</h3>
<p>Pelangi Capsule Hostel is in Taman Pelangi, about 10 minutes by Grab from JB Sentral CIQ. It's a short, direct ride and is a recognized destination in the Grab app — just search "Pelangi Capsule Hostel" or the address at 26A Jalan Perang.</p>

<h3>Do I need to book in advance for a Singapore long weekend?</h3>
<p>Yes. JB hostel and hotel beds fill up quickly around Singapore public holidays — National Day 2026 filled us completely. Book at least two to three weeks ahead for the dates in the tables above. <a href="/book">Book your capsule here</a> or <a href="https://wa.me/60127088789">WhatsApp us</a> to check current availability.</p>
`,
		},
		// accommodation-proof blog post
		{
			Slug:          "how-to-get-accommodation-proof-malaysia-immigration",
			Date:          "2026-08-16",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			Tags:          []string{"accommodation-proof", "immigration", "johor-bahru", "malaysia", "travel-tips", "booking-confirmation"},
			FeaturedImage: "/images/blog/how-to-get-accommodation-proof-malaysia-immigration.webp",
			ImageAlt:      "The entrance to Pelangi Capsule Hostel in Taman Pelangi, Johor Bahru",
			Title:         "How to Get Proof of Accommodation for Malaysia Immigration (Pelangi Hostel Guide)",
			Excerpt:       "Arriving in Malaysia and want a printed accommodation confirmation? Enter your booking reference and last name at pelangicapsulehostel.com/accommodation-proof — get an instant, printable document in seconds.",
			Content: `
<h2>Why Officers Sometimes Ask Where You Are Staying</h2>
<p>When you arrive at a Malaysian port of entry — whether at JB CIQ from the Causeway, KLIA, or another checkpoint — an immigration officer may ask where you are staying during your visit. Having a clear, printed answer makes the conversation short. A formal accommodation confirmation from your hostel or hotel shows your address, check-in and check-out dates, and booking reference at a glance.</p>

<p>This is not a complicated requirement. Most travellers simply show their booking app or a hotel email. But a printed or saved PDF is more reliable than relying on mobile data when airport or checkpoint Wi-Fi is slow — and it looks more professional if the officer wants to inspect it carefully.</p>

<h2>What Pelangi Capsule Hostel Offers: The Accommodation Proof Page</h2>
<p>Pelangi Capsule Hostel has a dedicated <a href="/accommodation-proof">accommodation proof page</a> that generates a printable Accommodation Confirmation document on demand — no staff involved, no waiting, no email chain.</p>

<p>You enter two things:</p>
<ol>
  <li><strong>Your booking reference</strong> — found in your confirmation email or booking SMS.</li>
  <li><strong>Your last name</strong> — exactly as it appears on your booking.</li>
</ol>

<p>The page then displays a formatted confirmation document you can print immediately or save as a PDF from your browser.</p>

<h2>What Your Booking Reference Looks Like</h2>
<p>Pelangi uses two reference formats depending on where you booked:</p>
<ul>
  <li><strong>PLG-YYYYMMDD-NNN</strong> — direct bookings made at <a href="/book">pelangicapsulehostel.com/book</a>. Example: <code>PLG-20261201-042</code>.</li>
  <li><strong>STP-YYYYMMDD-NNN</strong> — bookings that came through an OTA such as Booking.com, Agoda, Trip.com, or Hostelworld. Example: <code>STP-20261201-007</code>.</li>
</ul>
<p>Your reference is printed at the top of the confirmation email you received when you booked. If you booked through an OTA, the reference in your OTA app is the OTA's own ID — use the STP reference from Pelangi's confirmation, not the OTA number.</p>

<h2>What the Document Shows</h2>
<p>The generated confirmation includes:</p>
<ul>
  <li>Property name: Pelangi Capsule Hostel</li>
  <li>Property address: 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia</li>
  <li>Property telephone</li>
  <li>Your booking reference number</li>
  <li>Your name</li>
  <li>Your nationality (when on file)</li>
  <li>Your assigned unit (when assigned)</li>
  <li>Check-in and check-out dates</li>
  <li>Number of nights and number of guests</li>
  <li>Total amount</li>
  <li>A Tourism Tax note for non-Malaysian guests</li>
</ul>

<p>The document deliberately does <strong>not</strong> include your passport number or IC number. Your identity documents stay private — the confirmation tells an officer where you are staying, not who you are beyond your name.</p>

<h2>Tourism Tax Note for Foreign Visitors</h2>
<p>Malaysia charges a Tourism Tax of RM10 per room per night for non-Malaysian guests. This applies at registered accommodation properties including Pelangi Capsule Hostel. Your confirmation will include a note about this where applicable.</p>

<h2>How to Get Your Confirmation in Three Steps</h2>
<ol>
  <li>Go to <a href="/accommodation-proof">pelangicapsulehostel.com/accommodation-proof</a>.</li>
  <li>Enter your booking reference (e.g. <code>PLG-20261201-042</code>) and your last name.</li>
  <li>Click the "Print / Save as PDF" button to download or print the document.</li>
</ol>

<p><strong>Tip: do this before you fly.</strong> Airport Wi-Fi can be slow or unavailable, and mobile data may not work until after you clear immigration. Save the PDF to your phone's offline storage or print a copy before you leave home.</p>

<h2>Important: Cancelled Bookings</h2>
<p>If your booking was cancelled, the system will not produce a confirmation document — a cancelled reservation is not a valid accommodation arrangement. If you have rebooked after a cancellation, use the reference from your new booking.</p>

<h2>Can't Find Your Booking Reference?</h2>
<p>Check your original confirmation email. If you cannot locate it, WhatsApp us at <a href="https://wa.me/60127088789">+60 12-708 8789</a> and a staff member will send you the link directly.</p>

<h2>A Note on What This Document Is</h2>
<p>The Accommodation Confirmation is a document issued by Pelangi Capsule Hostel confirming your reservation. It is not a government-issued document and is not a visa, entry permit, or legal guarantee of entry. Immigration decisions are made by the officer at the checkpoint based on all the information they review. The document is a practical aid — it answers the "where are you staying?" question clearly and quickly.</p>

<h2>Malaysia Digital Arrival Card (MDAC)</h2>
<p>Travellers arriving in Malaysia may be required to complete the Malaysia Digital Arrival Card (MDAC) before or on arrival. This is a separate process from your accommodation confirmation. Check the official immigration portal at <a href="https://www.imi.gov.my" target="_blank" rel="noopener noreferrer">imi.gov.my</a> for current MDAC requirements for your nationality.</p>

<h2>Book Your Stay at Pelangi</h2>
<p>If you have not yet booked and need accommodation in Johor Bahru, <a href="/book">book directly at pelangicapsulehostel.com/book</a> — no booking fees, best rate guaranteed. Capsule pods from RM35/night with 24/7 self check-in. Once your booking is confirmed, your accommodation proof is available immediately at <a href="/accommodation-proof">/accommodation-proof</a>.</p>

<p>Questions? WhatsApp <a href="https://wa.me/60127088789">+60 12-708 8789</a> or check our <a href="/check-in">check-in guide</a> for arrival instructions.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is the accommodation confirmation accepted at Malaysian immigration?</h3>
<p>Officers may ask where you are staying; this document answers that question directly. Immigration decisions rest with the officer at the checkpoint. The confirmation is a practical aid showing your address and booking details — it is not a government document or entry guarantee.</p>

<h3>What if I booked through Booking.com or Agoda?</h3>
<p>Use the STP reference from Pelangi's confirmation email, not the OTA booking ID. The format is <code>STP-YYYYMMDD-NNN</code>. If you only have the OTA number, WhatsApp us and we will look up your STP reference.</p>

<h3>Can I get the document if I have not checked in yet?</h3>
<p>Yes — the confirmation is available as soon as your booking is confirmed, before you arrive. Generate it any time after booking.</p>

<h3>Does the document include my passport number?</h3>
<p>No. The confirmation does not include your passport or IC number. It shows your name, booking reference, dates, and property details only.</p>

<h3>What if my booking was cancelled?</h3>
<p>Cancelled bookings do not produce a confirmation document. If your booking was cancelled in error, contact us via WhatsApp at <a href="https://wa.me/60127088789">+60 12-708 8789</a>.</p>

<h3>How do I save the document as a PDF?</h3>
<p>On the confirmation page, click "Print / Save as PDF". In the print dialog, select "Save as PDF" as the destination instead of a physical printer. This works on all major browsers on desktop and mobile.</p>
`,
		},
	}
	for i := range raw {
		raw[i].ReadingTimeMinutes = _blogComputeReadingTime(raw[i].Content)
	}
	return raw
}()

// _mytZone is the site's editorial timezone (Malaysia, UTC+8).
var _mytZone = time.FixedZone("MYT", 8*3600)

// TodayMYT returns today's date in Malaysia time as YYYY-MM-DD.
func TodayMYT() string {
	return time.Now().In(_mytZone).Format("2006-01-02")
}

// IsPublished reports whether the post's publish date has arrived (Malaysia
// time). Scheduled publishing: a post whose Date is in the future is compiled
// into the binary but hidden from every list, sitemap, feed, KB export, and
// direct URL until that date — it goes live automatically, no redeploy needed.
func (p BlogPost) IsPublished() bool {
	return p.Date <= TodayMYT()
}

// PublishedPosts returns all posts whose publish date has arrived, in
// insertion order.
func PublishedPosts() []BlogPost {
	today := TodayMYT()
	out := make([]BlogPost, 0, len(BlogPosts))
	for _, p := range BlogPosts {
		if p.Date <= today {
			out = append(out, p)
		}
	}
	return out
}

// CategoryToSlug converts a category name to a URL slug.
func CategoryToSlug(category string) string {
	lower := strings.ToLower(category)
	clean := _blogCatCleanRE.ReplaceAllString(lower, "")
	trimmed := strings.TrimSpace(clean)
	return _blogCatSpaceRE.ReplaceAllString(trimmed, "-")
}

// SlugToCategory returns the original category name for a given slug, or ""
// when no published post has that category — the handler treats "" as 404.
// (Returning the raw slug here made /blog/category/<anything> render an
// indexable empty page; hunt finding 2026-07-11.)
func SlugToCategory(slug string) string {
	for _, p := range PublishedPosts() {
		if CategoryToSlug(p.Category) == slug {
			return p.Category
		}
	}
	return ""
}

// GetUniqueCategories returns all distinct category names in insertion order.
func GetUniqueCategories() []string {
	seen := make(map[string]bool)
	var cats []string
	for _, p := range PublishedPosts() {
		if !seen[p.Category] {
			seen[p.Category] = true
			cats = append(cats, p.Category)
		}
	}
	return cats
}

// GetPostBySlug returns a pointer to the post with the given slug, or nil.
// Scheduled (future-dated) posts are invisible — nil until their date arrives.
func GetPostBySlug(slug string) *BlogPost {
	for i := range BlogPosts {
		if BlogPosts[i].Slug == slug {
			if !BlogPosts[i].IsPublished() {
				return nil
			}
			return &BlogPosts[i]
		}
	}
	return nil
}

// BlogNewestDate returns the most recent Date string across published posts.
func BlogNewestDate() string {
	newest := ""
	for _, p := range PublishedPosts() {
		if p.Date > newest {
			newest = p.Date
		}
	}
	return newest
}

// BlogListMarkdown returns a markdown bullet list of published posts with title and excerpt.
func BlogListMarkdown() string {
	var sb strings.Builder
	for _, p := range PublishedPosts() {
		sb.WriteString("- [")
		sb.WriteString(p.Title)
		sb.WriteString("](/blog/")
		sb.WriteString(p.Slug)
		sb.WriteString(") — ")
		sb.WriteString(p.Excerpt)
		sb.WriteString("\n")
	}
	return sb.String()
}

