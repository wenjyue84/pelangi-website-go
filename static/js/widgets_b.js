// widgets_b.js — self-contained IIFE.
// Ports CookieConsent.tsx (Google Consent Mode v2) + SearchDialog.tsx (Fuse.js → custom scorer).
// Overrides app.js [data-search-open] redirect and Ctrl+K handler.
(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════════
     BILINGUAL COPY — mirrors CookieConsent.tsx COPY object exactly
     ═══════════════════════════════════════════════════════════════════════ */
  var COPY = {
    en: {
      description: "We use cookies to analyse site traffic and improve your experience. Non-essential cookies (analytics) are only loaded with your explicit consent, as required by Malaysia’s Personal Data Protection (Amendment) Act 2024. No boxes are pre-ticked.",
      newsletter: "If you subscribe to our newsletter, your email is shared with our email marketing provider (Brevo) under PDPA.",
      dpoContact: "For privacy concerns, contact our Data Protection Officer at dpo@pelangicapsulehostel.com.",
      privacyLink: "Privacy Policy",
      acceptAll: "Accept All",
      rejectAll: "Reject Non-Essential",
      manage: "Manage Preferences",
      savePrefs: "Save Preferences",
      essentialLabel: "Essential Cookies",
      essentialDesc: "Required for the website to function (session, language preference). Cannot be disabled.",
      analyticsLabel: "Analytics Cookies",
      analyticsDesc: "Help us understand how visitors use the site. Includes Google Analytics and Microsoft Clarity. Only enabled with your consent.",
      alwaysOn: "Always on"
    },
    zh: {
      description: "我们使用Cookie来分析网站流量并改善您的体验。根据马来西亚2024年《个人数据保护（修正）法令》，非必要Cookie（分析）仅在您明确同意后加载。没有预勾选的复选框。",
      newsletter: "如果您订阅我们的电子通讯，您的电子邮件将根据PDPA与我们的邮件营销提供商（Brevo）共享。",
      dpoContact: "如有隐私疑虑，请联系数据保护官：dpo@pelangicapsulehostel.com。",
      privacyLink: "隐私政策",
      acceptAll: "接受全部",
      rejectAll: "拒绝非必要",
      manage: "管理偏好设置",
      savePrefs: "保存偏好设置",
      essentialLabel: "必要Cookie",
      essentialDesc: "网站运行所必需（会话、语言偏好）。无法禁用。",
      analyticsLabel: "分析Cookie",
      analyticsDesc: "帮助我们了解访客如何使用网站。包括Google Analytics和Microsoft Clarity。仅在您同意后启用。",
      alwaysOn: "始终开启"
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════
     SEARCH INDEX — ported from src/data/search-index.ts
     47 items: 35 blog posts + 7 guide sections + 5 getting-here sections
     ═══════════════════════════════════════════════════════════════════════ */
  var SEARCH_INDEX = [
    // ── Blog Posts (35) ────────────────────────────────────────────────
    { title: "The Ultimate Johor Bahru Food Guide for Backpackers (2026)", excerpt: "From RM5 hawker meals to legendary seafood spots — everything a budget traveller needs to eat their way through JB like a local.", url: "/blog/ultimate-jb-food-guide-backpackers", category: "Blog", tags: ["johor-bahru","food","backpacker","budget-travel","malaysia","hawker"] },
    { title: "Singapore to JB Day Trip Guide: How to Cross the Causeway (2026)", excerpt: "The complete step-by-step guide to crossing the Causeway from Singapore to Johor Bahru — transport options, immigration tips, costs, and what to do once you arrive.", url: "/blog/singapore-to-jb-day-trip-causeway-guide", category: "Blog", tags: ["johor-bahru","singapore","causeway","border-crossing","backpacker","budget-travel"] },
    { title: "Top 10 Things to Do in Johor Bahru on a Budget", excerpt: "You don’t need to spend big to have a great time in JB. Here are the best free and cheap activities for backpackers exploring Johor Bahru.", url: "/blog/top-10-things-to-do-johor-bahru-budget", category: "Blog", tags: ["johor-bahru","budget-travel","backpacker","things-to-do","malaysia","free-activities"] },
    { title: "JB Street Food Hawker Centres You Must Visit", excerpt: "The best hawker centres in Johor Bahru for backpackers — where locals eat, what to order, and how to eat well for under RM15 per meal.", url: "/blog/jb-hawker-centres-street-food-must-visit", category: "Blog", tags: ["johor-bahru","food","hawker","street-food","backpacker","budget-travel"] },
    { title: "Johor Bahru vs Singapore: Why Savvy Travellers Base Themselves in JB", excerpt: "Singapore is spectacular — but staying there drains your budget fast. Smart backpackers stay in JB and day-trip into Singapore. Here’s why it works.", url: "/blog/johor-bahru-vs-singapore-why-travellers-base-in-jb", category: "Blog", tags: ["johor-bahru","singapore","budget-travel","backpacker","malaysia","comparison"] },
    { title: "Hidden Gems in Johor Bahru: Beyond the Usual Tourist Spots", excerpt: "Skip the malls and tourist traps. These are the places JB locals love — from secret waterfalls to forgotten heritage streets and underground food spots.", url: "/blog/hidden-gems-johor-bahru-beyond-tourist-spots", category: "Blog", tags: ["johor-bahru","hidden-gems","local-life","backpacker","malaysia","off-the-beaten-path"] },
    { title: "How Malaysians Can Find Jobs in Singapore (2026 Guide)", excerpt: "Step-by-step guide for Malaysian job seekers: job portals, work passes, salary expectations, and interview tips for landing a Singapore role.", url: "/blog/how-malaysians-find-jobs-singapore-2026", category: "Blog", tags: ["singapore","jobs","career","work-pass","malaysia","job-search"] },
    { title: "Singapore Work Pass Guide for Malaysians: EP vs S Pass vs Work Permit", excerpt: "Understand the three main Singapore work pass types for Malaysians: Employment Pass, S Pass, and Work Permit. Compare salary minimums, eligibility, and which visa suits your career stage.", url: "/blog/singapore-work-pass-guide-malaysians", category: "Blog", tags: ["singapore","work-pass","career","expat","malaysia","employment-pass","visa"] },
    { title: "Living in Johor Bahru, Working in Singapore: The Commuter’s Guide 2026", excerpt: "Cross the Causeway daily and save money. Everything Malaysians need to know about commuting from JB to Singapore: bus options, CIQ crossings, costs, and why it works.", url: "/blog/jb-singapore-commuter-guide-2026", category: "Blog", tags: ["johor-bahru","singapore","commuter","work","malaysia","cross-border","cost-of-living"] },
    { title: "5 Gig Jobs for Malaysians Waiting for Singapore Work Approval", excerpt: "Stuck in the work pass waiting period? Make money while you wait. Foodpanda, Lalamove, Grab, and more—5 flexible gig economy jobs in Malaysia with realistic earnings.", url: "/blog/gig-jobs-malaysia-waiting-singapore-work-pass", category: "Blog", tags: ["gig-economy","malaysia","work","freelance","income","job-seeker"] },
    { title: "3-Day JB Backpacker Itinerary Under RM250 (2026)", excerpt: "A complete 3-day itinerary for JB on a tight budget: RM35/night hostel, RM25/day food, RM10/day transport. Day-by-day breakdown with best food spots and activities.", url: "/blog/3-day-jb-backpacker-itinerary-rm250", category: "Blog", tags: ["johor-bahru","backpacker","budget-travel","itinerary","malaysia","hostel"] },
    { title: "新山住宿推荐：胶囊旅馆体验指南 (2026)", excerpt: "新山最値得入住的胶囊旅馆是哪家？本文带你深入了解Pelangi胶囊旅馆——价格、设施、位置，一文读懂。", url: "/blog/xinshan-juzhu-tuijian-jiaonang-lvguan", category: "Blog", tags: ["新山","住宿","胶囊旅馆","马来西亚","背包旅行","柔佛"] },
    { title: "从新加坡去新山怎么去？2026最新交通全攻略", excerpt: "地铁、巴士、自驾……从新加坡前往新山的所有交通方式详细对比，附最新过关攻略和省錢小技巧。", url: "/blog/xingjiapo-qu-xinshan-zenme-qu-jiaotong-zhinan", category: "Blog", tags: ["新加坡","新山","交通","过关","长堡","马来西亚"] },
    { title: "新山自由行攻略 2026：吃喝玩乐全指南", excerpt: "新山不只是过境城市！本文带你探索新山最値得打卡的景点、美食和购物地，附三天两夜行程规划。", url: "/blog/xinshan-ziyou-xing-gonglue-2026", category: "Blog", tags: ["新山","自由行","旅游攻略","马来西亚","柔佛","Visit Malaysia 2026"] },
    { title: "Lalamove Driver Guide Malaysia: Earn RM25–80 Per Job in JB", excerpt: "How to become a Lalamove driver in Malaysia, from registration to first earning. Vehicle types, RM25–80 per job, registration steps, and comparison with Foodpanda and Grab.", url: "/blog/lalamove-driver-malaysia-jb-guide", category: "Blog", tags: ["gig-economy","johor-bahru","lalamove","delivery","malaysia","side-hustle"] },
    { title: "Taman Pelangi Tuesday Night Market — The Street Food Paradise at Our Doorstep", excerpt: "Every Tuesday from 4:30 PM, Jalan Perang transforms into a 500m street food carnival. Satay, carrot cake, martabak, fresh seafood — all steps from Pelangi Capsule Hostel.", url: "/blog/taman-pelangi-tuesday-night-market-guide", category: "Blog", tags: ["johor-bahru","night-market","pasar-malam","street-food","taman-pelangi","budget-travel"] },
    { title: "彩虹花园周二夜市攻略｜就在旅馆门口的美食天堂", excerpt: "每个星期二下卹4时半，Jalan Perang就变身500米美食长廊。沙爹、煎蕊、马打峨、海鲜……全在彩虹胶囊旅馆门口等着你！", url: "/blog/taman-pelangi-xingqier-yeshi-gonglue", category: "Blog", tags: ["新山","夜市","pasar-malam","彩虹花园","街头美食","马来西亚"] },
    { title: "中国护照去马来西亚需要签证吗？2026最新免签攻略", excerpt: "好消息！中国护照持有者赴马来西亚已享30天免签。本文详解免签条件、入境流程、注意事项，以及新山最佳住宿推荐。", url: "/blog/zhongguo-huhao-malaxi-a-mianshen-gonglue-2026", category: "Blog", tags: ["中国游客","马来西亚免签","签证攻略","新山","柔佛","出行攻略"] },
    { title: "新山可以用微信支付和支付宝吗？中国游客支付完全指南 2026", excerpt: "好消息：新山越来越多商家接受微信支付和支付宝！本文整理哪些地方可用、如何换汇、及现金与手机支付的实用建议。", url: "/blog/xinshan-weixin-zhifubao-zhongguo-youke-zhifu-zhinan", category: "Blog", tags: ["中国游客","微信支付","支付宝","新山","马来西亚","换汇"] },
    { title: "新山购物完全攻略 2026｜中国游客必逃！比国内便宜多少？", excerpt: "新山购物比新加坡便宜40%，比国内还有价格优势！本文盘点最値得逃的商场、必买清单、讲价技巧，以及从彩虹旅馆出发的最佳路线。", url: "/blog/xinshan-gouwu-gonglue-zhongguo-youke-2026", category: "Blog", tags: ["中国游客","新山购物","马来西亚购物","柔佛","攻略","AEON"] },
    { title: "中国游客在新山必吃什么？清真与非清真美食完全指南", excerpt: "马来西亚是美食天堂，但清真（Halal）规定让部分中国游客摸不着头脑。本文教你如何分辨，以及中国游客最爱的新山美食推荐。", url: "/blog/xinshan-zhongguo-youke-bichi-mishi-gonglue", category: "Blog", tags: ["中国游客","新山美食","清真美食","马来西亚饮食","柔佛","吃喝攻略"] },
    { title: "Getting Around Johor Bahru Without a Car — Transport Guide for Backpackers", excerpt: "Master JB transport on a budget: Grab (RM5–15), Rapid JB buses (RM1–3), walking Taman Pelangi, and crossing to Singapore. Complete price comparison.", url: "/blog/getting-around-johor-bahru-no-car-guide", category: "Blog", tags: ["johor-bahru","transport","backpacker","budget-travel","grab","bus","getting-around"] },
    { title: "Laksa Johor Guide — Authentic Dish, Where to Eat, and What Makes It Unique (2026)", excerpt: "Deep-dive guide on Laksa Johor—a creamy coconut-based noodle dish unique to Johor. Covers history, what makes it different from other laksa variants, and the best stalls in JB.", url: "/blog/laksa-johor-guide-best-places-to-eat", category: "Blog", tags: ["food","johor","specialty-dish","jb-guide"] },
    { title: "Mee Rebus Johor — History, Best Stalls, and the Famous Haji Wahid Legacy (2026)", excerpt: "Explore Mee Rebus Johor, a thick sweet-savory gravy noodle with roots dating back to 1918. Discover what makes it unique compared to KL style, and where to find the legendary Haji Wahid stalls.", url: "/blog/mee-rebus-johor-bahru-guide", category: "Blog", tags: ["food","johor","specialty-dish","heritage-food"] },
    { title: "Best Roti Canai in Johor Bahru — Breakfast Guide Near Taman Pelangi (2026)", excerpt: "5 top mamak stalls for roti canai within walking distance of Taman Pelangi. Price comparisons, opening hours, and a quick explainer on roti canai vs prata for Singaporean visitors.", url: "/blog/best-roti-canai-johor-bahru-breakfast-guide", category: "Blog", tags: ["food","breakfast","roti-canai","taman-pelangi","budget-food"] },
    { title: "Taman Pelangi Neighborhood Guide: Food, Shops & Things to Do (2026)", excerpt: "The ultimate guide to Taman Pelangi, Johor Bahru. Discover the best food, shopping, and hidden gems within walking distance of Pelangi Capsule Hostel.", url: "/blog/taman-pelangi-johor-bahru-neighborhood-guide", category: "Blog", tags: ["taman-pelangi","jb-neighborhood","local-guide","johor-bahru"] },
    { title: "Johor Premium Outlets vs Singapore Outlet Malls: Where to Save More (2026)", excerpt: "Comparing JPO, IMM, and Changi City Point for Singaporeans planning a shopping trip. Brands, discounts, transport costs, and the honest answer to: is JPO worth the trip?", url: "/blog/johor-premium-outlets-vs-singapore-malls-shopping-guide", category: "Blog", tags: ["shopping","jpo","johor-premium-outlets","singapore-shoppers"] },
    { title: "15 Cheap Eats in Johor Bahru Under RM10 - Budget Food Guide (2026)", excerpt: "Complete list of the best budget-friendly dishes in Johor Bahru, from hawker stalls to kopitiam classics — all under RM10. Perfect for backpackers.", url: "/blog/cheap-eats-johor-bahru-under-rm10-budget-guide", category: "Blog", tags: ["budget-food","cheap-eats","johor-bahru","hawker-food"] },
    { title: "Changi Airport Transit? Stay in Johor Bahru and Save Hundreds (2026)", excerpt: "Skip overpriced Changi airport hotels and stay in Johor Bahru for RM35-45/night instead. Here’s exactly how to get there, what it costs, and why budget travellers are making the switch.", url: "/blog/changi-airport-transit-budget-stay-johor-bahru", category: "Blog", tags: ["changi-airport","singapore","johor-bahru","transit","budget-travel","airport-hotel-alternative","malaysia"] },
    { title: "Use JB as Your Budget Base for Singapore Day Trips (2026 Guide)", excerpt: "Stay in Johor Bahru for RM35-45/night and day-trip into Singapore — save up to 70% on accommodation and food while seeing everything the city-state has to offer.", url: "/blog/jb-budget-base-singapore-day-trips-save-money", category: "Blog", tags: ["johor-bahru","singapore","day-trip","budget-travel","backpacker","malaysia","accommodation"] },
    { title: "樟宜机场中转？住新山胶囊旅馆省几百新币（2026攻略）", excerpt: "新加坡樟宜机场中转住宿太贵？从机场到新山只要1.5小时，胶囊旅馆每晗仅RM35起（约SGD10），帮你省下几百新币。本文详解交通方式、费用对比和中国游客实用信息。", url: "/blog/zhangyi-jichang-zhongzhuan-xinshan-shengqian-zhinan", category: "Blog", tags: ["樟宜机场","新加坡","新山","中转","省錢","胶囊旅馆","马来西亚"] },
    { title: "住新山玩新加坡：一日游省錢攻略（2026最新）", excerpt: "新山住宿只要RM35起，吃饯RM5一顿，每天过关去新加坡玩，5天能省下上千块——这篇攻略教你怎么操作。", url: "/blog/xinshan-zhu-xingjiapo-wan-yiri-you-shengqian-gonglue", category: "Blog", tags: ["新山","新加坡","一日游","省錢","背包旅行","马来西亚","住宿"] },
    { title: "KTM ETS Train: Kuala Lumpur to Johor Bahru for Tourists (2026)", excerpt: "The KTM ETS train is one of the most comfortable and affordable ways to travel between Kuala Lumpur and Johor Bahru. Here’s everything you need to know about classes, booking, fares, and arriving in JB.", url: "/blog/ktm-ets-train-kuala-lumpur-johor-bahru-tourists", category: "Blog", tags: ["ktm-ets","train","kuala-lumpur","johor-bahru","travel-tips","tourist","ktmb"] },
    { title: "Arriving in JB by Train: JB Sentral to Taman Pelangi", excerpt: "Just stepped off the KTM ETS at JB Sentral and not sure what to do next? Here is exactly how to get from the train station to Taman Pelangi and Pelangi Capsule Hostel in about 10 minutes.", url: "/blog/arriving-jb-by-train-jb-sentral-to-taman-pelangi", category: "Blog", tags: ["jb-sentral","train","taman-pelangi","arrival","travel-tips","tourist","getting-here"] },
    { title: "坐火车游新山：KTM ETS 完全攻略", excerpt: "从吉隆坡坐 KTM ETS 火车去新山，经济实惠又舒适。本文详解车票预订、车程票价、抖达 JB Sentral 后如何前往 Taman Pelangi 彩虹胶囊旅馆，助你轻松出行。", url: "/blog/ktm-ets-train-johor-bahru-chinese-guide", category: "Blog", tags: ["ktm-ets","火车","新山","交通攻略","旅游"] },
    // ── Guide Sections (7) ──────────────────────────────────────────────
    { title: "Getting Around JB", excerpt: "Grab fares, metered taxis, Rapid JB buses — transport options and typical prices for getting around Johor Bahru.", url: "/guide#getting-around", category: "Guide", tags: ["transport","grab","taxi","bus","johor-bahru"] },
    { title: "Money & Currency", excerpt: "MYR exchange rates, best money changers on Jalan Wong Ah Fook, ATMs near Taman Pelangi, and quick SGD/MYR reference rates.", url: "/guide#money", category: "Guide", tags: ["money","currency","exchange","atm","sgd","myr"] },
    { title: "Singapore Day Trip", excerpt: "Cross the Causeway or Second Link from JB to Singapore — bus routes, Grab fares, immigration tips, and peak hours to avoid.", url: "/guide#day-trip", category: "Guide", tags: ["singapore","causeway","day-trip","immigration","border"] },
    { title: "Top Hawker Centres Near Us", excerpt: "JB’s best street food — Jalan Yahya Awal, Restoran Pelangi, Pasar Malam night market, and Jalan Sutera Food Court.", url: "/guide#hawkers", category: "Guide", tags: ["hawker","street-food","food","night-market"] },
    { title: "Restaurants & Shopping Near Us", excerpt: "Sik Bao Sin, San Low Seafood, Pelangi Leisure Mall, Mid Valley Southkey, and more places near Pelangi Capsule Hostel.", url: "/guide#food-shopping", category: "Guide", tags: ["restaurant","shopping","mall","food"] },
    { title: "Safety Tips for Backpackers", excerpt: "Street safety, transport safety, valuables storage, health emergencies, and useful phone numbers in JB.", url: "/guide#safety", category: "Guide", tags: ["safety","emergency","health","tips"] },
    { title: "Useful Local Apps", excerpt: "Download Grab, MyRapid, Google Maps offline, XE Currency, and MySejahtera before arriving in Johor Bahru.", url: "/guide#apps", category: "Guide", tags: ["apps","grab","google-maps","xe-currency"] },
    // ── Getting Here Sections (5) ───────────────────────────────────────
    { title: "Border Crossing from Singapore", excerpt: "Causeway and Second Link crossings from Singapore to Johor Bahru — buses CW1/CW2, Grab fares, peak hours, and immigration tips.", url: "/getting-here#border-crossing", category: "Getting Here", tags: ["singapore","causeway","border","ciq","immigration","bus"] },
    { title: "JB–Singapore RTS Link", excerpt: "The upcoming Rapid Transit System Link connecting Bukit Chagar JB to Woodlands North MRT in ~5 minutes. Expected end 2026.", url: "/getting-here#rts-link", category: "Getting Here", tags: ["rts-link","train","bukit-chagar","woodlands","mrt"] },
    { title: "MyNIISe QR Immigration", excerpt: "Step-by-step guide to setting up Malaysia’s MyNIISe QR code for faster border clearance at JB CIQ checkpoints.", url: "/getting-here#myniise-qr", category: "Getting Here", tags: ["myniise","qr","immigration","digital","border"] },
    { title: "Transport to Pelangi Hostel", excerpt: "How to get from CIQ, JB Sentral, RTS Link Bukit Chagar, Larkin Terminal, and Senai Airport to Pelangi Capsule Hostel.", url: "/getting-here#transport-options", category: "Getting Here", tags: ["transport","grab","bus","taxi","airport","directions"] },
    { title: "DuitNow–PayNow Cross-Border Payments", excerpt: "Pay in Malaysia using your Singapore bank app via DuitNow–PayNow QR interoperability — no cash exchange needed.", url: "/getting-here#duitnow-paynow", category: "Getting Here", tags: ["duitnow","paynow","payment","qr","singapore","cross-border"] }
  ];

  /* ═══════════════════════════════════════════════════════════════════════
     COOKIE CONSENT
     Cookie name: pelangi_cookie_consent
     Values:      "accepted" | "rejected"
     Max-age:     365 days  (31 536 000 s)
     Consent Mode v2 params on accept:
       ad_storage, ad_user_data, analytics_storage, ad_personalization,
       functionality_storage → "granted"
       security_storage      → "granted"  (always)
     On reject: all denied except security_storage stays "granted"
     ═══════════════════════════════════════════════════════════════════════ */
  var COOKIE_NAME    = "pelangi_cookie_consent";
  var COOKIE_MAX_AGE = 31536000; // 365 * 24 * 60 * 60

  function readCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setConsentCookie(value) {
    document.cookie = COOKIE_NAME + "=" + value +
      "; path=/; max-age=" + COOKIE_MAX_AGE + "; SameSite=Lax";
  }

  function updateConsentMode(granted) {
    if (typeof window.gtag !== "function") return;
    window.gtag("consent", "update", {
      ad_storage:            granted ? "granted" : "denied",
      ad_user_data:          granted ? "granted" : "denied",
      analytics_storage:     granted ? "granted" : "denied",
      ad_personalization:    granted ? "granted" : "denied",
      functionality_storage: granted ? "granted" : "denied",
      security_storage:      "granted"
    });
  }

  function dispatchConsentEvent(value) {
    updateConsentMode(value === "accepted");
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: { consent: value } }));
  }

  function detectLang() {
    var m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    return (m && m[1] === "zh") ? "zh" : "en";
  }

  function initBanner() {
    var existing = readCookie(COOKIE_NAME);
    if (existing === "accepted" || existing === "rejected") {
      // Re-apply consent on every page load so GTM fires correctly
      updateConsentMode(existing === "accepted");
      return;
    }

    var banner = document.getElementById("cookie-banner");
    if (!banner) return;

    var t = COPY[detectLang()];

    // Populate bilingual text
    document.getElementById("cc-body-text").textContent =
      t.description + " " + t.newsletter + " " + t.dpoContact + " ";
    document.getElementById("cc-privacy-link").textContent  = t.privacyLink;
    document.getElementById("cc-manage").textContent        = t.manage;
    document.getElementById("cc-reject").textContent        = t.rejectAll;
    document.getElementById("cc-accept").textContent        = t.acceptAll;
    document.getElementById("cc-essential-label").textContent = t.essentialLabel;
    document.getElementById("cc-essential-desc").textContent  = t.essentialDesc;
    document.getElementById("cc-analytics-label").textContent = t.analyticsLabel;
    document.getElementById("cc-analytics-desc").textContent  = t.analyticsDesc;
    document.getElementById("cc-always-on").textContent     = t.alwaysOn;
    document.getElementById("cc-save-prefs").textContent    = t.savePrefs;

    banner.classList.remove("hidden");

    var analyticsChecked = false; // NOT pre-ticked
    var prefsPanel  = document.getElementById("cc-prefs-panel");
    var actionBtns  = document.getElementById("cc-action-btns");
    var toggle      = document.getElementById("cc-analytics-toggle");
    var knob        = document.getElementById("cc-toggle-knob");

    function accept() {
      setConsentCookie("accepted");
      dispatchConsentEvent("accepted");
      banner.classList.add("hidden");
    }
    function reject() {
      setConsentCookie("rejected");
      dispatchConsentEvent("rejected");
      banner.classList.add("hidden");
    }

    toggle.addEventListener("click", function () {
      analyticsChecked = !analyticsChecked;
      toggle.setAttribute("aria-checked", String(analyticsChecked));
      if (analyticsChecked) {
        toggle.classList.remove("bg-stone-500", "dark:bg-stone-600");
        toggle.classList.add("bg-amber-700");
        knob.classList.remove("translate-x-1");
        knob.classList.add("translate-x-6");
      } else {
        toggle.classList.remove("bg-amber-700");
        toggle.classList.add("bg-stone-500", "dark:bg-stone-600");
        knob.classList.remove("translate-x-6");
        knob.classList.add("translate-x-1");
      }
    });

    document.getElementById("cc-manage").addEventListener("click", function () {
      prefsPanel.classList.remove("hidden");
      actionBtns.classList.add("hidden");
    });
    document.getElementById("cc-reject").addEventListener("click", reject);
    document.getElementById("cc-accept").addEventListener("click", accept);
    document.getElementById("cc-save-prefs").addEventListener("click", function () {
      analyticsChecked ? accept() : reject();
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     SEARCH — weighted substring scorer (replaces Fuse.js)
     Weights: title ×3 · tags ×2 · excerpt ×1 · url ×0.5
     Threshold: any score > 0 (equivalent to threshold 0.4 in Fuse)
     Limit: 8 results
     ═══════════════════════════════════════════════════════════════════════ */
  function norm(s) { return (s || "").toLowerCase(); }

  function scoreItem(item, terms) {
    var s = 0;
    var title   = norm(item.title);
    var excerpt = norm(item.excerpt);
    var tags    = norm(item.tags.join(" "));
    var url     = norm(item.url);
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      if (title.indexOf(t)   !== -1) s += 3;
      if (tags.indexOf(t)    !== -1) s += 2;
      if (excerpt.indexOf(t) !== -1) s += 1;
      if (url.indexOf(t)     !== -1) s += 0.5;
    }
    return s;
  }

  function doSearch(q, limit) {
    var terms = norm(q).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var scored = [];
    for (var i = 0; i < SEARCH_INDEX.length; i++) {
      var s = scoreItem(SEARCH_INDEX[i], terms);
      if (s > 0) scored.push({ item: SEARCH_INDEX[i], s: s });
    }
    scored.sort(function (a, b) { return b.s - a.s; });
    return scored.slice(0, limit || 8).map(function (x) { return x.item; });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     SEARCH DIALOG UI
     ═══════════════════════════════════════════════════════════════════════ */
  var sd = {
    overlay:     null,
    input:       null,
    list:        null,
    noResults:   null,
    noResultsQ:  null,
    footer:      null,
    activeIdx:   0,
    results:     []
  };

  function escHtml(s) {
    return (s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function openSearch() {
    if (!sd.overlay) return;
    sd.overlay.classList.remove("hidden");
    sd.activeIdx = 0;
    sd.results   = [];
    if (sd.input) {
      sd.input.value = "";
      sd.list.innerHTML = "";
      sd.list.classList.add("hidden");
      sd.noResults.classList.add("hidden");
      sd.footer.classList.add("hidden");
      sd.input.removeAttribute("aria-activedescendant");
      requestAnimationFrame(function () { sd.input.focus(); });
    }
  }

  function closeSearch() {
    if (!sd.overlay) return;
    sd.overlay.classList.add("hidden");
  }

  function setActive(idx) {
    var items = sd.list.children;
    // De-activate old
    if (items[sd.activeIdx]) {
      items[sd.activeIdx].setAttribute("aria-selected", "false");
      items[sd.activeIdx].className =
        "px-4 py-3 cursor-pointer transition-colors hover:bg-stone-50 dark:hover:bg-stone-700";
    }
    sd.activeIdx = idx;
    if (items[idx]) {
      items[idx].setAttribute("aria-selected", "true");
      items[idx].className =
        "px-4 py-3 cursor-pointer transition-colors bg-amber-50 dark:bg-amber-900/20";
      items[idx].scrollIntoView({ block: "nearest" });
    }
    if (sd.results.length && sd.input)
      sd.input.setAttribute("aria-activedescendant", "search-result-" + idx);
  }

  function renderResults(results, q) {
    sd.results    = results;
    sd.list.innerHTML = "";

    if (q.trim() && results.length === 0) {
      sd.noResultsQ.textContent = q;
      sd.noResults.classList.remove("hidden");
      sd.list.classList.add("hidden");
      sd.footer.classList.add("hidden");
      return;
    }

    sd.noResults.classList.add("hidden");
    if (!results.length) {
      sd.list.classList.add("hidden");
      sd.footer.classList.add("hidden");
      return;
    }

    sd.list.classList.remove("hidden");
    sd.footer.classList.remove("hidden");

    for (var i = 0; i < results.length; i++) {
      (function (item, idx) {
        var li = document.createElement("li");
        li.id = "search-result-" + idx;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === 0 ? "true" : "false");
        li.className = "px-4 py-3 cursor-pointer transition-colors " +
          (idx === 0
            ? "bg-amber-50 dark:bg-amber-900/20"
            : "hover:bg-stone-50 dark:hover:bg-stone-700");

        var catCls = item.category === "Blog"
          ? "bg-amber-100 text-amber-800"
          : "bg-blue-100 text-blue-800";

        li.innerHTML =
          '<div class="flex items-center gap-2 mb-1">' +
            '<span class="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ' + catCls + '">' +
              escHtml(item.category) +
            '</span>' +
            '<span class="text-sm font-medium text-stone-900 dark:text-stone-100 line-clamp-1">' +
              escHtml(item.title) +
            '</span>' +
          '</div>' +
          '<p class="text-xs text-stone-500 line-clamp-1 pl-[1.875rem]">' +
            escHtml(item.excerpt) +
          '</p>';

        li.addEventListener("click", function () {
          closeSearch();
          window.location.href = item.url;
        });
        li.addEventListener("mouseenter", function () { setActive(idx); });
        sd.list.appendChild(li);
      })(results[i], i);
    }

    if (sd.input) sd.input.setAttribute("aria-activedescendant", "search-result-0");
    sd.activeIdx = 0;
  }

  function initSearch() {
    sd.overlay   = document.getElementById("search-overlay");
    sd.input     = document.getElementById("search-input");
    sd.list      = document.getElementById("search-results");
    sd.noResults = document.getElementById("search-no-results");
    sd.noResultsQ= document.getElementById("search-no-results-query");
    sd.footer    = document.getElementById("search-footer");
    if (!sd.overlay || !sd.input) return;

    // Live search on input
    sd.input.addEventListener("input", function () {
      var q = sd.input.value;
      renderResults(q.trim() ? doSearch(q) : [], q);
    });

    // Keyboard navigation on the dialog wrapper (bubbles from input)
    document.getElementById("search-dialog").addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (sd.results.length) setActive(Math.min(sd.activeIdx + 1, sd.results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (sd.results.length) setActive(Math.max(sd.activeIdx - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (sd.results[sd.activeIdx]) {
            closeSearch();
            window.location.href = sd.results[sd.activeIdx].url;
          }
          break;
        case "Escape":
          e.preventDefault();
          closeSearch();
          break;
      }
    });

    // Backdrop click closes
    document.getElementById("search-backdrop").addEventListener("click", closeSearch);

    // Tab focus trap inside overlay
    sd.overlay.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = sd.overlay.querySelectorAll(
        "input, button, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     WIRE [data-search-open] BUTTONS
     Clone-replace each button to strip app.js's redirect-to-sitemap
     listeners, then attach openSearch.
     ═══════════════════════════════════════════════════════════════════════ */
  function wireButtons() {
    document.querySelectorAll("[data-search-open]").forEach(function (btn) {
      var clone = btn.cloneNode(true);
      if (btn.parentNode) btn.parentNode.replaceChild(clone, btn);
      clone.addEventListener("click", openSearch);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     Ctrl+K / Cmd+K — capture phase intercepts before app.js bubble handler.
     Escape also closes the search dialog globally.
     ═══════════════════════════════════════════════════════════════════════ */
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      e.stopPropagation(); // prevents app.js bubble-phase handler
      openSearch();
    } else if (e.key === "Escape" && sd.overlay && !sd.overlay.classList.contains("hidden")) {
      closeSearch();
    }
  }, true /* capture phase */);

  /* ═══════════════════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════════════════ */
  function boot() {
    initBanner();
    initSearch();
    wireButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
