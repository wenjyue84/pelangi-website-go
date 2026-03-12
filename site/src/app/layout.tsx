import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

// TODO: Create OG image at /images/og-image.jpg (1200x630px) for optimal social sharing
// Recommended: Feature hero image with "Pelangi Capsule Hostel" branding and "From RM35/night" text

export const metadata: Metadata = {
  metadataBase: new URL("https://pelangicapsulehostel.com"),
  title: {
    default: "Pelangi Capsule Hostel | Budget Accommodation in Johor Bahru",
    template: "%s | Pelangi Capsule Hostel",
  },
  description: "Experience Japanese-style capsule accommodation in Taman Pelangi, Johor Bahru. Budget-friendly hostel from RM35/night with free WiFi, 24/7 access, hot showers, and personal lockers. Perfect base for Singapore day trips - just 30 minutes from the border.",
  keywords: [
    "capsule hostel Johor Bahru",
    "budget accommodation JB",
    "hostel near Singapore",
    "Taman Pelangi hostel",
    "cheap hostel JB",
    "backpacker accommodation Malaysia",
    "Japanese capsule hotel JB",
    "affordable hostel Johor",
    "pod hostel Malaysia",
    "budget stay near Singapore border",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pelangicapsulehostel.com",
    types: {
      "application/rss+xml": "https://pelangicapsulehostel.com/feed.xml",
    },
  },
  openGraph: {
    title: "Pelangi Capsule Hostel | Budget Accommodation in Johor Bahru",
    description: "Japanese-style capsule accommodation from RM35/night in Taman Pelangi, JB. Free WiFi, 24/7 access, hot showers. Perfect for Singapore day trips!",
    url: "https://pelangicapsulehostel.com",
    siteName: "Pelangi Capsule Hostel",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pelangi Capsule Hostel - Modern Japanese-style pods in Johor Bahru",
      },
      {
        url: "/images/hero-main.webp",
        width: 1920,
        height: 1080,
        alt: "Pelangi Capsule Hostel interior view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pelangi Capsule Hostel | From RM35/night in JB",
    description: "Japanese-style capsule hostel in Taman Pelangi, Johor Bahru. Budget-friendly, modern, and just 30 min from Singapore.",
    images: ["/images/og-image.png"],
  },
  verification: {
    // TODO: Add your Google Search Console verification code
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
