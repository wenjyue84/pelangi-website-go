#!/usr/bin/env bash
set -euo pipefail

# Pelangi Website — Standalone Deploy to Hetzner VPS
# Usage: ./deploy.sh [--skip-build] [--rollback] [--yes]

VPS_USER="deploy"
VPS_HOST="5.223.54.57"
VPS_DIR="/opt/pelangi-website"
HEALTH_URL="https://pelangicapsulehostel.com/"
PM2_NAME="pelangi-website"

SKIP_BUILD=false
ROLLBACK=false
AUTO_YES=false

for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=true ;;
    --rollback)   ROLLBACK=true ;;
    --yes)        AUTO_YES=true ;;
    *) echo "Unknown flag: $arg"; exit 1 ;;
  esac
done

ssh_cmd() {
  ssh "${VPS_USER}@${VPS_HOST}" "$@"
}

confirm() {
  if [ "$AUTO_YES" = true ]; then return 0; fi
  read -rp "$1 [y/N] " ans
  [[ "$ans" =~ ^[Yy]$ ]]
}

# --- Rollback ---
if [ "$ROLLBACK" = true ]; then
  echo "==> Rolling back to previous deployment..."
  ssh_cmd "cd ${VPS_DIR} && \
    if [ -d standalone.bak ]; then \
      rm -rf standalone && mv standalone.bak standalone && \
      pm2 reload ${PM2_NAME} --update-env && \
      echo 'Rollback complete.'; \
    else \
      echo 'No backup found (standalone.bak). Cannot rollback.' && exit 1; \
    fi"
  exit 0
fi

# --- Build ---
if [ "$SKIP_BUILD" = false ]; then
  echo "==> Building Next.js standalone output..."
  npm run build

  # Verify standalone output exists
  if [ ! -f .next/standalone/server.js ]; then
    echo "ERROR: .next/standalone/server.js not found. Build may have failed."
    exit 1
  fi

  # Copy static assets and public files into standalone (Next.js doesn't auto-include these)
  echo "==> Copying static assets into standalone..."
  cp -r .next/static .next/standalone/.next/static
  cp -r public .next/standalone/public
else
  echo "==> Skipping build (--skip-build)"
  if [ ! -f .next/standalone/server.js ]; then
    echo "ERROR: No existing standalone build found. Run without --skip-build first."
    exit 1
  fi
fi

# --- Package ---
echo "==> Creating deployment tarball..."
TARBALL="pelangi-website-$(date +%Y%m%d-%H%M%S).tar.gz"
tar czf "/tmp/${TARBALL}" \
  --exclude='.next/cache' \
  --exclude='*.map' \
  -C .next/standalone .

echo "   Tarball: /tmp/${TARBALL} ($(du -sh "/tmp/${TARBALL}" | cut -f1))"

if ! confirm "Deploy to ${VPS_HOST}?"; then
  echo "Aborted."
  exit 0
fi

# --- Upload ---
echo "==> Uploading to VPS..."
scp "/tmp/${TARBALL}" "${VPS_USER}@${VPS_HOST}:/tmp/${TARBALL}"

# --- Deploy on VPS ---
echo "==> Deploying on VPS..."
ssh_cmd "cd ${VPS_DIR} && \
  echo '  Backing up current deployment...' && \
  rm -rf standalone.bak && \
  if [ -d standalone ]; then mv standalone standalone.bak; fi && \
  mkdir -p standalone && \
  echo '  Extracting new bundle...' && \
  tar xzf /tmp/${TARBALL} -C standalone && \
  rm /tmp/${TARBALL} && \
  echo '  Reloading PM2...' && \
  pm2 reload ecosystem.config.cjs --update-env && \
  pm2 save && \
  echo '  Deploy complete.'"

# --- Health check ---
echo "==> Health check..."
sleep 3
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${HEALTH_URL}" || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  echo "   OK — ${HEALTH_URL} returned HTTP ${HTTP_CODE}"
else
  echo "   WARNING — ${HEALTH_URL} returned HTTP ${HTTP_CODE}"
  echo "   Check: ssh ${VPS_USER}@${VPS_HOST} 'pm2 logs ${PM2_NAME} --lines 30'"
fi

# Cleanup local tarball
rm -f "/tmp/${TARBALL}"

echo "==> Done."
