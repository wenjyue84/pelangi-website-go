import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BOOK_NOW_LABEL, BOOK_NOW_ARIA } from "@/lib/ui-labels";
export const metadata: Metadata = {
  title: "Hostel Amenities | Free WiFi, Co-working Space & More",
  description: "Discover Pelangi Capsule Hostel amenities: high-speed WiFi for digital nomads, dedicated co-working space, 24/7 access, secure lockers, shared kitchen, laundry facilities, and more. Perfect for long-stay backpackers in Johor Bahru.",
  keywords: [
    "hostel amenities Johor Bahru",
    "free WiFi hostel JB",
    "co-working hostel",
    "digital nomad hostel",
    "hostel kitchen facilities",
    "capsule hostel amenities",
    "long-stay hostel Malaysia",
    "backpacker hostel features",
    "affordable hostel JB",
  ],
  openGraph: {
    title: "Hostel Amenities | Pelangi Capsule Hostel",
    description: "High-speed WiFi, co-working space, shared kitchen, 24/7 access, and more. Everything for comfortable backpacking in JB.",
    type: "website",
    url: "https://pelangicapsulehostel.com/amenities",
    images: [
      {
        url: "/amenities/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pelangi Capsule Hostel Amenities - Free WiFi, Co-working Space, Shared Kitchen, and More in Johor Bahru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hostel Amenities | Pelangi Capsule Hostel",
    description: "Free WiFi, co-working space, shared kitchen, 24/7 access, and more.",
  },
};

const amenities = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    label: "High-Speed WiFi",
    description: "Gigabit fiber internet connection with 50+ Mbps download speeds. Perfect for streaming, video calls, and remote work. Coverage throughout the hostel.",
    schemaName: "High-Speed WiFi",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    label: "Quiet Hours",
    description: "10 PM - 8 AM quiet hours policy ensures peaceful sleep. Common areas are available 24/7 for guests who need to work around the clock.",
    schemaName: "Quiet Hours 10PM-8AM",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: "Secure Lockers",
    description: "Individual lockers in each pod with master key access. Valuables storage available. 24/7 access to your personal locker.",
    schemaName: "Secure Lockers in Pods",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: "Universal Power Outlets",
    description: "Multiple 220V outlets and USB charging ports in each pod. Lightning, USB-C, and Micro USB adapters available at reception.",
    schemaName: "Universal Power Outlets and USB Charging",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    label: "Co-working Space",
    description: "Dedicated co-working area with high-speed WiFi, desk, and ergonomic seating. Free to use for all guests. Bookable for business meetings. Conference call-friendly.",
    schemaName: "Dedicated Co-working Space",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    label: "Full Air Conditioning",
    description: "Climate-controlled pods with individual temperature controls. Central air conditioning maintains 22-24°C comfort year-round.",
    schemaName: "Air Conditioning",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    label: "Fresh Linens Daily",
    description: "Complimentary fresh sheets, pillowcases, and towels. Laundry service available daily. Duvet covers changed weekly or on request.",
    schemaName: "Fresh Linens and Towels",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10h-8m0 0v8a2 2 0 002 2h12a2 2 0 002-2v-8m-13 0V5a2 2 0 012-2h4a2 2 0 012 2v5m-13 0a2 2 0 002 2h12a2 2 0 002-2" />
      </svg>
    ),
    label: "Shared Kitchen",
    description: "Fully equipped kitchen with refrigerator, microwave, stove, oven, and dishwasher. Open 6 AM - 11 PM. Complimentary cooking utensils and basic spices provided.",
    schemaName: "Shared Kitchen Facilities",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h0m16 0v-5m0 5v10a2 2 0 01-2 2h-12a2 2 0 01-2-2v-10m16 0h2a2 2 0 012 2v10a2 2 0 01-2 2h-2m0 0v-6a2 2 0 00-2-2h-4a2 2 0 00-2 2v6m0 0H2m16 0H6" />
      </svg>
    ),
    label: "Laundry Facilities",
    description: "Complimentary washing machine and dryer (RM3/load). In-house laundry service for guests: RM5/load (since March 2026) — cheaper than the dobi outside. Iron and ironing board available.",
    schemaName: "Laundry Service",
  },
];

