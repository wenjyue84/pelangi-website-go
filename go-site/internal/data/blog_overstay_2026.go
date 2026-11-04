package data

// Guide post: overstayed in Malaysia, penalties, Special Pass / "SPLP" confusion, how to leave.
// Appended via init() like blog_rts_delay_2026.go so blog.go is not touched.
// No FeaturedImage is set on purpose: no cover webp exists yet, and the templates skip
// the image block when it is empty. Add /images/blog/overstayed-in-malaysia-how-to-go-home-splp.webp
// (in site/public/images/blog/) and set FeaturedImage when a cover is made.
// ReadingTimeMinutes is computed here because the main loader only runs once at package init.
func init() {
	posts := []BlogPost{
		{
			Slug:          "overstayed-in-malaysia-how-to-go-home-splp",
			Title:         "Overstayed in Malaysia? What the Law Says, What SPLP and the Special Pass Are, and How to Go Home",
			Excerpt:       "Stayed past your pass expiry in Malaysia? Stay calm. Here is what the Immigration Act says, why \"SPLP\" is often confused with the Special Pass, the steps to take, and how Pelangi in Johor Bahru can support you while you sort it out.",
			Date:          "2026-10-16",
			LastModified:  "2026-10-16",
			Category:      "Travel Tips",
			Author:        "Pelangi Capsule Hostel",
			ReadTime:      "7 min read",
			Tags:          []string{"overstay", "special-pass", "splp", "immigration", "johor-bahru", "emergency", "tourist-help"},
			FeaturedImage: "/images/blog/malaysia-immigration-ciq-johor-bahru-checkpoint.webp",
			ImageAlt:      "Aerial view of the Sultan Iskandar Building, the Malaysian customs, immigration and quarantine checkpoint in Johor Bahru, at dusk",
			InLanguage:    "en",
			Content: `
<h2>The Short Version</h2>
<p>If you have stayed longer than your pass allows in Malaysia, <strong>do not panic and do not hide</strong>. The longer an overstay goes on, the harder it usually gets. The safest path is to contact your embassy and the Immigration Department early, and not to pay anyone who promises a shortcut.</p>
<p><strong>Emergency numbers:</strong> police <strong>999</strong>, ambulance <strong>994</strong>, or <strong>112</strong> from a mobile phone. Overstaying is an immigration matter, not an emergency, but call these if anyone is hurt or in danger.</p>

<h2>What Counts as an Overstay and What Does the Law Say?</h2>
<p>You overstay when you remain in Malaysia after your authorised pass has expired or been cancelled. Malaysia's Immigration Department lists this as an offence under <strong>Section 15(4) of the Immigration Act 1959/63</strong>. According to the department's own page on frequently committed offences:</p>
<ul>
  <li>The penalty is a <strong>fine of up to RM10,000, or imprisonment of up to 5 years, or both</strong>.</li>
  <li>The department also lists a <strong>compound of RM3,000</strong>. A compound is an amount paid to settle the offence without going to court. Whether you are offered a compound is decided by the authorities, not by you.</li>
</ul>
<p>Sources: <a href="https://www.imi.gov.my/index.php/en/main-services/syarat-kemasukan-ke-malaysia-en/frequently-committed-offences/" target="_blank" rel="noopener">Immigration Department of Malaysia, Frequently Committed Offences</a>. We could not confirm whether the amount changes with the length of overstay, or how long any re-entry ban lasts, so please ask Immigration directly.</p>

<h2>Can You Be Detained for Overstaying?</h2>
<p>Yes, it is possible. Malaysian Immigration carries out enforcement operations and press reports regularly describe overstayers being detained. We cannot promise any outcome in an individual case. The details of detention, how long it lasts and your rights are not something we can verify, so ask your embassy and Immigration.</p>

<h2>What Are SPLP and the Special Pass?</h2>
<p>These two terms are often mixed up.</p>
<ul>
  <li><strong>Special Pass (Pas Khas)</strong> is a temporary pass issued by Malaysia's Immigration Department. Press reports describe it as a short-term pass for foreigners whose Social Visit Pass has expired and who need to stay briefly while arranging a flight home. This is the pass that Immigration issues to people leaving after an overstay.</li>
  <li><strong>SPLP</strong> stands for <em>Surat Perjalanan Laksana Paspor</em>, an Indonesian term. It is a one-trip emergency travel document issued by the <strong>Indonesian Embassy or Consulate</strong> in place of a passport. It is not an Immigration Malaysia overstay pass.</li>
</ul>
<p>So if you are Indonesian and your passport is lost or expired, SPLP is the embassy document you may need. If you have simply overstayed, the Malaysian pass in question is the Special Pass. The two are easy to confuse, which is why we cover both here. Because current rules can change, <strong>confirm which document applies to you with your embassy and Immigration</strong>.</p>

<h2>How Do You Leave Malaysia After Overstaying? A Step by Step Guide</h2>
<ol>
  <li><strong>Gather your documents.</strong> Passport, any old passes or entry stamps, and a copy of your passport photo page. If your passport is lost, see our note below.</li>
  <li><strong>Contact your embassy or consulate.</strong> Tell them you have overstayed and want to go home. They can confirm what they will issue (for example a letter or an emergency travel document) and what Immigration will ask for.</li>
  <li><strong>Contact the Immigration Department.</strong> Ask how to apply for a Special Pass for your case. Press reports from 2021 describe booking an appointment online and attending an Immigration office in person, with documents such as an embassy letter, a flight ticket, proof you can pay, and your address in Malaysia. These requirements are from earlier news coverage and may be different today, so ask Immigration what they require now.</li>
  <li><strong>Book your flight or ticket home</strong> once you know the dates you are allowed to depart.</li>
  <li><strong>Settle any fine or compound</strong> only through the official counter, and keep the receipt.</li>
  <li><strong>Leave by the date you are given.</strong> Do not overstay the Special Pass; ask Immigration what happens if you cannot leave in time.</li>
</ol>

<h2>Should You Use an Agent?</h2>
<p>Our advice: <strong>do not use agents or fixers</strong>. Dealing directly with your embassy and Immigration costs you nothing extra, and nobody outside the authorities can promise to wipe out an overstay. This is the hostel's own advice, not an official statement. If someone asks for large cash payments to &quot;clear&quot; your record, walk away and tell the police.</p>

<h2>What If You Also Lost Your Passport?</h2>
<p>Report the loss at the nearest police station and keep the police report. Then contact your embassy for a replacement passport or emergency travel document (this is where SPLP applies if you are Indonesian). Ask Immigration which documents they need from you. Our team can point you to the police station beside our hostel.</p>

<h2>Can Pelangi Help While You Sort This Out?</h2>
<p>Pelangi Capsule Hostel is at <strong>26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</strong>, with a police station just beside our capsules, so you can go and ask for advice or make a report quickly. Capsules are <strong>RM35 per night</strong> (RM30 for the first night when you book direct on our website), with 24/7 self check-in and no minimum stay.</p>
<ul>
  <li>Message us on WhatsApp and tell us your situation. Our team can talk you through the steps above in simple language.</li>
  <li>You are welcome to book a capsule while you wait for your embassy letter, appointment and ticket, <strong>subject to availability and management discretion</strong>.</li>
  <li>We are not an immigration authority and cannot give legal advice or issue passes. Before anyone books a long stay, we will ask you to check with Immigration what is allowed for your situation.</li>
</ul>
<p>Contact us: <a href="https://wa.me/60103084289" target="_blank" rel="noopener">WhatsApp +60 10-308 4289</a> (24/7 assistant), Jay +60 12-708 8789, Alston +60 16-762 0815.</p>

<h2>Frequently Asked Questions</h2>
<h3>Is overstaying a criminal offence in Malaysia?</h3>
<p>Yes. Malaysia's Immigration Department lists it as an offence under Section 15(4) of the Immigration Act 1959/63, with a possible fine of up to RM10,000, up to 5 years in prison, or both. A compound of RM3,000 is also listed.</p>
<h3>Is SPLP the same as the Special Pass?</h3>
<p>No. SPLP (Surat Perjalanan Laksana Paspor) is an Indonesian embassy travel document. The Malaysian pass for people leaving after an overstay is the Special Pass (Pas Khas) from the Immigration Department.</p>
<h3>Do I need an agent to apply?</h3>
<p>No. We recommend going directly to your embassy and the Immigration Department.</p>

<h2>Useful Links</h2>
<ul>
  <li><a href="https://www.imi.gov.my/" target="_blank" rel="noopener">Immigration Department of Malaysia</a></li>
  <li><a href="/blog/medical-emergency-johor-bahru-hospitals-clinics-foreigner-costs">Medical emergencies in Johor Bahru: hospitals, clinics and costs</a></li>
</ul>
<p><small>This article is general information, not legal or medical advice. Immigration rules, fees and procedures can change; confirm with the Immigration Department and your embassy before you act.</small></p>
<h2>More Help for Tourists</h2>
<ul>
  <li><a href="/blog/sick-in-johor-bahru-tourist-medical-help-guide">If you get sick in Johor Bahru</a></li>
  <li><a href="/blog/road-accident-in-johor-bahru-tourist-guide">Road accident: what tourists should do</a></li>
  <li><a href="/blog/lost-passport-in-malaysia-what-tourists-must-do">Lost your passport in Malaysia</a></li>
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
