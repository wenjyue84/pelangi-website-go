import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visa Run Singapore to JB | Pelangi Capsule Hostel",
  description: "Complete guide to visa runs from Singapore to Johor Bahru. Learn the process, costs, requirements, and FAQs. Perfect for expats and travelers.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/visa-run",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Run Singapore to JB | Pelangi Capsule Hostel",
    description: "Complete guide to visa runs from Singapore to Johor Bahru. Learn the process, costs, requirements, and FAQs. Perfect for expats and travelers.",
    images: ["/images/og-image.png"],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a visa run and why do people do them from Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A visa run is a trip outside your home country to reset your visa status or obtain a new visa. Expats in Singapore frequently visit Johor Bahru for quick visa runs to extend social visit passes or renew tourist visas.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical Singapore to JB visa run take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard visa run typically takes 1-3 days. You can cross into Malaysia, stay overnight, and return the next day. The actual border crossing usually takes 30-60 minutes depending on traffic.",
      },
    },
    {
      "@type": "Question",
      name: "What documents do I need for a Singapore-JB visa run?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll need your passport, proof of funds (usually SGD 1,000-1,500), and a return ticket or proof of onward travel. Some visitors may need a visa for Malaysia depending on their nationality.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a visa run to Johor Bahru cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Costs vary: causeway toll (RM10-15), accommodation (RM50-150), meals (RM30-50), and immigration fees (if applicable). Budget SGD 80-200 total for a basic 2-day trip.",
      },
    },
    {
      "@type": "Question",
      name: "Is Pelangi Capsule Hostel a good base for a Singapore visa run?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We're just 5 minutes from the Johor Bahru city center and 15 minutes from the Causeway. Affordable beds (RM50-80/night), WiFi, and a central location make us ideal for visa run stopovers.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Do a Singapore to JB Visa Run",
  step: [
    {
      "@type": "HowToStep",
      position: "1",
      name: "Prepare your documents",
      text: "Gather your passport, proof of funds (SGD 1,000-1,500), and return ticket. Check Malaysia's entry requirements for your nationality.",
    },
    {
      "@type": "HowToStep",
      position: "2",
      name: "Travel to Johor Bahru",
      text: "Take a bus, taxi, or drive across the Causeway. The journey from Singapore city takes 45-90 minutes. Have your passport ready for Malaysian immigration.",
    },
    {
      "@type": "HowToStep",
      position: "3",
      name: "Check into accommodation",
      text: "Book a hostel or hotel in JB city center. Pelangi Capsule Hostel offers affordable beds and is walking distance to restaurants and shops.",
    },
    {
      "@type": "HowToStep",
      position: "4",
      name: "Spend time in Malaysia",
      text: "Explore local attractions, eat at hawker stalls, and enjoy JB's shopping and nightlife. Typically spend 1-2 days in Malaysia.",
    },
    {
      "@type": "HowToStep",
      position: "5",
      name: "Return to Singapore",
      text: "Head back to the Causeway with your passport. Pass through Malaysian immigration (exit) then Singapore immigration (entry). Your new entry will reset your visa status.",
    },
  ],
};

export default function VisaRunPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="pt-20">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Visa Run: Singapore to Johor Bahru</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 mb-8">
            Your complete guide to visa runs from Singapore, with Pelangi Capsule Hostel as your perfect base.
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div className="bg-white dark:bg-stone-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Why Choose JB for Your Visa Run?</h2>
              <ul className="space-y-2 text-stone-700 dark:text-stone-300">
                <li>✓ Only 45-90 minutes from Singapore</li>
                <li>✓ Affordable accommodation and meals</li>
                <li>✓ Quick Malaysia entry/exit process</li>
                <li>✓ Great for exploring Malaysian culture</li>
                <li>✓ Perfect for resetting your visa status</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Budget Estimate</h2>
              <table className="w-full text-stone-700 dark:text-stone-300">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Causeway toll</td>
                    <td className="text-right">RM10-15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Accommodation (1 night)</td>
                    <td className="text-right">RM50-80</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Meals</td>
                    <td className="text-right">RM30-50</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Total (SGD)</td>
                    <td className="text-right font-semibold">SGD 80-200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-6 rounded mb-8">
            <h3 className="text-xl font-semibold mb-2">Ready to book your visa run?</h3>
            <p className="text-stone-700 dark:text-stone-300 mb-4">
              Pelangi Capsule Hostel offers affordable beds, central location, and friendly staff to make your visa run hassle-free.
            </p>
            <Link
              href="/book"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Book Your Stay Now
            </Link>
          </div>

          <section className="bg-white dark:bg-stone-900 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Important Reminders</h2>
            <ul className="space-y-3 text-stone-700 dark:text-stone-300">
              <li>
                <strong>Check visa requirements:</strong> Verify Malaysia&apos;s entry requirements for your nationality before traveling.
              </li>
              <li>
                <strong>Keep funds:</strong> Have at least SGD 1,000-1,500 in accessible funds for immigration checks.
              </li>
              <li>
                <strong>Plan your return:</strong> Ensure your passport has sufficient blank pages and validity (6+ months recommended).
              </li>
              <li>
                <strong>Immigration rules:</strong> Be honest during immigration interviews. Visa runs are legitimate, but don&apos;t abuse the system.
              </li>
            </ul>
          </section>
        </section>
      </div>
      <Footer />
    </main>
  );
}
