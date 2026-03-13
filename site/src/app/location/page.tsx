import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangMs from "@/components/LangMs";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Location & Directions | Pelangi Capsule Hostel Johor Bahru",
  description:
    "Find Pelangi Capsule Hostel at 26A Jalan Perang, Taman Pelangi, Johor Bahru. Directions from JB Sentral, CIQ Border, and Larkin Bus Terminal. Google Maps, transport info, and local area guide.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/location",
  },
  openGraph: {
    title: "Location & Directions | Pelangi Capsule Hostel",
    description:
      "Find us in Taman Pelangi, Johor Bahru. Directions from JB Sentral, CIQ, and Larkin Terminal. Check-in 2 PM, check-out 12 PM.",
    url: "https://pelangicapsulehostel.com/location",
    type: "website",
  },
};

const transportDirections = [
  {
    from: "JB Sentral (Train Station)",
    icon: "train",
    distance: "~10 min drive / 5 km",
    steps: [
      "Exit JB Sentral main entrance and head to the taxi/e-hailing pickup area",
      "Take a Grab or taxi to 26A Jalan Perang, Taman Pelangi (RM8–12)",
      "Alternatively, take bus P101 from JB Sentral bus stop to Pelangi Leisure Mall (15 min), then walk 2 minutes",
    ],
  },
  {
    from: "CIQ (Customs, Immigration & Quarantine)",
    icon: "border",
    distance: "~15 min drive / 6 km",
    steps: [
      "After clearing immigration, exit through the main hall towards the taxi stand",
      "Take a Grab or taxi to 26A Jalan Perang, Taman Pelangi (RM10–15)",
      "If arriving from Singapore by bus (CW1/CW2), alight at JB Sentral and follow JB Sentral directions above",
    ],
  },
  {
    from: "Larkin Bus Terminal",
    icon: "bus",
    distance: "~15 min drive / 7 km",
    steps: [
      "Exit the terminal and head to the Grab/taxi pickup area",
      "Take a Grab or taxi to 26A Jalan Perang, Taman Pelangi (RM10–15)",
      "Alternatively, take bus P101 heading towards JB Sentral — alight at Pelangi Leisure Mall stop",
    ],
  },
  {
    from: "Senai International Airport (JHB)",
    icon: "plane",
    distance: "~35 min drive / 30 km",
    steps: [
      "Take a Grab or airport taxi from the arrivals hall (RM45–60)",
      "Alternatively, take the airport shuttle to JB Sentral, then Grab to Taman Pelangi",
      "Direct Grab is the most convenient option for late-night arrivals",
    ],
  },
];

const nearbyAttractions = [
  {
    name: "Pelangi Leisure Mall",
    type: "Shopping",
    distance: "2 min walk",
    description: "Neighbourhood mall with restaurants, convenience stores, and a cinema",
  },
  {
    name: "Jalan Tan Hiok Nee (Heritage Street)",
    type: "Culture",
    distance: "10 min drive",
    description: "Historic street with cafes, murals, antique shops, and local heritage",
  },
  {
    name: "KSL City Mall",
    type: "Shopping",
    distance: "8 min drive",
    description: "Major shopping centre with international brands, food court, and entertainment",
  },
  {
    name: "Pasar Karat (Flea Market)",
    type: "Market",
    distance: "10 min drive",
    description: "Famous night flea market every Wednesday and Saturday evening",
  },
  {
    name: "Danga Bay Waterfront",
    type: "Leisure",
    distance: "12 min drive",
    description: "Seaside promenade with restaurants, night market, and waterfront views",
  },
  {
    name: "LEGOLAND Malaysia",
    type: "Theme Park",
    distance: "30 min drive",
    description: "Asia's first LEGOLAND theme park with rides, shows, and water park",
  },
];

function TransportIcon({ type }: { type: string }) {
  switch (type) {
    case "train":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
        </svg>
      );
    case "border":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      );
    case "bus":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v4m-4-4h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2zm-3 4h2m8 0h2" />
        </svg>
      );
    case "plane":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    default:
      return null;
  }
}

