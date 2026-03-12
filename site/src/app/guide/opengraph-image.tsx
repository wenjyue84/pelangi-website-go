import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const revalidate = 86400; // Cache for 24 hours

export const alt = 'Johor Bahru Backpacker Guide 2026 - Transport, Food, Money, and Safety Tips from Pelangi Capsule Hostel';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Brand colors matching the blog OG images
const amberPrimary = '#b8860b';
const amberLight = '#f5eddb';
const stoneText = '#78716b';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        background: `linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, ${amberLight} 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 'bold', color: amberPrimary }}>
          Pelangi Capsule Hostel
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#ffffff',
            background: '#1e40af',
            padding: '8px 20px',
            borderRadius: '20px',
            fontWeight: '600',
          }}
        >
          Travel Guide
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <h1
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: stoneText,
            margin: 0,
            lineHeight: '1.15',
            maxWidth: '900px',
          }}
        >
          Johor Bahru Backpacker Guide
        </h1>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            fontSize: 20,
            color: '#a8a29e',
          }}
        >
          <span>Transport</span>
          <span>|</span>
          <span>Street Food</span>
          <span>|</span>
          <span>Money Tips</span>
          <span>|</span>
          <span>Safety</span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ fontSize: 18, color: stoneText, opacity: 0.8 }}>
          pelangicapsulehostel.com
        </div>
        <div style={{ fontSize: 14, color: '#a8a29e' }}>
          Taman Pelangi, Johor Bahru
        </div>
      </div>
    </div>,
    { ...size }
  );
}
