'use client';
import React, { useState } from 'react';

const faqs = [
    {
        question: "What time is check-in and check-out?",
        answer: "Check-in is from 3:00 PM onwards, and check-out is before 11:00 AM. We offer self-check-in so you can arrive anytime after 3 PM!"
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
    },
    {
        question: "How do I get there from the airport?",
        answer: "From Senai Airport, it's about a 30-minute Grab ride (approx RM30-40). From Singapore (Woodlands), it's a 15-minute drive from the CIQ checkpoint."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white">
            <div className="container-custom max-w-3xl">
                <h2 className="font-display text-4xl font-medium mb-10 text-center text-stone-900">Common Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-stone-200 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md bg-white' : 'hover:border-stone-300'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-medium text-lg text-stone-900">{faq.question}</span>
                                <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <div className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-stone-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
