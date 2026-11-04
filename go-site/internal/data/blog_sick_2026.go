package data

// Safety guide: what to do if you fall sick as a tourist in Johor Bahru.
// Appended via init() like blog_rts_delay_2026.go so blog.go is not touched.
// ReadingTimeMinutes is computed here because the main loader only runs once at
// package init.
//
// FeaturedImage is intentionally empty: no unique cover webp exists yet for this
// post (reusing another post's cover would break the duplicate-cover policy).
// Add site/public/images/blog/sick-in-johor-bahru-tourist-medical-help-guide.webp
// and set FeaturedImage when the image is ready.
func init() {
	posts := []BlogPost{
		{
			Slug:          "sick-in-johor-bahru-tourist-medical-help-guide",
			Title:         "Sick in Johor Bahru? A Tourist's Step-by-Step Medical Help Guide",
			Excerpt:       "Feeling unwell while travelling is stressful. Here is what to do in Johor Bahru: who to call, where to go, what to bring, how hospital bills and insurance claims usually work, and how our front desk can help.",
			Date:          "2026-10-16",
			LastModified:  "2026-10-16",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"johor-bahru", "medical-emergency", "hospital", "clinic", "travel-insurance", "tourist-safety", "health"},
			FeaturedImage: "/images/blog/sick-in-johor-bahru-thermometer-medicine-cover.webp",
			ImageAlt:      "Glass thermometer resting on a pile of assorted pills and capsules",
			InLanguage:    "en",
			Content: `
<div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-5 rounded mb-8 text-stone-700 dark:text-stone-300">
<p><strong>Emergency right now?</strong> Call <strong>999</strong> (or <strong>112</strong> from a mobile phone). Say clearly where you are and what is wrong. Do not search the internet first &mdash; dial.</p>
</div>

<h2>The Short Version</h2>
<p>If you are seriously ill or hurt, call <strong>999</strong>. If you are unwell but not in danger (fever, stomach upset, a cut, an allergic rash), go to a clinic or a hospital outpatient department, bring your passport and insurance details, and keep every receipt. If you are alone and unsure, tell our front desk &mdash; we would rather you ask early than wait until you feel worse.</p>

<h2>Step 1: Decide How Urgent It Is</h2>
<h3>Call 999 straight away if:</h3>
<ul>
  <li>Chest pain or pressure, trouble breathing, or choking</li>
  <li>Someone is unconscious, having a seizure, or cannot be woken</li>
  <li>Heavy bleeding, a serious head injury, or a suspected broken bone after a fall or accident</li>
  <li>Signs of a stroke (face drooping, slurred speech, weak arm)</li>
  <li>A severe allergic reaction with swelling of the face or throat</li>
</ul>
<h3>Go to a clinic or hospital yourself if:</h3>
<ul>
  <li>Fever that will not settle, vomiting or diarrhoea, or signs of dehydration</li>
  <li>Minor injuries that need cleaning or stitches</li>
  <li>An infection, rash, or ongoing pain</li>
</ul>
<p>If you are not sure which group you are in, treat it as the more serious one.</p>

<h2>Step 2: Make the Call or Get There</h2>
<ol>
  <li><strong>Call 999</strong> and give your location. Our address is <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong>.</li>
  <li>If you are in the hostel, tell the nearest person or message our team on WhatsApp so someone can meet the ambulance and show them to you.</li>
  <li>If it is not an ambulance case, book a Grab or ask us to help you find the nearest suitable clinic.</li>
  <li>Do not travel on a bike or walk alone if you feel faint or dizzy.</li>
</ol>

<h2>Government Hospital or Private Hospital?</h2>
<p>Johor Bahru has both. Our existing guide <a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">Medical Emergency in Johor Bahru: Hospitals, Clinics &amp; Foreigner Costs</a> lists the main hospitals, including Hospital Sultanah Aminah (government), KPJ Johor Specialist Hospital and Gleneagles Hospital Medini (private), so we will not repeat the full list here.</p>
<table>
  <thead>
    <tr><th></th><th>Government hospital</th><th>Private hospital</th></tr>
  </thead>
  <tbody>
    <tr><td>Emergency care</td><td>Treats emergencies; deposit rules for foreigners can differ by hospital and case, so confirm with the hospital</td><td>Treats emergencies; may ask about payment or insurance guarantee at registration</td></tr>
    <tr><td>Cost for foreigners</td><td>Lower than private, but foreigners pay higher rates than citizens</td><td>Higher, but usually shorter waits and more room for choice</td></tr>
    <tr><td>Good for</td><td>Serious injury or illness, tight budget</td><td>Non-urgent problems, comfort, direct billing with some insurers</td></tr>
  </tbody>
</table>
<p>Fee schedules change, and foreigners are generally charged higher rates than citizens at government hospitals. We do not quote figures here because they are revised from time to time; ask the hospital for the current rate and any deposit.</p>

<h2>What to Bring</h2>
<ul>
  <li><strong>Your passport</strong> (or a clear photo of the photo page if you cannot carry it)</li>
  <li><strong>Travel insurance</strong> policy number and the insurer's 24-hour assistance number</li>
  <li>A list of your medicines, allergies and any long-term conditions</li>
  <li>A payment card and some cash</li>
  <li>Your phone and a charger</li>
  <li>The hostel address and our WhatsApp contact so you can get back</li>
</ul>

<h2>Costs, Receipts and Insurance Claims</h2>
<p>If you have travel insurance, call the insurer's assistance line <em>before</em> you go in if you can, or as soon as you are stable. Some insurers want to be told early and may arrange payment directly with a private hospital. Others ask you to pay first and claim later.</p>
<p>For a claim, keep and photograph everything:</p>
<ol>
  <li>Itemised bills and official receipts</li>
  <li>The doctor's report or discharge summary</li>
  <li>Prescriptions and pharmacy receipts</li>
  <li>If you were hurt in an accident, a copy of the police report</li>
  <li>Your passport entry stamp page and booking details, as requested by the insurer</li>
</ol>
<p>Every insurer has its own list and deadlines, so confirm what yours requires. Ask the hospital's billing counter for the documents before you are discharged; it is much easier than requesting them by email afterwards.</p>

<h2>Pharmacies</h2>
<p>For minor problems such as a cold, mild stomach upset or pain relief, a pharmacy can often help. Tell the pharmacist your symptoms, any allergies and what you have already taken. If your symptoms last more than a day or two, or you are getting worse, see a doctor. Our front desk can point you to the nearest pharmacy; opening hours differ, so ask before you walk over.</p>

<h2>What Can Pelangi Staff Help With?</h2>
<ul>
  <li>Telling you where the nearest clinic or hospital is and helping you order a Grab</li>
  <li>Showing paramedics the way into the building</li>
  <li>Letting you rest in your capsule, or helping you extend your stay if you are recovering (subject to availability)</li>
  <li>Contacting someone on your behalf if you ask us to</li>
  <li>Helping you find a police station if you need to make a report</li>
</ul>
<p>We are a hostel, not medical professionals, so we cannot diagnose, give medicine or promise the outcome of an insurance claim.</p>

<h2>Hurt in a Road Accident?</h2>
<p>Make sure you are safe, call 999, and make a police report. There is a police station just beside our capsules, and we encourage guests to go there. As part of our commitment to guests in difficulty, <strong>a guest who has had a road accident and has both a police report and evidence of the accident may stay with us free of charge for 24 hours</strong>, so they have time to contact family and arrange payment afterwards. This is subject to availability and management discretion, so message our team first.</p>

<h2>Frequently Asked Questions</h2>
<h3>What number do I call for an ambulance in Johor Bahru?</h3>
<p>Call 999, or 112 from a mobile phone. These connect you to Malaysia's emergency service, which can send an ambulance and contact the police or fire services where needed.</p>
<h3>Will a Malaysian hospital treat me if I cannot pay immediately?</h3>
<p>Public hospitals treat emergencies, but deposit and billing rules for foreign patients can vary, and you will still be billed. Confirm with the hospital, and contact your insurer and family early.</p>
<h3>Do I need a police report for my insurance claim?</h3>
<p>If your injury came from an accident, many insurers ask for one. Check your policy wording and ask your insurer what they require.</p>
<h3>Can I stay at Pelangi while I recover?</h3>
<p>Often yes, subject to availability. Message us on WhatsApp so we can check a capsule and let you rest.</p>

<h2>Contact Us</h2>
<p>Message our 24/7 assistant on WhatsApp at <a href="https://wa.me/60103084289">+60 10-308 4289</a>, or reach our team on <strong>+60 12-708 8789</strong> or <strong>+60 16-762 0815</strong>. See also our <a href="/guide">check-in guide</a> and <a href="/getting-here">Getting Here</a> page.</p>

<p><small>This article is general information, not legal or medical advice. Fees, rules and procedures can change &mdash; confirm with the hospital, your insurer and the relevant authority.</small></p>
<h2>More Help for Tourists</h2>
<ul>
  <li><a href="/blog/road-accident-in-johor-bahru-tourist-guide">Road accident: what tourists should do</a></li>
  <li><a href="/blog/lost-passport-in-malaysia-what-tourists-must-do">Lost your passport in Malaysia</a></li>
  <li><a href="/blog/overstayed-in-malaysia-how-to-go-home-splp">Overstayed? How to go home (SPLP)</a></li>
  <li><a href="/tourist-help">Emergency &amp; Help for Tourists hub</a></li>
  <li><a href="/tourist-assistance">Pelangi tourist assistance and 24-hour free stay</a></li>
  <li><a href="/visa-run">Visa run guide for Johor Bahru</a></li>
  <li><a href="/location">Our location: police station next door</a></li>
</ul>
`,
		},
	}

	for i := range posts {
		posts[i].ReadingTimeMinutes = _blogComputeReadingTime(posts[i].Content)
	}
	BlogPosts = append(BlogPosts, posts...)
}
