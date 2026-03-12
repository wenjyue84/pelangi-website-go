import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://pelangicapsulehostel.com";
    const lastModified = new Date();

    const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/book`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/rooms`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/check-in`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/guide`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/amenities`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...blogPostEntries,
    ];
}
