package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"
)

const maxAmountSen = 500000 // RM5,000 cap

var allowedRoomTypes = map[string]bool{"Capsule Pod": true, "Monthly Capsule Pod": true}

// createPaymentIntent serves POST /api/create-payment-intent, ported from
// site/src/app/api/create-payment-intent/route.ts. Calls the Stripe REST API
// directly (no SDK) to create an FPX PaymentIntent in MYR.
func (h *Handler) createPaymentIntent(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Amount     int    `json:"amount"`
		RoomType   string `json:"roomType"`
		CheckIn    string `json:"checkIn"`
		CheckOut   string `json:"checkOut"`
		GuestName  string `json:"guestName"`
		GuestEmail string `json:"guestEmail"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON body"})
		return
	}

	if body.Amount <= 0 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "amount must be a positive integer (sen)"})
		return
	}
	if body.Amount > maxAmountSen {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "amount must not exceed 500000 sen (RM5,000)"})
		return
	}
	if !isISODate(body.CheckIn) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "checkIn must be a date in YYYY-MM-DD format"})
		return
	}
	if !isISODate(body.CheckOut) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "checkOut must be a date in YYYY-MM-DD format"})
		return
	}
	if body.CheckOut <= body.CheckIn {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "checkOut must be strictly after checkIn"})
		return
	}
	if !allowedRoomTypes[body.RoomType] {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "roomType must be one of: Capsule Pod, Monthly Capsule Pod"})
		return
	}
	if strings.TrimSpace(body.GuestName) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "guestName is required"})
		return
	}
	if len(body.GuestName) > 64 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "guestName must be 64 characters or fewer"})
		return
	}
	if body.GuestEmail != "" && !strings.Contains(body.GuestEmail, "@") {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "guestEmail must be a valid email address"})
		return
	}

	secret := os.Getenv("STRIPE_SECRET_KEY")
	if secret == "" {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Payments are not configured"})
		return
	}

	form := url.Values{}
	form.Set("amount", strconv.Itoa(body.Amount))
	form.Set("currency", "myr")
	form.Add("payment_method_types[]", "fpx")
	form.Set("metadata[roomType]", body.RoomType)
	form.Set("metadata[checkIn]", body.CheckIn)
	form.Set("metadata[checkOut]", body.CheckOut)
	form.Set("metadata[guestName]", body.GuestName)
	if body.GuestEmail != "" {
		form.Set("metadata[guestEmail]", body.GuestEmail)
	}

	req, _ := http.NewRequest(http.MethodPost, "https://api.stripe.com/v1/payment_intents", strings.NewReader(form.Encode()))
	req.Header.Set("Authorization", "Bearer "+secret)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	client := &http.Client{Timeout: 20 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to create payment intent"})
		return
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)

	var pi struct {
		ID           string `json:"id"`
		ClientSecret string `json:"client_secret"`
		Error        struct {
			Message string `json:"message"`
		} `json:"error"`
	}
	_ = json.Unmarshal(raw, &pi)
	if resp.StatusCode >= 300 || pi.ClientSecret == "" {
		msg := pi.Error.Message
		if msg == "" {
			msg = "Failed to create payment intent"
		}
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": msg})
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"clientSecret":    pi.ClientSecret,
		"paymentIntentId": pi.ID,
	})
}

func isISODate(s string) bool {
	_, err := time.Parse("2006-01-02", s)
	return err == nil
}
