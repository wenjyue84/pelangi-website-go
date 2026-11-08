package data

// Daily blog 2026-11-08: Malaysia visa exemption for Indian and Chinese nationals runs to 31 Dec 2026; no extension found.
// Sources fetched 2026-11-08: thestar.com.my 2024-12-20 (30 days, to 31 Dec 2026, India + China),
// outlooktraveller.com 2025-08-13 (India, 30 days, work/business/study excluded; MDAC timing inconsistent in that article).
// Web searches 2026-11-08 found no reporting of an extension past 31 Dec 2026. EY page returned 404 (unread).
// Post states what is unconfirmed and does not quote MDAC timing.
func init() {
	posts := []BlogPost{
		{
			Slug:          "malaysia-visa-free-india-china-ends-31-december-2026-jb-visa-run",
			Title:         "Malaysia Visa-Free for Indian and Chinese Passports Runs to 31 December 2026: What to Know Before You Travel",
			Excerpt:       "Malaysia's 30-day visa exemption for Indian and Chinese nationals was extended to 31 December 2026. We found no announcement of an extension beyond that date. What is reported, what is unconfirmed, and how to plan a Johor Bahru trip around it. Checked 8 November 2026.",
			Date:          "2026-11-08",
			LastModified:  "2026-11-08",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "4 min read",
			Tags:          []string{"visa-free", "india", "china", "visa-exemption", "immigration", "johor-bahru", "malaysia", "travel-tips"},
			FeaturedImage: "/images/blog/malaysia-visa-free-india-china-2026-cover.webp",
			ImageAlt:      "Cover graphic: Malaysia visa exemption for India and China runs to 31 December 2026",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>Malaysia's visa exemption for <strong>Indian and Chinese nationals</strong> is reported to run until <strong>31 December 2026</strong>, with a stay of up to <strong>30 days</strong>. In our searches on 8 November 2026 we found <strong>no announcement</strong> that it continues after that date. If you plan to come in late December or early 2027, treat the end date as a real deadline and check the official Immigration Department (JIM) pages before you book.</p>

<h2>What Was Reported</h2>
<ul>
  <li><strong>End date:</strong> The Star, 20 December 2024, reports the extension of the visa exemption for Indian nationals "until Dec 31, 2026", and says China received the same extension to the same date.</li>
  <li><strong>Stay:</strong> the same article describes a 30-day visa exemption for nationals of China and India.</li>
  <li><strong>Purpose:</strong> Outlook Traveller (13 August 2025) says Indian citizens can enter visa-free for up to 30 days until 31 December 2026, and that employment, business and studies are explicitly excluded. That article is about Indian citizens only.</li>
</ul>
<p>Sources: <a href="https://www.thestar.com.my/news/nation/2024/12/20/malaysia-extends-visa-exemption-for-indian-nationals-until-2026" rel="noopener">The Star</a> and <a href="https://www.outlooktraveller.com/amp/story/News/travelling-to-malaysia-heres-what-indian-nationals-must-know-before-you-fly" rel="noopener">Outlook Traveller</a>, both read on 8 November 2026.</p>

<h2>What We Could Not Confirm</h2>
<ul>
  <li><strong>Any extension past 31 December 2026.</strong> Our searches on 8 November 2026 returned only the 2024-era extension reports. Absence of news is not proof that nothing is planned; ask JIM.</li>
  <li><strong>Exact rules for work, business or study.</strong> The reports we read disagree on detail, so if your trip is not plain tourism or a visit, check before you fly.</li>
  <li><strong>Arrival card timing.</strong> The two articles we read do not agree on when the Malaysia Digital Arrival Card (MDAC) must be submitted, so we are not quoting a number. Use our <a href="/blog/mdac-and-sg-arrival-card-jb-trip-checklist-2026">MDAC and SG Arrival Card checklist</a> and confirm on the official site.</li>
  <li><strong>One page we could not read.</strong> An EY tax alert on the extension returned a 404 when we opened it.</li>
</ul>

<h2>Who Should Care</h2>
<ul>
  <li><strong>Indian and Chinese visitors planning a Singapore-JB combination trip</strong> over Christmas or New Year: your entry to Malaysia falls close to the reported end date.</li>
  <li><strong>Frequent border hoppers</strong> relying on repeated visa-free entries: do not assume the exemption carries into 2027.</li>
  <li><strong>Other passports:</strong> this exemption is specific to India and China. Check the rules for your own nationality.</li>
</ul>

<h2>Practical Checklist (Our Suggestions)</h2>
<p>These are tips from the hostel desk, not statements from the reports above.</p>
<ul>
  <li>Check JIM's official announcements and your nearest Malaysian embassy before booking anything non-refundable that crosses 31 December.</li>
  <li>Choose flexible or refundable bookings for dates after 31 December 2026 until an official notice appears.</li>
  <li>Carry your return or onward ticket and accommodation booking. See <a href="/blog/how-to-get-accommodation-proof-malaysia-immigration">how to get accommodation proof</a>.</li>
  <li>Also read about the recent <a href="/blog/malaysia-multiple-entry-visa-31-nationalities-visa-run-jb">Multiple Entry Visa change</a>, the <a href="/blog/singapore-expat-visa-run-johor-bahru-guide-2026">Singapore visa-run guide</a> and <a href="/blog/jb-singapore-immigration-tips-beat-queue-2026">immigration queue tips</a>.</li>
</ul>

<h2>Stay at Pelangi</h2>
<p>Pelangi Capsule Hostel is at 26A Jalan Perang, Taman Pelangi, Johor Bahru. A capsule is <strong>RM35 per night</strong>, and <strong>RM30 for the first night</strong> if you are a first-time guest booking direct on our website. Check-in is from 2:00 PM. We accept payment in MYR and SGD. <a href="/book">Book direct</a>, see <a href="/rooms">rooms</a>, or <a href="/contact">contact us</a>. We cannot give visa advice; please ask JIM or your embassy.</p>

<h2>FAQ</h2>
<h3>Is Malaysia visa-free for Indian and Chinese citizens?</h3>
<p>Reports say yes, for up to 30 days, until 31 December 2026, for non-work, non-study purposes. Confirm on official pages before travel.</p>
<h3>Will the exemption be extended beyond 2026?</h3>
<p>We found no announcement as of 8 November 2026. Check JIM for updates.</p>
<h3>Does this apply to other nationalities?</h3>
<p>No. The reports we read cover India and China only. Check the rules for your own passport.</p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
