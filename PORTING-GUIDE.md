# Page porting guide

How to port one Next.js page (`site/src/app/<route>/page.tsx`) to this Go app.
Reference exemplar: `/accessibility` →
`internal/handlers/page_accessibility.go` + `templates/pages/accessibility.html`.

## Steps

1. **Read the source** `site/src/app/<route>/page.tsx` and any components it imports
   from `site/src/components/`. Shared chrome (Header/Footer) is already a partial —
   do NOT re-port it; reference `{{template "header" .}}` / `{{template "footer" .}}`.

2. **Create the handler** `internal/handlers/page_<name>.go`:
   ```go
   package handlers
   import "net/http"
   func init() {
       registerPage(func(h *Handler, mux *http.ServeMux) {
           mux.HandleFunc("GET /<route>", h.<name>)
       })
   }
   func (h *Handler) <name>(w http.ResponseWriter, r *http.Request) {
       p := h.base(
           "<title from metadata.title>",
           "<metadata.description>",
           "https://pelangicapsulehostel.com/<route>",
           "en",          // or "zh" / "ms"; use zhNav/msNav when added
           enNav,
       )
       h.renderPage(w, "<name>.html", p)
   }
   ```
   If the page needs data (rooms, faq, gallery…), define a struct embedding
   `BasePage` (see `HomePage`) and pass the data.

3. **Create the template** `templates/pages/<name>.html`:
   ```
   {{define "content"}}
   {{template "header" .}}
   <main> … ported markup … </main>
   {{template "footer" .}}
   {{end}}
   ```
   Optionally add `{{define "head"}}…{{end}}` for page-specific `<head>` tags
   (preloads, JSON-LD via `{{ safeHTML .X }}`).

## JSX → html/template conversion rules

| JSX | Go template |
|---|---|
| `className=` | `class=` |
| `strokeWidth={1.5}` etc. | `stroke-width="1.5"` (kebab-case SVG attrs) |
| `{cond && <X/>}` | `{{if .Cond}}…{{end}}` |
| `{arr.map(x => …)}` | `{{range .Items}}…{{end}}` |
| `{value}` | `{{.Value}}` |
| `&apos; &ldquo; &rdquo;` | keep as-is (valid HTML entities) |
| `<Image src=… />` (next/image) | `<img src="/images/…" …>` (plain) |
| `<Link href=…>` | `<a href=…>` |
| self-closing `<br/>` `<img/>` | fine in templates |
| client component (search, chat, pixels) | data-attr hooks + vanilla JS in `static/js/` |

## After porting a batch

```bash
npm run css        # re-scan templates for new utility classes (REQUIRED)
go build ./...     # must compile
```
Then run and curl each new route for `200` + a content marker.

## Shared data already ported (`internal/data/`)
- `rooms.go` — RoomTypes, Property
- `faq.go` — FaqItems
- `content.go` — llms.txt / llms-full.txt bodies

## Porting status: COMPLETE

All pages, homepage sections, API routes, and SEO surfaces have been ported;
this Go app is the live production site (cutover 2026-06-27 — see `DEPLOY.md`).
This guide is kept as a reference for the porting conventions used, e.g. when
adding brand-new pages.
