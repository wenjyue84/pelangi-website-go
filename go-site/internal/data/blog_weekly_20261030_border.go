package data

// Weekly border-crossing posts, edition 2026-10-30. Appended via init() so blog.go is not touched.
// Facts trace to pages fetched on 2026-10-30: moe.gov.sg/calendar, ica.gov.sg (SG Arrival Card page,
// 2023 year-end media release), kln.gov.my MDAC notice, The Star (2023-12-05 and 2025-11-17).
// The MDAC fee, the MDAC portal's own wording and any 2026 ICA year-end advisory were NOT
// confirmed from a fetched page, and the posts say so.
func init() {
	posts := []BlogPost{
		{
			Slug:          "mdac-and-sg-arrival-card-jb-trip-checklist-2026",
			Title:         "MDAC and SG Arrival Card for a Johor Bahru Trip: Who Needs What (2026)",
			Excerpt:       "Crossing between Singapore and Johor Bahru by land? Here is who must submit Malaysia's MDAC and Singapore's SG Arrival Card, how many days ahead, and where the exemptions stop. Checked 30 October 2026.",
			Date:          "2026-10-30",
			LastModified:  "2026-10-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"mdac", "sg-arrival-card", "causeway", "immigration", "singapore-to-johor-bahru", "border-crossing"},
			FeaturedImage: "/images/blog/malaysia-immigration-entry-stamp-passport-mdac-jb-cover.webp",
			ImageAlt:      "Close-up of a Malaysia Immigration visit pass entry stamp in a passport",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>Two online forms matter for a JB trip. <strong>Malaysia's MDAC</strong> (Malaysia Digital Arrival Card) is for foreign citizens entering Malaysia, and Singapore citizens are exempt. <strong>Singapore's SG Arrival Card (SGAC)</strong> is for travellers entering Singapore, but Singapore Citizens, Permanent Residents and Long-Term Pass holders are exempt <em>only</em> when they travel through the Woodlands and Tuas checkpoints. Both are normally submitted within <strong>3 days before arrival</strong>. We checked the official pages on 30 October 2026, and where a page did not say something we say so below.</p>

<figure class="blog-figure"><img src="/images/blog/mdac-and-sg-arrival-card-jb-trip-checklist-2026.webp" alt="Card reading MDAC and SG Arrival Card checklist for a Johor Bahru trip, with a RM35 capsule from Pelangi Capsule Hostel" loading="lazy" width="1200" height="630"><figcaption>Two forms, two directions of travel.</figcaption></figure>

<h2>Malaysia: the MDAC</h2>
<p>A Malaysian government notice (posted on the Malaysian Ministry of Foreign Affairs mission site) says that from 1 January 2024 <strong>all foreign citizens travelling to Malaysia</strong> must complete the MDAC, to be submitted <strong>three days before arrival</strong>. The same notice lists exemptions that include <strong>citizens of Singapore</strong>, diplomatic and official passport holders, Malaysian permanent residents and long-term pass holders, and holders of certain Brunei, Thailand and Indonesia border documents.</p>
<p>The Star reported in December 2023 that the Home Minister said all Singaporean citizens would be exempt, and that the card applies at <em>all</em> entry points, not just the southern entry points in Johor. So a land crossing from Singapore into JB is covered by the rule, not an exception to it.</p>
<p><strong>What we could not confirm:</strong> the notice we fetched does not mention a fee, and the official portal page (imigresen-online.imi.gov.my/mdac/main) did not show the eligibility details in text we could read. Use only the official portal, and be careful of sites that charge to submit on your behalf.</p>

<h2>Singapore: the SG Arrival Card</h2>
<p>ICA's SG Arrival Card page says <strong>all travellers must submit the SGAC with electronic health declaration before arriving in Singapore</strong>, except people transiting without clearing immigration, and residents travelling through the <strong>Woodlands and Tuas checkpoints</strong>. In ICA's wording, residents there means Singapore Citizens, Permanent Residents and Long-Term Pass holders. Residents arriving by air or sea still need to submit it.</p>
<ul>
  <li><strong>When:</strong> within 3 days before arrival, counting the day of arrival (ICA's example: for a 30 June arrival you can submit from 28 June).</li>
  <li><strong>Fee:</strong> ICA says submitting the SGAC is free, and that it does not endorse commercial services that charge to submit for you.</li>
  <li><strong>How:</strong> through the SGAC e-Service or the MyICA mobile app.</li>
  <li><strong>At the counter:</strong> ICA says to present your travel document only.</li>
</ul>
<p>Malaysian passport holders are not on ICA's exemption list, so a Malaysian going into Singapore for the day should expect to submit the SGAC. That is our reading of ICA's list, so confirm on ICA's page if you are unsure.</p>

<h2>Which Form for Which Traveller?</h2>
<ul>
  <li><strong>Singapore citizen, day trip to JB by land:</strong> no MDAC (exempt). Coming home through Woodlands or Tuas, no SGAC either.</li>
  <li><strong>Foreign visitor staying in JB, going to Singapore and back by land:</strong> MDAC for Malaysia and SGAC for Singapore. Each applies to the country you are entering, so a same-day round trip can mean a form for each direction. Check each official page for whether one submission covers a return trip, because the pages we read do not say.</li>
  <li><strong>Malaysian citizen going to Singapore:</strong> no MDAC (you are not a foreign citizen in Malaysia), SGAC for Singapore.</li>
</ul>

<h2>Practical Tips</h2>
<ul>
  <li>Submit the night before, not in the queue, and screenshot the confirmation.</li>
  <li>Carry your passport anyway. ICA's page says you present your travel document at the counter.</li>
  <li>Immigration staff may ask where you are staying. See our guide on <a href="/blog/how-to-get-accommodation-proof-malaysia-immigration">getting accommodation proof for Malaysian immigration</a>.</li>
  <li>For queue strategy, read <a href="/blog/jb-singapore-immigration-tips-beat-queue-2026">immigration tips to beat the queue</a> and the <a href="/blog/causeway-crossing-guide-backpackers">Causeway crossing guide</a>.</li>
</ul>

<h2>FAQ</h2>
<h3>Is the MDAC the same as a visa?</h3>
<p>No. The notice describes it as an arrival card. Whether you also need a visa depends on your passport, so check the Malaysian immigration site (imi.gov.my).</p>
<h3>Do Singaporeans need the MDAC for a day trip?</h3>
<p>No. Citizens of Singapore are listed among the exemptions.</p>
<h3>Can I submit it a week early?</h3>
<p>The official wording is within three days before arrival, so wait until that window opens.</p>
<h3>Do I pay to submit either form?</h3>
<p>ICA says the SGAC is free. We could not confirm the MDAC fee from the pages we fetched, so use only the official portal.</p>

<h2>Stay at Pelangi</h2>
<p>Pelangi Capsule Hostel is at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. A capsule is <strong>RM35 per night</strong>, and <strong>RM30 for the first night</strong> if you book direct on our website. Check-in is from <strong>2:00 PM</strong> and check-out is by <strong>12:00 PM</strong>. We accept MYR and SGD (not USD). <a href="/book">Book direct here</a>, or see <a href="/rooms">our rooms</a> and <a href="/contact">contact us</a>.</p>

<h2>Sources (checked 30 October 2026)</h2>
<ul>
  <li><a href="https://www.kln.gov.my/web/aus_canberra/post/malaysia-digital-arrival-card-mdac--1" target="_blank" rel="noopener">Malaysian mission notice: Malaysia Digital Arrival Card (MDAC)</a></li>
  <li><a href="https://www.thestar.com.my/aseanplus/aseanplus-news/2023/12/05/singaporeans-exempt-from-malaysia-digital-arrival-card-that-applies-to-foreigners-from-jan-1" target="_blank" rel="noopener">The Star: Singaporeans exempt from MDAC (5 Dec 2023)</a></li>
  <li><a href="https://imigresen-online.imi.gov.my/mdac/main" target="_blank" rel="noopener">Malaysia Immigration: MDAC portal</a></li>
  <li><a href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card" target="_blank" rel="noopener">ICA: SG Arrival Card</a></li>
</ul>
<p><small>Entry rules change. This is general information, not legal or immigration advice. Always confirm on the official sites before you travel.</small></p>
`,
		},
		{
			Slug:          "causeway-year-end-school-holidays-2026-jb-crossing-tips",
			Title:         "Causeway and Second Link at Year-End 2026: School Holiday Crossing Tips",
			Excerpt:       "Singapore's year-end school holidays start 21 November 2026. Here is what ICA said in past years about heavy traffic and three-hour car waits, and how to plan a JB stay around it. Checked 30 October 2026.",
			Date:          "2026-10-30",
			LastModified:  "2026-10-30",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "5 min read",
			Tags:          []string{"causeway", "second-link", "school-holidays", "woodlands-checkpoint", "tuas-checkpoint", "singapore-to-johor-bahru", "year-end"},
			FeaturedImage: "/images/blog/second-link-bridge-johor-tuas-crossing.webp",
			ImageAlt:      "Malaysia-Singapore Second Link bridge crossing the Johor Strait on a clear day, with pink flowers in the foreground",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>Singapore's Ministry of Education calendar lists the <strong>year-end school holidays for primary and secondary schools as Saturday 21 November to Thursday 31 December 2026</strong>. In past years ICA warned of heavy traffic at Woodlands and Tuas throughout this period, with car travellers waiting up to three hours at peaks. <strong>We did not find a 2026 ICA advisory on 30 October 2026</strong>, so treat what follows as a pattern from earlier years, not a forecast. Check ICA's newsroom closer to the date.</p>

<figure class="blog-figure"><img src="/images/blog/causeway-year-end-school-holidays-2026-jb-crossing-tips.webp" alt="Card reading Causeway and Second Link year-end 2026 school holiday crossing tips, with a RM35 capsule from Pelangi Capsule Hostel" loading="lazy" width="1200" height="630"><figcaption>Plan ahead for 21 November to 31 December 2026.</figcaption></figure>

<h2>The Dates</h2>
<ul>
  <li>MOE Term 4 ends <strong>Friday 20 November 2026</strong>.</li>
  <li>Year-end holidays for primary and secondary: <strong>21 November – 31 December 2026</strong>.</li>
  <li>Post-secondary Years 1 and 2 (and Years 2 and 3) have a later start, <strong>28 November</strong>, per the MOE calendar.</li>
</ul>
<p>Deepavali weekend is separate and earlier. For that, see our <a href="/blog/deepavali-2026-jb-long-weekend-guide">Deepavali 2026 long weekend guide</a>.</p>

<h2>What ICA Has Said Before</h2>
<ul>
  <li><strong>November 2023 release:</strong> for the year-end holidays (16 November 2023 to 2 January 2024), ICA said car travellers &quot;may have to wait up to three hours&quot; at peak periods and advised allowing extra time, especially at weekends. It also asked motorists not to queue-cut (those caught are turned away and must re-queue) and reminded travellers to have at least six months of passport validity.</li>
  <li><strong>November 2025 (reported by The Star, 17 Nov 2025):</strong> travellers using Woodlands and Tuas from 21 November 2025 to 1 January 2026 were told to factor in extra waiting time. Some car travellers waited up to three hours over the Deepavali long weekend, and ICA said it would carry out intensified checks against e-vaporiser smuggling, which may lengthen waits.</li>
</ul>
<p>ICA's page for the 2023 release shows a &quot;last updated&quot; notice dated 2026, so it is still live, but the content is from 2023.</p>

<h2>Tips from the Advisories</h2>
<ul>
  <li><strong>Check traffic before you leave.</strong> ICA has pointed motorists to LTA's One Motoring website and the Expressway Monitoring &amp; Advisory System on the BKE and AYE.</li>
  <li><strong>Consider cross-border buses.</strong> The 2025 advisory suggested this to avoid congestion. See our <a href="/blog/jb-public-bus-guide-budget-backpackers">JB public bus guide</a>. We did not verify current bus timetables for this post.</li>
  <li><strong>Car and motorcycle travellers can use QR codes</strong> instead of passports for faster clearance, but must still carry their passports (2025 advisory).</li>
  <li><strong>Foreign-registered vehicles</strong> need a valid vehicle entry permit (VEP). Drivers without a valid Autopass card, the LTA VEP approval email or valid insurance will be turned back (2025 advisory). Follow LTA's pages for the current process.</li>
  <li><strong>Cooperate with officers</strong> and keep your lane. ICA says it will take stern action against those who do not.</li>
</ul>

<h2>Plan Your Stay Around the Queue</h2>
<ul>
  <li>Avoid crossing on the first weekend of the holidays (21–22 November) if you can. This is our suggestion, not an ICA statement.</li>
  <li>Staying overnight in JB lets you cross on a weekday and avoid sitting in a Friday-evening jam.</li>
  <li>Submit your arrival cards the night before. Our <a href="/blog/mdac-and-sg-arrival-card-jb-trip-checklist-2026">MDAC and SG Arrival Card checklist</a> explains who needs which.</li>
  <li>More strategy: <a href="/blog/jb-singapore-immigration-tips-beat-queue-2026">tips to beat the queue</a> and the <a href="/blog/causeway-crossing-guide-backpackers">Causeway crossing guide</a>.</li>
</ul>

<h2>FAQ</h2>
<h3>When do Singapore school holidays start in late 2026?</h3>
<p>For primary and secondary schools, Saturday 21 November 2026, ending Thursday 31 December 2026 (MOE calendar).</p>
<h3>How long are the waits?</h3>
<p>Past ICA advisories mention up to three hours for cars at peak times. There is no 2026 figure yet.</p>
<h3>Is the bus faster than a car?</h3>
<p>ICA's 2025 advisory suggested cross-border buses to avoid congestion. We have not measured wait times ourselves.</p>
<h3>Where can I see live traffic?</h3>
<p>ICA has directed motorists to LTA's One Motoring website and the Expressway Monitoring &amp; Advisory System on the BKE and AYE.</p>

<h2>Stay at Pelangi</h2>
<p>Pelangi Capsule Hostel is at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. A capsule is <strong>RM35 per night</strong>, and <strong>RM30 for the first night</strong> if you book direct on our website. Check-in is from <strong>2:00 PM</strong> and check-out is by <strong>12:00 PM</strong>. We accept MYR and SGD (not USD). Holiday dates fill up, so <a href="/book">book direct here</a>, or see <a href="/rooms">our rooms</a> and <a href="/contact">contact us</a>.</p>

<h2>Sources (checked 30 October 2026)</h2>
<ul>
  <li><a href="https://www.moe.gov.sg/calendar" target="_blank" rel="noopener">MOE Singapore: School terms and holidays calendar</a></li>
  <li><a href="https://ica.gov.sg/news-and-publications/newsroom/media-release/heavy-traffic-expected-at-land-checkpoints-during-the-year-end-school-holidays" target="_blank" rel="noopener">ICA media release: Heavy Traffic Expected at Land Checkpoints During the Year End School Holidays (15 Nov 2023)</a></li>
  <li><a href="https://www.thestar.com.my/aseanplus/aseanplus-news/2025/11/17/heavy-traffic-expected-at-woodlands-and-tuas-checkpoints-during-year-end-school-holidays-more-checks-against-smuggling-of-e-vaporisers" target="_blank" rel="noopener">The Star (17 Nov 2025): Heavy traffic expected at Woodlands and Tuas checkpoints</a></li>
</ul>
<p><small>Advisories change. This is general information. Check ICA and LTA before you travel.</small></p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
