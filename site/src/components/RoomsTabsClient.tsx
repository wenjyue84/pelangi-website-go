'use client';

import { Activity } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import capsule4Image from '../../public/images/capsule-4.webp';
import capsule2Image from '../../public/images/capsule-2.webp';
import capsule3Image from '../../public/images/capsule-3.webp';

type RoomTab = 'standard' | 'premium' | 'monthly';

const TABS: { id: RoomTab; label: string; badge?: string }[] = [
  { id: 'standard', label: 'Lower Deck', badge: 'Budget Pick' },
  { id: 'premium', label: 'Upper Deck' },
  { id: 'monthly', label: 'Long Stay' },
];

const standardFeatures = [
  'Ground-level — easy access, no ladder',
  'Personal climate control',
  'Adjustable LED lighting',
  'USB & power outlets',
  'Personal locker',
];

const premiumFeatures = [
  'Upper bunk — elevated & more private',
  'Personal climate control',
  'Adjustable LED lighting',
  'USB & power outlets',
  'Personal locker',
];

const monthlyFeatures = [
  'Fixed monthly rate — no nightly fluctuation',
  'Priority room assignment',
  'Personal climate control',
  'Adjustable LED lighting',
  'USB & power outlets',
  'Privacy sliding door',
  'Premium mattress',
  'Personal locker',
];

function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="space-y-4 grow">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-stone-700 flex items-center justify-center shadow-xs shrink-0">
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-stone-700 dark:text-stone-300">{feature}</span>
        </div>
      ))}
    </div>
  );
}

function RateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-stone-500 dark:text-stone-400">{label}</span>
      <span className="font-medium text-stone-800 dark:text-stone-200">{value}</span>
    </div>
  );
}

