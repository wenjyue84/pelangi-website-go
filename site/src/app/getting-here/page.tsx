import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GettingHereStructuredData from "@/components/GettingHereStructuredData";
import TableOfContents from "@/components/TableOfContents";
import type { Heading } from "@/lib/headings";

export const metadata: Metadata = {
  title:
    "Getting Here — JB Border Crossing, RTS Link & Transport | Pelangi Capsule Hostel",
  description:
    "How to reach Pelangi Capsule Hostel in Johor Bahru from Singapore. RTS Link, MyNIISe QR immigration, CIQ bus & Grab, Senai Airport, and DuitNow-PayNow cross-border payment guide.",
  keywords: [
    "hostel near CIQ johor bahru",
    "JB RTS Link accommodation",
    "singapore to johor bahru hostel",
    "MyNIISe QR immigration JB",
    "johor bahru border crossing guide",
    "DuitNow PayNow cross border payment",
    "hostel near JB Sentral",
  ],
  alternates: {
    canonical: "https://pelangicapsulehostel.com/getting-here",
  },
  openGraph: {
    title: "Getting Here — JB Border Crossing & RTS Link | Pelangi Capsule Hostel",
    description:
      "Complete guide to reaching Pelangi Capsule Hostel from Singapore — CIQ, RTS Link, MyNIISe QR, and transport options.",
    type: "website",
    url: "https://pelangicapsulehostel.com/getting-here",
  },
};

const headings: Heading[] = [
  { id: "border-crossing", text: "Crossing the Border from Singapore", level: 2 },
  { id: "rts-link", text: "RTS Link — The Game Changer", level: 2 },
  { id: "myniise-qr", text: "MyNIISe QR Immigration", level: 2 },
  { id: "transport-options", text: "Transport to Pelangi Hostel", level: 2 },
  { id: "duitnow-paynow", text: "DuitNow–PayNow Cross-Border Payments", level: 2 },
  { id: "quick-reference", text: "Quick Reference", level: 2 },
];

