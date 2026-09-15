import { blogPosts } from "@/data/blog/posts";

/** Newest content date (published or last-edited) across the blog, for freshness signals. */
function newestContentDate(): string {
  return blogPosts
    .map((p) => p.lastModified ?? p.date)
    .sort()
    .at(-1) ?? "";
}

export async function GET() {
  const lastUpdated = newestContentDate();

  const content = `# Pelangi Capsule Hostel

> Japanese-style capsule hostel in Johor Bahru, Malaysia. Budget-friendly accommodation from RM35/night with free WiFi, 24/7 access, and modern pod amenities. 15 minutes from Singapore via the Woodlands CIQ checkpoint.

**Last Updated:** ${lastUpdated}

## Services

Pelangi Capsule Hostel offers Japanese-inspired capsule pod accommodation for budget travellers, backpackers, and digital nomads visiting Johor Bahru.

- **Capsule Pods**: Private sleeping pods with personal climate control, adjustable LED lighting, USB & power outlets, privacy sliding door, premium mattress, and personal locker.
- **Daily Rate**: From RM35/night (+ RM10/room/night Tourism Tax)
- **Monthly Rate**: RM600–RM650/month
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

## Team

- **Jay Lew** — Co-Founder & Hostel Owner. Built Pelangi Capsule Hostel in 2023, designed the self-check-in system and capsule layout. Contact: +60 12-708 8789
- **Alston** — Co-Founder & Operations Manager. Handles day-to-day operations and guest relations. Contact: +60 16-762 0815

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

## Key Pages

- [About](https://pelangicapsulehostel.com/about) — hostel story and team
- [Rooms](https://pelangicapsulehostel.com/rooms) — capsule pod types and pricing
- [Amenities](https://pelangicapsulehostel.com/amenities) — facilities and services
- [Gallery](https://pelangicapsulehostel.com/gallery) — photos of the property
- [Getting Here & Location](https://pelangicapsulehostel.com/location) — directions from Singapore, JB Sentral, and Senai Airport
- [Check-in Guide](https://pelangicapsulehostel.com/check-in) — self check-in steps and access details
- [Visa Run Guide](https://pelangicapsulehostel.com/visa-run) — using JB as a base for Singapore visa runs
- [Visit Malaysia 2026](https://pelangicapsulehostel.com/visit-malaysia-2026) — Visit Malaysia Year 2026 travel guide
- [Singapore Jobs Guide](https://pelangicapsulehostel.com/singapore-jobs) — for guests commuting to work in Singapore
- [Safety Guidelines](https://pelangicapsulehostel.com/safety-guidelines) — hostel safety and security information
- [Blog](https://pelangicapsulehostel.com/blog) — travel and JB guides
- [Guest Guide](https://pelangicapsulehostel.com/guide) — practical guest information
- [Contact](https://pelangicapsulehostel.com/contact) — get in touch
- [中文页面 (Chinese)](https://pelangicapsulehostel.com/zh) — Simplified Chinese property overview

## Optional

- [Detailed information including rooms, amenities, FAQ, and blog](/llms-full.txt)

---

## 中文信息 (Chinese)

> 彩虹胶囊旅馆（Pelangi Capsule Hostel）位于马来西亚柔佛州新山市，提供日式胶囊床位住宿。每晚低至RM35起，距离新加坡仅15分钟车程，免费WiFi，24小时入住。

### 服务

- **胶囊床位**：私人睡眠舱，配备独立空调、阅读灯、USB充电口和个人储物柜
- **每晚价格**：RM35/晚起
- **月租价格**：RM600–RM650/月
- **入住时间**：下午3时起（支持自助入住）
- **退房时间**：中午12时前

### 设施

- 全区免费高速WiFi
- 冷气空调
- 24小时出入，无宵禁
- 洗衣服务：RM5/次
- 共用厨房
- 个人储物柜
- 热水淋浴（含洗浴用品）
- 毛巾提供
- 24小时闭路电视保安

### 地址与交通

- **地址**：26A Jalan Perang, Taman Pelangi, 80400 新山, 柔佛, 马来西亚
- 距新加坡兀兰关卡约15分钟车程
- 距士乃国际机场约20分钟Grab车程
- 每周二Taman Pelangi夜市在门口举行

### 预订联系

- **官网预订**：https://pelangicapsulehostel.com/book
- **WhatsApp**：https://wa.me/60127088789
- **电邮**：pelangicapsule@gmail.com
- **中文页面**：https://pelangicapsulehostel.com/zh
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
