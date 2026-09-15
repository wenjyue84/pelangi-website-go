import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Rooms from "@/components/Rooms";
import RoomCardSkeleton from "@/components/RoomCardSkeleton";
import Facilities from "@/components/Facilities";
import RoomsEcommerceTracker from "@/components/RoomsEcommerceTracker";
import PhotoGallery from "@/components/PhotoGallery";
import ShareButton from "@/components/ShareButton";
import { ROOM_TYPES } from "@/data/rooms";
export const metadata: Metadata = {
    title: "Capsule Pod Rooms | Pelangi Capsule Hostel JB",
    description:
        "Private capsule pods from RM35/night in Taman Pelangi, Johor Bahru. Personal climate control, USB charging, LED lighting, and personal locker included.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/rooms",
    },
    openGraph: {
        title: "Capsule Pod Rooms | Pelangi Capsule Hostel JB",
        description:
            "Private capsule pods from RM35/night in Taman Pelangi, Johor Bahru. Personal climate control, USB charging, LED lighting, and personal locker included.",
        type: "website",
        url: "https://pelangicapsulehostel.com/rooms",
        images: [
            {
                url: "/rooms/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Pelangi Capsule Hostel - Private Capsule Pod Rooms from RM35 per night in Johor Bahru",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Capsule Pod Rooms | Pelangi Capsule Hostel JB",
        description:
            "Private capsule pods from RM35/night in Taman Pelangi, Johor Bahru. Personal climate control, USB charging, LED lighting, and personal locker included.",
        images: ["/rooms/opengraph-image"],
    },
    other: {
        "og:price:amount": "35",
        "og:price:currency": "MYR",
        "product:price:amount": "35",
        "product:price:currency": "MYR",
    },
};

const containedInPlace = {
    "@type": "Hostel",
    name: "Pelangi Capsule Hostel",
    url: "https://pelangicapsulehostel.com",
};

const seller = {
    "@type": "Hostel",
    "@id": "https://pelangicapsulehostel.com/#hostel",
    name: "Pelangi Capsule Hostel",
};

const priceValidUntil = new Date(
    new Date().getFullYear() + 1,
    new Date().getMonth(),
    new Date().getDate()
).toISOString().split("T")[0];

// Shared pod features — identical across both pod types.
const podAmenityFeature = [
    { "@type": "LocationFeatureSpecification", name: "Personal Climate Control", value: true },
    { "@type": "LocationFeatureSpecification", name: "Adjustable LED Lighting", value: true },
    { "@type": "LocationFeatureSpecification", name: "USB & Power Outlets", value: true },
    { "@type": "LocationFeatureSpecification", name: "Privacy Sliding Door", value: true },
    { "@type": "LocationFeatureSpecification", name: "Premium Mattress", value: true },
    { "@type": "LocationFeatureSpecification", name: "Personal Locker", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
];

// Pod hero image per room id (falls back to a generic capsule photo).
const roomImageById: Record<string, string> = {
    "lower-deck-pod": "https://pelangicapsulehostel.com/images/capsule-4.webp",
    "upper-deck-pod": "https://pelangicapsulehostel.com/images/capsule-2.webp",
};

// HotelRoom/Product schema is generated from ROOM_TYPES (the same source
// StructuredData.tsx uses) so room names and prices stay consistent everywhere.
const hotelRoomsSchema = ROOM_TYPES.map((room) => {
    const offers: Record<string, unknown>[] = [
        {
            "@type": "Offer",
            price: String(room.nightlyRate),
            priceCurrency: room.currency,
            availability: "https://schema.org/InStock",
            seller,
            priceValidUntil,
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            description: "Nightly rate",
            unitCode: "DAY",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: String(room.nightlyRate),
                priceCurrency: room.currency,
                unitText: "night",
                referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: 1,
                    unitCode: "DAY",
                },
            },
        },
    ];

    if (room.monthlyRate) {
        offers.push({
            "@type": "Offer",
            price: String(room.monthlyRate),
            priceCurrency: room.currency,
            availability: "https://schema.org/InStock",
            seller,
            priceValidUntil,
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            description: "Monthly rate",
            unitCode: "MON",
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: String(room.monthlyRate),
                priceCurrency: room.currency,
                unitText: "month",
                referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: 1,
                    unitCode: "MON",
                },
            },
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": ["HotelRoom", "Product"],
        name: room.name,
        description: room.description,
        url: "https://pelangicapsulehostel.com/rooms",
        image: roomImageById[room.id] ?? "https://pelangicapsulehostel.com/images/capsule-1.webp",
        containedInPlace,
        checkinTime: "T15:00:00",
        checkoutTime: "T12:00:00",
        occupancy: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: room.maxOccupancy,
            unitText: "persons",
        },
        amenityFeature: podAmenityFeature,
        offers,
    };
});

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
            "name": "Rooms",
            "item": "https://pelangicapsulehostel.com/rooms",
        },
    ],
};

const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Capsule Pod Rooms | Pelangi Capsule Hostel JB",
    "url": "https://pelangicapsulehostel.com/rooms",
    "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#speakable-price"],
    },
};

export default async function RoomsPage() {
    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            {hotelRoomsSchema.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
            />
            <Header />
            <div className="pt-20">
                <Suspense fallback={<RoomCardSkeleton />}>
                    <Rooms />
                </Suspense>

                <PhotoGallery />

                {/* AI Overviews: concise factual paragraph for pod price and feature queries */}
                <section className="py-16 bg-stone-50 dark:bg-stone-950">
                    <div className="container-custom max-w-3xl">
                        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                            <h2 className="font-display text-3xl font-medium text-stone-900 dark:text-stone-100">
                                Capsule Pod Pricing &amp; Features
                            </h2>
                            <ShareButton
                                title="Capsule Pod Rooms | Pelangi Capsule Hostel JB"
                                text="Private capsule pods from RM35/night in Taman Pelangi, Johor Bahru."
                                url="https://pelangicapsulehostel.com/rooms"
                            />
                        </div>
                        <div id="speakable-price" className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed space-y-4">
                            <p>
                                Pelangi Capsule Hostel offers two pod types in Taman Pelangi, Johor Bahru. Both Upper Deck and Lower Deck Pods are RM35 per night, flat rate — first-time guests pay RM30 for the first night. Monthly long-stay rates begin at RM600 per month (Upper Deck) or RM650 per month (Lower Deck).
                            </p>
                            <p>
                                Every pod includes a lockable sliding privacy door, personal climate control (fan and air-conditioning), adjustable LED lighting, USB and power outlets, a premium mattress, and a personal locker. Shared facilities include free high-speed WiFi, hot showers, a fully equipped kitchen, a water dispenser, laundry facilities, and luggage storage. The hostel operates 24/7 with self-check-in access and CCTV security throughout the property.
                            </p>
                            <p>
                                New to pod stays? Read our <a href="/blog/capsule-hostel-johor-bahru-complete-guide" className="text-amber-700 dark:text-amber-400 hover:underline">complete guide to capsule hostels in Johor Bahru</a> for what to expect, how to choose one, and why Taman Pelangi is the smartest base.
                            </p>
                        </div>
                    </div>
                </section>

                <Facilities />
            </div>
            <Footer />
            <RoomsEcommerceTracker />
        </main>
    );
}
