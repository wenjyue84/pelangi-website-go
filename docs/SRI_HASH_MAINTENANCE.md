# Subresource Integrity (SRI) Hash Maintenance Guide

## Overview

Subresource Integrity (SRI) protects against CDN compromises and man-in-the-middle (MITM) attacks by ensuring that externally-hosted scripts and stylesheets haven't been tampered with. This document describes how to update SRI hashes when third-party CDN resources are updated.

## Current SRI-Protected Scripts

| Script | URL | Location | Current Hash |
|--------|-----|----------|--------------|
| Google Analytics | `https://www.googletagmanager.com/gtag/js?id={GA_ID}` | `site/src/components/AnalyticsProvider.tsx` | `sha384-VgHGdVW55pNfDcu5KaOcZlNPywG7c5uPZKlJmojJOZ4PYYzq02zAspkU6MVejDTo` |
| Facebook Pixel | `https://connect.facebook.net/en_US/fbevents.js` | `site/src/components/MetaPixelProvider.tsx` | `sha384-INENpXEM6EBeA8liGpPdxXC6SvTmkZDSYqZLLrkf2WJuDUGxJMqUUrSWtKvqxo83` |
| TikTok Pixel | `https://analytics.tiktok.com/i18n/pixel/events.js` | `site/src/components/TikTokPixelProvider.tsx` | `sha384-/E3jBC6DCAnSa2DwyCpJnCEamCjN6/yPUQ1A2C+uHvW66ROgKjnhkL0M2h4iTyxT` |
| Microsoft Clarity | `https://www.clarity.ms/tag/{CLARITY_ID}` | `site/src/instrumentation-client.ts` | `sha384-oWy8B3kEJH3cCvL1lqS2X6VDiMvYpzfFvx8yPvn0wPbpxqI+1L8Zd8Y1L0c8Y2e5` |

## When to Update SRI Hashes

Update SRI hashes in the following scenarios:

1. **Third-party script updates**: The CDN serves a new version of a script
2. **Browser console warnings**: SRI integrity check fails (browser console shows `Failed to load the required SecurityPolicy directives`)
3. **Monitoring alerts**: Security monitoring tools alert that a script hash mismatch has occurred
4. **Planned dependency updates**: When intentionally upgrading a third-party service

## How to Calculate and Update SRI Hashes

### Using Command Line (Linux/macOS/WSL)

1. **Fetch the script and calculate SHA-384 hash**:
   ```bash
   # Replace URL with the actual script URL
   curl -s https://www.googletagmanager.com/gtag/js | openssl dgst -sha384 -binary | openssl base64 -A
   ```

2. **Output format**: The command will output a base64-encoded hash:
   ```
   VgHGdVW55pNfDcu5KaOcZlNPywG7c5uPZKlJmojJOZ4PYYzq02zAspkU6MVejDTo
   ```

3. **Prefix with algorithm**: Add `sha384-` prefix:
   ```
   sha384-VgHGdVW55pNfDcu5KaOcZlNPywG7c5uPZKlJmojJOZ4PYYzq02zAspkU6MVejDTo
   ```

### Using Online Tools

Alternatively, use **[srihash.org](https://www.srihash.org/)** to generate SRI hashes:
1. Enter the script URL
2. Click "Hash!" to generate the integrity string
3. Copy the full integrity value (including `sha384-` prefix)

### Using PowerShell (Windows)

```powershell
# Fetch script and calculate SHA384 hash
$url = "https://www.googletagmanager.com/gtag/js"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing
$bytes = [System.Text.Encoding]::UTF8.GetBytes($response.Content)
$hash = [System.Security.Cryptography.SHA384]::Create().ComputeHash($bytes)
$hashBase64 = [Convert]::ToBase64String($hash)
Write-Host "sha384-$hashBase64"
```

## Update Procedures by Script

### Google Analytics (AnalyticsProvider.tsx)

1. Calculate new hash for `https://www.googletagmanager.com/gtag/js`
2. Update line in `site/src/components/AnalyticsProvider.tsx`:
   ```tsx
   <Script
     id="_next-ga"
     strategy="lazyOnload"
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
     integrity="sha384-NEW_HASH_HERE"  // ← Update this line
     crossOrigin="anonymous"
   />
   ```

### Facebook Pixel (MetaPixelProvider.tsx)

1. Calculate new hash for `https://connect.facebook.net/en_US/fbevents.js`
2. Update the hash in the inline script initialization:
   ```typescript
   t.integrity='sha384-NEW_HASH_HERE';  // ← Update this line
   ```

### TikTok Pixel (TikTokPixelProvider.tsx)

1. Calculate new hash for `https://analytics.tiktok.com/i18n/pixel/events.js`
2. Update the hash in the inline script initialization:
   ```typescript
   a.integrity="sha384-NEW_HASH_HERE";  // ← Update this line
   ```

### Microsoft Clarity (instrumentation-client.ts)

1. Calculate new hash for `https://www.clarity.ms/tag/{CLARITY_ID}`
2. Update the hash in the Clarity initialization function:
   ```typescript
   t.integrity = "sha384-NEW_HASH_HERE";  // ← Update this line
   ```

## Verification Steps

After updating SRI hashes:

1. **Local Testing**:
   ```bash
   npm run dev
   ```

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Check Console tab for any SRI integrity errors
   - No warnings like "Failed to load the required SecurityPolicy directives"

3. **Run Type Check**:
   ```bash
   npm run type-check
   ```

4. **Build and Test**:
   ```bash
   npm run build
   npm run start
   ```

5. **Monitor in Production**:
   - Check error logs for SRI-related failures
   - Monitor Sentry for integrity failures
   - Review Google Analytics for page load errors

## Troubleshooting

### SRI Mismatch Error
If you see an error like:
```
Failed to load the required SecurityPolicy directives: {"eval": false, ...}
```

This means the hash in your code doesn't match the actual script content. Solutions:
1. Recalculate the hash using the correct URL
2. Verify the script URL is exactly correct (including protocol, domain, path, and parameters)
3. Check that the CDN is returning the expected content (not an error page)

### Different Hash Each Time
If you calculate the hash multiple times and get different results:
1. Verify you're using the exact same URL
2. Check if the CDN is versioning content (e.g., URL parameters affect response)
3. For Google Analytics with `?id=` parameter, the script content should be identical regardless of ID

### Dynamic Script URLs
For scripts where the URL contains dynamic parameters (like `?sdkid=` in TikTok), the hash should match the script content regardless of the parameter, since the server typically returns the same script framework with only data values changing.

## References

- **MDN: Subresource Integrity** — https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
- **OWASP Third-Party JavaScript Management** — https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html
- **SRI Hash Generator** — https://www.srihash.org/
- **Content Security Policy (CSP)** — https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

## Related Security Features

- **Content Security Policy (CSP)**: Configured in `next.config.js` to restrict script execution
- **Cookie Consent**: All tracking scripts (Analytics, Facebook, TikTok) respect user cookie consent
- **Sentry Error Monitoring**: Captures and logs security-related errors

## Schedule

Review SRI hashes quarterly or when:
- Google/Meta/TikTok/Microsoft announce script updates
- Security advisories are published
- Browser console shows integrity errors in staging or production
