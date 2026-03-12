import { ImageResponse } from 'next/og';
import { blogPosts, getPostBySlug } from '@/data/blog/posts';

export const runtime = 'nodejs';
export const revalidate = 3600; // Cache for 1 hour

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(<div style={{ fontSize: 48, color: '#666' }}>Post not found</div>, {
      width: 1200,
      height: 630,
    });
  }

  // Brand colors: amber (#b8860b / #d4a64c) and stone (#78716b / #a8a29e)
  const amberPrimary = '#b8860b';
  const amberLight = '#f5eddb';
  const stoneText = '#78716b';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        background: `linear-gradient(135deg, ${amberLight} 0%, #ffffff 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header with logo/branding */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 'bold', color: amberPrimary }}>
          🏝️ Pelangi Capsule Hostel
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#ffffff',
            background: amberPrimary,
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: '600',
          }}
        >
          {post.category}
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
        {/* Title */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: stoneText,
            margin: 0,
            lineHeight: '1.2',
            maxWidth: '900px',
          }}
        >
          {post.title}
        </h1>

        {/* Meta info */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            fontSize: 18,
            color: '#a8a29e',
          }}
        >
          <span>📅 {new Date(post.date).toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <span>⏱️ {post.readTime}</span>
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
          Johor Bahru • Malaysia
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
