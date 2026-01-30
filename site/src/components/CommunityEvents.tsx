"use client";

import React, { useEffect, useState } from 'react';
import { events as localHolidays, Event } from '@/data/events';

export default function CommunityEvents() {
    const [upcomingHolidays, setUpcomingHolidays] = useState<Event[]>([]);

    useEffect(() => {
        const now = new Date();
        const upcoming = localHolidays
            .filter(e => new Date(e.date) >= now)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
        setUpcomingHolidays(upcoming);
    }, []);

    return (
        <section id="community" className="py-20 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: The Vibe */}
                    <div>
                        <div className="mb-8">
                            <span className="text-amber-600 font-medium tracking-wider text-sm uppercase mb-2 block">The Vibe</span>
                            <h2 className="font-display text-4xl font-medium mb-6 text-stone-900">More than just a place to sleep</h2>
                            <p className="text-stone-600 text-lg mb-6">
                                At Pelangi, we believe travel is about connection. Our common areas are designed to spark conversations,
                                and our weekly events bring everyone together. Whether you're a solo traveler or with a group,
                                you'll find your tribe here.
                            </p>
                        </div>

                        {/* Vibe Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-stone-100 rounded-2xl p-6 h-48 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 opacity-50"></div>
                                <div className="relative z-10 text-center">
                                    <span className="text-4xl mb-2 block">🤝</span>
                                    <span className="font-medium text-stone-800">Make Friends</span>
                                </div>
                            </div>
                            <div className="bg-stone-100 rounded-2xl p-6 h-48 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 opacity-50"></div>
                                <div className="relative z-10 text-center">
                                    <span className="text-4xl mb-2 block">🎸</span>
                                    <span className="font-medium text-stone-800">Live Moments</span>
                                </div>
                            </div>
                            <div className="bg-stone-100 rounded-2xl p-6 h-48 flex items-center justify-center relative overflow-hidden group col-span-2">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-50 opacity-50"></div>
                                <div className="relative z-10 text-center flex items-center gap-4 justify-center">
                                    <div className="text-center">
                                        <span className="text-4xl mb-2 block">🌱</span>
                                        <span className="font-medium text-stone-800">Chill & Relax</span>
                                    </div>
                                    <div className="h-10 w-px bg-stone-300 mx-4"></div>
                                    <div className="text-left max-w-xs text-sm text-stone-600">
                                        "The rooftop terrace is the perfect place to unwind after a day of exploring."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Upcoming Public Holidays */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -mr-16 -mt-16 opacity-60 pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div>
                                <h3 className="font-display text-2xl font-medium text-stone-900">Malaysia Public Holidays</h3>
                                <p className="text-sm text-stone-500 mt-1">Plan your trip around these dates</p>
                            </div>
                            <span className="bg-white border border-red-200 px-3 py-1 rounded-full text-xs font-bold text-red-600 shadow-sm">
                                2026
                            </span>
                        </div>

                        <div className="space-y-3 relative z-10">
                            {upcomingHolidays.map((holiday) => (
                                <div key={holiday.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 flex gap-4 hover:shadow-md transition-shadow group">
                                    {/* Date Box */}
                                    <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-lg flex flex-col items-center justify-center text-center border border-red-200">
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-red-500">
                                            {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                        <span className="text-lg font-bold font-display text-red-700">
                                            {new Date(holiday.date).getDate()}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-stone-900">{holiday.title}</h4>
                                        <p className="text-sm text-stone-500 line-clamp-1">{holiday.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-stone-400">
                                Source: Official Malaysia Public Holidays 2026
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
