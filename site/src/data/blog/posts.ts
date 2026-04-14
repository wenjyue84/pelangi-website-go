export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string
  date: string; // YYYY-MM-DD (published)
  lastModified?: string; // YYYY-MM-DD (last edited — used as dateModified in schema)
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
    author: "Jay Lew",
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
  {
    slug: "lalamove-driver-malaysia-jb-guide",
    title: "Lalamove Driver Guide Malaysia: Earn RM25–80 Per Job in JB",
    excerpt:
      "How to become a Lalamove driver in Malaysia, from registration to first earning. Vehicle types, RM25–80 per job, registration steps, and comparison with Foodpanda and Grab.",
    date: "2026-04-14",
    category: "Career & Work",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["gig-economy", "johor-bahru", "lalamove", "delivery", "malaysia", "side-hustle"],
    featuredImage: "/images/blog/lalamove-driver-guide.jpg",
    content: `
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
<p><strong>Tip:</strong> Many drivers work all three platforms. Lalamove mornings, Foodpanda lunch, Grab evenings = maximized income.</p>

<h2>Start Today</h2>
<p>Download Lalamove Driver, submit documents, and earn within days. You're your own boss—set your hours, keep your income, grow your earnings.</p>

<p>Staying in JB? <a href="/rooms">Pelangi Capsule Hostel</a> is perfect for gig workers. Reliable WiFi, community of hustlers, <a href="/book">book now</a>.</p>
`,
  },
  {
    slug: "taman-pelangi-tuesday-night-market-guide",
    title: "Taman Pelangi Tuesday Night Market — The Street Food Paradise at Our Doorstep",
    excerpt:
      "Every Tuesday from 4:30 PM, Jalan Perang transforms into a 500m street food carnival. Satay, carrot cake, martabak, fresh seafood — all steps from Pelangi Capsule Hostel.",
    date: "2026-04-15",
    category: "Food & Drink",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["johor-bahru", "night-market", "pasar-malam", "street-food", "taman-pelangi", "budget-travel"],
    featuredImage: "/images/blog/jb-food-guide.jpg",
    content: `
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
  {
    slug: "taman-pelangi-xingqier-yeshi-gonglue",
    title: "彩虹花园周二夜市攻略｜就在旅馆门口的美食天堂",
    excerpt:
      "每个星期二下午4时半，Jalan Perang就变身500米美食长廊。沙爹、煎蕊、马打峇、海鲜……全在彩虹胶囊旅馆门口等着你！",
    date: "2026-04-15",
    category: "旅游攻略",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["新山", "夜市", "pasar-malam", "彩虹花园", "街头美食", "马来西亚"],
    featuredImage: "/images/blog/jb-food-guide.jpg",
    content: `
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
  {
    slug: "zhongguo-huhao-malaxi-a-mianshen-gonglue-2026",
    title: "中国护照去马来西亚需要签证吗？2026最新免签攻略",
    excerpt:
      "好消息！中国护照持有者赴马来西亚已享30天免签。本文详解免签条件、入境流程、注意事项，以及新山最佳住宿推荐。",
    date: "2026-04-14",
    category: "签证攻略",
    author: "Jay Lew",
    readTime: "6 min read",
    tags: ["中国游客", "马来西亚免签", "签证攻略", "新山", "柔佛", "出行攻略"],
    featuredImage: "/images/blog/jb-3-days.jpg",
    content: `
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
  <li>每晚 <strong>RM37.80</strong>（含旅游税），约合人民币 60-70 元</li>
  <li>24小时自助入住，无需等前台</li>
  <li>免费高速 WiFi，普通话友好</li>
  <li>旁边就是每周二夜市，步行可达多家餐厅</li>
</ul>
<p><a href="/zh/rooms">查看房型</a> 或 <a href="/book">立即预订</a>，直接通过 WhatsApp 联系，无需平台手续费。</p>
`,
  },
  {
    slug: "xinshan-weixin-zhifubao-zhongguo-youke-zhifu-zhinan",
    title: "新山可以用微信支付和支付宝吗？中国游客支付完全指南 2026",
    excerpt:
      "好消息：新山越来越多商家接受微信支付和支付宝！本文整理哪些地方可用、如何换汇、及现金与手机支付的实用建议。",
    date: "2026-04-14",
    category: "签证攻略",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["中国游客", "微信支付", "支付宝", "新山", "马来西亚", "换汇"],
    featuredImage: "/images/blog/jb-transport-guide.jpg",
    content: `
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
<p><a href="/zh/rooms">彩虹胶囊旅馆</a>接受网上银行转账和 WhatsApp 直接预订，方便中国游客操作。每晚 RM37.80，约合人民币 60-70 元。<a href="/book">点击预订</a>或 WhatsApp 联系 +60 12-708 8789。</p>
`,
  },
  {
    slug: "xinshan-gouwu-gonglue-zhongguo-youke-2026",
    title: "新山购物完全攻略 2026｜中国游客必逛！比国内便宜多少？",
    excerpt:
      "新山购物比新加坡便宜40%，比国内还有价格优势！本文盘点最值得逛的商场、必买清单、讲价技巧，以及从彩虹旅馆出发的最佳路线。",
    date: "2026-04-14",
    category: "旅游攻略",
    author: "Jay Lew",
    readTime: "7 min read",
    tags: ["中国游客", "新山购物", "马来西亚购物", "柔佛", "攻略", "AEON"],
    featuredImage: "/images/blog/jb-3-days.jpg",
    content: `
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
<p>定位偏年轻时尚，品牌包括 Uniqlo、H&M、Cotton On、Charles & Keith 等，价格比新加坡便宜约30%，比国内也有优势。</p>
<ul>
  <li><strong>Uniqlo</strong>：RM59-199（约人民币 100-350 元），尤其是联名款和功能性内衣</li>
  <li><strong>Charles & Keith 包包</strong>：比新加坡便宜约 20-30%</li>
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
  <li>Charles & Keith、Pedro 包鞋</li>
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
  <li>在旅馆附近寄送：马来西亚 Pos Laju 或 J&T Express 可寄国际包裹</li>
  <li>提前在航空公司官网购买额外行李额（比机场便宜50%）</li>
  <li>带一个可折叠的备用行李袋（旅馆有推荐本地文具店）</li>
</ul>

<p>准备好购物了吗？<a href="/zh/rooms">预订彩虹胶囊旅馆</a>，RM37.80/晚，步行即达夜市，Grab 直达各大商场。<a href="/book">立即预订</a>或 WhatsApp：+60 12-708 8789。</p>
`,
  },
  {
    slug: "xinshan-zhongguo-youke-bichi-mishi-gonglue",
    title: "中国游客在新山必吃什么？清真与非清真美食完全指南",
    excerpt:
      "马来西亚是美食天堂，但清真（Halal）规定让部分中国游客摸不着头脑。本文教你如何分辨，以及中国游客最爱的新山美食推荐。",
    date: "2026-04-14",
    category: "住宿指南",
    author: "Jay Lew",
    readTime: "7 min read",
    tags: ["中国游客", "新山美食", "清真美食", "马来西亚饮食", "柔佛", "吃喝攻略"],
    featuredImage: "/images/blog/jb-food-guide.jpg",
    content: `
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
  {
    slug: "getting-around-johor-bahru-no-car-guide",
    title: "Getting Around Johor Bahru Without a Car — Transport Guide for Backpackers",
    excerpt:
      "Master JB transport on a budget: Grab (RM5–15), Rapid JB buses (RM1–3), walking Taman Pelangi, and crossing to Singapore. Complete price comparison.",
    date: "2026-04-14",
    category: "Travel Tips",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["johor-bahru", "transport", "backpacker", "budget-travel", "grab", "bus", "getting-around"],
    featuredImage: "/images/blog/jb-transport-guide.jpg",
    content: `
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
  {
    slug: "laksa-johor-guide-best-places-to-eat",
    title: "Laksa Johor Guide — Authentic Dish, Where to Eat, and What Makes It Unique (2026)",
    excerpt:
      "Deep-dive guide on Laksa Johor—a creamy coconut-based noodle dish unique to Johor. Covers history, what makes it different from other laksa variants, and the best stalls in JB.",
    date: "2026-04-15",
    category: "Food & Drink",
    author: "Jay Lew",
    readTime: "6 min read",
    tags: ["food", "johor", "specialty-dish", "jb-guide"],
    featuredImage: "/images/blog/laksa-johor-guide.jpg",
    content: `
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
  {
    slug: "mee-rebus-johor-bahru-guide",
    title: "Mee Rebus Johor — History, Best Stalls, and the Famous Haji Wahid Legacy (2026)",
    excerpt:
      "Explore Mee Rebus Johor, a thick sweet-savory gravy noodle with roots dating back to 1918. Discover what makes it unique compared to KL style, and where to find the legendary Haji Wahid stalls.",
    date: "2026-04-15",
    category: "Food & Drink",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["food", "johor", "specialty-dish", "heritage-food"],
    featuredImage: "/images/blog/mee-rebus-johor-guide.jpg",
    content: `
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
  {
    slug: "best-roti-canai-johor-bahru-breakfast-guide",
    title: "Best Roti Canai in Johor Bahru — Breakfast Guide Near Taman Pelangi (2026)",
    excerpt:
      "5 top mamak stalls for roti canai within walking distance of Taman Pelangi. Price comparisons, opening hours, and a quick explainer on roti canai vs prata for Singaporean visitors.",
    date: "2026-04-15",
    category: "Food & Drink",
    author: "Jay Lew",
    readTime: "5 min read",
    tags: ["food", "breakfast", "roti-canai", "taman-pelangi", "budget-food"],
    featuredImage: "/images/blog/best-roti-canai-johor-bahru.jpg",
    content: `
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
  {
    slug: "taman-pelangi-johor-bahru-neighborhood-guide",
    title: "Taman Pelangi Neighborhood Guide: Food, Shops & Things to Do (2026)",
    excerpt:
      "The ultimate guide to Taman Pelangi, Johor Bahru. Discover the best food, shopping, and hidden gems within walking distance of Pelangi Capsule Hostel.",
    date: "2026-04-15",
    category: "Local Guide",
    author: "Jay Lew",
    readTime: "7 min read",
    tags: ["taman-pelangi", "jb-neighborhood", "local-guide", "johor-bahru"],
    featuredImage: "/images/blog/taman-pelangi-neighborhood-guide.jpg",
    content: `
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
  {
    slug: "johor-premium-outlets-vs-singapore-malls-shopping-guide",
    title:
      "Johor Premium Outlets vs Singapore Outlet Malls: Where to Save More (2026)",
    excerpt:
      "Comparing JPO, IMM, and Changi City Point for Singaporeans planning a shopping trip. Brands, discounts, transport costs, and the honest answer to: is JPO worth the trip?",
    date: "2026-04-15",
    category: "Travel Tips",
    author: "Jay Lew",
    readTime: "6 min read",
    tags: ["shopping", "jpo", "johor-premium-outlets", "singapore-shoppers"],
    featuredImage: "/images/blog/johor-premium-outlets.jpg",
    content: `
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
  {
    slug: "cheap-eats-johor-bahru-under-rm10-budget-guide",
    title: "15 Cheap Eats in Johor Bahru Under RM10 - Budget Food Guide (2026)",
    excerpt:
      "Complete list of the best budget-friendly dishes in Johor Bahru, from hawker stalls to kopitiam classics — all under RM10. Perfect for backpackers.",
    date: "2026-04-15",
    category: "Food & Drink",
    author: "Jay Lew",
    readTime: "6 min read",
    tags: ["budget-food", "cheap-eats", "johor-bahru", "hawker-food"],
    featuredImage: "/images/blog/jb-cheap-eats.jpg",
    content: `
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
];

export const blogPosts: BlogPost[] = rawPosts.map((post) => ({
  ...post,
  readingTimeMinutes: computeReadingTime(post.content),
}));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
