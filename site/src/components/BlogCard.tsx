import Link from "next/link";
import type { BlogPost } from "@/data/blog/posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
        {/* Featured image placeholder */}
        <div className="w-full h-48 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
          <span className="text-4xl">
            {post.category === "Food & Drink"
              ? "🍜"
              : post.category === "Day Trips"
              ? "🚌"
              : post.category === "Itineraries"
              ? "🗺️"
              : post.category === "Budget Tips"
              ? "💰"
              : "✈️"}
          </span>
        </div>

        <div className="p-6">
          {/* Category badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 mb-3">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-4 border-t border-stone-100 dark:border-stone-700">
            <span>
              {new Date(post.date).toLocaleDateString("en-MY", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span aria-label={`${post.readingTimeMinutes} minute read`}>{post.readingTimeMinutes} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
