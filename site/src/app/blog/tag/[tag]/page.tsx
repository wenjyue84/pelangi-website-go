import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogFilter from "@/components/BlogFilter";
import Link from "next/link";
import { blogPosts } from "@/data/blog/posts";

// Only ASCII kebab tags get archive pages. Chinese-language tags are excluded:
// they would not form clean URLs, and their posts are surfaced via the category
// archives instead. The blog post page links only these same ASCII tags.
const TAG_RE = /^[a-z0-9-]+$/;

function getArchiveTags(): string[] {
  const set = new Set<string>();
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      if (TAG_RE.test(tag)) set.add(tag);
    }
  }
  return [...set];
}

export async function generateStaticParams() {
  return getArchiveTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps<'/blog/tag/[tag]'>): Promise<Metadata> {
  const { tag } = await params;

  if (!TAG_RE.test(tag) || !blogPosts.some((p) => p.tags.includes(tag))) {
    return { title: "Tag Not Found" };
  }

  const description = `Every Pelangi Capsule Hostel blog article tagged "${tag}" — Johor Bahru travel, food, transport, and backpacker tips.`;

  return {
    title: `#${tag} — JB Travel Blog | Pelangi Capsule Hostel`,
    description,
    alternates: {
      canonical: `https://pelangicapsulehostel.com/blog/tag/${tag}`,
    },
    openGraph: {
      title: `#${tag} — JB Travel Blog`,
      description,
      url: `https://pelangicapsulehostel.com/blog/tag/${tag}`,
      siteName: "Pelangi Capsule Hostel",
      locale: "en_MY",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: `Articles tagged ${tag} — Pelangi Capsule Hostel Blog`,
        },
      ],
    },
  };
}

export default async function TagPage({ params }: PageProps<'/blog/tag/[tag]'>) {
  const { tag } = await params;

  const filteredPosts = [...blogPosts]
    .filter((p) => p.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!TAG_RE.test(tag) || filteredPosts.length === 0) {
    notFound();
  }

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
        name: `#${tag}`,
        item: `https://pelangicapsulehostel.com/blog/tag/${tag}`,
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <div className="pt-28 pb-16 container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-stone-500 dark:text-stone-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-stone-800 dark:text-stone-200 font-medium">#{tag}</li>
            </ol>
          </nav>

          {/* Page header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mb-4">
              #{tag}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-100">
              Posts tagged &ldquo;{tag}&rdquo;
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} tagged
              with this topic.
            </p>
          </div>

          {/* Posts — BlogFilter pre-filtered to this tag */}
          <BlogFilter posts={filteredPosts} />

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium transition-colors"
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
