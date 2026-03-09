export default function Booking() {
  const bookingPlatforms = [
    {
      name: "Hostelworld",
      url: "https://www.hostelworld.com/pwa/hosteldetails.php/Pelangi-Capsule-Hostel/Johor-Bahru/317698",
      highlight: "Best for backpackers",
      color: "bg-orange-500",
    },
    {
      name: "Booking.com",
      url: "https://www.booking.com/hotel/my/pelangi-hostel-capsule.html",
      highlight: "Free cancellation",
      color: "bg-blue-600",
    },
    {
      name: "Agoda",
      url: "https://www.agoda.com/en-in/pelangi-hostel-capsule/hotel/johor-bahru-my.html",
      highlight: "Best price guarantee",
      color: "bg-red-500",
    },
  ];

  return (
    <section id="booking" className="section-padding bg-amber-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-700/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-300 mb-4">
            Book Your Stay
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-6">
            Ready to Experience<br />Capsule Living?
          </h2>
          <p className="text-amber-200 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Or book through a third-party platform:
          </p>

          {/* Book Direct — primary CTA */}
          <div className="mb-10">
            <a
              href="/book"
              className="inline-flex items-center gap-3 bg-white text-amber-800 rounded-2xl
                         py-5 px-10 font-semibold text-lg hover:bg-amber-50 transition-all
                         duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Direct — Best Rate Guaranteed
            </a>
            <p className="text-amber-300 text-sm mt-3">No platform fees · Instant confirmation · Pay at arrival</p>
          </div>

          {/* Price Highlight */}
          <div className="inline-flex flex-col items-center mb-14">
            <div className="flex items-baseline gap-2">
              <span className="text-amber-300 text-sm">Starting from</span>
              <span className="font-display text-6xl md:text-7xl font-medium text-white">RM35</span>
              <span className="text-amber-300 text-sm">/night</span>
            </div>
            <div className="mt-3 h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {/* Booking Platforms */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {bookingPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300
                         hover:-translate-y-1 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${platform.color} mx-auto mb-4
                              flex items-center justify-center text-white font-bold text-lg`}>
                  {platform.name.charAt(0)}
                </div>
                <div className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors mb-1">
                  {platform.name}
                </div>
                <div className="text-sm text-stone-500">{platform.highlight}</div>
              </a>
            ))}
          </div>

          {/* Direct Contact */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
            <h3 className="text-xs tracking-widest uppercase text-amber-300 mb-6">
              Or Contact Us Directly
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {/* Jay */}
              <a
                href="tel:+60127088789"
                className="flex items-center justify-center gap-3 bg-white text-amber-800
                         rounded-xl py-4 px-6 font-medium hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">Call Jay</div>
                  <div>+60 12-708 8789</div>
                </div>
              </a>
              <a
                href="https://wa.me/60127088789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 text-white
                         rounded-xl py-4 px-6 font-medium hover:bg-green-600 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-xs text-green-100 font-bold uppercase tracking-wider">WhatsApp Jay</div>
                  <div>+60 12-708 8789</div>
                </div>
              </a>

              {/* Alston */}
              <a
                href="tel:+60167620815"
                className="flex items-center justify-center gap-3 bg-white text-amber-800
                         rounded-xl py-4 px-6 font-medium hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-xs text-amber-600 font-bold uppercase tracking-wider">Call Alston</div>
                  <div>+60 16-762 0815</div>
                </div>
              </a>
              <a
                href="https://wa.me/60167620815"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 text-white
                         rounded-xl py-4 px-6 font-medium hover:bg-green-600 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-xs text-green-100 font-bold uppercase tracking-wider">WhatsApp Alston</div>
                  <div>+60 16-762 0815</div>
                </div>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-amber-300">
                Check-in: 3:00 PM  |  Check-out: 12:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
