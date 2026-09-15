package handlers

import (
	"fmt"
	"html"
	"net/http"
	"strings"
	"time"

	"pelangi-website/internal/gbp"
)

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		if h.gbp == nil {
			return
		}
		mux.HandleFunc("GET /admin/gbp", h.adminGBPAuth(h.adminGBP))
		mux.HandleFunc("POST /admin/gbp/posts", h.adminGBPAuth(h.adminGBPCreatePost))
		mux.HandleFunc("POST /admin/gbp/posts/{id}/cancel", h.adminGBPAuth(h.adminGBPCancelPost))
		mux.HandleFunc("POST /admin/gbp/posts/now", h.adminGBPAuth(h.adminGBPPostNow))
		mux.HandleFunc("POST /admin/gbp/location", h.adminGBPAuth(h.adminGBPSetLocation))
		mux.HandleFunc("GET /admin/gbp/auth", h.adminGBPStartAuth)
		mux.HandleFunc("GET /admin/gbp/callback", h.adminGBPCallback)
	})
}

// adminGBPAuth checks GBP_ADMIN_TOKEN via cookie or ?token= query param.
func (h *Handler) adminGBPAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.URL.Query().Get("token")
		if token == "" {
			if c, err := r.Cookie("gbp_admin"); err == nil {
				token = c.Value
			}
		}
		if token != h.gbp.AdminToken {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprint(w, gbpLoginPage)
			return
		}
		http.SetCookie(w, &http.Cookie{
			Name:     "gbp_admin",
			Value:    token,
			Path:     "/admin/gbp",
			MaxAge:   86400 * 7,
			HttpOnly: true,
			SameSite: http.SameSiteStrictMode,
		})
		next(w, r)
	}
}

