import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Rooms from "@/components/Rooms";
import Facilities from "@/components/Facilities";

export default function RoomsPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-20">
                <Rooms />
                <Facilities />
            </div>
            <Footer />
        </main>
    );
}
