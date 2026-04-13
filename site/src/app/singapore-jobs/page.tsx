import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/faq/FaqAccordion";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Singapore Jobs for Malaysians | Work Passes & Resources | Pelangi Capsule Hostel",
  description:
    "Guide to Singapore jobs for Malaysians: work pass comparison (EP, S Pass, Work Permit), salary expectations, visa sponsorship FAQ, and affordable interview accommodation in JB.",
  alternates: { canonical: "https://pelangicapsulehostel.com/singapore-jobs" },
};

const faqItems = [
  { question: "What types of work passes are available in Singapore?", answer: "Singapore offers Employment Pass (EP) for professionals earning ≥SGD 5,000/month, S Pass for mid-skilled workers earning ≥SGD 3,150/month, and Work Permit (WP) for semi-skilled workers in construction, manufacturing, marine, and services." },
  { question: "Do I need a degree to work in Singapore?", answer: "EP typically requires a recognised degree. S Pass requires a diploma or technical certificate. Work Permits have no formal education requirement but your employer must meet a foreign worker quota." },
  { question: "What is the average salary for Malaysians in Singapore?", answer: "Salaries vary: SGD 2,000–3,500 for WP holders, SGD 3,150–5,000 for S Pass, and SGD 5,000–15,000+ for EP holders. Overtime and shift allowances are common." },
  { question: "Does my employer sponsor my work pass?", answer: "Yes. All Singapore work passes must be applied for by a registered employer or employment agent. You cannot self-sponsor." },
  { question: "How long does work pass approval take?", answer: "EP applications take 3–8 weeks via the EP eService. S Pass and WP applications usually take 1–3 weeks." },
  { question: "Can I live in JB and commute to Singapore?", answer: "Yes, many Malaysians commute daily via the Causeway or Second Link. During interviews and onboarding, staying in JB near the border is practical and affordable." },
  { question: "Where should I stay during Singapore job interviews?", answer: "Pelangi Capsule Hostel in Taman Pelangi, JB is 15 minutes from the Causeway. Pods from RM35/night with free WiFi — ideal for interview preparation." },
  { question: "Which sectors hire the most Malaysians in Singapore?", answer: "Top sectors: F&B and hospitality, construction, manufacturing, logistics, healthcare, retail, and IT. The services sector has the largest number of Malaysian work permit holders." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const WA_LINK =
  "https://wa.me/60127088789?text=Hi%20Pelangi%2C%20I%27m%20attending%20a%20job%20interview%20in%20Singapore%20and%20need%20accommodation%20in%20JB.%20What%20are%20your%20rates%3F";

export default function SingaporeJobsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-20">
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Singapore Jobs for Malaysians</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 mb-10">
            Job types, work pass comparison, salary info, and resources for Malaysian job seekers heading to Singapore.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Popular Job Sectors</h2>
          <p className="text-stone-700 dark:text-stone-300 mb-8">
            Singapore employs over 300,000 Malaysians across F&amp;B, construction, manufacturing, logistics, healthcare, IT, and retail.
            Proximity via the Causeway makes Johor Bahru the top staging point for job seekers.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Work Pass Comparison</h2>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border border-stone-200 dark:border-stone-700 rounded-lg">
              <thead className="bg-stone-100 dark:bg-stone-800">
                <tr>
                  <th className="p-3 text-left">Pass Type</th>
                  <th className="p-3 text-left">Min Salary</th>
                  <th className="p-3 text-left">Qualification</th>
                  <th className="p-3 text-left">Duration</th>
                </tr>
              </thead>
              <tbody className="text-stone-700 dark:text-stone-300">
                <tr className="border-t border-stone-200 dark:border-stone-700">
                  <td className="p-3 font-medium">Employment Pass (EP)</td>
                  <td className="p-3">SGD 5,000</td>
                  <td className="p-3">Degree</td>
                  <td className="p-3">Up to 2 years</td>
                </tr>
                <tr className="border-t border-stone-200 dark:border-stone-700">
                  <td className="p-3 font-medium">S Pass</td>
                  <td className="p-3">SGD 3,150</td>
                  <td className="p-3">Diploma</td>
                  <td className="p-3">Up to 2 years</td>
                </tr>
                <tr className="border-t border-stone-200 dark:border-stone-700">
                  <td className="p-3 font-medium">Work Permit (WP)</td>
                  <td className="p-3">No minimum</td>
                  <td className="p-3">None required</td>
                  <td className="p-3">Up to 2 years</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 border-l-4 border-amber-500 p-6 rounded mb-10">
            <h3 className="text-xl font-semibold mb-2">🏨 Interview Stay Package</h3>
            <p className="text-stone-700 dark:text-stone-300 mb-3">
              Attending interviews in Singapore? Stay at Pelangi Capsule Hostel in JB — 15 min from the Causeway, from RM35/night.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              WhatsApp Us to Book
            </a>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <FaqAccordion items={faqItems} />

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/gig-jobs-malaysia-waiting-singapore-work-pass" className="text-blue-600 dark:text-blue-400 hover:underline">
                  5 Gig Jobs for Malaysians Waiting for Singapore Work Approval
                </Link>
              </li>
              <li>
                <Link href="/blog/singapore-work-pass-guide-malaysians" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Singapore Work Pass Guide for Malaysians
                </Link>
              </li>
              <li>
                <Link href="/visa-run" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Visa Run: Singapore to Johor Bahru Guide
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
