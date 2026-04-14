import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lastUpdated = "14 April 2026";

export const metadata: Metadata = {
  title: "Safety Guidelines & Content Policy | Pelangi Capsule Hostel",
  description:
    "Community guidelines for Pelangi Capsule Hostel. Learn what content is prohibited, how to report harmful content, and how we enforce safety standards in compliance with the Malaysia Online Safety Act 2025.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/safety-guidelines",
  },
};

export default function SafetyGuidelinesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Safety Guidelines & Content Policy",
    description: metadata.description,
    url: "https://pelangicapsulehostel.com/safety-guidelines",
    datePublished: "2026-04-14",
    dateModified: "2026-04-14",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Pelangi Capsule Hostel",
      url: "https://pelangicapsulehostel.com",
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="pt-28 pb-16 container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-10">
              <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Safety Guidelines & Content Policy
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                Last updated: {lastUpdated}
              </p>
              <p className="text-stone-500 dark:text-stone-400 text-xs mt-2">
                Published in compliance with the Malaysia Online Safety Act 2025
                (Act 866).
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Our Commitment to Safe Community
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Pelangi Capsule Hostel is committed to providing a safe, respectful,
                  and inclusive community for all guests. This page outlines the content
                  standards we enforce and the process for reporting harmful content
                  published on our website in compliance with the Malaysia Online Safety
                  Act 2025.
                </p>
              </section>

              {/* Scope of UGC */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  User-Generated Content on Our Website
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  Pelangi Capsule Hostel publishes guest reviews and testimonials on
                  our website to provide transparency and authentic feedback from past
                  guests. These reviews represent the genuine opinions of our visitors
                  and contribute to an informed community.
                </p>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  We also reference reviews hosted on third-party platforms (Google
                  Reviews, Booking.com, Hostelworld, Airpaz) via hyperlinks or
                  display their ratings. As these platforms host their own content,
                  users should report concerns about content on those platforms directly
                  to the platform operators.
                </p>
              </section>

              {/* Prohibited Content */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  What Constitutes Harmful Content
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  The following types of content are prohibited and subject to removal:
                </p>
                <ul className="list-disc list-inside space-y-3 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Hate speech or discrimination:</strong> Content that
                    attacks individuals or groups based on protected characteristics
                    (race, ethnicity, religion, gender, sexual orientation, disability).
                  </li>
                  <li>
                    <strong>Violence or threats:</strong> Content that promotes,
                    glorifies, or threatens violence against any person.
                  </li>
                  <li>
                    <strong>Harassment or bullying:</strong> Content intended to
                    intimidate, harass, or defame an individual or group.
                  </li>
                  <li>
                    <strong>Illegal activity:</strong> Content that describes, promotes,
                    or facilitates illegal acts.
                  </li>
                  <li>
                    <strong>Misinformation:</strong> Deliberately false information
                    posted with intent to deceive or cause harm.
                  </li>
                  <li>
                    <strong>Sexual or explicit content:</strong> Pornographic or
                    sexually explicit material.
                  </li>
                  <li>
                    <strong>Spam or manipulation:</strong> Repetitive, misleading, or
                    artificially generated content designed to manipulate ratings.
                  </li>
                  <li>
                    <strong>Personal information:</strong> Publication of private
                    contact details, identity documents, or other confidential data.
                  </li>
                </ul>
              </section>

              {/* How to Report */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  How to Report Harmful Content
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  If you encounter content on our website that you believe violates
                  these guidelines, we welcome your report. Here's how to file a report:
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 not-prose">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                    Report a Review or Guest Testimonial
                  </h3>
                  <p className="text-stone-700 dark:text-stone-300 text-sm mb-4">
                    Each review on our website has a "Report" button. Click it to
                    submit a report with details about why you believe the content
                    violates our guidelines.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm mb-4">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:safety@pelangicapsulehostel.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      safety@pelangicapsulehostel.com
                    </a>
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm">
                    <strong>Phone:</strong> +60 7-2245 6661
                  </p>
                </div>

                <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm">
                  When reporting, please include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300 text-sm">
                  <li>A description of the content and why it violates our guidelines</li>
                  <li>The author or guest name associated with the content</li>
                  <li>The specific date or timeframe of the content (if known)</li>
                  <li>Any additional context or evidence (screenshots, links)</li>
                </ul>
              </section>

              {/* Our Response Process */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Our Response Process
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  We take all safety reports seriously. Here's what to expect:
                </p>
                <ol className="list-decimal list-inside space-y-3 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Acknowledgment:</strong> You will receive an acknowledgment
                    of your report within 48 hours.
                  </li>
                  <li>
                    <strong>Investigation:</strong> Our team will review the reported
                    content and assess it against these guidelines.
                  </li>
                  <li>
                    <strong>Decision:</strong> We will determine whether the content
                    violates our guidelines and communicate our decision to you.
                  </li>
                  <li>
                    <strong>Action:</strong> If the content is determined to be in
                    violation, we will remove or edit it as appropriate.
                  </li>
                  <li>
                    <strong>Feedback:</strong> We may provide information about the
                    outcome and any actions taken (subject to privacy considerations).
                  </li>
                </ol>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mt-4">
                  This process typically takes 5-10 business days. Urgent matters
                  involving immediate danger may be prioritized and escalated to
                  relevant authorities.
                </p>
              </section>

              {/* Legal Compliance */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Malaysia Online Safety Act 2025 Compliance
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  Pelangi Capsule Hostel complies with the Malaysia Online Safety Act
                  2025 (Act 866), which came into effect on 1 January 2026. Key
                  requirements under the Act include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Providing users with tools to report harmful content (Report buttons
                    and dedicated email contact)
                  </li>
                  <li>Publishing clear guidelines on prohibited content</li>
                  <li>Establishing a process for reviewing and responding to reports</li>
                  <li>
                    Maintaining a system to handle complaints related to online safety
                  </li>
                </ul>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mt-4">
                  For the full text of the Act and more information, visit the
                  Malaysian Communications and Multimedia Commission (MCMC) website at{" "}
                  <a
                    href="https://www.mcmc.gov.my"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.mcmc.gov.my
                  </a>
                  .
                </p>
              </section>

              {/* Limitations */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Limitations & Disclaimer
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  While we strive to maintain a safe community, we cannot guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Immediate removal of reported content (we aim for 5-10 business days)
                  </li>
                  <li>
                    Reviews on third-party platforms (we link to but do not control them)
                  </li>
                  <li>
                    That all harmful content will be detected automatically (we rely on
                    user reports and manual review)
                  </li>
                </ul>
              </section>

              {/* Contact Us */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Contact Us
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  For safety-related inquiries or to report harmful content:
                </p>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300">
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:safety@pelangicapsulehostel.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      safety@pelangicapsulehostel.com
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong> +60 7-2245 6661
                  </p>
                  <p className="mb-2">
                    <strong>Address:</strong> 26A Jalan Perang, Taman Pelangi, 80400
                    Johor Bahru, Johor, Malaysia
                  </p>
                  <p>
                    <strong>Hours:</strong> Mon–Sun, 9:00 AM – 6:00 PM (Malaysia Time)
                  </p>
                </div>
              </section>

              {/* Footer Links */}
              <section className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700">
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Related: <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link> · <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms & Conditions</Link>
                </p>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
