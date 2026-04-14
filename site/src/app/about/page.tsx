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
};

const teamSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://pelangicapsulehostel.com/about#jay-lew",
      name: "Jay Lew",
      jobTitle: "Co-Founder & Hostel Owner",
      description:
        "Built Pelangi Capsule Hostel in 2023 after years of backpacking across Japan and Southeast Asia. Designed the self-check-in system and capsule layout.",
      telephone: "+60127088789",
      worksFor: {
        "@type": "Organization",
        name: "Pelangi Capsule Hostel",
        url: "https://pelangicapsulehostel.com",
      },
      url: "https://pelangicapsulehostel.com/about",
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

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <Header />
      <div className="pt-20"> {/* Add padding for fixed header */}
        <About />
      </div>
      <Footer />
    </main>
  );
}
