'use client';
import React, { useState } from 'react';

const faqs = [
    {
        question: "What time is check-in and check-out?",
        answer: "Check-in is from 3:00 PM onwards, and check-out is before 11:00 AM. We offer self-check-in so you can arrive anytime after 3 PM!"
    },
    {
        question: "How much does it cost per night?",
        answer: "Our capsule pods start from RM55 per night for a bed in a shared dormitory. Private pods are also available. Book direct for the best rate — no booking fees!"
    },
    {
        question: "Is there free WiFi?",
        answer: "Yes! We provide complimentary high-speed WiFi throughout the hostel, including in the sleeping pod areas and the common lounge. Perfect for remote workers and travellers."
    },
    {
        question: "Where is Pelangi Capsule Hostel located?",
        answer: "We are located in Johor Bahru city centre, just minutes from the Woodlands CIQ checkpoint and a short Grab ride from Senai International Airport. Exact address: 31, Jalan Trus, Bandar Johor Bahru."
    },
    {
        question: "How far is it from Singapore?",
        answer: "Pelangi Capsule Hostel is only 15 minutes by car from the Woodlands CIQ checkpoint in Singapore. It's a convenient and affordable base for day trips to Singapore."
    },
    {
        question: "Do you provide towels and toiletries?",
        answer: "Yes! Every pod comes with a fresh towel. We provide body wash and shampoo in the shared bathrooms. Toothbrushes are available for a small fee."
    },
    {
        question: "Is there luggage storage?",
        answer: "Yes, we have lockers for your valuables in the room. For larger luggage, you can store it in our designated luggage area before check-in or after check-out."
    },
    {
        question: "Is it quiet? Can I work there?",
        answer: "We have a strict quiet policy in the sleeping pods area ensuring a good night's rest. For working, we have a designated common area with high-speed WiFi."
    }
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <section className="py-20 bg-white dark:bg-stone-900">
            <div className="container-custom max-w-3xl">
                <h2 className="font-display text-4xl font-medium mb-10 text-center text-stone-900 dark:text-stone-100">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-stone-200 dark:border-stone-700 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md bg-white dark:bg-stone-800' : 'hover:border-stone-300 dark:hover:border-stone-600'}`}
                        >
                            <button
                                id={`faq-question-${index}`}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="font-medium text-lg text-stone-900 dark:text-stone-100">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} aria-hidden="true">
                                    <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-stone-600 dark:text-stone-400">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}
