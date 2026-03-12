import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/components/Location";
import type { Metadata } from "next";

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: "Contact | Pelangi Capsule Hostel Johor Bahru",
    description: "Contact us at Pelangi Capsule Hostel — visit us in Taman Pelangi, JB. WhatsApp, phone, or email for bookings and inquiries.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/contact",
    },
};

export default function ContactPage() {
    return (
        <main id="main-content" className="min-h-screen">
            <Header />
            <div className="pt-20">
                <Location />
            </div>
            <Footer />
        </main>
    );
}
