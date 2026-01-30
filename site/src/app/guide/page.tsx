import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GuidePage() {
    const eats = [
        { name: "Sik Bao Sin (Bar Wang Rice)", desc: "Famous mixed rice right opposite us. Affordable and tasty.", dist: "1 min walk" },
        { name: "San Low Seafood", desc: "Legendary for their San Lou Bee Hoon. A must-try dinner spot.", dist: "5 min walk" },
        { name: "Moonlight Cake House", desc: "Great for cakes, pastries, and western food.", dist: "8 min walk" },
        { name: "Yaoki Japanese Restaurant", desc: "Authentic Japanese cuisine nearby.", dist: "3 min walk" },
    ];

    const shopping = [
        { name: "Pelangi Leisure Mall", desc: "Supermarket, cinema, and retail shops.", dist: "10 min walk" },
        { name: "Mid Valley Southkey", desc: "Huge mega-mall with everything you need.", dist: "10 min drive" },
        { name: "KSL City Mall", desc: "Popular mall with many massage parlors and salons.", dist: "8 min drive" },
    ];

    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-28 pb-16 container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-medium mb-4 text-stone-900">
                            Local Area Guide
                        </h1>
                        <p className="text-xl text-stone-600">
                            Discover the best food and spots around Taman Pelangi.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Food Section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-amber-700">
                                <span className="text-3xl">🍜</span> Where to Eat
                            </h2>
                            <div className="space-y-6">
                                {eats.map((place, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg text-stone-900">{place.name}</h3>
                                        <p className="text-sm font-medium text-amber-600 mb-2">{place.dist}</p>
                                        <p className="text-stone-600">{place.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shopping Section */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-amber-700">
                                <span className="text-3xl">🛍️</span> Shopping & Fun
                            </h2>
                            <div className="space-y-6">
                                {shopping.map((place, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg text-stone-900">{place.name}</h3>
                                        <p className="text-sm font-medium text-amber-600 mb-2">{place.dist}</p>
                                        <p className="text-stone-600">{place.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Map Link */}
                    <div className="mt-16 text-center">
                        <a
                            href="https://www.google.com/maps/search/restaurants+near+Pelangi+Capsule+Hostel/@1.4862,103.7573,15z"
                            target="_blank"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            Explore on Google Maps
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
