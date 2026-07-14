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

// BlogPosts is the complete ordered list of all 35 blog posts.
// ReadingTimeMinutes is computed from each post's HTML Content at init time.
var BlogPosts = func() []BlogPost {
	raw := []BlogPost{
		// 1
		{
			Slug:          "ultimate-jb-food-guide-backpackers",
			LastModified:  "2026-06-26",
			ImageAlt:      "A spread of Johor Bahru hawker dishes — roti canai, nasi lemak, and local noodles served at a Taman Pelangi food stall",
			Title:         "The Ultimate Johor Bahru Food Guide for Backpackers (2026)",
			Excerpt:       "From RM5 hawker meals to legendary seafood spots — everything a budget traveller needs to eat their way through JB like a local.",
			Date:          "2026-02-20",
			Category:      "Food & Drink",
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "food", "backpacker", "budget-travel", "malaysia", "hawker"},
			FeaturedImage: "/images/blog/jb-food-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "9 min read",
			Tags:          []string{"johor-bahru", "singapore", "causeway", "border-crossing", "backpacker", "budget-travel"},
			FeaturedImage: "/images/blog/causeway-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "budget-travel", "backpacker", "things-to-do", "malaysia", "free-activities"},
			FeaturedImage: "/images/blog/jb-budget-activities.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "food", "hawker", "street-food", "backpacker", "budget-travel"},
			FeaturedImage: "/images/blog/jb-hawker-centres.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "singapore", "budget-travel", "backpacker", "malaysia", "comparison"},
			FeaturedImage: "/images/blog/jb-vs-singapore.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "hidden-gems", "local-life", "backpacker", "malaysia", "off-the-beaten-path"},
			FeaturedImage: "/images/blog/jb-hidden-gems.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "10 min read",
			Tags:          []string{"singapore", "jobs", "career", "work-pass", "malaysia", "job-search"},
			FeaturedImage: "/images/blog/singapore-jobs-guide.jpg",
			Content: `
<h2>Why Malaysians Move to Singapore</h2>
<p>Singapore attracts Malaysian professionals seeking higher salaries. A RM6,000 earner might earn SGD6,500 (RM24,000)—a massive jump. The economy, institutions, and international companies create opportunities unavailable in Malaysia. Securing a role requires strategy, timing, and understanding visa rules.</p>

<h2>Understanding Singapore Work Passes</h2>
<p>Singapore issues three main work passes for foreigners. <strong>Employment Pass (EP)</strong> is for professionals and managers earning SGD3,600+ monthly with recognised qualifications. <strong>S Pass</strong> targets skilled workers earning SGD2,500–3,600 with technical expertise or credentials or certifications. <strong>Work Permit</strong> is for semi-skilled and unskilled workers in manufacturing, construction, and service sectors.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "12 min read",
			Tags:          []string{"singapore", "work-pass", "career", "expat", "malaysia", "employment-pass", "visa"},
			FeaturedImage: "/images/blog/singapore-work-pass-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "singapore", "commuter", "work", "malaysia", "cross-border", "cost-of-living"},
			FeaturedImage: "/images/blog/jb-singapore-commuter.jpg",
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
<p>Hundreds of cross-border commuters have used <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi as their first JB base — capsule pods are <strong>RM30/night on weekdays (RM35 weekends)</strong>, or <strong>RM594/month</strong> for long-stayers, with no deposit and no minimum tenancy. Private rooms are also available from <strong>RM500/month</strong>, right above the 7-Eleven on Jalan Perang. Fast WiFi, lockers, hot showers, 24/7 self check-in for pre-dawn Causeway crossings, and the CIQ checkpoint is 10–15 minutes away.</p>
<p><a href="/book">Book a pod</a>, or compare the numbers first: the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">honest maths of RM594/month capsule living</a> and the <a href="/blog/room-for-rent-taman-pelangi-jb-rm500-month">RM500/month private room guide</a>.</p>
`,
		},
		// 10
		{
			Slug:          "gig-jobs-malaysia-waiting-singapore-work-pass",
			Title:         "5 Gig Jobs for Malaysians Waiting for Singapore Work Approval",
			Excerpt:       "Stuck in the work pass waiting period? Make money while you wait. Foodpanda, Lalamove, Grab, and more—5 flexible gig economy jobs in Malaysia with realistic earnings.",
			Date:          "2026-04-14",
			Category:      "Career & Work",
			Author:        "Jay Lew",
			ReadTime:      "9 min read",
			Tags:          []string{"gig-economy", "malaysia", "work", "freelance", "income", "job-seeker"},
			FeaturedImage: "/images/blog/gig-jobs.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"johor-bahru", "backpacker", "budget-travel", "itinerary", "malaysia", "hostel"},
			FeaturedImage: "/images/blog/jb-backpacker-itinerary.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"新山", "住宿", "胶囊旅馆", "马来西亚", "背包旅行", "柔佛"},
			FeaturedImage: "/images/blog/jb-food-guide.jpg",
			Content: `
<h2>为什么选择胶囊旅馆？</h2>
<p>胶囊旅馆（Capsule Hostel）源自日本，以其高性价比和私密性著称。每个床位配备独立的私人舱体，拥有个人插座、USB充电口、阅读灯和拉帘，让你在共享空间中享有属于自己的小天地。对于独自旅行者、背包客和数字游民来说，胶囊旅馆是兼顾预算与品质的最佳选择。</p>

<h2>Pelangi胶囊旅馆：新山最受欢迎的背包客据点</h2>
<p><strong>彩虹胶囊旅馆（Pelangi Capsule Hostel）</strong>位于新山Taman Pelangi区，距离新山关卡（JB Sentral CIQ）约15分钟车程，交通便利，周边餐饮选择丰富。</p>

<h3>房型与价格</h3>
<ul>
  <li><strong>混合宿舍（Mixed Dorm）</strong>：每晚 RM35起，月租 RM594</li>
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"新加坡", "新山", "交通", "过关", "长堤", "马来西亚"},
			FeaturedImage: "/images/blog/causeway-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "10 min read",
			Tags:          []string{"新山", "自由行", "旅游攻略", "马来西亚", "柔佛", "Visit Malaysia 2026"},
			FeaturedImage: "/images/blog/jb-3-days.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "lalamove", "delivery", "malaysia", "side-hustle"},
			FeaturedImage: "/images/blog/lalamove-driver-guide.jpg",
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
<p>Many gig drivers in JB keep overheads low by staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi — capsule pods from <strong>RM30/night on weekdays (RM35 weekends)</strong>, or <strong>RM594/month</strong> for long-stayers. Private rooms are also available from <strong>RM500/month</strong>, right above the 7-Eleven on Jalan Perang. Fast WiFi for the driver app, lockers, hot showers, and a base 15 minutes from the Causeway — cross-border delivery jobs start at your doorstep.</p>
<p><a href="/book">Book a pod</a>, or compare the numbers first: the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">honest maths of RM594/month capsule living</a> and the <a href="/blog/room-for-rent-taman-pelangi-jb-rm500-month">RM500/month private room guide</a>.</p>
`,
		},
		// 16
		{
			Slug:          "taman-pelangi-tuesday-night-market-guide",
			Title:         "Taman Pelangi Tuesday Night Market — The Street Food Paradise at Our Doorstep",
			Excerpt:       "Every Tuesday from 4:30 PM, Jalan Perang transforms into a 500m street food carnival. Satay, carrot cake, martabak, fresh seafood — all steps from Pelangi Capsule Hostel.",
			Date:          "2026-04-15",
			Category:      "Food & Drink",
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "night-market", "pasar-malam", "street-food", "taman-pelangi", "budget-travel"},
			FeaturedImage: "/images/blog/jb-food-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"新山", "夜市", "pasar-malam", "彩虹花园", "街头美食", "马来西亚"},
			FeaturedImage: "/images/blog/jb-food-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"中国游客", "马来西亚免签", "签证攻略", "新山", "柔佛", "出行攻略"},
			FeaturedImage: "/images/blog/jb-3-days.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"中国游客", "微信支付", "支付宝", "新山", "马来西亚", "换汇"},
			FeaturedImage: "/images/blog/jb-transport-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"中国游客", "新山购物", "马来西亚购物", "柔佛", "攻略", "AEON"},
			FeaturedImage: "/images/blog/jb-3-days.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"中国游客", "新山美食", "清真美食", "马来西亚饮食", "柔佛", "吃喝攻略"},
			FeaturedImage: "/images/blog/jb-food-guide.jpg",
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
			ImageAlt:      "Getting around Johor Bahru by bus, Grab, and on foot without a car",
			Title:         "Getting Around Johor Bahru Without a Car — Transport Guide for Backpackers",
			Excerpt:       "Master JB transport on a budget: Grab (RM5–15), Rapid JB buses (RM1–3), walking Taman Pelangi, and crossing to Singapore. Complete price comparison.",
			Date:          "2026-04-14",
			Category:      "Travel Tips",
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "transport", "backpacker", "budget-travel", "grab", "bus", "getting-around"},
			FeaturedImage: "/images/blog/jb-transport-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"food", "johor", "specialty-dish", "jb-guide"},
			FeaturedImage: "/images/blog/laksa-johor-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"food", "johor", "specialty-dish", "heritage-food"},
			FeaturedImage: "/images/blog/mee-rebus-johor-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"food", "breakfast", "roti-canai", "taman-pelangi", "budget-food"},
			FeaturedImage: "/images/blog/best-roti-canai-johor-bahru.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"taman-pelangi", "jb-neighborhood", "local-guide", "johor-bahru"},
			FeaturedImage: "/images/blog/taman-pelangi-neighborhood-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"shopping", "jpo", "johor-premium-outlets", "singapore-shoppers"},
			FeaturedImage: "/images/blog/johor-premium-outlets.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"budget-food", "cheap-eats", "johor-bahru", "hawker-food"},
			FeaturedImage: "/images/blog/jb-cheap-eats.jpg",
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
			FeaturedImage: "/images/blog/changi-airport-transit-jb.jpg",
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
			FeaturedImage: "/images/blog/jb-singapore-day-trip-base.jpg",
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
			FeaturedImage: "/images/blog/changi-airport-transit-jb.jpg",
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
			FeaturedImage: "/images/blog/jb-singapore-day-trip-base.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "9 min read",
			Tags:          []string{"ktm-ets", "train", "kuala-lumpur", "johor-bahru", "travel-tips", "tourist", "ktmb"},
			FeaturedImage: "/images/blog/ets-train-jb.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"jb-sentral", "train", "taman-pelangi", "arrival", "travel-tips", "tourist", "getting-here"},
			FeaturedImage: "/images/blog/jb-sentral-arrival.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "8 min read",
			Tags:          []string{"ktm-ets", "火车", "新山", "交通攻略", "旅游", "kuala-lumpur"},
			FeaturedImage: "/images/blog/ets-train-jb.jpg",
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
			ImageAlt:      "Vehicles queuing at the Johor–Singapore Causeway, expected to be extra busy over the Johor state election weekend of 11 July 2026",
			Title:         "Johor State Election 11 July 2026: What Travellers to JB Need to Know",
			Excerpt:       "Johor votes on Saturday 11 July 2026 — a public holiday in the state. Here's how the election weekend affects your JB trip: Causeway traffic, shop hours, safety, and why it's actually a great weekend to stay put in Johor Bahru.",
			Date:          "2026-07-03",
			Category:      "Travel Tips",
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "johor-election", "public-holiday", "causeway", "travel-tips", "malaysia"},
			FeaturedImage: "/images/blog/causeway-guide.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"rts-link", "johor-bahru", "singapore", "commuter", "causeway", "jb-travel-2026", "rail"},
			FeaturedImage: "/images/blog/rts-link-jb-singapore-final-testing-2026.jpg",
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
<p>For commuters already living between both cities, JB accommodation is increasingly a practical choice. At <strong>RM30/night on weekdays</strong> and <strong>RM35/night on weekends</strong>, a monthly stay from <strong>RM594</strong>, and a 10-minute drive to the crossing — the numbers work well as a base while the RTS testing phase completes.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"johor-bahru", "july", "low-season", "durian-season", "budget-travel", "things-to-do", "travel-tips"},
			FeaturedImage: "/images/blog/july-best-month-visit-johor-bahru-low-season.jpg",
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
<p>We are a short walk from Taman Pelangi's row of kopitiam and casual restaurants, and roughly <strong>10 minutes' drive from JB Sentral and the CIQ causeway checkpoint</strong>. 24/7 self check-in means no pressure to arrive at a particular hour — useful if your bus from Singapore runs late. Standard check-in is from <strong>2:00 PM</strong>; check-out by <strong>12:00 PM</strong>. Free WiFi throughout. WhatsApp us on <strong>+60 12-708 8789</strong> for any questions about July availability or longer stays (monthly rates from <strong>RM594</strong> for those considering an extended base).</p>
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
			ImageAlt:      "Inside a capsule pod at Pelangi Capsule Hostel, Johor Bahru — monthly stays from RM594 for Singapore commuters",
			Title:         "RM594/Month Capsule Pod: The Honest Maths for JB-Based Singapore Commuters",
			Excerpt:       "If you're starting a new job in Singapore and not ready to sign a 12-month tenancy, a monthly capsule pod in JB changes the financial equation significantly. Here's how the numbers actually stack up.",
			Date:          "2026-07-11",
			Category:      "Career & Work",
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"monthly-stay", "jb-singapore-commute", "budget-accommodation", "johor-bahru", "long-stay", "capsule-hostel", "cost-of-living"},
			FeaturedImage: "/images/blog/rm594-month-jb-long-stay-singapore-commute-base.jpg",
			Content: `
<h2>The Problem With Signing a Tenancy Before Your Job Starts</h2>
<p>You've landed a job offer in Singapore. The start date is three weeks away. Your new employer wants you at the office in Toa Payoh. You're sitting in Johor Bahru, Googling "room rental JB near CIQ" and realising that every room listing comes with strings attached: two months deposit, one month advance, 12-month contract, utilities separate.</p>
<p>For someone on probation — typically three to six months — signing a 12-month tenancy before you even know if the role works out is a significant financial bet. This post runs through the honest maths of using a monthly capsule pod at <strong>Pelangi Capsule Hostel</strong> as your base during those first months, versus committing to a conventional room rental. It's not the right answer for everyone, and I'll be clear about who it suits and who it doesn't.</p>

<h2>What a Monthly Stay at Pelangi Actually Costs</h2>
<p>Monthly stays at Pelangi start from <strong>RM594/month</strong>. That rate covers your capsule pod, utilities, and WiFi — no separate bills, no deposit contract, no minimum tenure beyond the month you pay for. You can check in on a Monday and check out 30 days later if something changes.</p>
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
      <td>RM594</td>
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
  <li><strong>Prioritising cash flow</strong> — RM594/month leaves more runway than a tenancy deposit during the gap between job start and first payslip</li>
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
<p>The RM594/month pod isn't for everyone, and it isn't supposed to be. But for a single person starting a new Singapore role and wanting to preserve cash flow during probation, it removes a significant upfront cost (no deposit lock-in) and keeps your options open. Food in Taman Pelangi is within walking distance — hawker meals from RM5–8 — and the crossing to Singapore is a known quantity once you build the rhythm into your mornings.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"singapore", "work-permit", "lqs", "s-pass", "malaysian-workers", "career", "policy-2026"},
			FeaturedImage: "/images/blog/singapore-lqs-1800-july-2026-malaysians-guide.jpg",
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
<p>Pelangi Capsule Hostel is a 10-minute drive from JB Sentral and CIQ. If you're commuting daily to Singapore for interviews, trial shifts, or your first weeks on a new job, the location works in your favour. Pods are <strong>RM30/night on weekdays and RM35/night on weekends</strong>, with monthly rates from <strong>RM594</strong> (utilities and WiFi included). No deposit, no minimum tenancy — monthly stays renew on your terms.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"durian-season", "johor-bahru", "food", "musang-king", "budget-travel", "tan-hiok-nee", "night-stalls"},
			FeaturedImage: "/images/blog/jb-durian-season-july-2026-budget-guide.jpg",
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
<p>Pelangi Capsule Hostel puts you in Taman Pelangi — close to the city's food belt, ~10 minutes from JB Sentral and the CIQ checkpoint, and a short Grab from Tan Hiok Nee. <a href="/rooms">Capsule pods</a> are RM30/night on weekdays and RM35/night on weekends, with monthly rates from RM594. Check-in is 2:00 PM, check-out 12:00 PM, and the property runs 24/7 self check-in — so if your durian run goes late, there is no reception cut-off to worry about. WhatsApp us at <strong>+60 12-708 8789</strong> if you have any questions before you arrive.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"job-fair", "johor-bahru", "jobs", "work-in-singapore", "career", "budget-weekend", "mid-valley-southkey"},
			FeaturedImage: "/images/blog/mystarjob-fair-jb-july-2026-weekend-plan.jpg",
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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru", "transit", "foreign-workers", "senai-airport", "changi", "budget-accommodation", "causeway"},
			FeaturedImage: "/images/blog/jb-transit-base-foreign-workers-guide.jpg",
			Content: `
