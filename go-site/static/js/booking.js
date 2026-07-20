// booking.js — conversion helpers: hero date-picker defaults, live
// availability ("Only X pods left tonight") from /api/public/availability,
// and the desktop sticky booking bar reveal.
// No frameworks, no imports. Self-contained IIFE (matches widgets_a.js style).
(function () {
  "use strict";

  // Local-date ISO (yyyy-mm-dd) — avoids UTC off-by-one for MYT visitors.
  function localISO(d) {
    var z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().slice(0, 10);
  }

  var today = new Date();
  var tomorrow = new Date(Date.now() + 864e5);
  var todayStr = localISO(today);
  var tomorrowStr = localISO(tomorrow);

  // ─── Hero date-picker: sensible defaults + min constraints ─────────
  var ci = document.getElementById("hero-checkin");
  var co = document.getElementById("hero-checkout");
  if (ci) {
    ci.min = todayStr;
    if (!ci.value) ci.value = todayStr;
  }
  if (co) {
    co.min = tomorrowStr;
    if (!co.value) co.value = tomorrowStr;
  }
  if (ci && co) {
    ci.addEventListener("change", function () {
      if (!ci.value) return;
      var next = new Date(ci.value);
      next.setDate(next.getDate() + 1);
      var nextStr = localISO(next);
      co.min = nextStr;
      if (!co.value || co.value <= ci.value) co.value = nextStr;
    });
  }

  // ─── Live availability: fill every [data-live-availability] slot ───
  var slots = document.querySelectorAll("[data-live-availability]");
  if (slots.length) {
    fetch("/api/public/availability?checkIn=" + todayStr + "&checkOut=" + tomorrowStr)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) return;
        var d = j.data || j;
        var n = d.availableCount;
        if (typeof n !== "number") return;
        var text;
        if (n <= 0) {
          text = "Fully booked tonight — check other dates";
        } else if (n <= 8) {
          text = "Only " + n + " pod" + (n === 1 ? "" : "s") + " left tonight — at RM35";
        } else {
          text = n + " pods available tonight — at RM35";
        }
        for (var i = 0; i < slots.length; i++) {
          slots[i].textContent = text;
          slots[i].classList.remove("hidden");
        }
        // Real scarcity beats the synthetic social-proof line.
        var proof = document.getElementById("hero-social-proof");
        if (proof && n > 0 && n <= 8) proof.classList.add("hidden");
      })
      .catch(function () { /* availability is progressive enhancement only */ });
  }

  // ─── Desktop sticky booking bar: reveal after scrolling past hero ──
  var bar = document.getElementById("desktop-booking-bar");
  if (bar) {
    var shown = false;
    function onScroll() {
      var should = window.scrollY > 600;
      if (should === shown) return;
      shown = should;
      bar.classList.toggle("translate-y-full", !should);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
