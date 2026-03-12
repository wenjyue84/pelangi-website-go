import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogFilter from "@/components/BlogFilter";
import Link from "next/link";
import {
  blogPosts,
  categoryToSlug,
  slugToCategory,
  getUniqueCategories,
} from "@/data/blog/posts";

export const revalidate = 3600; // ISR: regenerate at most every hour

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getUniqueCategories();
  return categories.map((cat) => ({ category: categoryToSlug(cat) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categoryLabel = slugToCategory(slug);

  if (!categoryLabel) {
    return { title: "Category Not Found" };
  }

  const descriptions: Record<string, string> = {
    "Food & Drink":
      "JB food guides, hawker recommendations, and budget eating tips for backpackers in Johor Bahru.",
    "Travel Tips":
      "Practical travel tips for visiting Johor Bahru — border crossing, transport, money-saving hacks, and more.",
    "Things To Do":
      "The best things to do in Johor Bahru — attractions, activities, and local experiences for every budget.",
    "Local Life":
      "Discover the real Johor Bahru — local culture, neighbourhoods, and daily life as seen through local eyes.",
  };

  const description =
    descriptions[categoryLabel] ??
    `Browse all ${categoryLabel} articles from the Pelangi Capsule Hostel blog.`;

  return {
    title: `${categoryLabel} | JB Travel Blog | Pelangi Capsule Hostel`,
    description,
    alternates: {
      canonical: `https://pelangicapsulehostel.com/blog/category/${slug}`,
    },
    openGraph: {
      title: `${categoryLabel} — JB Travel Blog`,
      description,
      url: `https://pelangicapsulehostel.com/blog/category/${slug}`,
      siteName: "Pelangi Capsule Hostel",
      locale: "en_MY",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: `${categoryLabel} articles — Pelangi Capsule Hostel Blog`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const categoryLabel = slugToCategory(slug);

  if (!categoryLabel) {
    notFound();
  }

  const filteredPosts = [...blogPosts]
    .filter((p) => p.category === categoryLabel)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const breadcrumbSchema = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `https://pelangicapsulehostel.com/blog/category/${slug}`,
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <div className="pt-28 pb-16 container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-stone-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-amber-700 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-amber-700 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-stone-800 font-medium">{categoryLabel}</li>
            </ol>
          </nav>

          {/* Page header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-amber-100 text-amber-800 mb-4">
              {categoryLabel}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900">
              {categoryLabel} Articles
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} in
              this category.
            </p>
          </div>

          {/* Posts — BlogFilter pre-filtered to this category */}
          <BlogFilter posts={filteredPosts} activeCategory={categoryLabel} />

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
            >
              ← View all articles
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
