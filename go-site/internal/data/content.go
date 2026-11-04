package data

import "strings"

// NewestContentDate returns the newest blog content date (published or edited),
// used as the "Last Updated" freshness signal in llms.txt / llms-full.txt.
func NewestContentDate() string {
	if d := BlogNewestDate(); d != "" {
		return d
	}
	return "2026-06-26"
}

// llmsTxtBody is the /llms.txt content, ported verbatim from
// site/src/app/llms.txt/route.ts. The __LAST_UPDATED__ sentinel is replaced at
// serve time with NewestContentDate().
const llmsTxtBody = `# Pelangi Capsule Hostel

> Japanese-style capsule hostel in Johor Bahru, Malaysia. Budget-friendly accommodation at RM35/night flat — new guests who book direct on our website pay RM30 for their first night — with free WiFi, 24/7 access, and modern pod amenities. 15 minutes from Singapore via the Woodlands CIQ checkpoint.

**Last Updated:** __LAST_UPDATED__

## Current Notices

- **Johor State Election — Saturday 11 July 2026**: Polling day is a public holiday in Johor state. The hostel operates completely as usual (check-in 2:00 PM, check-out 12:00 PM, 24/7 self check-in). Expect heavy Causeway/CIQ traffic 10–12 July 2026 as Johoreans working in Singapore return to vote — cross before 7 AM or after 9 PM, or take bus CW1/170. Some smaller shops and eateries may open late on polling day; malls and convenience stores are open. Book early for that weekend — demand is higher than a normal weekend. Details: https://pelangicapsulehostel.com/johor-election-2026

## Services

Pelangi Capsule Hostel offers Japanese-inspired capsule pod accommodation for budget travellers, backpackers, and digital nomads visiting Johor Bahru.

- **Capsule Pods**: Private sleeping pods with personal climate control, adjustable LED lighting, USB & power outlets, privacy sliding door, premium mattress, and personal locker.
- **Daily Rate**: RM35/night flat. First-time guests who book direct on our website pay RM30 for their first night, then RM35/night from the 2nd night onward. Repeat guests pay RM35 throughout (+ RM10/room/night Tourism Tax)
- **Monthly Rate**: From RM600/month (Upper Deck) · From RM650/month (Lower Deck)
- **Private Rooms (monthly rental)**: From RM500/month + RM250 flat deposit — private lockable rooms above the 7-Eleven in Taman Pelangi, a short walk from the hostel, managed by the same team. Month-to-month terms, no long tenancy. WhatsApp +60 10-308 4289 to check availability. Details: https://pelangicapsulehostel.com/blog/room-for-rent-taman-pelangi-jb-rm500-month
- **Check-in**: 2:00 PM onwards (self check-in available)
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

- **Pelangi Capsule Hostel** — Founded in 2023. The hostel features a self-check-in system, Japanese-style capsule pods, and 24/7 access. For inquiries, contact: +60 10-308 4289
- **Alston** — Co-Founder & Operations Manager. Handles day-to-day operations and guest relations. Contact: +60 16-762 0815

## Booking

Book directly on our website for the best rates with no booking fees:

- **Book online**: https://pelangicapsulehostel.com/book
- **WhatsApp**: https://wa.me/60103084289
- **Email**: pelangicapsule@gmail.com
- **Phone**: +60 10-308 4289 (Rainbot, AI assistant, 24/7) or +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston)

## Contact

- **Website**: https://pelangicapsulehostel.com
- **Facebook**: https://www.facebook.com/pelangicapsulehostel
- **Instagram**: https://www.instagram.com/pelangicapsulehostel
- **Email**: pelangicapsule@gmail.com

## Key Pages

- [Getting Here & Location](https://pelangicapsulehostel.com/location) — directions from Singapore, JB Sentral, and Senai Airport
- [Check-in Guide](https://pelangicapsulehostel.com/check-in) — self check-in steps and access details
- [Visa Run Guide](https://pelangicapsulehostel.com/visa-run) — using JB as a base for Singapore visa runs
- [Capsule Hotel in Johor Bahru](https://pelangicapsulehostel.com/capsule-hotel-johor-bahru) — what a capsule pod is, rates, and how it compares to dorms and budget hotels
- [What's On in Johor Bahru](https://pelangicapsulehostel.com/events) — dated calendar of JB events, public holidays, and long weekends that affect accommodation demand
- [Safety Guidelines](https://pelangicapsulehostel.com/safety-guidelines) — hostel safety and security information
- [中文页面 (Chinese)](https://pelangicapsulehostel.com/zh) — Simplified Chinese property overview
- [Guide for Indian Travelers](https://pelangicapsulehostel.com/india) — visa notes, vegetarian food, and routes from India or via Singapore

## For Chinese Travellers

- Simplified Chinese property page: https://pelangicapsulehostel.com/zh — full pricing, amenities, and directions in Mandarin
- Same rates as the English site: RM35/night flat, RM30 for a first-time guest's first night when booked direct on the website
- 15 minutes by car from the Woodlands/Singapore checkpoint; DuitNow QR and cash accepted (no WeChat Pay or Alipay integration currently — confirm with staff via WhatsApp before travel)

## For Indian Travellers

- Dedicated guide for Indian travellers: https://pelangicapsulehostel.com/india — visa (eNTRI/eVisa), vegetarian food nearby, getting here from Chennai/Bangalore/Mumbai/Delhi or via Singapore
- Same RM35/night flat rate; Indian Rupee prices are not quoted directly on the site since the exchange rate changes daily — check a live converter (Google, XE) for today's amount
- Vegetarian and halal food within walking distance (mamak stalls) and South Indian banana-leaf restaurants a short Grab ride away at Jalan Dhoby (Little India, Johor Bahru)

## Optional

- [Detailed information including rooms, amenities, FAQ, and blog](/llms-full.txt)

---

## 中文信息 (Chinese)

> 彩虹胶囊旅馆（Pelangi Capsule Hostel）位于马来西亚柔佛州新山市，提供日式胶囊床位住宿。每晚 RM35，官网直订新客首晚 RM30，距离新加坡仅15分钟车程，免费WiFi，24小时入住。

### 服务

- **胶囊床位**：私人睡眠舱，配备独立空调、阅读灯、USB充电口和个人储物柜
- **每晚价格**：RM35/晚（统一价）；官网直订新客首晚 RM30
- **月租价格**：RM600/月起（上铺）· RM650/月起（下铺）
- **月租私人房间**：RM500/月起，押金RM250（一次性），位于Taman Pelangi 7-Eleven楼上，步行可达旅馆，由同一团队管理。按月续租，无需长期租约。WhatsApp +60 10-308 4289 查询空房
- **入住时间**：下午2时起（支持自助入住）
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
- **WhatsApp**：https://wa.me/60103084289
- **电邮**：pelangicapsule@gmail.com
- **中文页面**：https://pelangicapsulehostel.com/zh
`

