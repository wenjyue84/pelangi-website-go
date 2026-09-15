export default function VisitMalaysia2026StructuredData() {
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Visit Malaysia Year 2026 — Pelangi Capsule Hostel Campaign Rates",
        "description":
            "Celebrate Visit Malaysia Year 2026 with budget-friendly capsule hostel accommodation in Johor Bahru. Nightly rates from RM35 (RM30 for a first-time guest's first night), weekly from RM210, monthly from RM600. Book directly for best rate guarantee.",
        "startDate": "2026-01-01T00:00:00+08:00",
        "endDate": "2026-12-31T23:59:59+08:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode":
            "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": "Pelangi Capsule Hostel",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "26A Jalan Perang, Taman Pelangi",
                "addressLocality": "Johor Bahru",
                "addressRegion": "Johor",
                "postalCode": "80400",
                "addressCountry": "MY",
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.48552,
                "longitude": 103.7594,
            },
        },
        "organizer": {
            "@type": "LodgingBusiness",
            "name": "Pelangi Capsule Hostel",
            "url": "https://pelangicapsulehostel.com",
        },
        "offers": [
            {
                "@type": "Offer",
                "name": "Nightly Stay",
                "price": "35",
                "priceCurrency": "MYR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01",
                "validThrough": "2026-12-31",
                "url": "https://pelangicapsulehostel.com/book",
            },
            {
                "@type": "Offer",
                "name": "Weekly Explorer",
                "price": "210",
                "priceCurrency": "MYR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01",
                "validThrough": "2026-12-31",
                "url": "https://pelangicapsulehostel.com/book",
            },
            {
                "@type": "Offer",
                "name": "Monthly Nomad",
                "price": "600",
                "priceCurrency": "MYR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01",
                "validThrough": "2026-12-31",
                "url": "https://pelangicapsulehostel.com/book",
            },
        ],
    };

    const attractions = [
        {
            "@context": "https://schema.org",
            "@type": ["TouristAttraction", "Place"],
            "@id": "https://pelangicapsulehostel.com/visit-malaysia-2026#city-square",
            "name": "Johor Bahru City Square",
            "description":
                "Major shopping mall in the heart of JB city centre, connected to JB Sentral and the CIQ border checkpoint. Popular with backpackers for affordable shopping, food courts, and money changers.",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.4614,
                "longitude": 103.7636,
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "108, Jalan Wong Ah Fook",
                "addressLocality": "Johor Bahru",
                "addressRegion": "Johor",
                "postalCode": "80000",
                "addressCountry": "MY",
            },
            "url": "https://pelangicapsulehostel.com/visit-malaysia-2026#attractions",
        },
        {
            "@context": "https://schema.org",
            "@type": ["TouristAttraction", "Place"],
            "@id": "https://pelangicapsulehostel.com/visit-malaysia-2026#glass-temple",
            "name": "Arulmigu Sri Rajakaliamman Glass Temple",
            "description":
                "The world's first and only Hindu glass temple in Johor Bahru, with over 300,000 pieces of glass adorning the walls, ceiling, and pillars. A breathtaking cultural landmark.",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.4641,
                "longitude": 103.7573,
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "22, Jalan Temenggong, Kampung Bahru",
                "addressLocality": "Johor Bahru",
                "addressRegion": "Johor",
                "postalCode": "80100",
                "addressCountry": "MY",
            },
            "url": "https://pelangicapsulehostel.com/visit-malaysia-2026#attractions",
        },
        {
            "@context": "https://schema.org",
            "@type": ["TouristAttraction", "Place"],
            "@id": "https://pelangicapsulehostel.com/visit-malaysia-2026#danga-bay",
            "name": "Danga Bay Waterfront",
            "description":
                "Waterfront leisure park along the Straits of Johor with panoramic views of Singapore. Features a night market, seafood restaurants, cycling paths, and themed gardens.",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.4672,
                "longitude": 103.7277,
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jalan Skudai, Danga Bay",
                "addressLocality": "Johor Bahru",
                "addressRegion": "Johor",
                "postalCode": "80200",
                "addressCountry": "MY",
            },
            "url": "https://pelangicapsulehostel.com/visit-malaysia-2026#attractions",
        },
        {
            "@context": "https://schema.org",
            "@type": ["TouristAttraction", "Place"],
            "@id": "https://pelangicapsulehostel.com/visit-malaysia-2026#sultan-mosque",
            "name": "Sultan Abu Bakar State Mosque",
            "description":
                "One of Malaysia's most stunning mosques, blending Victorian architecture with Moorish design. Overlooking the Straits of Johor with sweeping coastal views.",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.4571,
                "longitude": 103.7602,
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jalan Gertak Merah",
                "addressLocality": "Johor Bahru",
                "addressRegion": "Johor",
                "postalCode": "80000",
                "addressCountry": "MY",
            },
            "url": "https://pelangicapsulehostel.com/visit-malaysia-2026#attractions",
        },
        {
            "@context": "https://schema.org",
            "@type": ["TouristAttraction", "Place"],
            "@id": "https://pelangicapsulehostel.com/visit-malaysia-2026#taman-pelangi-night-market",
            "name": "Taman Pelangi Night Market",
            "description":
                "Weekly night market in Taman Pelangi with satay, grilled corn, rojak, local kuih, and buzzing street food atmosphere. A true Johor Bahru experience.",
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.4852,
                "longitude": 103.7581,
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jalan Kuning, Taman Pelangi",
                "addressLocality": "Johor Bahru",
                "addressRegion": "Johor",
                "postalCode": "80400",
                "addressCountry": "MY",
            },
            "url": "https://pelangicapsulehostel.com/visit-malaysia-2026#attractions",
        },
    ];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://pelangicapsulehostel.com",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Visit Malaysia 2026",
                "item": "https://pelangicapsulehostel.com/visit-malaysia-2026",
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />
            {attractions.map((attraction, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(attraction),
                    }}
                />
            ))}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </>
    );
}
