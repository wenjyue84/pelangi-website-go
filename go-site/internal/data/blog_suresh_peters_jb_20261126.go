package data

// Daily blog 2026-11-26: Suresh Peters "Legends Vibe - Live in JB" concert, 5 Dec 2026, Paradigm Mall Convention Centre.
// Facts fetched 2026-11-26 from bernama.com (13 Oct 2026) and thesun.my (Bernama wire copy). Both are one wire story, so this is
// effectively a single source. Ticket-sale status, showtime and transport were NOT in either page (stated in the post).
func init() {
	posts := []BlogPost{
		{
			Slug:          "suresh-peters-legends-vibe-live-in-jb-5-december-2026-paradigm-mall",
			Title:         "Suresh Peters 'Legends Vibe – Live in JB' on 5 December 2026: What We Know, and Where to Stay",
			Excerpt:       "Indian singer Suresh Peters makes his Johor Bahru debut on 5 December 2026 at Paradigm Mall Convention Centre. Venue, line-up, the RM99 to RM499 ticket range as reported in October, and what is still unconfirmed. Checked 26 November 2026.",
			Date:          "2026-11-26",
			LastModified:  "2026-11-26",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "3 min read",
			Tags:          []string{"johor-bahru-events", "concert", "paradigm-mall", "suresh-peters", "december-2026", "2026"},
			FeaturedImage: "/images/blog/suresh-peters-live-in-jb-5-dec-2026-cover.webp",
			ImageAlt:      "Text cover: Suresh Peters Legends Vibe Live in JB, 5 December 2026",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>Indian singer <strong>Suresh Peters</strong> will perform in Johor Bahru for the first time at <strong>"Legends Vibe – Live in JB" on 5 December</strong>, at the <strong>Paradigm Mall Convention Centre</strong>. The announcement is dated 13 October 2026 (Bernama). We read it, and The Sun's copy of the same story, on 26 November 2026. <strong>We could not confirm whether tickets are still on sale, the show time, or the doors time</strong>, so check the organisers before you plan around it.</p>

<figure class="blog-figure"><img src="/images/blog/suresh-peters-live-in-jb-5-dec-2026-cover.webp" alt="Text cover: Suresh Peters Legends Vibe Live in JB, 5 December 2026" loading="lazy" width="1200" height="630"></figure>

<h2>What Was Reported</h2>
<ul>
  <li><strong>Event:</strong> "Legends Vibe – Live in JB", Suresh Peters' first performance in Johor Bahru.</li>
  <li><strong>Date and venue:</strong> 5 December (2026), Paradigm Mall Convention Centre, Johor Bahru.</li>
  <li><strong>Performers named:</strong> Suresh Peters, Anuradha Sriram, Krrish, Antony Dasan and Priyanka. The song list was not final.</li>
  <li><strong>Tickets:</strong> priced between <strong>RM99 and RM499</strong> across four categories under a Deepavali promotional offer. The report says prices may rise after the offer period, and that details were expected on the MyTicket.Asia website within two weeks of the announcement.</li>
  <li><strong>Organisers:</strong> BR Films and MNESS Productions, who are aiming for about 2,500 attendees, including fans from Malaysia and Singapore.</li>
</ul>
<p>Sources: <a href="https://www.bernama.com/en/news.php/?id=2619394" rel="noopener">Bernama, 13 October 2026</a> and <a href="https://thesun.my/news/suresh-peters-first-jb-show-to-evoke-memories-of-1990s-tamil-cinema/" rel="noopener">The Sun</a>, both checked 26 November 2026. The two pages carry the same wire story, so treat this as one source.</p>

<h2>What We Cannot Tell You</h2>
<ul>
  <li>Whether tickets are still available, or at what price today. The RM99 to RM499 range is from October.</li>
  <li>Show time, doors time, parking or shuttle arrangements. None were in the reports.</li>
  <li>We did not find an organiser or MyTicket.Asia page to confirm any of this.</li>
</ul>

<h2>If You Are Coming From Singapore or Out of Town</h2>
<ol>
  <li><strong>Confirm your ticket first</strong> on the organiser's channels before booking travel.</li>
  <li><strong>A late finish plus the border is a long night.</strong> Year-end school holidays bring heavy Woodlands and Tuas traffic from 20 November 2026 (ICA advisory); see <a href="/blog/year-end-school-holidays-2026-woodlands-tuas-heavy-traffic-20-nov-3-jan-jb-guide">our year-end traffic guide</a>. Sleeping in JB and crossing the next morning is a sensible option.</li>
  <li><strong>Border paperwork:</strong> SG Arrival Card and MDAC, passport valid. See our <a href="/blog/mdac-and-sg-arrival-card-jb-trip-checklist-2026">checklist</a>.</li>
  <li>Taxis across the Causeway were expanded in November; see <a href="/blog/cross-border-taxi-quota-500-cdg-zig-kumpool-16-november-2026-jb">our cross-border taxi post</a>.</li>
</ol>

<h2>Stay at Pelangi Capsule Hostel</h2>
<p>Pelangi Capsule Hostel is at 26A Jalan Perang, Taman Pelangi, Johor Bahru. A capsule is <strong>RM35 per night</strong>, and <strong>RM30 for the first night</strong> if you are a first-time guest booking direct on our website. Check-in is from 2:00 PM. We accept payment in MYR and SGD. <a href="/book">Book direct</a>, see <a href="/rooms">rooms</a>, or <a href="/contact">contact us</a>.</p>

<h2>FAQ</h2>
<h3>Where is the Suresh Peters concert in Johor Bahru?</h3>
<p>At the Paradigm Mall Convention Centre, on 5 December 2026, per Bernama and The Sun.</p>
<h3>How much are the tickets?</h3>
<p>Reported at RM99 to RM499 in four categories under a Deepavali promotion in October; prices may have risen since. We have not confirmed current availability.</p>
<h3>Who else is performing?</h3>
<p>Anuradha Sriram, Krrish, Antony Dasan and Priyanka, per the reports.</p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
