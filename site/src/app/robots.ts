import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
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
        sitemap: [
            "https://pelangicapsulehostel.com/sitemap.xml",
            "https://pelangicapsulehostel.com/image-sitemap.xml",
        ],
    };
}
