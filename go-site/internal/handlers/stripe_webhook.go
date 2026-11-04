package handlers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"pelangi-website/internal/db"
)

// stripeWebhook serves POST /api/stripe-webhook, ported from
// site/src/app/api/stripe-webhook/route.ts.
//
// Verifies the Stripe-Signature header using the v1 HMAC-SHA256 scheme:
// signed payload = "{timestamp}.{raw body}", secret = STRIPE_WEBHOOK_SECRET.
// Rejects if timestamp skew > 5 min. DB persistence is a TODO no-op.
func (h *Handler) stripeWebhook(w http.ResponseWriter, r *http.Request) {
	webhookSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	if webhookSecret == "" {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Webhook secret not configured"})
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Cannot read body"})
		return
	}

	sig := r.Header.Get("Stripe-Signature")
	if sig == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Missing stripe-signature header"})
		return
	}

	// Parse Stripe-Signature: "t=TIMESTAMP,v1=HEX,v1=HEX2,..."
	var tsRaw string
	var v1Sigs []string
	for _, part := range strings.Split(sig, ",") {
		kv := strings.SplitN(strings.TrimSpace(part), "=", 2)
		if len(kv) != 2 {
			continue
		}
		switch kv[0] {
		case "t":
			tsRaw = kv[1]
		case "v1":
			v1Sigs = append(v1Sigs, kv[1])
		}
	}
	ts, _ := strconv.ParseInt(tsRaw, 10, 64)
	if ts == 0 || len(v1Sigs) == 0 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid stripe-signature header"})
		return
	}
	skew := time.Now().Unix() - ts
	if skew < -300 || skew > 300 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Webhook timestamp too old or in future"})
		return
	}

	// Compute HMAC-SHA256 of "{ts}.{body}" and compare with any v1 value.
	signed := fmt.Sprintf("%d.%s", ts, string(body))
	mac := hmac.New(sha256.New, []byte(webhookSecret))
	_, _ = mac.Write([]byte(signed))
	expected := hex.EncodeToString(mac.Sum(nil))
	matched := false
	for _, got := range v1Sigs {
		if hmac.Equal([]byte(got), []byte(expected)) {
			matched = true
			break
		}
	}
	if !matched {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Webhook signature verification failed"})
		return
	}

	// Decode event envelope.
	var event struct {
		ID   string `json:"id"`
		Type string `json:"type"`
		Data struct {
			Object json.RawMessage `json:"object"`
		} `json:"data"`
	}
	if err := json.Unmarshal(body, &event); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid event JSON"})
		return
	}

	// If DATABASE_URL is not set, ack so Stripe doesn't retry forever (no persistence, no email).
	if !db.Configured() {
		log.Printf("[stripe-webhook] DATABASE_URL not set — skipping persistence for event %s", event.ID)
		writeJSON(w, http.StatusOK, map[string]bool{"received": true})
		return
	}

	// Extract common fields from payment_intent events.
	var pi struct {
		ID           string `json:"id"`
		Amount       int    `json:"amount"`
		Currency     string `json:"currency"`
		ReceiptEmail string `json:"receipt_email"`
		Status       string `json:"status"`
		Metadata     struct {
			GuestEmail string `json:"guestEmail"`
			GuestName  string `json:"guestName"`
			CheckIn    string `json:"checkIn"`
			CheckOut   string `json:"checkOut"`
		} `json:"metadata"`
	}
	var amountPtr *int
	var piID, currency, guestEmail, guestName, status string
	if event.Type == "payment_intent.succeeded" || event.Type == "payment_intent.payment_failed" {
		if jsonErr := json.Unmarshal(event.Data.Object, &pi); jsonErr == nil {
			piID = pi.ID
			a := pi.Amount
			amountPtr = &a
			currency = pi.Currency
			guestEmail = pi.Metadata.GuestEmail
			if guestEmail == "" {
				guestEmail = pi.ReceiptEmail
			}
			guestName = pi.Metadata.GuestName
			status = pi.Status
		}
	}

	// Persist with idempotency guard (ON CONFLICT DO NOTHING). 500 → Stripe retries.
	firstDelivery, dbErr := db.InsertStripeEvent(r.Context(), event.ID, event.Type, piID, amountPtr, currency, guestEmail, guestName, status, string(body))
	if dbErr != nil {
		log.Printf("[stripe-webhook] DB insert failed: %v", dbErr)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Database error"})
		return
	}

	// On first delivery of payment_intent.succeeded: confirm to guest, alert owner.
	if event.Type == "payment_intent.succeeded" && firstDelivery {
		name := guestName
		if name == "" {
			name = "Guest"
		}
		amountRM := "0.00"
		if amountPtr != nil {
			amountRM = fmt.Sprintf("%.2f", float64(*amountPtr)/100)
		}
		if guestEmail != "" {
			go stripeWebhookSendConfirmation(os.Getenv("RESEND_API_KEY"), guestEmail, name, amountRM, pi.Metadata.CheckIn, pi.Metadata.CheckOut)
		}
		go stripeWebhookNotifyOwner(os.Getenv("RESEND_API_KEY"), name, guestEmail, amountRM, pi.Metadata.CheckIn, pi.Metadata.CheckOut, piID)
	}

	writeJSON(w, http.StatusOK, map[string]bool{"received": true})
}

