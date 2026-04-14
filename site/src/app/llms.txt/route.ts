export async function GET() {
  const content = `# Pelangi Capsule Hostel

> Japanese-style capsule hostel in Johor Bahru, Malaysia. Budget-friendly accommodation from RM35/night with free WiFi, 24/7 access, and modern pod amenities. 15 minutes from Singapore via the Woodlands CIQ checkpoint.

## Services

Pelangi Capsule Hostel offers Japanese-inspired capsule pod accommodation for budget travellers, backpackers, and digital nomads visiting Johor Bahru.

- **Capsule Pods**: Private sleeping pods with personal climate control, adjustable LED lighting, USB & power outlets, privacy sliding door, premium mattress, and personal locker.
- **Daily Rate**: From RM35/night (+ RM10/room/night Tourism Tax)
- **Monthly Rate**: RM594/month
- **Check-in**: 3:00 PM onwards (self check-in available)
- **Check-out**: Before 12:00 PM

## Amenities

- Free high-speed WiFi throughout the hostel
- Air-conditioned sleeping areas
- 24/7 access — no curfew
- In-house laundry service for guests: RM5/load (since March 2026, cheaper than outside dobi)
- Shared kitchen — fully equipped
- Personal lockers and luggage storage
- Hot showers with body wash and shampoo provided
- Fresh towels included
- 24/7 CCTV and secure premises
- Common lounge for socialising and remote work

## Location

- **Address**: 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia
- **Google Maps**: https://maps.app.goo.gl/maLXetUqYS5MtSLD9
- 15 minutes by car from Singapore (Woodlands CIQ checkpoint)
- Short Grab ride from Senai International Airport
- Taman Pelangi Night Market (pasar malam) every Tuesday from 4:30 PM — right at the doorstep

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

## Optional

- [Detailed information including rooms, amenities, FAQ, and blog](/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