func (h *Handler) adminGBP(w http.ResponseWriter, r *http.Request) {
	flash := r.URL.Query().Get("flash")
	authorised := h.gbp.IsAuthorised()
	configured := h.gbp.IsConfigured()
	posts := h.gbp.Posts()
	myt := time.FixedZone("MYT", 8*3600)

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("X-Robots-Tag", "noindex")

	fmt.Fprint(w, `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>GBP Scheduler — Pelangi Admin</title>
<style>
*{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:0;padding:1.5rem;background:#f5f5f5;color:#1a1a1a}
h1{font-size:1.4rem;margin:0 0 1rem}h2{font-size:1.1rem;margin:1.5rem 0 .5rem}
.card{background:#fff;border:1px solid #e0e0e0;border-radius:8px;padding:1.2rem;margin-bottom:1rem}
.badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:.75rem;font-weight:600}
.badge-ok{background:#d1fae5;color:#065f46}.badge-warn{background:#fef3c7;color:#92400e}
.badge-err{background:#fee2e2;color:#991b1b}.badge-grey{background:#f3f4f6;color:#374151}
label{display:block;font-size:.85rem;color:#555;margin-bottom:3px}
input[type=text],input[type=date],input[type=time],textarea,select{
  width:100%;padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.9rem;
  background:#fff;color:#111;margin-bottom:10px}
textarea{min-height:90px;resize:vertical}
button{padding:8px 18px;border-radius:6px;border:none;cursor:pointer;font-size:.88rem;font-weight:600}
.btn-primary{background:#2563eb;color:#fff}.btn-danger{background:#dc2626;color:#fff}
.btn-sm{padding:4px 12px;font-size:.8rem}.flash{background:#d1fae5;border:1px solid #6ee7b7;
  border-radius:6px;padding:.7rem 1rem;margin-bottom:1rem;font-size:.9rem}
table{width:100%;border-collapse:collapse;font-size:.85rem}
th{text-align:left;font-weight:600;color:#555;padding:6px 10px;border-bottom:1px solid #e0e0e0}
td{padding:6px 10px;border-bottom:1px solid #f0f0f0;vertical-align:top}
.text-preview{max-width:380px;white-space:pre-wrap;word-break:break-word}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
</style></head><body>`)

	fmt.Fprint(w, `<h1>🗓️ GBP Post Scheduler</h1>`)

	if flash != "" {
		fmt.Fprintf(w, `<div class="flash">%s</div>`, html.EscapeString(flash))
	}

	// ── Status bar ──────────────────────────────────────────────────────────
	authBadge := `<span class="badge badge-err">Not authorised</span>`
	if authorised {
		authBadge = `<span class="badge badge-ok">Authorised ✓</span>`
	}
	cfgBadge := `<span class="badge badge-warn">Location not set</span>`
	if configured {
		cfgBadge = fmt.Sprintf(`<span class="badge badge-ok">Location set ✓</span>
      <small style="color:#555;font-size:.78rem">%s</small>`, html.EscapeString(h.gbp.LocationName()))
	}
	fmt.Fprintf(w, `<div class="card" style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap">
  <div>Google OAuth: %s</div>
  <div>Location: %s</div>
  %s
</div>`, authBadge, cfgBadge,
		func() string {
			if !authorised {
				return `<a href="/admin/gbp/auth" style="margin-left:auto"><button class="btn-primary">Connect Google Account →</button></a>`
			}
			return ""
		}())

	// ── Location setup ───────────────────────────────────────────────────────
	if authorised && !configured {
		fmt.Fprintf(w, `<div class="card">
<h2>Set GBP Location</h2>
<p style="font-size:.85rem;color:#555;margin:0 0 .8rem">Find your account and location IDs from
<a href="https://business.google.com" target="_blank">Google Business Profile</a> or the
<a href="https://developers.google.com/my-business/reference/rest/v4/accounts/list" target="_blank">API Explorer</a>.
Format: <code>accounts/123456789012345</code> and <code>accounts/123.../locations/456...</code></p>
<form method="POST" action="/admin/gbp/location">
  <div class="row2">
    <div><label>Account name</label><input type="text" name="account" placeholder="accounts/123456789012345" value="%s" required></div>
    <div><label>Location name</label><input type="text" name="location" placeholder="accounts/123.../locations/456..." value="%s" required></div>
  </div>
  <button type="submit" class="btn-primary">Save Location</button>
</form></div>`, html.EscapeString(h.gbp.AccountName()), html.EscapeString(h.gbp.LocationName()))
	}

	if configured {
		// ── Quick update form (location already set, show compact edit) ──────
		fmt.Fprintf(w, `<details style="margin-bottom:.5rem;font-size:.82rem"><summary style="cursor:pointer;color:#2563eb">Change location…</summary>
<div class="card" style="margin-top:.5rem">
<form method="POST" action="/admin/gbp/location">
  <div class="row2">
    <div><label>Account name</label><input type="text" name="account" value="%s" required></div>
    <div><label>Location name</label><input type="text" name="location" value="%s" required></div>
  </div>
  <button type="submit" class="btn-primary btn-sm">Update</button>
</form></div></details>`, html.EscapeString(h.gbp.AccountName()), html.EscapeString(h.gbp.LocationName()))
	}

	if configured {
		// ── Post Now ────────────────────────────────────────────────────────
		fmt.Fprint(w, `<div class="card">
<h2>Post Now</h2>
<form method="POST" action="/admin/gbp/posts/now">
  <label>Post text (max 1500 chars)</label>
  <textarea name="text" placeholder="July is durian season in JB — roadside stalls from RM10 a portion…&#10;Pods from RM35/night this weekend. pelangicapsulehostel.com or WhatsApp 012-708 8789." maxlength="1500"></textarea>
  <button type="submit" class="btn-primary">Post to GBP now</button>
</form></div>`)

		// ── Schedule post ────────────────────────────────────────────────────
		now := time.Now().In(myt)
		defaultDate := now.Format("2006-01-02")
		defaultTime := now.Add(5 * time.Minute).Format("15:04")
		fmt.Fprintf(w, `<div class="card">
<h2>Schedule a Post</h2>
<form method="POST" action="/admin/gbp/posts">
  <label>Post text (max 1500 chars)</label>
  <textarea name="text" maxlength="1500" placeholder="Write your GBP update here…"></textarea>
  <div class="row2">
    <div><label>Date (MYT)</label><input type="date" name="scheduled_date" value="%s" required></div>
    <div><label>Time (MYT, 24h)</label><input type="time" name="scheduled_time" value="%s" required></div>
  </div>
  <button type="submit" class="btn-primary">Schedule post</button>
</form></div>`, defaultDate, defaultTime)
	}

	// ── Posts table ──────────────────────────────────────────────────────────
	if len(posts) > 0 {
		fmt.Fprint(w, `<div class="card"><h2>Scheduled &amp; Recent Posts</h2>
<table><thead><tr><th>Status</th><th>Scheduled (MYT)</th><th>Text</th><th>Action</th></tr></thead><tbody>`)
		for _, p := range posts {
			statusBadge := map[gbp.PostStatus]string{
				gbp.StatusPending:   `<span class="badge badge-warn">pending</span>`,
				gbp.StatusPosted:    `<span class="badge badge-ok">posted ✓</span>`,
				gbp.StatusFailed:    `<span class="badge badge-err">failed</span>`,
				gbp.StatusCancelled: `<span class="badge badge-grey">cancelled</span>`,
			}[p.Status]

			extra := ""
			if p.Status == gbp.StatusFailed && p.Error != "" {
				extra = fmt.Sprintf(`<br><small style="color:#dc2626">%s</small>`, html.EscapeString(p.Error))
			}
			if p.Status == gbp.StatusPosted && p.GBPPostName != "" {
				extra = fmt.Sprintf(`<br><small style="color:#059669">%s</small>`, html.EscapeString(p.GBPPostName))
			}

			action := ""
			if p.Status == gbp.StatusPending {
				action = fmt.Sprintf(`<form method="POST" action="/admin/gbp/posts/%s/cancel">
  <button type="submit" class="btn-danger btn-sm">Cancel</button></form>`, p.ID)
			}

			fmt.Fprintf(w, `<tr>
  <td>%s%s</td>
  <td style="white-space:nowrap">%s</td>
  <td class="text-preview">%s</td>
  <td>%s</td>
</tr>`, statusBadge, extra,
				p.ScheduledAt.In(myt).Format("2 Jan 06 15:04"),
				html.EscapeString(truncate(p.Text, 120)),
				action)
		}
		fmt.Fprint(w, `</tbody></table></div>`)
	}

	fmt.Fprint(w, `</body></html>`)
}

