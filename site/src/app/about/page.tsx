import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pelangi Capsule Hostel | Johor Bahru",
  description: "Learn about Pelangi Capsule Hostel in Johor Bahru — our story, mission, and why we're the perfect base for exploring JB and Singapore.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/about",
  },
  openGraph: {
    title: "About Pelangi Capsule Hostel | Johor Bahru",
    description: "Our story, mission, and why Pelangi Capsule Hostel is the perfect base for exploring Johor Bahru and Singapore.",
    url: "https://pelangicapsulehostel.com/about",
    siteName: "Pelangi Capsule Hostel",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/images/exterior-1.webp",
        width: 1200,
        height: 630,
        alt: "Pelangi Capsule Hostel building exterior in Taman Pelangi, Johor Bahru",
      },
    ],
  },
};

const teamSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pelangicapsulehostel.com/author/jay-lew#person",
      name: "Jay Lew",
      jobTitle: "Co-Founder & Hostel Owner",
      description:
        "Built Pelangi Capsule Hostel in 2023 after years of backpacking across Japan and Southeast Asia. Designed the self-check-in system and capsule layout.",
      telephone: "+60127088789",
      worksFor: {
        "@type": "Organization",
        "@id": "https://pelangicapsulehostel.com/#organization",
        name: "Pelangi Capsule Hostel",
        url: "https://pelangicapsulehostel.com",
      },
      url: "https://pelangicapsulehostel.com/author/jay-lew",
      sameAs: [
        "https://www.facebook.com/pelangicapsulehostel",
        "https://www.instagram.com/pelangicapsulehostel",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://pelangicapsulehostel.com/about#alston",
      name: "Alston",
      jobTitle: "Co-Founder & Operations Manager",
      description:
        "Handles day-to-day operations and guest relations at Pelangi Capsule Hostel. Background in hospitality.",
      telephone: "+60167620815",
      worksFor: {
        "@type": "Organization",
        name: "Pelangi Capsule Hostel",
        url: "https://pelangicapsulehostel.com",
      },
      url: "https://pelangicapsulehostel.com/about",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://pelangicapsulehostel.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://pelangicapsulehostel.com/about",
    },
  ],
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <div className="pt-20"> {/* Add padding for fixed header */}
        <About />
      </div>
      <Footer />
    </main>
  );
}
