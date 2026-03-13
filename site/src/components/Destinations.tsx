"use client";

import { useState } from "react";
import Image from "next/image";

interface Destination {
  id: string;
  name: string;
  image: string;
  distance: string;
  category: string;
  bestFor: string[];
  highlights: string[];
  proTip: string;
  bestTime: string;
  description: string;
}

const destinations: Destination[] = [
  // ISLAND GETAWAYS
  {
    id: "tioman",
    name: "Pulau Tioman",
    image: "/images/destinations/tioman-island.jpg",
    distance: "4-5 hours",
    category: "Island Getaway",
    bestFor: ["Snorkelers", "Divers", "Beach Lovers", "Nature Enthusiasts"],
    highlights: [
      "Crystal-clear waters with 30m visibility and 180+ coral species",
      "Juara Beach - quiet east coast with sea turtle nesting (May-Sep)",
      "Asah Waterfall - stunning 40-meter cascade through pristine jungle",
      "Duty-free island - stock up on chocolates and beverages",
      "World-class diving at Tiger Reef with blacktip reef sharks"
    ],
    proTip: "Skip the crowded Tekek beach. Take the 2.5-hour jungle trail to Juara - you might spot flying lemurs and monitor lizards. Download Maps.me offline before you go!",
    bestTime: "March to October. Best diving visibility in April-May. Go midweek to avoid Singapore weekend crowds.",
    description: "One of Malaysia's most beautiful islands, Tioman offers pristine beaches, incredible marine life, and lush rainforest adventures."
  },
  {
    id: "rawa",
    name: "Pulau Rawa",
    image: "/images/destinations/tioman-island.jpg",
    distance: "3-4 hours",
    category: "Island Getaway",
    bestFor: ["Couples", "Luxury Seekers", "Instagram Lovers"],
    highlights: [
      "Pristine private beach with powdery white sand",
      "Famous orange water slide launching into turquoise sea",
      "House reef snorkeling - colorful fish right off the beach",
      "Zero light pollution - spectacular stargazing",
      "Exclusive feel - only two resorts on the entire island"
    ],
    proTip: "Rawa is owned by the Johor royal family. Book Alang's Rawa for half the price of the main resort - the snorkeling is actually better on their side! Bring cash, no ATMs.",
    bestTime: "Weekdays in April or September for perfect weather and minimal crowds. Water slide best at high tide around 2-3 PM.",
    description: "Often called 'Maldives on a budget', Rawa offers exclusive island vibes without the premium price tag."
  },
  // SINGAPORE
  {
    id: "gardens-bay",
    name: "Gardens by the Bay",
    image: "/images/destinations/garden-by-the-bay.jpg",
    distance: "1-1.5 hours",
    category: "Singapore",
    bestFor: ["First-time Visitors", "Nature Lovers", "Families", "Photographers"],
    highlights: [
      "Supertree Grove - 25-50m vertical gardens with nightly light shows",
      "Cloud Forest - world's tallest indoor waterfall",
      "Flower Dome - largest glass greenhouse on Earth",
      "OCBC Skyway - 128m walkway with panoramic views",
      "Free outdoor gardens perfect for sunset walks"
    ],
    proTip: "The outdoor gardens and Supertree Grove are FREE! Only pay for Cloud Forest (more impressive than Flower Dome). Come at 6:30 PM for golden hour, then catch the 7:45 PM light show.",
    bestTime: "Weekday evenings from 5 PM. Catch golden hour, sunset, AND the light show while avoiding crowds.",
    description: "Singapore's iconic nature park featuring futuristic Supertrees and climate-controlled conservatories."
  },
  {
    id: "marina-bay",
    name: "Marina Bay Sands",
    image: "/images/destinations/singapore.jpg",
    distance: "1-1.5 hours",
    category: "Singapore",
    bestFor: ["Luxury Seekers", "Photographers", "First-time Visitors", "Foodies"],
    highlights: [
      "World-famous infinity pool (hotel guests only)",
      "SkyPark Observation Deck - 57 floors up with 360° views",
      "Spectra light & water show - free nightly at 8 PM & 9 PM",
      "The Shoppes - luxury mall with indoor canal boat rides",
      "ArtScience Museum - iconic lotus-shaped building"
    ],
    proTip: "Skip the RM100+ SkyPark fee. Go to CE LA VI club on Level 57 - same view PLUS a drink for similar price. Or book dinner at LAVO restaurant for views while you eat!",
    bestTime: "Arrive 5 PM for afternoon light, stay for sunset over the bay, catch the 8 PM Spectra show.",
    description: "Singapore's most iconic landmark featuring world-class entertainment, dining, and the famous rooftop infinity pool."
  },
  {
    id: "jewel",
    name: "Jewel Changi Airport",
    image: "/images/destinations/jewel.jpg",
    distance: "45 min - 1 hour",
    category: "Singapore",
    bestFor: ["Architecture Lovers", "Families", "Instagram Enthusiasts"],
    highlights: [
      "Rain Vortex - world's tallest indoor waterfall at 40 meters",
      "Shiseido Forest Valley - four-story indoor walking trails",
      "Canopy Park - sky nets, hedge maze, mirror maze (ticketed)",
      "Pokemon Center Singapore - only official store in SEA",
      "280+ food options from hawker stalls to fine dining"
    ],
    proTip: "The Rain Vortex and Forest Valley are FREE! Skip the overpriced Canopy Park. Visit at 7:30 PM for the light show when the waterfall becomes a projection canvas.",
    bestTime: "Evening (after 6 PM) for light shows. Early morning (before 10 AM) for crowd-free photos.",
    description: "A nature-themed entertainment complex that has transformed Changi Airport into a destination itself."
  },
  {
    id: "sentosa",
    name: "Sentosa Island",
    image: "/images/destinations/jewel.jpg",
    distance: "1.5-2 hours",
    category: "Singapore",
    bestFor: ["Thrill-seekers", "Families", "Beach Lovers", "Theme Park Fans"],
    highlights: [
      "Universal Studios Singapore - SEA's first Universal park",
      "S.E.A. Aquarium - 100,000+ marine animals",
      "Siloso Beach - swimming, water sports, beach bars",
      "iFly Singapore - indoor skydiving with sea views",
      "Skyline Luge - gravity-fueled go-kart rides"
    ],
    proTip: "Buy Universal tickets online for 10% off. Go weekdays, arrive at 10 AM opening, head straight to Battlestar Galactica while everyone queues at Transformers. Exit for cheaper lunch at VivoCity.",
    bestTime: "Weekdays, Tuesday-Thursday. Avoid Singapore school holidays. March or September for shortest queues.",
    description: "Singapore's resort island packed with world-class attractions, beaches, and entertainment."
  },
  // HISTORICAL & CULTURAL
  {
    id: "melaka",
    name: "Melaka (UNESCO)",
    image: "/images/destinations/melaka.jpg",
    distance: "3-3.5 hours",
    category: "Heritage",
    bestFor: ["History Buffs", "Foodies", "Culture Enthusiasts", "Street Art Hunters"],
    highlights: [
      "Jonker Street - Chinatown heart with weekend night market",
      "A Famosa Fortress - 1512 Portuguese ruins, oldest European remains in Asia",
      "Dutch Square - stunning red colonial buildings from 1753",
      "Melaka River Cruise - 45-min ride past beautiful murals",
      "Baba Nyonya Heritage Museum - preserved Peranakan mansion"
    ],
    proTip: "Jonker Street is a tourist trap on weekends. Visit weekdays for authenticity. For the BEST chicken rice balls, skip Hoe Kee - go to Kedai Kopi Chung Wah instead. Half the price!",
    bestTime: "Weekday visits are infinitely better. Avoid December school holidays. River cruise best at 6 PM sunset.",
    description: "A UNESCO World Heritage city where Portuguese, Dutch, and British colonial history meets vibrant Peranakan culture."
  },
  {
    id: "sultan-mosque",
    name: "Sultan Abu Bakar Mosque",
    image: "/images/destinations/melaka.jpg",
    distance: "15-20 min",
    category: "Heritage",
    bestFor: ["Architecture Admirers", "Spiritual Seekers", "Photographers"],
    highlights: [
      "Unique Victorian-Moorish architecture completed in 1900",
      "Stunning hilltop location overlooking Straits of Johor",
      "Royal Mausoleum - final resting place of Johor sultans",
      "Accommodates 2,000 worshippers with vast grounds",
      "Intricate stained glass, chandeliers, and woodwork"
    ],
    proTip: "One of Malaysia's most beautiful mosques but rarely crowded. Come at sunset for golden light with Singapore skyline across the straits. Non-Muslims welcome outside prayer times.",
    bestTime: "Late afternoon 4-6 PM for best lighting. Tuesday/Wednesday quietest. Avoid Friday 12-2:30 PM prayers.",
    description: "A masterpiece of Victorian-Moorish architecture overlooking the Straits of Johor, showcasing Johor's royal heritage."
  },
  // NATURE & ADVENTURE
  {
    id: "tanjung-piai",
    name: "Tanjung Piai National Park",
    image: "/images/destinations/tanjung-piai-nationa.jpg",
    distance: "1.5 hours",
    category: "Nature",
    bestFor: ["Geography Enthusiasts", "Birdwatchers", "Families"],
    highlights: [
      "Southernmost point of Continental Asia - where mainland Asia ends!",
      "926 hectares of protected mangrove ecosystem",
      "1.3km boardwalk trail through mangroves to the tip",
      "200+ bird species including kingfishers and sea eagles",
      "Mudflats alive with crabs and mudskippers at low tide"
    ],
    proTip: "This place is criminally underrated - you're standing where CONTINENTAL ASIA ENDS! Visit during low tide to see countless crabs and wading birds. Bring binoculars and mosquito repellent.",
    bestTime: "Early morning 7-9 AM for birdwatching. October-March for migratory birds. Check tide tables for low tide.",
    description: "Stand at the exact geographical point where mainland Asia ends, surrounded by pristine mangrove ecosystems."
  },
  {
    id: "desaru",
    name: "Desaru Coast",
    image: "/images/destinations/tanjung-piai-nationa.jpg",
    distance: "1.5 hours",
    category: "Nature",
    bestFor: ["Families", "Golfers", "Resort Seekers", "Beach Lovers"],
    highlights: [
      "Malaysia's largest waterpark with 22 slides",
      "Two Ernie Els championship golf courses",
      "Long pristine beach with warm South China Sea",
      "Firefly river cruise on Sungai Lebam",
      "Ostrich farm and fruit farms for families"
    ],
    proTip: "You don't need expensive resorts! The public beach (Pantai Desaru) is free and just as beautiful. The Sungai Lebam firefly cruise is better than famous Kuala Selangor - fewer tourists, more fireflies. Book directly with boatmen at RM25 vs RM60 through resorts.",
    bestTime: "March-October for beach weather. Waterpark best on weekdays. Firefly tours 7:30-9 PM, best during new moon.",
    description: "JB's premier beach destination featuring world-class resorts, waterparks, and magical firefly experiences."
  },
  // LOCAL JB GEMS
  {
    id: "tan-hiok-nee",
    name: "Tan Hiok Nee Heritage Street",
    image: "/images/tan-hiok-nee.jpg",
    distance: "In JB center",
    category: "Local Gem",
    bestFor: ["History Lovers", "Cafe Hoppers", "Street Art Hunters", "Photographers"],
    highlights: [
      "Beautiful pre-war shophouses from early 1900s",
      "Colorful street art depicting JB's history",
      "Hipster cafes and cocktail bars",
      "Antique shops with vintage treasures",
      "Traditional kopitiams alongside fusion eateries"
    ],
    proTip: "Look for narrow alleyways between shophouses - they lead to secret courtyard cafes and rooftop bars! Try Flowers in the Window (hidden courtyard, amazing cakes) and The Roost (rooftop cocktails).",
    bestTime: "Early morning 7-9 AM for street art photos; evening 7 PM onwards for cafe/bar scene. Many shops close Mondays.",
    description: "JB's hipster heritage street where pre-war architecture meets modern cafe culture and vibrant street art."
  },
  {
    id: "mount-austin",
    name: "Mount Austin Food Haven",
    image: "/images/mount-austin-food.jpg",
    distance: "15-20 min",
    category: "Local Gem",
    bestFor: ["Serious Foodies", "Night Owls", "Budget Eaters"],
    highlights: [
      "Restoran Selera Selatan - famous sup tulang (bone marrow soup)",
      "24-hour mamak zone with incredible roti canai",
      "Taman Pelangi morning market with local kuih",
      "Night food stalls transforming roadsides after 8 PM",
      "Authentic Johor laksa - creamier than Penang or Singapore"
    ],
    proTip: "Singaporeans cross the causeway specifically to eat here - 60% cheaper than Singapore! Order sup tulang merah at Selera Selatan around 9 PM - you suck the marrow out with a straw. Sounds weird, tastes transcendent.",
    bestTime: "Breakfast market 6-9 AM. Dinner 7-10 PM. Late-night mamak culture 10 PM-2 AM - the later, the more authentic!",
    description: "Where locals eat! Discover JB's incredible food scene that rivals anywhere in Malaysia at a fraction of Singapore prices."
  }
];

