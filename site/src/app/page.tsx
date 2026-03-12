import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = 'force-static';
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

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50">
      <Header />
      <Hero />

      {/* Dashboard / Quick Access Section */}
      <section className="py-16 container-custom -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Check-in Card */}
          <Link href="/check-in" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                <svg className="w-7 h-7 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900">Check-in Guide</h3>
              <p className="text-stone-600 mb-4">Arriving? Watch our video guide and get your pod access code.</p>
              <span className="text-amber-700 font-medium flex items-center gap-2">
                Watch Video
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>

          {/* Local Guide Card */}
          <Link href="/guide" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900">Local Guide</h3>
              <p className="text-stone-600 mb-4">Hungry? Discover the best local food and spots nearby.</p>
              <span className="text-green-700 font-medium flex items-center gap-2">
                Explore Area
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>

          {/* Booking Card */}
          <Link href="/book" className="group">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3 text-stone-900">Book Your Stay</h3>
              <p className="text-stone-600 mb-4">Get the best rates by booking directly with us via WhatsApp.</p>
              <span className="text-blue-700 font-medium flex items-center gap-2">
                Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Amenities Section */}
      <Amenities />

      {/* Community Events & Vibe Section */}
      <CommunityEventsStructuredData />
      <CommunityEvents />

      {/* JB Buzz - News & Blog Teaser */}
      <JBBuzz />

      {/* Teaser Section */}
      <section className="py-20 bg-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-medium mb-6 text-stone-900">Why travelers love us</h2>
          <p className="text-lg text-stone-600 mb-10">
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

      {/* FAQ Section */}
      <FAQ />

      {/* Destinations Section */}
      <Destinations />

      <Footer />
    </main>
  );
}
