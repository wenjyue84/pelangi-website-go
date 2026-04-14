import Link from "next/link";
import type { BlogPost } from "@/data/blog/posts";

interface RelatedPostsProps {
  relatedPosts: BlogPost[];
  currentPostUrl: string;
}

export default function RelatedPosts({ relatedPosts, currentPostUrl }: RelatedPostsProps) {
  if (relatedPosts.length === 0) return null;

  const isSimilarToSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Related Articles",
    itemListElement: relatedPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        "@id": `https://pelangicapsulehostel.com/blog/${post.slug}`,
        url: `https://pelangicapsulehostel.com/blog/${post.slug}`,
        headline: post.title,
        isSimilarTo: {
          "@type": "BlogPosting",
          "@id": currentPostUrl,
        },
      },
    })),
  };

  return (
    <section aria-labelledby="related-posts-heading" className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(isSimilarToSchema) }}
      />

      <h2
        id="related-posts-heading"
        className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-6"
      >
        You Might Also Like
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            data-relationship="similar"
            className="group block rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mb-2">
              {post.category}
            </span>
            <h3 className="font-medium text-stone-900 dark:text-stone-100 text-sm leading-snug mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed line-clamp-2 mb-3">
              {post.excerpt}
            </p>
            <time
              dateTime={post.date}
              className="text-xs text-stone-400 dark:text-stone-500"
            >
              {new Date(post.date).toLocaleDateString("en-MY", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
}
