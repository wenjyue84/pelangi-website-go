import { HOSTELWORLD_RATING } from "@/lib/constants";
import { ROOM_TYPES, PROPERTY } from "@/data/rooms";

export default function StructuredData() {
  const hostelSchema = {
    "@context": "https://schema.org",
    "@type": ["Hostel", "Hotel", "LodgingBusiness"],
    "@id": "https://pelangicapsulehostel.com/#hostel",
    "name": "Pelangi Capsule Hostel",
    "alternateName": ["彩虹胶囊旅舍", "Pelangi Hostel Capsule"],
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
    "checkinTime": "T15:00:00",
    "checkoutTime": "T12:00:00",
    "numberOfRooms": PROPERTY.totalRooms,
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
      ...ROOM_TYPES.map((room) => ({
        "@type": "Offer" as const,
        "name": `${room.name} — Nightly`,
        "price": String(room.nightlyRate),
        "priceCurrency": room.currency,
        "availability": "https://schema.org/InStock",
        "url": "https://pelangicapsulehostel.com/book",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": String(room.nightlyRate),
          "priceCurrency": room.currency,
          "unitText": "night",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "DAY",
          },
        },
      })),
      ...ROOM_TYPES.filter((r) => r.monthlyRate).map((room) => ({
        "@type": "Offer" as const,
        "name": `${room.name} — Monthly`,
        "price": String(room.monthlyRate),
        "priceCurrency": room.currency,
        "availability": "https://schema.org/InStock",
        "url": "https://pelangicapsulehostel.com/book",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": String(room.monthlyRate),
          "priceCurrency": room.currency,
          "unitText": "month",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": 1,
            "unitCode": "MON",
          },
        },
      })),
      {
        "@type": "AggregateOffer",
        "lowPrice": String(Math.min(...ROOM_TYPES.map((r) => r.nightlyRate))),
        "highPrice": String(Math.max(...ROOM_TYPES.map((r) => r.monthlyRate ?? r.nightlyRate))),
        "priceCurrency": "MYR",
        "offerCount": ROOM_TYPES.length + ROOM_TYPES.filter((r) => r.monthlyRate).length,
      },
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pelangicapsulehostel.com/book?checkin={checkin_date}&checkout={checkout_date}&guests={num_guests}",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "LodgingReservation",
        "name": "Pod Reservation"
      }
    }
  };

  const vacationRentalSchema = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": "https://pelangicapsulehostel.com/#vacation-rental",
    "mainEntityOfPage": { "@id": "https://pelangicapsulehostel.com/#hostel" },
    "sameAs": "https://pelangicapsulehostel.com/#hostel",
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
    "checkinTime": "T15:00:00",
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
    "@id": "https://pelangicapsulehostel.com/#local-business",
    "mainEntityOfPage": { "@id": "https://pelangicapsulehostel.com/#hostel" },
    "sameAs": "https://pelangicapsulehostel.com/#hostel",
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://pelangicapsulehostel.com/#organization",
    "name": "Pelangi Capsule Hostel",
    "alternateName": ["彩虹胶囊旅舍", "Pelangi Hostel Capsule"],
    "url": "https://pelangicapsulehostel.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pelangicapsulehostel.com/images/logo.png"
    },
    "image": "https://pelangicapsulehostel.com/images/hero-main.webp",
    "foundingDate": "2023",
    "founder": {
      "@type": "Person",
      "@id": "https://pelangicapsulehostel.com/author/jay-lew#person",
      "name": "Jay Lew"
    },
    "email": "pelangicapsulehostel@gmail.com",
    "telephone": "+60127088789",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "26A Jalan Perang, Taman Pelangi",
      "addressLocality": "Johor Bahru",
      "addressRegion": "Johor",
      "postalCode": "80400",
      "addressCountry": "MY"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+60127088789",
      "contactType": "Reservations",
      "availableLanguage": ["English", "Chinese", "Malay"],
      "areaServed": "MY"
    },
    "sameAs": [
      "https://www.facebook.com/pelangicapsulehostel",
      "https://www.instagram.com/pelangicapsulehostel",
      "https://maps.app.goo.gl/maLXetUqYS5MtSLD9",
      "https://www.booking.com/hotel/my/pelangi-hostel-capsule.html",
      "https://www.hostelworld.com/pwa/hosteldetails.php/Pelangi-Capsule-Hostel/Johor-Bahru/317698",
      "https://www.tripadvisor.com/Hotel_Review-g298278-d27125478-Reviews-Pelangi_Capsule_Hostel-Johor_Bahru_Johor_Bahru_District_Johor.html",
      "https://www.agoda.com/en-in/pelangi-hostel-capsule/hotel/johor-bahru-my.html",
      "https://www.trip.com/hotels/johor-bahru-hotel-detail-108654203/pelangi-hostel-capsule/"
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://pelangicapsulehostel.com/#website",
    "name": "Pelangi Capsule Hostel",
    "url": "https://pelangicapsulehostel.com",
    "publisher": { "@id": "https://pelangicapsulehostel.com/#organization" },
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

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        "name": "About",
        "url": "https://pelangicapsulehostel.com/about"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Rooms",
        "url": "https://pelangicapsulehostel.com/rooms"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Gallery",
        "url": "https://pelangicapsulehostel.com/gallery"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Location",
        "url": "https://pelangicapsulehostel.com/location"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Check-in Guide",
        "url": "https://pelangicapsulehostel.com/check-in"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Book Now",
        "url": "https://pelangicapsulehostel.com/book"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />
    </>
  );
}
