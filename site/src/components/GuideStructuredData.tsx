export default function GuideStructuredData() {
  const attractions = [
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "name": "Johor Bahru City Square",
      "description":
        "Major shopping mall in the heart of JB city centre, connected to JB Sentral and the CIQ Customs Immigration complex. Popular with backpackers for affordable shopping, food courts, and money changers.",
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
      "url": "https://pelangicapsulehostel.com/guide#food-shopping",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "name": "Danga Bay",
      "description":
        "Waterfront leisure park along the Straits of Johor with panoramic views of Singapore. Features a night market, seafood restaurants, cycling paths, and themed gardens — a must-visit sunset spot for backpackers.",
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
      "url": "https://pelangicapsulehostel.com/guide",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "name": "KSL City Mall",
      "description":
        "Popular lifestyle mall in Johor Bahru with massage parlors, salons, cinemas, and dining options. Located about 8 minutes by car from Pelangi Capsule Hostel.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4747,
        "longitude": 103.7536,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "33, Jalan Seladang, Taman Abad",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80250",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/guide#food-shopping",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "name": "Arulmigu Raja Mariamman Temple",
      "description":
        "Historic Hindu temple in JB city centre, one of the oldest temples in Johor Bahru. Known for its ornate gopuram tower and vibrant Dravidian architecture — a cultural landmark worth visiting.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4598,
        "longitude": 103.7625,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jalan Ungku Puan, Bandar Johor Bahru",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80000",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/guide",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "name": "Johor Bahru Old Chinese Temple",
      "description":
        "Over 150-year-old Chinese temple in the heart of JB, dedicated to five Chinese deities. A nationally important cultural and heritage site, especially during the annual Chingay parade procession.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4611,
        "longitude": 103.7622,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jalan Trus, Bandar Johor Bahru",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80000",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/guide",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "name": "Jalan Yahya Awal Hawker Centre",
      "description":
        "One of JB's most beloved hawker spots for backpackers — famous for char kway teow, laksa, and cendol. Located a 12-minute walk from Pelangi Capsule Hostel in Taman Pelangi.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4821,
        "longitude": 103.7561,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jalan Yahya Awal, Taman Pelangi",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80400",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/guide#hawkers",
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
        "name": "Guide",
        "item": "https://pelangicapsulehostel.com/guide",
      },
    ],
  };

  return (
    <>
      {attractions.map((attraction, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(attraction) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
