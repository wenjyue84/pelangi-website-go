package data

// blog_visa_hi.go — Hindi-language posts for Indian-national travelers doing
// the Singapore–Johor Bahru (Malaysia) border run. Added as a separate file
// (not blog.go, which another session is editing concurrently) and appended
// to the package-level BlogPosts slice via init(). Go guarantees all
// package-level var initializers run before any init() function, so this
// append is safe regardless of file compilation order.
//
// NOTE on ordering: BlogPosts / PublishedPosts is documented as "insertion
// order" (see blog.go comments) and nothing sorts it by Date. Appending here
// puts these 3 posts at the END of the slice, after every post already in
// blog.go — including posts dated before 2026-09-17. Any UI that relies on
// insertion order looking like chronological order (it should not, per the
// existing code, since blog.go itself is not date-sorted) will list these
// last regardless of their Date field. If true chronological ordering is
// ever wanted, PublishedPosts()/BlogListMarkdown() would need an explicit
// sort by Date — out of scope here since it touches shared code path.
//
// NOTE on `hi` language support (found, not fixed, per task instructions):
//   - internal/handlers/page_blog_post.go lines 55-59: `lang` (used for the
//     <html lang="..."> attribute) is auto-detected ONLY as "en" or "zh" via
//     CJK-character sniffing of the title (blogContainsCJK). A Devanagari
//     title falls through to "en". A `case` for Devanagari (or a dedicated
//     post.Lang field) would be needed for the HTML lang attribute to say
//     "hi" instead of "en".
//   - Same file, lines 85-92: `inLanguage` (schema.org field) DOES honor an
//     explicit post.InLanguage value, which these posts set to "hi" — this
//     part works correctly with zero code changes.
//   - BlogPost struct (blog.go lines 11-29) has AlternateEN/AlternateZH/
//     AlternateMS sibling-slug fields but no AlternateHI — hi posts cannot
//     be cross-linked as language siblings without adding that field.
//   - No /hi/ URL prefix, no Hindi entries in the language switcher
//     (templates/pages/zh.html and friends are per-language page trees;
//     there is no equivalent hi*.html set), and footer/partials language
//     links do not mention Hindi. Full hi support would need: a new
//     AlternateHI field, a Devanagari branch in the lang-detection above,
//     and (optionally) parallel hi* page templates the way zh/ms exist.
// None of the above was changed — this file only adds blog posts.

func init() {
	BlogPosts = append(BlogPosts, hiVisaPosts...)
}

