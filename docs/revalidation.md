# On-demand ISR Revalidation

The site exposes a webhook at `POST /api/revalidate` that triggers Next.js
on-demand Incremental Static Regeneration. Use it to instantly invalidate
cached pages or tagged data when content changes (room pricing, availability,
blog posts, promotions, etc.).

## Authentication

Every request must include the shared secret in an HTTP header:

```
x-revalidate-secret: <your-secret>
```

The secret is stored in the `REVALIDATE_SECRET` environment variable. Generate
one with:

```bash
openssl rand -hex 32
```

Requests without a valid secret receive **401 Unauthorized**.

## Request body

Send a JSON body with `path`, `tag`, or both:

| Field  | Type   | Description                                         |
|--------|--------|-----------------------------------------------------|
| `path` | string | Route to revalidate (must start with `/`)           |
| `tag`  | string | Cache tag to revalidate (used with `fetch` tag opt) |

At least one of `path` or `tag` is required.

## Example requests

### Revalidate a specific page

```bash
curl -X POST https://pelangicapsulehostel.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -d '{"path": "/rooms"}'
```

### Revalidate by cache tag

```bash
curl -X POST https://pelangicapsulehostel.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -d '{"tag": "rooms"}'
```

### Revalidate both path and tag

```bash
curl -X POST https://pelangicapsulehostel.com/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -d '{"path": "/rooms", "tag": "rooms"}'
```

## Response

**Success (200):**

```json
{ "revalidated": true, "path": "/rooms", "tag": "rooms" }
```

**Error responses:**

| Status | Body                                                    | Cause                      |
|--------|---------------------------------------------------------|----------------------------|
| 401    | `{ "error": "Unauthorized" }`                           | Missing/wrong secret       |
| 400    | `{ "error": "Invalid JSON body" }`                      | Malformed JSON             |
| 400    | `{ "error": "Request body must include 'path'..." }`    | Neither path nor tag given |
| 400    | `{ "error": "Path must start with '/'" }`               | Invalid path format        |
| 500    | `{ "error": "Revalidation endpoint is not configured" }`| REVALIDATE_SECRET not set  |

## CMS / webhook integration

To connect this endpoint to a CMS or admin panel webhook:

1. Set `REVALIDATE_SECRET` in your hosting environment (Vercel, etc.)
2. Configure the CMS webhook to `POST` to `https://pelangicapsulehostel.com/api/revalidate`
3. Add the `x-revalidate-secret` header with the secret value
4. Set the body to `{"path": "/rooms"}` (or whichever path/tag should refresh)
