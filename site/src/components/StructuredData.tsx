import { HOSTELWORLD_RATING } from "@/lib/constants";

const MOTAC_REG_NUMBER = process.env.NEXT_PUBLIC_MOTAC_REG_NUMBER || "";

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
    "priceRange": "$",
    "currenciesAccepted": "MYR",
    "paymentAccepted": "Cash, DuitNow QR, Credit Card",
    "tourBookingPage": "https://pelangicapsulehostel.com/book",
    "hasMap": "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
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
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Luggage Storage",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Laundry Facilities",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "24-hour Reception",
        "value": true
      }
    ],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        "#speakable-tagline",
        "#speakable-location",
        "#speakable-amenities"
      ]
    },
    "touristType": ["Backpackers", "Budget Travelers", "Solo Travelers", "Digital Nomads"],
    "containedInPlace": {
      "@type": "TouristDestination",
      "@id": "https://pelangicapsulehostel.com/guide#jb"
    },
    "email": "pelangicapsulehostel@gmail.com",
    "sameAs": [
      "https://www.google.com/maps/place/Pelangi+Capsule+Hostel/@1.48552,103.7594",
      "https://www.facebook.com/pelangicapsulehostel",
      "https://www.instagram.com/pelangicapsulehostel",
      "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
      "https://www.booking.com/hotel/my/pelangi-hostel-capsule.html",
      "https://www.hostelworld.com/pwa/hosteldetails.php/Pelangi-Capsule-Hostel/Johor-Bahru/317698",
      "https://www.tripadvisor.com/Hotel_Review-g298278-d27125478-Reviews-Pelangi_Capsule_Hostel-Johor_Bahru_Johor_Bahru_District_Johor.html",
      "https://www.agoda.com/en-in/pelangi-hostel-capsule/hotel/johor-bahru-my.html",
      "https://www.trip.com/hotels/johor-bahru-hotel-detail-108654203/pelangi-hostel-capsule/"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Johor Bahru",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Johor, Malaysia"
      }
    },
    "slogan": "Japanese-style capsule pods with Malaysian hospitality",
    "knowsAbout": [
      "Capsule accommodation",
      "Budget travel in Johor Bahru",
      "Singapore-Malaysia border crossing",
      "Taman Pelangi neighbourhood"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": HOSTELWORLD_RATING.ratingValue,
      "bestRating": HOSTELWORLD_RATING.bestRating,
      "worstRating": HOSTELWORLD_RATING.worstRating,
      "reviewCount": HOSTELWORLD_RATING.reviewCount
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "1"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Standard Capsule Pod — Nightly",
        "price": "35",
        "priceCurrency": "MYR",
        "availability": "https://schema.org/InStock",
        "url": "https://pelangicapsulehostel.com/book",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "35",
          "priceCurrency": "MYR",
          "unitText": "night",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "DAY"
          }
        }
      },
      {
        "@type": "Offer",
        "name": "Premium Capsule Pod — Nightly",
        "price": "45",
        "priceCurrency": "MYR",
        "availability": "https://schema.org/InStock",
        "url": "https://pelangicapsulehostel.com/book",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "45",
          "priceCurrency": "MYR",
          "unitText": "night",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "DAY"
          }
        }
      },
      {
        "@type": "Offer",
        "name": "Standard Capsule Pod — Monthly",
        "price": "594",
        "priceCurrency": "MYR",
        "availability": "https://schema.org/InStock",
        "url": "https://pelangicapsulehostel.com/book",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "594",
          "priceCurrency": "MYR",
          "unitText": "month",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "MON"
          }
        }
      },
      {
        "@type": "AggregateOffer",
        "lowPrice": "35",
        "highPrice": "594",
        "priceCurrency": "MYR",
        "offerCount": 3
      }
    ],
    ...(MOTAC_REG_NUMBER ? {
      "identifier": {
        "@type": "PropertyValue",
        "name": "MOTAC Registration",
        "value": MOTAC_REG_NUMBER
      }
    } : {})
  };

  const vacationRentalSchema = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": "https://pelangicapsulehostel.com/#vacation-rental",
    "identifier": "pelangi-capsule-hostel-jb",
    "name": "Pelangi Capsule Hostel",
    "description": "Japanese-style capsule hostel in the heart of Johor Bahru. Affordable, private, and comfortable pods with free WiFi, 24/7 access, hot showers, and personal lockers.",
    "url": "https://pelangicapsulehostel.com",
    "telephone": "+60127088789",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "26A Jalan Perang, Taman Pelangi",
      "addressLocality": "Johor Bahru",
      "addressRegion": "Johor",
      "postalCode": "80400",
      "addressCountry": "MY"
    },
    "latitude": 1.48552,
    "longitude": 103.75940,
    "occupancy": {
      "@type": "QuantitativeValue",
      "value": 24
    },
    "checkinTime": "T14:00:00",
    "checkoutTime": "T12:00:00",
    "image": [
      "https://pelangicapsulehostel.com/images/capsule-1.webp",
      "https://pelangicapsulehostel.com/images/capsule-2.webp",
      "https://pelangicapsulehostel.com/images/capsule-3.webp",
      "https://pelangicapsulehostel.com/images/capsule-4.webp",
      "https://pelangicapsulehostel.com/images/toilet.jpg",
      "https://pelangicapsulehostel.com/images/sink.jpg",
      "https://pelangicapsulehostel.com/images/living-room.jpeg",
      "https://pelangicapsulehostel.com/images/facility-1.webp",
      "https://pelangicapsulehostel.com/images/facility-2.webp",
      "https://pelangicapsulehostel.com/images/exterior-1.webp",
      "https://pelangicapsulehostel.com/images/entrance.jpeg"
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Hot Shower", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Personal Lockers", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Shared Kitchen", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Laundry Facilities", "value": true }
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
    "priceRange": "$",
    "currenciesAccepted": "MYR",
    "paymentAccepted": "Cash, DuitNow QR, Credit Card",
    "tourBookingPage": "https://pelangicapsulehostel.com/book",
    "hasMap": "https://maps.app.goo.gl/maLXetUqYS5MtSLD9"
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pelangi Capsule Hostel",
    "url": "https://pelangicapsulehostel.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pelangicapsulehostel.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vacationRentalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