// stripeWebhookNotifyOwner emails ADMIN_EMAIL recipients about a successful payment.
func stripeWebhookNotifyOwner(resendKey, name, guestEmail, amountRM, checkIn, checkOut, piID string) {
	admins := adminRecipients()
	if resendKey == "" || len(admins) == 0 {
		log.Println("[stripe-webhook] RESEND_API_KEY/ADMIN_EMAIL not set — skipping owner alert")
		return
	}
	row := func(label, val string) string {
		if val == "" {
			return ""
		}
		return `<tr><td style="padding:8px 0;color:#78716c;width:140px;">` + label + `</td><td style="padding:8px 0;color:#1c1917;">` + htmlEscape(val) + `</td></tr>`
	}
	stay := ""
	if checkIn != "" && checkOut != "" {
		stay = checkIn + " → " + checkOut
	}
	html := `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;">` +
		`<h2 style="color:#292524;">💳 Payment received</h2>` +
		`<table style="width:100%;border-collapse:collapse;">` +
		row("Guest", name) + row("Email", guestEmail) +
		`<tr><td style="padding:8px 0;color:#78716c;width:140px;">Amount</td><td style="padding:8px 0;color:#1c1917;font-weight:600;">RM ` + htmlEscape(amountRM) + `</td></tr>` +
		row("Stay dates", stay) + row("Payment intent", piID) +
		`</table></div>`
	msg := resendEmail{
		From:    "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>",
		To:      admins,
		Subject: "💳 Payment received RM " + amountRM + " — " + name,
		HTML:    html,
	}
	if guestEmail != "" {
		msg.ReplyTo = guestEmail
	}
	if err := resendSend(resendKey, msg); err != nil {
		log.Printf("[stripe-webhook] Owner alert email failed: %v", err)
	}
}

func stripeWebhookSendConfirmation(resendKey, emailTo, name, amountRM, checkIn, checkOut string) {
	if resendKey == "" {
		log.Println("[stripe-webhook] RESEND_API_KEY not set — skipping confirmation email")
		return
	}
	stayRow := ""
	if checkIn != "" && checkOut != "" {
		stayRow = `<tr><td style="padding:8px 0;color:#78716c;width:140px;">Stay dates</td>` +
			`<td style="padding:8px 0;color:#1c1917;">` + htmlEscape(checkIn) + ` → ` + htmlEscape(checkOut) + `</td></tr>`
	}
	html := `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1c1917;">` +
		`<div style="text-align:center;padding:32px 0 24px;">` +
		`<h1 style="margin:0;font-size:24px;color:#292524;">Pelangi Capsule Hostel</h1>` +
		`<p style="margin:8px 0 0;color:#78716c;">26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru</p>` +
		`</div><div style="padding:24px;background:#fafaf9;border-radius:12px;">` +
		`<p>Hi ` + htmlEscape(name) + `,</p>` +
		`<p>We've received your payment. See details below:</p>` +
		`<table style="width:100%;border-collapse:collapse;">` +
		`<tr><td style="padding:8px 0;color:#78716c;width:140px;">Amount paid</td>` +
		`<td style="padding:8px 0;color:#1c1917;font-weight:600;">RM ` + amountRM + `</td></tr>` +
		stayRow + `</table>` +
		`<p style="margin-top:16px;">Travelling into Malaysia? Immigration may ask for proof of accommodation — ` +
		`<a href="https://pelangicapsulehostel.com/accommodation-proof" style="color:#b45309;">get a printable accommodation confirmation</a> ` +
		`using your booking reference and last name.</p>` +
		`<p style="margin-top:16px;">We look forward to hosting you at <strong>Pelangi Capsule Hostel</strong>!</p>` +
		`<p style="margin-bottom:0;">If you have any questions, WhatsApp us at ` +
		`<a href="https://wa.me/60103084289" style="color:#b45309;">+60 10-308 4289</a>.</p>` +
		`</div><p style="text-align:center;font-size:12px;color:#a8a29e;margin-top:24px;">` +
		`26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia</p></div>`
	if err := resendSend(resendKey, resendEmail{
		From:    "Pelangi Capsule Hostel <noreply@pelangicapsulehostel.com>",
		To:      []string{emailTo},
		Subject: "Payment confirmed — Pelangi Capsule Hostel",
		HTML:    html,
	}); err != nil {
		log.Printf("[stripe-webhook] Confirmation email failed: %v", err)
	}
}
