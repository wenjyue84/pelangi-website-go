import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ak-d.tripcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
      },
    ],
  },
  async rewrites() {
    const adminHost = "https://admin.pelangicapsulehostel.com";
    return [
      // Proxy the SPA shell (index.html) for the booking page
      { source: "/book", destination: `${adminHost}/book` },
      // Proxy Vite-built JS/CSS chunks (referenced as absolute /assets/ paths in index.html)
      { source: "/assets/:path*", destination: `${adminHost}/assets/:path*` },
      // Proxy the public booking API (availability check + form submission)
      { source: "/api/public/:path*", destination: `${adminHost}/api/public/:path*` },
    ];
  },
};

export default nextConfig;
