import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeFacade from "@/components/YouTubeFacade";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Self Check-in Guide | Pelangi Capsule Hostel",
    description: "Self check-in guide for Pelangi Capsule Hostel. Video tutorial, step-by-step instructions, check-in times, and contact info.",
    alternates: {
        canonical: "https://pelangicapsulehostel.com/check-in",
    },
};

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

export default function CheckInPage() {
    return (
        <main id="main-content" className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(videoSchema),
                }}
            />
            <Header />
            <div className="pt-28 pb-16 container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900">
                            Self Check-in Guide
                        </h1>
                        <p className="text-xl text-stone-600">
                            Welcome to Pelangi Capsule Hostel. Here is how to access your pod.
                        </p>
                    </div>

                    {/* Video Section */}
                    <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl mb-12 relative aspect-video">
                        <YouTubeFacade
                            videoId="6Ux11oBZaQQ"
                            title="Pelangi Capsule Hostel Check-in Guide"
                        />
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                            <h3 className="text-xl font-bold mb-4 text-amber-700">1. Arrival</h3>
                            <p className="text-stone-700 leading-relaxed">
                                When you arrive at <strong>26A Jalan Perang</strong>, look for the door with the Pelangi Capsule Hostel sign.
                                If the door is locked, please use the doorbell or contact us.
                            </p>
                        </div>
                        <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                            <h3 className="text-xl font-bold mb-4 text-amber-700">2. Check-in Times</h3>
                            <ul className="space-y-2 text-stone-700">
                                <li className="flex justify-between">
                                    <span>Check-in:</span>
                                    <span className="font-medium">From 3:00 PM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Check-out:</span>
                                    <span className="font-medium">Before 12:00 PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="text-center space-y-4">
                        <p className="font-medium text-stone-900">Need help getting in?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/60127088789"
                                target="_blank"
                                className="btn-primary flex items-center justify-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                                <span>WhatsApp Jay (+60 12-708 8789)</span>
                            </a>
                            <a
                                href="https://wa.me/60167052004"
                                target="_blank"
                                className="px-8 py-3 bg-white border-2 border-stone-200 text-stone-700 font-medium rounded-full hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
                                <span>WhatsApp Alston (+60 16-705 2004)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
