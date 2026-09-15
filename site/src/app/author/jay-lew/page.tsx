import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jay Lew — Co-Founder & Author | Pelangi Capsule Hostel",
  description:
    "Jay Lew is the co-founder of Pelangi Capsule Hostel in Johor Bahru and the author of its travel blog. Years of backpacking across Japan and Southeast Asia inform his guides on JB, the Causeway, and budget travel.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/author/jay-lew",
  },
  openGraph: {
    title: "Jay Lew — Co-Founder & Author | Pelangi Capsule Hostel",
    description:
      "Co-founder of Pelangi Capsule Hostel and author of its JB travel blog. Designed the hostel's capsule layout and self-check-in system.",
    url: "https://pelangicapsulehostel.com/author/jay-lew",
    siteName: "Pelangi Capsule Hostel",
    locale: "en_MY",
    type: "profile",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jay Lew, co-founder of Pelangi Capsule Hostel Johor Bahru",
      },
    ],
  },
};

// Canonical Person @id reused by BlogStructuredData (author.url) and the
// Organization founder reference in StructuredData.tsx, so all references
// resolve to a single author entity for E-E-A-T and Knowledge Panel signals.
const authorSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://pelangicapsulehostel.com/author/jay-lew",
      url: "https://pelangicapsulehostel.com/author/jay-lew",
      name: "Jay Lew — Co-Founder & Author",
      isPartOf: { "@id": "https://pelangicapsulehostel.com/#website" },
      about: { "@id": "https://pelangicapsulehostel.com/author/jay-lew#person" },
      mainEntity: { "@id": "https://pelangicapsulehostel.com/author/jay-lew#person" },
    },
    {
      "@type": "Person",
      "@id": "https://pelangicapsulehostel.com/author/jay-lew#person",
      name: "Jay Lew",
      jobTitle: "Co-Founder & Hostel Owner",
      description:
        "Jay Lew built Pelangi Capsule Hostel in 2023 after years of backpacking across Japan and Southeast Asia. He designed the hostel's capsule layout and self-check-in system, and writes its travel blog on Johor Bahru, the Singapore Causeway crossing, and budget travel.",
      url: "https://pelangicapsulehostel.com/author/jay-lew",
      telephone: "+60127088789",
      knowsAbout: [
        "Capsule accommodation",
        "Budget travel in Johor Bahru",
        "Singapore-Malaysia border crossing",
        "Taman Pelangi neighbourhood",
        "Backpacking in Southeast Asia",
      ],
      worksFor: {
        "@type": "Organization",
        "@id": "https://pelangicapsulehostel.com/#organization",
        name: "Pelangi Capsule Hostel",
        url: "https://pelangicapsulehostel.com",
      },
      sameAs: [
        "https://www.facebook.com/pelangicapsulehostel",
        "https://www.instagram.com/pelangicapsulehostel",
      ],
    },
  ],
};

export default function AuthorJayLewPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <Header />

      <div className="pt-28 pb-16 container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb-style back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors mb-8 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
            {/*
              TODO: replace this monogram with a real headshot at
              /images/team/jay-lew.jpg (square, ~400x400) and add it to the
              Person schema `image` field above for stronger E-E-A-T.
            */}
            <div
              aria-hidden="true"
              className="shrink-0 w-28 h-28 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-display text-4xl font-medium shadow-lg"
            >
              JL
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                Jay Lew
              </h1>
              <p className="text-amber-700 dark:text-amber-400 font-medium">
                Co-Founder &amp; Hostel Owner · Pelangi Capsule Hostel
              </p>
            </div>
          </div>

          <div className="prose prose-stone prose-lg max-w-none dark:prose-invert dark:prose-a:text-amber-400 prose-a:text-amber-700">
            <p>
              Jay Lew is the co-founder of{" "}
              <Link href="/about">Pelangi Capsule Hostel</Link> in Taman Pelangi, Johor
              Bahru, and the author of its travel blog. He built the hostel in 2023 after
              years of backpacking across Japan and Southeast Asia, designing every detail
              himself — from the Japanese-style capsule layout to the 24/7 self-check-in
              system — to give travellers the privacy and freedom he always wanted on the
              road.
            </p>
            <p>
              On the blog, Jay writes first-hand guides to Johor Bahru and the
              Singapore–JB corridor: crossing the Causeway, eating well on a backpacker
              budget, day-tripping into Singapore, and getting around by ETS train, bus,
              and Grab. The advice comes from running a hostel on the border and hosting
              thousands of guests who make the crossing every week.
            </p>

            <h2>Areas of expertise</h2>
            <ul>
              <li>Budget and capsule accommodation in Johor Bahru</li>
              <li>Crossing the Singapore–Malaysia border (Causeway and Second Link)</li>
              <li>Backpacker food, transport, and day-trip planning around JB</li>
              <li>The Taman Pelangi neighbourhood and local hawker scene</li>
            </ul>

            <h2>Credentials</h2>
            <ul>
              <li>Co-founder and owner-operator of Pelangi Capsule Hostel since 2023</li>
              <li>Designed the hostel&apos;s capsule pod layout and self-check-in system</li>
              <li>Years of independent backpacking across Japan and Southeast Asia</li>
            </ul>

            <h2>Contact</h2>
            <p>
              WhatsApp <a href="https://wa.me/60127088789">+60 12-708 8789</a> ·{" "}
              <a href="https://www.facebook.com/pelangicapsulehostel">Facebook</a> ·{" "}
              <a href="https://www.instagram.com/pelangicapsulehostel">Instagram</a>
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
            >
              Read Jay&apos;s articles →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
