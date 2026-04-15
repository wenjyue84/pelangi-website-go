import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pay Online | Pelangi Capsule Hostel",
    description: "Pay for your stay at Pelangi Capsule Hostel securely online using a credit card or debit card via PayPal.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/pay",
    },
    robots: {
        index: false,
    },
};

const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/6675966FLY2T4";

export default function PayPage() {
    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <Header />
            <div className="pt-28 pb-20 container-custom">
                <div className="max-w-lg mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-10">
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 mb-3">
                            Secure Online Payment
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl font-medium text-stone-900 dark:text-stone-100 mb-4">
                            Pay for Your Stay
                        </h1>
                        <p className="text-stone-500 dark:text-stone-400">
                            Pelangi Capsule Hostel, Johor Bahru
                        </p>
                    </div>

                    {/* Payment card */}
                    <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden mb-6">

                        {/* PayPal button */}
                        <div className="px-8 py-8">
                            <a
                                href={PAYPAL_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#0070BA] hover:bg-[#005ea6] active:bg-[#003087] text-white font-semibold rounded-2xl transition-colors text-lg shadow-md"
                            >
                                {/* PayPal wordmark SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 124 33"
                                    aria-label="PayPal"
                                    className="h-5 fill-white"
                                >
                                    <path d="M46.2 8.5h-6.8c-.5 0-.9.3-1 .8l-2.7 17.1c-.1.4.2.7.6.7h3.2c.5 0 .9-.3 1-.8l.7-4.5c.1-.5.5-.8 1-.8h2.2c4.5 0 7.1-2.2 7.8-6.5.3-1.9 0-3.3-.8-4.4-.9-1.1-2.4-1.6-4.2-1.6zm.8 6.4c-.4 2.4-2.2 2.4-4 2.4h-1l.7-4.5c0-.3.3-.5.6-.5h.5c1.2 0 2.3 0 2.9.7.4.4.4 1.1.3 1.9zM67.2 14.8h-3.3c-.3 0-.6.2-.6.5l-.2.9-.2-.3c-.7-1-2.2-1.3-3.7-1.3-3.5 0-6.5 2.6-7.1 6.3-.3 1.8.1 3.6 1.2 4.8 1 1.1 2.4 1.6 4.1 1.6 2.8 0 4.4-1.8 4.4-1.8l-.2.9c-.1.4.2.7.6.7h3c.5 0 .9-.3 1-.8l1.8-11.1c-.1-.3-.4-.4-.8-.4zm-4.6 6.1c-.3 1.8-1.7 3-3.5 3-.9 0-1.6-.3-2.1-.8-.5-.6-.7-1.4-.5-2.3.3-1.8 1.7-3 3.5-3 .9 0 1.6.3 2.1.8.5.5.7 1.4.5 2.3zM86.3 14.8h-3.3c-.4 0-.7.2-.9.5l-5.1 7.6-2.2-7.3c-.1-.5-.6-.8-1-.8h-3.2c-.4 0-.7.4-.6.8l4.1 12.1-3.9 5.5c-.3.4 0 .9.5.9h3.3c.4 0 .7-.2.9-.5l12.5-18c.3-.4 0-.8-.4-.8h-.7z" />
                                    <path d="M100.5 8.5h-6.8c-.5 0-.9.3-1 .8l-2.7 17.1c-.1.4.2.7.6.7h3.5c.3 0 .6-.2.7-.6l.8-4.8c.1-.5.5-.8 1-.8h2.2c4.5 0 7.1-2.2 7.8-6.5.3-1.9 0-3.3-.8-4.4-.9-1.1-2.4-1.6-4.3-1.5zm.8 6.4c-.4 2.4-2.2 2.4-4 2.4h-1l.7-4.5c0-.3.3-.5.6-.5h.5c1.2 0 2.3 0 2.9.7.3.4.4 1.1.3 1.9zM121.4 14.8h-3.3c-.3 0-.6.2-.6.5l-.2.9-.2-.3c-.7-1-2.2-1.3-3.7-1.3-3.5 0-6.5 2.6-7.1 6.3-.3 1.8.1 3.6 1.2 4.8 1 1.1 2.4 1.6 4.1 1.6 2.8 0 4.4-1.8 4.4-1.8l-.2.9c-.1.4.2.7.6.7h3c.5 0 .9-.3 1-.8l1.8-11.1c0-.3-.3-.4-.8-.4zm-4.6 6.1c-.3 1.8-1.7 3-3.5 3-.9 0-1.6-.3-2.1-.8-.5-.6-.7-1.4-.5-2.3.3-1.8 1.7-3 3.5-3 .9 0 1.6.3 2.1.8.5.5.7 1.4.5 2.3zM128.5 8.8l-2.8 17.6c-.1.4.2.7.6.7h2.9c.5 0 .9-.3 1-.8l2.8-17.1c.1-.4-.2-.7-.6-.7h-3.2c-.4 0-.6.1-.7.3z" />
                                    <path d="M9.8 33l.5-3.3-.1-2.4H4L0 0h7.7c2.5 0 4.6.2 6.3 1.5 1.7 1.3 2.4 3.2 2.1 5.8-.6 4-3.5 6.3-8.1 6.3H5.5L4 21.5h5l.8-3.7 5.7-6.6 3.5 21.8H9.8z" />
                                </svg>
                                Pay Now
                            </a>

                            <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-4">
                                You will be redirected to PayPal&apos;s secure payment page.
                                Visa, Mastercard, and all major debit/credit cards accepted.
                            </p>
                        </div>
                    </div>

                    {/* Trust note */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl px-6 py-5">
                        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium mb-1">After payment</p>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                            Screenshot your PayPal receipt and send it to us on WhatsApp to confirm your booking:{" "}
                            <a
                                href="https://wa.me/60127088789"
                                className="font-medium text-amber-700 dark:text-amber-400 underline underline-offset-2"
                            >
                                Jay +60 12-708 8789
                            </a>{" "}
                            or{" "}
                            <a
                                href="https://wa.me/60167052004"
                                className="font-medium text-amber-700 dark:text-amber-400 underline underline-offset-2"
                            >
                                Alston +60 16-705 2004
                            </a>
                        </p>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
