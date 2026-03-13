import Link from "next/link";

export default function SingaporeTeaser() {
  return (
    <section className="py-20 bg-linear-to-r from-amber-50 via-amber-100 to-amber-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-medium mb-4 text-stone-900">
              Singapore Nearby, JB Rates
            </h2>
            <p className="text-lg text-stone-700 mb-8">
              Just 30 minutes from the Marina Bay skyline, but with a backpacker&apos;s budget. Day trip to Singapore or base yourself here?
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Distance Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553 3.276A1 1 0 0117 20.382V9.618a1 1 0 00-1.447-.894L9 11m0 13V7m6.553-3.276A1 1 0 0017 3.618V14.382a1 1 0 001.447.894l5.447-2.724M17 11V7m4 4v6"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-2xl font-medium text-stone-900 text-center mb-2">
                30 Minutes
              </h3>
              <p className="text-stone-600 text-center">
                To Marina Bay from Taman Pelangi via Causeway
              </p>
            </div>

            {/* Cost Comparison Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-2xl font-medium text-stone-900 text-center mb-2">
                70% Less
              </h3>
              <p className="text-stone-600 text-center">
                Save on accommodation vs Singapore hotels
              </p>
            </div>

            {/* Overnight Option Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-2xl font-medium text-stone-900 text-center mb-2">
                Flexible
              </h3>
              <p className="text-stone-600 text-center">
                Day trip or stay a week—your choice, your pace
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog/singapore-to-jb-day-trip-causeway-guide"
              className="btn-primary px-8 py-4 text-center"
            >
              Read Day Trip Guide
            </Link>
            <Link href="/guide" className="btn-secondary px-8 py-4 text-center">
              View Local Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
