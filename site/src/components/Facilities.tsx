import Image from "next/image";

export default function Facilities() {
  const facilities = [
    {
      icon: "wifi",
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary fast internet throughout the hostel",
    },
    {
      icon: "shower",
      title: "Hot Showers",
      description: "Two private bathrooms with hot water available 24/7",
    },
    {
      icon: "clock",
      title: "24/7 Access",
      description: "Come and go as you please with round-the-clock entry",
    },
    {
      icon: "lock",
      title: "Secure Lockers",
      description: "Personal storage for your belongings in each pod",
    },
    {
      icon: "kitchen",
      title: "Shared Kitchen",
      description: "Prepare your own meals in our self-catering kitchen",
    },
    {
      icon: "water",
      title: "Water Station",
      description: "Hot and cold filtered water dispenser for all guests",
    },
  ];

  const iconPaths: Record<string, string> = {
    wifi: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0",
    shower: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    lock: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    kitchen: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    water: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  };

  return (
    <section id="facilities" className="section-padding bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-300 mb-4">
            Amenities
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Everything You Need
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed">
            We provide all the essential amenities to make your stay comfortable and convenient.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-7
                       border border-white/10 hover:border-white/20
                       hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center
                            text-amber-300 mb-5 group-hover:bg-amber-500/30 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d={iconPaths[facility.icon]} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{facility.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{facility.description}</p>
            </div>
          ))}
        </div>

        {/* Facility Images */}
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {[
            { src: "/images/facility-heater.jpg", alt: "Hot water heater for 24/7 hot showers at Pelangi Capsule Hostel JB" },
            { src: "/images/facility-shoes-rack.jpg", alt: "Clean shoe storage area at budget hostel in Taman Pelangi Johor Bahru" },
            { src: "/images/facilty-hair-dryer.jpg", alt: "Complimentary hair dryer amenity at Pelangi Capsule Hostel" },
          ].map((img, index) => (
            <div key={index} className="relative h-52 rounded-2xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover image-zoom"
              />
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
