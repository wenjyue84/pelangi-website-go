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

export const blogPosts: BlogPost[] = [
  {
    slug: "jb-guide-backpackers-2026",
    title: "The Ultimate JB Guide for Backpackers in 2026",
    excerpt:
      "Everything you need to know about Johor Bahru — transport, food, money-saving tips, and the best things to do on a shoestring budget.",
    date: "2026-02-20",
    category: "Travel Guide",
    author: "Pelangi Team",
    readTime: "8 min read",
    tags: ["Johor Bahru", "backpacking", "budget travel", "Malaysia"],
    featuredImage: "/images/blog/jb-guide.jpg",
    content: `
<h2>Welcome to Johor Bahru</h2>
<p>Johor Bahru — or JB as locals call it — is Malaysia's southernmost city, sitting just across the Causeway from Singapore. For backpackers, it's a goldmine: world-class street food, friendly locals, and costs that are a fraction of its neighbour.</p>

<h2>Getting Here</h2>
<p>The easiest way to reach JB is by bus or train from Singapore's Woodlands or Kranji MRT stations. The <strong>Causeway Link Bus</strong> runs 24/7 and costs about RM3–5. If you're coming from Kuala Lumpur, take the ETS train to JB Sentral (from RM35).</p>

<h2>Getting Around JB</h2>
<p>Grab (Southeast Asia's Uber) is your best friend here. Most rides within the city cost RM5–12. Alternatively, rent a bicycle for free exploration of Taman Pelangi and the surrounding neighbourhood.</p>

<h2>Where to Sleep</h2>
<p>Pelangi Capsule Hostel in Taman Pelangi offers Japanese-style pods from RM35/night — one of the best-value sleeps in the city. You get private capsule space, free WiFi, hot showers, and a locker for your gear.</p>

<h2>What to Eat</h2>
<ul>
  <li><strong>Sik Bao Sin</strong> — Mixed rice paradise right opposite the hostel. RM5–8 a meal.</li>
  <li><strong>San Low Seafood</strong> — Famous for San Lou Bee Hoon. Go for dinner.</li>
  <li><strong>Taman Sentosa Night Market</strong> — Satay, lok-lok, and all the hawker classics.</li>
  <li><strong>Kumamoto Ramen</strong> — When you want a break from local food.</li>
</ul>

<h2>Top Things to Do</h2>
<ol>
  <li>Day trip to Singapore (just 30 minutes away)</li>
  <li>Explore Jalan Tan Hiok Nee for street art and indie cafes</li>
  <li>Visit Arulmigu Sri Rajakaliamman Glass Temple</li>
  <li>Shop at City Square or Komtar JBCC</li>
  <li>Eat your way through a hawker night market</li>
</ol>

<h2>Money Tips</h2>
<p>RM1 is roughly SGD0.30. Withdraw ringgit from ATMs in JB (better rates than money changers in Singapore). A daily budget of RM80–120 covers accommodation, three meals, and transport comfortably.</p>
`,
  },
  {
    slug: "singapore-day-trip-from-jb",
    title: "How to Do a Singapore Day Trip from JB (Step-by-Step)",
    excerpt:
      "Cross the Causeway, visit the best spots in Singapore, and be back in JB before dinner. Here's the exact playbook.",
    date: "2026-02-25",
    category: "Day Trips",
    author: "Pelangi Team",
    readTime: "6 min read",
    tags: ["Singapore", "day trip", "Causeway", "border crossing"],
    featuredImage: "/images/blog/singapore-day-trip.jpg",
    content: `
<h2>Why Do a Singapore Day Trip from JB?</h2>
<p>Pelangi Capsule Hostel is just 30 minutes from the Singapore border — making us the perfect base for a Singapore day trip without paying Singapore hotel prices. Save your money for Marina Bay Sands views and Michelin hawker stalls.</p>

<h2>Getting to Singapore</h2>
<p>Take a Grab to the <strong>JB Sentral bus terminal</strong> (RM8–12 from Taman Pelangi). Board the <strong>Causeway Link CW1 bus</strong> (RM3.30 one way). You'll clear Malaysian immigration, ride across the Causeway, and clear Singapore immigration at Woodlands.</p>

<p><strong>Pro tip:</strong> Go early — before 8am or after 10am to avoid peak-hour queues. The whole crossing takes 20–40 minutes on a good day.</p>

<h2>Best Things to Do in Singapore (on a Budget)</h2>
<ul>
  <li><strong>Gardens by the Bay</strong> — Supertrees are free to walk around. The domes cost SGD28 but are worth it.</li>
  <li><strong>Marina Bay Sands observation deck</strong> — SGD26 for the view. Non-negotiable for first-timers.</li>
  <li><strong>Chinatown</strong> — Free street exploration, cheap hawker food at Smith Street Food Centre.</li>
  <li><strong>Little India</strong> — Vibrant, free, and great for people-watching.</li>
  <li><strong>Sentosa Island</strong> — Beach access is free. Cable car is optional.</li>
</ul>

<h2>Eating on a Budget in Singapore</h2>
<p>Hit hawker centres: <strong>Maxwell Food Centre</strong>, <strong>Lau Pa Sat</strong>, or <strong>Old Airport Road Food Centre</strong>. A full meal costs SGD4–8. Avoid restaurants unless you're celebrating.</p>

<h2>Coming Back to JB</h2>
<p>Last buses run until midnight. Keep your return bus ticket or just board any Causeway Link service from Woodlands. You'll be back in JB within the hour — and can enjoy a cold drink at the hostel for a fraction of Singapore prices.</p>

<h2>What to Bring</h2>
<ul>
  <li>Passport (valid for at least 6 months)</li>
  <li>SGD cash or card</li>
  <li>Comfortable walking shoes</li>
  <li>Portable charger</li>
</ul>
`,
  },
  {
    slug: "jb-street-food-guide",
    title: "JB Street Food Guide: 15 Must-Try Dishes Near Taman Pelangi",
    excerpt:
      "From laksa to char kway teow, here's everything you must eat in Johor Bahru — with exact locations near our hostel.",
    date: "2026-03-01",
    category: "Food & Drink",
    author: "Pelangi Team",
    readTime: "5 min read",
    tags: ["food", "hawker", "street food", "Johor Bahru", "local guide"],
    featuredImage: "/images/blog/jb-food.jpg",
    content: `
<h2>JB's Food Scene is Underrated</h2>
<p>Locals will tell you that JB's food scene rivals Penang. Bold claim — but walk the hawker markets at night and you'll understand. The city blends Malay, Chinese, and Indian flavours into something uniquely Johorean.</p>

<h2>Dishes You Must Try</h2>

<h3>1. Laksa Johor</h3>
<p>Unlike the coconut-milk laksa of other states, <strong>Laksa Johor</strong> uses spaghetti-like noodles in a rich fish-based curry gravy. It's hearty and deeply savoury. Try it at Mee Rebus Hj Uda in Taman Pelangi.</p>

<h3>2. Mee Rebus</h3>
<p>Yellow noodles in a thick, slightly sweet gravy topped with boiled egg and tofu. A JB specialty you won't find as good elsewhere in Malaysia.</p>

<h3>3. Otak-Otak</h3>
<p>Fish paste mixed with coconut milk and spices, wrapped in banana leaf and grilled. Buy them hot off the grill from roadside vendors.</p>

<h3>4. San Lou Bee Hoon</h3>
<p>Dry-fried vermicelli with prawns, egg, and soy sauce. San Low Seafood (5 min walk) is legendary for this dish. Go for dinner.</p>

<h3>5. Roti Canai</h3>
<p>Flaky flatbread served with dhal or curry. RM1.50 at any mamak (Indian-Muslim coffee shop). Best breakfast in Malaysia, full stop.</p>

<h3>6. Nasi Lemak</h3>
<p>Coconut rice with sambal, fried chicken, cucumber, and egg. Available everywhere; the best ones have house-made sambal.</p>

<h3>7. Char Kway Teow</h3>
<p>Wok-fried flat rice noodles with cockles, Chinese sausage, and bean sprouts. Look for the char (smokiness) from high heat.</p>

<h2>Night Markets to Visit</h2>
<ul>
  <li><strong>Pasar Malam Taman Pelangi</strong> — Wednesday nights, 10 min walk from hostel</li>
  <li><strong>Taman Sentosa Night Market</strong> — Thursday and Sunday nights</li>
  <li><strong>Pasar Karat (Flea Market)</strong> — Sunday mornings along Jalan Wong Ah Fook</li>
</ul>

<h2>Budget</h2>
<p>A full hawker meal costs RM6–12. Add a teh tarik (pulled tea) for RM2. You can eat incredibly well on RM30–40 per day if you stick to hawker stalls and mamaks.</p>
`,
  },
  {
    slug: "what-to-do-jb-weekend",
    title: "48 Hours in JB: The Perfect Weekend Itinerary",
    excerpt:
      "A tight two-day plan for first-time visitors to Johor Bahru — from Saturday breakfast to Sunday night, covering food, culture, and the best local spots.",
    date: "2026-03-05",
    category: "Itineraries",
    author: "Pelangi Team",
    readTime: "7 min read",
    tags: ["itinerary", "weekend", "Johor Bahru", "first-time visitor"],
    featuredImage: "/images/blog/jb-weekend.jpg",
    content: `
<h2>Saturday</h2>

<h3>Morning: Breakfast & Old JB</h3>
<p>Start with roti canai at a mamak near the hostel (RM3–5). Then grab a Grab to <strong>Jalan Tan Hiok Nee</strong> — JB's heritage street lined with century-old shophouses, indie cafes, and street murals. Walk the length of it slowly.</p>

<h3>Late Morning: Arulmigu Sri Rajakaliamman Temple</h3>
<p>The Glass Temple is unlike anything you've seen — every surface covered in coloured glass mosaics. Entry is free; dress modestly. Spend 30–45 minutes here.</p>

<h3>Afternoon: Lunch & City Square</h3>
<p>Lunch at any hawker centre (RM8–12). Then browse City Square mall — connected to JB Sentral train station — for air-conditioning and local brands.</p>

<h3>Evening: Sunset at Danga Bay</h3>
<p>Grab a Grab to <strong>Danga Bay</strong> for waterfront views and street snacks as the sun sets over the Straits of Johor. The evening breeze is excellent.</p>

<h3>Night: Pasar Malam</h3>
<p>If it's a Wednesday or Thursday, hit the nearest night market. Eat lok-lok, satay, and martabak while watching the city come alive.</p>

<h2>Sunday</h2>

<h3>Morning: Singapore Day Trip</h3>
<p>Wake up early and cross the Causeway by 9am. Spend 6–7 hours in Singapore: Gardens by the Bay, Chinatown, hawker lunch. Return by late afternoon.</p>

<h3>Evening: Final JB Dinner</h3>
<p>End your weekend at <strong>San Low Seafood</strong> for San Lou Bee Hoon. Or try the Mixed Rice at Sik Bao Sin right opposite the hostel — it's the local favourite for a reason.</p>

<h2>Transport Budget</h2>
<p>Grab rides average RM8–15 each. Budget RM60–80 for all transport over the weekend. Everything else — food, entry fees, browsing — can be done on RM150 total.</p>
`,
  },
  {
    slug: "budget-travel-johor-bahru-tips",
    title: "10 Money-Saving Tips for Budget Travellers in JB",
    excerpt:
      "Travel JB for less without missing out. These tips help backpackers stretch every ringgit further.",
    date: "2026-03-08",
    category: "Budget Tips",
    author: "Pelangi Team",
    readTime: "4 min read",
    tags: ["budget travel", "money tips", "backpacking", "Malaysia", "savings"],
    featuredImage: "/images/blog/budget-tips.jpg",
    content: `
<h2>1. Stay in a Capsule Hostel</h2>
<p>Capsule beds at Pelangi start from RM35/night — dramatically cheaper than budget hotels while offering private sleeping space, lockers, and reliable WiFi.</p>

<h2>2. Eat at Hawker Stalls and Mamaks</h2>
<p>A full meal costs RM5–12 at a hawker centre. Avoid malls and tourist restaurants unless you're treating yourself. The food quality at hawker stalls is genuinely superior anyway.</p>

<h2>3. Use Grab Instead of Taxis</h2>
<p>Grab is consistently cheaper than street taxis in JB and you know the price upfront. Share rides with other hostel guests heading the same direction.</p>

<h2>4. Withdraw Ringgit from ATMs in JB</h2>
<p>Don't exchange Singapore dollars at Singapore money changers. ATMs in JB give you the interbank exchange rate with just a small foreign transaction fee — usually better than any money changer.</p>

<h2>5. Visit Free Attractions First</h2>
<p>JB has plenty of free things: Jalan Tan Hiok Nee street art, the waterfront at Danga Bay, night markets, and temple visits. Build your itinerary around free activities and pay selectively for the highlights.</p>

<h2>6. Travel on Weekdays</h2>
<p>Causeway crossing times are shorter, Grab prices are lower, and hawker stalls are less crowded. Weekend surcharges add up.</p>

<h2>7. Cook Breakfast at the Hostel</h2>
<p>Pelangi has a shared kitchen. Grab fruits and bread from the local 7-Eleven for RM5 and save your food budget for the meals that matter.</p>

<h2>8. Buy a Local SIM Card</h2>
<p>A Malaysian SIM with 30–50GB data costs RM25–40 for a month. Far cheaper than roaming. Digi and Celcom have shops near JB Sentral.</p>

<h2>9. Travel Light</h2>
<p>Avoid baggage fees by packing in a carry-on. Most budget airlines charge RM50–100 for checked bags — money better spent on food.</p>

<h2>10. Ask the Hostel Team</h2>
<p>We know where the locals eat, which night markets are on this week, and the cheapest way to get anywhere. The front desk is free information — use it.</p>
`,
  },
  {
    slug: "jb-vs-kl-backpacker-comparison",
    title: "JB vs KL for Backpackers: Which City Should You Visit?",
    excerpt:
      "Kuala Lumpur gets all the attention, but Johor Bahru offers something different. We compare both cities across cost, food, vibe, and logistics.",
    date: "2026-03-10",
    category: "Travel Guide",
    author: "Pelangi Team",
    readTime: "6 min read",
    tags: [
      "Johor Bahru",
      "Kuala Lumpur",
      "comparison",
      "Malaysia travel",
      "backpacking",
    ],
    featuredImage: "/images/blog/jb-vs-kl.jpg",
    content: `
<h2>The Case for KL</h2>
<p>Kuala Lumpur is Malaysia's capital and biggest draw: Petronas Towers, Batu Caves, Bukit Bintang nightlife, and incredible transport connectivity. It's the first stop for most international backpackers, and rightly so.</p>

<h2>The Case for JB</h2>
<p>Johor Bahru is smaller, less touristy, and — crucially — borders Singapore. For backpackers who want to tick off two countries in one trip, JB is the logical base. You get authentic Malaysian life (not a tourist version of it) plus an easy day trip to one of Asia's great cities.</p>

<h2>Cost Comparison</h2>
<table>
  <thead>
    <tr><th>Category</th><th>KL</th><th>JB</th></tr>
  </thead>
  <tbody>
    <tr><td>Hostel bed</td><td>RM40–60</td><td>RM35–50</td></tr>
    <tr><td>Hawker meal</td><td>RM8–15</td><td>RM6–12</td></tr>
    <tr><td>Grab ride</td><td>RM10–20</td><td>RM8–15</td></tr>
    <tr><td>Daily budget</td><td>RM100–150</td><td>RM80–120</td></tr>
  </tbody>
</table>
<p>JB edges out KL on cost, though the difference is modest.</p>

<h2>Food</h2>
<p>KL has more variety — every cuisine, every price point. But JB's Johorean specialties (Laksa Johor, Mee Rebus, Otak-Otak) are genuinely unique and worth the trip on their own. Food quality in JB is underrated.</p>

<h2>Vibe</h2>
<p>KL feels like a metropolis — busy, modern, international. JB is more neighbourhood-scale: easier to navigate, friendlier for slow travel, and less overwhelming. If you want to actually connect with local life, JB wins.</p>

<h2>Singapore Access</h2>
<p>This is JB's killer advantage. From Pelangi Capsule, Singapore is 30 minutes away. From KL, it's 4–5 hours by bus or 45 minutes by plane. For backpackers hitting both Malaysia and Singapore, JB is the obvious choice.</p>

<h2>Verdict</h2>
<p>Do both if you can. But if you have to choose: <strong>KL for first-timers and city lovers; JB for budget-focused travellers, foodies, and anyone planning a Singapore day trip</strong>.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
