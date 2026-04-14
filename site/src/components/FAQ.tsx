'use client';
import React, { useState } from 'react';
import { faqItems } from '@/data/faq-items';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white dark:bg-stone-900">
            <div className="container-custom max-w-3xl">
                <h2 className="font-display text-4xl font-medium mb-10 text-center text-stone-900 dark:text-stone-100">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqItems.map((faq, index) => (
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

                            <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[50rem] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-stone-600 dark:text-stone-400">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