export default function RoomsTabsClient() {
  const [activeTab, setActiveTab] = useState<RoomTab>('standard');

  return (
    <div>
      {/* Tab navigation */}
      <div
        role="tablist"
        aria-label="Room type"
        className="flex gap-2 mb-8 bg-stone-100 dark:bg-stone-800 rounded-2xl p-1.5"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            {tab.label}
            {tab.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Standard Pod tab panel */}
      <Activity mode={activeTab === 'standard' ? 'visible' : 'hidden'} name="standard-pod-tab">
        <div
          id="tabpanel-standard"
          role="tabpanel"
          aria-labelledby="tab-standard"
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Image gallery */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden group sm:col-span-2">
              <Image
                src={capsule4Image}
                alt="Modern Japanese-style capsule pod interior at Pelangi Hostel Johor Bahru with personal lighting"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs tracking-widest uppercase opacity-70">Lower Deck</div>
                <div className="text-lg font-medium">Ground-Level Pod Interior</div>
              </div>
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src={capsule2Image}
                alt="Comfortable mattress in standard capsule pod at Pelangi Hostel JB"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src={capsule3Image}
                alt="Standard pod amenities including USB charging ports at Pelangi Hostel"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
            </div>
          </div>

          {/* Pricing card */}
          <div className="lg:col-span-2 entry-zoom-in">
            <div className="bg-stone-50 dark:bg-stone-800 rounded-3xl p-8 lg:p-10 h-full flex flex-col">
              <div className="mb-8">
                <div className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">
                  Lower Deck — from
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-medium text-stone-900 dark:text-stone-100">RM45</span>
                  <span className="text-stone-500 dark:text-stone-400">/night</span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  Ground-level access — no climbing needed
                </p>
              </div>
              <FeatureList features={standardFeatures} />
              <div className="divider my-8" />
              <div className="space-y-3 mb-8">
                <RateRow label="Monthly Rate" value="RM594/month" />
                <RateRow label="Check-in" value="3:00 PM" />
                <RateRow label="Check-out" value="12:00 PM" />
              </div>
              <Link href="/book" className="btn-primary w-full text-center block">
                Book Your Pod Now
              </Link>
            </div>
          </div>
        </div>
      </Activity>

      {/* Premium Pod tab panel */}
      <Activity mode={activeTab === 'premium' ? 'visible' : 'hidden'} name="premium-pod-tab">
        <div
          id="tabpanel-premium"
          role="tabpanel"
          aria-labelledby="tab-premium"
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Image gallery */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden group sm:col-span-2">
              <Image
                src={capsule2Image}
                alt="Premium capsule pod interior with enhanced comfort features at Pelangi Hostel Johor Bahru"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs tracking-widest uppercase opacity-70">Upper Deck</div>
                <div className="text-lg font-medium">Elevated Pod Interior</div>
              </div>
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src={capsule4Image}
                alt="Premium pod with superior amenities at Pelangi Capsule Hostel JB"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src={capsule3Image}
                alt="Premium capsule pod amenities and storage at Pelangi Hostel"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
            </div>
          </div>

          {/* Pricing card */}
          <div className="lg:col-span-2">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 lg:p-10 h-full flex flex-col">
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-medium mb-3">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  More Privacy
                </div>
                <div className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">
                  Upper Deck — from
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-medium text-stone-900 dark:text-stone-100">RM35</span>
                  <span className="text-stone-500 dark:text-stone-400">/night</span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  Elevated position — quieter, more secluded
                </p>
              </div>
              <FeatureList features={premiumFeatures} />
              <div className="divider my-8" />
              <div className="space-y-3 mb-8">
                <RateRow label="Check-in" value="3:00 PM" />
                <RateRow label="Check-out" value="12:00 PM" />
              </div>
              <Link href="/book" className="btn-primary w-full text-center block">
                Book Upper Deck Pod
              </Link>
            </div>
          </div>
        </div>
      </Activity>

      {/* Monthly / Long Stay tab panel */}
      <Activity mode={activeTab === 'monthly' ? 'visible' : 'hidden'} name="monthly-stay-tab">
        <div
          id="tabpanel-monthly"
          role="tabpanel"
          aria-labelledby="tab-monthly"
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Image gallery */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden group sm:col-span-2">
              <Image
                src={capsule3Image}
                alt="Long-stay capsule pod with comfortable amenities for extended stays at Pelangi Hostel JB"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs tracking-widest uppercase opacity-70">Extended Stay</div>
                <div className="text-lg font-medium">Monthly Accommodation</div>
              </div>
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src={capsule4Image}
                alt="Capsule pod long-stay comfort at Pelangi Hostel Johor Bahru"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src={capsule2Image}
                alt="Long-stay pod sleeping area at Pelangi Capsule Hostel"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                quality={80}
                className="object-cover image-zoom"
                placeholder="blur"
                fetchPriority="low"
              />
            </div>
          </div>

          {/* Pricing card */}
          <div className="lg:col-span-2 entry-zoom-in">
            <div className="bg-stone-50 dark:bg-stone-800 rounded-3xl p-8 lg:p-10 h-full flex flex-col">
              <div className="mb-8">
                <div className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-2">
                  Monthly rate from
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-medium text-stone-900 dark:text-stone-100">RM594</span>
                  <span className="text-stone-500 dark:text-stone-400">/month</span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
                  Budget your stay — no nightly surprises
                </p>
              </div>
              <FeatureList features={monthlyFeatures} />
              <div className="divider my-8" />
              <div className="space-y-3 mb-8">
                <RateRow label="Minimum stay" value="1 month" />
                <RateRow label="Billing cycle" value="Monthly in advance" />
                <RateRow label="Check-in / out" value="3 PM / 12 PM" />
              </div>
              <a
                href="https://wa.me/60167931361?text=Hi%2C%20I'm%20interested%20in%20the%20monthly%20long-stay%20rate%20at%20Pelangi%20Capsule%20Hostel."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center block"
              >
                Enquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Activity>
    </div>
  );
}
