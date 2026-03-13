"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="pt-28 pb-16 container-custom flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <span className="text-8xl font-display font-bold text-amber-400">
              Oops
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-200 mb-4">
            Something went wrong
          </h1>

          <p className="text-stone-600 dark:text-stone-400 text-lg mb-10 max-w-md">
            We hit an unexpected snag. Try refreshing the page or head back
            home — your booking is still safe with us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg shadow-md"
            >
              Try again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold px-8 py-4 rounded-full transition-colors text-lg shadow-md border border-stone-200 dark:border-stone-700"
            >
              Go home
            </Link>
          </div>

          {error.digest && (
            <p className="text-stone-500 dark:text-stone-400 text-xs font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
