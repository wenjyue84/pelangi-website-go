import type { Metadata, Route } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, getUniqueCategories, categoryToSlug } from "@/data/blog/posts";
export const metadata: Metadata = {
  title: "Sitemap | Pelangi Capsule Hostel",
  description:
    "Browse all pages on the Pelangi Capsule Hostel website — rooms, booking, amenities, location, blog articles, and more.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/sitemap-html",
  },
};

interface SitemapSection {
  heading: string;
  links: { href: string; label: string }[];
}

export default function SitemapHtmlPage() {
  const categories = getUniqueCategories();

  const sections: SitemapSection[] = [
    {
      heading: "Main Pages",
      links: [
        { href: "/", label: "Home" },
        { href: "/rooms", label: "Rooms & Capsule Types" },
        { href: "/book", label: "Book Now" },
        { href: "/amenities", label: "Amenities & Facilities" },
        { href: "/gallery", label: "Photo Gallery" },
        { href: "/about", label: "About Us" },
        { href: "/location", label: "Location & Directions" },
        { href: "/contact", label: "Contact Us" },
      ],
    },
    {
      heading: "Guest Information",
      links: [
        { href: "/check-in", label: "Online Check-in" },
        { href: "/getting-here", label: "Getting Here — Border Crossing & RTS Link" },
        { href: "/guide", label: "Guest Guide" },
      ],
    },
    {
      heading: "Blog",
      links: [
        { href: "/blog", label: "All Articles" },
        ...categories.map((cat) => ({
          href: `/blog/category/${categoryToSlug(cat)}`,
          label: cat,
        })),
      ],
    },
    {
      heading: "Blog Articles",
      links: blogPosts.map((post) => ({
        href: `/blog/${post.slug}`,
        label: post.title,
      })),
    },
    {
      heading: "Legal & Policies",
      links: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms & Conditions" },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50">
        <div className="pt-28 pb-16 container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <h1 className="font-display text-4xl font-semibold text-stone-900 mb-3">
                Sitemap
              </h1>
              <p className="text-stone-500 text-sm">
                A complete list of all pages on our website.
              </p>
            </div>

            <nav aria-label="Sitemap">
              {sections.map((section) => (
                <section key={section.heading} className="mb-10">
                  <h2 className="font-display text-xl font-medium text-stone-800 mb-4 border-b border-stone-200 pb-2">
                    {section.heading}
                  </h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href as Route}
                          className="text-amber-700 hover:text-amber-900 hover:underline transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
