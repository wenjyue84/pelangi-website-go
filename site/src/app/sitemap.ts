import { MetadataRoute } from "next";
import { blogPosts, categoryToSlug, getUniqueCategories } from "@/data/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://pelangicapsulehostel.com";
    // Stable build-independent date for static pages (avoids a churning sitemap
    // where every page's lastmod changes on each deploy). Bump when content changes.
    const lastModified = new Date("2026-06-26");

    const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified ?? post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        images: [`${baseUrl}${post.featuredImage}`],
    }));

    const categoryEntries: MetadataRoute.Sitemap = getUniqueCategories().map((cat) => ({
        url: `${baseUrl}/blog/category/${categoryToSlug(cat)}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.65,
    }));

    const zhRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/zh`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.95,
            alternates: { languages: { en: `${baseUrl}`, "zh-CN": `${baseUrl}/zh` } },
        },
        {
            url: `${baseUrl}/zh/rooms`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.9,
            alternates: { languages: { en: `${baseUrl}/rooms`, "zh-CN": `${baseUrl}/zh/rooms` } },
        },
        {
            url: `${baseUrl}/zh/location`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.85,
            alternates: { languages: { en: `${baseUrl}/location`, "zh-CN": `${baseUrl}/zh/location` } },
        },
        {
            url: `${baseUrl}/zh/about`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
            alternates: { languages: { en: `${baseUrl}/about`, "zh-CN": `${baseUrl}/zh/about` } },
        },
    ];

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1.0,
            images: [`${baseUrl}/images/hero-final.png`],
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
            images: [
                `${baseUrl}/images/capsule-4.webp`,
                `${baseUrl}/images/capsule-2.webp`,
                `${baseUrl}/images/capsule-1.webp`,
                `${baseUrl}/images/capsule-3.webp`,
            ],
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
            images: [`${baseUrl}/images/exterior.JPG`],
        },
        {
            url: `${baseUrl}/gallery`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
            images: [
                `${baseUrl}/images/living-room.jpeg`,
                `${baseUrl}/images/capsule-1.webp`,
                `${baseUrl}/images/entrance.jpeg`,
                `${baseUrl}/images/exterior.JPG`,
                `${baseUrl}/images/capsule-2.webp`,
                `${baseUrl}/images/toilet.jpg`,
                `${baseUrl}/images/facility-heater.jpg`,
                `${baseUrl}/images/sink.jpg`,
                `${baseUrl}/images/capsule-3.webp`,
                `${baseUrl}/images/facility-shoes-rack.jpg`,
                `${baseUrl}/images/facility-1.webp`,
                `${baseUrl}/images/facility-2.webp`,
                `${baseUrl}/images/facility-3.webp`,
            ],
        },
        {
            url: `${baseUrl}/location`,
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
            url: `${baseUrl}/getting-here`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
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
        {
            url: `${baseUrl}/visit-malaysia-2026`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/visa-run`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/singapore-jobs`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/sitemap-html`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/author/jay-lew`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/safety-guidelines`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...categoryEntries,
        ...blogPostEntries,
        ...zhRoutes,
    ];
}
