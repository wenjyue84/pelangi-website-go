#!/usr/bin/env node
// ACI (Agent Computer Interface) for the Pelangi Capsule Hostel Go site.
//
// Lets an LLM agent discover, query and regression-test this app through
// structured JSON — no browser needed. Start with:  node aci.mjs describe
//
// JSON goes to stdout, human ✓/✗ progress to stderr.
// Exit codes: 0 = pass, 1 = fail, 2 = usage error.

import { spawn, spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");
const PUBLIC_DIR = join(REPO, "site", "public");
const ACI_PORT = Number(process.env.ACI_PORT || 3210);
const BASE = `http://127.0.0.1:${ACI_PORT}`;
const PROD = "https://pelangicapsulehostel.com";

// ─── tiny helpers ───────────────────────────────────────────────────────────

const err = (m) => process.stderr.write(m + "\n");
const out = (o) => process.stdout.write(JSON.stringify(o, null, 2) + "\n");

function todayMYT() {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

// Raw-path HTTP request. Never build WHATWG URLs for security checks — the URL
// class normalizes %2e%2e away and the traversal test silently tests nothing.
function rawGet(path, { method = "GET", host = "127.0.0.1", port = ACI_PORT } = {}) {
  return new Promise((resolvePromise) => {
    const req = http.request(
      { host, port, path, method, timeout: 15000 },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () =>
          resolvePromise({ status: res.statusCode, headers: res.headers, body })
        );
      }
    );
    req.on("timeout", () => { req.destroy(); resolvePromise({ status: 0, body: "TIMEOUT" }); });
    req.on("error", (e) => resolvePromise({ status: 0, body: String(e) }));
    req.end();
  });
}

// ─── source-of-truth parsers (no server needed) ─────────────────────────────

function parseBlogPosts() {
  const src = readFileSync(join(__dirname, "internal", "data", "blog.go"), "utf8");
  const posts = [];
  // Struct literals list Slug before Date before FeaturedImage; walk in order.
  const re = /Slug:\s+"([^"]+)"[\s\S]*?Date:\s+"([^"]+)"[\s\S]*?FeaturedImage:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    posts.push({ slug: m[1], date: m[2], image: m[3] });
  }
  return posts;
}

function parseSearchIndex() {
  const src = readFileSync(join(__dirname, "static", "js", "widgets_b.js"), "utf8");
  const entries = [];
  const re = /\{ title: "([^"]+)"[^\n]*?url: "([^"]+)"[^\n]*?(?:live: "([^"]+)")?\s*\},?\n/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    entries.push({ title: m[1], url: m[2], live: m[3] || null });
  }
  return entries;
}

function parseIndexNowKey() {
  const src = readFileSync(join(__dirname, "internal", "handlers", "indexnow.go"), "utf8");
  const m = src.match(/indexNowKey = "([0-9a-f]+)"/);
  return m ? m[1] : null;
}

// ─── ephemeral server (never the user's live instance) ──────────────────────

let serverProc = null;

async function startServer() {
  err(`… starting ephemeral server on :${ACI_PORT} (go run .)`);
  serverProc = spawn("go", ["run", "."], {
    cwd: __dirname,
    env: { ...process.env, PORT: String(ACI_PORT), PUBLIC_DIR },
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  });
  let boot = "";
  serverProc.stdout.on("data", (c) => (boot += c));
  serverProc.stderr.on("data", (c) => (boot += c));
  const deadline = Date.now() + 90_000; // go run compiles first
  while (Date.now() < deadline) {
    const r = await rawGet("/healthz");
    if (r.status === 200) { err("✓ server up"); return; }
    if (serverProc.exitCode !== null)
      throw new Error(`server exited early (code ${serverProc.exitCode}):\n${boot.slice(-2000)}`);
    await new Promise((r2) => setTimeout(r2, 700));
  }
  throw new Error(`server did not become healthy in 90s:\n${boot.slice(-2000)}`);
}

function stopServer() {
  if (!serverProc) return;
  // `go run` spawns a child binary — kill the whole tree on Windows.
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(serverProc.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    serverProc.kill("SIGKILL");
  }
  serverProc = null;
}

