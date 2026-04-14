import { cacheLife, cacheTag } from 'next/cache';
import FAQ from './FAQ';
import { faqItems } from '@/data/faq-items';

/**
 * FAQSection — Server Component wrapper around the client FAQ accordion.
 *
 * Caching strategy (US-117):
 *   - cacheLife('days'): FAQ content changes rarely (new questions added infrequently)
 *   - cacheTag('faq'): Allows targeted invalidation via POST /api/revalidate { tag: 'faq' }
 *     without invalidating the whole homepage cache.
 *
 * The RSC payload (client component reference + props) is cached; the
 * interactive accordion still hydrates in the browser on every page load.
 *
 * FAQPage JSON-LD is rendered server-side here so non-JS crawlers and AI
 * agents can index it without executing JavaScript.
 */
export default async function FAQSection() {
  "use cache";
  cacheLife("days");
  cacheTag("faq");

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQ />
    </>
  );
}