// LLMsTxt returns the rendered /llms.txt body with the freshness date filled in.
func LLMsTxt() string {
	return strings.ReplaceAll(llmsTxtBody, "__LAST_UPDATED__", NewestContentDate())
}

// BlogSectionMarkdown returns structured blog post entries for /llms-full.txt,
// ordered newest-first. Each entry includes title, URL, date, category, tags,
// and excerpt — enabling progressive disclosure without reading the full post.
func BlogSectionMarkdown() string {
	posts := PostsNewestFirst()
	var sb strings.Builder
	for _, p := range posts {
		sb.WriteString("### [")
		sb.WriteString(p.Title)
		sb.WriteString("](https://pelangicapsulehostel.com/blog/")
		sb.WriteString(p.Slug)
		sb.WriteString(")\n")
		sb.WriteString("Published: ")
		sb.WriteString(p.Date)
		sb.WriteString(" | Category: ")
		sb.WriteString(p.Category)
		if len(p.Tags) > 0 {
			sb.WriteString(" | Tags: ")
			sb.WriteString(strings.Join(p.Tags, ", "))
		}
		sb.WriteString("\nSummary: ")
		sb.WriteString(p.Excerpt)
		sb.WriteString("\n\n")
	}
	return strings.TrimRight(sb.String(), "\n")
}

