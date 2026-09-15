import { blogPosts } from "@/data/blog/posts";

export async function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Newest content date (published or last-edited) across the blog, for freshness signals.
  const lastUpdated =
    blogPosts
      .map((p) => p.lastModified ?? p.date)
      .sort()
      .at(-1) ?? "";

  const blogSection = sortedPosts
    .map(
      (post) =>
        `- [${post.title}](https://pelangicapsulehostel.com/blog/${post.slug}) — ${post.excerpt}`
    )
    .join("\n");

  const content = `# Pelangi Capsule Hostel — Full Details

> Japanese-style capsule hostel in Johor Bahru, Malaysia. Budget-friendly accommodation from RM35/night with free WiFi, 24/7 access, and modern pod amenities. 15 minutes from Singapore via the Woodlands CIQ checkpoint.

**Last Updated:** ${lastUpdated}

## About

Pelangi Capsule Hostel is a Japanese-inspired capsule accommodation in the heart of Taman Pelangi, Johor Bahru. We offer affordable, comfortable, and convenient stays for budget travellers, backpackers, and digital nomads. Our capsule pods provide a unique blend of privacy and community — your own enclosed space with a door that locks, at backpacker prices.

## Room Types

### Capsule Pod
- **Price**: From RM35/night (+ RM10/room/night Tourism Tax)
- **Monthly Rate**: RM600–RM650/month
- **Features**:
  - Personal climate control (fan/AC)
  - Adjustable LED lighting
  - USB & power outlets
  - Privacy sliding door that locks
  - Premium mattress
  - Personal locker
  - Fresh towel provided

## Amenities

- Free high-speed WiFi throughout the hostel (sleeping pods + common areas)
- Air-conditioned sleeping areas
- 24/7 access — no curfew, no lockouts
- In-house laundry service for guests: RM5/load (since March 2026, cheaper than outside dobi)
- Shared kitchen — fully equipped for cooking meals
- Personal lockers for valuables
- Luggage storage before check-in / after check-out
- Hot showers with body wash and shampoo
- 24/7 CCTV and secure premises
- Common lounge for socialising and remote work
- Quiet policy in sleeping pod areas

## Check-in & Check-out

- **Check-in**: 3:00 PM onwards (self check-in available — arrive anytime after 3 PM)
- **Check-out**: Before 12:00 PM
- **Tourism Tax (TTx)**: RM10/room/night — a government-mandated charge under the Tourism Tax Act 2017, collected on behalf of the Royal Malaysian Customs Department

## Location & Getting Here

- **Address**: 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia
- **Google Maps**: https://maps.app.goo.gl/maLXetUqYS5MtSLD9
- **From Singapore**: 15 minutes by car from the Woodlands CIQ checkpoint
- **From Airport**: Short Grab ride from Senai International Airport (SZB)
- **Local Highlight**: Taman Pelangi Night Market (pasar malam) every Tuesday from 4:30 PM — 500+ meters of food stalls right in front of the hostel

## Frequently Asked Questions

**What time is check-in and check-out at Pelangi Capsule Hostel?**
Check-in at Pelangi Capsule Hostel is from 3:00 PM onwards, and check-out is before 12:00 PM (noon). We offer self-check-in so you can arrive anytime after 3 PM without waiting for reception. Early check-in or late check-out may be available on request — contact us via WhatsApp at +60 12-708 8789.

**How much does a capsule pod cost per night in Johor Bahru?**
Capsule pods at Pelangi Capsule Hostel start from RM35 per night. A Malaysia Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is added as required by law. Monthly stays are available from RM600–RM650 per month. Book directly on our website at pelangicapsulehostel.com/book for the best rate with no booking fees or OTA commissions.

**Where exactly is Pelangi Capsule Hostel located?**
Pelangi Capsule Hostel is located at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia. Taman Pelangi is a central neighbourhood in Johor Bahru known for restaurants, cafes, and the famous Taman Pelangi Night Market (pasar malam) every Tuesday from 4:30 PM. The hostel is a short Grab ride from JB Sentral, CIQ border checkpoint, and Senai International Airport.

**How do I get to Pelangi Capsule Hostel from Singapore?**
Pelangi Capsule Hostel is only 15 minutes by car from the Woodlands CIQ checkpoint at the Singapore-Malaysia border. Take a Grab or taxi from JB CIQ to 26A Jalan Perang, Taman Pelangi for around RM8–12. Alternatively, take bus CW1 from Woodlands to JB Sentral, then a short Grab ride to the hostel. Many Singapore visitors use Pelangi Capsule Hostel as an affordable base for exploring Johor Bahru.

**Is there free WiFi at the hostel?**
Yes, Pelangi Capsule Hostel provides complimentary high-speed WiFi throughout the entire property, including inside the sleeping pod areas and the common lounge. The connection is reliable enough for video calls and remote work, making it a popular choice for digital nomads and business travellers visiting Johor Bahru.

**What is a capsule pod? Is it like a dormitory?**
A capsule pod is a private sleeping space inspired by Japanese capsule hotels. Each pod at Pelangi Capsule Hostel has a sliding door that locks for privacy, a premium mattress, personal climate control (fan and air-conditioning), adjustable LED lighting, USB charging ports, and a power outlet. Unlike open dormitory beds, capsule pods give you your own enclosed space with a door — offering more privacy than a traditional hostel at a similar budget price.

**Do you provide towels and toiletries?**
Yes, every guest at Pelangi Capsule Hostel receives a fresh towel. Body wash and shampoo are provided in the shared bathrooms at no extra charge. Toothbrushes and toothpaste are available for a small fee at the front desk. You do not need to bring your own toiletries.

**Is there luggage storage available?**
Yes, Pelangi Capsule Hostel provides personal lockers inside the pod room for your valuables. For larger luggage, we have a designated luggage storage area that you can use before check-in or after check-out at no extra charge. This is especially convenient for guests arriving early from Singapore or with late flights from Senai Airport.

**What payment methods does Pelangi Capsule Hostel accept?**
Pelangi Capsule Hostel accepts cash (Malaysian Ringgit), DuitNow QR (supported by all Malaysian banks and major e-wallets including Maybank, CIMB, Touch 'n Go, Boost, and GrabPay), and credit cards. DuitNow QR is the most convenient option for domestic travellers, while Singapore visitors can easily exchange currency at JB CIQ money changers before arrival.

**Is breakfast included at Pelangi Capsule Hostel?**
Breakfast is not included in the room rate, but Pelangi Capsule Hostel has a fully equipped shared kitchen where you can prepare your own meals. The hostel is located in Taman Pelangi, which is surrounded by dozens of affordable local restaurants, kopitiam (coffee shops), and mamak stalls. A typical Malaysian breakfast of nasi lemak or roti canai costs RM3–8 at nearby eateries.

**Is Pelangi Capsule Hostel safe and secure?**
Yes, safety is a top priority at Pelangi Capsule Hostel. The property has 24/7 CCTV surveillance, secure keypad entry, and personal lockers for valuables inside each pod room. Each capsule pod has a sliding door that locks from the inside. The hostel operates 24 hours with no curfew, so you can come and go freely at any time.

**What attractions and food are near Pelangi Capsule Hostel?**
Pelangi Capsule Hostel is in Taman Pelangi, one of Johor Bahru's most vibrant neighbourhoods. Within walking distance you will find the Taman Pelangi Night Market (Tuesday pasar malam with 500+ metres of food stalls), Restoran Hua Mui heritage coffee shop, and dozens of local eateries. Nearby attractions include KOMTAR JBCC mall, JB Old Chinese Temple, Arulmigu Sri Rajakaliamman Glass Temple, and the JB Waterfront. Legoland Malaysia is 25 minutes away by car.

**Can I stay monthly at Pelangi Capsule Hostel?**
Yes, Pelangi Capsule Hostel offers monthly rates from RM600–RM650 per month, making it one of the most affordable long-stay accommodation options in Johor Bahru. Monthly stays are popular with remote workers, digital nomads, and professionals on work assignments in JB. The rate includes all amenities: WiFi, air-conditioning, hot showers, kitchen access, and laundry facilities.

**Is the hostel quiet enough to sleep well?**
Pelangi Capsule Hostel enforces a strict quiet policy in all sleeping pod areas. Each capsule is enclosed with a sliding door, providing sound insulation from other guests. For working, socialising, or making calls, there is a separate common lounge area so that the sleeping zone remains peaceful. Earplugs are also available at the front desk if you are a light sleeper.

**Do I need to book in advance or can I walk in?**
Walk-ins are welcome at Pelangi Capsule Hostel subject to availability, but booking in advance is recommended — especially on weekends and Malaysian public holidays when occupancy is highest. Book directly on our website at pelangicapsulehostel.com/book or message us on WhatsApp at +60 12-708 8789 to secure your pod. Direct bookings always get the best rate with no middleman fees.

**What is the Malaysia Tourism Tax (TTx)?**
The Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is a government-mandated charge under the Tourism Tax Act 2017. It applies to foreign tourists staying at licensed accommodation premises in Malaysia and is collected on behalf of the Royal Malaysian Customs Department. This tax is separate from the room rate and will be added to your bill at check-in if applicable. For more details, visit the official MyTTx portal at myttx.customs.gov.my.

**How do I get from Senai Airport to Pelangi Capsule Hostel?**
From Senai International Airport (JHB), take a Grab or taxi to 26A Jalan Perang, Taman Pelangi, Johor Bahru. The ride takes approximately 20–30 minutes and costs around RM25–35 depending on traffic. Airport taxis are available at the arrivals hall, or you can book a Grab ride using the app. There is no direct public bus from Senai Airport to Taman Pelangi.

## Team

**Jay Lew** — Co-Founder & Hostel Owner
Jay built Pelangi Capsule Hostel in 2023 after years of backpacking across Japan and Southeast Asia. He designed every detail of the hostel — from the capsule layout to the self-check-in system — to give travellers the privacy and freedom he always wanted on the road.
- Phone: +60 12-708 8789
- About page: https://pelangicapsulehostel.com/about

**Alston** — Co-Founder & Operations Manager
Alston handles day-to-day operations, guest relations, and ensures every guest feels welcome — from first message on WhatsApp to the moment they check out. Background in hospitality.
- Phone: +60 16-762 0815
- About page: https://pelangicapsulehostel.com/about

## Booking

Book directly on our website for the best rates with no booking fees:

- **Book online**: https://pelangicapsulehostel.com/book
- **WhatsApp**: https://wa.me/60127088789
- **Email**: pelangicapsule@gmail.com
- **Phone**: +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston)

## Contact

- **Website**: https://pelangicapsulehostel.com
- **Facebook**: https://www.facebook.com/pelangicapsulehostel
- **Instagram**: https://www.instagram.com/pelangicapsulehostel
- **Email**: pelangicapsule@gmail.com
- **WhatsApp**: https://wa.me/60127088789
- **Phone**: +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston)
- **Google Maps**: https://maps.app.goo.gl/maLXetUqYS5MtSLD9

## Blog Posts

${blogSection}

## Site Pages

- [Home](https://pelangicapsulehostel.com/)
- [About](https://pelangicapsulehostel.com/about)
- [Author: Jay Lew](https://pelangicapsulehostel.com/author/jay-lew)
- [Rooms](https://pelangicapsulehostel.com/rooms)
- [Amenities](https://pelangicapsulehostel.com/amenities)
- [Gallery](https://pelangicapsulehostel.com/gallery)
- [Location](https://pelangicapsulehostel.com/location)
- [Getting Here](https://pelangicapsulehostel.com/getting-here)
- [Check-in Guide](https://pelangicapsulehostel.com/check-in)
- [Visa Run Guide](https://pelangicapsulehostel.com/visa-run)
- [Visit Malaysia 2026](https://pelangicapsulehostel.com/visit-malaysia-2026)
- [Singapore Jobs Guide](https://pelangicapsulehostel.com/singapore-jobs)
- [Safety Guidelines](https://pelangicapsulehostel.com/safety-guidelines)
- [Book Now](https://pelangicapsulehostel.com/book)
- [Blog](https://pelangicapsulehostel.com/blog)
- [Guest Guide](https://pelangicapsulehostel.com/guide)
- [Contact](https://pelangicapsulehostel.com/contact)
- [中文页面 (Chinese)](https://pelangicapsulehostel.com/zh)
- [Privacy Policy](https://pelangicapsulehostel.com/privacy-policy)
- [Terms & Conditions](https://pelangicapsulehostel.com/terms)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
