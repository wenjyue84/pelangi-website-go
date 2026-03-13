import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import type { Metadata } from "next";

export const experimental_ppr = true;

export const metadata: Metadata = {
    title: "Gallery | Pelangi Capsule Hostel Johor Bahru",
    description: "See photos of Pelangi Capsule Hostel — our modern capsule pods, facilities, common areas, and the Taman Pelangi neighbourhood.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/gallery",
    },
};

const BASE_URL = "https://pelangicapsulehostel.com";

const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Pelangi Capsule Hostel Photo Gallery",
    description: "Photos of Pelangi Capsule Hostel in Johor Bahru — capsule pods, facilities, common areas, and the surrounding Taman Pelangi neighbourhood.",
    url: `${BASE_URL}/gallery`,
    image: [
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/living-room.jpeg`,
            name: "Common Area and Living Room",
            description: "Cozy common area and living room at Pelangi Capsule Hostel Johor Bahru",
            encodingFormat: "image/jpeg",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/capsule-1.webp`,
            name: "Capsule Pod Interior",
            description: "Japanese-style capsule pod interior with privacy features at Pelangi Capsule Hostel JB",
            encodingFormat: "image/webp",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/entrance.jpeg`,
            name: "Hostel Entrance",
            description: "Welcoming entrance of Pelangi Capsule Hostel in Taman Pelangi, Johor Bahru",
            encodingFormat: "image/jpeg",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/exterior.JPG`,
            name: "Hostel Exterior",
            description: "Pelangi Capsule Hostel building exterior in Johor Bahru Malaysia",
            encodingFormat: "image/jpeg",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/capsule-2.webp`,
            name: "Capsule Pod Mattress",
            description: "Comfortable premium mattress in affordable capsule pod near Singapore",
            encodingFormat: "image/webp",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/toilet.jpg`,
            name: "Private Bathroom",
            description: "Clean private bathroom with hot shower at Pelangi Capsule Hostel JB",
            encodingFormat: "image/jpeg",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/facility-heater.jpg`,
            name: "Hot Water Heater Facility",
            description: "24/7 hot water heater facility at Pelangi Capsule Hostel Johor Bahru",
            encodingFormat: "image/jpeg",
        },
        {
            "@type": "ImageObject",
            contentUrl: `${BASE_URL}/images/capsule-3.webp`,
            name: "Capsule Pod Amenities",
            description: "Capsule pod amenities including USB charging port and individual ventilation at Pelangi Hostel",
            encodingFormat: "image/webp",
        },
    ],
};

export default function GalleryPage() {
    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
            />
            <Header />
            <div className="pt-20">
                <Suspense fallback={<div className="container-custom py-16"><div className="h-96 w-full animate-pulse bg-stone-100 dark:bg-stone-800 rounded-xl" /></div>}>
                    <Gallery />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}
