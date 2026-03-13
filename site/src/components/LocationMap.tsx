import React from 'react';

export default function LocationMap() {
    return (
        <section className="py-20 bg-stone-50 dark:bg-stone-950">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Content — DOM-first for screen reader logical sequence (WCAG SC 1.3.2) */}
                <div id="speakable-location" className="md:order-2">
                        <h2 className="font-display text-4xl font-medium mb-6 text-stone-900 dark:text-stone-100">Right in the heart of Pelangi</h2>
                        <p className="text-stone-600 dark:text-stone-400 text-lg mb-6">
                            We are perfectly located for exploring. Walking distance to the best local hawker stalls, hip cafes, and night market.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                                <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </span>
                                <span>5 mins walk to Pelangi Night Market</span>
                            </li>
                            <li className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                                <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </span>
                                <span>10 mins to Plaza Pelangi</span>
                            </li>
                            <li className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                                <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </span>
                                <span>15 mins drive to JB Checkpoint (CIQ)</span>
                            </li>
                        </ul>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
                            Get Directions
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>

                    {/* Map — DOM-second (supplementary visual); visually first on desktop via md:order-1 */}
                    <div className="md:order-1 h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-stone-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1796.7!2d103.764!3d1.493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMjknMzQuOCJOIDEwM8KwNDUnNTAuNCJF!5e0!3m2!1sen!2smy!4v1625000000000!5m2!1sen!2smy"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Pelangi Capsule Hostel Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
