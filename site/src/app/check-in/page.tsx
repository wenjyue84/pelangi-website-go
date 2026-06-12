import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeFacade from "@/components/YouTubeFacade";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Self Check-in Guide | Pelangi Capsule Hostel",
    description: "Step-by-step self check-in guide for Pelangi Capsule Hostel in Johor Bahru. Learn how to arrive, access the building, find your pod, and settle in — takes about 5 minutes.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/check-in",
    },
};

const checkInSteps = [
    {
        id: "arrive",
        name: "Arrive at the Hostel",
        text: "Head to 26A Jalan Perang, Taman Pelangi, Johor Bahru. Look for the building with the Pelangi Capsule Hostel sign near the main entrance. The hostel is a short walk from Taman Pelangi's restaurants and convenience stores.",
    },
    {
        id: "enter-building",
        name: "Enter the Building",
        text: "Use the door access code sent to you via WhatsApp after booking confirmation. Enter the code on the digital keypad to unlock the front door. If the door does not open, press the doorbell or WhatsApp us for immediate assistance.",
    },
    {
        id: "find-pod",
        name: "Find Your Assigned Pod",
        text: "Check your booking confirmation message for your pod number. Pods are clearly numbered inside the hostel. Head to your assigned pod — your personal locker is located next to it.",
    },
    {
        id: "store-belongings",
        name: "Store Your Belongings",
        text: "Use the personal locker beside your pod to store your valuables and luggage. Set your own combination on the locker. Keep the locker locked whenever you leave the hostel.",
    },
    {
        id: "connect-wifi",
        name: "Connect to Free WiFi",
        text: "Connect to the hostel WiFi network. The network name and password are displayed on the common area notice board and inside each pod. Enjoy unlimited free high-speed internet during your stay.",
    },
    {
        id: "enjoy-stay",
        name: "Explore Facilities and Enjoy Your Stay",
        text: "The shared kitchen, hot showers, water dispenser, and laundry facilities are available 24/7. Check-out is before 12:00 PM — simply leave your pod tidy, clear your locker, and head out. No formal check-out process needed.",
    },
];

const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Pelangi Capsule Hostel – Self Check-in Guide",
    "description":
        "Step-by-step video tutorial showing how to self check-in at Pelangi Capsule Hostel in Johor Bahru, Malaysia. Covers arrival, door access, pod assignment, and Wi-Fi setup.",
    "thumbnailUrl":
        "https://img.youtube.com/vi/6Ux11oBZaQQ/maxresdefault.jpg",
    "uploadDate": "2024-11-01",
    "duration": "PT3M20S",
    "embedUrl": "https://www.youtube.com/embed/6Ux11oBZaQQ",
    "contentUrl": "https://www.youtube.com/watch?v=6Ux11oBZaQQ",
    "publisher": {
        "@type": "Organization",
        "name": "Pelangi Capsule Hostel",
        "logo": {
            "@type": "ImageObject",
            "url": "https://pelangicapsulehostel.com/images/logo.webp",
        },
    },
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Self Check-in at Pelangi Capsule Hostel",
    "description": "A step-by-step guide for guests to self check-in at Pelangi Capsule Hostel in Johor Bahru, Malaysia. No front desk interaction required — use your door code, find your pod, and settle in within 5 minutes.",
    "totalTime": "PT5M",
    "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "MYR",
        "value": "0",
    },
    "step": checkInSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
        "url": `https://pelangicapsulehostel.com/check-in#${step.id}`,
    })),
    "video": {
        "@type": "VideoObject",
        "name": "Pelangi Capsule Hostel – Self Check-in Guide",
        "description": "Step-by-step video tutorial showing how to self check-in at Pelangi Capsule Hostel.",
        "thumbnailUrl": "https://img.youtube.com/vi/6Ux11oBZaQQ/maxresdefault.jpg",
        "uploadDate": "2024-11-01",
        "duration": "PT3M20S",
        "embedUrl": "https://www.youtube.com/embed/6Ux11oBZaQQ",
        "contentUrl": "https://www.youtube.com/watch?v=6Ux11oBZaQQ",
    },
};

export default function CheckInPage() {
    return (
        <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(videoSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(howToSchema),
                }}
            />
            <Header />
            <div className="pt-28 pb-16 container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900 dark:text-stone-100">
                            Self Check-in Guide
                        </h1>
                        <p className="text-xl text-stone-600 dark:text-stone-400">
                            Welcome to Pelangi Capsule Hostel. Follow these simple steps to access your pod — no front desk needed.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-stone-500 dark:text-stone-400">
                            <span className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                About 5 minutes
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                Free (no extra cost)
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                Check-in from 3:00 PM
                            </span>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl mb-12 relative aspect-video">
                        <YouTubeFacade
                            videoId="6Ux11oBZaQQ"
                            title="Pelangi Capsule Hostel Check-in Guide"
                        />
                    </div>

                    {/* Step-by-step Instructions */}
                    <h2 className="font-display text-2xl md:text-3xl font-medium mb-8 text-stone-900 dark:text-stone-100">
                        Step-by-Step Instructions
                    </h2>
                    <ol className="space-y-6 mb-16">
                        {checkInSteps.map((step, index) => (
                            <li
                                key={step.id}
                                id={step.id}
                                className="bg-white dark:bg-stone-900 p-6 md:p-8 rounded-2xl border border-stone-100 dark:border-stone-700 flex gap-5"
                            >
                                <span
                                    className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-lg"
                                    aria-hidden="true"
                                >
                                    {index + 1}
                                </span>
                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-amber-700 dark:text-amber-400">
                                        {step.name}
                                    </h3>
                                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                                        {step.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    {/* Check-in/out times */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 md:p-8 mb-12">
                        <h2 className="text-lg font-bold mb-4 text-amber-800 dark:text-amber-300">Check-in &amp; Check-out Times</h2>
                        <ul className="space-y-2 text-stone-700 dark:text-stone-300">
                            <li className="flex justify-between max-w-xs">
                                <span>Check-in:</span>
                                <span className="font-medium">From 3:00 PM</span>
                            </li>
                            <li className="flex justify-between max-w-xs">
                                <span>Check-out:</span>
                                <span className="font-medium">Before 12:00 PM</span>
                            </li>
                        </ul>
                        <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
                            Early check-in or late check-out may be available — WhatsApp us to arrange.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="text-center space-y-4">
                        <p className="font-medium text-stone-900 dark:text-stone-100">Need help getting in?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/60127088789"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex items-center justify-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                >
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                                <span>WhatsApp Jay (+60 12-708 8789)</span>
                            </a>
                            <a
                                href="https://wa.me/60167620815"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-full hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                >
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                                <span>WhatsApp Alston (+60 16-762 0815)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
