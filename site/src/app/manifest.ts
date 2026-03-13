import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pelangi Capsule Hostel",
    short_name: "Pelangi",
    description:
      "Japanese-style capsule accommodation in Johor Bahru from RM35/night. Free WiFi, 24/7 access, hot showers.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#fafaf9",
    theme_color: "#fafaf9",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/screenshots/screenshot-narrow.webp",
        sizes: "1080x2400",
        type: "image/webp",
        form_factor: "narrow",
        label: "Pelangi Capsule Hostel — Home page on mobile",
      },
      {
        src: "/images/screenshots/screenshot-wide.webp",
        sizes: "2560x1600",
        type: "image/webp",
        form_factor: "wide",
        label: "Pelangi Capsule Hostel — Home page on desktop",
      },
    ],
  };
}
