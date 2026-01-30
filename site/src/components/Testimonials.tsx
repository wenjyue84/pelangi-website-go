export default function Testimonials() {
  const testimonials = [
    {
      quote: "Easy check in, good location, and so many eateries nearby with good food. The capsule was clean and comfortable for a solo traveler.",
      author: "Ahmad R.",
      source: "Google Reviews",
      rating: 5,
    },
    {
      quote: "The capsule turned out better than expected in terms of comfort. There's a 7-Eleven open 24/7 very close by. Great value for the price!",
      author: "Sarah L.",
      source: "Hostelworld",
      rating: 5,
    },
    {
      quote: "It's a budget capsule hostel that offers value for money. Recommended for anyone traveling alone with little luggage just wanting a good night's sleep.",
      author: "Wei Ming T.",
      source: "Booking.com",
      rating: 4,
    },
  ];

  const ratings = [
    { platform: "Hostelworld", rating: "4.9", reviews: "178" },
    { platform: "Google", rating: "4.2", reviews: "45" },
    { platform: "Airpaz", rating: "6.5/10", reviews: "106" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="section-label">Testimonials</p>
          <h2 className="section-heading mb-6">
            What Our Guests Say
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            Real reviews from travelers who stayed with us.
          </p>
        </div>

        {/* Ratings Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {ratings.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-stone-50 rounded-2xl px-6 py-4
                       border border-stone-100 hover:border-stone-200 transition-colors"
            >
              <span className="font-display text-3xl font-medium text-amber-700">
                {item.rating}
              </span>
              <div className="text-sm">
                <div className="font-medium text-stone-800">{item.platform}</div>
                <div className="text-stone-500">{item.reviews} reviews</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-stone-50 rounded-2xl p-8 border border-stone-100
                       hover:shadow-md transition-shadow duration-300 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-stone-200">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400' : 'text-stone-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-stone-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-5 border-t border-stone-200">
                <div className="font-medium text-stone-900">{testimonial.author}</div>
                <div className="text-sm text-stone-500">{testimonial.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
