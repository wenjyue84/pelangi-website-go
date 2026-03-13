import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VisitMalaysia2026StructuredData from "@/components/VisitMalaysia2026StructuredData";
import TableOfContents from "@/components/TableOfContents";
import type { Heading } from "@/lib/headings";

export const metadata: Metadata = {
    title: "Visit Malaysia 2026 — Budget Hostel in Johor Bahru | Pelangi Capsule Hostel",
    description:
        "Celebrate Visit Malaysia Year 2026 from Johor Bahru. Budget capsule hostel from RM35/night in Taman Pelangi — perfect base for Singapore day trips via RTS Link, JB attractions, and Visit Johor 2026 events.",
    keywords: [
        "hostel johor bahru 2026",
        "singapore to johor bahru hostel",
        "visit johor 2026 accommodation",
        "visit malaysia 2026 hostel",
        "jb rts link accommodation",
        "best hostel near ciq",
        "budget hostel johor bahru",
        "johor bahru capsule hostel",
        "visit malaysia year 2026",
        "jb backpacker accommodation 2026",
    ],
    alternates: {
        canonical: "https://pelangicapsulehostel.com/visit-malaysia-2026",
    },
    openGraph: {
        title: "Visit Malaysia 2026 — Budget Hostel in Johor Bahru",
        description:
            "Celebrate Visit Malaysia Year 2026 from Johor Bahru. Capsule hostel from RM35/night — perfect base for Singapore day trips and JB attractions.",
        type: "website",
        url: "https://pelangicapsulehostel.com/visit-malaysia-2026",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Visit Malaysia 2026 - Pelangi Capsule Hostel in Johor Bahru",
            },
        ],
    },
};

const attractions = [
    {
        name: "Johor Bahru City Square",
        desc: "Major shopping mall connected to JB Sentral and CIQ border checkpoint. Affordable shopping, food courts, and money changers — a backpacker essential.",
        dist: "15 min by Grab",
        category: "Shopping & Transit",
    },
    {
        name: "Arulmigu Sri Rajakaliamman Glass Temple",
        desc: "The world's first and only Hindu glass temple, with over 300,000 pieces of glass adorning the walls, ceiling, and pillars. A breathtaking cultural landmark.",
        dist: "12 min by Grab",
        category: "Culture & Heritage",
    },
    {
        name: "Danga Bay Waterfront",
        desc: "Waterfront leisure park along the Straits of Johor with panoramic Singapore views. Night market, seafood restaurants, cycling paths, and a spectacular sunset spot.",
        dist: "10 min by Grab",
        category: "Leisure & Nature",
    },
    {
        name: "Taman Pelangi Night Market",
        desc: "Weekly night market right in our neighbourhood — satay, grilled corn, rojak, local kuih, and buzzing street food atmosphere. A true JB experience.",
        dist: "8 min walk",
        category: "Food & Markets",
    },
    {
        name: "Sultan Abu Bakar State Mosque",
        desc: "One of Malaysia's most stunning mosques, blending Victorian architecture with Moorish design. Overlooking the Straits of Johor with sweeping coastal views.",
        dist: "15 min by Grab",
        category: "Culture & Heritage",
    },
    {
        name: "Forest City",
        desc: "A futuristic coastal city featuring duty-free shopping, water theme parks, mangrove eco-tours, and beachfront dining. Great for a half-day trip from JB.",
        dist: "40 min by car",
        category: "Leisure & Nature",
    },
    {
        name: "Legoland Malaysia",
        desc: "Asia's first Legoland theme park with over 70 rides, water park, and SEA LIFE aquarium. Perfect for families and big kids alike.",
        dist: "25 min by car",
        category: "Theme Park",
    },
];

