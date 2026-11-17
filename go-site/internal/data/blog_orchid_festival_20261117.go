package data

// Daily blog 2026-11-17: Festival Orkid Johor Bahru 2026 (19-23 Nov, Hutan Bandar).
// Sources fetched 2026-11-17: visitjohor2026.my event page (p=12132; dates, venue, organiser,
// description) and The Smart Local Hutan Bandar guide (2026-05-20; address, hours, fees).
// The event page gives no entry fee, hours or programme, and the post says so.
func init() {
	posts := []BlogPost{
		{
			Slug:          "festival-orkid-johor-bahru-2026-hutan-bandar-19-23-november",
			Title:         "Festival Orkid Johor Bahru 2026 at Hutan Bandar, 19 – 23 November: What We Know",
			Excerpt:       "Johor Bahru's five-day orchid festival runs 19 to 23 November 2026 at Hutan Bandar, organised by MBJB. Here is what the official listing confirms, what it does not say, and how to combine it with the park. Checked 17 November 2026.",
			Date:          "2026-11-17",
			LastModified:  "2026-11-17",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "3 min read",
			Tags:          []string{"johor-bahru-events", "festival-orkid", "hutan-bandar", "things-to-do-johor-bahru", "free-things-to-do"},
			FeaturedImage: "/images/blog/festival-orkid-johor-bahru-2026-cover.webp",
			ImageAlt:      "Card reading Festival Orkid Johor Bahru 2026, Hutan Bandar, 19 to 23 November, with a RM35 capsule from Pelangi Capsule Hostel",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p><strong>Festival Orkid Johor Bahru 2026</strong> runs <strong>19 to 23 November 2026</strong> at <strong>Hutan Bandar, Johor Bahru</strong>. The listing on the Visit Johor 2026 site names <strong>Majlis Bandaraya Johor Bahru (MBJB)</strong> as the organiser and describes a five-day festival with floral displays, horticultural showcases, plant collections and activities for nature and gardening lovers. We read that listing on 17 November 2026.</p>

<figure class="blog-figure"><img src="/images/blog/festival-orkid-johor-bahru-2026-cover.webp" alt="Card reading Festival Orkid Johor Bahru 2026, Hutan Bandar, 19 to 23 November, with a RM35 capsule from Pelangi Capsule Hostel" loading="lazy" width="1200" height="630"><figcaption>Festival Orkid Johor Bahru 2026, 19 – 23 Nov.</figcaption></figure>

<h2>What the Official Listing Does Not Say</h2>
<p>The page lists the dates as "All Day". It gives <strong>no opening hours, no entry fee and no day-by-day programme</strong>. We have not found any of these elsewhere, so we are not guessing. For final details, the listing gives the Johor tourism office (JOTIC, Jalan Ayer Molek, Johor Bahru) as its contact.</p>

<h2>About the Venue: Hutan Bandar</h2>
<p>According to The Smart Local's guide (published 20 May 2026), Hutan Bandar is at <strong>Jalan Tasek Utara, Kolam Ayer, 80100 Johor Bahru</strong>. The park box lists <strong>7:00 AM – 7:00 PM daily</strong>, and says <strong>entrance to the park is free</strong>, although some attractions (such as the rope course, flying fox and the children's pool) charge separately. Parking is near the Anjung Selera Hutan Bandar coffee shop at the entrance or at the start of the canopy walk. The park has pond walking paths, a butterfly garden, playgrounds and a canopy walk that lights up between 8:30 PM and 10:30 PM from Friday to Sunday.</p>
<p>Those park hours and fees are from a May 2026 article. Festival days may run differently, so confirm before you travel. We have a separate guide to the neighbouring youth park: <a href="/blog/tmiyc-johor-bahru-free-outdoor-park-guide">TMIYC Johor Bahru free outdoor park guide</a>.</p>

<h2>Practical Tips</h2>
<ul>
  <li>The weekend of <strong>21 – 22 November</strong> falls inside the festival, so expect more families on those days. We have no crowd data, so this is a common-sense guess, not a forecast.</li>
  <li>Bring water, a hat or umbrella, and mosquito repellent for a park setting.</li>
  <li>Use e-hailing rather than driving if you are unsure about parking at festival time.</li>
</ul>

<h2>Staying in Johor Bahru</h2>
<p>A capsule at Pelangi Capsule Hostel is <strong>RM35 per night</strong>, and a new guest booking direct on our website pays <strong>RM30 for the first night</strong>. Check-in starts from <strong>2:00 PM</strong>. Bring your passport (or IC if Malaysian). Payment is in MYR or SGD. <a href="/book">Book direct here</a>, see <a href="/rooms">our rooms</a>, or <a href="/contact">contact us</a>.</p>

<h2>Sources (checked 17 November 2026)</h2>
<ul>
  <li><a href="https://visitjohor2026.my/?p=12132" target="_blank" rel="noopener">Visit Johor 2026 — Festival Orkid Johor Bahru 2026</a></li>
  <li><a href="https://thesmartlocal.com/read/hutan-bandar-mbjb-johor-bahru/amp/" target="_blank" rel="noopener">The Smart Local — Hutan Bandar MBJB guide (20 May 2026)</a></li>
</ul>
<p><small>Dates and details are as published by the organisers on the date checked and can change. General information, not an endorsement of any event.</small></p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
