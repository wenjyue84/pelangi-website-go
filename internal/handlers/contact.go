package handlers

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"
)

// contact serves POST /api/contact, ported from site/src/app/actions/contact.ts
// (the Next server action). Accepts form-encoded or JSON; returns JSON
// { success, message, fieldErrors? } that the contact page's fetch() consumes.
func (h *Handler) contactSubmit(w http.ResponseWriter, r *http.Request) {
	get := contactFieldGetter(r)

	// Honeypot — bots fill "website"; return fake success.
	if strings.TrimSpace(get("website")) != "" {
		writeJSON(w, http.StatusOK, contactResult{Success: true, Message: "Thank you! We'll be in touch soon."})
		return
	}

	// Cloudflare Turnstile.
	token := get("cf-turnstile-response")
	if token == "" {
		writeJSON(w, http.StatusOK, contactResult{Success: false, Message: "Please complete the security check before submitting."})
		return
	}
	if !verifyTurnstile(token) {
		writeJSON(w, http.StatusOK, contactResult{Success: false, Message: "Security check failed. Please refresh the page and try again."})
		return
	}

	name := strings.TrimSpace(get("name"))
	email := strings.TrimSpace(get("email"))
	phone := strings.TrimSpace(get("phone"))
	checkIn := strings.TrimSpace(get("checkIn"))
	checkOut := strings.TrimSpace(get("checkOut"))
	guests := strings.TrimSpace(get("guests"))
	message := strings.TrimSpace(get("message"))

	fe := map[string]string{}
	if name == "" {
		fe["name"] = "Please enter your full name."
	}
	if !strings.Contains(email, "@") {
		if email != "" {
			fe["email"] = "It looks like '@' is missing. Did you mean " + email + "@gmail.com?"
		} else {
			fe["email"] = "Please enter a valid email address (e.g. you@example.com)."
		}
	}
	if phone != "" {
		d := digitsOnly(phone)
		if len(d) < 8 || len(d) > 15 {
			fe["phone"] = "Please enter a valid phone number with country code (e.g. +60 12-345 6789)."
		}
	}
	const dateLayout = "2006-01-02"
	var ci time.Time
	if checkIn != "" {
		t, err := time.Parse(dateLayout, checkIn)
		today := time.Now().Truncate(24 * time.Hour)
		if err != nil {
			fe["checkIn"] = "Please enter a valid check-in date in YYYY-MM-DD format (e.g. 2026-04-01)."
		} else if t.Before(today) {
			fe["checkIn"] = "Check-in date cannot be in the past. Please select today or a future date."
		} else {
			ci = t
		}
	}
	if checkOut != "" {
		t, err := time.Parse(dateLayout, checkOut)
		if err != nil {
			fe["checkOut"] = "Please enter a valid check-out date in YYYY-MM-DD format (e.g. 2026-04-03)."
		} else if !ci.IsZero() && !t.After(ci) {
			fe["checkOut"] = "Check-out date must be after your check-in date."
		}
	}
	if message == "" {
		fe["message"] = "Please enter a message describing your inquiry."
	}
	if len(fe) > 0 {
		writeJSON(w, http.StatusOK, contactResult{Success: false, Message: "Please correct the errors below.", FieldErrors: fe})
		return
	}

	// Rate limit: 3 per IP per hour.
	if !contactRL.allow(clientIP(r)) {
		writeJSON(w, http.StatusOK, contactResult{Success: false, Message: "You've sent too many inquiries recently. Please try again in an hour."})
		return
	}

	email = strings.ToLower(email)
	resendKey := os.Getenv("RESEND_API_KEY")
	admins := adminRecipients()
	if resendKey == "" || len(admins) == 0 {
		writeJSON(w, http.StatusOK, contactResult{Success: false, Message: "Our contact form is temporarily unavailable. Please WhatsApp us at +60 12-708 8789."})
		return
	}

	// Admin notification (blocking).
	adminHTML := buildAdminEmailHTML(name, email, phone, checkIn, checkOut, guests, message)
	if err := resendSend(resendKey, resendEmail{
		From: "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>", To: admins,
		Subject: "New inquiry from " + name, HTML: adminHTML, ReplyTo: email,
	}); err != nil {
		writeJSON(w, http.StatusOK, contactResult{Success: false, Message: "Something went wrong. Please try again or WhatsApp us at +60 12-708 8789."})
		return
	}

	// Guest auto-reply + Meta CAPI (deferred, best-effort).
	go func() {
		_ = resendSend(resendKey, resendEmail{
			From: "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>", To: []string{email},
			Subject: "We received your inquiry — Pelangi Capsule Hostel", HTML: buildGuestAutoReplyHTML(name),
		})
		sendMetaContactEvent(email, phone)
	}()

	writeJSON(w, http.StatusOK, contactResult{Success: true, Message: "Thank you! We've received your inquiry and will respond within 24 hours. Check your email for a confirmation."})
}

