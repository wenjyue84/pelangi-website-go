export default function Location() {
  const nearbyPlaces = [
    { name: "Pelangi Leisure Mall", distance: "2 min walk", icon: "shopping" },
    { name: "7-Eleven", distance: "1 min walk", icon: "store" },
    { name: "Bus Stop", distance: "Steps away", icon: "bus" },
    { name: "JB Sentral", distance: "10 min drive", icon: "train" },
    { name: "CIQ Border", distance: "15 min drive", icon: "border" },
    { name: "AEON Tebrau", distance: "10 min drive", icon: "shopping" },
  ];

  return (
    <section id="location" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Map */}
          <div className="relative h-[400px] lg:h-full min-h-[450px] rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4044839447424!2d103.7573!3d1.4862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6c15f34a1b2d%3A0x1234567890abcdef!2s26a%20Jalan%20Perang%2C%20Taman%20Pelangi%2C%2080400%20Johor%20Bahru%2C%20Johor!5e0!3m2!1sen!2smy!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="section-label">Location</p>
            <h2 className="section-heading mb-8">
              Find Us in<br />Taman Pelangi
            </h2>

            {/* Address Card */}
            <div className="bg-stone-50 rounded-2xl p-6 mb-8 border border-stone-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900 mb-2">Address</h3>
                  <p className="text-stone-600 leading-relaxed">
                    26A, Jalan Perang,<br />
                    Taman Pelangi,<br />
                    80400 Johor Bahru,<br />
                    Johor, Malaysia
                  </p>
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="mb-8">
              <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-4">What&apos;s Nearby</h3>
              <div className="grid grid-cols-2 gap-3">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-stone-800 truncate">{place.name}</div>
                      <div className="text-xs text-stone-500">{place.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Directions Button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=26a+Jalan+Perang+Taman+Pelangi+Johor+Bahru"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
