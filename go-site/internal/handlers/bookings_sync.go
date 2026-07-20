package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"os"
	"time"
)

const beds24DefaultBase = "https://api.beds24.com/v2"

// bookingsSyncPost serves POST /api/bookings/sync, ported from
// site/src/app/api/bookings/sync/route.ts.
// Validates the booking, determines room/rate, and syncs to Beds24 putBooking.
func (h *Handler) bookingsSyncPost(w http.ResponseWriter, r *http.Request) {
	var body struct {
		CheckIn    string `json:"checkIn"`
		CheckOut   string `json:"checkOut"`
		RoomType   string `json:"roomType"`
		GuestName  string `json:"guestName"`
		GuestEmail string `json:"guestEmail"`
		GuestPhone string `json:"guestPhone"`
		Adults     int    `json:"adults"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
		return
	}
	if body.CheckIn == "" || body.CheckOut == "" || body.RoomType == "" ||
		body.GuestName == "" || body.GuestEmail == "" || body.GuestPhone == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Missing fields"})
		return
	}

	checkin, err1 := time.Parse("2006-01-02", body.CheckIn)
	checkout, err2 := time.Parse("2006-01-02", body.CheckOut)
	if err1 != nil || err2 != nil || !checkout.After(checkin) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid dates"})
		return
	}
	// Both pod types share the same nightly pricing: a flat RM35 every day
	// (2026-07-20 revision, unified from RM30 weekday / RM35 weekend).
	// RoomType only picks the Beds24 room.
	totalPrice := 0
	for d := checkin; d.Before(checkout); d = d.AddDate(0, 0, 1) {
		totalPrice += 35
	}

	roomID := "standard-capsule"
	if body.RoomType == "Premium Capsule Pod" {
		roomID = "premium-capsule"
	}
	if body.Adults <= 0 {
		body.Adults = 1
	}

	apiKey := os.Getenv("BEDS24_API_KEY")
	propID := os.Getenv("BEDS24_PROPERTY_ID")
	if apiKey == "" || propID == "" {
		// Not configured: mirrors beds24Client.syncBooking returning false.
		writeJSON(w, http.StatusOK, map[string]any{"success": false, "synced": false})
		return
	}
	baseURL := os.Getenv("BEDS24_API_BASE_URL")
	if baseURL == "" {
		baseURL = beds24DefaultBase
	}

	reqBody, _ := json.Marshal(map[string]any{
		"apiKey":     apiKey,
		"propid":     propID,
		"guestName":  body.GuestName,
		"guestEmail": body.GuestEmail,
		"guestPhone": body.GuestPhone,
		"checkin":    body.CheckIn,
		"checkout":   body.CheckOut,
		"roomId":     roomID,
		"noOfGuests": body.Adults,
		"status":     "confirmed",
		"totalPrice": totalPrice,
	})

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Post(baseURL+"/putBooking", "application/json", bytes.NewReader(reqBody))
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed"})
		return
	}
	defer resp.Body.Close()
	synced := resp.StatusCode < 300
	writeJSON(w, http.StatusOK, map[string]any{"success": synced, "synced": synced})
}

// bookingsSyncGet serves GET /api/bookings/sync?action=check&checkin=...&checkout=...&roomId=...
// Returns availability for the requested room from Beds24 (or a placeholder if unconfigured).
func (h *Handler) bookingsSyncGet(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	if q.Get("action") != "check" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid action"})
		return
	}
	checkin := q.Get("checkin")
	checkout := q.Get("checkout")
	roomID := q.Get("roomId")
	if checkin == "" || checkout == "" || roomID == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Missing params"})
		return
	}

	apiKey := os.Getenv("BEDS24_API_KEY")
	propID := os.Getenv("BEDS24_PROPERTY_ID")
	if apiKey == "" || propID == "" {
		if p := beds24Placeholder(checkin, checkout, roomID); p != nil {
			writeJSON(w, http.StatusOK, p)
		} else {
			writeJSON(w, http.StatusNotFound, map[string]bool{"available": false})
		}
		return
	}

	baseURL := os.Getenv("BEDS24_API_BASE_URL")
	if baseURL == "" {
		baseURL = beds24DefaultBase
	}
	params := url.Values{}
	params.Set("apiKey", apiKey)
	params.Set("propid", propID)
	params.Set("checkin", checkin)
	params.Set("checkout", checkout)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(baseURL + "/getAvailability?" + params.Encode())
	if err != nil {
		if p := beds24Placeholder(checkin, checkout, roomID); p != nil {
			writeJSON(w, http.StatusOK, p)
		} else {
			writeJSON(w, http.StatusNotFound, map[string]bool{"available": false})
		}
		return
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)

	// Parse Beds24 response: {"roomtypes":[{id,name,available,totalInventory,rate},...]}
	var apiResp struct {
		RoomTypes []struct {
			ID             string `json:"id"`
			RoomID         string `json:"roomId"`
			Available      int    `json:"available"`
			TotalInventory int    `json:"totalInventory"`
			Total          int    `json:"total"`
			Rate           int    `json:"rate"`
		} `json:"roomtypes"`
	}
	if err := json.Unmarshal(raw, &apiResp); err != nil || len(apiResp.RoomTypes) == 0 {
		if p := beds24Placeholder(checkin, checkout, roomID); p != nil {
			writeJSON(w, http.StatusOK, p)
		} else {
			writeJSON(w, http.StatusNotFound, map[string]bool{"available": false})
		}
		return
	}

	for _, room := range apiResp.RoomTypes {
		id := room.ID
		if id == "" {
			id = room.RoomID
		}
		if id == roomID {
			total := room.TotalInventory
			if total == 0 {
				total = room.Total
			}
			writeJSON(w, http.StatusOK, map[string]any{
				"available":      room.Available > 0,
				"availableUnits": room.Available,
				"totalUnits":     total,
				"rate":           room.Rate,
				"currency":       "MYR",
			})
			return
		}
	}

	writeJSON(w, http.StatusNotFound, map[string]bool{"available": false})
}

// beds24Placeholder returns fallback availability when Beds24 is unconfigured or
// unreachable, mirroring beds24Client.placeholderAvailability in the TS codebase.
// Returns nil if roomID is unknown.
func beds24Placeholder(checkin, checkout, roomID string) map[string]any {
	nights := 1
	ci, e1 := time.Parse("2006-01-02", checkin)
	co, e2 := time.Parse("2006-01-02", checkout)
	if e1 == nil && e2 == nil && co.After(ci) {
		nights = int(co.Sub(ci).Hours() / 24)
	}
	type room struct{ available, total, nightly int }
	rooms := map[string]room{
		"standard-capsule": {18, 18, 45},
		"premium-capsule":  {6, 6, 35},
	}
	rm, ok := rooms[roomID]
	if !ok {
		return nil
	}
	return map[string]any{
		"available":      true,
		"availableUnits": rm.available,
		"totalUnits":     rm.total,
		"rate":           rm.nightly * nights,
		"currency":       "MYR",
	}
}
