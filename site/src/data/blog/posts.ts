export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  date: string; // YYYY-MM-DD
  category: string;
  author: string;
  readTime: string;
  tags: string[];
  featuredImage: string;
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

export const blogPosts: BlogPost[] = [
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