const campaignHighlights = [
    {
        stat: "35.6M",
        label: "Visitor target",
        detail: "Malaysia's most ambitious tourism year",
    },
    {
        stat: "RM35",
        label: "From per night",
        detail: "Direct booking best rate guarantee",
    },
    {
        stat: "30 min",
        label: "To Singapore",
        detail: "Via Causeway or upcoming RTS Link",
    },
    {
        stat: "24/7",
        label: "Self check-in",
        detail: "Arrive anytime, no waiting",
    },
];

export default function VisitMalaysia2026Page() {
    const headings: Heading[] = [
        { id: "why-jb", text: "Why Johor Bahru in 2026", level: 2 },
        { id: "attractions", text: "Top JB Attractions", level: 2 },
        { id: "rts-link", text: "RTS Link & Singapore Day Trips", level: 2 },
        { id: "campaign-offer", text: "Visit Malaysia 2026 Rates", level: 2 },
        { id: "getting-here", text: "Getting Here", level: 2 },
    ];

    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <VisitMalaysia2026StructuredData />
            <Header />
            <div className="pt-28 pb-16 container-custom">

                {/* Hero */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full mb-6">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-red-700 dark:text-red-400">Visit Malaysia Year 2026</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-100">
                        Your Budget Base in{" "}
                        <span className="text-amber-700 dark:text-amber-400">Johor Bahru</span>
                    </h1>
                    <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-10">
                        Celebrate Visit Malaysia 2026 and Visit Johor 2026 from Pelangi Capsule Hostel —
                        modern pods from RM35/night in Taman Pelangi, the perfect base for exploring JB and Singapore.
                    </p>

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {campaignHighlights.map((item) => (
                            <div key={item.label} className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 p-5 text-center">
                                <div className="font-display text-3xl font-medium text-amber-700 dark:text-amber-400 mb-1">{item.stat}</div>
                                <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">{item.label}</div>
                                <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">{item.detail}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_256px] lg:gap-12 max-w-5xl mx-auto">
                    <div className="min-w-0">

                        {/* Mobile ToC */}
                        <div className="mb-12">
                            <TableOfContents headings={headings} />
                        </div>

                        {/* Section: Why JB in 2026 */}
                        <section id="why-jb" className="mb-16">
                            <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100">
                                Why Johor Bahru in 2026
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mb-8">
                                Malaysia&apos;s Visit Malaysia Year 2026 targets 35.6 million visitors and RM147.1 billion in tourism revenue.
                                Johor Bahru — Malaysia&apos;s southern gateway — is at the centre of the action.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6 border-l-4 border-l-red-400">
                                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-3">Visit Malaysia 2026</h3>
                                    <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-0.5">&#x2713;</span>
                                            <span>National campaign: Jan &ndash; Dec 2026</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-0.5">&#x2713;</span>
                                            <span>35.6 million visitor target nationwide</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-0.5">&#x2713;</span>
                                            <span>Cultural festivals, events, and promotions all year</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500 mt-0.5">&#x2713;</span>
                                            <span>Simplified e-visa for 30+ countries</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6 border-l-4 border-l-blue-400">
                                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-3">Visit Johor 2026</h3>
                                    <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">&#x2713;</span>
                                            <span>State campaign running alongside Visit Malaysia</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">&#x2713;</span>
                                            <span>RTS Link rail connecting JB &harr; Singapore (late 2026)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">&#x2713;</span>
                                            <span>New attractions: Forest City, Desaru Coast, eco-tourism</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-500 mt-0.5">&#x2713;</span>
                                            <span>Johor food trail &amp; heritage walk programmes</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                                <strong>Why stay in JB?</strong> Johor Bahru offers 60&ndash;70% savings on accommodation and food compared to Singapore,
                                while being just 30 minutes from the border. Stay budget in JB, explore both countries.
                            </div>
                        </section>

                        {/* Section: Top Attractions */}
                        <section id="attractions" className="mb-16">
                            <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100">
                                Top JB Attractions
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mb-8">
                                Must-visit spots in Johor Bahru for Visit Malaysia 2026 — all easily reachable from Pelangi Capsule Hostel in Taman Pelangi.
                            </p>

                            <div className="space-y-4">
                                {attractions.map((a, i) => (
                                    <div key={i} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{a.name}</h3>
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">{a.category}</span>
                                            </div>
                                            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">{a.desc}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">{a.dist}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section: RTS Link */}
                        <section id="rts-link" className="mb-16">
                            <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100">
                                RTS Link &amp; Singapore Day Trips
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mb-8">
                                The Johor Bahru&ndash;Singapore Rapid Transit System (RTS) Link is set to transform cross-border travel.
                                Until it opens, the Causeway remains your fastest route.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">RTS Link (Coming Late 2026)</h3>
                                    <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-4">Game-changer for cross-border travel</p>
                                    <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                                        <li><strong>Route:</strong> Bukit Chagar (JB) &harr; Woodlands North (SG)</li>
                                        <li><strong>Journey time:</strong> ~5 minutes rail + immigration</li>
                                        <li><strong>Capacity:</strong> 10,000 passengers per hour per direction</li>
                                        <li><strong>Benefit:</strong> Skip the Causeway traffic entirely</li>
                                        <li><strong>From hostel:</strong> Bukit Chagar station ~10 min by Grab</li>
                                    </ul>
                                </div>
                                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">Causeway (Available Now)</h3>
                                    <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-4">The classic JB-SG crossing</p>
                                    <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                                        <li><strong>Bus CW1:</strong> JB Sentral &harr; Kranji MRT &mdash; RM 2.50</li>
                                        <li><strong>Grab:</strong> ~RM 40&ndash;60 one-way to Singapore city</li>
                                        <li><strong>Peak hours:</strong> 7&ndash;9am and 5&ndash;8pm weekdays</li>
                                        <li><strong>Pro tip:</strong> Travel before 7am or after 9pm for no queues</li>
                                        <li><strong>Full guide:</strong>{" "}
                                            <Link href="/blog/singapore-to-jb-day-trip-causeway-guide" className="text-amber-700 dark:text-amber-400 hover:underline">
                                                Read our Causeway guide &rarr;
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                                <strong>Smart strategy for 2026:</strong> Stay at Pelangi Capsule Hostel in JB (from RM35/night) and day-trip to Singapore.
                                You save 60&ndash;70% on accommodation while having full access to both countries.
                            </div>
                        </section>

                        {/* Section: Campaign Offer */}
                        <section id="campaign-offer" className="mb-16">
                            <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100">
                                Visit Malaysia 2026 Rates
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mb-8">
                                Book directly for guaranteed best rates throughout Visit Malaysia Year 2026.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        name: "Nightly Stay",
                                        price: "RM35",
                                        unit: "/night",
                                        features: [
                                            "Japanese-style capsule pod",
                                            "Free WiFi & air-conditioning",
                                            "24/7 self check-in access",
                                            "Personal locker included",
                                            "Hot shower & clean bathroom",
                                        ],
                                        highlight: false,
                                    },
                                    {
                                        name: "Weekly Explorer",
                                        price: "RM210",
                                        unit: "/week",
                                        features: [
                                            "All nightly amenities included",
                                            "Save RM35 vs nightly rate",
                                            "Perfect for RTS Link + SG trips",
                                            "Laundry access included",
                                            "Local food guide provided",
                                        ],
                                        highlight: true,
                                    },
                                    {
                                        name: "Monthly Nomad",
                                        price: "RM594",
                                        unit: "/month",
                                        features: [
                                            "All weekly amenities included",
                                            "Best value — RM19.80/night",
                                            "Ideal for digital nomads",
                                            "Shared kitchen access",
                                            "Community workspace vibes",
                                        ],
                                        highlight: false,
                                    },
                                ].map((plan) => (
                                    <div key={plan.name} className={`rounded-2xl border p-6 ${plan.highlight
                                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 shadow-md ring-2 ring-amber-200 dark:ring-amber-800"
                                        : "bg-white dark:bg-stone-900 border-stone-100 dark:border-stone-700 shadow-xs"
                                    }`}>
                                        {plan.highlight && (
                                            <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">Most Popular</div>
                                        )}
                                        <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="font-display text-3xl font-medium text-amber-700 dark:text-amber-400">{plan.price}</span>
                                            <span className="text-sm text-stone-500">{plan.unit}</span>
                                        </div>
                                        <ul className="space-y-2 mb-6">
                                            {plan.features.map((f) => (
                                                <li key={f} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                                                    <span className="text-green-500 mt-0.5">&#x2713;</span>
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href="/book" className={`block text-center py-3 rounded-xl font-medium transition-colors ${plan.highlight
                                            ? "bg-amber-700 text-white hover:bg-amber-800"
                                            : "border border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-700 hover:text-white"
                                        }`}>
                                            Book Now
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-4 text-center">
                                All rates subject to Malaysia Tourism Tax (TTx) of RM10 per room per night as required by law.
                                Rates valid throughout Visit Malaysia Year 2026 (Jan&ndash;Dec 2026).
                            </p>
                        </section>

                        {/* Section: Getting Here */}
                        <section id="getting-here" className="mb-16">
                            <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100">
                                Getting Here
                            </h2>
                            <p className="text-stone-500 dark:text-stone-400 mb-8">
                                Multiple ways to reach Pelangi Capsule Hostel in Taman Pelangi, Johor Bahru.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    {
                                        from: "From Singapore",
                                        color: "border-l-red-400",
                                        routes: [
                                            "Bus CW1 from Kranji MRT to JB Sentral, then Grab (RM8-12)",
                                            "Bus 170 from Queen Street to Larkin, then Grab",
                                            "Direct Grab across Causeway (~RM40-60)",
                                            "RTS Link from Woodlands North (coming late 2026)",
                                        ],
                                    },
                                    {
                                        from: "From KL / Domestic",
                                        color: "border-l-blue-400",
                                        routes: [
                                            "Senai Airport (JHB): 30 min drive, Grab ~RM45",
                                            "KTM train to JB Sentral, then Grab 10 min",
                                            "Express bus to Larkin Terminal, then Grab 15 min",
                                            "Drive: exit Jalan Tebrau, follow Taman Pelangi signs",
                                        ],
                                    },
                                ].map((route) => (
                                    <div key={route.from} className={`bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6 border-l-4 ${route.color}`}>
                                        <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">{route.from}</h3>
                                        <ul className="space-y-2">
                                            {route.routes.map((r) => (
                                                <li key={r} className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2">
                                                    <span className="text-amber-500 mt-0.5">&rarr;</span>
                                                    <span>{r}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <Link href="/getting-here" className="text-amber-700 dark:text-amber-400 hover:underline font-medium text-sm">
                                    View detailed directions with maps &rarr;
                                </Link>
                            </div>
                        </section>

                        {/* CTA */}
                        <div className="mt-4 text-center bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-900/20 dark:to-amber-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                                <span className="text-xs font-semibold text-red-700 dark:text-red-400">Visit Malaysia 2026</span>
                            </div>
                            <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                                Ready to explore Malaysia&apos;s southern gateway?
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-lg mx-auto">
                                Book your pod at Pelangi Capsule Hostel — budget-friendly, central, and perfectly placed for Visit Malaysia 2026 adventures.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/book"
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    Book Your Stay
                                </Link>
                                <Link
                                    href="/guide"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-700 hover:text-white transition-colors font-medium"
                                >
                                    Explore JB Guide &rarr;
                                </Link>
                            </div>
                        </div>

                    </div>{/* end content column */}

                    {/* Desktop ToC sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <TableOfContents headings={headings} />
                        </div>
                    </aside>

                </div>{/* end two-column grid */}
            </div>
            <Footer />
        </main>
    );
}
