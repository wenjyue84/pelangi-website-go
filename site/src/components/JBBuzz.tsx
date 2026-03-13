import Link from "next/link";
import { blogPosts } from "@/data/blog/posts";
import BlogCard from "@/components/BlogCard";
import { annotateMs } from "@/components/LangMs";

interface CuratedNewsItem {
  title: string;
  source: string;
  url: string;
  date: string;
  description: string;
}

const curatedNews: CuratedNewsItem[] = [
  {
    title: "JB's Street Food Scene Named Among Asia's Best for 2026",
    source: "Malay Mail",
    url: "https://www.malaymail.com",
    date: "2026-03-10",
    description:
      "Johor Bahru's hawker culture earns recognition alongside Penang and Bangkok in a new Asia food travel ranking.",
  },
  {
    title: "New RTS Link Progress: Cross-Border Rail on Track for 2026 Opening",
    source: "The Star",
    url: "https://www.thestar.com.my",
    date: "2026-03-07",
    description:
      "The Rapid Transit System linking JB Sentral to Woodlands, Singapore is expected to begin operations later this year.",
  },
  {
    title: "Visit Johor: Top 10 Hidden Gems for Backpackers",
    source: "Visit Johor",
    url: "https://www.visitjohor.com",
    date: "2026-03-03",
    description:
      "From waterfall hikes in Kota Tinggi to heritage walks in old town JB — the tourism board highlights budget-friendly experiences.",
  },
  {
    title: "Weekend Night Markets Return to Taman Pelangi",
    source: "Johor Now",
    url: "https://www.johornow.com",
    date: "2026-02-28",
    description:
      "The popular Thursday pasar malam along Jalan Kuning is back with over 100 stalls of street food, clothes, and local crafts.",
  },
  {
    title: "Malaysia Digital Nomad Visa: What Backpackers Need to Know",
    source: "Malay Mail",
    url: "https://www.malaymail.com",
    date: "2026-02-22",
    description:
      "A simplified guide to Malaysia's DE Rantau digital nomad programme — eligibility, costs, and why JB is a top pick.",
  },
];

const latestPosts = [...blogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function JBBuzz() {
  return (
    <section id="jb-buzz" className="py-20 bg-stone-50 dark:bg-stone-950">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-700 dark:text-amber-400 font-medium tracking-wider text-sm uppercase mb-2 block">
            JB Buzz
          </span>
          <h2 className="font-display text-4xl font-medium mb-4 text-stone-900 dark:text-stone-100">
            News & Updates from Johor Bahru
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
            Stay in the loop with the latest happenings around JB — from food
            scene updates to transport news and travel tips.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left Column: Curated News (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                What&apos;s Happening in JB
              </h3>
              <Link
                href="/feed.xml"
                className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors bg-amber-50 dark:bg-amber-900/30 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36zM4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44zm0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93v-2.83z" />
                </svg>
                RSS Feed
              </Link>
            </div>

            <div className="space-y-4">
              {curatedNews.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-xl flex items-center justify-center border border-amber-100 dark:border-amber-800">
                      <span className="text-lg">
                        {item.source === "Malay Mail"
                          ? "📰"
                          : item.source === "The Star"
                          ? "⭐"
                          : item.source === "Visit Johor"
                          ? "🌴"
                          : "📍"}
                      </span>
                    </div>
                    <div className="grow min-w-0">
                      <h4 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-2">
                        {annotateMs(item.description)}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-medium text-amber-700 dark:text-amber-400">
                          {item.source}
                        </span>
                        <span>·</span>
                        <span>
                          {new Date(item.date).toLocaleDateString("en-MY", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 ml-auto text-stone-300 dark:text-stone-600 group-hover:text-amber-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Latest Blog Posts (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-100">
                Latest from Our Blog
              </h3>
              <Link
                href="/blog"
                className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-5">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
