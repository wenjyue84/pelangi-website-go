// motion.js: scroll reveal + festival ambience. No libraries; content stays visible without JS.
(function () {
  "use strict";
  var d = document, h = d.documentElement;
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vh = innerHeight;

  // ---- scroll reveal: only nodes still below the fold are hidden, so nothing flashes ----
  var sel = "main section:not(.min-h-screen) h2, main section:not(.min-h-screen) .grid > *, main article";
  var list = d.querySelectorAll(sel), els = [], i;
  for (i = 0; i < list.length && els.length < 90; i++) {
    var e = list[i];
    if (e.closest("[data-no-reveal],.hidden,[hidden]") || e.getBoundingClientRect().top < vh * 0.92) continue;
    els.push(e);
  }
  if (els.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        var t = x.target;
        io.unobserve(t);
        t.classList.add("m-in");
        setTimeout(function () { t.classList.remove("m-pre", "m-in"); t.style.removeProperty("--mi"); }, 1200);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (t) {
      var p = t.parentNode, n = 0, s = t;
      while ((s = s.previousElementSibling) && n < 5) n++;
      t.style.setProperty("--mi", p && p.classList.contains("grid") ? n : 0);
      t.classList.add("m-pre");
      io.observe(t);
    });
  }

  // ---- festival ambience: floating motif particles, capped, paused when tab hidden ----
  var fx;
  function build() {
    if (fx) { fx.remove(); fx = null; }
    var u = d.querySelector(".fd-sv use");
    if (rm || !h.hasAttribute("data-festival") || !u) return;
    var m = (u.getAttribute("href") || "").replace("#fd-m-", "");
    var n = innerWidth < 768 ? 6 : 10, k, html = "";
    for (k = 0; k < n; k++) {
      var s = 18 + ((k * 7) % 5) * 5, t = 16 + ((k * 5) % 7) * 2;
      html += '<i style="--x:' + (6 + ((k * 37) % 88)) + "%;--s:" + s + "px;--t:" + t + "s;--d:-" + ((k * 3.1) % t).toFixed(1) + 's"><svg viewBox="0 0 48 64" aria-hidden="true"><use href="#fd-m-' + m + '"/></svg></i>';
    }
    fx = d.createElement("div");
    fx.className = "m-fx";
    fx.setAttribute("aria-hidden", "true");
    fx.setAttribute("data-dir", /^(sparkle|tie|gear|crescent)$/.test(m) ? "down" : "up");
    fx.innerHTML = html;
    d.body.appendChild(fx);
    pause();
  }
  function pause() { if (fx) fx.classList.toggle("m-paused", d.hidden); }
  d.addEventListener("visibilitychange", pause);
  build();
  if ("MutationObserver" in window) new MutationObserver(function () { setTimeout(build, 0); }).observe(h, { attributes: true, attributeFilter: ["data-festival"] });
})();
