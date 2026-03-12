/**
 * Google Image Sitemap — /image-sitemap.xml
 *
 * Extends the main sitemap with Google's image sitemap extension to help
 * Googlebot discover gallery images, room photos, and hero images that may
 * not be found via script execution.
 *
 * Spec: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */

interface ImageEntry {
    url: string;
    title: string;
    caption: string;
}

interface PageImages {
    pageUrl: string;
    images: ImageEntry[];
}

const baseUrl = "https://pelangicapsulehostel.com";

const imageData: PageImages[] = [
    {
        pageUrl: baseUrl,
        images: [
            {
                url: `${baseUrl}/images/hero-main.webp`,
                title: "Pelangi Capsule Hostel Johor Bahru — Modern Capsule Accommodation",
                caption: "Welcome to Pelangi Capsule Hostel, affordable modern capsule pods near Singapore in Taman Pelangi, Johor Bahru.",
            },
        ],
    },
    {
        pageUrl: `${baseUrl}/rooms`,
        images: [
            {
                url: `${baseUrl}/images/capsule-4.webp`,
                title: "Standard Capsule Pod — Pelangi Capsule Hostel",
                caption: "Comfortable standard capsule pod with privacy curtain, USB charging, and personal ventilation at Pelangi Capsule Hostel JB.",
            },
            {
                url: `${baseUrl}/images/capsule-2.webp`,
                title: "Premium Capsule Pod — Pelangi Capsule Hostel",
                caption: "Premium capsule pod featuring a premium mattress, extra storage, and enhanced privacy for a restful stay in Johor Bahru.",
            },
            {
                url: `${baseUrl}/images/capsule-1.webp`,
                title: "Japanese-Style Capsule Pod Interior — Pelangi Capsule Hostel",
                caption: "Japanese-inspired capsule pod interior with privacy features at budget-friendly Pelangi Hostel near Singapore.",
            },
            {
                url: `${baseUrl}/images/capsule-3.webp`,
                title: "Capsule Pod Amenities — Pelangi Capsule Hostel",
                caption: "Capsule pod amenities including USB charging ports and personal ventilation at Pelangi Capsule Hostel Johor Bahru.",
            },
        ],
    },
    {
        pageUrl: `${baseUrl}/about`,
        images: [
            {
                url: `${baseUrl}/images/exterior-1.webp`,
                title: "Pelangi Capsule Hostel Building Exterior",
                caption: "Exterior view of Pelangi Capsule Hostel located in Taman Pelangi, Johor Bahru, Malaysia — close to Singapore.",
            },
        ],
    },
    {
        pageUrl: `${baseUrl}/gallery`,
        images: [
            {
                url: `${baseUrl}/images/living-room.jpeg`,
                title: "Common Area and Living Room — Pelangi Capsule Hostel",
                caption: "Cozy common area and living room at Pelangi Capsule Hostel Johor Bahru, perfect for socialising with fellow travellers.",
            },
            {
                url: `${baseUrl}/images/capsule-1.webp`,
                title: "Capsule Pod Interior — Pelangi Capsule Hostel",
                caption: "Japanese-style capsule pod interior with privacy features at budget hostel JB.",
            },
            {
                url: `${baseUrl}/images/entrance.jpeg`,
                title: "Hostel Entrance — Pelangi Capsule Hostel Taman Pelangi",
                caption: "Welcoming entrance of Pelangi Capsule Hostel in Taman Pelangi, Johor Bahru.",
            },
            {
                url: `${baseUrl}/images/exterior.JPG`,
                title: "Hostel Exterior — Pelangi Capsule Hostel Johor Bahru",
                caption: "Pelangi Capsule Hostel building exterior in Johor Bahru, Malaysia.",
            },
            {
                url: `${baseUrl}/images/capsule-2.webp`,
                title: "Premium Capsule Pod Mattress — Pelangi Hostel JB",
                caption: "Comfortable premium mattress in affordable hostel pod near Singapore.",
            },
            {
                url: `${baseUrl}/images/toilet.jpg`,
                title: "Clean Bathroom with Hot Shower — Pelangi Capsule Hostel",
                caption: "Clean private bathroom with hot shower at Pelangi Hostel JB.",
            },
            {
                url: `${baseUrl}/images/facility-heater.jpg`,
                title: "Hot Water Heater Facility — Pelangi Capsule Hostel",
                caption: "24/7 hot water heater facility at budget accommodation Johor Bahru.",
            },
            {
                url: `${baseUrl}/images/sink.jpg`,
                title: "Washing and Sink Area — Pelangi Capsule Hostel",
                caption: "Washing and sink area at Pelangi Capsule Hostel Johor Bahru.",
            },
            {
                url: `${baseUrl}/images/capsule-3.webp`,
                title: "Capsule Pod USB Charging — Pelangi Capsule Hostel",
                caption: "Capsule pod amenities including USB charging and personal ventilation at Pelangi Hostel.",
            },
            {
                url: `${baseUrl}/images/facility-shoes-rack.jpg`,
                title: "Shoe Storage — Pelangi Capsule Hostel Taman Pelangi",
                caption: "Organized shoe storage at clean hostel in Taman Pelangi, Johor Bahru.",
            },
            {
                url: `${baseUrl}/images/facility-1.webp`,
                title: "Hostel Facilities — Pelangi Capsule Hostel",
                caption: "Modern facilities at Pelangi Capsule Hostel Johor Bahru for a comfortable stay.",
            },
            {
                url: `${baseUrl}/images/facility-2.webp`,
                title: "Hostel Amenities — Pelangi Capsule Hostel",
                caption: "Well-maintained amenities at Pelangi Capsule Hostel near Singapore.",
            },
            {
                url: `${baseUrl}/images/facility-3.webp`,
                title: "Hostel Common Facilities — Pelangi Capsule Hostel",
                caption: "Shared facilities available to all guests at Pelangi Capsule Hostel JB.",
            },
        ],
    },
];

function escapeXml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const urlEntries = imageData
        .map(
            ({ pageUrl, images }) => `
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    ${images
        .map(
            (img) => `<image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
        )
        .join("\n    ")}
  </url>`
        )
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlEntries}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
    });
}
