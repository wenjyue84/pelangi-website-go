import React from 'react';

const reviews = [
    {
        name: "Sarah Jenkins",
        country: "UK",
        rating: 5,
        text: "Absolutey loved the privacy of the pods! The location is perfect, right in the heart of the city but super quiet inside. The staff were incredibly helpful with food recommendations.",
        date: "January 2025",
        dateISO: "2025-01"
    },
    {
        name: "Hiroki Tanaka",
        country: "Japan",
        rating: 5,
        text: "Very clean and organized. It felt just like the capsule hotels back home but with a warmer Malaysian hospitality. Good WiFi for working too.",
        date: "December 2024",
        dateISO: "2024-12"
    },
    {
        name: "Alex & Jordan",
        country: "Australia",
        rating: 5,
        text: "Best hostel we stayed at in Malaysia. The check-in video made arriving late at night stress-free. Beds are super comfy!",
        date: "February 2025",
        dateISO: "2025-02"
    }
];

export default function Reviews() {
    const reviewSchemas = reviews.map((review) => ({
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
            "@type": "Hostel",
            "@id": "https://pelangicapsulehostel.com/#hostel"
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating,
            "bestRating": 5
        },
        "reviewBody": review.text,
        "author": {
            "@type": "Person",
            "name": review.name
        },
        "datePublished": review.dateISO
    }));

    return (
        <section className="py-20 bg-white">
            {reviewSchemas.map((schema, index) => (
                <script
                    key={`review-schema-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-display text-4xl font-medium mb-4 text-stone-900">Guest Love</h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xl font-bold text-stone-900">4.9/5</span>
                        <span className="text-stone-500">(500+ Reviews)</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-stone-50 p-8 rounded-3xl relative">
                            <div className="flex text-amber-400 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-stone-700 mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <h4 className="font-bold text-stone-900">{review.name}</h4>
                                    <p className="text-sm text-stone-500">{review.country}</p>
                                </div>
                                <div className="text-xs text-stone-500 border border-stone-200 px-2 py-1 rounded-full">
                                    Verified Guest
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