func (h *Handler) adminGBPStartAuth(w http.ResponseWriter, r *http.Request) {
	state := fmt.Sprintf("%d", time.Now().UnixNano())
	http.Redirect(w, r, h.gbp.AuthURL(state), http.StatusFound)
}

func (h *Handler) adminGBPCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "missing code", http.StatusBadRequest)
		return
	}
	if err := h.gbp.ExchangeCode(code); err != nil {
		http.Error(w, "OAuth failed: "+err.Error(), 500)
		return
	}
	http.Redirect(w, r, "/admin/gbp?flash=Authorised+successfully", http.StatusFound)
}

func (h *Handler) adminGBPCreatePost(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "bad form", 400)
		return
	}
	text := strings.TrimSpace(r.FormValue("text"))
	dateStr := r.FormValue("scheduled_date")
	timeStr := r.FormValue("scheduled_time")
	myt := time.FixedZone("MYT", 8*3600)
	scheduledAt, err := time.ParseInLocation("2006-01-02 15:04", dateStr+" "+timeStr, myt)
	if err != nil {
		http.Redirect(w, r, "/admin/gbp?flash=Invalid+date%2Ftime", http.StatusSeeOther)
		return
	}
	if _, err := h.gbp.AddPost(text, scheduledAt); err != nil {
		http.Redirect(w, r, "/admin/gbp?flash="+gbpEsc(err.Error()), http.StatusSeeOther)
		return
	}
	http.Redirect(w, r, "/admin/gbp?flash=Post+scheduled", http.StatusSeeOther)
}

func (h *Handler) adminGBPPostNow(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "bad form", 400)
		return
	}
	text := strings.TrimSpace(r.FormValue("text"))
	postName, err := h.gbp.PostNow(text)
	if err != nil {
		http.Redirect(w, r, "/admin/gbp?flash="+gbpEsc("Error: "+err.Error()), http.StatusSeeOther)
		return
	}
	http.Redirect(w, r, "/admin/gbp?flash=Posted%3A+"+gbpEsc(postName), http.StatusSeeOther)
}

func (h *Handler) adminGBPCancelPost(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if err := h.gbp.CancelPost(id); err != nil {
		http.Redirect(w, r, "/admin/gbp?flash="+gbpEsc(err.Error()), http.StatusSeeOther)
		return
	}
	http.Redirect(w, r, "/admin/gbp?flash=Post+cancelled", http.StatusSeeOther)
}

func (h *Handler) adminGBPSetLocation(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		http.Error(w, "bad form", 400)
		return
	}
	account := strings.TrimSpace(r.FormValue("account"))
	location := strings.TrimSpace(r.FormValue("location"))
	if err := h.gbp.SetLocation(account, location); err != nil {
		http.Redirect(w, r, "/admin/gbp?flash="+gbpEsc(err.Error()), http.StatusSeeOther)
		return
	}
	http.Redirect(w, r, "/admin/gbp?flash=Location+saved", http.StatusSeeOther)
}

// gbpEsc minimal-escapes a string for use in a URL query value.
func gbpEsc(s string) string {
	s = strings.ReplaceAll(s, " ", "+")
	s = strings.ReplaceAll(s, ":", "%3A")
	s = strings.ReplaceAll(s, "/", "%2F")
	return s
}

func truncate(s string, n int) string {
	if len(s) <= n {
		return s
	}
	return s[:n] + "…"
}

const gbpLoginPage = `<!doctype html><html><head><meta charset="utf-8"><title>GBP Admin</title>
<style>body{font-family:system-ui,sans-serif;padding:2rem;background:#f5f5f5}
.card{background:#fff;border-radius:8px;padding:1.5rem;max-width:360px;margin:3rem auto;border:1px solid #e0e0e0}
label{display:block;font-size:.85rem;color:#555;margin-bottom:4px}
input{width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.9rem;margin-bottom:12px}
button{background:#2563eb;color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-weight:600}
</style></head><body>
<div class="card"><h2 style="margin-top:0">GBP Admin Login</h2>
<form method="GET"><label>Admin token</label>
<input name="token" type="password" autofocus placeholder="Enter GBP_ADMIN_TOKEN">
<button type="submit">Enter →</button></form></div></body></html>`
