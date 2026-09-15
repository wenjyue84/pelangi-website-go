-- Seed sample comments for the first blog post.
-- Run once against the Neon DATABASE_URL:
--   psql $DATABASE_URL -f seed_comments.sql

INSERT INTO comments (post_slug, author_name, comment_text, ip_address, created_at) VALUES
(
  'singapore-expat-visa-run-johor-bahru-guide-2026',
  'Ravi Shankar',
  'Really helpful guide! I did my visa run last month and the CW1 bus tip saved me a lot of time. Highly recommend checking the queue timing before you go.',
  '0.0.0.0',
  NOW() - INTERVAL '22 days'
),
(
  'singapore-expat-visa-run-johor-bahru-guide-2026',
  'Sarah Lim',
  'Stayed at Pelangi after my visa run — super clean capsules and the location is perfect for getting back to the Causeway quickly. Will be back!',
  '0.0.0.0',
  NOW() - INTERVAL '15 days'
),
(
  'singapore-expat-visa-run-johor-bahru-guide-2026',
  'Ahmad Firdaus',
  'Good writeup. One thing to add: bring some MYR cash for the Causeway Link bus since the machine doesn''t always accept Singapore cards.',
  '0.0.0.0',
  NOW() - INTERVAL '10 days'
),
(
  'singapore-expat-visa-run-johor-bahru-guide-2026',
  'Mei Lin',
  'Didn''t know about the overnight option being cheaper overall. Makes so much sense now. Thanks for laying out the full cost breakdown!',
  '0.0.0.0',
  NOW() - INTERVAL '5 days'
),
(
  'singapore-expat-visa-run-johor-bahru-guide-2026',
  'James Tan',
  'The queue timing advice is gold — I always used to go at the wrong time. Bookmarking this for my next visa run in August.',
  '0.0.0.0',
  NOW() - INTERVAL '2 days'
)
ON CONFLICT DO NOTHING;
