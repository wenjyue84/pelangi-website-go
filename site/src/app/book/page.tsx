import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import TrustSignals from "@/components/TrustSignals";
import BookEcommerceTracker from "@/components/BookEcommerceTracker";
import DuitNowPayment from "@/components/DuitNowPayment";
import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Book a Pod | Pelangi Capsule Hostel JB — From RM35/night",
  description:
    "Book your capsule pod at Pelangi Capsule Hostel in Johor Bahru. Direct WhatsApp booking from RM35/night or RM594/month. No platform fees, instant confirmation.",
  keywords: [
    "book capsule hostel JB",
    "Johor Bahru hostel booking",
    "budget accommodation JB",
    "Pelangi Capsule Hostel",
    "capsule pod JB",
  ],
  alternates: {
    canonical: "https://pelangicapsulehostel.com/book",
  },
  openGraph: {
    title: "Book a Pod | Pelangi Capsule Hostel JB",
    description:
      "Book direct from RM35/night. WhatsApp booking, no platform fees, instant confirmation at Pelangi Capsule Hostel Johor Bahru.",
    url: "https://pelangicapsulehostel.com/book",
    siteName: "Pelangi Capsule Hostel",
    type: "website",
  },
};

const WHATSAPP_URL =
  "https://wa.me/60127088789?text=Hi%20Pelangi%20Capsule%20Hostel!%20I'd%20like%20to%20book%20a%20pod.%20Please%20confirm%20availability%20for%20%5Bdates%5D.";

const directBenefits = [
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "No Platform Fees",
    description: "Save on OTA commissions — get the best rate guaranteed",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Instant Confirmation",
    description: "Get confirmed within minutes via WhatsApp reply",
  },
  {
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Pay at Arrival",
    description: "No credit card needed — pay cash or card when you check in",
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Personal Service",
    description: "Chat directly with Jay or Alston — real people, real answers",
  },
];

