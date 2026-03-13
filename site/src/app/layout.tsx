import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatWidget, MobileBookingBar, CookieConsent, AnalyticsProvider, BookingRecoveryBanner, MetaPixelProvider, PauseAnimationsButton } from "@/components/DynamicComponents";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
    languages: {
      "en": "https://pelangicapsulehostel.com",
      "ms": "https://pelangicapsulehostel.com/ms/terma",
      "x-default": "https://pelangicapsulehostel.com",
      // "zh-CN": "https://pelangicapsulehostel.com/zh", // Enable when Chinese translation is ready
    },
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
    // Replace with actual token from Google Search Console > Add Property > HTML tag method
    google: "REPLACE_WITH_GSC_VERIFICATION_TOKEN",
  },
  other: {
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Consent Mode v2: deny all consent parameters before GTM loads */}
        <Script
          id="consent-mode-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                analytics_storage: 'denied',
                ad_personalization: 'denied',
                functionality_storage: 'denied',
                security_storage: 'granted'
              });`,
          }}
        />
        {/* Theme color: browser toolbar matches page background in light/dark mode */}
        <meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1c1917" media="(prefers-color-scheme: dark)" />
        {/* Preconnect: YouTube embed and Google Maps iframe */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        {/* OpenSearch: enables browser address bar search */}
        <link rel="search" type="application/opensearchdescription+xml" title="Pelangi Hostel" href="/opensearch.xml" />
        {/* llms.txt: AI crawler content guidance */}
        <link rel="alternate" type="text/plain" href="/llms.txt" />
        {/* SVG favicon: sharp rendering on modern browsers, ICO/PNG fallbacks auto-detected from app/ */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* DNS-prefetch: Trip.com CDN for review/OTA images (cold path) */}
        <link rel="dns-prefetch" href="https://ak-d.tripcdn.com" />
        {/* Speculation Rules: prerender high-conversion pages on hover (Chrome/Edge only, ignored by others) */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  urls: ["/book", "/rooms", "/gallery"],
                  eagerness: "moderate",
                },
              ],
            }),
          }}
        />
        {/* Preload LCP hero image — srcset matches Next.js Image optimization breakpoints */}
        <link
          rel="preload"
          as="image"
          fetchPriority="high"
          imageSrcSet="/_next/image?url=%2Fimages%2Fhero-final.png&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fhero-final.png&w=750&q=75 750w, /_next/image?url=%2Fimages%2Fhero-final.png&w=828&q=75 828w, /_next/image?url=%2Fimages%2Fhero-final.png&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Fhero-final.png&w=1200&q=75 1200w, /_next/image?url=%2Fimages%2Fhero-final.png&w=1920&q=75 1920w, /_next/image?url=%2Fimages%2Fhero-final.png&w=2048&q=75 2048w, /_next/image?url=%2Fimages%2Fhero-final.png&w=3840&q=75 3840w"
          imageSizes="100vw"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} pb-16 md:pb-0`}>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-amber-700 focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <StructuredData />
        <Suspense>{children}</Suspense>
        <MobileBookingBar />
        <BookingRecoveryBanner />
        <ChatWidget />
        <PauseAnimationsButton />
        <CookieConsent />
        <AnalyticsProvider />
        <MetaPixelProvider />
        <SpeedInsights />
      </body>
    </html>
  );
}
