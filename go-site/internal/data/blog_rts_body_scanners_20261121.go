package data

// Daily blog 2026-11-21: Malaysia's body scanners for the RTS Link checkpoint at Bukit Chagar.
// Sources fetched 2026-11-21: Malay Mail 2026-10-28, The Star 2026-10-29, Bernama 2026-05-08,
// The Star 2026-05-08. Sources disagree on equipment counts and the opening month; the post says so.
func init() {
	posts := []BlogPost{
		{
			Slug:          "rts-link-body-scanners-bukit-chagar-checkpoint-what-to-expect-2026",
			Title:         "RTS Link Checkpoint at Bukit Chagar: Body Scanners Coming, What Travellers Should Expect",
			Excerpt:       "On 28 October 2026 Malaysia's Home Minister said new body scanners will be deployed at the Bukit Chagar checkpoint when the RTS Link opens. What was said, which numbers conflict, and how to prepare. Checked 21 November 2026.",
			Date:          "2026-11-21",
			LastModified:  "2026-11-21",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "4 min read",
			Tags:          []string{"rts-link", "bukit-chagar", "immigration", "security-screening", "singapore-to-jb", "border-crossing"},
			FeaturedImage: "/images/blog/rts-link-body-scanners-bukit-chagar-cover.webp",
			ImageAlt:      "Card reading Body scanners for the RTS Link checkpoint, Bukit Chagar ICQ, what Malaysia said on 28 Oct 2026, with a RM35 capsule from Pelangi Capsule Hostel",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>On <strong>28 October 2026</strong>, at the closing ceremony of a Malaysia-Singapore cross-border security exercise held at the RTS Link Wadi Hana site in Johor Bahru, Home Minister Datuk Seri Saifuddin Nasution Ismail said new body scanners will be deployed at the <strong>Bukit Chagar ICQ (Immigration, Customs, Quarantine) Complex</strong> once the RTS Link starts operating. Malay Mail describes the system as <strong>a first for Malaysia</strong>. We read the reports on 21 November 2026.</p>

<figure class="blog-figure"><img src="/images/blog/rts-link-body-scanners-bukit-chagar-cover.webp" alt="Card reading Body scanners for the RTS Link checkpoint, Bukit Chagar ICQ, what Malaysia said on 28 Oct 2026, with a RM35 capsule from Pelangi Capsule Hostel" loading="lazy" width="1200" height="630"><figcaption>Bukit Chagar ICQ: security screening announced 28 Oct 2026.</figcaption></figure>

<h2>What Was Said</h2>
<ul>
  <li><strong>What the scanner detects:</strong> per Malay Mail, the system can detect objects carried on a person's body, including items wrapped or concealed. The Star reports the minister saying it detected <strong>firearms and sharp objects</strong> on the body during the demonstration.</li>
  <li><strong>Where:</strong> the Bukit Chagar ICQ Complex, the Malaysian-side checkpoint for the RTS Link.</li>
  <li><strong>Why:</strong> Malay Mail links the move to 17 initiatives proposed by the home and transport ministries, including more targeted inspections for high-risk arrivals. The Star adds stricter checks at KLIA and other international checkpoints for high-risk destinations.</li>
  <li><strong>Other facilities (The Star, 29 Oct):</strong> 100 e-gates, 10 security screening lanes for body checks, 18 baggage scanners, and dedicated lanes for passengers travelling without luggage; capacity of up to 10,000 passengers per hour per direction.</li>
</ul>

<h2>The Numbers Do Not Agree</h2>
<p>We found conflicting figures and cannot say which is final:</p>
<ul>
  <li><strong>Equipment:</strong> in May 2026, Bernama and The Star quoted the minister as saying the complex would have <strong>18 baggage scanners, 22 body scanners and 10 millimetre-wave walkthrough scanners</strong>, being installed and tested. In October, Malay Mail wrote that <strong>more than 100</strong> scanning units will be deployed, without a breakdown. The Star's October piece speaks of 10 body-check lanes. No source we read explains how these relate.</li>
  <li><strong>Opening month:</strong> Bernama (May) said fully operational in <strong>January</strong> 2027. Malay Mail (October) says "early next year". The Star (October) says <strong>February</strong> 2027. Our earlier post on the delay: <a href="/blog/rts-link-delayed-february-2027-visa-run-jb">RTS Link delayed to February 2027</a>.</li>
</ul>

<h2>What This Means for You</h2>
<p>This is the Malaysian side only, and none of the articles gives a screening procedure for ordinary passengers, a queue time or a fee. What we can say from the reports: expect a security screen of your body and bags on top of immigration, and separate lanes for people with no luggage. Practical habits that cost nothing: travel light, keep metal items and power banks easy to take out, and have your passport and (for Singapore) your SG Arrival Card ready. Do not treat the 5-minute train time quoted by Bernama as door-to-door time.</p>
<p>Until the RTS Link opens, the Causeway and Second Link remain how most people cross; see our <a href="/blog/singapore-to-jb-day-trip-causeway-guide">Singapore to JB day trip guide</a> and the <a href="/blog/rts-link-johor-bahru-singapore-traveler-guide">RTS Link traveller guide</a>.</p>

<h2>Staying in Johor Bahru</h2>
<p>A capsule at Pelangi Capsule Hostel is <strong>RM35 per night</strong>, and a new guest booking direct on our website pays <strong>RM30 for the first night</strong>. Check-in starts from <strong>2:00 PM</strong>. Payment is in MYR or SGD. <a href="/book">Book direct here</a>, see <a href="/rooms">our rooms</a>, or <a href="/contact">contact us</a>.</p>

<h2>Sources (checked 21 November 2026)</h2>
<ul>
  <li><a href="https://www.malaymail.com/news/malaysia/2026/10/28/malaysia-to-deploy-latest-body-scanners-at-rts-link-border-checkpoint/241022" target="_blank" rel="noopener">Malay Mail, 28 October 2026</a></li>
  <li><a href="https://www.thestar.com.my/news/nation/2026/10/29/more-stringent-checks-for-drugs" target="_blank" rel="noopener">The Star, 29 October 2026</a></li>
  <li><a href="https://bernama.com/en/news.php?id=2554489" target="_blank" rel="noopener">Bernama, 8 May 2026</a></li>
  <li><a href="https://www.thestar.com.my/news/nation/2026/05/08/govt-committed-to-balancing-security-and-passenger-flow-at-rts-link-says-home-minister" target="_blank" rel="noopener">The Star, 8 May 2026</a></li>
</ul>
<p><small>Plans can change before opening; confirm with official sources before you travel.</small></p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
