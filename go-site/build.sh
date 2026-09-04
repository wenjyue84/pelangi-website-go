#!/usr/bin/env bash
# Build the self-contained Go binary for the Pelangi website.
# 1. Compile Tailwind CSS into static/css/app.css (build-time Node dependency).
# 2. Compile a static, stripped Linux binary that embeds all templates + assets.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> [0/3] Blog cover-image gate (must pass before build)"
node scripts/check-blog-covers.mjs

echo "==> [1/3] Building Tailwind CSS"
if [ ! -d node_modules ]; then npm install; fi
npm run css

echo "==> [2/3] Building Go binary (linux/amd64, static)"
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags "-s -w" -o pelangi-go .

echo "==> [3/3] Done: $(ls -lh pelangi-go | awk '{print $5}') — single self-contained binary"
