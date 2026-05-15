import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { ROOM_TYPES, PROPERTY } from "@/data/rooms";
import { faqItems } from "@/data/faq-items";
import { blogPosts } from "@/data/blog/posts";

/**
 * GET /api/kb — Knowledge Base endpoint for Rainbow AI
 *
 * Returns structured JSON with room, FAQ, location, policies, and blog data
 * as markdown sections. Rainbow AI's website-kb-sync.ts fetches this every 6–24h
 * and writes it to .rainbow-kb/ markdown files for RAG consumption.
 *
 * Contract: KbPayload { version, property, updatedAt, sections: { rooms, faqs, location, policies, blog } }
 */

function buildRoomsSection(): string {
  const lines = ["# Room Types\n"];
  for (const room of ROOM_TYPES) {
    lines.push(`## ${room.name}`);
    lines.push(room.description);
    lines.push(`- **Nightly rate:** RM${room.nightlyRate}/night`);
    if (room.monthlyRate) {
      lines.push(`- **Monthly rate:** RM${room.monthlyRate}/month`);
    }
    lines.push(`- **Max occupancy:** ${room.maxOccupancy} person`);
    lines.push(`- **Total units:** ${room.totalUnits}`);
    lines.push(`- **Amenities:** ${room.amenities.join(", ")}`);
    lines.push("");
  }
  lines.push(`**Total capacity:** ${PROPERTY.totalRooms} pods`);
  lines.push(`**Check-in:** ${PROPERTY.checkinTime} | **Check-out:** ${PROPERTY.checkoutTime}`);
  return lines.join("\n");
}

function buildFaqsSection(): string {
  const lines = ["# Frequently Asked Questions\n"];
  for (const faq of faqItems) {
    lines.push(`## ${faq.question}`);
    lines.push(faq.answer);
    lines.push("");
  }
  return lines.join("\n");
}

function buildLocationSection(): string {
  return `# Location & Transport

## Address
26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia

**Google Maps:** https://maps.app.goo.gl/maLXetUqYS5MtSLD9

## Getting Here

### From Singapore (Woodlands CIQ)
- 15 minutes by car / Grab (RM8–12)
- Bus CW1 from Woodlands to JB Sentral, then Grab to hostel

### From Senai Airport (JHB)
- 20–30 minutes by Grab (RM25–35)
- Airport taxis available at arrivals hall

### From JB Sentral
- 10 minutes by Grab (RM6–10)

## Nearby Landmarks
- Taman Pelangi Night Market — every Tuesday from 4:30 PM (right at doorstep)
- Restoran Hua Mui heritage coffee shop — 5 min walk
- KOMTAR JBCC mall — 10 min drive
- JB Old Chinese Temple — 10 min drive
- Legoland Malaysia — 25 min drive

## Contact
- **WhatsApp:** +60 12-708 8789 (Jay) | +60 16-762 0815 (Alston)
- **Email:** pelangicapsule@gmail.com
- **Website:** https://pelangicapsulehostel.com
- **Book online:** https://pelangicapsulehostel.com/book
`;
}

function buildPoliciesSection(): string {
  return `# Policies & House Rules

## Check-in / Check-out
- **Check-in:** 3:00 PM onwards (self-check-in available 24/7)
- **Check-out:** Before 12:00 PM (noon)
- Early check-in / late check-out available on request via WhatsApp

## Tourism Tax (TTx)
- RM10 per room per night — government-mandated (Tourism Tax Act 2017)
- Collected at check-in, separate from room rate

## Payment Methods
- Cash (Malaysian Ringgit)
- DuitNow QR (all Malaysian banks + e-wallets: Maybank, CIMB, Touch 'n Go, Boost, GrabPay)
- Credit cards

## House Rules
- Strict quiet policy in sleeping pod areas
- Common lounge for socialising, calls, and remote work
- No smoking inside the premises
- No outside visitors past 10 PM
- 24/7 access — no curfew

## Amenities
- Free high-speed WiFi (network: "pelangi capsule", password: "ilovestaycapsule")
- Air-conditioned sleeping areas
- In-house laundry service: RM5/load
- Shared kitchen — fully equipped
- Personal lockers inside pods
- Hot showers with body wash and shampoo provided
- Fresh towels included
- 24/7 CCTV and secure premises
- Common lounge area

## Monthly Stays
- Available from RM594/month (Lower Deck Pod)
- Includes all amenities: WiFi, A/C, hot showers, kitchen, laundry
`;
}

function buildBlogSection(): string {
  const lines = ["# Blog & Travel Guides\n"];
  for (const post of blogPosts) {
    lines.push(`## ${post.title}`);
    lines.push(`*${post.date} | ${post.category} | ${post.readTime}*`);
    lines.push(post.excerpt);
    lines.push(`Tags: ${post.tags.join(", ")}`);
    lines.push(`URL: https://pelangicapsulehostel.com/blog/${post.slug}`);
    lines.push("");
  }
  return lines.join("\n");
}

export async function GET() {
  const sections = {
    rooms: buildRoomsSection(),
    faqs: buildFaqsSection(),
    location: buildLocationSection(),
    policies: buildPoliciesSection(),
    blog: buildBlogSection(),
  };

  const payload = {
    version: "1.0.0",
    property: PROPERTY.name,
    updatedAt: new Date().toISOString(),
    sections,
  };

  const body = JSON.stringify(payload);
  const etag = `"${createHash("sha256").update(body).digest("hex").slice(0, 16)}"`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      ETag: etag,
    },
  });
}
