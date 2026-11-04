package data

// Safety guide: lost or stolen passport in Malaysia. Appended via init() like
// blog_rts_delay_2026.go so blog.go is not touched. ReadingTimeMinutes is computed
// here because the main loader only runs once at package init.
//
// FeaturedImage is intentionally empty: no cover image exists yet for this slug and
// blog templates render the image block only when FeaturedImage is set. Add
// /images/blog/lost-passport-in-malaysia-what-tourists-must-do.webp under
// site/public/images/blog/ and set the field when a photo is available.
func init() {
	posts := []BlogPost{
		{
			Slug:          "lost-passport-in-malaysia-what-tourists-must-do",
			Title:         "Lost or Stolen Passport in Malaysia: What Tourists Must Do",
			Excerpt:       "Lost your passport in Johor Bahru? Stay calm. Make a police report first, contact your embassy or consulate, then report to Malaysian Immigration. Here are the steps in order, what to bring, and where to ask for help.",
			Date:          "2026-10-16",
			LastModified:  "2026-10-16",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "6 min read",
			Tags:          []string{"lost-passport", "police-report", "embassy", "immigration", "emergency", "johor-bahru", "tourist-safety", "singapore"},
			FeaturedImage: "/images/blog/lost-passport-malaysia-tourist-cover.webp",
			ImageAlt:      "A closed passport lying on a light-coloured table surface",
			InLanguage:    "en",
			Content: `
<h2>Emergency Numbers First</h2>
<ul>
  <li><strong>999</strong> for police (also the MERS emergency line)</li>
  <li><strong>994</strong> for an ambulance</li>
  <li><strong>112</strong> from a mobile phone (GSM emergency number)</li>
</ul>
<p>A lost passport is stressful, but it is a solvable problem. Take it one step at a time, in the order below.</p>

<h2>The Short Version</h2>
<ol>
  <li><strong>Make a police report</strong> at a police station.</li>
  <li><strong>Contact your embassy, high commission or consulate</strong> to get a replacement passport or an emergency travel document.</li>
  <li><strong>Report to Malaysian Immigration (Jabatan Imigresen)</strong> and follow their instructions before you leave the country.</li>
</ol>
<p>Do not use middlemen or agents for any of this. Malaysian Immigration says foreigners should deal with the Immigration Department directly.</p>

<h2>Step 1: Look Once, Then Report It to the Police</h2>
<p>Retrace your steps and check your bag, your luggage and your room. Ask the last place you remember having it, such as a cafe, a taxi or a Grab driver. If it is still missing, do not wait.</p>
<ul>
  <li>Go to the nearest police station and ask to make a <strong>police report</strong> for a lost or stolen passport.</li>
  <li>Bring any ID you still have: a photocopy or phone photo of your passport, your booking confirmations, your flight or bus ticket.</li>
  <li>Ask for a <strong>copy of the report</strong> and keep it safe. You will need it for your embassy and for Immigration.</li>
</ul>
<p>There is a police station in Taman Pelangi, close to our hostel. Message us on WhatsApp and we will point you to it. Please confirm the exact location with us before you walk over, so you go to the right station.</p>
<p>If your passport was stolen together with other items, or you were robbed, tell the officer everything. Do not argue with or chase a thief yourself. Safety comes first.</p>

<h2>Step 2: Contact Your Embassy or Consulate</h2>
<p>Your own government issues your replacement passport or an <strong>emergency travel document</strong>. Malaysia cannot issue it for you.</p>

<h3>How do you find your embassy in Malaysia?</h3>
<p>Most foreign embassies and high commissions are in <strong>Kuala Lumpur</strong>. Search for "[your country] embassy Kuala Lumpur" or "[your country] high commission Kuala Lumpur" and use the official government website of your country, not a third-party directory. Look for a page on "lost passport" or "emergency travel document". Many embassies also have an after-hours emergency line for citizens, so check their site.</p>
<p>Some countries also have a consulate in Johor Bahru, but this varies. Check your government's own website.</p>

<h3>What will an embassy usually ask for?</h3>
<p>Requirements differ by country, so always check with your own embassy. Commonly they ask for:</p>
<ul>
  <li>Your <strong>police report</strong></li>
  <li>Proof of identity (a photocopy or photo of the lost passport, or another ID)</li>
  <li>Passport photos</li>
  <li>Proof of citizenship, such as a national ID card</li>
  <li>An appointment, which many embassies book online</li>
</ul>
<p>Fees, documents and processing times differ for every country. We cannot tell you how long yours will take. Ask the embassy when you first contact them.</p>

<h3>Singapore citizens: the Johor Bahru context</h3>
<p>Many of our guests are Singaporeans, so here is what the Singapore government says. The Singapore High Commission in Kuala Lumpur and the Singapore Consulate-General in Johor Bahru handle consular matters. For a lost Singapore passport in Malaysia, the process described is:</p>
<ol>
  <li>Make a police report.</li>
  <li>Contact the High Commission by email with your full name, NRIC number, passport number if you know it, and date of birth.</li>
  <li>Attend an appointment with passport photos and proof of citizenship (for example your NRIC) to get a temporary travel document.</li>
  <li>Get a <strong>Special Pass</strong> from Malaysian Immigration before you exit to Singapore.</li>
</ol>
<p>Contact details, appointment booking and requirements can change, so please check the official Singapore MFA website (mfa.gov.sg) before you go. The High Commission website also offers online appointment booking and after-hours consular help.</p>

<h2>Step 3: Report to Malaysian Immigration</h2>
<p>Under Malaysian rules, foreigners who lose a passport or travel document in Malaysia must <strong>report to the Enforcement Division of the Immigration Department of Malaysia immediately</strong>. You will be asked to cooperate with an Immigration Officer, including giving a statement.</p>

<h3>What does Immigration ask for?</h3>
<p>According to the Immigration Department, the documents for a lost passport case include:</p>
<ul>
  <li>Your passport number, or a copy of the lost document</li>
  <li>Your new passport or travel document</li>
  <li>The <strong>police report</strong></li>
  <li>A plane, bus or ferry ticket (it must be less than 7 days old)</li>
</ul>
<p>Depending on your case, they may also ask for evidence of your entry into Malaysia (such as landing passes or tickets), a certificate from your embassy, or a copy of a previous pass or document.</p>

<h3>What is the Special Pass and what does it cost?</h3>
<p>The Immigration page for lost passports lists a <strong>Special Pass fee of RM100.00</strong> for this type of case. Fees can change, so confirm the current amount with Immigration.</p>

<h3>Where do you go?</h3>
<p>The Immigration page lists the Enforcement Division at <strong>No. 15, 1-7 Floor (Podium), Persiaran Perdana, Presint 2, 62550 Putrajaya</strong>, phone <strong>03-8000 8000</strong>. We do not know whether other Immigration offices, for example in Johor Bahru, can also handle your case, or what the office hours are. Please call 03-8000 8000 first and ask where you should go and whether you need an appointment.</p>

<h2>How Long Does It Take?</h2>
<p>We do not have an official timeline, and we would rather not guess. Immigration's page does not give one, and each embassy has its own processing time. What helps most is to start early: police report first, then embassy, then Immigration. Do not book a non-refundable flight until your embassy and Immigration have told you what they need. If you need an airline ticket as part of the paperwork, choose one that can be changed.</p>

<h2>What If You Also Overstayed?</h2>
<p>If your stay has gone past the date on your permit, or you are worried about it, do not hide it and do not ignore it. Deal with it through Immigration. Message us if you want a walk-through of how the process generally works and what to prepare. We will guide you through the steps, but we cannot decide your case: only Immigration can. Outcomes depend on the facts of your case, so confirm everything with the Immigration Department.</p>

<h2>How Pelangi Capsule Hostel Can Help</h2>
<p>We are a small hostel at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru. We are not a government office and we cannot speak to the authorities on your behalf, but we can:</p>
<ul>
  <li>Give you a clean, quiet place to sleep while you sort out your paperwork (capsules are RM35 per night, 24/7 self check-in, free WiFi)</li>
  <li>Tell you how to reach the police station in Taman Pelangi that is close to the hostel</li>
  <li>Let you use our WiFi to email your embassy and book appointments</li>
  <li>Answer your questions any time through our WhatsApp assistant, Rainbot: <a href="https://wa.me/60103084289" target="_blank" rel="noopener">+60 10-308 4289</a>, available 24/7</li>
</ul>
<p>If you are in a bigger difficulty, such as a road accident, please also read our guide on <a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">medical emergencies in Johor Bahru</a>. We also have a guest-care policy for travellers in distress after an accident, handled case by case by management depending on availability. Ask us on WhatsApp.</p>

<h2>Prevent It Next Time</h2>
<ul>
  <li>Take a photo of your passport photo page and your entry stamp, and save it to your email or cloud storage.</li>
  <li>Keep your passport in a locked locker or an inside pocket, not a back pocket or an open bag.</li>
  <li>Keep a spare set of passport photos if you travel for a long time.</li>
  <li>Save your embassy's contact details in your phone before you need them.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Do I need a police report if my passport is just lost?</h3>
<p>Yes. The police report is one of the documents Malaysian Immigration lists for lost passport cases, and embassies usually ask for it too.</p>
<h3>Can I fly home with only a police report?</h3>
<p>No. A police report is not a travel document. You need an emergency travel document or new passport from your embassy, and you must also sort out your exit with Malaysian Immigration.</p>
<h3>Can an agent do this for me?</h3>
<p>Malaysian Immigration says foreigners should not use middlemen or agents for lost passport cases. Deal with the Immigration Department directly.</p>
<h3>Can I keep staying at the hostel while I wait?</h3>
<p>Subject to availability. Message us on WhatsApp so we can plan your nights.</p>

<p><small>This article is general information, not legal or medical advice. Rules, fees and office details can change. Always confirm with the police, your embassy and the Immigration Department of Malaysia (imi.gov.my) before you act.</small></p>

<h2>Sources</h2>
<ul>
  <li><a href="https://www.imi.gov.my/index.php/en/enforcement/loss-of-passport-travel-document-in-malaysia/" target="_blank" rel="noopener">Immigration Department of Malaysia: Loss of Passport / Travel Document in Malaysia</a></li>
  <li><a href="https://kl.mfa.gov.sg/" target="_blank" rel="noopener">Singapore High Commission in Kuala Lumpur</a></li>
</ul>
<h2>More Help for Tourists</h2>
<ul>
  <li><a href="/blog/sick-in-johor-bahru-tourist-medical-help-guide">If you get sick in Johor Bahru</a></li>
  <li><a href="/blog/road-accident-in-johor-bahru-tourist-guide">Road accident: what tourists should do</a></li>
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
