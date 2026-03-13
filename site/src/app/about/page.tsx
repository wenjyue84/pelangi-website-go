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

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />
      <div className="pt-20"> {/* Add padding for fixed header */}
        <About />
      </div>
      <Footer />
    </main>
  );
}