export default function LocationPage() {
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://pelangicapsulehostel.com/location#lodging",
    name: "Pelangi Capsule Hostel",
    description:
      "Japanese-style capsule hostel in Taman Pelangi, Johor Bahru. Budget-friendly accommodation from RM35/night with free WiFi, 24/7 access, hot showers, and personal lockers.",
    url: "https://pelangicapsulehostel.com/location",
    telephone: "+60127088789",
    email: "pelangicapsule@gmail.com",
    image: "https://pelangicapsulehostel.com/images/exterior-1.webp",
    priceRange: "$",
    currenciesAccepted: "MYR",
    paymentAccepted: "Cash, DuitNow QR, Credit Card",
    checkinTime: "T14:00:00",
    checkoutTime: "T12:00:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "26A Jalan Perang, Taman Pelangi",
      addressLocality: "Johor Bahru",
      addressRegion: "Johor",
      postalCode: "80400",
      addressCountry: "MY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 1.48552,
      longitude: 103.7594,
    },
    hasMap: "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
    sameAs: [
      "https://www.facebook.com/pelangicapsulehostel",
      "https://www.instagram.com/pelangicapsulehostel",
      "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
      "https://www.booking.com/hotel/my/pelangi-hostel-capsule.html",
      "https://www.hostelworld.com/pwa/hosteldetails.php/Pelangi-Capsule-Hostel/Johor-Bahru/317698",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    tourBookingPage: "https://pelangicapsulehostel.com/book",
  };

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-white dark:bg-stone-900">
        <div className="container-custom">
          <p className="section-label">Location</p>
          <h1 className="section-heading mb-4">
            Find Us in <LangMs>Taman Pelangi</LangMs>
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
            Pelangi Capsule Hostel is located in the heart of{" "}
            <LangMs>Taman Pelangi</LangMs>, one of Johor Bahru&apos;s most
            established and well-connected residential areas — surrounded by
            eateries, convenience stores, and just minutes from major transport
            hubs.
          </p>
        </div>
      </section>

      {/* Map + Contact Info */}
      <section className="section-padding bg-stone-50 dark:bg-stone-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Google Maps Embed */}
            <div className="relative h-[400px] lg:h-full min-h-[450px] rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4044839447424!2d103.7573!3d1.4862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6c15f34a1b2d%3A0x1234567890abcdef!2s26a%20Jalan%20Perang%2C%20Taman%20Pelangi%2C%2080400%20Johor%20Bahru%2C%20Johor!5e0!3m2!1sen!2smy!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Pelangi Capsule Hostel location on Google Maps"
              />
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-8">
                Contact &amp; Hours
              </h2>

              {/* Address */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 mb-4 border border-stone-200 dark:border-stone-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Address</h3>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      26A, <LangMs>Jalan Perang</LangMs>,<br />
                      <LangMs>Taman Pelangi</LangMs>,<br />
                      80400 Johor Bahru,<br />
                      Johor, Malaysia
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 mb-4 border border-stone-200 dark:border-stone-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Phone & Email</h3>
                    <div className="space-y-1.5">
                      <a href="tel:+60127088789" className="min-h-6 block text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                        Jay: +60 12-708 8789
                      </a>
                      <a href="tel:+60167620815" className="min-h-6 block text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                        Alston: +60 16-762 0815
                      </a>
                      <a href="mailto:pelangicapsule@gmail.com" className="min-h-6 block text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                        pelangicapsule@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check-in / Check-out */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 mb-4 border border-stone-200 dark:border-stone-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Check-in &amp; Check-out</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1">Check-in</p>
                        <p className="text-lg font-medium text-stone-900 dark:text-stone-100">2:00 PM</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1">Check-out</p>
                        <p className="text-lg font-medium text-stone-900 dark:text-stone-100">12:00 PM</p>
                      </div>
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                      Early check-in and late check-out available on request (subject to availability).
                    </p>
                  </div>
                </div>
              </div>

              {/* Get Directions CTA */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=26a+Jalan+Perang+Taman+Pelangi+Johor+Bahru"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 cursor-pointer mt-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Directions */}
      <section className="section-padding bg-white dark:bg-stone-900">
        <div className="container-custom">
          <p className="section-label">Getting Here</p>
          <h2 className="section-heading mb-12">
            Transport Directions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {transportDirections.map((direction) => (
              <div
                key={direction.from}
                className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                    <TransportIcon type={direction.icon} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {direction.from}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{direction.distance}</p>
                  </div>
                </div>
                <ol className="space-y-2 ml-1">
                  {direction.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-stone-600 dark:text-stone-400">
                      <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0 text-xs font-medium text-stone-600 dark:text-stone-300 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Area / Nearby Attractions */}
      <section className="section-padding bg-stone-50 dark:bg-stone-950">
        <div className="container-custom">
          <p className="section-label">Explore</p>
          <h2 className="section-heading mb-4">
            What&apos;s Nearby
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-2xl mb-12">
            <LangMs>Taman Pelangi</LangMs> is one of JB&apos;s most central
            neighbourhoods — you&apos;re never far from great food, shopping, or
            a day trip to Singapore (just 30 minutes from the CIQ border
            crossing).
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attraction) => (
              <div
                key={attraction.name}
                className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {attraction.type}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {attraction.distance}
                  </span>
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  {attraction.name}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {attraction.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="section-padding bg-white dark:bg-stone-900">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-8 text-center">
            Quick Facts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "From Singapore", value: "30 min", detail: "via CIQ border" },
              { label: "From JB Sentral", value: "10 min", detail: "by Grab/taxi" },
              { label: "From Airport", value: "35 min", detail: "Senai (JHB)" },
              { label: "Walk to Mall", value: "2 min", detail: "Pelangi Leisure Mall" },
            ].map((fact) => (
              <div key={fact.label} className="text-center p-6 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <p className="text-3xl font-display font-medium text-amber-600 dark:text-amber-400 mb-1">
                  {fact.value}
                </p>
                <p className="font-medium text-stone-900 dark:text-stone-100 text-sm">{fact.label}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{fact.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
