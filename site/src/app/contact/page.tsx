import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Location from "@/components/Location";
import ContactForm from "@/components/ContactForm";
import DuitNowPayment from "@/components/DuitNowPayment";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Pelangi Capsule Hostel Johor Bahru",
    description: "Contact us at Pelangi Capsule Hostel — visit us in Taman Pelangi, JB. WhatsApp, phone, or email for bookings and inquiries.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/contact",
    },
};

export default function ContactPage() {
    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <Header />
            <div className="pt-20">
                <ContactForm />
                <DuitNowPayment compact />
                <section className="py-6 container-custom">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
                            All quoted room rates are subject to{" "}
                            <strong className="text-stone-600 dark:text-stone-300">Service Tax (SST) 8%</strong>{" "}
                            and Tourism Tax (TTx) RM10/room/night for non-Malaysian guests, as required by Malaysian law.
                            Tax rates are subject to change per Malaysian government regulation.
                        </p>
                    </div>
                </section>
                <Location />
            </div>
            <Footer />
        </main>
    );
}
