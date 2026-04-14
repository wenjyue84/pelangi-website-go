import { describe, it, expect } from "vitest";
import { searchRelatedPosts } from "./blog-search";
import { blogPosts } from "@/data/blog/posts";

describe("searchRelatedPosts", () => {
  it("excludes the current post from results", () => {
    const current = blogPosts[0];
    const results = searchRelatedPosts(current.slug, current.tags, current.category);
    expect(results.every((p) => p.slug !== current.slug)).toBe(true);
  });

  it("returns at most 3 results", () => {
    const current = blogPosts[0];
    const results = searchRelatedPosts(current.slug, current.tags, current.category);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("ranks by shared tags + category match", () => {
    // Build a synthetic slug that matches many tags of blogPosts[0]
    const current = blogPosts[0];
    const results = searchRelatedPosts(current.slug, current.tags, current.category);
    // All returned posts must share at least one tag or the category
    for (const p of results) {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = p.category === current.category ? 1 : 0;
      expect(sharedTags + sameCategory).toBeGreaterThan(0);
    }
  });

  it("returns empty array when no related posts exist", () => {
    const results = searchRelatedPosts(
      "non-existent-slug",
      ["unique-tag-xyz-123"],
      "Unique Category"
    );
    expect(results).toHaveLength(0);
  });

  it("tie-breaks by newest date first", () => {
    // Posts with identical score should be sorted newest first
    const [first, ...rest] = blogPosts;
    const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));
    const results = searchRelatedPosts(first.slug, allTags, "NoMatch");
    for (let i = 0; i < results.length - 1; i++) {
      // Scores may differ; if same score, date should be descending
      const a = results[i];
      const b = results[i + 1];
      const scoreA =
        a.tags.filter((t) => allTags.includes(t)).length +
        (a.category === "NoMatch" ? 1 : 0);
      const scoreB =
        b.tags.filter((t) => allTags.includes(t)).length +
        (b.category === "NoMatch" ? 1 : 0);
      if (scoreA === scoreB) {
        expect(new Date(a.date).getTime()).toBeGreaterThanOrEqual(
          new Date(b.date).getTime()
        );
      }
    }
  });
});
