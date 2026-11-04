package data

// Post: cyclists welcome — a bikepacking guest asked to keep his loaded touring bicycle
// safe on 2026-10-07 and we let him keep it inside next to reception. Photo taken by staff
// in the lobby that day (guest and staff faces removed/blurred; no booking details shown).
// House rule from Jay, 2026-10-08: allow bicycles, keep the floor clean (or ask the rider
// to clean it) — a good bicycle costs like a car and is easy to steal. No insurance or
// liability promise is made in the post because none exists.
func init() {
	posts := []BlogPost{
		{
			Slug:          "cyclists-welcome-bicycle-friendly-capsule-hostel-johor-bahru",
			Title:         "Cyclists Welcome: Keep Your Bike Inside at Our Johor Bahru Capsule Hostel",
			Excerpt:       "A bikepacker asked to keep his loaded touring bicycle somewhere safe, so we gave it a spot inside next to reception. If you ride, here is how it works at Pelangi Capsule Hostel and what to message us before you arrive.",
			Date:          "2026-10-10",
			LastModified:  "2026-10-10",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "4 min read",
			Tags:          []string{"cycling", "bikepacking", "bicycle-friendly", "johor-bahru", "capsule-hostel", "budget-accommodation", "cyclist"},
			FeaturedImage: "/images/blog/cyclists-welcome-bicycle-friendly-capsule-hostel-johor-bahru.webp",
			ImageAlt:      "A loaded bikepacking touring bicycle with frame bag and handlebar bag parked inside the reception area of Pelangi Capsule Hostel in Johor Bahru",
			InLanguage:    "en",
			Content: `
<h2>Why We Wrote This</h2>
<p>On 7 October 2026 a guest rolled up to our front door on a fully loaded touring bicycle and asked one thing: could he keep it somewhere it would not get stolen? He was worried, and he was right to be. A good touring bike can cost as much as a small car, and it is easy to carry off if it is left outside.</p>
<p>We said yes. His bicycle spent the night <strong>inside, next to our reception</strong>, where our staff could see it. This page explains how that works so other riders know they can do the same.</p>

<figure class="blog-figure"><img src="/images/blog/cyclists-welcome-bicycle-friendly-capsule-hostel-johor-bahru.webp" alt="A loaded bikepacking touring bicycle with frame bag and handlebar bag parked inside the reception area of Pelangi Capsule Hostel in Johor Bahru" loading="lazy" width="1200" height="1385"><figcaption>A guest's loaded touring bicycle parked inside our reception area on 7 October 2026.</figcaption></figure>

<h2>Can I Bring My Bicycle to Pelangi Capsule Hostel?</h2>
<p>Yes. Our house rule is simple: <strong>we allow bicycles, and you keep the floor clean.</strong> Wipe your tyres and drivetrain before you wheel the bike in, or ask our staff for a cloth and clean up after yourself. Our floor is wood parquet and we want it to stay that way.</p>
<ul>
  <li><strong>Where it goes:</strong> inside, in the reception area, where staff are on site. Not on the pavement.</li>
  <li><strong>Please message us first.</strong> Tell us roughly when you will arrive and what kind of bike it is, so we can clear a space.</li>
  <li><strong>Bring your own lock.</strong> We keep the bike inside and in view, but we do not offer insurance, so lock it and take any valuable bags and electronics with you to your capsule.</li>
  <li><strong>Panniers and bikepacking bags:</strong> take them off the bike and carry them in. Capsule storage is small, so pack light.</li>
</ul>

<h2>What a Night Costs</h2>
<p>A capsule at Pelangi is <strong>RM35 per night</strong>. New guests booking direct on our website pay <strong>RM30 for the first night</strong>. Check-in starts from <strong>2:00 PM</strong>, and we ask for a photo of your passport (or IC if you are Malaysian) to check you in.</p>

<h2>Where Are We?</h2>
<p>Pelangi Capsule Hostel is at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. From JB CIQ it is roughly 10–15 minutes by Grab. If you are riding in from Singapore, check the current border rules for bicycles with the Singapore and Malaysian authorities before you set out; we do not give border advice and rules can change. Our <a href="/getting-here">Getting Here</a> page has directions.</p>

<h2>Is Johor Bahru a Good Stop for Riders?</h2>
<p>Johor Bahru is the southern gateway of Peninsular Malaysia, so it works well as a first or last night for a trip up the peninsula or a long loop. For a cyclist the practical points are a safe place to leave the bike, a bed after a long day, and a place close enough to food and a shower. A capsule gives you the bed and the shower for a few ringgit and, at our place, the bike inside.</p>

<h2>Who Is It Not For?</h2>
<p>We are a capsule hostel, not a bike shop. We do not repair bicycles, rent them or box them for flights, and we cannot promise space for a large group of bikes at once. If you are travelling with several riders, tell us how many bikes when you message so we can say yes or no honestly.</p>

<h2>Riding Through? Stay With Us</h2>
<p>If you ride, we would like to host you. <a href="/book">Book a capsule here</a> and add a note that you are arriving by bicycle, or message us before you arrive so we can set aside a spot inside.</p>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
