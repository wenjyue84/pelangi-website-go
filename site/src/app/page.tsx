import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const experimental_ppr = true;

import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import LocationMap from "@/components/LocationMap";
import FAQ from "@/components/FAQ";
import CommunityEvents from "@/components/CommunityEvents";
import CommunityEventsStructuredData from "@/components/CommunityEventsStructuredData";
import JBBuzz from "@/components/JBBuzz";
import SingaporeTeaser from "@/components/SingaporeTeaser";

function SectionSkeleton({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`${height} w-full animate-pulse bg-stone-100 dark:bg-stone-800 rounded-xl`} />
  );
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />
      <Hero />

      {/* Dashboard / Quick Access Section */}
      <section className="py-16 container-custom -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Check-in Card */}
          <Link href="/check-in" className="group">
            <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                <svg className="w-7 h-7 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900 dark:text-stone-100">Check-in Guide</h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">Arriving? Watch our video guide and get your pod access code.</p>
              <span className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-2">
                Watch Video
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>

          {/* Local Guide Card */}
          <Link href="/guide" className="group">
            <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                <svg className="w-7 h-7 text-green-700 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900 dark:text-stone-100">Local Guide</h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">Hungry? Discover the best local food and spots nearby.</p>
              <span className="text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                Explore Area
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>

          {/* Booking Card */}
          <Link href="/book" className="group">
            <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-stone-700 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <svg className="w-7 h-7 text-blue-700 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900 dark:text-stone-100">Book Your Stay</h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">Get the best rates by booking directly with us via WhatsApp.</p>
              <span className="text-blue-700 dark:text-blue-400 font-medium flex items-center gap-2">
                Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Reviews Section — streamed via PPR Suspense boundary */}
      <Suspense fallback={<div className="py-20 bg-white dark:bg-stone-900 container-custom"><SectionSkeleton height="h-80" /></div>}>
        <Reviews />
      </Suspense>

      {/* Amenities Section */}
      <Suspense fallback={<div className="py-20 container-custom"><SectionSkeleton height="h-96" /></div>}>
        <Amenities />
      </Suspense>

      {/* Community Events & Vibe Section — streamed via PPR Suspense boundary */}
      <CommunityEventsStructuredData />
      <Suspense fallback={<div className="py-20 bg-white dark:bg-stone-900 container-custom"><SectionSkeleton height="h-96" /></div>}>
        <CommunityEvents />
      </Suspense>

      {/* JB Buzz - News & Blog Teaser — streamed via PPR Suspense boundary */}
      <Suspense fallback={<div className="py-20 bg-stone-50 dark:bg-stone-950 container-custom"><SectionSkeleton height="h-96" /></div>}>
        <JBBuzz />
      </Suspense>

      {/* Teaser Section */}
      <section className="py-20 bg-white dark:bg-stone-900">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-medium mb-6 text-stone-900 dark:text-stone-100">Why travelers love us</h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 mb-10">
            We are more than just a bed. We are a community. Experience Japanese-style privacy with Malaysian hospitality.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/gallery" className="btn-secondary">View Gallery</Link>
            <Link href="/rooms" className="btn-primary">See Our Pods</Link>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <LocationMap />

      {/* Singapore Teaser Section */}
      <SingaporeTeaser />

      {/* AI Overviews: concise factual Q&A paragraphs for top search queries */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950">
        <div className="container-custom max-w-3xl">
          <h2 className="font-display text-4xl font-medium mb-10 text-center text-stone-900 dark:text-stone-100">
            About Pelangi Capsule Hostel
          </h2>

          <div className="space-y-8 text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
            <div>
              <h3 id="speakable-location" className="font-display text-2xl font-medium mb-3 text-stone-900 dark:text-stone-100">
                Is Pelangi Capsule Hostel near CIQ?
              </h3>
              <p>
                Yes, Pelangi Capsule Hostel is approximately 15 minutes by car from the Sultan Iskandar Building (CIQ) border checkpoint in Johor Bahru. The hostel is located at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru — a central neighbourhood known for its night market, restaurants, and cafes. A Grab ride from JB CIQ to the hostel costs around RM8–12, making it one of the most accessible budget accommodations for travellers crossing from Singapore.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900 dark:text-stone-100">
                How much does a capsule pod cost?
              </h3>
              <p>
                Capsule pods at Pelangi Capsule Hostel start from RM35 per night (approximately SGD 10.50 or USD 7.50). A Malaysia Tourism Tax (TTx) of RM10 per room per night is added as required by law. Monthly long-stay rates are available from RM594 per month. Booking directly at <a href="/book" className="text-amber-700 dark:text-amber-400 hover:underline">pelangicapsulehostel.com/book</a> guarantees the best rate with no OTA commissions or hidden fees.
              </p>
            </div>

            <div>
              <h3 id="speakable-amenities" className="font-display text-2xl font-medium mb-3 text-stone-900 dark:text-stone-100">
                Why is Pelangi Capsule one of the best hostels in Johor Bahru?
              </h3>
              <p>
                Pelangi Capsule Hostel combines Japanese-style capsule pod privacy with Malaysian hospitality at budget-friendly prices. Each pod has a lockable sliding door, personal climate control, USB charging, adjustable LED lighting, and a premium mattress. The hostel provides free high-speed WiFi, 24/7 self-check-in access, hot showers, a shared kitchen, personal lockers, and laundry facilities. Located in Taman Pelangi — one of JB&apos;s most vibrant food districts — guests are within walking distance of hawker stalls, kopitiam, and the famous Tuesday night market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Destinations Section */}
      <Destinations />

      <Footer />
    </main>
  );
}