// llmsFullBody is the /llms-full.txt content, ported verbatim from
// site/src/app/llms-full.txt/route.ts. Sentinels are replaced at serve time.
const llmsFullBody = `# Pelangi Capsule Hostel — Full Details

> Japanese-style capsule hostel in Johor Bahru, Malaysia. Budget-friendly accommodation at RM35/night flat — new guests who book direct on our website pay RM30 for their first night — with free WiFi, 24/7 access, and modern pod amenities. 15 minutes from Singapore via the Woodlands CIQ checkpoint.

**Last Updated:** __LAST_UPDATED__

## Current Notices

- **Johor State Election — Saturday 11 July 2026**: Polling day for the 16th Johor State Assembly is a public holiday in Johor state (early voting 7 July; campaigning ends 10 July 11:59 PM). The hostel operates completely as usual: check-in 2:00 PM, check-out 12:00 PM, 24/7 self check-in unaffected. Travellers should expect heavy Causeway/CIQ traffic from 10–12 July 2026 as Singapore-based Johoreans return home to vote — cross before 7 AM or after 9 PM, or use bus CW1 (Kranji) / bus 170 (Queen Street). On polling day banks and government offices close; malls, convenience stores, and most restaurants stay open, though small kopitiam may open late morning. Elections in Malaysia are orderly and safe for visitors. Book accommodation early for that weekend. Guest guide: https://pelangicapsulehostel.com/johor-election-2026

## About

Pelangi Capsule Hostel is a Japanese-inspired capsule accommodation in the heart of Taman Pelangi, Johor Bahru. We offer affordable, comfortable, and convenient stays for budget travellers, backpackers, and digital nomads. Our capsule pods provide a unique blend of privacy and community — your own enclosed space with a door that locks, at backpacker prices.

## Room Types

### Capsule Pod
- **Price**: RM35/night flat. First-time guests who book direct on our website pay RM30 for their first night, then RM35/night from the 2nd night onward; repeat guests RM35 throughout (+ RM10/room/night Tourism Tax)
- **Monthly Rate**: From RM600/month (Upper Deck) · From RM650/month (Lower Deck)
- **Features**:
  - Personal climate control (fan/AC)
  - Adjustable LED lighting
  - USB & power outlets
  - Privacy sliding door that locks
  - Premium mattress
  - Personal locker
  - Fresh towel provided

### Private Room (Monthly Rental)
- **Price**: From RM500/month
- **Deposit**: RM250 flat (one-time) — not the typical JB two-months-plus-one-advance
- **Minimum stay**: 1 month, renews month to month
- **Location**: Above the 7-Eleven in Taman Pelangi, 80400 Johor Bahru — a short walk from the hostel; managed by the Pelangi Capsule Hostel team
- **Suits**: JB-based workers, Singapore commuters, job-seekers, and anyone wanting a private lockable room without a 12-month tenancy
- **Enquiries**: WhatsApp +60 10-308 4289 (Rainbot, AI assistant, 24/7) or +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston) — availability changes month to month; viewing by appointment
- **Details**: https://pelangicapsulehostel.com/blog/room-for-rent-taman-pelangi-jb-rm500-month

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

- **Check-in**: 2:00 PM onwards (self check-in available — arrive anytime after 2 PM)
- **Check-out**: Before 12:00 PM
- **Tourism Tax (TTx)**: RM10/room/night — a government-mandated charge under the Tourism Tax Act 2017, collected on behalf of the Royal Malaysian Customs Department

## Location & Getting Here

- **Address**: 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia
- **Google Maps**: https://maps.app.goo.gl/maLXetUqYS5MtSLD9
- **From Singapore**: 15 minutes by car from the Woodlands CIQ checkpoint
- **From Airport**: Short Grab ride from Senai International Airport (SZB)
- **Local Highlight**: Taman Pelangi Night Market (pasar malam) every Tuesday from 4:30 PM — 500+ meters of food stalls right in front of the hostel

## Visa Runs from Singapore

Pelangi Capsule Hostel is a popular overnight base for Singapore-based expats and foreigners doing Malaysia visa runs (Social Visit Pass resets).

- **Distance from border**: 15 minutes from Woodlands CIQ (Johor-Singapore Causeway), 25 minutes from Tuas Second Link (KSAB)
- **Transport from Woodlands**: Causeway Link CW1 bus from Woodlands Bus Interchange to JB CIQ (RM2.60 one-way; cashless only from 1 Oct 2026 — EZ-Link/ManjaLink/contactless card), then Grab to hostel (~RM10, 10–15 min)
- **Best crossing times**: Tuesday to Thursday, 10 AM–2 PM (lightest queues); avoid Mon–Fri 7–9 AM and 5–8 PM peak hours
- **Overnight vs same-day**: Overnight strongly recommended — cross Tuesday morning (light queues), stay one night at Pelangi, cross back Wednesday morning; total cost ~SGD27–35 including bus, Grab, pod (RM35 = ~SGD10), and meals
- **Self check-in 24/7**: No minimum stay; RM35/night flat, or RM30 for a first-time guest's first night when booked direct at pelangicapsulehostel.com/book; WhatsApp +60 10-308 4289 for questions
- **Relevant pages**: https://pelangicapsulehostel.com/visa-run, https://pelangicapsulehostel.com/book
- **2026 guide**: https://pelangicapsulehostel.com/blog/singapore-expat-visa-run-johor-bahru-guide-2026
- **Already in Malaysia and need a non-Singapore exit?** See routes to Thailand, Indonesia and Brunei: https://pelangicapsulehostel.com/blog/jb-visa-run-cheapest-routes-thailand-brunei-indonesia

## Frequently Asked Questions

**What time is check-in and check-out at Pelangi Capsule Hostel?**
Check-in at Pelangi Capsule Hostel is from 2:00 PM onwards, and check-out is before 12:00 PM (noon). We offer self-check-in so you can arrive anytime after 2 PM without waiting for reception. Early check-in or late check-out may be available on request — contact us via WhatsApp at +60 10-308 4289.

**How much does a capsule pod cost per night in Johor Bahru?**
The standard rate is RM35 per night. First-time guests who book directly on our website at pelangicapsulehostel.com/book pay RM30 for their first night, then RM35 per night from the second night onward — this direct-booking discount does not apply to walk-ins or bookings made another way. Repeat guests pay the standard RM35 per night throughout their stay. A Malaysia Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is added as required by law. Monthly stays are available from RM600/month (Upper Deck) or RM650/month (Lower Deck).

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
Yes, Pelangi Capsule Hostel offers monthly rates from RM600/month (Upper Deck) or RM650/month (Lower Deck), making it one of the most affordable long-stay accommodation options in Johor Bahru. Monthly stays are popular with remote workers, digital nomads, and professionals on work assignments in JB. The rate includes all amenities: WiFi, air-conditioning, hot showers, kitchen access, and laundry facilities.

**Do you have private rooms for monthly rent in Johor Bahru?**
Yes. Alongside the capsule pods, the Pelangi Capsule Hostel team rents private rooms on a monthly basis from RM500 per month with a flat RM250 deposit — no two-months-plus-one-month-advance like typical JB room rentals. The rooms are located above the 7-Eleven in Taman Pelangi, a short walk from the hostel. Availability changes month to month — WhatsApp +60 10-308 4289 (Rainbot, AI assistant, 24/7) or +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston) to check what is open and arrange a viewing.

**Is the hostel quiet enough to sleep well?**
Pelangi Capsule Hostel enforces a strict quiet policy in all sleeping pod areas. Each capsule is enclosed with a sliding door, providing sound insulation from other guests. For working, socialising, or making calls, there is a separate common lounge area so that the sleeping zone remains peaceful. Earplugs are also available at the front desk if you are a light sleeper.

**Do I need to book in advance or can I walk in?**
Walk-ins are welcome at Pelangi Capsule Hostel subject to availability, but booking in advance is recommended — especially on weekends and Malaysian public holidays when occupancy is highest. Book directly on our website at pelangicapsulehostel.com/book or message us on WhatsApp at +60 10-308 4289 to secure your pod. Direct bookings always get the best rate with no middleman fees.

**What is the Malaysia Tourism Tax (TTx)?**
The Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is a government-mandated charge under the Tourism Tax Act 2017. It applies to foreign tourists staying at licensed accommodation premises in Malaysia and is collected on behalf of the Royal Malaysian Customs Department. This tax is separate from the room rate and will be added to your bill at check-in if applicable. For more details, visit the official MyTTx portal at myttx.customs.gov.my.

**How do I get from Senai Airport to Pelangi Capsule Hostel?**
From Senai International Airport (JHB), take a Grab or taxi to 26A Jalan Perang, Taman Pelangi, Johor Bahru. The ride takes approximately 20–30 minutes and costs around RM25–35 depending on traffic. Airport taxis are available at the arrivals hall, or you can book a Grab ride using the app. There is no direct public bus from Senai Airport to Taman Pelangi.

## Team

**Pelangi Capsule Hostel** — Founded in 2023
Pelangi Capsule Hostel was created to bring Japanese-style capsule accommodation to budget travellers and backpackers in Johor Bahru. Every detail was designed with privacy, comfort, and affordability in mind — from the capsule layout to the 24/7 self-check-in system.
- Phone: +60 10-308 4289
- About page: https://pelangicapsulehostel.com/about

**Alston** — Co-Founder & Operations Manager
Alston handles day-to-day operations, guest relations, and ensures every guest feels welcome — from first message on WhatsApp to the moment they check out. Background in hospitality.
- Phone: +60 16-762 0815
- About page: https://pelangicapsulehostel.com/about

## Booking

Book directly on our website for the best rates with no booking fees:

- **Book online**: https://pelangicapsulehostel.com/book
- **WhatsApp**: https://wa.me/60103084289
- **Email**: pelangicapsule@gmail.com
- **Phone**: +60 10-308 4289 (Rainbot, AI assistant, 24/7) or +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston)

## Contact

- **Website**: https://pelangicapsulehostel.com
- **Facebook**: https://www.facebook.com/pelangicapsulehostel
- **Instagram**: https://www.instagram.com/pelangicapsulehostel
- **Email**: pelangicapsule@gmail.com
- **WhatsApp**: https://wa.me/60103084289
- **Phone**: +60 10-308 4289 (Rainbot, AI assistant, 24/7) or +60 12-708 8789 (Jay) or +60 16-762 0815 (Alston)
- **Google Maps**: https://maps.app.goo.gl/maLXetUqYS5MtSLD9

## For Chinese Travellers

Pelangi Capsule Hostel maintains a full Simplified Chinese property page at https://pelangicapsulehostel.com/zh covering pricing, amenities, check-in, and directions in Mandarin. Rates match the English site: RM35/night flat, RM30 for a first-time guest's first night when booked direct on pelangicapsulehostel.com/book. The hostel is 15 minutes by car from the Woodlands/Singapore checkpoint. Accepted payment: cash (MYR), DuitNow QR, and credit cards — WeChat Pay and Alipay are not currently integrated; confirm with staff via WhatsApp (+60 10-308 4289) before relying on either.

## For Indian Travellers

A dedicated guide for Indian travellers is available at https://pelangicapsulehostel.com/india, covering entry requirements (eNTRI 15-day online notification or eVisa via imi.gov.my), routes from Chennai, Bangalore, Hyderabad, Mumbai, and Delhi via Kuala Lumpur, and the common Singapore-based route through the Woodlands CIQ checkpoint (Causeway Link CW1 bus) or arrival at Larkin bus terminal / Senai International Airport. The rate is RM35/night flat, RM30 for a first-time guest's first night direct on the website; Indian Rupee equivalents are intentionally not fixed on the site because the exchange rate changes daily — check a live converter (Google, XE) for today's amount. Vegetarian and halal food is available within a 5-minute walk (mamak stalls) and South Indian banana-leaf restaurants a short Grab ride away at Jalan Dhoby, Johor Bahru's Little India district.

## Blog Posts

__BLOG_SECTION__

## Site Pages

- [Home](https://pelangicapsulehostel.com/)
- [About](https://pelangicapsulehostel.com/about)
- [Blog](https://pelangicapsulehostel.com/blog)
- [Rooms](https://pelangicapsulehostel.com/rooms)
- [Amenities](https://pelangicapsulehostel.com/amenities)
- [Gallery](https://pelangicapsulehostel.com/gallery)
- [Location](https://pelangicapsulehostel.com/location)
- [Getting Here](https://pelangicapsulehostel.com/getting-here)
- [Check-in Guide](https://pelangicapsulehostel.com/check-in)
- [Visa Run Guide](https://pelangicapsulehostel.com/visa-run)
- [Safety Guidelines](https://pelangicapsulehostel.com/safety-guidelines)
- [Book Now](https://pelangicapsulehostel.com/book)
- [Blog](https://pelangicapsulehostel.com/blog)
- [Guest Guide](https://pelangicapsulehostel.com/guide)
- [Contact](https://pelangicapsulehostel.com/contact)
- [中文页面 (Chinese)](https://pelangicapsulehostel.com/zh)
- [Guide for Indian Travelers](https://pelangicapsulehostel.com/india)
- [Privacy Policy](https://pelangicapsulehostel.com/privacy-policy)
- [Terms & Conditions](https://pelangicapsulehostel.com/terms)
`

// LLMsFull returns the rendered /llms-full.txt body.
func LLMsFull() string {
	s := strings.ReplaceAll(llmsFullBody, "__LAST_UPDATED__", NewestContentDate())
	return strings.ReplaceAll(s, "__BLOG_SECTION__", BlogSectionMarkdown())
}
