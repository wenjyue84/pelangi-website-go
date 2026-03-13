import { blogPosts } from "@/data/blog/posts";

export async function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const blogSection = sortedPosts
    .map(
      (post) =>
        `- [${post.title}](https://pelangicapsulehostel.com/blog/${post.slug}) — ${post.excerpt}`
    )
    .join("\n");

  const content = `# Pelangi Capsule Hostel — Full Details

> Japanese-style capsule hostel in Johor Bahru, Malaysia. Budget-friendly accommodation from RM35/night with free WiFi, 24/7 access, and modern pod amenities. 15 minutes from Singapore via the Woodlands CIQ checkpoint.

## About

Pelangi Capsule Hostel is a Japanese-inspired capsule accommodation in the heart of Taman Pelangi, Johor Bahru. We offer affordable, comfortable, and convenient stays for budget travellers, backpackers, and digital nomads. Our capsule pods provide a unique blend of privacy and community — your own enclosed space with a door that locks, at backpacker prices.

The hostel is MOTAC-registered (Ministry of Tourism, Arts and Culture Malaysia).

## Room Types

### Capsule Pod
- **Price**: From RM35/night (+ RM10/room/night Tourism Tax)
- **Monthly Rate**: RM594/month
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
- 24-hour laundry service (dobi right downstairs)
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

**What time is check-in and check-out?**
Check-in is from 3:00 PM onwards, and check-out is before 11:00 AM. We offer self-check-in so you can arrive anytime after 3 PM.

**How much does it cost per night?**
Our capsule pods start from RM55 per night for a bed in a shared dormitory. Private pods are also available. Book direct for the best rate — no booking fees.

**Is there free WiFi?**
Yes. Complimentary high-speed WiFi throughout the hostel, including in the sleeping pod areas and the common lounge. Perfect for remote workers and travellers.

**Where is Pelangi Capsule Hostel located?**
In Johor Bahru city centre, just minutes from the Woodlands CIQ checkpoint and a short Grab ride from Senai International Airport. Address: 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru.

**How far is it from Singapore?**
Only 15 minutes by car from the Woodlands CIQ checkpoint in Singapore. A convenient and affordable base for day trips to Singapore.

**Do you provide towels and toiletries?**
Every pod comes with a fresh towel. Body wash and shampoo are provided in the shared bathrooms. Toothbrushes are available for a small fee.

**Is there luggage storage?**
Yes, lockers for valuables are in the room. For larger luggage, we have a designated luggage area before check-in or after check-out.

**Is it quiet? Can I work there?**
We have a strict quiet policy in the sleeping pods area. For working, there is a designated common area with high-speed WiFi.

**What is the Malaysia Tourism Tax (TTx)?**
The Tourism Tax (TTx) of RM10 per room per night is a government-mandated charge under the Tourism Tax Act 2017. It applies to all accommodation premises in Malaysia and is collected on behalf of the Royal Malaysian Customs Department.

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
- [Rooms](https://pelangicapsulehostel.com/rooms)
- [Amenities](https://pelangicapsulehostel.com/amenities)
- [Gallery](https://pelangicapsulehostel.com/gallery)
- [Location](https://pelangicapsulehostel.com/location)
- [Book Now](https://pelangicapsulehostel.com/book)
- [Blog](https://pelangicapsulehostel.com/blog)
- [Guest Guide](https://pelangicapsulehostel.com/guide)
- [Contact](https://pelangicapsulehostel.com/contact)
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
