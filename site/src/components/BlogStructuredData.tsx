import type { BlogPost } from "@/data/blog/posts";

interface BlogStructuredDataProps {
  post: BlogPost;
}

/**
 * Resolve the article author to a schema node. "Jay Lew" maps to the canonical
 * Person entity served at /author/jay-lew (same @id used by the Organization
 * founder reference), which consolidates E-E-A-T signals. Any other byline
 * (e.g. the Chinese posts authored by the hostel's editorial team) resolves to
 * the Organization entity instead.
 */
function buildAuthor(authorName: string) {
  if (authorName === "Jay Lew") {
    return {
      "@type": "Person",
      "@id": "https://pelangicapsulehostel.com/author/jay-lew#person",
      name: "Jay Lew",
      jobTitle: "Co-Founder & Hostel Owner",
      worksFor: {
        "@type": "Organization",
        "@id": "https://pelangicapsulehostel.com/#organization",
        name: "Pelangi Capsule Hostel",
        url: "https://pelangicapsulehostel.com",
      },
      url: "https://pelangicapsulehostel.com/author/jay-lew",
      sameAs: [
        "https://www.facebook.com/pelangicapsulehostel",
        "https://www.instagram.com/pelangicapsulehostel",
      ],
    };
  }
  return {
    "@type": "Organization",
    "@id": "https://pelangicapsulehostel.com/#organization",
    name: authorName,
    url: "https://pelangicapsulehostel.com",
  };
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
  // Chinese posts live alongside English ones at /blog/[slug]; auto-detect by
  // CJK characters in the title so every translated post gets the right
  // inLanguage without per-post annotation. An explicit field overrides this.
  const inLanguage =
    post.inLanguage ?? (/[一-鿿]/.test(post.title) ? "zh-CN" : "en");

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: buildAuthor(post.author),
    publisher: {
      "@type": "Organization",
      "@id": "https://pelangicapsulehostel.com/#organization",
      name: "Pelangi Capsule Hostel",
      logo: {
        "@type": "ImageObject",
        url: "https://pelangicapsulehostel.com/images/logo.png",
      },
    },
    image: {
      "@type": "ImageObject",
      url: post.featuredImage.startsWith("http")
        ? post.featuredImage
        : `https://pelangicapsulehostel.com${post.featuredImage}`,
      description: post.imageAlt ?? post.title,
    },
    url: `https://pelangicapsulehostel.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://pelangicapsulehostel.com/blog/${post.slug}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#post-title"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pelangicapsulehostel.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://pelangicapsulehostel.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://pelangicapsulehostel.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
