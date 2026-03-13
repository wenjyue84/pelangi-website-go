import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="pt-28 pb-16 container-custom flex flex-col items-center justify-center text-center">
          {/* Offline icon */}
          <div className="mb-6">
            <svg
              className="w-20 h-20 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0"
              />
              {/* Diagonal strike-through line */}
              <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4">
            You&apos;re offline
          </h1>

          <p className="text-stone-600 dark:text-stone-400 text-lg mb-6 max-w-md">
            It looks like you&apos;ve lost your internet connection. Check your
            Wi-Fi or mobile data and try again.
          </p>

          {/* Key info available offline */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl p-6 max-w-sm w-full mb-8 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-stone-800 dark:text-stone-200 mb-3">
              Quick info
            </h2>
            <ul className="text-stone-600 dark:text-stone-400 text-sm space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &bull;
                </span>
                <span>
                  <strong>Address:</strong> 53, Jalan Serampang, Taman Pelangi,
                  80400 Johor Bahru
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &bull;
                </span>
                <span>
                  <strong>WhatsApp:</strong> +60 12-708 8789
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &bull;
                </span>
                <span>
                  <strong>Check-in:</strong> 3:00 PM &ndash; 11:00 PM
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &bull;
                </span>
                <span>
                  <strong>Check-out:</strong> by 12:00 PM
                </span>
              </li>
            </ul>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg shadow-md"
          >
            Try again
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
