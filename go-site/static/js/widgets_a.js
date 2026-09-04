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
        "Check-in is from 2:00 PM onwards, and check-out is before 12:00 PM (noon). We offer self-check-in so you can arrive anytime after 2 PM. Early check-in or late check-out may be available on request — message us on WhatsApp at +60 12-708 8789.",
      keywords: ["check-in","check-out","checkout","checkin","time","arrive","arrival","early","late"],
      chipLabel: "Check-in times",
    },
    {
      question: "How much does a capsule pod cost?",
      answer:
        "Capsule pods are RM35 per night. First-time guests who book direct on our website at pelangicapsulehostel.com/book pay RM30 for their first night, then RM35/night after — this discount does not apply to walk-ins or other booking channels. A Tourism Tax (TTx) of RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) is added as required by law. Monthly stays are available from RM600/month (Upper Deck) or RM650/month (Lower Deck).",
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
        "Yes, monthly rates start from RM600/month (Upper Deck) or RM650/month (Lower Deck), including all amenities: WiFi, air-conditioning, hot showers, kitchen access, and laundry facilities. We also offer in-house laundry service at RM5/load (guests only, cheaper than outside dobi). Popular with remote workers and digital nomads.",
      keywords: ["monthly","long stay","long-term","month","weekly","extended"],
    },
    {
      question: "How do I book a capsule?",
      answer:
        "Booking is easy and direct bookings get the best rate (no middleman fees). Just pick your dates and pay online at pelangicapsulehostel.com/book — pods are RM35/night, a flat rate every day. Check-in is from 2:00 PM (self check-in, so you can arrive anytime after 2 PM) and check-out is before 12:00 PM. If you'd rather book by message or need help with dates, WhatsApp us at +60 12-708 8789.",
      keywords: ["book","booking","reserve","reservation","reservations","availability","available","stay","nights","night","how do i book","how to book","make a booking","room for"],
      chipLabel: "Book now",
    },
  ];

  // Indices of chips shown on greeting: book, check-in, pricing, location, room
  var QUICK_FAQ_INDICES = [12, 0, 1, 2, 3];

  var GREETING =
    "Hi! Welcome to Pelangi Capsule Hostel 🌈\n\nFor real help, our team is on WhatsApp at +60 12-708 8789 (fastest, always human).\n\nPrefer to try our AI Assistant (Beta)? Just tap a topic below or type your question — it can help with rooms, pricing, check-in, booking and more. It’s still in beta, so double-check anything important with our team.";

  // Appended when the AI is unavailable and we fall back to a canned FAQ answer.
  var AI_FALLBACK_NOTE =
    "\n\n(Our AI Assistant is in beta and couldn’t answer live just now — for anything important please WhatsApp our team at +60 12-708 8789.)";

  var FALLBACK =
    "I’m not sure about that one. Our AI Assistant is in beta — for specific questions please contact our team on WhatsApp at +60 12-708 8789 or visit our contact page.";

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

  // ── Rich-text rendering for assistant replies ────────────────────
  // Rainbow returns WhatsApp-style markup (*bold*, _italic_, __underline__,
  // ~strike~), plain URLs, and image links (e.g. the DuitNow QR .png). The
  // widget renders that as HTML: clickable links, inline images, formatting.
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // WhatsApp-style inline markup on already-escaped text. Underline (__x__)
  // before italic (_x_) so the double form isn't eaten first.
  function formatInline(s) {
    s = s.replace(/__([^_\n]+)__/g, "<u>$1</u>");
    s = s.replace(/\*([^*\n]+)\*/g, "<strong>$1</strong>");
    s = s.replace(/_([^_\n]+)_/g, "<em>$1</em>");
    s = s.replace(/~([^~\n]+)~/g, "<del>$1</del>");
    s = s.replace(/\n/g, "<br>");
    return s;
  }

  var IMG_EXT_RE = /\.(?:png|jpe?g|gif|webp)(?:[?#]|$)/i;

  function renderRichContent(raw) {
    var urlRe = /(https?:\/\/[^\s<>]+)/g;
    var out = "", last = 0, m;
    while ((m = urlRe.exec(raw))) {
      out += formatInline(escapeHtml(raw.slice(last, m.index)));
      var url = m[1];
      var attr = url.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      if (IMG_EXT_RE.test(url)) {
        out +=
          '<a href="' + attr + '" target="_blank" rel="noopener noreferrer">' +
          '<img src="' + attr + '" alt="image" loading="lazy" ' +
          'style="max-width:100%;border-radius:10px;margin:6px 0;display:block;" /></a>';
      } else {
        out +=
          '<a href="' + attr + '" target="_blank" rel="noopener noreferrer" ' +
          'style="color:#1d4ed8;text-decoration:underline;word-break:break-all;">' +
          escapeHtml(url) + "</a>";
      }
      last = m.index + url.length;
    }
    out += formatInline(escapeHtml(raw.slice(last)));
    return out;
  }

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
    // User text stays literal (textContent); assistant replies render markup,
    // clickable links, and inline images.
    if (msg.role === "user") {
      bubble.textContent = msg.content;
    } else {
      bubble.innerHTML = renderRichContent(msg.content);
    }

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

  // ── Append a user question, then answer via the AI Assistant (Beta) ──
  // Human WhatsApp support stays the primary path (see greeting); the AI is an
  // optional beta helper. We POST to /api/ai-chat (server proxies to Rainbow);
  // if it fails or times out we fall back to the local FAQ match + a note to
  // reach the human team.
  // Per-visitor chat session id so Rainbow keeps one conversation per guest
  // (without it, all website guests share a single "web:webchat" session).
  var CHAT_SID_KEY = "pelangi_chat_sid";
  function chatSessionId() {
    try {
      var sid = localStorage.getItem(CHAT_SID_KEY);
      if (!sid) {
        sid = "web_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now();
        localStorage.setItem(CHAT_SID_KEY, sid);
      }
      return sid;
    } catch (e) {
      return "web_anon";
    }
  }

  function handleQuestion(text, imageDataUrl) {
    var now = Date.now();
    chatMessages = chatMessages.concat([
      { role: "user",      content: text, timestamp: now },
      { role: "assistant", content: "…",  timestamp: now + 1, pending: true },
    ]);
    showChips = false;
    renderMessages();

    var idx = chatMessages.length - 1;
    var done = false;
    function settle(content) {
      if (done) return;
      done = true;
      if (chatMessages[idx]) {
        chatMessages[idx].content = content;
        chatMessages[idx].pending = false;
      }
      saveChatHistory(chatMessages);
      renderMessages();
    }

    // Image turns (receipt OCR) run vision + PMS checks server-side — allow longer.
    var timer = setTimeout(function () { settle(matchFaq(text) + AI_FALLBACK_NOTE); }, imageDataUrl ? 70000 : 22000);

    var payload = { message: text, sessionId: chatSessionId() };
    if (imageDataUrl) payload.image = imageDataUrl;
    try {
      fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          clearTimeout(timer);
          if (d && d.ok && d.reply) settle(d.reply);
          else settle(matchFaq(text) + AI_FALLBACK_NOTE);
        })
        .catch(function () { clearTimeout(timer); settle(matchFaq(text) + AI_FALLBACK_NOTE); });
    } catch (e) {
      clearTimeout(timer);
      settle(matchFaq(text) + AI_FALLBACK_NOTE);
    }
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

  // ── Receipt image upload (payment-receipt OCR) ────────────────────
  // Minimal attach flow: paperclip button + hidden file input. jpeg/png ≤5MB,
  // sent as a base64 data URL to /api/ai-chat {message, image}.
  if (sendBtn && sendBtn.parentNode) {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png";
    fileInput.style.display = "none";
    fileInput.setAttribute("aria-hidden", "true");

    var attachBtn = document.createElement("button");
    attachBtn.type = "button";
    attachBtn.id = "chat-attach-btn";
    attachBtn.setAttribute("aria-label", "Send payment receipt image");
    attachBtn.title = "Send payment receipt (JPG/PNG, max 5MB)";
    attachBtn.textContent = "📎";
    attachBtn.className =
      "shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 hover:border-amber-400 transition-colors";

    sendBtn.parentNode.insertBefore(attachBtn, sendBtn);
    sendBtn.parentNode.insertBefore(fileInput, sendBtn);

    function chatNote(text) {
      chatMessages = chatMessages.concat([{ role: "assistant", content: text, timestamp: Date.now() }]);
      saveChatHistory(chatMessages);
      renderMessages();
    }

    attachBtn.addEventListener("click", function () { fileInput.click(); });
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      fileInput.value = "";
      if (!f) return;
      if (f.type !== "image/jpeg" && f.type !== "image/png") {
        chatNote("Sorry, please upload the receipt as a JPG or PNG image.");
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        chatNote("Sorry, that image is over 5MB. Please send a smaller screenshot.");
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        handleQuestion("📎 Payment receipt", String(reader.result));
      };
      reader.onerror = function () {
        chatNote("Sorry, I couldn't read that file. Please try again.");
      };
      reader.readAsDataURL(f);
    });
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
