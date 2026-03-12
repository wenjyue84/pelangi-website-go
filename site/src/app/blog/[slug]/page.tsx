import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogStructuredData from "@/components/BlogStructuredData";
import { blogPosts, getPostBySlug } from "@/data/blog/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://pelangicapsulehostel.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://pelangicapsulehostel.com/blog/${post.slug}`,
      siteName: "Pelangi Capsule Hostel",
      locale: "en_MY",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <BlogStructuredData post={post} />
      <Header />

      <article className="pt-28 pb-16 container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors mb-8 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-medium text-stone-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-8 pb-8 border-b border-stone-200">
            <span>
              By <span className="font-medium text-stone-700">{post.author}</span>
            </span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-MY", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Article body */}
          <div
            className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-a:text-amber-700 prose-strong:text-stone-900"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-200">
              <p className="text-sm font-medium text-stone-500 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-stone-100 text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link (bottom) */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
            >
              ← More Articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
