import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog/posts";

export const metadata: Metadata = {
  title: "JB Travel Blog | Tips & Guides for Backpackers",
  description:
    "Backpacker guides, food tips, day trip ideas, and local secrets for Johor Bahru. Written by the team at Pelangi Capsule Hostel.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/blog",
  },
  openGraph: {
    title: "JB Travel Blog | Tips & Guides for Backpackers",
    description:
      "Backpacker guides, food tips, day trip ideas, and local secrets for Johor Bahru.",
    url: "https://pelangicapsulehostel.com/blog",
    siteName: "Pelangi Capsule Hostel",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pelangi Capsule Hostel JB Travel Blog",
      },
    ],
  },
};

// Sort posts newest-first
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Header />

      <div className="pt-28 pb-16 container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-amber-100 text-amber-800 mb-4">
              JB Travel Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900">
              Guides & Tips for Backpackers
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Local knowledge from our team in Taman Pelangi — food, day trips,
              budget hacks, and everything in between.
            </p>
          </div>

          {/* Blog grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
