#!/usr/bin/env node
// Blog cover-image gate. Pure file checks, no server needed — safe to run from
// build.sh on every build. Also callable standalone: `node scripts/check-blog-covers.mjs [--live]`.
//
// Checks:
//   (a) every post's FeaturedImage exists in site/public with the exact filename+extension
//   (b) no two posts share a FeaturedImage unless they are declared language siblings of
//       each other via AlternateEN/AlternateZH/AlternateMS/AlternateHI
//   (c) with --live: every referenced image returns 200 on https://pelangicapsulehostel.com
//
// Exit 0 = pass, 1 = fail (with a readable violation list on stderr).

import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..", "..");
const GO_SITE = resolve(__dirname, "..");
const PUBLIC_DIR = join(REPO, "site", "public");
const BLOG_GO = join(GO_SITE, "internal", "data", "blog.go");

function parseBlogPosts() {
  const src = readFileSync(BLOG_GO, "utf8");
  const posts = [];
  const slugStarts = [];
  const re = /Slug:\s+"([^"]+)"[\s\S]*?FeaturedImage:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    posts.push({ slug: m[1], image: m[2] });
    slugStarts.push(m.index);
  }
  for (let i = 0; i < posts.length; i++) {
    const start = slugStarts[i];
    const end = i + 1 < slugStarts.length ? slugStarts[i + 1] : src.length;
    const block = src.slice(start, end);
    for (const field of ["AlternateEN", "AlternateZH", "AlternateMS", "AlternateHI"]) {
      const fm = block.match(new RegExp(field + ':\\s*"([^"]*)"'));
      posts[i][field] = fm && fm[1] ? fm[1] : null;
    }
  }
  return posts;
}

function checkExists(posts) {
  const missing = posts.filter(
    (p) => p.image.startsWith("/images/") && !existsSync(join(PUBLIC_DIR, p.image.slice(1)))
  );
  return missing;
}

function checkNoBadDuplicates(posts) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const parent = new Map();
  const find = (x) => { while (parent.get(x) && parent.get(x) !== x) x = parent.get(x); return x; };
  const union = (a, b) => {
    if (!parent.has(a)) parent.set(a, a);
    if (!parent.has(b)) parent.set(b, b);
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  };
  for (const p of posts) {
    if (!parent.has(p.slug)) parent.set(p.slug, p.slug);
    for (const field of ["AlternateEN", "AlternateZH", "AlternateMS", "AlternateHI"]) {
      if (p[field] && bySlug.has(p[field])) union(p.slug, p[field]);
    }
  }
  const byImage = new Map();
  for (const p of posts) {
    if (!byImage.has(p.image)) byImage.set(p.image, []);
    byImage.get(p.image).push(p.slug);
  }
  const violations = [];
  for (const [image, slugsForImage] of byImage) {
    if (slugsForImage.length <= 1) continue;
    const roots = new Set(slugsForImage.map(find));
    if (roots.size > 1) violations.push({ image, slugs: slugsForImage });
  }
  return violations;
}

async function checkLive(posts) {
  const uniqueImages = [...new Set(posts.map((p) => p.image).filter((i) => i.startsWith("/images/")))];
  const bad = [];
  for (const image of uniqueImages) {
    const status = await new Promise((resolvePromise) => {
      const req = https.request(
        { host: "pelangicapsulehostel.com", path: image, method: "HEAD", timeout: 10000 },
        (res) => resolvePromise(res.statusCode)
      );
      req.on("timeout", () => { req.destroy(); resolvePromise(0); });
      req.on("error", () => resolvePromise(0));
      req.end();
    });
    if (status !== 200) bad.push({ image, status });
  }
  return bad;
}

async function main() {
  const live = process.argv.includes("--live");
  const posts = parseBlogPosts();
  let ok = true;

  const missing = checkExists(posts);
  if (missing.length === 0) {
    console.error(`✓ every FeaturedImage exists in site/public (${posts.length} posts)`);
  } else {
    ok = false;
    console.error(`✗ ${missing.length} FeaturedImage path(s) missing from site/public:`);
    for (const p of missing) console.error(`    ${p.slug} -> ${p.image}`);
  }

  const dupViolations = checkNoBadDuplicates(posts);
  if (dupViolations.length === 0) {
    console.error("✓ no FeaturedImage reused across non-sibling posts");
  } else {
    ok = false;
    console.error(`✗ ${dupViolations.length} image(s) reused across non-sibling posts:`);
    for (const v of dupViolations) console.error(`    ${v.image}: ${v.slugs.join(", ")}`);
  }

  if (live) {
    const badLive = await checkLive(posts);
    if (badLive.length === 0) {
      console.error("✓ every FeaturedImage returns 200 on production");
    } else {
      ok = false;
      console.error(`✗ ${badLive.length} image(s) do not return 200 on production:`);
      for (const b of badLive) console.error(`    ${b.image} -> ${b.status}`);
    }
  }

  if (!ok) {
    console.error("\nblog cover gate FAILED — fix the above before building/deploying.");
    process.exit(1);
  }
  console.error("\nblog cover gate PASSED.");
  process.exit(0);
}

main();
