"use client";

import { useState, useTransition } from "react";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/data/blog/posts";
import { categoryToSlug, getUniqueCategories } from "@/data/blog/posts";
import { yieldToMain } from "@/lib/yield-to-main";
import Link from "next/link";

interface BlogFilterProps {
  posts: BlogPost[];
  /** If set, pre-selects this category (used on /blog/category/[slug] pages) */
  activeCategory?: string;
}

export default function BlogFilter({ posts, activeCategory }: BlogFilterProps) {
  const [selected, setSelected] = useState<string>(activeCategory ?? "All");
  const [visible, setVisible] = useState<BlogPost[]>(
    activeCategory ? posts.filter((p) => p.category === activeCategory) : posts
  );
  const [isPending, startTransition] = useTransition();
  const categories = ["All", ...getUniqueCategories()];

  async function handleFilter(category: string) {
    setSelected(category);

    // Phase 1: Validate selection
    const isAll = category === "All";

    // Yield to main thread — let browser process pending input/paint
    await yieldToMain();

    // Phase 2: Filter and sort
    const filtered = isAll ? posts : posts.filter((p) => p.category === category);

    // Yield again before triggering render
    await yieldToMain();

    // Phase 3: Render via transition to keep UI responsive
    startTransition(() => {
      setVisible(filtered);
    });
  }

  return (
    <div>
      {/* Category filter bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`min-h-6 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-500 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400"
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
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${isPending ? "opacity-80" : ""}`}
        >
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-stone-500 dark:text-stone-400 py-12">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
}
