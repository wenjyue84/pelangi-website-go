import { events } from '@/data/events';

export default function CommunityEventsStructuredData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= today
  );

  const schemas = upcomingEvents.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: `${event.date}T00:00:00+08:00`,
    endDate: `${event.date}T23:59:59+08:00`,
    description: event.description,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Malaysia',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'MY',
        addressLocality: 'Johor Bahru',
        addressRegion: 'Johor',
      },
    },
    organizer: {
      '@type': 'GovernmentOrganization',
      name: 'Government of Malaysia',
      url: 'https://www.malaysia.gov.my',
    },
  }));

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
