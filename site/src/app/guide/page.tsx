import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuideStructuredData from "@/components/GuideStructuredData";
import TableOfContents from "@/components/TableOfContents";
import { annotateMs } from "@/components/LangMs";
import type { Heading } from "@/lib/headings";
export const metadata: Metadata = {
    title: "Johor Bahru Backpacker Guide 2026 | Pelangi Capsule Hostel",
    description:
        "Complete JB travel guide for backpackers: getting around, money exchange, Singapore day trips, best hawker centres near Taman Pelangi, safety tips, and useful local apps.",
    keywords: [
        "Johor Bahru local guide backpacker",
        "JB travel guide backpacker",
        "things to do in JB",
        "JB money exchange",
        "Johor Bahru getting around",
        "Singapore day trip Causeway",
    ],
    alternates: {
        canonical: "https://pelangicapsulehostel.com/guide",
    },
    openGraph: {
        title: "Johor Bahru Backpacker Guide 2026 | Pelangi Capsule Hostel",
        description:
            "Everything you need to know about Johor Bahru — transport, money, food, safety, and more.",
        type: "article",
        publishedTime: "2024-01-01T00:00:00.000Z",
        url: "https://pelangicapsulehostel.com/guide",
        images: [
            {
                url: "/guide/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Johor Bahru Backpacker Guide 2026 - Transport, Food, Money, and Safety Tips from Pelangi Capsule Hostel",
            },
        ],
    },
};

