import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/images/hero-final.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Pelangi Capsule Hostel - Affordable Japanese-style pod accommodation in Johor Bahru near Singapore"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
        />
        {/* Elegant overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto pt-20">
        {/* Elegant label */}
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-300 mb-6 animate-fade-in">
          Japanese-Inspired Accommodation
        </p>

        {/* Main heading with serif font */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium mb-6 leading-[1.1] tracking-tight animate-slide-up">
          Find Your Quiet
          <br />
          <span className="text-amber-300">Escape</span> in JB
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in delay-200">
          Modern capsule hostel in the heart of Taman Pelangi.
          Privacy, comfort, and connection — all in one place.
        </p>

        {/* Price display - Elegant */}
        <div className="inline-flex flex-col items-center mb-10 animate-fade-in delay-300">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-stone-400 font-medium">from</span>
            <span className="font-display text-5xl md:text-6xl font-medium text-white">RM35</span>
            <span className="text-sm text-stone-400 font-medium">/night</span>
          </div>
          <div className="mt-2 h-px w-20 bg-linear-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-400">
          <Link
            href="#booking"
            className="bg-white text-stone-900 font-medium py-4 px-10 rounded-full
                     hover:bg-amber-50 transition-all duration-300
                     text-sm tracking-wide uppercase shadow-lg hover:shadow-xl"
          >
            Reserve Your Pod
          </Link>
          <Link
            href="#rooms"
            className="bg-transparent border border-white/30 text-white font-medium
                     py-4 px-10 rounded-full hover:bg-white/10
                     transition-all duration-300 text-sm tracking-wide uppercase"
          >
            Explore Rooms
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-white/10 animate-fade-in delay-400">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { icon: "wifi", label: "Free WiFi" },
              { icon: "clock", label: "24/7 Access" },
              { icon: "location", label: "Prime Location" },
              { icon: "star", label: "4.9 Rating" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-stone-300">
                <div className="w-5 h-5 opacity-60">
                  {item.icon === "wifi" && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  )}
                  {item.icon === "clock" && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {item.icon === "location" && (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  {item.icon === "star" && (
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