function SectionIcon({ type }: { type: string }) {
  switch (type) {
    case "border":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
      );
    case "train":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
        </svg>
      );
    case "qr":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      );
    case "car":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v4m-4-4h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2zm-3 4h2m8 0h2" />
        </svg>
      );
    case "payment":
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function GettingHerePage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <GettingHereStructuredData />
      <Header />

      <div className="pt-28 pb-16 container-custom">
        {/* Hero */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="section-label">Getting Here</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-100">
            Singapore to Johor Bahru
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Everything Singaporean travellers need to know about crossing the
            border, the upcoming RTS Link, MyNIISe QR immigration, and getting
            to Pelangi Capsule Hostel.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_256px] lg:gap-12 max-w-5xl mx-auto">
          <div className="min-w-0">
            {/* Mobile ToC */}
            <div className="mb-12">
              <TableOfContents headings={headings} />
            </div>

            {/* Section 1: Border Crossing */}
            <section id="border-crossing" className="mb-16">
              <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                  <SectionIcon type="border" />
                </span>
                Crossing the Border from Singapore
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mb-8">
                Two land crossings connect Singapore and Johor Bahru
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
                    Causeway (Woodlands)
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-4">
                    Most popular — 24 hours
                  </p>
                  <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    <li><strong>Bus CW1:</strong> JB Sentral &harr; Kranji MRT — RM 2.50 / SGD 1</li>
                    <li><strong>Bus 170:</strong> Larkin &rarr; Queen St, Singapore</li>
                    <li><strong>Grab/Taxi:</strong> RM 40–60 one-way to SG city</li>
                    <li><strong>Peak hours:</strong> 7–9 AM and 5–8 PM weekdays</li>
                    <li><strong>Weekend peak:</strong> Fri evening &amp; Sun evening</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6">
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-1">
                    Second Link (Tuas)
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-4">
                    Less crowded, faster clearance
                  </p>
                  <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                    <li><strong>Bus CW2:</strong> JB Sentral &rarr; Tuas — RM 3.50</li>
                    <li><strong>Best for:</strong> Private car or during Causeway jams</li>
                    <li><strong>Nearest MRT:</strong> Tuas Link (East-West line)</li>
                    <li><strong>Grab:</strong> ~30% cheaper than Causeway route at peak</li>
                    <li><strong>Travel time:</strong> 20–40 min depending on traffic</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                <strong>Immigration tip:</strong> Have your passport ready
                before reaching the counter. Malaysia exit and Singapore entry
                are separate checkpoints — stay on the bus between them. Off-peak,
                the whole crossing takes 30–45 minutes.
              </div>
            </section>

            {/* Section 2: RTS Link */}
            <section id="rts-link" className="mb-16">
              <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400">
                  <SectionIcon type="train" />
                </span>
                RTS Link — The Game Changer
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mb-8">
                Expected to begin passenger operations by end 2026
              </p>

              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs p-8 mb-6">
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Journey Time", value: "~5 min", detail: "Bukit Chagar to Woodlands North" },
                    { label: "Capacity", value: "10,000/hr", detail: "Per direction at peak" },
                    { label: "JB Station", value: "Bukit Chagar", detail: "Near JB Sentral & CIQ" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-display font-medium text-green-600 dark:text-green-400 mb-1">
                        {stat.value}
                      </p>
                      <p className="font-medium text-stone-900 dark:text-stone-100 text-sm">{stat.label}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{stat.detail}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                  What this means for travellers
                </h3>
                <ul className="space-y-3 text-stone-700 dark:text-stone-300">
                  {[
                    "No more Causeway traffic jams — the RTS Link runs on a dedicated rail bridge separate from road traffic",
                    "Immigration clearance at each station before boarding — no stopping mid-journey",
                    "Connects to Singapore's Thomson-East Coast Line at Woodlands North MRT",
                    "Bukit Chagar station is ~15 min by Grab from Pelangi Capsule Hostel",
                    "Expected fare around RM 5–10 (final pricing TBC by both governments)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                <strong>Note:</strong> The RTS Link is currently under
                construction and expected to begin passenger operations by
                end 2026. We&apos;ll update this page with ticketing details and
                final schedules once officially announced.
              </div>
            </section>

            {/* Section 3: MyNIISe QR */}
            <section id="myniise-qr" className="mb-16">
              <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                  <SectionIcon type="qr" />
                </span>
                MyNIISe QR Immigration
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mb-8">
                Faster border clearance with Malaysia&apos;s digital immigration system
              </p>

              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs p-8 mb-6">
                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-6">
                  How to set up MyNIISe QR (step-by-step)
                </h3>
                <ol className="space-y-4">
                  {[
                    {
                      step: "Download the MyNIISe app",
                      detail: "Available on iOS App Store and Google Play Store. Search for \"MyNIISe\" by the Immigration Department of Malaysia.",
                    },
                    {
                      step: "Register your account",
                      detail: "Create an account using your passport number, nationality, and a valid email address. Malaysian citizens can use MyKad.",
                    },
                    {
                      step: "Complete your traveller profile",
                      detail: "Enter your passport details, upload a passport photo, and fill in the Malaysia Digital Arrival Card (MDAC) information.",
                    },
                    {
                      step: "Generate your QR code",
                      detail: "Before travelling, open the app and generate your entry/exit QR code. This replaces the paper arrival card.",
                    },
                    {
                      step: "Scan at the border",
                      detail: "At JB CIQ, use the dedicated MyNIISe QR lanes (marked with signs). Scan your QR code at the e-gate — no more queuing at manual counters.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{item.step}</p>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-5 py-4">
                  <h4 className="font-bold text-sm text-green-800 dark:text-green-300 mb-2">
                    Benefits
                  </h4>
                  <ul className="space-y-1.5 text-sm text-stone-700 dark:text-stone-300">
                    <li>&#10003; Skip the manual counter queue</li>
                    <li>&#10003; No paper arrival card to fill</li>
                    <li>&#10003; Works for all nationalities</li>
                    <li>&#10003; Free to use</li>
                  </ul>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4">
                  <h4 className="font-bold text-sm text-amber-800 dark:text-amber-300 mb-2">
                    Good to know
                  </h4>
                  <ul className="space-y-1.5 text-sm text-stone-700 dark:text-stone-300">
                    <li>&#8226; Set up before you travel (needs internet)</li>
                    <li>&#8226; Keep your passport handy — still required</li>
                    <li>&#8226; QR lanes may have shorter wait times</li>
                    <li>&#8226; App works offline once QR is generated</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Transport Options */}
            <section id="transport-options" className="mb-16">
              <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400">
                  <SectionIcon type="car" />
                </span>
                Transport to Pelangi Hostel
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mb-8">
                From any JB entry point to our doorstep
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    from: "CIQ / JB Sentral",
                    time: "~15 min",
                    color: "border-l-amber-400",
                    options: [
                      { method: "Grab", detail: "RM 10–15 — fastest and most convenient" },
                      { method: "Taxi", detail: "RM 12–18 — insist on the meter" },
                      { method: "Bus P101", detail: "RM 1.20 — alight at Pelangi Leisure Mall, then 2 min walk" },
                    ],
                  },
                  {
                    from: "RTS Link (Bukit Chagar)",
                    time: "~15 min",
                    color: "border-l-green-400",
                    options: [
                      { method: "Grab", detail: "RM 10–15 — pickup from station exit" },
                      { method: "Bus", detail: "Routes TBC once station opens" },
                      { method: "Walk + Bus", detail: "Short walk to JB Sentral, then P101 bus" },
                    ],
                  },
                  {
                    from: "Larkin Bus Terminal",
                    time: "~15 min",
                    color: "border-l-blue-400",
                    options: [
                      { method: "Grab", detail: "RM 10–15 — from pickup area" },
                      { method: "Bus P101", detail: "RM 1.20 — towards JB Sentral, alight at Pelangi Leisure Mall" },
                    ],
                  },
                  {
                    from: "Senai Airport (JHB)",
                    time: "~35 min",
                    color: "border-l-purple-400",
                    options: [
                      { method: "Grab", detail: "RM 45–60 — direct from arrivals hall" },
                      { method: "Airport Taxi", detail: "RM 50–70 — fixed rate counters at arrivals" },
                      { method: "Shuttle + Grab", detail: "Shuttle to JB Sentral, then Grab to hostel" },
                    ],
                  },
                ].map((route) => (
                  <div
                    key={route.from}
                    className={`bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs p-6 border-l-4 ${route.color}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
                        {route.from}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {route.time}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {route.options.map((opt) => (
                        <li key={opt.method} className="text-sm text-stone-700 dark:text-stone-300">
                          <strong className="text-stone-900 dark:text-stone-100">{opt.method}:</strong>{" "}
                          {opt.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: DuitNow-PayNow */}
            <section id="duitnow-paynow" className="mb-16">
              <h2 className="font-display text-3xl font-medium mb-2 text-stone-900 dark:text-stone-100 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0 text-rose-600 dark:text-rose-400">
                  <SectionIcon type="payment" />
                </span>
                DuitNow&ndash;PayNow Cross-Border Payments
              </h2>
              <p className="text-stone-500 dark:text-stone-400 mb-8">
                Pay in Malaysia directly from your Singapore bank account
              </p>

              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs p-8 mb-6">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                      How it works
                    </h3>
                    <ul className="space-y-3 text-sm text-stone-700 dark:text-stone-300">
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5 shrink-0">1.</span>
                        <span>Open your Singapore banking app (DBS PayLah!, OCBC, UOB, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5 shrink-0">2.</span>
                        <span>Scan the Malaysian merchant&apos;s DuitNow QR code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5 shrink-0">3.</span>
                        <span>Amount converts automatically at bank rate (SGD &rarr; MYR)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5 shrink-0">4.</span>
                        <span>Payment is instant — no cash or money changer needed</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
                      Where you can use it
                    </h3>
                    <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                      <li>&#10003; Most restaurants and cafes displaying DuitNow QR</li>
                      <li>&#10003; Convenience stores (7-Eleven, KK Mart)</li>
                      <li>&#10003; Shopping malls and retail shops</li>
                      <li>&#10003; Some Grab rides and food delivery</li>
                      <li>&#10003; <strong>Pelangi Capsule Hostel</strong> — we accept DuitNow QR</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                <strong>Singaporean guests:</strong> DuitNow–PayNow QR
                interoperability means you can pay at most Malaysian shops
                without exchanging cash. The exchange rate is your bank&apos;s
                live rate — usually better than airport money changers.
              </div>
            </section>

            {/* Section 6: Quick Reference */}
            <section id="quick-reference" className="mb-16">
              <h2 className="font-display text-3xl font-medium mb-6 text-stone-900 dark:text-stone-100">
                Quick Reference
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "From Singapore", value: "30 min", detail: "via CIQ Causeway" },
                  { label: "RTS Link", value: "~5 min", detail: "Bukit Chagar to Woodlands North" },
                  { label: "From Airport", value: "35 min", detail: "Senai (JHB) by Grab" },
                  { label: "Walk to Mall", value: "2 min", detail: "Pelangi Leisure Mall" },
                ].map((fact) => (
                  <div key={fact.label} className="text-center p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                    <p className="text-3xl font-display font-medium text-amber-600 dark:text-amber-400 mb-1">
                      {fact.value}
                    </p>
                    <p className="font-medium text-stone-900 dark:text-stone-100 text-sm">{fact.label}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{fact.detail}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                  <thead className="bg-stone-100 dark:bg-stone-800">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">From</th>
                      <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">Method</th>
                      <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">Cost</th>
                      <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-stone-900 divide-y divide-stone-100 dark:divide-stone-700">
                    {[
                      ["Singapore (Causeway)", "Bus CW1 + Grab", "RM 2.50 + RM 12", "45–75 min"],
                      ["Singapore (Causeway)", "Direct Grab", "RM 40–60", "30–60 min"],
                      ["RTS Link (future)", "RTS + Grab", "~RM 15–20", "~20 min"],
                      ["JB Sentral / CIQ", "Grab", "RM 10–15", "15 min"],
                      ["Larkin Terminal", "Bus P101", "RM 1.20", "20 min"],
                      ["Senai Airport", "Grab", "RM 45–60", "35 min"],
                    ].map(([from, method, cost, time], i) => (
                      <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800/50">
                        <td className="px-4 py-3 text-stone-700 dark:text-stone-300">{from}</td>
                        <td className="px-4 py-3 text-stone-700 dark:text-stone-300">{method}</td>
                        <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-100">{cost}</td>
                        <td className="px-4 py-3 text-stone-500 dark:text-stone-400">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-10">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                Ready to visit Johor Bahru?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6">
                Pelangi Capsule Hostel is in the heart of Taman Pelangi —
                15 minutes from CIQ by Grab, from RM 35/night.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/book"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Book Direct &amp; Save
                </Link>
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-700 hover:text-white transition-colors font-medium"
                >
                  Read Our JB Guide &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop ToC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
