import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const effectiveDate = "13 March 2026";
const lastUpdated = "13 March 2026";

export const metadata: Metadata = {
  title: "Terms and Conditions | Pelangi Capsule Hostel",
  description:
    "Read the Terms and Conditions for Pelangi Capsule Hostel — booking policy, cancellation and refund policy, house rules, liability, and governing law under Malaysian law.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/terms",
    languages: {
      en: "https://pelangicapsulehostel.com/terms",
      ms: "https://pelangicapsulehostel.com/ms/terma",
    },
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions",
    description: metadata.description,
    url: "https://pelangicapsulehostel.com/terms",
    datePublished: "2026-03-13",
    dateModified: "2026-03-13",
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
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-medium">
                  English
                </span>
                <Link
                  href="/ms/terma"
                  className="text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                  lang="ms"
                >
                  Versi Bahasa Malaysia &rarr;
                </Link>
              </div>
              <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Terms and Conditions
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                Effective date: {effectiveDate} · Last updated: {lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the
                  Pelangi Capsule Hostel website and all bookings, enquiries, and
                  transactions made through it. By accessing this website or making a
                  booking, you agree to be bound by these Terms. If you do not agree,
                  please do not use this website or our services.
                </p>
              </section>

              {/* 1. Booking Policy */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  1. Booking Policy
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Bookings can be made via WhatsApp, our website enquiry form, or
                    through third-party platforms (Agoda, Booking.com).
                  </li>
                  <li>
                    A booking is confirmed only after you receive a written confirmation
                    from us via WhatsApp or email.
                  </li>
                  <li>
                    All rates are quoted in Malaysian Ringgit (MYR) and are subject to
                    change without prior notice until a booking is confirmed.
                  </li>
                  <li>
                    The{" "}
                    <strong>Malaysia Tourism Tax (TTx) of RM10 per room per night</strong>{" "}
                    applies to all foreign tourists in accordance with the Tourism Tax Act
                    2017. This tax is collected on behalf of the Royal Malaysian Customs
                    Department.
                  </li>
                  <li>
                    We reserve the right to refuse or cancel any booking at our discretion,
                    including in cases of suspected fraud or violation of these Terms.
                  </li>
                </ul>
              </section>

              {/* 2. Check-in & Check-out */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  2. Check-in and Check-out
                </h2>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300 mb-4">
                  <p>
                    <strong>Check-in:</strong> 3:00 PM onwards
                  </p>
                  <p>
                    <strong>Check-out:</strong> By 12:00 PM (noon)
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Early check-in or late check-out is subject to availability and may
                    incur additional charges.
                  </li>
                  <li>
                    All guests must present a valid passport (foreign nationals) or
                    MyKad/IC (Malaysian citizens) at check-in, as required by Malaysian
                    hospitality regulations.
                  </li>
                  <li>
                    Guests under the age of 18 must be accompanied by a parent or legal
                    guardian.
                  </li>
                </ul>
              </section>

              {/* 3. Cancellation & Refund */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  3. Cancellation and Refund Policy
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Free cancellation:</strong> Cancellations made at least{" "}
                    <strong>48 hours before check-in</strong> will receive a full refund
                    (if payment was made in advance).
                  </li>
                  <li>
                    <strong>Late cancellation:</strong> Cancellations made less than 48
                    hours before check-in may be charged the first night&rsquo;s rate.
                  </li>
                  <li>
                    <strong>No-show:</strong> Failure to check in without prior notice will
                    be charged the full booking amount.
                  </li>
                  <li>
                    Refunds, where applicable, will be processed within 7&ndash;14
                    business days via the original payment method.
                  </li>
                  <li>
                    Bookings made through third-party platforms (Agoda, Booking.com) are
                    subject to those platforms&rsquo; cancellation policies.
                  </li>
                </ul>
                <p className="text-stone-600 dark:text-stone-400 text-sm mt-3">
                  This cancellation policy complies with the Malaysian Consumer Protection
                  Act 1999 provisions on fair contract terms.
                </p>
              </section>

              {/* 4. Payment */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  4. Payment
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Payment can be made in cash (MYR), DuitNow QR, or bank transfer upon
                    check-in unless otherwise arranged.
                  </li>
                  <li>
                    For advance bookings, a deposit or full prepayment may be required as
                    communicated during the booking process.
                  </li>
                  <li>
                    All prices displayed on this website are inclusive of applicable taxes
                    unless explicitly stated otherwise (e.g., Tourism Tax shown separately).
                  </li>
                </ul>
              </section>

              {/* 5. Tourism Tax (TTx) */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  5. Tourism Tax (TTx) / Cukai Pelancongan
                </h2>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-5 mb-4">
                  <p className="text-stone-800 dark:text-stone-200 font-medium mb-2">
                    Malaysia Tourism Tax: RM10 per room per night
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Cukai Pelancongan Malaysia: RM10 setiap bilik setiap malam
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    The <strong>Malaysia Tourism Tax (TTx)</strong> is a government-mandated
                    charge under the{" "}
                    <strong>Tourism Tax Act 2017</strong> and the{" "}
                    <strong>
                      MyTTx Public Ruling No. 01/2025
                    </strong>{" "}
                    (effective 1 December 2025), administered by the Royal Malaysian Customs
                    Department (RMCD).
                  </li>
                  <li>
                    TTx is charged at <strong>RM10 per room per night</strong> and applies
                    to all foreign tourists staying at registered accommodation premises in
                    Malaysia. Malaysian citizens and permanent residents are exempt.
                  </li>
                  <li>
                    The Tourism Tax is <strong>displayed as a separate line item</strong> in
                    our booking flow and is not hidden within the room rate. The total cost
                    shown before booking confirmation includes: Room Rate + TTx (RM10/room/night).
                  </li>
                  <li>
                    For bookings made through third-party platforms (Agoda, Booking.com,
                    Hostelworld), the platform&rsquo;s appointed Digital Platform Service
                    Provider (DPSP) collects and remits TTx on the operator&rsquo;s behalf
                    in accordance with RMCD regulations.
                  </li>
                  <li>
                    For direct bookings, Pelangi Capsule Hostel collects TTx directly as a
                    registered taxable person with RMCD, and remits the tax accordingly.
                  </li>
                  <li>
                    For official information, refer to the{" "}
                    <a
                      href="https://www.myttx.customs.gov.my/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      MyTTx Portal (myttx.customs.gov.my)
                    </a>
                    , the official tax authority for Malaysia Tourism Tax.
                  </li>
                </ul>

                {/* Bahasa Malaysia version */}
                <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700">
                  <p className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                    Bahasa Malaysia
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-stone-600 dark:text-stone-400 text-sm">
                    <li>
                      <strong>Cukai Pelancongan Malaysia (TTx)</strong> adalah caj yang
                      diwajibkan oleh kerajaan di bawah{" "}
                      <strong>Akta Cukai Pelancongan 2017</strong> dan{" "}
                      <strong>Ketetapan Umum MyTTx No. 01/2025</strong>{" "}
                      (berkuat kuasa 1 Disember 2025), ditadbir oleh Jabatan Kastam
                      Diraja Malaysia (JKDM).
                    </li>
                    <li>
                      Cukai ini dikenakan pada kadar{" "}
                      <strong>RM10 setiap bilik setiap malam</strong> dan terpakai
                      kepada semua pelancong asing yang menginap di premis penginapan
                      berdaftar di Malaysia. Warganegara Malaysia dan penduduk tetap
                      dikecualikan.
                    </li>
                    <li>
                      Cukai Pelancongan dipaparkan sebagai{" "}
                      <strong>item berasingan</strong> dalam aliran tempahan kami dan
                      tidak tersembunyi dalam kadar bilik.
                    </li>
                    <li>
                      Untuk maklumat rasmi, sila rujuk{" "}
                      <a
                        href="https://www.myttx.customs.gov.my/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                      >
                        Portal MyTTx (myttx.customs.gov.my)
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. House Rules */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  6. House Rules
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  All guests must observe the following rules during their stay:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Quiet hours:</strong> 10:00 PM to 8:00 AM — please keep noise
                    to a minimum in capsule and common areas.
                  </li>
                  <li>
                    <strong>No smoking:</strong> Smoking is strictly prohibited inside all
                    hostel premises. Designated smoking areas are available outside.
                  </li>
                  <li>
                    <strong>No illegal substances:</strong> Possession or use of illegal
                    drugs is prohibited and will result in immediate eviction and a report
                    to authorities.
                  </li>
                  <li>
                    <strong>No cooking:</strong> Cooking is not permitted in the hostel.
                    Microwave and kettle facilities are available in the common area.
                  </li>
                  <li>
                    <strong>Personal belongings:</strong> Use the lockers provided. The
                    hostel is not liable for loss, theft, or damage to personal property.
                  </li>
                  <li>
                    <strong>Respect other guests:</strong> Any behaviour that disturbs other
                    guests, including harassment, excessive noise, or damage to property,
                    may result in immediate eviction without refund.
                  </li>
                  <li>
                    <strong>Damage to property:</strong> Guests will be held responsible for
                    any damage caused to hostel property and may be charged for repairs or
                    replacement.
                  </li>
                </ul>
              </section>

              {/* 7. Liability */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  7. Liability
                </h2>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Pelangi Capsule Hostel shall not be held liable for any loss, damage,
                    injury, or death arising from your stay, except where caused by our
                    gross negligence.
                  </li>
                  <li>
                    The hostel is not responsible for the loss or theft of personal
                    belongings, including valuables left in capsules or common areas.
                  </li>
                  <li>
                    We are not liable for service interruptions caused by events beyond our
                    reasonable control, including natural disasters, power outages, or
                    government actions (force majeure).
                  </li>
                  <li>
                    The information on this website is provided &ldquo;as is&rdquo; without
                    warranties of any kind. While we strive for accuracy, we do not
                    guarantee that all information is complete, current, or error-free.
                  </li>
                </ul>
              </section>

              {/* 8. Privacy */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  8. Privacy and Data Protection
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  We collect and process personal data in accordance with Malaysia&rsquo;s
                  Personal Data Protection Act 2010 (PDPA) and the 2024 Amendment Act. For
                  full details on how we handle your data, please see our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </section>

              {/* 9. Intellectual Property */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  9. Intellectual Property
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  All content on this website — including text, images, logos, and design —
                  is the property of Pelangi Capsule Hostel and is protected under
                  Malaysian intellectual property laws. You may not reproduce, distribute,
                  or use any content without our prior written consent.
                </p>
              </section>

              {/* 10. Governing Law */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  10. Governing Law
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of
                  Malaysia. Any disputes arising from these Terms or your use of our
                  services shall be subject to the exclusive jurisdiction of the courts of
                  Johor Bahru, Johor, Malaysia.
                </p>
              </section>

              {/* 11. Online Safety Act Compliance */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  11. Malaysia Online Safety Act 2025 – User-Generated Content & Safety
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  Pelangi Capsule Hostel complies with the Malaysia Online Safety Act 2025
                  (Act 866), which came into effect on 1 January 2026. This section clarifies
                  our approach to user-generated content (UGC) and safety reporting.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 mb-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3">
                    User-Generated Content on Our Website
                  </h3>
                  <p className="text-stone-700 dark:text-stone-300 text-sm mb-3">
                    Pelangi Capsule Hostel publishes guest reviews and testimonials on our
                    website. These reviews represent the genuine feedback of past guests and
                    contribute to an informed community.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm">
                    We also display ratings from third-party platforms (Google Reviews,
                    Booking.com, Hostelworld, Airpaz) via hyperlinks or embedded content. As
                    these platforms host their own content, users should report concerns
                    directly to the platform operators.
                  </p>
                </div>

                <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">
                  Safety Reporting & Content Moderation
                </h3>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300 mb-4">
                  <li>
                    Each guest review on our website includes a <strong>&quot;Report&quot;</strong> button to
                    submit safety concerns.
                  </li>
                  <li>
                    Reports can also be sent directly to our safety team at{" "}
                    <a
                      href="mailto:safety@pelangicapsulehostel.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      safety@pelangicapsulehostel.com
                    </a>
                    .
                  </li>
                  <li>
                    Our full Content Safety Guidelines and community standards are available
                    at our{" "}
                    <a
                      href="/safety-guidelines"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Safety Guidelines page
                    </a>
                    .
                  </li>
                  <li>
                    We review all reports and respond within 5–10 business days in accordance
                    with the Online Safety Act 2025.
                  </li>
                </ul>

                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  For full details on our safety processes, prohibited content, and how to
                  report, please visit our{" "}
                  <a
                    href="/safety-guidelines"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Safety Guidelines & Content Policy
                  </a>
                  .
                </p>
              </section>

              {/* 12. Changes */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  12. Changes to These Terms
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  We reserve the right to update or modify these Terms at any time. Changes
                  will be posted on this page with an updated &ldquo;Last updated&rdquo;
                  date. Continued use of this website after changes constitutes acceptance
                  of the revised Terms.
                </p>
              </section>

              {/* 13. Contact */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  13. Contact Us
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 text-stone-700 dark:text-stone-300">
                  <p className="font-medium">Pelangi Capsule Hostel</p>
                  <p>26A Jalan Perang, Taman Pelangi</p>
                  <p>80400 Johor Bahru, Johor, Malaysia</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a
                      href="mailto:pelangicapsule@gmail.com"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      pelangicapsule@gmail.com
                    </a>
                  </p>
                  <p>
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/60127088789"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      +60 12-708 8789
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
