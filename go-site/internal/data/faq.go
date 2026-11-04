package data

// FaqItem mirrors site/src/data/faq-items.ts FaqItem.
type FaqItem struct {
	Question string
	Answer   string
}

// FaqItems is ported verbatim from faq-items.ts (used by FAQ sections + FAQPage JSON-LD).
var FaqItems = []FaqItem{
	{
		Question: "What time is check-in and check-out at Pelangi Capsule Hostel?",
		Answer:   "Check-in at Pelangi Capsule Hostel is from 2:00 PM onwards, and check-out is before 12:00 PM (noon). We offer self-check-in so you can arrive anytime after 2 PM without waiting for reception. Early check-in or late check-out may be available on request — contact us via WhatsApp at +60 10-308 4289.",
	},
	{
		Question: "How much does a capsule pod cost per night in Johor Bahru?",
		Answer:   "The standard rate is RM35 per night. First-time guests who book directly on our website at pelangicapsulehostel.com/book pay RM30 for their first night, then RM35 per night from the second night onward — this direct-booking discount does not apply to walk-ins or bookings made another way. Repeat guests pay the standard RM35 per night throughout their stay. A Malaysia Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is added as required by law. Monthly stays are available from RM600/month (Upper Deck) or RM650/month (Lower Deck).",
	},
	{
		Question: "What counts as a first stay at Pelangi Capsule Hostel?",
		Answer:   "A first stay is your very first booking with Pelangi Capsule Hostel. We verify this by name and phone number against our guest records. If our records show a previous stay under the same name or contact number, the standard RM35 per night rate applies throughout. The hostel reserves the right to charge the standard RM35 rate if records indicate a prior stay.",
	},
	{
		Question: "Where exactly is Pelangi Capsule Hostel located?",
		Answer:   "Pelangi Capsule Hostel is located at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia. Taman Pelangi is a central neighbourhood in Johor Bahru known for restaurants, cafes, and the famous Taman Pelangi Night Market (pasar malam) every Tuesday from 4:30 PM. The hostel is a short Grab ride from JB Sentral, CIQ border checkpoint, and Senai International Airport.",
	},
	{
		Question: "How do I get to Pelangi Capsule Hostel from Singapore?",
		Answer:   "Pelangi Capsule Hostel is only 15 minutes by car from the Woodlands CIQ checkpoint at the Singapore-Malaysia border. Take a Grab or taxi from JB CIQ to 26A Jalan Perang, Taman Pelangi for around RM8–12. Alternatively, take bus CW1 from Woodlands to JB Sentral, then a short Grab ride to the hostel. Many Singapore visitors use Pelangi Capsule Hostel as an affordable base for exploring Johor Bahru.",
	},
	{
		Question: "Is there free WiFi at the hostel?",
		Answer:   "Yes, Pelangi Capsule Hostel provides complimentary high-speed WiFi throughout the entire property, including inside the sleeping pod areas and the common lounge. The connection is reliable enough for video calls and remote work, making it a popular choice for digital nomads and business travellers visiting Johor Bahru.",
	},
	{
		Question: "What is a capsule pod? Is it like a dormitory?",
		Answer:   "A capsule pod is a private sleeping space inspired by Japanese capsule hotels. Each pod at Pelangi Capsule Hostel has a sliding door that locks for privacy, a premium mattress, personal climate control (fan and air-conditioning), adjustable LED lighting, USB charging ports, and a power outlet. Unlike open dormitory beds, capsule pods give you your own enclosed space with a door — offering more privacy than a traditional hostel at a similar budget price.",
	},
	{
		Question: "Do you provide towels and toiletries?",
		Answer:   "Yes, every guest at Pelangi Capsule Hostel receives a fresh towel. Body wash and shampoo are provided in the shared bathrooms at no extra charge. Toothbrushes and toothpaste are available for a small fee at the front desk. You do not need to bring your own toiletries.",
	},
	{
		Question: "Is there luggage storage available?",
		Answer:   "Yes, Pelangi Capsule Hostel provides personal lockers inside the pod room for your valuables. For larger luggage, we have a designated luggage storage area that you can use before check-in or after check-out at no extra charge. This is especially convenient for guests arriving early from Singapore or with late flights from Senai Airport.",
	},
	{
		Question: "What payment methods does Pelangi Capsule Hostel accept?",
		Answer:   "Pelangi Capsule Hostel accepts cash (Malaysian Ringgit), DuitNow QR (supported by all Malaysian banks and major e-wallets including Maybank, CIMB, Touch 'n Go, Boost, and GrabPay), and credit cards. DuitNow QR is the most convenient option for domestic travellers, while Singapore visitors can easily exchange currency at JB CIQ money changers before arrival.",
	},
	{
		Question: "Is breakfast included at Pelangi Capsule Hostel?",
		Answer:   "Breakfast is not included in the room rate, but Pelangi Capsule Hostel has a fully equipped shared kitchen where you can prepare your own meals. The hostel is located in Taman Pelangi, which is surrounded by dozens of affordable local restaurants, kopitiam (coffee shops), and mamak stalls. A typical Malaysian breakfast of nasi lemak or roti canai costs RM3–8 at nearby eateries.",
	},
	{
		Question: "Is Pelangi Capsule Hostel safe and secure?",
		Answer:   "Yes, safety is a top priority at Pelangi Capsule Hostel. The property has 24/7 CCTV surveillance, secure keypad entry, and personal lockers for valuables inside each pod room. Each capsule pod has a sliding door that locks from the inside. The hostel operates 24 hours with no curfew, so you can come and go freely at any time.",
	},
	{
		Question: "What attractions and food are near Pelangi Capsule Hostel?",
		Answer:   "Pelangi Capsule Hostel is in Taman Pelangi, one of Johor Bahru's most vibrant neighbourhoods. Within walking distance you will find the Taman Pelangi Night Market (Tuesday pasar malam with 500+ metres of food stalls), Restoran Hua Mui heritage coffee shop, and dozens of local eateries. Nearby attractions include KOMTAR JBCC mall, JB Old Chinese Temple, Arulmigu Sri Rajakaliamman Glass Temple, and the JB Waterfront. Legoland Malaysia is 25 minutes away by car.",
	},
	{
		Question: "Can I stay monthly at Pelangi Capsule Hostel?",
		Answer:   "Yes, Pelangi Capsule Hostel offers monthly rates from RM600/month (Upper Deck) or RM650/month (Lower Deck), making it one of the most affordable long-stay accommodation options in Johor Bahru. Monthly stays are popular with remote workers, digital nomads, and professionals on work assignments in JB. The rate includes all amenities: WiFi, air-conditioning, hot showers, kitchen access, and laundry facilities. We also offer an in-house laundry service at RM5/load for guests — cheaper than the outside dobi. If you prefer your own room, we also rent private rooms nearby from RM500 per month (RM250 deposit) — see the next question.",
	},
	{
		Question: "Do you have private rooms for monthly rent in Johor Bahru?",
		Answer:   "Yes. Alongside our capsule pods, the Pelangi Capsule Hostel team rents private rooms on a monthly basis from RM500 per month with a flat RM250 deposit — no two-months-plus-one-month-advance like typical JB room rentals. The rooms are located above the 7-Eleven in Taman Pelangi, a short walk from the hostel, with the neighbourhood's eateries and the Tuesday night market at your doorstep and the Singapore CIQ checkpoint about 15 minutes away. Availability changes month to month — WhatsApp +60 10-308 4289 (Jay) or +60 16-762 0815 (Alston) to check what is open and arrange a viewing.",
	},
	{
		Question: "Is the hostel quiet enough to sleep well?",
		Answer:   "Pelangi Capsule Hostel enforces a strict quiet policy in all sleeping pod areas. Each capsule is enclosed with a sliding door, providing sound insulation from other guests. For working, socialising, or making calls, there is a separate common lounge area so that the sleeping zone remains peaceful. Earplugs are also available at the front desk if you are a light sleeper.",
	},
	{
		Question: "Do I need to book in advance or can I walk in?",
		Answer:   "Walk-ins are welcome at Pelangi Capsule Hostel subject to availability, but booking in advance is recommended — especially on weekends and Malaysian public holidays when occupancy is highest. Book directly on our website at pelangicapsulehostel.com/book or message us on WhatsApp at +60 10-308 4289 to secure your pod. Direct bookings always get the best rate with no middleman fees.",
	},
	{
		Question: "What is the Malaysia Tourism Tax (TTx)?",
		Answer:   "The Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is a government-mandated charge under the Tourism Tax Act 2017. It applies to foreign tourists staying at licensed accommodation premises in Malaysia and is collected on behalf of the Royal Malaysian Customs Department. This tax is separate from the room rate and will be added to your bill at check-in if applicable. For more details, visit the official MyTTx portal at myttx.customs.gov.my.",
	},
	{
		Question: "How do I get from Senai Airport to Pelangi Capsule Hostel?",
		Answer:   "From Senai International Airport (JHB), take a Grab or taxi to 26A Jalan Perang, Taman Pelangi, Johor Bahru. The ride takes approximately 20–30 minutes and costs around RM25–35 depending on traffic. Airport taxis are available at the arrivals hall, or you can book a Grab ride using the app. There is no direct public bus from Senai Airport to Taman Pelangi.",
	},
	{
		Question: "Do Indian nationals need a visa to enter Malaysia?",
		Answer:   "Indian passport holders can apply for an eNTRI (15-day stay, online application) or an eVisa through Malaysia's official immigration portal before arrival. Indian nationals entering Malaysia directly from Singapore on a valid Singapore pass or long-term pass may enter Malaysia without a separate visa — check current rules at the official Malaysia Immigration website (imi.gov.my) before travel, as conditions change.",
	},
	{
		Question: "Is vegetarian food available near Pelangi Capsule Hostel?",
		Answer:   "Yes — Johor Bahru has a vibrant Indian food scene. Mamak stalls within walking distance of the hostel serve roti canai, dhal, dosai, and vegetarian nasi campur at RM3–8 per meal. For dedicated Indian vegetarian restaurants, Jalan Dhoby (Little India area) is a short Grab ride away and has South Indian banana-leaf and thali options. Many Chinese hawker stalls also offer vegetarian-friendly dishes.",
	},
	{
		Question: "What is the price of a capsule pod in Indian Rupees?",
		Answer:   "At current exchange rates (approximately RM1 ≈ ₹18), our capsule pods are RM35 (≈ ₹630) per night. New guests who book direct on our website pay RM30 (≈ ₹540) for their first night. Monthly stays are from RM600 (≈ ₹11,280). Check a live converter such as Google or XE for the most accurate rate on your travel date.",
	},
}
