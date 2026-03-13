"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/data/blog/posts";
import { categoryToSlug, getUniqueCategories } from "@/data/blog/posts";
import Link from "next/link";

interface BlogFilterProps {
  posts: BlogPost[];
  /** If set, pre-selects this category (used on /blog/category/[slug] pages) */
  activeCategory?: string;
}

export default function BlogFilter({ posts, activeCategory }: BlogFilterProps) {
  const [selected, setSelected] = useState<string>(activeCategory ?? "All");
  const categories = ["All", ...getUniqueCategories()];

  const visible =
    selected === "All" ? posts : posts.filter((p) => p.category === selected);

  return (
    <div>
      {/* Category filter bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`min-h-6 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-amber-400 hover:text-amber-700"
              }`}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* SEO-friendly category page links (visually hidden, for crawlers) */}
      <div className="sr-only">
        {getUniqueCategories().map((cat) => (
          <Link key={cat} href={`/blog/category/${categoryToSlug(cat)}`}>
            {cat} articles
          </Link>
        ))}
      </div>

      {/* Post grid */}
      {visible.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-stone-500 py-12">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
}