// ─── suite machinery ────────────────────────────────────────────────────────

const results = { passed: 0, failed: 0, total: 0, failures: [] };

function check(label, ok, detail = "") {
  results.total++;
  if (ok) { results.passed++; err(`  ✓ ${label}`); }
  else { results.failed++; results.failures.push({ label, detail }); err(`  ✗ ${label} — ${detail}`); }
}

// ─── suites ─────────────────────────────────────────────────────────────────

const SUITES = {};

// integrity — pure file checks, no server.
SUITES.integrity = {
  needsServer: false,
  run: async () => {
    const posts = parseBlogPosts();
    check("blog.go parses ≥ 40 posts", posts.length >= 40, `got ${posts.length}`);
    const slugs = posts.map((p) => p.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    check("blog slugs unique", dupes.length === 0, `dupes: ${dupes.join(",")}`);
    const badDates = posts.filter((p) => !/^\d{4}-\d{2}-\d{2}$/.test(p.date));
    check("all post dates ISO YYYY-MM-DD", badDates.length === 0,
      badDates.map((p) => `${p.slug}:${p.date}`).join(","));
    const missingImg = posts.filter(
      (p) => p.image.startsWith("/images/") && !existsSync(join(PUBLIC_DIR, p.image.slice(1)))
    );
    check("every FeaturedImage exists in site/public", missingImg.length === 0,
      missingImg.map((p) => p.image).join(","));

    const idx = parseSearchIndex();
    check("search index parses ≥ 15 entries", idx.length >= 15, `got ${idx.length}`);
    const bySlug = new Map(posts.map((p) => [`/blog/${p.slug}`, p]));
    const mismatched = idx.filter((e) => e.live && bySlug.get(e.url) && bySlug.get(e.url).date !== e.live);
    check("search-index live: dates match blog.go post dates", mismatched.length === 0,
      mismatched.map((e) => `${e.url} live=${e.live} vs post=${bySlug.get(e.url).date}`).join(","));
    const orphaned = idx.filter((e) => e.url.startsWith("/blog/") && !bySlug.has(e.url));
    check("every /blog/* search-index url has a blog.go post", orphaned.length === 0,
      orphaned.map((e) => e.url).join(","));
    const futureUnlisted = posts.filter(
      (p) => p.date > todayMYT() && !idx.some((e) => e.url === `/blog/${p.slug}`)
    );
    check("every scheduled post has a gated search-index entry", futureUnlisted.length === 0,
      futureUnlisted.map((p) => p.slug).join(","));

    const key = parseIndexNowKey();
    check("IndexNow key is 32-hex", !!key && /^[0-9a-f]{32}$/.test(key), String(key));
  },
};

// pages — route smoke with content markers.
SUITES.pages = {
  needsServer: true,
  run: async () => {
    const routes = [
      ["/", "Pelangi"],
      ["/rooms", "RM35"],
      ["/blog", "blog"],
      ["/contact", "WhatsApp"],
      ["/getting-here", "Causeway"],
      ["/check-in", "check"],
      ["/amenities", "WiFi"],
      ["/visa-run", "visa"],
      ["/zh", "胶囊"],
      ["/gallery", "img"],
      ["/about", "Pelangi"],
      ["/author/jay-lew", "Jay"],
      ["/guide", "Pelangi"],
      ["/~offline", "offline"],
    ];
    for (const [path, marker] of routes) {
      const r = await rawGet(path);
      check(`GET ${path} → 200 + "${marker}"`,
        r.status === 200 && r.body.toLowerCase().includes(marker.toLowerCase()),
        `status=${r.status} markerFound=${r.body.toLowerCase().includes(marker.toLowerCase())}`);
    }
  },
};

// blog — the scheduled-publishing gate, server-side.
SUITES.blog = {
  needsServer: true,
  run: async () => {
    const today = todayMYT();
    const posts = parseBlogPosts();
    const published = posts.filter((p) => p.date <= today);
    const future = posts.filter((p) => p.date > today);
    const newest = published.reduce((a, b) => (a.date >= b.date ? a : b));

    for (const p of [published[0], published[Math.floor(published.length / 2)], newest]) {
      const r = await rawGet(`/blog/${p.slug}`);
      check(`published ${p.slug} → 200`, r.status === 200, `status=${r.status}`);
    }
    for (const p of future) {
      const r = await rawGet(`/blog/${p.slug}`);
      check(`scheduled ${p.slug} (${p.date}) → 404 pre-live`, r.status === 404, `status=${r.status}`);
    }
    const list = await rawGet("/blog");
    check("blog list shows newest published", list.body.includes(newest.slug), newest.slug);
    const leaked = future.filter((p) => list.body.includes(p.slug));
    check("blog list hides scheduled posts", leaked.length === 0, leaked.map((p) => p.slug).join(","));

    // Regression pin 2026-07-11: live posts must never render anchors to
    // still-scheduled slugs (StripUnpublishedLinks render gate). The Lalamove
    // post carried three 404 links for 15–24 days before this gate existed.
    const futureSlugs = new Set(future.map((p) => p.slug));
    for (const slug of ["lalamove-driver-malaysia-jb-guide", "gig-jobs-malaysia-waiting-singapore-work-pass"]) {
      const r = await rawGet(`/blog/${slug}`);
      const hrefs = [...r.body.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map((m) => m[1]);
      const dead = hrefs.filter((s) => futureSlugs.has(s));
      check(`${slug} renders no links to unpublished posts (hunt pin 2026-07-11)`,
        dead.length === 0, `dead anchors: ${dead.join(",")}`);
    }
  },
};

// pricing — flat RM35/594/500 consistency; stale RM30 weekday and RM45 must be
// dead on money pages (2026-07-20: nightly price unified to a flat RM35).
SUITES.pricing = {
  needsServer: true,
  run: async () => {
    const home = await rawGet("/");
    const rooms = await rawGet("/rooms");
    const llms = await rawGet("/llms.txt");
    for (const [name, r] of [["home", home], ["rooms", rooms], ["llms.txt", llms]]) {
      check(`${name} has flat RM35`, r.body.includes("RM35"),
        `RM35=${r.body.includes("RM35")}`);
    }
    check("llms.txt has RM594 monthly", llms.body.includes("594"), "no 594");
    check("rooms page has RM500 private room", rooms.body.includes("RM500"), "no RM500");
    for (const [name, r] of [["home", home], ["rooms", rooms], ["llms.txt", llms]]) {
      check(`${name} has NO stale RM30 weekday rate`, !r.body.includes("RM30"), "RM30 found");
      check(`${name} has NO stale RM45`, !r.body.includes("RM45"), "RM45 found");
    }
    const bookingJs = readFileSync(join(__dirname, "static", "js", "booking.js"), "utf8");
    check("booking.js has no stale 45 weekday rate", !/\b45\b/.test(bookingJs.replace(/RM594/g, "")),
      "literal 45 found in booking.js");
    // Regression pin 2026-07-11: RM45 Lower Deck pricing survived the 07-05 sweep
    // in 7 blog post bodies (found by the evaluator agent's first hunt). The only
    // legitimate RM45 left is the RM45–75 phone-plan currency conversion.
    const blogSrc = readFileSync(join(__dirname, "internal", "data", "blog.go"), "utf8")
      .replace(/RM45[–-]75/g, "");
    const rm45 = [...blogSrc.matchAll(/.{30}RM45.{10}/g)].map((m) => m[0].trim());
    check("blog.go quotes no RM45 as a pod price (hunt pin 2026-07-11)", rm45.length === 0,
      rm45.slice(0, 3).join(" | "));
  },
};

// jsonld — every ld+json block on key pages must parse.
SUITES.jsonld = {
  needsServer: true,
  run: async () => {
    const posts = parseBlogPosts().filter((p) => p.date <= todayMYT());
    const newest = posts.reduce((a, b) => (a.date >= b.date ? a : b));
    for (const path of ["/", "/rooms", `/blog/${newest.slug}`, "/contact"]) {
      const r = await rawGet(path);
      const blocks = [...r.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      check(`${path} has ≥1 JSON-LD block`, blocks.length >= 1, `got ${blocks.length}`);
      let bad = 0;
      for (const b of blocks) { try { JSON.parse(b[1]); } catch { bad++; } }
      check(`${path} all ${blocks.length} JSON-LD blocks parse`, bad === 0, `${bad} unparseable`);
    }
  },
};

// seo — sitemap gating + lastmod invariant, robots, llms, IndexNow key file.
SUITES.seo = {
  needsServer: true,
  run: async () => {
    const today = todayMYT();
    const posts = parseBlogPosts();
    const published = posts.filter((p) => p.date <= today);
    const future = posts.filter((p) => p.date > today);
    const newest = published.reduce((a, b) => (a.date >= b.date ? a : b));

    const sm = await rawGet("/sitemap.xml");
    check("sitemap.xml → 200 xml", sm.status === 200 && sm.body.includes("<urlset"), `status=${sm.status}`);
    check("sitemap includes newest published post", sm.body.includes(newest.slug), newest.slug);
    const leaked = future.filter((p) => sm.body.includes(p.slug));
    check("sitemap hides scheduled posts", leaked.length === 0, leaked.map((p) => p.slug).join(","));
    check(`sitemap lastmod tracks newest post (${newest.date})`, sm.body.includes(newest.date),
      "newest date not in sitemap");

    const robots = await rawGet("/robots.txt");
    check("robots.txt → 200 + Sitemap: line", robots.status === 200 && robots.body.includes("Sitemap:"),
      `status=${robots.status}`);
    check("robots.txt does NOT disallow wp-* (410 de-index strategy)", !robots.body.includes("wp-"),
      "wp- found in robots.txt");

    const key = parseIndexNowKey();
    const keyFile = await rawGet(`/${key}.txt`);
    check("IndexNow key file served, body == key", keyFile.status === 200 && keyFile.body.trim() === key,
      `status=${keyFile.status} body=${keyFile.body.slice(0, 40)}`);

    const llmsFull = await rawGet("/llms-full.txt");
    check("llms-full.txt → 200 with pricing", llmsFull.status === 200 && llmsFull.body.includes("RM30"),
      `status=${llmsFull.status}`);

    // hreflang reciprocity — every page in a language group must emit the SAME
    // alternate set (Google ignores one-way hreflang). Added 2026-07-12 with the
    // multilingual-SEO track. Each entry: [paths that must share a set, langs].
    const hreflangGroups = [
      { paths: ["/", "/zh"], langs: ["en", "zh-CN"] },
      { paths: ["/rooms", "/zh/rooms"], langs: ["en", "zh-CN"] },
      { paths: ["/about", "/zh/about"], langs: ["en", "zh-CN"] },
      { paths: ["/location", "/zh/location"], langs: ["en", "zh-CN"] },
      { paths: ["/getting-here", "/zh/getting-here", "/ms/getting-here"], langs: ["en", "zh-CN", "ms"] },
      { paths: ["/check-in", "/zh/check-in", "/ms/check-in"], langs: ["en", "zh-CN", "ms"] },
      { paths: ["/amenities", "/zh/amenities", "/ms/amenities"], langs: ["en", "zh-CN", "ms"] },
      { paths: ["/guide", "/zh/guide", "/ms/guide"], langs: ["en", "zh-CN", "ms"] },
      { paths: ["/terms", "/ms/terma"], langs: ["en", "ms"] },
    ];
    for (const g of hreflangGroups) {
      for (const path of g.paths) {
        const r = await rawGet(path);
        const langs = [...r.body.matchAll(/rel="alternate"\s+hreflang="([^"]+)"/g)].map((m) => m[1]);
        const missing = g.langs.filter((l) => !langs.includes(l));
        const hasXDefault = langs.includes("x-default");
        check(`hreflang ${path} lists ${g.langs.join("/")}+x-default`,
          r.status === 200 && missing.length === 0 && hasXDefault,
          `status=${r.status} got=[${langs.join(",")}] missing=[${missing.join(",")}] xdefault=${hasXDefault}`);
      }
    }
  },
};

// security — raw paths, on purpose.
SUITES.security = {
  needsServer: true,
  run: async () => {
    for (const p of ["/wp-login.php", "/xmlrpc.php", "/wp-admin", "/wp-json"]) {
      const r = await rawGet(p);
      check(`${p} → 410 Gone`, r.status === 410, `status=${r.status}`);
    }
    const trav = await rawGet("/%2e%2e/%2e%2e/%2e%2e/etc/passwd");
    check("path traversal → not 200", trav.status !== 200 && !trav.body.includes("root:"),
      `status=${trav.status}`);
    const post = await rawGet("/", { method: "POST" });
    check("POST / → 405 (GET-only mux)", post.status === 405, `status=${post.status}`);
    const junk = await rawGet("/definitely-not-a-page-xyz");
    check("unknown path → 404", junk.status === 404, `status=${junk.status}`);
    const home = await rawGet("/");
    for (const h of ["strict-transport-security", "x-content-type-options", "x-frame-options"]) {
      check(`security header ${h}`, !!home.headers[h], "missing");
    }
    // Hunt pins 2026-07-11 (deterministic agent findings 1, 3, 4, 5):
    const junkCat = await rawGet("/blog/category/nonexistent-xyz");
    check("unknown blog category → 404 (was indexable 200)", junkCat.status === 404, `status=${junkCat.status}`);
    for (const p of ["/static/", "/static/css/"]) {
      const r = await rawGet(p);
      check(`${p} directory listing → 404`, r.status === 404, `status=${r.status}`);
    }
    const slash = await rawGet("/blog/lalamove-driver-malaysia-jb-guide/");
    check("trailing-slash blog URL → 301 to clean path",
      slash.status === 301 && (slash.headers.location || "") === "/blog/lalamove-driver-malaysia-jb-guide",
      `status=${slash.status} loc=${slash.headers.location}`);
    const dbl = await rawGet("/blog//");
    check("double-slash path → 301 with non-empty Location",
      dbl.status === 301 && !!dbl.headers.location, `status=${dbl.status} loc=${JSON.stringify(dbl.headers.location)}`);
  },
};

// api — degrades gracefully without external creds (Beds24/Stripe absent locally).
SUITES.api = {
  needsServer: true,
  run: async () => {
    const h = await rawGet("/healthz");
    check("/healthz → 200 ok", h.status === 200 && h.body.includes("ok"), `status=${h.status}`);
    const noParams = await rawGet("/api/ari");
    check("/api/ari without params → 400 JSON error", noParams.status === 400 && noParams.body.includes("error"),
      `status=${noParams.status}`);
    const badDate = await rawGet("/api/ari?checkin=2026-13-99&checkout=2026-01-01");
    check("/api/ari bad date → 400", badDate.status === 400, `status=${badDate.status}`);
    const swapped = await rawGet("/api/ari?checkin=2026-08-02&checkout=2026-08-01");
    check("/api/ari checkout<checkin → 400", swapped.status === 400, `status=${swapped.status}`);
    // Hunt pins 2026-07-11 (finding 2): bounds on the availability API.
    const past = await rawGet("/api/ari?checkin=1999-01-01&checkout=1999-01-05");
    check("/api/ari past checkin → 400 (was 200 with fake availability)", past.status === 400,
      `status=${past.status}`);
    const huge = await rawGet(`/api/ari?checkin=${todayMYT()}&checkout=2099-01-01`);
    check("/api/ari >365 nights → 400", huge.status === 400, `status=${huge.status}`);
  },
};

// ─── commands ───────────────────────────────────────────────────────────────

const COMMANDS = {
  describe: () =>
    out({
      app: "pelangi-website go-site — Go marketing+booking site for Pelangi Capsule Hostel (production: pelangicapsulehostel.com, VPS PM2 pelangi-website-go :3001)",
      aci: "node aci.mjs <command>  (run from go-site/)",
      commands: {
        describe: "this catalog",
        status: "toolchain + data-file freshness + prod health (read-only GET to prod /healthz)",
        posts: "structured list of blog posts (slug, date, published?) from blog.go",
        "post <slug>": "one post's metadata + live-gate status",
        "test --suite=<name>|all": `deterministic suites: ${Object.keys(SUITES).join(", ")}`,
        gates: "authoritative slow path: go vet + go build",
      },
      exitCodes: { 0: "pass", 1: "fail", 2: "usage error" },
      verdictShape: "{passed, failed, total, ok, failures:[{label, detail}]}",
      guardrails: [
        `Tests run against an EPHEMERAL server on :${ACI_PORT} (go run, PUBLIC_DIR=site/public). NEVER against the production VPS.`,
        "The only production request this tool ever makes is a read-only GET /healthz in `status`.",
        "No suite POSTs to /api/create-payment-intent, /api/stripe-webhook, /api/bookings/sync or /api/webhooks/beds24 — payment/channel-manager routes are out of bounds (real money, real OTA state).",
        "/admin/gbp is token-gated and scheduler-backed — do not probe it.",
        "Local runs have no Beds24/Stripe env; external-dependent routes are asserted only for graceful degradation (4xx), never for live data.",
        "Content edits to fix a red suite are FORBIDDEN — a red pricing/blog suite means the SOURCE is wrong or the test found a real bug. Diagnose, don't green-wash.",
      ],
      suites: Object.fromEntries(
        Object.entries(SUITES).map(([k, v]) => [k, { needsServer: v.needsServer }])
      ),
    }),

  status: async () => {
    const go = spawnSync("go", ["version"], { encoding: "utf8" });
    const posts = parseBlogPosts();
    const today = todayMYT();
    const prod = await rawGet("/healthz", { host: "pelangicapsulehostel.com", port: 80 }).catch(() => null);
    // Cloudflare fronts prod; plain :80 may redirect — treat any response as reachable.
    out({
      go: go.stdout ? go.stdout.trim() : "MISSING — install Go toolchain",
      todayMYT: today,
      posts: {
        total: posts.length,
        published: posts.filter((p) => p.date <= today).length,
        scheduled: posts.filter((p) => p.date > today).map((p) => ({ slug: p.slug, live: p.date })),
      },
      prodReachable: !!prod && prod.status > 0,
      publicDir: existsSync(PUBLIC_DIR) ? PUBLIC_DIR : "MISSING",
    });
  },

  posts: () => {
    const today = todayMYT();
    out(parseBlogPosts().map((p) => ({ ...p, published: p.date <= today })));
  },

  post: (slug) => {
    if (!slug) { err("usage: node aci.mjs post <slug>"); process.exit(2); }
    const p = parseBlogPosts().find((x) => x.slug === slug);
    if (!p) { out({ error: "no such slug", slug }); process.exit(1); }
    out({ ...p, published: p.date <= todayMYT() });
  },

  test: async (suiteArg) => {
    const name = (suiteArg || "").replace(/^--suite=/, "") || "all";
    const picked = name === "all" ? Object.keys(SUITES) : [name];
    if (picked.some((s) => !SUITES[s])) {
      err(`unknown suite "${name}" — have: ${Object.keys(SUITES).join(", ")}, all`);
      process.exit(2);
    }
    const needServer = picked.some((s) => SUITES[s].needsServer);
    const t0 = Date.now();
    try {
      if (needServer) await startServer();
      for (const s of picked) {
        err(`\n── suite: ${s} ──`);
        await SUITES[s].run();
      }
    } finally {
      stopServer();
    }
    const verdict = { ...results, ok: results.failed === 0, ms: Date.now() - t0 };
    out(verdict);
    process.exit(verdict.ok ? 0 : 1);
  },

  gates: () => {
    err("── go vet ──");
    const vet = spawnSync("go", ["vet", "./..."], { cwd: __dirname, encoding: "utf8" });
    err(vet.stderr || "clean");
    err("── go build ──");
    const build = spawnSync("go", ["build", "./..."], { cwd: __dirname, encoding: "utf8" });
    err(build.stderr || "clean");
    const ok = vet.status === 0 && build.status === 0;
    out({ vet: vet.status === 0, build: build.status === 0, ok });
    process.exit(ok ? 0 : 1);
  },
};

// ─── main ───────────────────────────────────────────────────────────────────

const [cmd, arg] = process.argv.slice(2);
if (!cmd || !COMMANDS[cmd]) {
  err(`usage: node aci.mjs <${Object.keys(COMMANDS).join("|")}> — start with "describe"`);
  process.exit(2);
}
process.on("SIGINT", () => { stopServer(); process.exit(1); });
await COMMANDS[cmd](arg);
