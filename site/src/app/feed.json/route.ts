import { blogPosts } from "@/data/blog/posts";

export async function GET() {
  const baseUrl = "https://pelangicapsulehostel.com";

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Pelangi Capsule Hostel Blog",
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description:
      "Travel tips, guides, and stories for budget backpackers visiting Johor Bahru and Singapore",
    language: "en",
    authors: [
      {
        name: "Pelangi Team",
        url: baseUrl,
      },
    ],
    items: sortedPosts.map((post) => ({
      id: `${baseUrl}/blog/${post.slug}`,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      content_html: post.content,
      summary: post.excerpt,
      date_published: new Date(post.date).toISOString(),
      authors: [{ name: post.author }],
      tags: post.tags,
      language: "en",
      image: post.featuredImage.startsWith("http")
        ? post.featuredImage
        : `${baseUrl}${post.featuredImage}`,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
