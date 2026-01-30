import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/components/Location";

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-20">
                <Location />
            </div>
            <Footer />
        </main>
    );
}
