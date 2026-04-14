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
                quality={80}
                className="object-cover image-zoom"
                fetchPriority="low"
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

        {/* Meet the Team */}
        <div className="mt-24">
          <p className="section-label text-center">The People Behind Pelangi</p>
          <h2 className="section-heading text-center mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: "Jay Lew",
                role: "Co-Founder & Hostel Owner",
                bio: "Jay built Pelangi Capsule Hostel in 2023 after years of backpacking across Japan and Southeast Asia. He designed every detail of the hostel — from the capsule layout to the self-check-in system — to give travellers the privacy and freedom he always wanted on the road.",
                initials: "JL",
                phone: "+60 12-708 8789",
              },
              {
                name: "Alston",
                role: "Co-Founder & Operations Manager",
                bio: "Alston handles day-to-day operations, guest relations, and keeps everything running smoothly. With a background in hospitality, he ensures every guest feels welcome — from first message on WhatsApp to the moment they check out.",
                initials: "AL",
                phone: "+60 16-762 0815",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-sm border border-stone-100 dark:border-stone-800"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <span className="font-display text-lg font-medium text-amber-700 dark:text-amber-400">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-900 dark:text-stone-100">{member.name}</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                  {member.bio}
                </p>
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="min-h-6 inline-flex items-center gap-2 mt-5 text-sm text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {member.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