var hiVisaPosts = []BlogPost{
	{
		Slug:          "singapore-malaysia-visa-run-indian-passport-hindi",
		Date:          "2026-09-17",
		Category:      "यात्रा गाइड",
		Author:        "Pelangi Capsule Hostel",
		ReadTime:      "8 min read",
		Tags:          []string{"visa-run", "indian-passport", "singapore", "johor-bahru", "malaysia-visa", "hindi"},
		FeaturedImage: "/images/blog/singapore-expat-visa-run-johor-bahru-guide-2026.webp",
		ImageAlt:      "The Johor-Singapore Causeway border crossing used for visa runs between Singapore and Johor Bahru",
		InLanguage:    "hi",
		AlternateEN:   "singapore-expat-visa-run-johor-bahru-guide-2026",
		Title:         "भारतीय पासपोर्ट धारकों के लिए सिंगापुर–मलेशिया \"वीज़ा रन\": क्या मान्य है, क्या नहीं",
		Excerpt:       "बार-बार बॉर्डर पार करना — कब यह सामान्य ट्रैवल है और कब यह \"वीज़ा रन\" माना जाकर परेशानी खड़ी कर सकता है। भारतीय पासपोर्ट के लिए ज़रूरी फ़र्क़ जानें, आधिकारिक स्रोतों के साथ।",
		Content: `
<p>अगर आप भारतीय पासपोर्ट पर मलेशिया में हैं — काम, पढ़ाई, या लंबी छुट्टी पर — तो आपने "वीज़ा रन" शब्द ज़रूर सुना होगा: अपनी स्टे को "रीसेट" करने के लिए बॉर्डर पार करके वापस आना। लेकिन भारतीय पासपोर्ट के लिए यह उतना आसान नहीं जितना कुछ ब्लॉग बताते हैं, क्योंकि सिंगापुर और मलेशिया की तरफ़ के नियम अलग-अलग हैं। यह लेख वही बताता है जो आधिकारिक स्रोतों और असली यात्रियों के अनुभव से पुष्टि हुआ है — अंदाज़ा नहीं।</p>

<h2>पहला ज़रूरी फ़र्क़: मलेशिया वीज़ा-मुक्त है, सिंगापुर नहीं</h2>
<p>भारतीय नागरिकों को <strong>मलेशिया में 31 दिसंबर 2026 तक 30 दिन का वीज़ा-मुक्त प्रवेश</strong> मिलता है — टूरिज़्म, बिज़नेस, सोशल विज़िट या ट्रांज़िट के लिए (Malaysia's Ministry of Home Affairs / KLN की घोषणा)। लेकिन <strong>सिंगापुर की तरफ़ यह बिल्कुल उल्टा है</strong>: ICA (Immigration & Checkpoints Authority) की आधिकारिक वेबसाइट साफ़ कहती है कि भारतीय पासपोर्ट धारकों को सिंगापुर में घुसने के लिए <strong>वीज़ा चाहिए ही</strong> — डिप्लोमैटिक/ऑफ़िशियल पासपोर्ट को छोड़कर। मतलब, "मलेशिया की स्टे रीसेट करने के लिए सिंगापुर भाग जाना" तभी काम करता है जब आपके पास पहले से एक वैध, मल्टीपल-एंट्री सिंगापुर विज़िट वीज़ा हो।</p>

<h2>सिंगापुर वीज़ा कैसे काम करता है</h2>
<p>ICA के अनुसार आवेदन Form 14A के साथ, पासपोर्ट फ़ोटो पेज की कॉपी, हाल की फ़ोटो और S$30 प्रोसेसिंग फ़ीस के साथ करना होता है — किसी अधिकृत एजेंट, लोकल कॉन्टैक्ट या ओवरसीज़ मिशन के ज़रिए। मुंबई कॉन्सुलेट-जनरल के अनुसार 1 जनवरी 2026 से गवर्नमेंट फ़ीस ₹2,100 तय की गई है (एजेंट सर्विस चार्ज अलग)। ICA सामान्य वीज़िट पास 14 से 30 दिन का होता है और यह इमिग्रेशन ऑफ़िसर की मर्ज़ी पर तय होता है — आपकी वीज़ा वैलिडिटी जितना ज़रूरी नहीं। <em>(एकल स्रोत — एक ट्रैवल-गाइड वेबसाइट के अनुसार टूरिस्ट पास को 90 दिन तक बढ़ाया जा सकता है; इसकी पुष्टि किसी दूसरे स्रोत में नहीं मिली, इसे सामान्य नियम न मानें)।</em></p>

<h2>मलेशिया की तरफ़ से क्या ज़रूरी है</h2>
<p>मलेशिया में हर एंट्री के लिए <strong>MDAC (Malaysia Digital Arrival Card)</strong> अनिवार्य है — यात्रा से अधिकतम 3 दिन पहले, सिर्फ़ आधिकारिक पोर्टल <code>imigresen-online.imi.gov.my/mdac/main</code> पर (Malaysian Immigration Department की चेतावनी: नकली MDAC वेबसाइटों से सावधान रहें)। इसके अलावा चाहिए: पासपोर्ट कम से कम 6 महीने वैध, कन्फ़र्म रिटर्न/आगे की टिकट, ठहरने का प्रमाण, और पर्याप्त पैसे का सबूत।</p>

<h2>इमिग्रेशन ऑफ़िसर असल में क्या पूछते हैं</h2>
<p>ट्रैवल फ़ोरम (TripAdvisor/Quora खोज परिणामों के अनुसार) पर बार-बार यह बात सामने आती है कि जो यात्री थोड़े समय में कई बार अंदर-बाहर हुए, उनसे इमिग्रेशन ऑफ़िसर ने <strong>4-5 बार तक लंबी पूछताछ</strong> की — काम/पढ़ाई का परमिट न हो तो एंट्री से मना करने का पूरा अधिकार ऑफ़िसर के पास है। <em>(एकल स्रोत — फ़ोरम पोस्ट्स के सार पर आधारित, आधिकारिक आंकड़ा नहीं)।</em> आम तौर पर पूछे जाने वाले सवाल: आप कहाँ ठहर रहे हैं, वापसी टिकट कहाँ है, आपके पास कितना पैसा है, और आप कितनी बार पहले आ चुके हैं (पासपोर्ट पर लगी पुरानी स्टैम्प से यह साफ़ दिखता है)।</p>

<h2>बार-बार क्रॉसिंग से बैन/ब्लैकलिस्ट का ख़तरा</h2>
<p>Malaysian Immigration Department (imi.gov.my) की "Prohibited Immigrant" पॉलिसी के अनुसार Social Visit Pass का दुरुपयोग ब्लैकलिस्टिंग का कारण बन सकता है — अवधि गंभीरता पर निर्भर करती है (एक कानूनी सलाह वेबसाइट के अनुसार overstay जैसे गंभीर मामलों में बैन 5 साल तक जा सकता है)। सीधा शब्दों में: अगर आपका पैटर्न "हर 29वें दिन बॉर्डर पार करना, कहीं और न जाना, कोई असली मकसद न दिखना" जैसा दिखे, तो यह वैध टूरिज़्म नहीं बल्कि पास का दुरुपयोग माना जा सकता है।</p>

<h2>तो क्या मान्य है, क्या नहीं?</h2>
<ul>
  <li><strong>ठीक है:</strong> असली यात्रा मकसद के साथ बॉर्डर पार करना — JB में घूमना, खाना, शॉपिंग, दोस्तों से मिलना — भले ही यह बार-बार हो, अगर आपके पास वापसी टिकट, पैसा और ठहरने का सबूत है।</li>
  <li><strong>जोखिम भरा:</strong> सिर्फ़ स्टे "रीसेट" करने के लिए उसी दिन आना-जाना, कोई और गतिविधि न दिखना, पैटर्न बार-बार दोहराना।</li>
  <li><strong>याद रखें:</strong> काम या पढ़ाई के लिए मलेशिया में रहने वालों को वीज़ा-मुक्त एंट्री की जगह असली वर्क/स्टडी वीज़ा चाहिए — विज़ा रन इसका विकल्प नहीं है।</li>
</ul>

<h2>JB में रुकने का एक ईमानदार सुझाव</h2>
<p>अगर आप बॉर्डर ट्रिप के दौरान JB में एक रात रुकना चाहते हैं — चाहे वापसी की फ़्लाइट/टिकट का इंतज़ार हो या सिर्फ़ आराम — <a href="/book">Pelangi Capsule Hostel</a> JB Sentral/CIQ से क़रीब है, बजट में RM35/रात से शुरू, और वेबसाइट से सीधे बुक करने पर पहली रात RM30 से मिलती है। यह कोई "वीज़ा हैक" नहीं है, बस एक सस्ती, भरोसेमंद जगह है जब आप बॉर्डर के इस तरफ़ हों।</p>

<h2>ज़रूरी चेतावनी</h2>
<p>यह लेख केवल सामान्य जानकारी के लिए है, यह कानूनी सलाह नहीं है। इमिग्रेशन नियम अक्सर बदलते हैं और अंतिम फ़ैसला हमेशा उस समय ड्यूटी पर मौजूद इमिग्रेशन ऑफ़िसर का होता है। यात्रा से पहले हमेशा <strong>ICA सिंगापुर</strong> (ica.gov.sg), <strong>Imigresen मलेशिया</strong> (imi.gov.my), और ज़रूरत पड़ने पर <strong>भारतीय उच्चायोग/वाणिज्य दूतावास</strong> (सिंगापुर या मलेशिया) से मौजूदा नियम ज़रूर जांच लें।</p>

<h2>संदर्भ / Sources</h2>
<ul>
  <li><a href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements/visa-detail-page/india">ICA Singapore — India Visa Requirements</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements">ICA Singapore — Check if You Need an Entry Visa</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.kln.gov.my/web/ind_new-delhi/requirement_foreigner">Ministry of Foreign Affairs Malaysia — New Delhi, entry requirements</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.ey.com/en_gl/technical/tax-alerts/malaysia-extends-visa-exemption-period-for-india-and-china-nationals">EY — Malaysia extends visa exemption for India and China nationals</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.fragomen.com/insights/malaysia-visa-exemption-implemented-for-chinese-and-indian-nationals.html">Fragomen — Malaysia visa exemption for Chinese and Indian nationals</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.imi.gov.my/index.php/en/pengumuman/malaysia-digital-arrival-card-mdac/">Malaysian Immigration Department — MDAC announcement</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.imi.gov.my/index.php/en/enforcement/prohibited-immigrant/">Malaysian Immigration Department — Prohibited Immigrant policy</a> (fetched 2026-09-17)</li>
  <li><a href="https://tyhlegal.my/malaysian-immigration-blacklisting-common-circumstances-solutions-appeals/">Tam Yuen Hung & Co. — Malaysia immigration blacklisting circumstances</a> (fetched 2026-09-17, law-firm commentary, single-source claim labelled above)</li>
  <li><a href="https://mumbai.mfa.gov.sg/consular-services/visa-information/">Consulate-General of Singapore, Mumbai — Visa Information / fee</a> (fetched 2026-09-17)</li>
  <li>TripAdvisor forum thread "Immigration Officers at Johor Bahru" and Quora thread on Indian passport / Johor Bahru visa (accessed via search summary 2026-09-17; direct page fetch returned 403 — single-source, labelled above)</li>
</ul>
`,
	},
	{
		Slug:          "singapore-se-johor-bahru-jane-vapas-ane-guide-hindi",
		Date:          "2026-09-17",
		Category:      "यात्रा गाइड",
		Author:        "Pelangi Capsule Hostel",
		ReadTime:      "9 min read",
		Tags:          []string{"johor-bahru", "singapore", "woodlands", "tuas", "mdac", "sgac", "hindi"},
		FeaturedImage: "/images/blog/woodlands-causeway-sultan-iskandar-ciq-johor-bahru-border-crossing.webp",
		ImageAlt:      "Aerial view of the Sultan Iskandar CIQ complex in Johor Bahru with the Causeway approach road and the Singapore shoreline across the water at dusk",
		InLanguage:    "hi",
		Title:         "सिंगापुर से जोहोर बाहरू (JB) जाकर वापस आना — स्टेप-बाय-स्टेप गाइड",
		Excerpt:       "Woodlands या Tuas checkpoint, कौन-सी बस लें, कितना समय-पैसा लगेगा, MDAC और SGAC कैसे भरें — भारतीय यात्रियों के लिए पूरी प्रोसेस, आधिकारिक स्रोतों के साथ।",
		Content: `
<p>सिंगापुर से जोहोर बाहरू (JB) जाना दुनिया के सबसे व्यस्त लैंड बॉर्डर क्रॉसिंग में से एक पार करना है — लेकिन सही जानकारी हो तो यह डेढ़ घंटे में हो सकता है। यहाँ पूरी स्टेप-बाय-स्टेप प्रोसेस है, चेकपॉइंट के नाम, बस नंबर और असली लागत के साथ।</p>

<h2>दो चेकपॉइंट: Woodlands (Causeway) और Tuas (2nd Link)</h2>
<p><strong>Woodlands Checkpoint / Johor-Singapore Causeway</strong> — सबसे मशहूर और आमतौर पर सबसे व्यस्त रास्ता। सिंगापुर की तरफ़ Woodlands, मलेशिया की तरफ़ <strong>JB Sentral / Bangunan Sultan Iskandar (BSI) CIQ Complex</strong> (Bukit Chagar में)। <strong>Tuas Checkpoint / 2nd Link</strong> — पश्चिम की तरफ़, आमतौर पर कम भीड़, ख़ासकर वीकेंड पर, लेकिन यह शहर के केंद्र से थोड़ा दूर है।</p>

<h2>बस से जाना — CW1, CW2 और Causeway Link की डिटेल</h2>
<p>Causeway Link की <strong>CW1</strong> बस Kranji MRT से Woodlands के रास्ते JB CIQ (First Link) तक जाती है, हर 15-30 मिनट में। <strong>CW2</strong> 24 घंटे चलती है — रात 11 बजे से सुबह 4 बजे तक Queen Street Terminal से हर 45 मिनट में। Woodlands रूट की बसों का किराया फ़्लैट <strong>S$5</strong> है। Tuas checkpoint के लिए अलग बसें हैं (जैसे CW7, Tuas Link MRT से)। दरवाज़े-से-दरवाज़े कुल सफ़र — इमिग्रेशन मिलाकर — <strong>30 से 60 मिनट</strong> तक लग सकता है, ट्रैफ़िक और भीड़ पर निर्भर।</p>

<p>JB की तरफ़ <strong>KSL City Mall</strong> से भी कनेक्शन है — BAS.MY J100 शटल सेवा (Causeway Link द्वारा संचालित) सीधे JB Sentral और KSL City Mall के बीच चलती है, जहाँ से आगे BSI होते हुए सिंगापुर जाया जा सकता है।</p>

<figure class="blog-figure"><img src="/images/blog/singapore-expat-visa-run-johor-bahru-guide-2026.webp" alt="The Johor-Singapore Causeway border crossing" loading="lazy" width="1200" height="800"><figcaption>Johor-Singapore Causeway — Woodlands checkpoint से JB Sentral / BSI CIQ तक।</figcaption></figure>

<h2>सिंगापुर छोड़ने से पहले: SG Arrival Card (SGAC)</h2>
<p>सिंगापुर लौटते समय <strong>ICA</strong> के अनुसार लगभग हर यात्री को अपने आगमन से <strong>3 दिन पहले तक</strong> SG Arrival Card (SGAC) — फ़्री, ऑनलाइन ICA e-Service या MyICA ऐप से — जमा करना ज़रूरी है, जिसमें electronic health declaration भी शामिल है। यह जमा न करने पर एंट्री से मना किया जा सकता है। ध्यान रहे: यह सिंगापुर सिटीज़न/PR/लॉन्ग-टर्म-पास वालों के लिए लैंड चेकपॉइंट पर छूट है, लेकिन भारतीय पासपोर्ट धारकों (विज़िट वीज़ा पर) के लिए यह ज़रूरी माना जाना चाहिए — जब तक ICA की वेबसाइट पर आपकी कैटेगरी के लिए अलग छूट न लिखी हो।</p>

<h2>मलेशिया में घुसने से पहले: MDAC</h2>
<p>JB की तरफ़ आते समय <strong>MDAC (Malaysia Digital Arrival Card)</strong> ज़रूरी है — सिर्फ़ आधिकारिक पोर्टल <code>imigresen-online.imi.gov.my/mdac/main</code> से, यात्रा से अधिकतम 3 दिन पहले, बिल्कुल मुफ़्त। Malaysian Immigration Department ने साफ़ चेतावनी दी है कि नकली MDAC वेबसाइटों से सावधान रहें — सिर्फ़ आधिकारिक लिंक इस्तेमाल करें।</p>

<h2>क़दम-दर-क़दम (Woodlands रूट, सिंगापुर → JB)</h2>
<ol>
  <li>यात्रा से 3 दिन पहले तक SGAC (वापसी के लिए) और MDAC (JB में प्रवेश के लिए) दोनों ऑनलाइन भर लें।</li>
  <li>Kranji MRT स्टेशन जाएँ, CW1 बस पकड़ें (किराया S$5)।</li>
  <li>Woodlands Checkpoint पर सिंगापुर इमिग्रेशन — पासपोर्ट स्कैन/स्टैम्प।</li>
  <li>बस Causeway पार करेगी — यहीं असली भीड़ और देरी होती है, ख़ासकर वीकेंड शाम को।</li>
  <li>JB Sentral / BSI CIQ Complex पर मलेशिया इमिग्रेशन — MDAC QR कोड और पासपोर्ट दिखाएँ।</li>
  <li>JB Sentral से आगे Grab/टैक्सी/लोकल बस से अपनी मंज़िल तक।</li>
</ol>

<h2>कुल समय और लागत — एक असली अनुमान</h2>
<p>सामान्य दिन में बस + दोनों इमिग्रेशन मिलाकर <strong>30-60 मिनट</strong> (स्रोत ऊपर) — लेकिन वीकेंड, छुट्टी, या शाम के पीक आवर में यह <strong>2-3 घंटे या ज़्यादा</strong> भी हो सकता है (यह हिस्सा सामान्य यात्रा-अनुभव पर आधारित है, किसी एक स्रोत से पुष्ट आंकड़ा नहीं, इसलिए सिर्फ़ अनुमान मानें)। लागत: बस किराया S$5 (लगभग RM17), टैक्सी/Grab ज़्यादा। कुल एक-तरफ़ा ख़र्च आमतौर पर S$5-15 के बीच रहता है, प्राइवेट ट्रांसफ़र लें तो ज़्यादा।</p>

<h2>JB में ठहरना</h2>
<p>अगर आपकी योजना JB में रात रुकने की है — सुबह जल्दी सिंगापुर वापस जाने के लिए, या सिर्फ़ बजट में घूमने के लिए — <strong>Pelangi Capsule Hostel</strong> JB Sentral/CIQ के पास है, RM35/रात से, वेबसाइट पर सीधे बुक करने पर पहली रात <strong>RM30</strong> में। <a href="/book">यहाँ बुक करें</a>।</p>

<h2>ज़रूरी चेतावनी</h2>
<p>यह जानकारी केवल संदर्भ के लिए है, कानूनी सलाह नहीं। समय, फ़ीस और प्रोसेस बदल सकते हैं। यात्रा से पहले <strong>ICA सिंगापुर</strong> (ica.gov.sg), <strong>Imigresen मलेशिया</strong> (imi.gov.my) और भारतीय उच्चायोग/वाणिज्य दूतावास की वेबसाइट पर मौजूदा नियम ज़रूर जांच लें।</p>

<h2>संदर्भ / Sources</h2>
<ul>
  <li><a href="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/sg-arrival-card">ICA Singapore — SG Arrival Card (SGAC) with Electronic Health Declaration</a> (fetched 2026-09-17)</li>
  <li><a href="https://en.wikipedia.org/wiki/Singapore_Arrival_Card">Wikipedia — Singapore Arrival Card</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.imi.gov.my/index.php/en/pengumuman/malaysia-digital-arrival-card-mdac/">Malaysian Immigration Department — MDAC announcement</a> (fetched 2026-09-17)</li>
  <li><a href="https://en.wikipedia.org/wiki/Malaysia_Digital_Arrival_Card">Wikipedia — Malaysia Digital Arrival Card</a> (fetched 2026-09-17)</li>
  <li><a href="https://thesmartlocal.com/read/causeway-link-bus-guide/">TheSmartLocal — Causeway Link Bus Guide: SG to JB Routes, Fares & Timings</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.transporttojb.com/cw-bus-to-jb/">TransportToJB — CW Bus Transport via Woodlands or Tuas Checkpoints</a> (fetched 2026-09-17)</li>
  <li><a href="https://businterchange.net/johorbus/tips/221-going-to-johor-bahru-via-woodlands.html">BusInterchange.net — Bus Services to Johor Bahru via Woodlands</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.kslcity.com.my/bus">KSL City Mall — Bus services page</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.rome2rio.com/s/KSL-City-Mall-Johor-Bahru/Singapore">Rome2Rio — KSL City Mall Johor Bahru to Singapore routes</a> (fetched 2026-09-17)</li>
</ul>
`,
	},
	{
		Slug:          "malaysia-visa-free-entry-indians-hindi-guide",
		Date:          "2026-09-17",
		Category:      "यात्रा गाइड",
		Author:        "Pelangi Capsule Hostel",
		ReadTime:      "7 min read",
		Tags:          []string{"malaysia-visa", "indian-passport", "mdac", "visa-free", "hindi"},
		FeaturedImage: "/images/blog/malaysia-passport-entry-exit-stamps-kl-visa-free-india.webp",
		ImageAlt:      "Open passport pages showing Malaysia Immigration KL International entry and exit stamps alongside other travel stamps",
		InLanguage:    "hi",
		Title:         "मलेशिया में भारतीयों के लिए वीज़ा-मुक्त प्रवेश: पूरी जानकारी (2026)",
		Excerpt:       "31 दिसंबर 2026 तक भारतीय पासपोर्ट धारकों को मलेशिया में 30 दिन वीज़ा-मुक्त एंट्री मिलती है। अवधि, दोबारा एंट्री, ज़रूरी दस्तावेज़ और सबसे आम ग़लतफ़हमियाँ — आधिकारिक स्रोतों के साथ।",
		Content: `
<h2>मूल नियम: 30 दिन, 31 दिसंबर 2026 तक</h2>
<p>मलेशिया सरकार (Home Ministry) ने भारतीय नागरिकों के लिए वीज़ा-मुक्त एंट्री की सुविधा को <strong>31 दिसंबर 2026 तक</strong> बढ़ा दिया है — टूरिज़्म, बिज़नेस, सोशल विज़िट या ट्रांज़िट के लिए, हर बार अधिकतम <strong>30 दिन</strong> तक। यह सुविधा दिसंबर 2023 में शुरू हुई थी और Home Ministry के सेक्रेटरी-जनरल दातुक अवांग अलीक जेमान के अनुसार यह मलेशिया के 2025 ASEAN चेयरमैनशिप और Visit Malaysia Year 2026 की तैयारियों से जुड़ी है।</p>

<h2>ज़रूरी शर्तें</h2>
<ul>
  <li>पासपोर्ट कम से कम <strong>6 महीने</strong> वैध होना चाहिए।</li>
  <li>कन्फ़र्म <strong>रिटर्न या आगे की टिकट</strong> 30 दिन के अंदर की।</li>
  <li>ठहरने की जगह का प्रमाण (होटल बुकिंग वग़ैरह) और <strong>पर्याप्त पैसे</strong> का सबूत — अगर इमिग्रेशन ऑफ़िसर माँगे।</li>
  <li><strong>MDAC (Malaysia Digital Arrival Card)</strong> यात्रा से अधिकतम 3 दिन पहले, सिर्फ़ आधिकारिक पोर्टल <code>imigresen-online.imi.gov.my/mdac/main</code> पर — मुफ़्त, कोई फ़ीस नहीं।</li>
</ul>

<h2>यह वीज़ा-मुक्त सुविधा किसके लिए नहीं है</h2>
<p>यह सिर्फ़ टूरिज़्म/सोशल/बिज़नेस-विज़िट/ट्रांज़िट के लिए है। <strong>काम या पढ़ाई</strong> के लिए मलेशिया आने वाले भारतीय नागरिकों को अब भी यात्रा से पहले सही वर्क वीज़ा या स्टूडेंट पास लेना ज़रूरी है — इसे वीज़ा-मुक्त एंट्री से बदला नहीं जा सकता। यह Fragomen की इमिग्रेशन-लॉ एडवाइज़री में साफ़ लिखा है।</p>

<h2>eVisa कब चाहिए?</h2>
<p>अगर आपकी यात्रा 30 दिन से ज़्यादा है, या मक़सद टूरिज़्म/बिज़नेस-विज़िट/सोशल/ट्रांज़िट के अलावा कुछ और है, तो वीज़ा-मुक्त सुविधा लागू नहीं होती — तब आधिकारिक eVisa पोर्टल से आवेदन करना होता है। कुछ ट्रैवल-एजेंसी वेबसाइट्स के अनुसार eVisa फ़ीस लगभग <strong>MYR 100</strong> + प्रोसेसिंग चार्ज लगभग <strong>MYR 105</strong> है। <em>(एकल स्रोत — यह फ़ीस निजी ट्रैवल-गाइड वेबसाइट्स से है, आधिकारिक eVisa पोर्टल पर सीधे जांचें, क्योंकि फ़ीस बदल सकती है।)</em></p>

<h2>दोबारा एंट्री (Re-entry) — सबसे बड़ी ग़लतफ़हमी</h2>
<p>बहुत से यात्री सोचते हैं कि वीज़ा-मुक्त 30 दिन ख़त्म होते ही सिर्फ़ बॉर्डर पार करके वापस आने से नई 30-दिन की गिनती अपने-आप, बिना किसी सवाल के शुरू हो जाती है। असल में <strong>हर एंट्री पर इमिग्रेशन ऑफ़िसर के पास पूरा अधिकार है</strong> कि वह आपकी यात्रा-हिस्ट्री (पासपोर्ट स्टैम्प से साफ़ दिखती है), मक़सद और दस्तावेज़ देखकर एंट्री दे या मना करे। Malaysian Immigration Department की "Prohibited Immigrant" नीति के अनुसार Social Visit Pass का बार-बार दुरुपयोग ब्लैकलिस्टिंग की वजह बन सकता है — गंभीरता के हिसाब से अवधि तय होती है।</p>

<h2>दूसरी आम ग़लतफ़हमियाँ</h2>
<ul>
  <li><strong>"30 दिन को Malaysia में extend किया जा सकता है"</strong> — नहीं। एक सामान्य ट्रैवल-गाइड सोर्स के अनुसार टूरिज़्म के लिए यह वीज़ा-मुक्त 30-दिन अवधि extend नहीं होती; ज़्यादा रुकना हो तो सही वीज़ा पहले से लेना होगा।</li>
  <li><strong>"MDAC = वीज़ा"</strong> — नहीं, MDAC सिर्फ़ एक अराइवल-रजिस्ट्रेशन फ़ॉर्म है, यह वीज़ा-मुक्त पात्रता या दस्तावेज़ों की जगह नहीं लेता।</li>
  <li><strong>"यह सुविधा हमेशा के लिए है"</strong> — नहीं, यह 31 दिसंबर 2026 तक की घोषित समय-सीमा है; उसके आगे बढ़ेगी या नहीं, इसकी आधिकारिक पुष्टि यात्रा से ठीक पहले जांचें।</li>
</ul>

<h2>JB में रुकने का सुझाव</h2>
<p>मलेशिया में वीज़ा-मुक्त एंट्री पर आ रहे हों और जोहोर बाहरू में रुकना हो — चाहे सिंगापुर बॉर्डर के पास या शहर घूमने के लिए — <a href="/book">Pelangi Capsule Hostel</a> बजट कैप्सूल-स्टे है, RM35/रात से, वेबसाइट से सीधे बुक करने पर पहली रात RM30।</p>

<h2>ज़रूरी चेतावनी</h2>
<p>यह लेख सामान्य जानकारी के लिए है, कानूनी सलाह नहीं। वीज़ा नियम, फ़ीस और समय-सीमा अक्सर बदलते हैं। यात्रा से ठीक पहले हमेशा <strong>Imigresen मलेशिया</strong> (imi.gov.my), आधिकारिक MDAC पोर्टल, और ज़रूरत पड़ने पर <strong>भारतीय उच्चायोग, कुआलालंपुर</strong> से मौजूदा नियम जांच लें।</p>

<h2>संदर्भ / Sources</h2>
<ul>
  <li><a href="https://www.ey.com/en_gl/technical/tax-alerts/malaysia-extends-visa-exemption-period-for-india-and-china-nationals">EY — Malaysia extends visa exemption period for India and China nationals</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.fragomen.com/insights/malaysia-visa-exemption-implemented-for-chinese-and-indian-nationals.html">Fragomen — Malaysia: Visa Exemption Implemented for Chinese and Indian Nationals</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.business-standard.com/finance/personal-finance/malaysia-extends-visa-exemption-for-indian-nationals-until-dec-2026-124122300164_1.html">Business Standard — Indians can travel to Malaysia without a visa for 30 days until Dec 2026</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.kln.gov.my/web/ind_new-delhi/requirement_foreigner">Ministry of Foreign Affairs Malaysia — New Delhi, entry requirements</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.imi.gov.my/index.php/en/pengumuman/malaysia-digital-arrival-card-mdac/">Malaysian Immigration Department — MDAC announcement</a> (fetched 2026-09-17)</li>
  <li><a href="https://www.imi.gov.my/index.php/en/enforcement/prohibited-immigrant/">Malaysian Immigration Department — Prohibited Immigrant policy</a> (fetched 2026-09-17)</li>
</ul>
`,
	},
}