export default function GuidePage() {
    const eats = [
        {
            name: "Sik Bao Sin (Bar Wang Rice)",
            desc: "Famous mixed rice right opposite us. Affordable and tasty.",
            dist: "1 min walk",
            hours: "Daily 7am – 3pm",
        },
        {
            name: "San Low Seafood",
            desc: "Legendary for their San Lou Bee Hoon. A must-try dinner spot.",
            dist: "5 min walk",
            hours: "Daily 5pm – 11pm",
        },
        {
            name: "Moonlight Cake House",
            desc: "Great for cakes, pastries, and western food.",
            dist: "8 min walk",
            hours: "Daily 10am – 10pm",
        },
        {
            name: "Yaoki Japanese Restaurant",
            desc: "Authentic Japanese cuisine nearby.",
            dist: "3 min walk",
            hours: "Daily 11am – 9pm",
        },
    ];

    const shopping = [
        {
            name: "Pelangi Leisure Mall",
            desc: "Supermarket, cinema, and retail shops.",
            dist: "10 min walk",
        },
        {
            name: "Mid Valley Southkey",
            desc: "Huge mega-mall with everything you need.",
            dist: "10 min drive",
        },
        {
            name: "KSL City Mall",
            desc: "Popular mall with many massage parlors and salons.",
            dist: "8 min drive",
        },
    ];

    const hawkerCentres = [
        {
            name: "Jalan Yahya Awal Hawker Centre",
            desc: "One of JB's most beloved hawker spots — char kway teow, laksa, and cendol all in one place.",
            dist: "12 min walk",
            hours: "Daily 6am – 2pm (breakfast & lunch)",
        },
        {
            name: "Restoran Pelangi (Taman Pelangi Cluster)",
            desc: "A cluster of open-air kopitiams serving nasi lemak, roti canai, and kopi-O right in our neighbourhood.",
            dist: "5 min walk",
            hours: "Daily 6am – 12pm",
        },
        {
            name: "Pasar Malam Taman Pelangi (Night Market)",
            desc: "Weekly night market with satay, grilled corn, rojak, and local kuih. Great for cheap dinner.",
            dist: "8 min walk",
            hours: "Fri & Sat evenings, ~5pm – 10pm",
        },
        {
            name: "Jalan Sutera Food Court",
            desc: "Lively open-air food court popular with locals — economy rice, dim sum, and fresh fruit juices.",
            dist: "15 min walk",
            hours: "Daily 11am – 9pm",
        },
    ];

    const apps = [
        {
            name: "Grab",
            icon: "🚗",
            desc: "Dominant ride-hailing and food delivery app in JB. Always cheaper than unmetered taxis. Download before you arrive.",
        },
        {
            name: "MyRapid",
            icon: "🚌",
            desc: "Track real-time arrivals for Rapid Bus JB. Free buses run on select routes in the city centre.",
        },
        {
            name: "Google Maps",
            icon: "🗺️",
            desc: "Works well in JB. Download the offline map for Johor Bahru before crossing so you don't burn data.",
        },
        {
            name: "XE Currency",
            icon: "💱",
            desc: "Live MYR/SGD exchange rates. Check before you exchange money to avoid getting ripped off.",
        },
        {
            name: "MySejahtera",
            icon: "🏥",
            desc: "Malaysia's official health app. Occasionally needed for government buildings and hospitals.",
        },
    ];

    const guideHeadings: Heading[] = [
        { id: "getting-around", text: "Getting Around JB", level: 2 },
        { id: "money", text: "Money & Currency", level: 2 },
        { id: "day-trip", text: "Singapore Day Trip", level: 2 },
        { id: "hawkers", text: "Top Hawker Centres Near Us", level: 2 },
        { id: "food-shopping", text: "Food & Shopping", level: 2 },
        { id: "safety", text: "Safety Tips for Backpackers", level: 2 },
        { id: "apps", text: "Useful Local Apps", level: 2 },
        { id: "what-backpackers-want", text: "What Backpackers Actually Look For (2026)", level: 2 },
    ];

    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <GuideStructuredData />
            <Header />
            <div className="pt-28 pb-16 container-custom">

                {/* Hero */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-100">
                        The Backpacker&apos;s Guide to JB
                    </h1>
                    <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
                        Everything you need to know about Johor Bahru — transport, money,
                        food, day trips, safety, and the apps that make it easy.
                    </p>
                </div>

                {/* Two-column layout: content + ToC sidebar */}
                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_256px] lg:gap-12 max-w-5xl mx-auto">
                    <div className="min-w-0">

                        {/* Mobile ToC (collapsible) */}
                        <div className="mb-12">
                            <TableOfContents headings={guideHeadings} />
                        </div>

                    {/* Section 1: Getting Around */}
                    <section id="getting-around" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>🚗</span> Getting Around JB
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">Typical fares (2026) — always confirm with driver or app</p>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {[
                                {
                                    mode: "Grab",
                                    color: "bg-green-50 border-green-200",
                                    badge: "bg-green-100 text-green-800",
                                    tag: "Recommended",
                                    items: [
                                        "Causeway → Taman Pelangi: RM 12–18",
                                        "City Centre → JB Sentral: RM 8–12",
                                        "Taman Pelangi → AEON Tebrau: RM 14–20",
                                        "Surge pricing during peak hours",
                                    ],
                                },
                                {
                                    mode: "Taxi (Metered)",
                                    color: "bg-blue-50 border-blue-200",
                                    badge: "bg-blue-100 text-blue-800",
                                    tag: "Use meter",
                                    items: [
                                        "Flag-fall: RM 3.00",
                                        "Per km: RM 1.60",
                                        "Short trips (3–5 km): RM 8–15",
                                        "Always insist on the meter",
                                    ],
                                },
                                {
                                    mode: "Bus (Rapid JB)",
                                    color: "bg-amber-50 border-amber-200",
                                    badge: "bg-amber-100 text-amber-800",
                                    tag: "Budget option",
                                    items: [
                                        "City Centre routes: RM 1.20 flat",
                                        "Longer routes: RM 2–4",
                                        "CW1 Causeway shuttle: RM 2.50",
                                        "Use MyRapid app to track buses",
                                    ],
                                },
                            ].map((t) => (
                                <div key={t.mode} className={`border rounded-2xl p-6 ${t.color}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{t.mode}</h3>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.badge}`}>{t.tag}</span>
                                    </div>
                                    <ul className="space-y-2">
                                        {t.items.map((item) => (
                                            <li key={item} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                                                <span className="mt-0.5 text-stone-500">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-stone-500 dark:text-stone-400 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-700 rounded-xl px-5 py-3">
                            <strong>Tip:</strong> Avoid unmetered taxis offering fixed fares near the Causeway — they almost always overcharge. Use Grab or ask for the meter.
                        </p>
                    </section>

                    {/* Section 2: Money & Currency */}
                    <section id="money" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>💰</span> Money &amp; Currency
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">MYR is the local currency. Most places accept cash only.</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">Best places to exchange</h3>
                                <ul className="space-y-3 text-stone-700 dark:text-stone-300">
                                    <li className="flex gap-3">
                                        <span className="text-amber-700 dark:text-amber-400 font-bold mt-0.5">1.</span>
                                        <div>
                                            <strong>Jalan Wong Ah Fook money changers</strong>
                                            <p className="text-sm text-stone-500">Best SGD/MYR rates in JB. Multiple competing stalls — compare a few before exchanging. ~10 min from us by Grab.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-amber-700 dark:text-amber-400 font-bold mt-0.5">2.</span>
                                        <div>
                                            <strong>JB Sentral / CIQ Complex</strong>
                                            <p className="text-sm text-stone-500">Convenient if arriving from Singapore, but rates are slightly worse than street changers.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-amber-700 dark:text-amber-400 font-bold mt-0.5">3.</span>
                                        <div>
                                            <strong>ATMs (Maybank, CIMB, RHB)</strong>
                                            <p className="text-sm text-stone-500">Available at Pelangi Leisure Mall (10 min walk). Use Visa/Mastercard; your bank&apos;s foreign fee typically applies.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-700 p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">Quick reference rates (approx.)</h3>
                                <div className="space-y-3 text-sm">
                                    {[
                                        ["SGD 10", "≈ MYR 35"],
                                        ["SGD 50", "≈ MYR 175"],
                                        ["SGD 100", "≈ MYR 350"],
                                        ["USD 10", "≈ MYR 47"],
                                    ].map(([from, to]) => (
                                        <div key={from} className="flex justify-between items-center border-b border-amber-200 dark:border-amber-700 pb-2 last:border-0 last:pb-0">
                                            <span className="font-semibold text-stone-700 dark:text-stone-300">{from}</span>
                                            <span className="text-amber-800 dark:text-amber-300 font-bold">{to}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-stone-500 dark:text-stone-400 mt-4">Rates fluctuate daily — check XE Currency app for live rates before exchanging.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Singapore Day Trip */}
                    <section id="day-trip" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>🇸🇬</span> Singapore Day Trip
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-6">
                            JB is the perfect base for a Singapore day trip — you save 70%+ on accommodation.
                            Read our full guide:{" "}
                            <Link href="/blog/singapore-to-jb-day-trip-causeway-guide" className="text-amber-700 dark:text-amber-400 hover:underline font-medium">
                                Singapore to JB Day Trip: How to Cross the Causeway →
                            </Link>
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">Causeway (Woodlands)</h3>
                                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-4">Open 24 hours</p>
                                <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                                    <li><strong>Peak congestion:</strong> 7–9am and 5–8pm (weekdays)</li>
                                    <li><strong>Bus CW1:</strong> JB Sentral ↔ Kranji MRT — RM 2.50 / SGD 1</li>
                                    <li><strong>Bus 170:</strong> Larkin → Queen St, Singapore</li>
                                    <li><strong>Taxi/Grab:</strong> RM 40–60 one-way to Singapore city</li>
                                    <li><strong>Walk across:</strong> Possible but not recommended (1.5 km)</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">Second Link (Tuas)</h3>
                                <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-4">Less crowded, faster</p>
                                <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                                    <li><strong>Open:</strong> 24 hours</li>
                                    <li><strong>Best for:</strong> Driving or private car hire</li>
                                    <li><strong>Bus:</strong> CW2 from JB Sentral — RM 3.50</li>
                                    <li><strong>Grab:</strong> ~30% cheaper than Causeway route during peak</li>
                                    <li><strong>Nearest MRT:</strong> Tuas Link (EW line)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                            <strong>Immigration tip:</strong> Have your passport AND any entry cards ready before you reach the counter.
                            Malaysia exit and Singapore entry are separate checkpoints — don&apos;t get off the bus between them.
                            Immigration lines move fast off-peak.
                        </div>
                    </section>

                    {/* Section 4: Hawker Centres */}
                    <section id="hawkers" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>🍜</span> Top Hawker Centres Near Us
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-6">
                            JB&apos;s street food scene is world-class. Read our deep-dive:{" "}
                            <Link href="/blog/jb-hawker-centres-street-food-must-visit" className="text-amber-700 dark:text-amber-400 hover:underline font-medium">
                                JB Street Food Hawker Centres You Must Visit →
                            </Link>
                        </p>
                        <div className="space-y-4">
                            {hawkerCentres.map((h, i) => (
                                <div key={i} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{annotateMs(h.name)}</h3>
                                        <p className="text-stone-600 dark:text-stone-400 mt-1">{annotateMs(h.desc)}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-medium text-amber-700 dark:text-amber-400">{h.dist}</p>
                                        <p className="text-xs text-stone-500 mt-1">{h.hours}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 5: Food & Shopping (original sections) */}
                    <section id="food-shopping" className="mb-16">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-amber-700 dark:text-amber-400">
                                    <span className="text-3xl">🍽️</span> Restaurants Near Us
                                </h2>
                                <div className="space-y-4">
                                    {eats.map((place, i) => (
                                        <div key={i} className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs hover:shadow-md transition-shadow">
                                            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{place.name}</h3>
                                            <div className="flex gap-3 mb-2">
                                                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">{place.dist}</p>
                                                <span className="text-stone-400">·</span>
                                                <p className="text-sm text-stone-500">{place.hours}</p>
                                            </div>
                                            <p className="text-stone-600 dark:text-stone-400 text-sm">{annotateMs(place.desc)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-amber-700 dark:text-amber-400">
                                    <span className="text-3xl">🛍️</span> Shopping &amp; Fun
                                </h2>
                                <div className="space-y-4">
                                    {shopping.map((place, i) => (
                                        <div key={i} className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs hover:shadow-md transition-shadow">
                                            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{place.name}</h3>
                                            <p className="text-sm font-medium text-amber-700 mb-2">{place.dist}</p>
                                            <p className="text-stone-600 dark:text-stone-400 text-sm">{place.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Safety Tips */}
                    <section id="safety" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>🔒</span> Safety Tips for Backpackers
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">JB is generally safe, but like any city, common sense applies.</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    category: "On the street",
                                    color: "border-l-amber-400",
                                    tips: [
                                        "Keep bags in front of you in crowded areas",
                                        "Avoid flashing expensive cameras or phones in markets",
                                        "Stick to well-lit streets after 11pm",
                                        "Taman Pelangi area is generally very safe for solo travellers",
                                    ],
                                },
                                {
                                    category: "Transport",
                                    color: "border-l-blue-400",
                                    tips: [
                                        "Use Grab over unmetered taxis — traceable and priced upfront",
                                        "Confirm your driver's name and plate before getting in",
                                        "Avoid motorbike taxis (not legal for passengers)",
                                        "Bus CW1 is perfectly safe for the Causeway crossing",
                                    ],
                                },
                                {
                                    category: "Accommodation & Valuables",
                                    color: "border-l-green-400",
                                    tips: [
                                        "Use the lockers in the hostel — padlock provided",
                                        "Don't leave valuables on open desks",
                                        "Keep a passport photocopy separate from the original",
                                        "Email yourself a copy of your passport and travel insurance",
                                    ],
                                },
                                {
                                    category: "Health & Emergencies",
                                    color: "border-l-red-400",
                                    tips: [
                                        "Emergency: call 999 (police) or 994 (ambulance)",
                                        "Nearest clinic: Taman Pelangi Medical Centre, 5 min walk",
                                        "Tap water is generally safe but many prefer bottled",
                                        "Travel insurance is strongly recommended",
                                    ],
                                },
                            ].map((s) => (
                                <div key={s.category} className={`bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6 border-l-4 ${s.color}`}>
                                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">{s.category}</h3>
                                    <ul className="space-y-2">
                                        {s.tips.map((tip) => (
                                            <li key={tip} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                                                <span className="text-green-500 mt-0.5">✓</span>
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 7: Useful Apps */}
                    <section id="apps" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>📱</span> Useful Local Apps
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">Download these before you arrive — some require Malaysian data to set up.</p>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {apps.map((app) => (
                                <div key={app.name} className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-5 hover:shadow-md transition-shadow">
                                    <div className="text-3xl mb-3">{app.icon}</div>
                                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-1">{app.name}</h3>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">{app.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 8: What Backpackers Actually Look For (2026) */}
                    <section id="what-backpackers-want" className="mb-16">
                        <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                            <span>🎒</span> What Backpackers Actually Look For (2026)
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-8">
                            The 2026 backpacker wants a place that&apos;s private enough to actually sleep, and social enough to not
                            feel like a hotel room. Here&apos;s how that plays out at Pelangi Capsule Hostel.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">Private capsule to sleep, common area to socialise</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm">
                                    Your capsule is a private, quiet sleeping pod — not a bunk bed in an open dorm. When you do want company,
                                    the shared kitchen and common area are right there. Best of both, without the forced-party-hostel feel.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">Free WiFi &amp; guest kitchen access</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm">
                                    Free WiFi throughout, plus guest kitchen access so you can cook your own meals instead of eating out
                                    every day — useful on a multi-week budget trip.
                                </p>
                            </div>
                            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">Cleanliness as the real differentiator</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm">
                                    At this price point, plenty of places compete on rate alone. What keeps backpackers coming back is a
                                    clean capsule, clean bathroom, and clean common area — not extra amenities.
                                </p>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-700 p-6">
                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">RM35 flat, no confusing rate tiers</h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm">
                                    One flat rate per capsule per night — RM35, no weekday/weekend split to calculate. Monthly stays run
                                    RM600–650 for longer trips.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="mt-4 text-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-10">
                        <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-2">Ready to explore JB?</h3>
                        <p className="text-stone-600 dark:text-stone-400 mb-6">Pelangi Capsule Hostel puts you right in the heart of Taman Pelangi — walking distance to everything on this guide.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://www.google.com/maps/search/restaurants+near+Pelangi+Capsule+Hostel/@1.4862,103.7573,15z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Explore on Google Maps
                            </a>
                            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-700 hover:text-white transition-colors font-medium">
                                Read Our JB Blog →
                            </Link>
                        </div>
                    </div>

                    </div>{/* end content column */}

                    {/* Desktop ToC sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <TableOfContents headings={guideHeadings} />
                        </div>
                    </aside>

                </div>{/* end two-column grid */}
            </div>
            <Footer />
        </main>
    );
}
