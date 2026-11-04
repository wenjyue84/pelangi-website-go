package data

// Recurring series: "Johor Bahru mall events" (published every Wednesday and Friday).
// Edition 2026-10-30 covers 31 Oct to 14 Nov 2026. Appended via init() like
// blog_jb_mall_events_20261026.go so blog.go is not touched.
//
// Every date below traces to a page fetched on 2026-10-30: johormalls.com event pages
// (Karnival Jom Heboh, Yume ACG Fest, Deepavali, BIG Pharmacy expo, TCE Baby Expo,
// Furniture Fair, Tastefully Expo), midvalleysouthkey.com/whats-on and suteramall.com.
// Where a source did not state a date, time or price, the post says so instead of
// guessing. No confirmed data was found for City Square, Komtar JBCC, Paradigm or
// AEON Tebrau, and the post says that too.
func init() {
	posts := []BlogPost{
		{
			Slug:          "johor-bahru-mall-events-31-oct-14-nov-2026",
			Title:         "Johor Bahru Mall Events 31 Oct – 14 Nov 2026: Mid Valley Southkey, Sutera Mall &amp; Angsana",
			Excerpt:       "What is on at the big JB malls over the next two weeks: the last weekend of Yume ACG Fest and Karnival Jom Heboh, Deepavali and a baby expo at Mid Valley Southkey, and Sutera Mall's horror night. Dates checked 30 October 2026.",
			Date:          "2026-10-30",
			LastModified:  "2026-10-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"johor-bahru-events", "mid-valley-southkey", "sutera-mall", "angsana-johor-bahru-mall", "deepavali", "shopping", "things-to-do-johor-bahru"},
			FeaturedImage: "/images/blog/johor-bahru-mall-stage-event-crowd-cover.webp",
			ImageAlt:      "Shoppers watching a stage show with an LED screen in a Johor Bahru shopping mall atrium",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>This weekend, <strong>31 October – 1 November 2026</strong>, is the last for <strong>Yume ACG Fest</strong> at Sutera Mall, <strong>Karnival Jom Heboh</strong> at Angsana Johor Bahru Mall and the <strong>BIG Pharmacy Health, Beauty &amp; Baby Expo</strong> at Mid Valley Southkey. <strong>Deepavali decorations</strong> at Mid Valley Southkey run until <strong>15 November</strong>, and the <strong>64th TCE Baby Expo</strong> follows on <strong>7–9 November</strong>. We checked each listing on 30 October 2026.</p>

<figure class="blog-figure"><img src="/images/blog/johor-bahru-mall-events-31-oct-14-nov-2026.webp" alt="Card reading Johor Bahru mall events 31 October to 14 November 2026, Mid Valley Southkey, Sutera Mall, Angsana, with a RM35 capsule from Pelangi Capsule Hostel" loading="lazy" width="1200" height="630"><figcaption>JB mall events, 31 Oct – 14 Nov 2026.</figcaption></figure>

<h2>Mid Valley Southkey</h2>
<ul>
  <li><strong>Deepavali 2026, until 15 Nov, Ground Floor.</strong> Kolam displays at North Court Island and South Court Island. Spend <strong>RM300 or more on a single receipt</strong> and MVClub members can claim a stainless steel cup set at the South Information Counter. Redemptions are capped at 80 on weekdays and 100 on weekends, 3 per customer per day.</li>
  <li><strong>BIG Pharmacy Health, Beauty &amp; Baby Expo, 30 Oct – 1 Nov, 10 am – 10 pm.</strong> Mid Valley Exhibition Centre (MVEC), Level 3 exhibition hall, next to St. Giles Southkey. Hall entry is listed as free. Registering on the BIG app gets a free welcome kit (500 per day).</li>
  <li><strong>64th TCE Baby Expo, 7–9 Nov, 11 am – 9 pm.</strong> MVEC. Gift redemption starts at 11:10 am, deals start from RM0.50, and a gift with purchase needs a spend from RM50. A RM100 Mom-To-Be voucher goes to 300 eligible expecting mothers per day.</li>
  <li><strong>Focus Point World Sight Day, 2–8 Nov, Centre Court.</strong> Also <strong>Montigo Sweet Shop Pop-Up</strong> (2–8 Nov, North Court) and <strong>Omega Plus by Village Grocer</strong> (5–8 Nov, Lower Ground). Times and admission are not stated.</li>
  <li><strong>Johor Furniture &amp; Electrical Fair and Tastefully Expo.</strong> Both are listed for Mid Valley Southkey, but the pages we found give <em>no dates, hours or ticket price</em> (the furniture fair is described only as a three-day event). Check the organiser before you plan around them.</li>
  <li><strong>Maybank Singapore Tourist Privileges Program, until 31 Dec.</strong> Mall-wide. We did not open the benefits page, so ask at the information counter if you are visiting from Singapore.</li>
</ul>

<h2>Sutera Mall</h2>
<ul>
  <li><strong>Yume ACG Fest 2026, until 1 Nov, ground floor.</strong> Free entry. An anime, comics and games weekend. Opening hours were not stated.</li>
  <li><strong>The Most Horror Night 2026, 16 Oct – 10 Nov.</strong> Listed on Sutera Mall's own Happenings page. Time, venue and admission are not stated.</li>
</ul>
<p>Sutera Mall's Happenings page has more entries behind a "Load More" button that we did not open, so other events may exist.</p>

<h2>Angsana Johor Bahru Mall</h2>
<ul>
  <li><strong>Karnival Jom Heboh, until 1 Nov, Padang Begonia.</strong> The carnival is free and open <strong>10 am – 10 pm</strong>, with promo and food booths and stage activities. The Fun Run is on 1 November (8 KM flag-off 7:00 am, 5 KM start 7:30 am), but registration closed on 21 October.</li>
</ul>

<h2>Beyond the Malls</h2>
<ul>
  <li><strong>LEGOLAND Malaysia Brick-Tacular Holiday</strong> starts on 13 November, a theme-park event rather than a mall event.</li>
  <li><strong>IKEA Tebrau "Sorted Lah Open House", 31 Oct – 1 Nov</strong> is at a standalone store.</li>
</ul>

<h2>What About City Square, Komtar JBCC, Paradigm and AEON?</h2>
<p>We found no confirmed event dates for City Square, Komtar JBCC, Paradigm Mall or AEON Tebrau for this period, so we are not listing any. Check their own social pages before you go.</p>

<h2>Staying Near the Action</h2>
<p>A capsule at Pelangi Capsule Hostel is <strong>RM35 per night</strong>, and a new guest booking direct on our website pays <strong>RM30 for the first night</strong>. Check-in starts from <strong>2:00 PM</strong>. Bring your passport (or IC if Malaysian) because we need a photo of it to check you in. Weekend events fill rooms across Johor Bahru, so if your dates are fixed, <a href="/book">book direct here</a>. For the border crossing from Singapore, see <a href="/getting-here">Getting Here</a> and our <a href="/visa-run">visa run guide</a>.</p>

<h2>Sources (checked 30 October 2026)</h2>
<ul>
  <li><a href="https://www.midvalleysouthkey.com/whats-on/upcoming-week/" target="_blank" rel="noopener">Mid Valley Southkey — What's On</a></li>
  <li><a href="https://johormalls.com/news/happy-deepavali-mid-valley-southkey-2026" target="_blank" rel="noopener">JohorMalls — Happy Deepavali, Mid Valley Southkey</a></li>
  <li><a href="https://johormalls.com/news/big-pharmacy-hbb-expo-mvec-southkey-2026" target="_blank" rel="noopener">JohorMalls — BIG Pharmacy Health, Beauty &amp; Baby Expo</a></li>
  <li><a href="https://johormalls.com/news/tce-64th-baby-expo-mid-valley-southkey-2026" target="_blank" rel="noopener">JohorMalls — 64th TCE Baby Expo</a></li>
  <li><a href="https://johormalls.com/news/johor-furniture-electrical-fair-mid-valley-southkey-2026" target="_blank" rel="noopener">JohorMalls — Johor Furniture &amp; Electrical Fair</a></li>
  <li><a href="https://johormalls.com/news/tastefully-food-expo-mid-valley-southkey-nov-2026" target="_blank" rel="noopener">JohorMalls — Tastefully Expo, Mid Valley Southkey</a></li>
  <li><a href="https://johormalls.com/news/yume-acg-fest-sutera-mall-2026" target="_blank" rel="noopener">JohorMalls — Yume ACG Fest 2026, Sutera Mall</a></li>
  <li><a href="https://johormalls.com/news/karnival-jom-heboh-angsana-johor-bahru-2026" target="_blank" rel="noopener">JohorMalls — Karnival Jom Heboh, Angsana Johor Bahru</a></li>
  <li><a href="https://www.suteramall.com/" target="_blank" rel="noopener">Sutera Mall</a></li>
</ul>
<p><small>Event dates, programmes and prices are as published by the organisers on the date checked and can change. This list is general information, not an endorsement of any event. We publish a refreshed JB mall events post every Wednesday and Friday.</small></p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