type contactResult struct {
	Success     bool              `json:"success"`
	Message     string            `json:"message"`
	FieldErrors map[string]string `json:"fieldErrors,omitempty"`
}

// contactFieldGetter returns a function reading a field from JSON or form body.
func contactFieldGetter(r *http.Request) func(string) string {
	ct := r.Header.Get("Content-Type")
	if strings.Contains(ct, "application/json") {
		var m map[string]any
		_ = json.NewDecoder(r.Body).Decode(&m)
		return func(k string) string {
			if v, ok := m[k]; ok {
				if s, ok := v.(string); ok {
					return s
				}
			}
			return ""
		}
	}
	_ = r.ParseMultipartForm(1 << 20)
	_ = r.ParseForm()
	return func(k string) string { return r.FormValue(k) }
}

var digitsRE = regexp.MustCompile(`\D`)

func digitsOnly(s string) string { return digitsRE.ReplaceAllString(s, "") }

// ─── Turnstile ─────────────────────────────────────────────────────────────

func verifyTurnstile(token string) bool {
	secret := os.Getenv("TURNSTILE_SECRET_KEY")
	if secret == "" {
		// No secret configured: allow (dev parity). In prod, set the env var.
		return true
	}
	if strings.TrimSpace(token) == "" {
		return false
	}
	resp, err := http.PostForm("https://challenges.cloudflare.com/turnstile/v0/siteverify",
		url.Values{"secret": {secret}, "response": {token}})
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	var out struct {
		Success bool `json:"success"`
	}
	if json.NewDecoder(resp.Body).Decode(&out) != nil {
		return false
	}
	return out.Success
}

// adminRecipients parses ADMIN_EMAIL as a comma-separated list of addresses.
func adminRecipients() []string {
	var out []string
	for _, a := range strings.Split(os.Getenv("ADMIN_EMAIL"), ",") {
		if a = strings.TrimSpace(a); a != "" {
			out = append(out, a)
		}
	}
	return out
}

// ─── Resend ────────────────────────────────────────────────────────────────

type resendEmail struct {
	From    string   `json:"from"`
	To      []string `json:"to"`
	Subject string   `json:"subject"`
	HTML    string   `json:"html"`
	ReplyTo string   `json:"reply_to,omitempty"`
}

