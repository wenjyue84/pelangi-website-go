import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

export default function GalleryPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-20">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
