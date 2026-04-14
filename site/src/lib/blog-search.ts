import { blogPosts, type BlogPost } from "@/data/blog/posts";

/**
 * Return the top 3 blog posts most similar to the given post.
 * Relevance = shared tag count + 1 if category matches.
 * Ties broken by publish date descending (newest first).
 */
export function searchRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  currentCategory: string
): BlogPost[] {
  const tagSet = new Set(currentTags);

  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => tagSet.has(t)).length;
      const categoryBonus = p.category === currentCategory ? 1 : 0;
      return { post: p, score: sharedTags + categoryBonus };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, 3)
    .map(({ post }) => post);
}
