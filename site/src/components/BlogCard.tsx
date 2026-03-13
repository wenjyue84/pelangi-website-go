import Link from "next/link";
import type { BlogPost } from "@/data/blog/posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl border border-stone-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
        {/* Featured image placeholder */}
        <div className="w-full h-48 bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center">
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
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 mb-3">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="font-display text-xl font-medium text-stone-900 mb-2 group-hover:text-amber-700 transition-colors leading-snug">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-100">
            <span>
              {new Date(post.date).toLocaleDateString("en-MY", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
