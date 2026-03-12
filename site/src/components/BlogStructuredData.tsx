import type { BlogPost } from "@/data/blog/posts";

interface BlogStructuredDataProps {
  post: BlogPost;
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Pelangi Capsule Hostel",
    },
    publisher: {
      "@type": "Organization",
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
    },
    url: `https://pelangicapsulehostel.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://pelangicapsulehostel.com/blog/${post.slug}`,
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
