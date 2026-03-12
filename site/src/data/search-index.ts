import { blogPosts } from "./blog/posts";

export interface SearchItem {
  title: string;
  excerpt: string;
  url: string;
  category: "Blog" | "Guide";
  tags: string[];
}

/** Guide section data extracted for search indexing. */
const guideSections: SearchItem[] = [
  {
    title: "Getting Around JB",
    excerpt:
      "Grab fares, metered taxis, Rapid JB buses — transport options and typical prices for getting around Johor Bahru.",
    url: "/guide#getting-around",
    category: "Guide",
    tags: ["transport", "grab", "taxi", "bus", "johor-bahru"],
  },
  {
    title: "Money & Currency",
    excerpt:
      "MYR exchange rates, best money changers on Jalan Wong Ah Fook, ATMs near Taman Pelangi, and quick SGD/MYR reference rates.",
    url: "/guide#money",
    category: "Guide",
    tags: ["money", "currency", "exchange", "atm", "sgd", "myr"],
  },
  {
    title: "Singapore Day Trip",
    excerpt:
      "Cross the Causeway or Second Link from JB to Singapore — bus routes, Grab fares, immigration tips, and peak hours to avoid.",
    url: "/guide#day-trip",
    category: "Guide",
    tags: ["singapore", "causeway", "day-trip", "immigration", "border"],
  },
  {
    title: "Top Hawker Centres Near Us",
    excerpt:
      "JB's best street food — Jalan Yahya Awal, Restoran Pelangi, Pasar Malam night market, and Jalan Sutera Food Court.",
    url: "/guide#hawkers",
    category: "Guide",
    tags: ["hawker", "street-food", "food", "night-market"],
  },
  {
    title: "Restaurants & Shopping Near Us",
    excerpt:
      "Sik Bao Sin, San Low Seafood, Pelangi Leisure Mall, Mid Valley Southkey, and more places near Pelangi Capsule Hostel.",
    url: "/guide#food-shopping",
    category: "Guide",
    tags: ["restaurant", "shopping", "mall", "food"],
  },
  {
    title: "Safety Tips for Backpackers",
    excerpt:
      "Street safety, transport safety, valuables storage, health emergencies, and useful phone numbers in JB.",
    url: "/guide#safety",
    category: "Guide",
    tags: ["safety", "emergency", "health", "tips"],
  },
  {
    title: "Useful Local Apps",
    excerpt:
      "Download Grab, MyRapid, Google Maps offline, XE Currency, and MySejahtera before arriving in Johor Bahru.",
    url: "/guide#apps",
    category: "Guide",
    tags: ["apps", "grab", "google-maps", "xe-currency"],
  },
];

/** Combined search index built from blog posts and guide sections. */
export const searchIndex: SearchItem[] = [
  ...blogPosts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    url: `/blog/${post.slug}`,
    category: "Blog" as const,
    tags: post.tags,
  })),
  ...guideSections,
];
