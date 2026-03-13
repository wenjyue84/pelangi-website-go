export default function StructuredData() {
  const hostelSchema = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    "@id": "https://pelangicapsulehostel.com/#hostel",
    "name": "Pelangi Capsule Hostel",
    "image": [
      "https://pelangicapsulehostel.com/images/hero-main.webp",
      "https://pelangicapsulehostel.com/images/capsule-1.webp",
      "https://pelangicapsulehostel.com/images/capsule-2.webp",
      "https://pelangicapsulehostel.com/images/exterior-1.webp"
    ],
    "description": "Japanese-style capsule hostel in the heart of Johor Bahru. Affordable, private, and comfortable pods with free WiFi, 24/7 access, hot showers, and personal lockers. Perfect budget accommodation for travelers exploring JB and Singapore.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "26A Jalan Perang, Taman Pelangi",
      "addressLocality": "Johor Bahru",
      "addressRegion": "Johor",
      "postalCode": "80400",
      "addressCountry": "MY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.48552,
      "longitude": 103.75940
    },
    "url": "https://pelangicapsulehostel.com",
    "telephone": "+60127088789",
    "priceRange": "RM35-RM55",
    "currenciesAccepted": "MYR",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "checkinTime": "T14:00:00",
    "checkoutTime": "T12:00:00",
    "numberOfRooms": 24,
    "petsAllowed": false,
    "availableLanguage": [
      {
        "@type": "Language",
        "name": "English"
      },
      {
        "@type": "Language",
        "name": "Chinese"
      }
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "24/7 Access",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Hot Shower",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Personal Lockers",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Shared Kitchen",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Water Dispenser",
        "value": true
      }
    ],
    "containedInPlace": {
      "@type": "TouristDestination",
      "@id": "https://pelangicapsulehostel.com/guide#jb"
    },
    "sameAs": [
      "https://www.facebook.com/pelangicapsulehostel",
      "https://www.instagram.com/pelangicapsulehostel",
      "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
      "https://www.booking.com/hotel/my/pelangi-hostel-capsule.html",
      "https://www.hostelworld.com/pwa/hosteldetails.php/Pelangi-Capsule-Hostel/Johor-Bahru/317698",
      "https://www.tripadvisor.com/Hotel_Review-g298278-d27125478-Reviews-Pelangi_Capsule_Hostel-Johor_Bahru_Johor_Bahru_District_Johor.html",
      "https://www.agoda.com/en-in/pelangi-hostel-capsule/hotel/johor-bahru-my.html"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pelangi Capsule Hostel",
    "image": "https://pelangicapsulehostel.com/images/hero-main.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "26A Jalan Perang, Taman Pelangi",
      "addressLocality": "Johor Bahru",
      "addressRegion": "Johor",
      "postalCode": "80400",
      "addressCountry": "MY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.48552,
      "longitude": 103.75940
    },
    "url": "https://pelangicapsulehostel.com",
    "telephone": "+60127088789",
    "priceRange": "RM35-RM55"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pelangicapsulehostel.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hostelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