func resendSend(apiKey string, e resendEmail) error {
	body, _ := json.Marshal(e)
	req, err := http.NewRequest(http.MethodPost, "https://api.resend.com/emails", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{Timeout: 15 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 300 {
		return &httpStatusError{resp.StatusCode}
	}
	return nil
}

type httpStatusError struct{ code int }

func (e *httpStatusError) Error() string { return "resend: HTTP " + http.StatusText(e.code) }

func htmlEscape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}

func buildAdminEmailHTML(name, email, phone, checkIn, checkOut, guests, message string) string {
	row := func(label, val string) string {
		if val == "" {
			return ""
		}
		return `<tr><td style="padding:8px 0;color:#78716c;">` + label + `</td><td style="padding:8px 0;color:#1c1917;">` + val + `</td></tr>`
	}
	return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#292524;">New Contact Inquiry</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px 0;color:#78716c;width:120px;">Name</td><td style="padding:8px 0;color:#1c1917;">` + htmlEscape(name) + `</td></tr>
    <tr><td style="padding:8px 0;color:#78716c;">Email</td><td style="padding:8px 0;color:#1c1917;"><a href="mailto:` + htmlEscape(email) + `">` + htmlEscape(email) + `</a></td></tr>
    ` + row("Phone", htmlEscape(phone)) + row("Check-in", htmlEscape(checkIn)) + row("Check-out", htmlEscape(checkOut)) + row("Guests", htmlEscape(guests)) + `
  </table>
  <div style="margin-top:16px;padding:16px;background:#fafaf9;border-radius:8px;">
    <p style="margin:0 0 4px;color:#78716c;font-size:14px;">Message</p>
    <p style="margin:0;color:#1c1917;white-space:pre-wrap;">` + htmlEscape(message) + `</p>
  </div>
</div>`
}

func buildGuestAutoReplyHTML(name string) string {
	return `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1c1917;">
  <div style="text-align:center;padding:32px 0 24px;">
    <h1 style="margin:0;font-size:24px;color:#292524;">Pelangi Capsule Hostel</h1>
    <p style="margin:8px 0 0;color:#78716c;">Taman Pelangi, Johor Bahru</p>
  </div>
  <div style="padding:24px;background:#fafaf9;border-radius:12px;">
    <p>Hi ` + htmlEscape(name) + `,</p>
    <p>Thank you for reaching out! We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
    <p>In the meantime, you can:</p>
    <ul style="padding-left:20px;line-height:1.8;">
      <li><a href="https://www.booking.com/hotel/my/pelangi-hostel-capsule.html" style="color:#b45309;">Book directly on Booking.com</a></li>
      <li>WhatsApp us at <a href="https://wa.me/60127088789" style="color:#b45309;">+60 12-708 8789</a></li>
    </ul>
    <p style="margin-bottom:0;">We look forward to hosting you!</p>
  </div>
  <p style="text-align:center;font-size:12px;color:#a8a29e;margin-top:24px;">26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia</p>
</div>`
}

// ─── Meta CAPI Contact event ───────────────────────────────────────────────

func sha256Hex(v string) string {
	sum := sha256.Sum256([]byte(strings.ToLower(strings.TrimSpace(v))))
	return hex.EncodeToString(sum[:])
}

func sendMetaContactEvent(email, phone string) {
	pixelID := os.Getenv("FACEBOOK_PIXEL_ID")
	token := os.Getenv("FACEBOOK_ACCESS_TOKEN")
	if pixelID == "" || token == "" {
		return
	}
	userData := map[string]string{}
	if email != "" {
		userData["em"] = sha256Hex(email)
	}
	if d := digitsOnly(phone); d != "" {
		userData["ph"] = sha256Hex(d)
	}
	payload := map[string]any{"data": []map[string]any{{
		"event_name":       "Contact",
		"event_time":       time.Now().Unix(),
		"event_source_url": "https://pelangicapsulehostel.com/contact",
		"action_source":    "website",
		"user_data":        userData,
	}}}
	body, _ := json.Marshal(payload)
	_, _ = http.Post("https://graph.facebook.com/v21.0/"+pixelID+"/events?access_token="+token,
		"application/json", bytes.NewReader(body))
}

// ─── rate limiter (3/hour per IP) ──────────────────────────────────────────

type contactLimiter struct {
	mu    sync.Mutex
	store map[string][]time.Time
}

var contactRL = &contactLimiter{store: map[string][]time.Time{}}

func (l *contactLimiter) allow(ip string) bool {
	const limit = 3
	const window = time.Hour
	now := time.Now()
	l.mu.Lock()
	defer l.mu.Unlock()
	kept := l.store[ip][:0]
	for _, t := range l.store[ip] {
		if now.Sub(t) < window {
			kept = append(kept, t)
		}
	}
	if len(kept) >= limit {
		l.store[ip] = kept
		return false
	}
	l.store[ip] = append(kept, now)
	return true
}