export default function AmenitiesPage() {
  // Generate LocationFeatureSpecification schema
  const amenityFeatures = amenities.map((amenity) => ({
    "@type": "LocationFeatureSpecification",
    name: amenity.schemaName,
    value: true,
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Pelangi Capsule Hostel",
    description: "Japanese-style capsule hostel in Johor Bahru with modern amenities",
    url: "https://pelangicapsulehostel.com",
    telephone: "+60127088789",
    address: {
      "@type": "PostalAddress",
      streetAddress: "26A Jalan Perang",
      addressLocality: "Johor Bahru",
      addressRegion: "Johor",
      postalCode: "80400",
      addressCountry: "MY",
    },
    amenityFeature: amenityFeatures,
    priceRange: "$",
    currenciesAccepted: "MYR",
    paymentAccepted: "Cash, DuitNow QR, Credit Card",
    tourBookingPage: "https://pelangicapsulehostel.com/book",
    hasMap: "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
  };

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-linear-to-br from-stone-50 to-amber-50 dark:from-stone-950 dark:to-stone-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-display text-5xl font-medium mb-6 text-stone-900 dark:text-stone-100">
              Everything You Need
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 mb-6">
              Pelangi Capsule Hostel is equipped with modern amenities designed for digital nomads, long-stay guests, and backpackers. From high-speed WiFi to a dedicated co-working space, we&apos;ve thought of everything to make your stay comfortable and productive.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/book"
                className="px-8 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
                aria-label={BOOK_NOW_ARIA}
              >
                {BOOK_NOW_LABEL}
              </Link>
              <Link
                href="/"
                className="px-8 py-3 bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 border border-amber-700 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-800 transition-colors"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-800 dark:text-amber-300 mb-6">
                  {amenity.icon}
                </div>
                <h3 className="font-display text-xl font-medium mb-3 text-stone-900 dark:text-stone-100">
                  {amenity.label}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Details Section */}
      <section className="py-20 bg-white dark:bg-stone-900">
        <div className="container-custom">
          <h2 className="font-display text-4xl font-medium mb-12 text-center text-stone-900 dark:text-stone-100">
            Designed for Your Comfort
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Kitchen Details */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                Kitchen & Dining
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Our fully-equipped shared kitchen is open daily from 6 AM to 11 PM. Cook meals at your own pace with friends.
              </p>
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Full-size refrigerator with labeled storage</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Electric stove, oven, and microwave</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Dishwasher and basic cooking utensils</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Common dining area with seating for 20+</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Free spices, oil, and condiments</span>
                </li>
              </ul>
            </div>

            {/* Co-working Details */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                Co-working Space
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Perfect for digital nomads and remote workers. Fast, reliable internet and professional atmosphere.
              </p>
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Dedicated desk with ergonomic seating</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Gigabit fiber WiFi (50+ Mbps)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>USB charging and multiple power outlets</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Bookable for business meetings</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Video call-friendly (quiet, professional background)</span>
                </li>
              </ul>
            </div>

            {/* Laundry Details */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                Laundry Services
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Keep your clothes fresh and clean during your stay with our convenient laundry options.
              </p>
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Self-service washing & drying: RM3 per load</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Laundry service: RM15/kg (next-day delivery)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Free iron and ironing board in common area</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Daily linen change (weekly duvet covers)</span>
                </li>
              </ul>
            </div>

            {/* Safety & Access */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                Safety & Access
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Your safety and peace of mind are our top priorities. 24/7 access with secure lockdown features.
              </p>
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>24/7 access to your pod with personal key card</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Individual secure locker in each pod</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>CCTV surveillance in common areas</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>24-hour front desk staff</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-700 dark:text-amber-400 font-medium">✓</span>
                  <span>Emergency contact available anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-linear-to-br from-green-50 to-emerald-50 dark:from-stone-900 dark:to-stone-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-medium mb-6 text-stone-900 dark:text-stone-100">
                Our Sustainability Commitment
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-400">
                At Pelangi Capsule Hostel, we&apos;re dedicated to minimizing our environmental impact while providing exceptional hospitality. Sustainable travel isn&apos;t just a trend — it&apos;s our responsibility to future generations of travelers exploring Johor Bahru.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Eco Practice 1 */}
              <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-emerald-100 dark:border-stone-700 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v12m8-8a8 8 0 11-16 0 8 8 0 0116 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                      Water Dispensers
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Complimentary refillable water dispensers throughout the hostel reduce single-use plastic bottles. We provide reusable water bottles to guests to further minimize waste.
                    </p>
                  </div>
                </div>
              </div>

              {/* Eco Practice 2 */}
              <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-emerald-100 dark:border-stone-700 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                      Energy-Efficient Lighting
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      All capsule pods and common areas are equipped with LED lighting and motion-sensor lighting in restrooms and corridors. This reduces electricity consumption while maintaining comfort.
                    </p>
                  </div>
                </div>
              </div>

              {/* Eco Practice 3 */}
              <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-emerald-100 dark:border-stone-700 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4v-10m0 0l8 4m-8-4v10m0 0l-8-4m8 4l8-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                      Comprehensive Recycling
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Color-coded recycling bins for paper, plastic, glass, and organic waste are available in all common areas and throughout the hostel. Staff ensure proper sorting and disposal with local recycling facilities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Eco Practice 4 */}
              <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-emerald-100 dark:border-stone-700 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                      Eco-Conscious Operations
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      We source local and sustainable products whenever possible, use biodegradable cleaning supplies, and prioritize eco-friendly amenities. Our commitment to sustainability is integral to how we operate daily.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl border border-emerald-100 dark:border-stone-700 text-center">
              <p className="text-stone-600 dark:text-stone-400 text-lg">
                By choosing Pelangi Capsule Hostel, you&apos;re supporting sustainable tourism in Johor Bahru. Together, we can make travel more responsible and protect the beautiful destinations we all love to explore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl font-medium mb-4">
            Ready to Experience Pelangi?
          </h2>
          <p className="text-lg mb-8 text-amber-100 max-w-2xl mx-auto">
            Book your stay today and enjoy our full range of hostel amenities. Digital nomads and long-stay guests receive special discounts.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/book"
              className="px-8 py-3 bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-medium"
              aria-label="Book Now — Reserve your stay at Pelangi Capsule Hostel"
            >
              Book Now
            </Link>
            <Link
              href="/rooms"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-amber-700 transition-colors font-medium"
            >
              View Rooms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