const houseRules = [
  { rule: "Check-in from 2:00 PM", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { rule: "Check-out by 12:00 PM", icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" },
  { rule: "No smoking indoors", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
  { rule: "Quiet hours: 11 PM – 7 AM", icon: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" },
  { rule: "Valid ID required at check-in", icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" },
  { rule: "Shared spaces: keep clean", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
];

const otaPlatforms = [
  {
    name: "Booking.com",
    url: "https://www.booking.com/hotel/my/pelangi-hostel-capsule.html",
    tagline: "Free cancellation available",
    initial: "B",
    color: "bg-blue-600",
  },
  {
    name: "Hostelworld",
    url: "https://www.hostelworld.com/pwa/hosteldetails.php/Pelangi-Capsule-Hostel/Johor-Bahru/317698",
    tagline: "Popular with backpackers",
    initial: "H",
    color: "bg-orange-500",
  },
  {
    name: "Agoda",
    url: "https://www.agoda.com/en-in/pelangi-hostel-capsule/hotel/johor-bahru-my.html",
    tagline: "Best price guarantee",
    initial: "A",
    color: "bg-red-500",
  },
];

const lodgingReservationSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingReservation",
  "reservationStatus": "https://schema.org/ReservationPending",
  "reservationFor": {
    "@type": "LodgingBusiness",
    "@id": "https://pelangicapsulehostel.com/#hostel",
    "name": "Pelangi Capsule Hostel",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "26A Jalan Perang, Taman Pelangi",
      "addressLocality": "Johor Bahru",
      "addressRegion": "Johor",
      "postalCode": "80400",
      "addressCountry": "MY",
    },
  },
  "checkinTime": "T14:00:00",
  "checkoutTime": "T12:00:00",
  "totalPrice": "35",
  "priceCurrency": "MYR",
};

export default function BookPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingReservationSchema) }}
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-linear-to-b from-amber-800 to-amber-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-700/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-300 mb-4">
            Book Your Stay
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Reserve Your Pod
          </h1>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Book direct via WhatsApp for the best rate — no platform fees, instant
            confirmation, and pay at arrival.
          </p>

          {/* Primary WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 text-white rounded-2xl
                       py-5 px-10 font-semibold text-lg hover:bg-green-600 transition-all
                       duration-300 hover:-translate-y-1 hover:shadow-xl"
            aria-label="Book via WhatsApp"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book via WhatsApp
          </a>
          <p className="text-amber-300 text-sm mt-4">
            Replies within minutes during 8 AM – 10 PM
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 mb-3">
              Transparent Pricing
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 dark:text-stone-100">
              Simple, Honest Rates
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Nightly */}
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700 text-center">
              <div className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">Nightly Stay</div>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="font-display text-5xl font-medium text-stone-900 dark:text-stone-100">RM35</span>
                <span className="text-stone-500 dark:text-stone-400">–</span>
                <span className="font-display text-5xl font-medium text-stone-900 dark:text-stone-100">45</span>
                <span className="text-stone-500 dark:text-stone-400 ml-1">/night</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 mb-2">
                <span>+ Tourism Tax (TTx): RM10/room/night</span>
                <a
                  href="https://www.myttx.customs.gov.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Learn more about Malaysia Tourism Tax (TTx)"
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                Per person, per night. Price varies by day and season.
              </p>
              <ul className="text-left space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Private capsule pod with door
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Free WiFi, A/C, personal locker
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Shared kitchen & laundry access
                </li>
              </ul>
            </div>

            {/* Monthly */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-3xl p-8 shadow-lg border border-amber-200 dark:border-amber-700 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Best Value
              </div>
              <div className="text-xs tracking-widest uppercase text-amber-700 dark:text-amber-400 mb-2">Monthly Stay</div>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="font-display text-5xl font-medium text-stone-900 dark:text-stone-100">RM594</span>
                <span className="text-stone-500 dark:text-stone-400 ml-1">/month</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 mb-2">
                <span>+ Tourism Tax (TTx): RM10/room/night</span>
                <a
                  href="https://www.myttx.customs.gov.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Learn more about Malaysia Tourism Tax (TTx)"
                  className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                That&apos;s just RM19.80/night — save over 40% vs nightly rate.
              </p>
              <ul className="text-left space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Everything in nightly stay
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Ideal for remote workers & digital nomads
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Flexible start date
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Signals */}
          <TrustSignals />

          {/* Booking Form */}
          <div className="mt-12 max-w-md mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Why Book Direct */}
      <section className="py-16 bg-white dark:bg-stone-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 mb-3">
              Direct Booking Benefits
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-stone-900 dark:text-stone-100">
              Why Book Direct?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {directBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 text-center hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">{benefit.title}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* OTA vs Direct Savings Comparison Callout */}
          <div className="mt-12 max-w-3xl mx-auto bg-linear-to-r from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-800 rounded-3xl p-8 border border-amber-200 dark:border-amber-700">
            <p className="text-center text-xs font-medium tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 mb-6">
              Price Comparison
            </p>
            <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 text-center mb-6">
              Direct vs OTA — What You Actually Pay
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* OTA column */}
              <div className="bg-white/70 dark:bg-stone-900/70 rounded-2xl p-5 border border-stone-200 dark:border-stone-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                    </svg>
                  </div>
                  <span className="font-medium text-stone-700 dark:text-stone-300">Via Booking.com</span>
                </div>
                <div className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Room rate</span>
                    <span className="font-medium">RM40–48</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Platform service fee</span>
                    <span className="font-medium">+15–20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tourism Tax (TTx)</span>
                    <span className="font-medium">RM10</span>
                  </div>
                  <div className="border-t border-stone-200 dark:border-stone-700 pt-2 mt-2 flex justify-between font-semibold text-stone-800 dark:text-stone-200">
                    <span>You pay</span>
                    <span>~RM56–68/night</span>
                  </div>
                </div>
              </div>

              {/* Direct column */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="font-medium text-green-800">Direct via WhatsApp</span>
                </div>
                <div className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Room rate</span>
                    <span className="font-medium">RM35–45</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Platform fee</span>
                    <span className="font-medium">RM0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tourism Tax (TTx)</span>
                    <span className="font-medium">RM10</span>
                  </div>
                  <div className="border-t border-green-200 dark:border-green-800 pt-2 mt-2 flex justify-between font-semibold text-green-800 dark:text-green-300">
                    <span>You pay</span>
                    <span>RM45–55/night</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-amber-800 dark:text-amber-300 font-medium">
              Save up to <span className="font-bold text-green-700">RM13/night</span> by booking direct — that&apos;s <span className="font-bold text-green-700">RM91/week</span> back in your pocket.
            </p>
            <p className="text-center text-xs text-stone-500 dark:text-stone-400 mt-2">
              All prices exclude Tourism Tax (TTx) of RM10/room/night, required by Malaysian law.{" "}
              <a href="https://www.myttx.customs.gov.my/" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">Learn more</a>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 max-w-3xl mx-auto">
            <p className="text-center text-xs font-medium tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 mb-5">
              Trusted &amp; Secure
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  label: "Verified Property",
                  sub: "Registered with MOTAC",
                },
                {
                  icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                  label: "Secure Payment",
                  sub: "Cash or card at arrival",
                },
                {
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  label: "Real Human Support",
                  sub: "Talk to Jay directly",
                },
                {
                  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                  label: "10+ Years Hosting",
                  sub: "Since 2013, 500+ reviews",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white dark:bg-stone-800 rounded-xl px-4 py-3 border border-stone-100 dark:border-stone-700 shadow-xs"
                >
                  <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                  </svg>
                  <div>
                    <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">{badge.label}</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary WhatsApp CTA */}
          <div className="text-center mt-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book Now on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Best Price Guarantee */}
      <section className="py-8 container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-1">Best Price Guarantee</h3>
              <p className="text-sm text-green-800 dark:text-green-300">
                Book direct for the lowest rate — guaranteed. Find it cheaper on any OTA platform and we&apos;ll match it, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods & DuitNow QR */}
      <DuitNowPayment />

      {/* OTA Platforms */}
      <section className="py-16 container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 mb-3">
              Also Available On
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
              Prefer a Platform?
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mt-2">
              You can also find us on these booking sites.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {otaPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-stone-900 rounded-2xl p-6 text-center shadow-md border border-stone-100 dark:border-stone-700
                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${platform.color} mx-auto mb-4
                             flex items-center justify-center text-white font-bold text-lg`}
                >
                  {platform.initial}
                </div>
                <div className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 transition-colors mb-1">
                  {platform.name}
                </div>
                <div className="text-sm text-stone-500 dark:text-stone-400">{platform.tagline}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="py-16 bg-white dark:bg-stone-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 mb-3">
                Good to Know
              </p>
              <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                House Rules
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {houseRules.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-stone-50 dark:bg-stone-800 rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-stone-700 dark:text-stone-300 font-medium">{item.rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-stone-100 dark:bg-stone-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-4">
              Questions? We&apos;re Here to Help
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-8">
              Not sure which pod to choose? Need to arrange early check-in? Just ask.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white
                           rounded-xl py-4 px-8 font-medium hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Jay
              </a>
              <a
                href="tel:+60127088789"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200
                           rounded-xl py-4 px-8 font-medium border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +60 12-708 8789
              </a>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-6">
              <Link href="/rooms" className="text-amber-700 dark:text-amber-400 hover:underline">View our rooms</Link>
              {" · "}
              <Link href="/guide" className="text-amber-700 dark:text-amber-400 hover:underline">Local guide</Link>
              {" · "}
              <Link href="/check-in" className="text-amber-700 dark:text-amber-400 hover:underline">Check-in info</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BookEcommerceTracker />
    </main>
  );
}
