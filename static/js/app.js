// app.js — minimal vanilla-JS replacement for the React client components that
// only provided small interactive behaviors. No framework runtime.
(function () {
  "use strict";

  // --- Mobile nav toggle (ports Header.tsx isMenuOpen) ---
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("opacity-100", open);
    menu.classList.toggle("translate-y-0", open);
    menu.classList.toggle("opacity-0", !open);
    menu.classList.toggle("-translate-y-4", !open);
    menu.classList.toggle("pointer-events-none", !open);
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
  }

  // --- nav_click dataLayer push (ports Header.tsx pushNavEvent) ---
  document.querySelectorAll("[data-nav-href]").forEach(function (a) {
    a.addEventListener("click", function () {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "nav_click", nav_href: a.getAttribute("data-nav-href") });
    });
  });

  // Search (Ctrl/Cmd+K + [data-search-open] buttons) is owned by widgets_b.js.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // --- PWA service worker registration (ports Serwist sw.ts) ---
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").catch(function () {});
    });
  }
})();
