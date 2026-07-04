#!/usr/bin/env bash
# Build the self-contained Go binary for the Pelangi website.
# 1. Compile Tailwind CSS into static/css/app.css (build-time Node dependency).
# 2. Compile a static, stripped Linux binary that embeds all templates + assets.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> [1/2] Building Tailwind CSS"
if [ ! -d node_modules ]; then npm install; fi
npm run css

echo "==> [2/2] Building Go binary (linux/amd64, static)"
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags "-s -w" -o pelangi-go .

echo "==> Done: $(ls -lh pelangi-go | awk '{print $5}') — single self-contained binary"
