import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Rooms from "@/components/Rooms";
import Facilities from "@/components/Facilities";

export const metadata: Metadata = {
    title: "Capsule Pod Rooms | Pelangi Capsule Hostel JB",
    description:
        "Private capsule pods from RM35/night in Taman Pelangi, Johor Bahru. Personal climate control, USB charging, LED lighting, and personal locker included.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/rooms",
    },
};

const containedInPlace = {
    "@type": "Hostel",
    name: "Pelangi Capsule Hostel",
    url: "https://pelangicapsulehostel.com",
};

const hotelRoomsSchema = [
    {
        "@context": "https://schema.org",
        "@type": ["HotelRoom", "Product"],
        name: "Standard Capsule Pod",
        description:
            "Private Japanese-style capsule pod with personal climate control, adjustable LED lighting, USB and power outlets, privacy sliding door, premium mattress, and personal locker. Free high-speed WiFi included.",
        url: "https://pelangicapsulehostel.com/rooms",
        image: "https://pelangicapsulehostel.com/images/capsule-4.webp",
        containedInPlace,
        occupancy: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 1,
            unitText: "persons",
        },
        amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Personal Climate Control", value: true },
            { "@type": "LocationFeatureSpecification", name: "Adjustable LED Lighting", value: true },
            { "@type": "LocationFeatureSpecification", name: "USB & Power Outlets", value: true },
            { "@type": "LocationFeatureSpecification", name: "Privacy Sliding Door", value: true },
            { "@type": "LocationFeatureSpecification", name: "Premium Mattress", value: true },
            { "@type": "LocationFeatureSpecification", name: "Personal Locker", value: true },
            { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
        ],
        offers: [
            {
                "@type": "Offer",
                price: "35",
                priceCurrency: "MYR",
                businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
                description: "Nightly rate",
                unitCode: "DAY",
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "35",
                    priceCurrency: "MYR",
                    unitText: "night",
                    referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: 1,
                        unitCode: "DAY",
                    },
                },
            },
            {
                "@type": "Offer",
                price: "594",
                priceCurrency: "MYR",
                businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
                description: "Monthly rate",
                unitCode: "MON",
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "594",
                    priceCurrency: "MYR",
                    unitText: "month",
                    referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: 1,
                        unitCode: "MON",
                    },
                },
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": ["HotelRoom", "Product"],
        name: "Premium Capsule Pod",
        description:
            "Premium private capsule pod with enhanced comfort features, personal climate control, adjustable LED lighting, USB and power outlets, privacy sliding door, premium mattress, and personal locker. Free high-speed WiFi included.",
        url: "https://pelangicapsulehostel.com/rooms",
        image: "https://pelangicapsulehostel.com/images/capsule-2.webp",
        containedInPlace,
        occupancy: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 1,
            unitText: "persons",
        },
        amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Personal Climate Control", value: true },
            { "@type": "LocationFeatureSpecification", name: "Adjustable LED Lighting", value: true },
            { "@type": "LocationFeatureSpecification", name: "USB & Power Outlets", value: true },
            { "@type": "LocationFeatureSpecification", name: "Privacy Sliding Door", value: true },
            { "@type": "LocationFeatureSpecification", name: "Premium Mattress", value: true },
            { "@type": "LocationFeatureSpecification", name: "Personal Locker", value: true },
            { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
        ],
        offers: [
            {
                "@type": "Offer",
                price: "45",
                priceCurrency: "MYR",
                businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
                description: "Nightly rate",
                unitCode: "DAY",
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: "45",
                    priceCurrency: "MYR",
                    unitText: "night",
                    referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: 1,
                        unitCode: "DAY",
                    },
                },
            },
        ],
    },
];

export default function RoomsPage() {
    return (
        <main id="main-content" className="min-h-screen">
            {hotelRoomsSchema.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <Header />
            <div className="pt-20">
                <Rooms />
                <Facilities />
            </div>
            <Footer />
        </main>
    );
}
