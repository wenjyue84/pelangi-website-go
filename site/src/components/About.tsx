import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section-padding bg-stone-50 dark:bg-stone-950">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image with elegant frame */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-3xl opacity-60" />
            <div className="relative h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/exterior.JPG"
                alt="Pelangi Capsule Hostel building"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover image-zoom"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-6 hidden md:block">
              <div className="text-center">
                <div className="font-display text-4xl font-medium text-amber-700 dark:text-amber-400">2023</div>
                <div className="text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 mt-1">Established</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-4">
            <p className="section-label">Our Story</p>
            <h2 className="section-heading mb-8">
              A New Way to Stay<br />in Johor Bahru
            </h2>

            <div className="space-y-5 text-stone-600 dark:text-stone-400 leading-relaxed text-lg">
              <p>
                Inspired by the efficient capsule hotels of <span className="text-stone-800 dark:text-stone-200 font-medium">Japan and Hong Kong</span>,
                Pelangi Capsule Hostel brings this innovative accommodation concept to Johor Bahru.
              </p>
              <p>
                Founded in 2023, we offer travelers and budget-conscious guests a unique lodging
                experience that combines privacy, comfort, and affordability in one modern package.
              </p>
              <p>
                Each capsule is your private sanctuary — equipped with climate control, adjustable
                lighting, and power outlets — giving you everything you need for a restful stay.
              </p>
            </div>

            {/* Divider */}
            <div className="divider my-10" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {[
                { value: "20", label: "Capsule Pods" },
                { value: "8.2", label: "Guest Rating" },
                { value: "2000+", label: "Happy Guests" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-amber-700 dark:text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-wider uppercase text-stone-500 dark:text-stone-400 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
