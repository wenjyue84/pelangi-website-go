export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  date: string; // YYYY-MM-DD
  category: string;
  author: string;
  readTime: string;
  readingTimeMinutes: number;
  tags: string[];
  featuredImage: string;
}

/** Compute reading time from HTML content (200 wpm, minimum 1 min). */
function computeReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/** Converts a category label to a URL-safe slug. e.g. "Food & Drink" → "food-drink" */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Converts a category slug back to a display label, or returns null if not found. */
export function slugToCategory(slug: string): string | null {
  const found = blogPosts.find((p) => categoryToSlug(p.category) === slug);
  return found ? found.category : null;
}

/** All unique categories in the blog. */
export function getUniqueCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

const rawPosts: Omit<BlogPost, "readingTimeMinutes">[] = [
  {
    slug: "ultimate-jb-food-guide-backpackers",
    title: "The Ultimate Johor Bahru Food Guide for Backpackers (2026)",
    excerpt:
      "From RM5 hawker meals to legendary seafood spots — everything a budget traveller needs to eat their way through JB like a local.",
    date: "2026-02-20",
    category: "Food & Drink",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "food", "backpacker", "budget-travel", "malaysia", "hawker"],
    featuredImage: "/images/blog/jb-food-guide.jpg",
    content: `
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
  {
    slug: "singapore-to-jb-day-trip-causeway-guide",
    title: "Singapore to JB Day Trip Guide: How to Cross the Causeway (2026)",
    excerpt:
      "The complete step-by-step guide to crossing the Causeway from Singapore to Johor Bahru — transport options, immigration tips, costs, and what to do once you arrive.",
    date: "2026-02-25",
    category: "Travel Tips",
    author: "Pelangi Team",
    readTime: "9 min read",
    tags: ["johor-bahru", "singapore", "causeway", "border-crossing", "backpacker", "budget-travel"],
    featuredImage: "/images/blog/causeway-guide.jpg",
    content: `
<h2>Why Cross the Causeway?</h2>
<p>The Johor–Singapore Causeway is one of the busiest land border crossings in the world, connecting Singapore's Woodlands district to Johor Bahru, Malaysia. For travellers based in Singapore, JB offers dramatically cheaper food, shopping, and accommodation — making it the most popular day trip from the island. For backpackers, it's even more strategic: stay in JB at a fraction of Singapore prices and day-trip into Singapore whenever you want.</p>

<p>The crossing itself is straightforward once you know the drill. This guide covers every option, common mistakes, and what to expect in 2026.</p>

<h2>Option 1: Bus from Woodlands (Most Popular)</h2>
<p>The <strong>Causeway Link CW1</strong> and <strong>SBS Transit 170</strong> buses depart from Woodlands Checkpoint on the Singapore side. Here's the process:</p>
<ol>
  <li><strong>Get to Woodlands:</strong> Take the MRT to Woodlands or Kranji station. From Kranji, bus 160 goes directly to the checkpoint.</li>
  <li><strong>Clear Singapore immigration:</strong> Everyone exits the bus, walks through Singapore passport control, and re-boards.</li>
  <li><strong>Cross the Causeway:</strong> The bus drives across the 1km bridge. Takes 5 minutes without traffic.</li>
  <li><strong>Clear Malaysian immigration:</strong> Everyone exits again, clears Malaysian passport control at JB CIQ (Customs, Immigration & Quarantine).</li>
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
  {
    slug: "top-10-things-to-do-johor-bahru-budget",
    title: "Top 10 Things to Do in Johor Bahru on a Budget",
    excerpt:
      "You don't need to spend big to have a great time in JB. Here are the best free and cheap activities for backpackers exploring Johor Bahru.",
    date: "2026-03-01",
    category: "Things To Do",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "budget-travel", "backpacker", "things-to-do", "malaysia", "free-activities"],
    featuredImage: "/images/blog/jb-budget-activities.jpg",
    content: `
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
  {
    slug: "jb-hawker-centres-street-food-must-visit",
    title: "JB Street Food Hawker Centres You Must Visit",
    excerpt:
      "The best hawker centres in Johor Bahru for backpackers — where locals eat, what to order, and how to eat well for under RM15 per meal.",
    date: "2026-03-05",
    category: "Food & Drink",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "food", "hawker", "street-food", "backpacker", "budget-travel"],
    featuredImage: "/images/blog/jb-hawker-centres.jpg",
    content: `
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
  {
    slug: "johor-bahru-vs-singapore-why-travellers-base-in-jb",
    title: "Johor Bahru vs Singapore: Why Savvy Travellers Base Themselves in JB",
    excerpt:
      "Singapore is spectacular — but staying there drains your budget fast. Smart backpackers stay in JB and day-trip into Singapore. Here's why it works.",
    date: "2026-03-08",
    category: "Travel Tips",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "singapore", "budget-travel", "backpacker", "malaysia", "comparison"],
    featuredImage: "/images/blog/jb-vs-singapore.jpg",
    content: `
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
    <tr><td>Hostel per night</td><td>SGD 45–60</td><td>RM 35–50 (SGD 10–15)</td></tr>
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
  {
    slug: "hidden-gems-johor-bahru-beyond-tourist-spots",
    title: "Hidden Gems in Johor Bahru: Beyond the Usual Tourist Spots",
    excerpt:
      "Skip the malls and tourist traps. These are the places JB locals love — from secret waterfalls to forgotten heritage streets and underground food spots.",
    date: "2026-03-10",
    category: "Local Life",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "hidden-gems", "local-life", "backpacker", "malaysia", "off-the-beaten-path"],
    featuredImage: "/images/blog/jb-hidden-gems.jpg",
    content: `
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
  {
    slug: "how-malaysians-find-jobs-singapore-2026",
    title: "How Malaysians Can Find Jobs in Singapore (2026 Guide)",
    excerpt:
      "Step-by-step guide for Malaysian job seekers: job portals, work passes, salary expectations, and interview tips for landing a Singapore role.",
    date: "2026-04-14",
    category: "Career & Work",
    author: "Pelangi Team",
    readTime: "10 min read",
    tags: ["singapore", "jobs", "career", "work-pass", "malaysia", "job-search"],
    featuredImage: "/images/blog/singapore-jobs-guide.jpg",
    content: `
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
<li><strong>Angel List & TechJobs:</strong> Startups offer better relocation packages and visa certainty than traditional corporates. Smaller companies move faster on hiring too.</li>
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

<h2>Resources & Support</h2>
<p><strong>Ministry of Manpower (MOM):</strong> mom.gov.sg—official visa requirements, forms, processing status. Read Employment Pass and S Pass guides thoroughly. <strong>Expats in Singapore communities:</strong> Reddit's r/singapore and Facebook groups have active Malaysians answering relocation questions daily.</p>

<h2>Making Your Move</h2>
<p>Cross-border job hunting is achievable with clear strategy. Start applications 10 weeks ahead. Use LinkedIn and MyCareersFuture daily. Engage reputable agencies. Understand visa timelines and requirements. The salary premium is substantial—expect 3–5x growth. The process is bureaucratic but predictable. Many Malaysians hesitate due to visa complexity; educated candidates succeed. Move intentionally, and you'll cross the Causeway as a prepared professional ready to thrive in Singapore's economy.</p>
`,
  },
  {
    slug: "singapore-work-pass-guide-malaysians",
    title: "Singapore Work Pass Guide for Malaysians: EP vs S Pass vs Work Permit",
    excerpt:
      "Understand the three main Singapore work pass types for Malaysians: Employment Pass, S Pass, and Work Permit. Compare salary minimums, eligibility, and which visa suits your career stage.",
    date: "2026-04-14",
    category: "Career & Work",
    author: "Pelangi Team",
    readTime: "12 min read",
    tags: ["singapore", "work-pass", "career", "expat", "malaysia", "employment-pass", "visa"],
    featuredImage: "/images/blog/singapore-work-pass-guide.jpg",
    content: `
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
  {
    slug: "jb-singapore-commuter-guide-2026",
    title: "Living in Johor Bahru, Working in Singapore: The Commuter's Guide 2026",
    excerpt:
      "Cross the Causeway daily and save money. Everything Malaysians need to know about commuting from JB to Singapore: bus options, CIQ crossings, costs, and why it works.",
    date: "2026-04-14",
    category: "Career & Work",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "singapore", "commuter", "work", "malaysia", "cross-border", "cost-of-living"],
    featuredImage: "/images/blog/jb-singapore-commuter.jpg",
    content: `
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

<p><a href="/rooms">Book a stay at Pelangi Capsule</a> as your first base in JB, and start your cross-border commute from there.</p>
`,
  },
  {
    slug: "gig-jobs-malaysia-waiting-singapore-work-pass",
    title: "5 Gig Jobs for Malaysians Waiting for Singapore Work Approval",
    excerpt:
      "Stuck in the work pass waiting period? Make money while you wait. Foodpanda, Lalamove, Grab, and more—5 flexible gig economy jobs in Malaysia with realistic earnings.",
    date: "2026-04-14",
    category: "Career & Work",
    author: "Pelangi Team",
    readTime: "9 min read",
    tags: ["gig-economy", "malaysia", "work", "freelance", "income", "job-seeker"],
    featuredImage: "/images/blog/gig-jobs.jpg",
    content: `
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

<h2>4. Part-Time F&B / Cafe Work — RM1,500–2,500/month</h2>
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

<h2>Tax and Legal</h2>
<p>Gig income is generally taxable. Keep earnings records. Check your work visa terms—S Pass and Employment Pass typically allow gig work outside your primary job. Confirm with your employer before starting.</p>

<h2>Pelangi Guests & Gap-Filling</h2>
<p>Many guests stay with us during that 4–12 week limbo. Those who pick up gig work report three wins: (1) funding relocation costs, (2) staying mentally active, (3) natural downtime when returning to Pelangi. Several guests deliver Foodpanda and work from our common areas.</p>

<h2>Next Steps</h2>
<p>Choose a gig: Foodpanda for ease, freelancing for scalability, F&B for social connection. <a href="/rooms">Book a stay at Pelangi Capsule</a> as your base while you earn and prepare for Singapore.</p>
`,
  },
  {
    slug: "3-day-jb-backpacker-itinerary-rm250",
    title: "3-Day JB Backpacker Itinerary Under RM250 (2026)",
    excerpt:
      "A complete 3-day itinerary for JB on a tight budget: RM35/night hostel, RM25/day food, RM10/day transport. Day-by-day breakdown with best food spots and activities.",
    date: "2026-04-14",
    category: "Backpacker Tips",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["johor-bahru", "backpacker", "budget-travel", "itinerary", "malaysia", "hostel"],
    featuredImage: "/images/blog/jb-backpacker-itinerary.jpg",
    content: `
<h2>The RM250 Challenge: Is It Possible?</h2>
<p>Three days in Johor Bahru for under RM250 total? Yes. This includes accommodation, all meals, transport, and activities. Here's the day-by-day breakdown that proves it.</p>

<h2>Day 1: Arrival & City Orientation</h2>
<p><strong>Morning (9am–12pm):</strong> Arrive at JB Sentral station. Walk or take local bus (RM2) to <a href="/book">Pelangi Capsule Hostel</a>. Check in early (RM35/night), drop bags, freshen up. Cost: RM2 transport.</p>
<p><strong>Afternoon (1pm–5pm):</strong> Lunch at Sik Bao Sin hawker centre—mixed rice with 3 items, RM6. Walk around Taman Pelangi neighbourhood (free). Visit the traditional Chinese temple nearby (free entry). Coffee at local kopitiam, RM3.</p>
<p><strong>Evening (6pm–10pm):</strong> Dinner at Taman Sentosa night market—satay skewers (5 sticks, RM3), lok-lok (RM4), teh tarik (RM2). Return to hostel. Total Day 1: RM55.</p>

<h2>Day 2: Food & Culture Deep Dive</h2>
<p><strong>Morning (8am–11am):</strong> Breakfast—roti canai + teh tarik at mamak, RM5. Grab to nearby Johor Art Gallery or street art walk (free/RM5 entry). Visit local market, RM3 (exploratory snacks).</p>
<p><strong>Afternoon (12pm–4pm):</strong> Lunch at laksa stall, RM7 (laksa Johor specialty). Rest at hostel or visit free museum. Explore the Waterfront area by foot (free). Snack—martabak + juice, RM5.</p>
<p><strong>Evening (6pm–10pm):</strong> Dinner at San Low Seafood restaurant—dry-fried bee hoon (small portion), RM12. Dessert: ice kacang at hawker, RM2. Chat with other backpackers at hostel common area (free). Total Day 2: RM59.</p>

<h2>Day 3: Last Day Exploration & Departure</h2>
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
    <td style="padding:10px;"><strong>Activities & Misc</strong> (Museum, snacks, buffer)</td>
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
  {
    slug: "xinshan-juzhu-tuijian-jiaonang-lvguan",
    title: "新山住宿推荐：胶囊旅馆体验指南 (2026)",
    excerpt:
      "新山最值得入住的胶囊旅馆是哪家？本文带你深入了解Pelangi胶囊旅馆——价格、设施、位置，一文读懂。",
    date: "2026-04-14",
    category: "住宿指南",
    author: "Pelangi Team",
    readTime: "6 min read",
    tags: ["新山", "住宿", "胶囊旅馆", "马来西亚", "背包旅行", "柔佛"],
    featuredImage: "/images/blog/jb-food-guide.jpg",
    content: `
<h2>为什么选择胶囊旅馆？</h2>
<p>胶囊旅馆（Capsule Hostel）源自日本，以其高性价比和私密性著称。每个床位配备独立的私人舱体，拥有个人插座、USB充电口、阅读灯和拉帘，让你在共享空间中享有属于自己的小天地。对于独自旅行者、背包客和数字游民来说，胶囊旅馆是兼顾预算与品质的最佳选择。</p>

<h2>Pelangi胶囊旅馆：新山最受欢迎的背包客据点</h2>
<p><strong>彩虹胶囊旅馆（Pelangi Capsule Hostel）</strong>位于新山Taman Pelangi区，距离新山关卡（JB Sentral CIQ）约15分钟车程，交通便利，周边餐饮选择丰富。</p>

<h3>房型与价格</h3>
<ul>
  <li><strong>混合宿舍（Mixed Dorm）</strong>：每晚 RM37.80（含旅游税），月租 RM594</li>
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
  {
    slug: "xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan",
    title: "从新加坡去新山怎么去？2026最新交通全攻略",
    excerpt:
      "地铁、巴士、自驾……从新加坡前往新山的所有交通方式详细对比，附最新过关攻略和省钱小技巧。",
    date: "2026-04-14",
    category: "交通攻略",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["新加坡", "新山", "交通", "过关", "长堤", "马来西亚"],
    featuredImage: "/images/blog/causeway-guide.jpg",
    content: `
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
  {
    slug: "xinshan-ziyou-xing-gonglue-2026",
    title: "新山自由行攻略 2026：吃喝玩乐全指南",
    excerpt:
      "新山不只是过境城市！本文带你探索新山最值得打卡的景点、美食和购物地，附三天两夜行程规划。",
    date: "2026-04-14",
    category: "旅游攻略",
    author: "Pelangi Team",
    readTime: "10 min read",
    tags: ["新山", "自由行", "旅游攻略", "马来西亚", "柔佛", "Visit Malaysia 2026"],
    featuredImage: "/images/blog/jb-3-days.jpg",
    content: `
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
  <li><strong>住宿</strong>：<a href="/zh/rooms">彩虹胶囊旅馆</a>每晚仅需 RM37.80，是背包客的最佳选择</li>
</ul>

<p>还在犹豫？<a href="/book">立即预订</a>，开始你的新山自由行！或通过 <strong>WhatsApp (+60 12-708 8789)</strong> 与我们联系获取更多旅游建议。</p>
`,
  },
];

export const blogPosts: BlogPost[] = rawPosts.map((post) => ({
  ...post,
  readingTimeMinutes: computeReadingTime(post.content),
}));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
