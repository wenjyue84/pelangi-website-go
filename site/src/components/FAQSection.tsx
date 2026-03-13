import { cacheLife, cacheTag } from 'next/cache';
import FAQ from './FAQ';

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
 */
export default async function FAQSection() {
  "use cache";
  cacheLife("days");
  cacheTag("faq");

  return <FAQ />;
}