<h2>The Short Version</h2>
<p>We see this pattern regularly at Pelangi Capsule Hostel: a guest from Myanmar, Indonesia, or the Philippines checks in late at night, sleeps, and is gone by morning to catch a flight or cross back into Singapore. Sometimes it's two or three nights while they sort paperwork or wait on a work-permit outcome. JB has become a quiet but reliable transit hub for foreign workers in the region — and this guide explains why, and how to plan it properly.</p>

<h2>Why JB Makes Sense as a Transit Base</h2>
<p>The cost logic is straightforward. A capsule pod at Pelangi is <strong>RM30 per night on weekdays and RM35 on weekends</strong>, with monthly stays from RM594. Compare that to airport hotel rates in Singapore or even budget hostels near Changi — you are almost always paying significantly more on the Singapore side. For workers who are between contracts, waiting on documentation, or simply passing through on their way home, those savings compound over even a short stay.</p>
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
      <td>From RM594</td>
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"room-for-rent", "bilik-sewa", "taman-pelangi", "johor-bahru", "monthly-rental", "long-stay", "budget-accommodation"},
			FeaturedImage: "/images/blog/room-for-rent-taman-pelangi-jb-rm500-month.jpg",
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
    <tr><td>Price</td><td>From RM500/month + RM250 deposit</td><td>From RM594/month, no deposit contract</td></tr>
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "grab", "e-hailing", "driver", "malaysia", "side-hustle"},
			FeaturedImage: "/images/blog/grab-driver-jb-guide-2026.jpg",
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
<p>The biggest lever on gig income is not the app — it is your fixed costs. Drivers staying at <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi pay <strong>RM30/night on weekdays (RM35 weekends)</strong>, or <strong>RM594/month</strong> for long-stayers, with private rooms from <strong>RM500/month</strong> above the 7-Eleven on Jalan Perang. You are 10–15 minutes from the CIQ queue, in the middle of the mall belt, with fast WiFi for the driver app and 24/7 self check-in after late shifts.</p>
<p><a href="/book">Book a pod</a>, or run the numbers first with our <a href="/blog/gig-worker-jb-monthly-budget-guide">gig worker monthly budget guide</a> and the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">RM594/month capsule maths</a>.</p>

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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "grab", "lalamove", "foodpanda", "delivery", "comparison"},
			FeaturedImage: "/images/blog/delivery-gig-apps-jb-comparison-2026.jpg",
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
<p>A 12-month tenancy with a two-plus-one deposit makes no sense when your income flexes week to week. <a href="/rooms">Pelangi Capsule Hostel</a> in Taman Pelangi — mid-belt between the CIQ, City Square, and KSL — runs <strong>RM30/night on weekdays (RM35 weekends)</strong>, <strong>RM594/month</strong> for capsule long-stayers, and private rooms from <strong>RM500/month</strong> above the 7-Eleven on Jalan Perang, all with fast WiFi and 24/7 self check-in for late shifts.</p>
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
			Title:         "Living in JB on Gig Income: The Full Monthly Budget (RM594 Rent, RM10 Meals, Real Numbers)",
			Excerpt:       "What a month in Johor Bahru actually costs a delivery rider or e-hailing driver: rent from RM500–594, hawker food at RM10–15 a meal, petrol, data — and how much a stacked gig income leaves over.",
			Date:          "2026-08-01",
			Category:      "Career & Work",
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "budget", "cost-of-living", "monthly-stay", "long-stay", "delivery"},
			FeaturedImage: "/images/blog/gig-worker-jb-monthly-budget-guide.jpg",
			Content: `
<h2>The Question Behind Every Gig Sign-Up</h2>
<p>Can I actually live on this? Delivery and e-hailing income in JB flexes week to week, so the way to answer it is from the cost side: pin your fixed costs low enough that an average month clears them comfortably, and a bad month still covers them. This post lays out a complete, honest month of JB costs for a gig worker — no aspirational condo rent, no pretending you cook every meal.</p>

<h2>The Whole Month in One Table</h2>
<table>
  <thead>
    <tr><th>Item</th><th>Lean</th><th>Comfortable</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Rent — capsule pod (monthly)</strong></td><td>RM594</td><td>RM594</td><td>Utilities and WiFi included, no deposit, month to month</td></tr>
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
    <tr><th></th><th>Monthly Capsule — RM594</th><th>Private Room — from RM500</th></tr>
  </thead>
  <tbody>
    <tr><td>Move-in cost</td><td>RM594, no deposit</td><td>First month + flat RM250 deposit</td></tr>
    <tr><td>Space</td><td>Enclosed pod, locker, shared facilities</td><td>Full room with your own door</td></tr>
    <tr><td>Included</td><td>WiFi, utilities, kitchen, lounge</td><td>7-Eleven downstairs, neighbourhood on foot</td></tr>
    <tr><td>Suits</td><td>Light packers, first 1–3 months in JB</td><td>Longer stints, more gear, couples of possessions</td></tr>
  </tbody>
</table>
<p>Full details in the <a href="/blog/rm594-month-jb-long-stay-singapore-commute-base">RM594/month capsule maths</a> and the <a href="/blog/room-for-rent-taman-pelangi-jb-rm500-month">RM500/month private room guide</a>.</p>

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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"gig-economy", "johor-bahru", "foodpanda", "delivery", "rider", "malaysia", "side-hustle"},
			FeaturedImage: "/images/blog/foodpanda-rider-jb-guide-2026.jpg",
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
<p>Your shift schedule is peaks-based, so live where the peaks are. <a href="/rooms">Pelangi Capsule Hostel</a> puts you inside the delivery zone: pods at <strong>RM30/night weekdays (RM35 weekends)</strong>, <strong>RM594/month</strong> for monthly capsule stays, and private rooms from <strong>RM500/month</strong> above the 7-Eleven on Jalan Perang. Hot showers after a rain shift, lockers for your gear, fast WiFi for session booking, and 24/7 self check-in when dinner peak runs late.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"johor-bahru", "hospitals", "medical-emergency", "foreigner-travel", "health", "expat"},
			FeaturedImage: "/images/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs.jpg",
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
<p>Our pods start at <strong>RM30/night weekdays</strong> and <strong>RM35/night weekends</strong>, with monthly stays from <strong>RM594</strong>. Check-in from 2:00 PM, check-out by 12:00 PM. <a href="/book">Book your stay</a> and travel with one less thing to worry about.</p>

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
			Author:        "Jay Lew",
			ReadTime:      "7 min read",
			Tags:          []string{"safety", "scam-awareness", "johor-bahru", "travel-tips", "local-life"},
			FeaturedImage: "/images/blog/online-friend-romance-scam-safety-johor-bahru.jpg",
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
<p>We are located at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong>. Capsule pods start from <strong>RM30/night on weekdays</strong> and <strong>RM35/night on weekends</strong>, with monthly packages from <strong>RM594</strong>. Check-in is at 2 PM and check-out at 12 PM. <a href="/book">Book your pod here</a> or <a href="/contact">reach us on WhatsApp at +60 12-708 8789</a>.</p>

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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"economy-rice", "chap-fan", "nasi-campur", "taman-pelangi", "cheap-food", "hawker", "johor-bahru", "budget-travel"},
			FeaturedImage: "/images/blog/cheap-mixed-rice-economy-rice-taman-pelangi-jb.jpg",
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
<p>Pelangi Capsule Hostel is at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong> — the same street as Bar Wang Rice and FECA &amp; Kopi, two minutes from the hawker centre. Pods start at <strong>RM30/night on weekdays and RM35 on weekends</strong>. Monthly stays from <strong>RM594</strong>. Check-in from 2 PM, check-out by 12 PM. Questions? WhatsApp us at <strong>+60 12-708 8789</strong>.</p>
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
			Author:        "Jay Lew",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "language-exchange", "english-practice", "mandarin", "malay", "students", "local-life"},
			FeaturedImage: "/images/blog/language-exchange-partner-johor-bahru-practice-english.jpg",
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
<p>Pods start at <strong>RM30/night on weekdays, RM35 on weekends</strong>, with monthly stays from <strong>RM594</strong>. Check-in is from 2:00 PM, check-out by 12:00 PM. Find us at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. WhatsApp us at <strong>+60 12-708 8789</strong> or <a href="/book">book a pod online</a> — and start practising from day one.</p>

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
			Author:        "Jay Lew",
			ReadTime:      "5 min read",
			Tags:          []string{"tourism-tax", "budget-travel", "johor-bahru", "cash-payment", "walk-in", "malaysia-travel", "practical-guide"},
			FeaturedImage: "/images/blog/malaysia-tourism-tax-jb-hostel-walk-in-guide.jpg",
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
<p>At <strong>Pelangi Capsule Hostel</strong>, capsule pods start at <strong>RM30/night on weekdays, RM35/night on weekends</strong>. Monthly stays from <strong>RM594</strong>. Walk-in guests are welcome — no reservation required if beds are available.</p>
<p>We are at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru — about 10 minutes by Grab from JB Sentral or the Causeway CW1/CW2 bus stops. Check-in from 2:00 PM, checkout by 12:00 PM.</p>
<p>Want to check availability before walking in? <a href="/book">See live availability here</a> or WhatsApp us at +60 12-708 8789. Full specs and photos at our <a href="/rooms">rooms page</a>.</p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.customs.gov.my/en/tt/Pages/Overview-of-Tourism-Tax.aspx" target="_blank" rel="noopener">Royal Malaysian Customs Department — Tourism Tax overview</a></li>
  <li><a href="https://www.motac.gov.my/" target="_blank" rel="noopener">Ministry of Tourism, Arts and Culture Malaysia</a></li>
</ul>
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
