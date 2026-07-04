// analytics.js — vanilla port of MetaPixelProvider, TikTokPixelProvider, and
// instrumentation-client.ts (Sentry + web-vitals + Microsoft Clarity).
// Config is injected server-side as window.__PELANGI_CFG. Consent is read from
// the `pelangi_cookie_consent` cookie + the `cookie-consent` event dispatched by
// the cookie banner (widgets_b.js).
(function () {
  "use strict";
  var cfg = window.__PELANGI_CFG || {};

  function gtag() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  }
  function loadScript(src, attrs) {
    var s = document.createElement("script");
    s.src = src; s.async = true;
    if (attrs) for (var k in attrs) s.setAttribute(k, attrs[k]);
    var f = document.getElementsByTagName("script")[0];
    f.parentNode.insertBefore(s, f);
    return s;
  }
  function hasConsent() {
    var m = document.cookie.match(/(?:^|; )pelangi_cookie_consent=([^;]*)/);
    return m && m[1] === "accepted";
  }

  // ── Sentry (immediate, not consent-gated — error monitoring) ──
  (function initSentry() {
    if (!cfg.sentryDsn) return;
    var m = cfg.sentryDsn.match(/https:\/\/([^@]+)@/);
    if (!m) return;
    var publicKey = m[1];
    loadScript("https://js.sentry-cdn.com/" + publicKey + ".min.js", { crossorigin: "anonymous" });
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (window.Sentry && window.Sentry.onLoad) {
        clearInterval(iv);
        window.Sentry.onLoad(function () {
          window.Sentry.init({
            dsn: cfg.sentryDsn,
            tracesSampleRate: 0.1,
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
            ignoreErrors: [
              "ResizeObserver loop limit exceeded",
              "ResizeObserver loop completed with undelivered notifications",
              "Network request failed", "Failed to fetch", "Load failed", "AbortError"
            ]
          });
        });
      } else if (tries > 50) {
        clearInterval(iv);
      }
    }, 100);
  })();

  // ── Web Vitals → GA (immediate) ──
  (function initWebVitals() {
    var s = loadScript("https://unpkg.com/web-vitals@4/dist/web-vitals.attribution.iife.js");
    s.onload = function () {
      if (!window.webVitals) return;
      function send(name, metric) {
        gtag("event", "web_vitals", { metric_name: name, metric_value: metric.value, metric_id: metric.id });
      }
      window.webVitals.onINP(function (m) { send("INP", m); });
      window.webVitals.onLCP(function (m) { send("LCP", m); });
      window.webVitals.onCLS(function (m) { send("CLS", m); });
    };
  })();

  // ── Consent-gated: Meta Pixel, TikTok Pixel, Microsoft Clarity ──
  var consentInit = false;
  function initConsented() {
    if (consentInit) return;
    consentInit = true;

    // Meta Pixel
    if (cfg.metaPixelId) {
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", cfg.metaPixelId);
      window.fbq("track", "PageView");
    }

    // TikTok Pixel
    if (cfg.tiktokPixelId) {
      !function (w, d, t) {
        w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
        ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
        ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } };
        for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.load = function (e, n) {
          var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r; ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
          ttq._o = ttq._o || {}; ttq._o[e] = n || {};
          var a = d.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = r + "?sdkid=" + e + "&lib=" + t;
          var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(a, s)
        };
        ttq.load(cfg.tiktokPixelId); ttq.page();
      }(window, document, "ttq");

      // Bridge: components dispatch `tiktok-track` CustomEvents.
      window.addEventListener("tiktok-track", function (e) {
        var d = e.detail || {};
        var eid = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
        if (window.ttq) window.ttq.track(d.event, {}, { event_id: eid });
        try {
          fetch("/api/tiktok-events", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ event: d.event, event_id: eid, url: d.url || location.href, user_data: d.user_data })
          });
        } catch (x) {}
      });
    }

    // Microsoft Clarity
    if (cfg.clarityId) {
      (function (c, l, a, r, i) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        var t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        var y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", cfg.clarityId);
    }
  }

  if (hasConsent()) initConsented();
  window.addEventListener("cookie-consent", function (e) {
    if (e.detail && e.detail.consent === "accepted") initConsented();
  });
})();
