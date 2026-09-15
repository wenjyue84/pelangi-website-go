import { MetadataRoute } from "next";

// AI crawlers explicitly allowed for GEO (Generative Engine Optimisation).
// These bots feed ChatGPT, Claude, Perplexity, Gemini, and similar AI search
// engines. Allowing them ensures fresh content is indexed by AI systems.
const AI_CRAWLERS = [
  "GPTBot",           // OpenAI / ChatGPT (training)
  "OAI-SearchBot",    // OpenAI / ChatGPT Search (live answers & citations)
  "ClaudeBot",        // Anthropic / Claude
  "anthropic-ai",     // Anthropic API crawler
  "PerplexityBot",    // Perplexity AI
  "Perplexity-User",  // Perplexity AI (alternate)
  "Applebot-Extended", // Apple Intelligence / Siri AI
  "DuckAssistBot",    // DuckDuckGo AI assistant
  "Amazonbot",        // Amazon Alexa / AWS AI
  "Google-Extended",  // Google Gemini / AI Overviews
  "cohere-ai",        // Cohere AI
  "AI2Bot",           // Allen Institute for AI
  "Bytespider",       // ByteDance / TikTok AI
  "FacebookBot",      // Meta AI
  "meta-externalagent", // Meta AI (alternate)
  "YouBot",           // You.com AI search
  "CCBot",            // Common Crawl (trains most LLMs)
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Explicitly allow all AI crawlers to access the full site.
            // This is important for GEO — AI systems need to read live content
            // to cite the hostel accurately in responses.
            ...AI_CRAWLERS.map((bot) => ({
                userAgent: bot,
                allow: "/",
            })),
            // Default rule for all other crawlers.
            {
                userAgent: "*",
                allow: "/",
                // Block old WordPress paths — site previously ran on WP; these pages
                // no longer exist and return 410 Gone (see middleware.ts).
                // Listed here so crawlers don't attempt to index them at all.
                disallow: [
                    "/private/",
                    "/wp-admin/",
                    "/wp-content/",
                    "/wp-includes/",
                    "/wp-json/",
                    "/wp-login.php",
                    "/wp-cron.php",
                    "/xmlrpc.php",
                    "/wp-signup.php",
                    "/wp-activate.php",
                ],
            },
        ],
        sitemap: [
            "https://pelangicapsulehostel.com/sitemap.xml",
            "https://pelangicapsulehostel.com/image-sitemap.xml",
        ],
    };
}
