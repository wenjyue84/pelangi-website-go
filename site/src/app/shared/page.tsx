import type { Metadata, Route } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shared Page | Pelangi Capsule Hostel",
  robots: { index: false },
};

interface SharedPageProps {
  searchParams: Promise<{ title?: string; text?: string; url?: string }>;
}

export default async function SharedPage({ searchParams }: SharedPageProps) {
  const { title, text, url } = await searchParams;
  const displayUrl = url || "https://pelangicapsulehostel.com";
  const internalHref =
    displayUrl.startsWith("https://pelangicapsulehostel.com")
      ? (displayUrl.replace("https://pelangicapsulehostel.com", "") || "/")
      : "/";

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Header />
      <div className="pt-28 pb-16 container-custom max-w-2xl text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-medium text-stone-900 dark:text-stone-100 mb-3">
          {title || "Shared with you"}
        </h1>
        {text && (
          <p className="text-stone-600 dark:text-stone-400 mb-6">{text}</p>
        )}
        <Link
          href={internalHref as Route}
          className="inline-flex items-center gap-2 bg-amber-700 text-white rounded-2xl py-3 px-6 font-medium hover:bg-amber-800 transition-colors"
        >
          View Page
        </Link>
        <div className="mt-8">
          <Link href="/" className="text-sm text-amber-700 dark:text-amber-400 hover:underline">
            Back to Pelangi Capsule Hostel
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