const categories = [
  { id: "all", label: "All Destinations" },
  { id: "Island Getaway", label: "Islands" },
  { id: "Singapore", label: "Singapore" },
  { id: "Heritage", label: "Heritage" },
  { id: "Nature", label: "Nature" },
  { id: "Local Gem", label: "Local JB" },
];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const filteredDestinations = activeCategory === "all"
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  return (
    <section id="destinations" className="section-padding bg-white dark:bg-stone-900">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-label">Explore from JB</p>
          <h2 className="section-heading mb-6">
            Your Gateway to Amazing Adventures
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
            Johor Bahru is perfectly positioned for incredible day trips and getaways.
            From pristine islands to world-class Singapore attractions, ancient rainforests
            to UNESCO heritage sites — adventure is always within reach.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                ${activeCategory === cat.id
                  ? "bg-amber-700 text-white shadow-md"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <article
              key={dest.id}
              className="group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl
                       transition-all duration-300 cursor-pointer border border-stone-100 dark:border-stone-700"
              onClick={() => setSelectedDest(dest)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`${dest.name} - ${dest.category} destination near Johor Bahru`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs rounded-full text-xs font-medium text-stone-700 dark:text-stone-300">
                    {dest.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 bg-stone-900/80 backdrop-blur-xs rounded-full text-xs font-medium text-white flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {dest.distance}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mb-4 line-clamp-2">
                  {dest.description}
                </p>

                {/* Best For Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {dest.bestFor.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-sm text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-stone-500 dark:text-stone-400 mb-4">
            Need help planning your adventures? Our staff can arrange tours and transportation!
          </p>
          <a
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full
                     font-medium hover:bg-amber-800 transition-colors"
          >
            Book Your Stay
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Destination Detail Modal */}
      {selectedDest && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/90 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedDest(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-64 md:h-80">
              <Image
                src={selectedDest.image}
                alt={selectedDest.name}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs
                         flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-medium mb-3 inline-block">
                  {selectedDest.category}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-medium text-white">
                  {selectedDest.name}
                </h3>
                <p className="text-white/80 mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedDest.distance} from hostel
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Best For */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">Best For</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDest.bestFor.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed mb-6">
                {selectedDest.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">Highlights</h4>
                <ul className="space-y-2">
                  {selectedDest.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-600 dark:text-stone-400">
                      <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tip */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-1">Insider Tip</h4>
                    <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">{selectedDest.proTip}</p>
                  </div>
                </div>
              </div>

              {/* Best Time */}
              <div className="flex items-start gap-3 text-stone-600 dark:text-stone-400 mb-8">
                <svg className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="font-medium text-stone-700 dark:text-stone-300">Best Time to Visit: </span>
                  {selectedDest.bestTime}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/book"
                  onClick={() => setSelectedDest(null)}
                  className="flex-1 text-center px-6 py-3 bg-amber-700 text-white rounded-full font-medium
                           hover:bg-amber-800 transition-colors"
                >
                  Book Your Stay & Explore
                </a>
                <button
                  onClick={() => setSelectedDest(null)}
                  className="px-6 py-3 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 rounded-full font-medium
                           hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
