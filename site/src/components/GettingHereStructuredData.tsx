export default function GettingHereStructuredData() {
  const attractions = [
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "@id": "https://pelangicapsulehostel.com/getting-here#ciq",
      "name": "Johor Bahru CIQ (Customs, Immigration & Quarantine)",
      "description":
        "The main Johor Bahru–Singapore land border crossing at Sultan Iskandar Building. Connected to JB Sentral via indoor walkway. Buses CW1/CW2 connect to Kranji MRT in Singapore. MyNIISe QR immigration available for faster processing.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4631,
        "longitude": 103.7644,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sultan Iskandar CIQ Complex, Jalan Jim Quee",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80000",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/getting-here#border-crossing",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "@id": "https://pelangicapsulehostel.com/getting-here#rts-link",
      "name": "JB–Singapore RTS Link (Bukit Chagar Station)",
      "description":
        "The upcoming Johor Bahru–Singapore Rapid Transit System Link station at Bukit Chagar, connecting to Woodlands North MRT in Singapore in approximately 5 minutes. Expected to begin passenger operations by end 2026.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4609,
        "longitude": 103.7612,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bukit Chagar",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80300",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/getting-here#rts-link",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "@id": "https://pelangicapsulehostel.com/getting-here#jb-sentral",
      "name": "JB Sentral",
      "description":
        "Johor Bahru's main railway and transport hub. Connected to the CIQ border complex and the upcoming RTS Link Bukit Chagar station. Intercity KTM trains, buses, and e-hailing services operate from here.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.4614,
        "longitude": 103.7636,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jalan Jim Quee, Bandar Johor Bahru",
        "addressLocality": "Johor Bahru",
        "addressRegion": "Johor",
        "postalCode": "80000",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/getting-here#transport-options",
    },
    {
      "@context": "https://schema.org",
      "@type": ["TouristAttraction", "Place"],
      "@id": "https://pelangicapsulehostel.com/getting-here#senai-airport",
      "name": "Senai International Airport (JHB)",
      "description":
        "Johor Bahru's international airport located 30 km north of the city. Serves AirAsia, Firefly, and regional carriers. Connected to the city by Grab, airport taxi, and shuttle bus to JB Sentral.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 1.6413,
        "longitude": 103.6697,
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Senai International Airport",
        "addressLocality": "Senai",
        "addressRegion": "Johor",
        "postalCode": "81250",
        "addressCountry": "MY",
      },
      "url": "https://pelangicapsulehostel.com/getting-here#transport-options",
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
        "name": "Getting Here",
        "item": "https://pelangicapsulehostel.com/getting-here",
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
