import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Privacy Policy | Pelangi Capsule Hostel",
  description:
    "Learn how Pelangi Capsule Hostel collects, uses, and protects your personal data in accordance with Malaysia's Personal Data Protection Act 2010 (PDPA).",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "13 March 2026";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        <div className="pt-28 pb-16 container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-10">
              <h1 className="font-display text-4xl font-semibold text-stone-900 mb-3">
                Privacy Policy
              </h1>
              <p className="text-stone-500 text-sm">Last updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="prose prose-stone prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-stone-700 leading-relaxed">
                  Pelangi Capsule Hostel (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to
                  protecting your personal data in accordance with Malaysia&rsquo;s{" "}
                  <strong>Personal Data Protection Act 2010 (PDPA)</strong>, specifically Section 7
                  which requires us to provide you with this privacy notice. This policy explains what
                  personal data we collect, how we use it, and your rights as a data subject.
                </p>
              </section>

              {/* Data Controller */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  1. Data Controller
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  The data controller responsible for your personal data is:
                </p>
                <div className="bg-stone-100 rounded-lg p-5 mt-3 text-stone-700">
                  <p className="font-medium">Pelangi Capsule Hostel</p>
                  <p>26A Jalan Perang, Taman Pelangi</p>
                  <p>80400 Johor Bahru, Johor, Malaysia</p>
                  <p className="mt-2">Email: pelangicapsule@gmail.com</p>
                  <p>Phone: +60 12-708 8789</p>
                </div>
                <p className="text-stone-700 leading-relaxed mt-3">
                  We process personal data as a registered business under Malaysian law.
                </p>
              </section>

              {/* Data Collected */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  2. Personal Data We Collect
                </h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  We collect the following categories of personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700">
                  <li>
                    <strong>Identity data:</strong> Name, nationality, passport or IC number
                    (collected at check-in as required by Malaysian hospitality regulations)
                  </li>
                  <li>
                    <strong>Contact data:</strong> Email address, phone number
                  </li>
                  <li>
                    <strong>Booking data:</strong> Check-in/check-out dates, room type, number of
                    guests, booking reference
                  </li>
                  <li>
                    <strong>Payment data:</strong> Transaction reference (we do not store full card
                    details — payments are processed by third-party providers)
                  </li>
                  <li>
                    <strong>Technical data:</strong> IP address, browser type, device identifiers,
                    pages visited, time spent on site (via cookies and analytics)
                  </li>
                  <li>
                    <strong>Communications data:</strong> Messages sent via WhatsApp, email, or our
                    contact form
                  </li>
                  <li>
                    <strong>Marketing data:</strong> Email address and name if you subscribe to our
                    newsletter (only with your explicit consent)
                  </li>
                </ul>
              </section>

              {/* Purpose */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  3. Purpose of Processing
                </h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  We process your personal data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700">
                  <li>
                    <strong>Booking fulfilment:</strong> Processing reservations, sending confirmation
                    emails, and managing your stay
                  </li>
                  <li>
                    <strong>Regulatory compliance:</strong> Guest registration as required by Malaysian
                    immigration and hospitality laws
                  </li>
                  <li>
                    <strong>Customer support:</strong> Responding to enquiries, complaints, and
                    feedback
                  </li>
                  <li>
                    <strong>Analytics:</strong> Understanding how visitors use our website to improve
                    content and user experience (only with your cookie consent)
                  </li>
                  <li>
                    <strong>Email marketing:</strong> Sending newsletters, promotions, and travel tips
                    about Johor Bahru (only with your explicit consent — you may withdraw at any time)
                  </li>
                  <li>
                    <strong>Error monitoring:</strong> Detecting and fixing technical errors on our
                    website to ensure reliability
                  </li>
                </ul>
              </section>

              {/* Legal Basis */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  4. Legal Basis for Processing
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700">
                  <li>
                    <strong>Contract:</strong> Processing necessary to fulfil your booking
                  </li>
                  <li>
                    <strong>Legal obligation:</strong> Guest registration required by Malaysian law
                  </li>
                  <li>
                    <strong>Consent:</strong> Analytics cookies and email marketing (you may withdraw
                    consent at any time)
                  </li>
                  <li>
                    <strong>Legitimate interests:</strong> Website security, fraud prevention, and
                    improving our services
                  </li>
                </ul>
              </section>

              {/* Third Parties */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  5. Third-Party Data Processors
                </h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  We use the following third-party services that may process your data on our behalf:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-stone-700 border border-stone-200 rounded-lg">
                    <thead className="bg-stone-100">
                      <tr>
                        <th className="text-left p-3 font-medium">Service</th>
                        <th className="text-left p-3 font-medium">Purpose</th>
                        <th className="text-left p-3 font-medium">Data Shared</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      <tr>
                        <td className="p-3 font-medium">Google Analytics 4</td>
                        <td className="p-3">Website analytics</td>
                        <td className="p-3">IP address, device/browser data, pages visited</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Sentry</td>
                        <td className="p-3">Error monitoring</td>
                        <td className="p-3">IP address, browser data, error context</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Brevo (Sendinblue)</td>
                        <td className="p-3">Email marketing</td>
                        <td className="p-3">Name, email address (newsletter subscribers only)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Booking Platforms</td>
                        <td className="p-3">Reservation processing</td>
                        <td className="p-3">Name, contact details, booking information</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-stone-600 text-sm mt-3">
                  All third-party processors are required to handle your data securely and in
                  compliance with applicable data protection laws.
                </p>
              </section>

              {/* Data Retention */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  6. Data Retention
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700">
                  <li>
                    <strong>Booking records:</strong> 7 years (required for accounting and tax
                    purposes under Malaysian law)
                  </li>
                  <li>
                    <strong>Guest registration forms:</strong> As required by Malaysian hospitality
                    regulations
                  </li>
                  <li>
                    <strong>Marketing data (newsletter):</strong> Until you unsubscribe or withdraw
                    consent
                  </li>
                  <li>
                    <strong>Analytics data:</strong> 14 months (Google Analytics default, adjusted in
                    our GA4 settings)
                  </li>
                  <li>
                    <strong>Cookie consent records:</strong> 12 months
                  </li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  7. Your Rights
                </h2>
                <p className="text-stone-700 leading-relaxed mb-3">
                  Under the PDPA 2010, you have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700">
                  <li>
                    <strong>Right of access:</strong> Request a copy of the personal data we hold
                    about you
                  </li>
                  <li>
                    <strong>Right to correction:</strong> Request correction of inaccurate or
                    incomplete personal data
                  </li>
                  <li>
                    <strong>Right to withdraw consent:</strong> Withdraw consent for marketing or
                    analytics processing at any time without affecting prior processing
                  </li>
                  <li>
                    <strong>Right to limit processing:</strong> Request that we restrict how we use
                    your data in certain circumstances
                  </li>
                </ul>
                <p className="text-stone-700 leading-relaxed mt-3">
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:pelangicapsule@gmail.com"
                    className="text-amber-700 underline hover:text-amber-800"
                  >
                    pelangicapsule@gmail.com
                  </a>
                  . We will respond within 21 days as required by the PDPA.
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  8. Cookies
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  We use essential cookies (required for the website to function) and optional
                  analytics cookies (only with your consent). You can manage your cookie preferences
                  at any time by clearing your browser cookies and revisiting our site to see the
                  consent banner again. For more information about how cookies work, visit{" "}
                  <a
                    href="https://www.allaboutcookies.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 underline hover:text-amber-800"
                  >
                    allaboutcookies.org
                  </a>
                  .
                </p>
              </section>

              {/* International Transfers */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  9. International Data Transfers
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  Some of our third-party processors (Google, Sentry, Brevo) may transfer and store
                  your data outside Malaysia. Where this occurs, we ensure appropriate safeguards are
                  in place, including contractual protections and the processor&rsquo;s compliance
                  with applicable data protection standards.
                </p>
              </section>

              {/* Security */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  10. Data Security
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  We implement appropriate technical and organisational measures to protect your
                  personal data against unauthorised access, disclosure, alteration, or destruction.
                  Our website uses HTTPS encryption for all data in transit. However, no internet
                  transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Changes */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  11. Changes to This Policy
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  We may update this privacy policy from time to time to reflect changes in our
                  practices or applicable law. The &ldquo;Last updated&rdquo; date at the top of this
                  page indicates when the policy was last revised. Continued use of our website after
                  changes constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 mb-4">
                  12. Contact Us
                </h2>
                <p className="text-stone-700 leading-relaxed">
                  If you have questions, concerns, or complaints about this privacy policy or how we
                  handle your personal data, please contact our Data Protection contact:
                </p>
                <div className="bg-stone-100 rounded-lg p-5 mt-3 text-stone-700">
                  <p className="font-medium">Data Protection Contact</p>
                  <p>Pelangi Capsule Hostel</p>
                  <p>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a
                      href="mailto:pelangicapsule@gmail.com"
                      className="text-amber-700 underline hover:text-amber-800"
                    >
                      pelangicapsule@gmail.com
                    </a>
                  </p>
                  <p>Phone: +60 12-708 8789</p>
                </div>
                <p className="text-stone-700 leading-relaxed mt-3">
                  You also have the right to lodge a complaint with Malaysia&rsquo;s{" "}
                  <strong>Department of Personal Data Protection (JPDP)</strong> at{" "}
                  <a
                    href="https://www.pdp.gov.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 underline hover:text-amber-800"
                  >
                    www.pdp.gov.my
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
