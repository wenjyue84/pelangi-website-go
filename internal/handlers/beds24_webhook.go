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

	"pelangi-website/internal/db"
)

// firstStr returns the first present key's value from m, stringified
// (handles string and JSON-number values).
func firstStr(m map[string]any, keys ...string) string {
	for _, k := range keys {
		if v, ok := m[k]; ok && v != nil {
			switch t := v.(type) {
			case string:
				if t != "" {
					return t
				}
			case float64:
				return fmt.Sprintf("%.0f", t)
			default:
				return fmt.Sprintf("%v", t)
			}
		}
	}
	return ""
}

// beds24Webhook serves POST /api/webhooks/beds24, ported from
// site/src/app/api/webhooks/beds24/route.ts.
//
// Verifies x-beds24-signature (HMAC-SHA256 of raw body with BEDS24_WEBHOOK_SECRET).
// availability_update → fires Rainbow AI KB re-sync (replaces Next.js ISR revalidation).
// booking_created / booking_cancelled → TODO no-op (DB persistence not yet ported).
func (h *Handler) beds24Webhook(w http.ResponseWriter, r *http.Request) {
	secret := os.Getenv("BEDS24_WEBHOOK_SECRET")
	if secret == "" {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "Webhook secret not configured"})
		return
	}

	rawBody, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Processing failed"})
		return
	}

	sig := r.Header.Get("x-beds24-signature")
	if !beds24ValidateSig(rawBody, sig, secret) {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		return
	}

	var payload struct {
		EventType string          `json:"eventType"`
		Data      json.RawMessage `json:"data"`
	}
	if err := json.Unmarshal(rawBody, &payload); err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Processing failed"})
		return
	}

	switch payload.EventType {
	case "availability_update":
		// In Next.js this revalidated ISR caches; Go serves fresh per request,
		// so we trigger Rainbow AI KB re-sync instead.
		go notifyRainbowKbChange()

	case "booking_created", "booking_cancelled":
		if db.Configured() {
			var d map[string]any
			_ = json.Unmarshal(payload.Data, &d)
			bid := firstStr(d, "externalBookingId", "bookId", "id")
			roomID := firstStr(d, "roomId")
			status := firstStr(d, "status")
			if err := db.InsertChannelBooking(r.Context(), payload.EventType, bid, roomID, status, string(payload.Data)); err != nil {
				log.Printf("[beds24-webhook] DB insert failed: %v", err)
			}
		} else {
			log.Printf("[beds24-webhook] %s received — DATABASE_URL not set, skipping persistence", payload.EventType)
		}

	default:
		// Unknown event type; ack silently.
	}

	writeJSON(w, http.StatusOK, map[string]string{"status": "processed"})
}

// beds24ValidateSig verifies HMAC-SHA256(secret, body) == signature (constant-time).
func beds24ValidateSig(body []byte, signature, secret string) bool {
	if signature == "" {
		return false
	}
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write(body)
	expected := hex.EncodeToString(mac.Sum(nil))
	return hmac.Equal([]byte(signature), []byte(expected))
}
