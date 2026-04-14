import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentStatus from "@/components/PaymentStatus";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Pelangi Capsule Hostel JB",
  description:
    "Your booking deposit has been received. Check your confirmation details and prepare for your stay at Pelangi Capsule Hostel Johor Bahru.",
  robots: { index: false, follow: false },
};

export default function BookingConfirmationPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />

      <section className="pt-28 pb-16 container-custom">
        <div className="max-w-lg mx-auto">
          <PaymentStatus />

          {/* Next Steps */}
          <div className="mt-8 bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-lg border border-stone-100 dark:border-stone-700">
            <h2 className="font-display text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">
              What&apos;s Next?
            </h2>
            <ol className="space-y-4 text-sm text-stone-600 dark:text-stone-400">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold">
                  1
                </span>
                <span>
                  <strong className="text-stone-800 dark:text-stone-200">Check your email</strong> — a payment receipt
                  from Stripe will arrive shortly.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold">
                  2
                </span>
                <span>
                  <strong className="text-stone-800 dark:text-stone-200">WhatsApp confirmation</strong> — we&apos;ll
                  send your booking details via WhatsApp within 30 minutes.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold">
                  3
                </span>
                <span>
                  <strong className="text-stone-800 dark:text-stone-200">Check in from 2:00 PM</strong> — bring your
                  IC/passport. Remaining balance payable at reception.
                </span>
              </li>
            </ol>
          </div>

          {/* CTA links */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
            <Link
              href="/check-in"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-700 text-white
                         py-3 px-6 font-medium hover:bg-amber-800 transition-colors text-sm"
            >
              Check-in Info
            </Link>
            <a
              href="https://wa.me/60127088789?text=Hi%20Pelangi!%20I%20just%20paid%20my%20booking%20deposit%20online.%20Can%20you%20confirm%20my%20reservation?"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white
                         py-3 px-6 font-medium hover:bg-green-600 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-6">
            <Link href="/book" className="hover:underline">Back to booking page</Link>
            {" · "}
            <Link href="/" className="hover:underline">Home</Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
