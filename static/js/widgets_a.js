// widgets_a.js — vanilla-JS port of ChatWidget, MobileBookingBar,
// BookingRecoveryBanner, ExitIntentOverlay.
// No frameworks, no imports. Self-contained IIFE.
(function () {
  "use strict";

  // ─── FAQ data (ported 1:1 from ChatWidget.tsx FAQ_DATA) ───────────
  var FAQ_DATA = [
    {
      question: "What time is check-in and check-out?",
      answer:
        "Check-in is from 3:00 PM onwards, and check-out is before 12:00 PM (noon). We offer self-check-in so you can arrive anytime after 3 PM. Early check-in or late check-out may be available on request — message us on WhatsApp at +60 12-708 8789.",
      keywords: ["check-in","check-out","checkout","checkin","time","arrive","arrival","early","late"],
      chipLabel: "Check-in times",
    },
    {
      question: "How much does a capsule pod cost?",
      answer:
        "Capsule pods start from RM30 per night on weekdays and RM35 on weekends. A Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is added as required by law. Monthly stays are available from RM594/month. Book directly on our website at pelangicapsulehostel.com/book for the best rate.",
      keywords: ["price","pricing","cost","rate","rm","cheap","afford","how much","per night","monthly","budget"],
      chipLabel: "Pricing & rates",
    },
    {
      question: "Where is Pelangi Capsule Hostel located?",
      answer:
        "We are at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia. Taman Pelangi is a central neighbourhood known for restaurants, cafes, and the famous Tuesday night market. A short Grab ride from JB Sentral, CIQ, and Senai Airport.",
      keywords: ["location","located","where","address","direction","map","area","taman pelangi","jalan"],
      chipLabel: "Location",
    },
    {
      question: "What is a capsule pod like?",
      answer:
        "Each capsule pod has a sliding door that locks for privacy, a premium mattress, personal fan and air-conditioning, adjustable LED lighting, USB charging ports, and a power outlet. Unlike open dorm beds, you get your own enclosed private space — more privacy than a traditional hostel at a similar budget price.",
      keywords: ["capsule","pod","dorm","dormitory","room","bed","type","private","shared","what is"],
      chipLabel: "Room types",
    },
    {
      question: "Is there free WiFi?",
      answer:
        "Yes! We provide complimentary high-speed WiFi throughout the entire property, including inside the pod areas and common lounge. The connection is reliable enough for video calls and remote work.",
      keywords: ["wifi","wi-fi","internet","connection","online"],
    },
    {
      question: "What is the WiFi password?",
      answer:
        "The WiFi network name is \"pelangi capsule\" and the password is \"ilovestaycapsule\". You can connect from anywhere on the property including your capsule pod and the common areas.",
      keywords: ["wifi","wi-fi","password","network","ssid","connect"],
    },
    {
      question: "How do I get here from Singapore?",
      answer:
        "We are only 15 minutes by car from the Woodlands CIQ checkpoint. Take a Grab or taxi from JB CIQ to Taman Pelangi for around RM8–12. Alternatively, take bus CW1 from Woodlands to JB Sentral, then a short Grab ride to us.",
      keywords: ["singapore","border","ciq","woodlands","crossing","causeway"],
    },
    {
      question: "Is parking available?",
      answer:
        "Free street parking is available along Jalan Perang in front of the hostel. The area has plenty of open parking spaces, especially in the evenings. For longer stays, there are also nearby paid parking lots.",
      keywords: ["parking","park","car","drive","vehicle"],
      chipLabel: "Parking",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash (Malaysian Ringgit), DuitNow QR (all Malaysian banks and e-wallets including Maybank, CIMB, Touch 'n Go, Boost, GrabPay), and credit cards. DuitNow QR is the most convenient option for domestic travellers.",
      keywords: ["payment","pay","cash","card","credit","duitnow","grab","boost"],
    },
    {
      question: "Do you provide towels and toiletries?",
      answer:
        "Yes, every guest receives a fresh towel. Body wash and shampoo are provided in the shared bathrooms. Toothbrushes and toothpaste are available at the front desk for a small fee.",
      keywords: ["towel","toiletries","shampoo","soap","toothbrush","amenities"],
    },
    {
      question: "Is breakfast included?",
      answer:
        "Breakfast is not included, but we have a fully equipped shared kitchen. Taman Pelangi is surrounded by dozens of affordable local restaurants and kopitiam — a typical Malaysian breakfast costs RM3–8 nearby.",
      keywords: ["breakfast","food","eat","meal","kitchen","cook"],
    },
    {
      question: "Is the hostel safe?",
      answer:
        "Yes! We have 24/7 CCTV surveillance, secure keypad entry, and personal lockers in each pod room. Each capsule has a sliding door that locks from the inside. The hostel operates 24 hours with no curfew.",
      keywords: ["safe","safety","secure","security","lock","cctv","locker"],
    },
    {
      question: "Can I stay monthly?",
      answer:
        "Yes, monthly rates start from RM594/month including all amenities: WiFi, air-conditioning, hot showers, kitchen access, and laundry facilities. We also offer in-house laundry service at RM5/load (guests only, cheaper than outside dobi). Popular with remote workers and digital nomads.",
      keywords: ["monthly","long stay","long-term","month","weekly","extended"],
    },
  ];

  // Indices of chips shown on greeting: check-in, pricing, location, room, Singapore
  var QUICK_FAQ_INDICES = [0, 1, 2, 3, 6];

  var GREETING =
    "Hi! Welcome to Pelangi Capsule Hostel. I can answer common questions about our rooms, pricing, check-in, location, and more. Tap a topic below or type your question!";

  var FALLBACK =
    "I’m not sure about that one. For specific questions, please contact us directly on WhatsApp at +60 12-708 8789 or visit our contact page.";

  // ─── sessionStorage keys ──────────────────────────────────────────
  var CHAT_SESSION_KEY     = "chatwidget_history";
  var DRAFT_KEY            = "pelangi_booking_draft";
  var DRAFT_DISMISSED_KEY  = "pelangi_booking_draft_dismissed";
  var EXIT_SESSION_KEY     = "exit-intent-shown";

  var CHAT_DELAY_MS = 10000; // 10 s before FAB appears

  // ─── FAQ keyword matching (exact port of matchFaq in ChatWidget.tsx) ──
  function matchFaq(input) {
    var lower = input.toLowerCase().trim();
    var bestScore = 0;
    var bestAnswer = "";
    for (var i = 0; i < FAQ_DATA.length; i++) {
      var faq = FAQ_DATA[i];
      var score = 0;
      for (var j = 0; j < faq.keywords.length; j++) {
        if (lower.indexOf(faq.keywords[j]) !== -1) {
          score += faq.keywords[j].length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = faq.answer;
      }
    }
    return bestScore > 0 ? bestAnswer : FALLBACK;
  }

  // ─── sessionStorage helpers ───────────────────────────────────────
  function ssGet(key) {
    try { return sessionStorage.getItem(key); } catch (_) { return null; }
  }
  function ssSet(key, val) {
    try { sessionStorage.setItem(key, val); } catch (_) {}
  }

  function loadChatHistory() {
    try {
      var raw = ssGet(CHAT_SESSION_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_) {}
    return null;
  }

  function saveChatHistory(msgs) {
    ssSet(CHAT_SESSION_KEY, JSON.stringify(msgs.slice(-50)));
  }

  // ─── Chat state ───────────────────────────────────────────────────
  var chatIsOpen = false;
  var chatMessages = [];
  var showChips = true;

  var savedHistory = loadChatHistory();
  if (savedHistory) {
    chatMessages = savedHistory;
    showChips = false;
  } else {
    chatMessages = [{ role: "assistant", content: GREETING, timestamp: Date.now() }];
  }

  // ─── DOM refs ─────────────────────────────────────────────────────
  var fab              = document.getElementById("chat-fab");
  var fabIconOpen      = document.getElementById("chat-fab-icon-open");
  var fabIconClose     = document.getElementById("chat-fab-icon-close");
  var panel            = document.getElementById("chat-panel");
  var msgContainer     = document.getElementById("chat-messages");
  var inputEl          = document.getElementById("chat-input");
  var sendBtn          = document.getElementById("chat-send-btn");
  var closePanelBtn    = document.getElementById("chat-close-btn");
  var mobileBar        = document.getElementById("mobile-booking-bar");
  var mobileBarCta     = document.getElementById("mobile-booking-bar-cta");
  var recoveryBanner   = document.getElementById("booking-recovery-banner");
  var recoveryRoomEl   = document.getElementById("booking-recovery-room");
  var recoveryDatesEl  = document.getElementById("booking-recovery-dates");
  var recoveryDismiss  = document.getElementById("booking-recovery-dismiss");
  var exitOverlay      = document.getElementById("exit-intent-overlay");
  var exitCloseBtn     = document.getElementById("exit-intent-close");
  var exitWaBtn        = document.getElementById("exit-intent-wa-cta");
  var exitBrowseBtn    = document.getElementById("exit-intent-browse-btn");

  // ═══════════════════════════════════════════════════════════════════
  //  CHAT WIDGET
  // ═══════════════════════════════════════════════════════════════════

  // ── Render a single message bubble ───────────────────────────────
  function createBubble(msg) {
    var wrap = document.createElement("div");
    wrap.className = "flex flex-col " + (msg.role === "user" ? "items-end" : "items-start");
    wrap.style.animation = "fadeUp 0.2s ease-out";

    var bubble = document.createElement("div");
    var base = "max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ";
    if (msg.role === "user") {
      bubble.className = base + "text-white rounded-br-[4px]";
      bubble.style.background = "#a68b64";
    } else {
      bubble.className =
        base +
        "bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-bl-[4px] shadow-xs border border-stone-100 dark:border-stone-600";
    }
    bubble.textContent = msg.content;

    var ts = document.createElement("div");
    ts.className = "text-[10px] text-stone-500 mt-1 px-1";
    ts.textContent = new Date(msg.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    wrap.appendChild(bubble);
    wrap.appendChild(ts);
    return wrap;
  }

  // ── Render quick-topic chips ──────────────────────────────────────
  function createChips() {
    var wrap = document.createElement("div");
    wrap.id = "chat-chips";
    wrap.className = "flex flex-wrap gap-1.5 pt-1";
    wrap.style.animation = "fadeUp 0.3s ease-out";

    QUICK_FAQ_INDICES.forEach(function (idx) {
      var faq = FAQ_DATA[idx];
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "text-xs px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors";
      btn.textContent = faq.chipLabel || faq.question;
      btn.addEventListener("click", function () { handleQuestion(faq.question); });
      wrap.appendChild(btn);
    });
    return wrap;
  }

  // ── Full re-render of messages pane ──────────────────────────────
  function renderMessages() {
    if (!msgContainer) return;
    msgContainer.innerHTML = "";
    chatMessages.forEach(function (msg) {
      msgContainer.appendChild(createBubble(msg));
    });
    if (showChips) {
      msgContainer.appendChild(createChips());
    }
    // Scroll to bottom
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // ── Append a user question + bot answer ──────────────────────────
  function handleQuestion(text) {
    var now = Date.now();
    chatMessages = chatMessages.concat([
      { role: "user",      content: text,           timestamp: now },
      { role: "assistant", content: matchFaq(text), timestamp: now + 1 },
    ]);
    showChips = false;
    saveChatHistory(chatMessages);
    renderMessages();
  }

  // ── Open / close panel ────────────────────────────────────────────
  function setChatOpen(open) {
    chatIsOpen = open;

    if (panel) {
      if (open) {
        panel.classList.remove("opacity-0", "scale-95", "pointer-events-none");
        panel.classList.add("opacity-100", "scale-100", "pointer-events-auto");
        panel.setAttribute("aria-hidden", "false");
      } else {
        panel.classList.add("opacity-0", "scale-95", "pointer-events-none");
        panel.classList.remove("opacity-100", "scale-100", "pointer-events-auto");
        panel.setAttribute("aria-hidden", "true");
      }
    }

    if (fab) {
      fab.setAttribute("aria-label", open ? "Close chat" : "Open chat");
      fab.setAttribute("data-chat-open", open ? "true" : "false");
    }
    if (fabIconOpen)  { fabIconOpen.classList.toggle("hidden",  open); }
    if (fabIconClose) { fabIconClose.classList.toggle("hidden", !open); }

    if (open) {
      renderMessages();
      setTimeout(function () { if (inputEl) inputEl.focus(); }, 120);
    }

    // Notify MobileBookingBar (mirrors React CustomEvent dispatch)
    window.dispatchEvent(new CustomEvent("chatwidget-toggle", { detail: open }));
  }

  // ── Send button enabled state ─────────────────────────────────────
  function syncSendBtn() {
    if (!inputEl || !sendBtn) return;
    var canSend = inputEl.value.trim().length > 0;
    sendBtn.disabled = !canSend;
    sendBtn.style.background = canSend ? "#a68b64" : "#d6d3d1";
  }

  function doSend() {
    if (!inputEl) return;
    var text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";
    inputEl.style.height = "auto";
    syncSendBtn();
    handleQuestion(text);
  }

  // ── Wire chat events ──────────────────────────────────────────────
  if (fab) {
    fab.addEventListener("click", function () { setChatOpen(!chatIsOpen); });
  }
  if (closePanelBtn) {
    closePanelBtn.addEventListener("click", function () { setChatOpen(false); });
  }
  if (sendBtn) {
    sendBtn.addEventListener("click", doSend);
  }
  if (inputEl) {
    inputEl.addEventListener("input", function () {
      syncSendBtn();
      // Auto-resize textarea up to 96 px (matches React source)
      inputEl.style.height = "auto";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 96) + "px";
    });
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        doSend();
      }
    });
  }

  // Escape closes chat panel
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && chatIsOpen) setChatOpen(false);
  });

  // Reveal FAB after 10 s delay (mirrors isVisible state in React)
  setTimeout(function () {
    if (!fab) return;
    fab.classList.remove("opacity-0", "pointer-events-none");
    fab.style.animation = "fadeUp 0.4s ease-out";
  }, CHAT_DELAY_MS);

  // ═══════════════════════════════════════════════════════════════════
  //  MOBILE BOOKING BAR
  // ═══════════════════════════════════════════════════════════════════

  // Hide bar while chat panel is open; show when it closes
  window.addEventListener("chatwidget-toggle", function (e) {
    if (!mobileBar) return;
    mobileBar.classList.toggle("hidden", Boolean(e.detail));
  });

  // Allow other code to update the CTA href (mirrors booking-link-update event)
  window.addEventListener("booking-link-update", function (e) {
    if (mobileBarCta && e.detail) {
      mobileBarCta.href = String(e.detail);
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  //  BOOKING RECOVERY BANNER
  // ═══════════════════════════════════════════════════════════════════

  function tryShowRecovery() {
    if (!recoveryBanner) return;
    // Don't show on /book (mirrors pathname === "/book" check in React)
    if (window.location.pathname === "/book") return;
    // Don't show if dismissed this session
    if (ssGet(DRAFT_DISMISSED_KEY) === "true") return;
    // Load draft from sessionStorage
    var draft = null;
    try {
      var raw = ssGet(DRAFT_KEY);
      if (raw) draft = JSON.parse(raw);
    } catch (_) {}
    if (!draft) return;

    // Populate dynamic text
    if (recoveryRoomEl) {
      recoveryRoomEl.textContent = draft.roomType || "Capsule Pod";
    }
    if (recoveryDatesEl) {
      var dates = "";
      if (draft.checkIn) {
        dates = " for " + draft.checkIn;
        if (draft.checkOut) dates += " – " + draft.checkOut;
      }
      recoveryDatesEl.textContent = dates;
    }
    recoveryBanner.classList.remove("hidden");
  }

  // 800 ms delay (matches React useEffect timer)
  setTimeout(tryShowRecovery, 800);

  if (recoveryDismiss) {
    recoveryDismiss.addEventListener("click", function () {
      ssSet(DRAFT_DISMISSED_KEY, "true");
      if (recoveryBanner) recoveryBanner.classList.add("hidden");
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  //  EXIT INTENT OVERLAY
  // ═══════════════════════════════════════════════════════════════════

  function openExitOverlay() {
    if (!exitOverlay) return;
    exitOverlay.classList.remove("hidden");
    exitOverlay.focus();
  }

  function closeExitOverlay() {
    if (!exitOverlay) return;
    exitOverlay.classList.add("hidden");
  }

  // Desktop-only (> 1024 px), once per session — mirrors React useEffect
  if (window.innerWidth > 1024 && !ssGet(EXIT_SESSION_KEY)) {
    function handleMouseLeave(e) {
      if (e.clientY < 5) {
        ssSet(EXIT_SESSION_KEY, "1");
        document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        openExitOverlay();
      }
    }
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
  }

  if (exitCloseBtn)  { exitCloseBtn.addEventListener("click",  closeExitOverlay); }
  if (exitBrowseBtn) { exitBrowseBtn.addEventListener("click", closeExitOverlay); }
  if (exitWaBtn)     { exitWaBtn.addEventListener("click",     closeExitOverlay); }

  // Click backdrop to close (mirrors onClick on the overlay wrapper)
  if (exitOverlay) {
    exitOverlay.addEventListener("click", function (e) {
      if (e.target === exitOverlay) closeExitOverlay();
    });
  }

  // Escape closes exit overlay
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && exitOverlay && !exitOverlay.classList.contains("hidden")) {
      closeExitOverlay();
    }
  });
})();
