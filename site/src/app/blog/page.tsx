import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogFilter from "@/components/BlogFilter";
import NewsletterSignupForm from "@/components/NewsletterSignupForm";
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

const blogBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://pelangicapsulehostel.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://pelangicapsulehostel.com/blog",
    },
  ],
};

// CollectionPage + ItemList so search engines and AI crawlers can read the blog
// index as a structured list of articles (newest first).
const blogCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://pelangicapsulehostel.com/blog#collection",
  name: "JB Travel Blog | Tips & Guides for Backpackers",
  description:
    "Backpacker guides, food tips, day trip ideas, and local secrets for Johor Bahru. Written by the team at Pelangi Capsule Hostel.",
  url: "https://pelangicapsulehostel.com/blog",
  isPartOf: { "@id": "https://pelangicapsulehostel.com/#website" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: sortedPosts.length,
    itemListElement: sortedPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://pelangicapsulehostel.com/blog/${post.slug}`,
      name: post.title,
    })),
  },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <Header />

      <div className="pt-28 pb-16 container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mb-4">
              JB Travel Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-100">
              Guides & Tips for Backpackers
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Local knowledge from our team in Taman Pelangi — food, day trips,
              budget hacks, and everything in between.
            </p>
          </div>

          {/* Category filter + blog grid (client component) */}
          <BlogFilter posts={sortedPosts} />

          {/* Newsletter signup */}
          <NewsletterSignupForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
