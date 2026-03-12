import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery | Pelangi Capsule Hostel Johor Bahru",
    description: "See photos of Pelangi Capsule Hostel — our modern capsule pods, facilities, common areas, and the Taman Pelangi neighbourhood.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/gallery",
    },
};

export default function GalleryPage() {
    return (
        <main id="main-content" className="min-h-screen">
            <Header />
            <div className="pt-20">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
