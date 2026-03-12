import Image from "next/image";
import Link from "next/link";

export default function Rooms() {
  const capsuleFeatures = [
    { icon: "fan", text: "Personal climate control" },
    { icon: "light", text: "Adjustable LED lighting" },
    { icon: "power", text: "USB & power outlets" },
    { icon: "lock", text: "Privacy sliding door" },
    { icon: "bed", text: "Premium mattress" },
    { icon: "locker", text: "Personal locker" },
  ];

  const hostelHighlights = [
    {
      icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
      title: "Free High-Speed WiFi",
      description: "Stay connected for work or streaming — fast, reliable internet throughout"
    },
    {
      icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
      title: "Air-Conditioned",
      description: "Beat Malaysia's tropical heat — powerful AC in all sleeping areas"
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "24/7 Access",
      description: "No curfews, no lockouts — your schedule, your freedom"
    },
    {
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      title: "24-Hour Laundry",
      description: "Dobi service right downstairs — wash anytime, travel light"
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Secure & Safe",
      description: "24/7 CCTV, personal lockers, and secure premises"
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Shared Kitchen",
      description: "Fully equipped kitchen — cook your meals and save money"
    },
  ];

  return (
    <section id="rooms" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="section-label">Accommodation</p>
          <h2 className="section-heading mb-6">
            Your Private Pod Awaits
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            Experience the perfect blend of privacy and affordability in our Japanese-inspired capsule pods.
            Each pod is your personal retreat — complete with climate control, adjustable lighting,
            and everything you need for a restful stay in Johor Bahru.
          </p>
        </div>

        {/* Main showcase */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Image gallery - larger */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden group col-span-2">
              <Image
                src="/images/capsule-4.webp"
                alt="Modern Japanese-style capsule pod interior at Pelangi Hostel Johor Bahru with personal lighting and privacy curtain"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover image-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs tracking-widest uppercase opacity-70">Featured</div>
                <div className="text-lg font-medium">Capsule Interior</div>
              </div>
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src="/images/capsule-2.webp"
                alt="Comfortable premium mattress in budget capsule hostel pod in Taman Pelangi JB"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                className="object-cover image-zoom"
              />
            </div>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden group">
              <Image
                src="/images/capsule-3.webp"
                alt="Capsule pod amenities including USB charging ports and personal ventilation at Pelangi Hostel"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 30vw"
                className="object-cover image-zoom"
              />
            </div>
          </div>

          {/* Pricing card */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 rounded-3xl p-8 lg:p-10 h-full flex flex-col">
              {/* Price */}
              <div className="mb-8">
                <div className="text-xs tracking-widest uppercase text-stone-500 mb-2">Starting from</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-medium text-stone-900">RM35</span>
                  <span className="text-stone-500">/night</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">
                  Premium comfort at backpacker prices
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 flex-grow">
                {capsuleFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-stone-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="divider my-8" />

              {/* Additional rates */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Monthly Rate</span>
                  <span className="font-medium text-stone-800">RM594/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Check-in</span>
                  <span className="font-medium text-stone-800">3:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Check-out</span>
                  <span className="font-medium text-stone-800">12:00 PM</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="#booking"
                className="btn-primary w-full text-center block"
              >
                Book Your Pod Now
              </Link>
            </div>
          </div>
        </div>

        {/* Hostel Highlights Grid */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-medium text-stone-900 text-center mb-10">
            Everything You Need, Nothing You Don&apos;t
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostelHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-stone-50 rounded-2xl p-6 hover:bg-stone-100 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={highlight.icon} />
                  </svg>
                </div>
                <h4 className="font-semibold text-stone-900 mb-2">{highlight.title}</h4>
                <p className="text-stone-500 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Night Market Feature - Unique Selling Point */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Local Experience
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-medium text-stone-900 mb-4">
                Night Market at Your Doorstep
              </h3>
              <p className="text-lg text-stone-600 mb-6">
                Every <span className="font-semibold text-amber-700">Tuesday from 4:30 PM</span>,
                step outside and you&apos;re in the heart of Taman Pelangi&apos;s famous pasar malam.
              </p>
              <div className="space-y-3 text-stone-600">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>500+ meters</strong> of food stalls right in front of hostel</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Authentic Malaysian street food</strong> — satay, oyster omelette, claypot rice</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Local prices</strong> — eat like a local, pay like a local</span>
                </div>
              </div>
              <p className="text-sm text-amber-700 mt-6 font-medium">
                Pro tip: Arrive by 4 PM to catch the best selection before the crowds!
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/destinations/pasar-malam.jpg"
                alt="Taman Pelangi Pasar Malam night market with street food stalls near Pelangi Capsule Hostel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium">Pasar Malam Taman Pelangi</div>
                <div className="text-xs opacity-80">Every Tuesday, 4:30 PM - 9 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Capsule */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="font-display text-2xl font-medium text-stone-900 mb-6">
            Why Choose a Capsule Hostel?
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">More Privacy Than Dorms</h4>
                <p className="text-sm text-stone-500">Your own enclosed space with a door that locks — not just a curtain</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">Better Value Than Hotels</h4>
                <p className="text-sm text-stone-500">All the essentials for a fraction of the price — spend savings exploring JB</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">Tech-Forward Comfort</h4>
                <p className="text-sm text-stone-500">Personal lighting, ventilation, and charging ports built-in</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">Meet Fellow Travelers</h4>
                <p className="text-sm text-stone-500">Shared spaces for socializing, private pods for resting — best of both</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
