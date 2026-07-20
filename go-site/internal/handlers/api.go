package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"pelangi-website/internal/beds24"
	"pelangi-website/internal/data"
)

// ariRate is the rate block in the ARI response. Nightly is the weekday
// ("from") rate; Total is the exact weekend-aware sum for the stay, so on
// mixed stays Nightly × nights ≠ Total — the breakdown fields explain why.
type ariRate struct {
	Nightly       int    `json:"nightly"`
	Total         int    `json:"total"`
	Currency      string `json:"currency"`
	WeekdayRate   int    `json:"weekday_rate"`
	WeekendRate   int    `json:"weekend_rate"`
	WeekdayNights int    `json:"weekday_nights"`
	WeekendNights int    `json:"weekend_nights"`
}

// countStayNights splits a stay into weekday and weekend nights. Weekend
// nights are Friday and Saturday nights. Pricing is a flat RM35 every day
// (2026-07-20), so the split now only feeds the informational breakdown fields.
func countStayNights(ci, co time.Time) (weekday, weekend int) {
	for d := ci; d.Before(co); d = d.AddDate(0, 0, 1) {
		switch d.Weekday() {
		case time.Friday, time.Saturday:
			weekend++
		default:
			weekday++
		}
	}
	return
}

// pmsAvailableBeds asks the local PMS gateway (source of truth for real
// occupancy) how many beds are free for the stay. Returns ok=false when the
// gateway is unreachable or the response is malformed.
func pmsAvailableBeds(checkin, checkout string) (int, bool) {
	base := os.Getenv("PMS2_API_URL")
	if base == "" {
		return 0, false
	}
	client := &http.Client{Timeout: 3 * time.Second}
	resp, err := client.Get(base + "/api/public/availability?checkIn=" + checkin + "&checkOut=" + checkout)
	if err != nil {
		return 0, false
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return 0, false
	}
	var body struct {
		Data struct {
			AvailableCount *int `json:"availableCount"`
		} `json:"data"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil || body.Data.AvailableCount == nil {
		return 0, false
	}
	return *body.Data.AvailableCount, true
}

// ariRoom is one room entry in the ARI response.
type ariRoom struct {
	RoomID         string   `json:"room_id"`
	RoomName       string   `json:"room_name"`
	Description    string   `json:"description"`
	MaxOccupancy   int      `json:"max_occupancy"`
	TotalInventory int      `json:"total_inventory"`
	AvailableUnits int      `json:"available_units"`
	Rate           ariRate  `json:"rate"`
	Amenities      []string `json:"amenities"`
}

// ariResponse is the full ARI (Availability, Rates, Inventory) payload consumed
// by connectivity partners (Google Free Booking Links via Beds24).
type ariResponse struct {
	PropertyID   string    `json:"property_id"`
	PropertyName string    `json:"property_name"`
	Checkin      string    `json:"checkin"`
	Checkout     string    `json:"checkout"`
	Nights       int       `json:"nights"`
	Currency     string    `json:"currency"`
	Timezone     string    `json:"timezone"`
	CheckinTime  string    `json:"checkin_time"`
	CheckoutTime string    `json:"checkout_time"`
	Rooms        []ariRoom `json:"rooms"`
	BookingURL   string    `json:"booking_url"`
	UpdatedAt    string    `json:"updated_at"`
}

// ari serves /api/ari, ported from site/src/app/api/ari/route.ts.
func (h *Handler) ari(w http.ResponseWriter, r *http.Request) {
	// Optional API-key gate (ARI_API_KEY env var).
	if key := os.Getenv("ARI_API_KEY"); key != "" {
		if r.Header.Get("x-api-key") != key {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
			return
		}
	}

	q := r.URL.Query()
	checkin := q.Get("checkin")
	checkout := q.Get("checkout")
	// Only MYR is supported.
	currency := "MYR"

	if checkin == "" || checkout == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{
			"error": "checkin and checkout query parameters are required (YYYY-MM-DD)",
		})
		return
	}

	const layout = "2006-01-02"
	ci, err1 := time.Parse(layout, checkin)
	co, err2 := time.Parse(layout, checkout)
	if err1 != nil || err2 != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid date format. Use YYYY-MM-DD."})
		return
	}
	if !co.After(ci) {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "checkout must be after checkin"})
		return
	}
	// Bounds (hunt 2026-07-11): past check-ins and multi-year ranges previously
	// returned nominal availability from the fallback path.
	if checkin < data.TodayMYT() {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "checkin must be today or later"})
		return
	}
	if co.Sub(ci).Hours() > 365*24 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "stay cannot exceed 365 nights"})
		return
	}

	nights := int(co.Sub(ci).Hours() / 24)
	if nights < 1 {
		nights = 1
	}

	avail := beds24.CachedAvailability(checkin, checkout)

	// When the channel manager has no data, fall back to the PMS gateway's
	// real-occupancy count instead of pretending the full inventory is free.
	// The PMS returns one pooled bed count; allocate it lower-deck first.
	pmsAvail, pmsOK := -1, false
	if avail == nil {
		pmsAvail, pmsOK = pmsAvailableBeds(checkin, checkout)
	}
	pmsRemaining := pmsAvail

	weekdayNights, weekendNights := countStayNights(ci, co)

	rooms := make([]ariRoom, 0, len(data.RoomTypes))
	for _, room := range data.RoomTypes {
		available := room.TotalUnits
		total := room.TotalUnits
		for _, a := range avail {
			if a.RoomID == room.ID {
				available = a.Available
				total = a.Total
				break
			}
		}
		if avail == nil && pmsOK {
			available = pmsRemaining
			if available > room.TotalUnits {
				available = room.TotalUnits
			}
			pmsRemaining -= available
		}
		if available < 0 {
			available = 0
		}
		weekendRate := room.WeekendRate
		if weekendRate == 0 {
			weekendRate = room.NightlyRate
		}
		rooms = append(rooms, ariRoom{
			RoomID:         room.ID,
			RoomName:       room.Name,
			Description:    room.Description,
			MaxOccupancy:   room.MaxOccupancy,
			TotalInventory: total,
			AvailableUnits: available,
			Rate: ariRate{
				Nightly:       room.NightlyRate,
				Total:         room.NightlyRate*weekdayNights + weekendRate*weekendNights,
				Currency:      currency,
				WeekdayRate:   room.NightlyRate,
				WeekendRate:   weekendRate,
				WeekdayNights: weekdayNights,
				WeekendNights: weekendNights,
			},
			Amenities: room.Amenities,
		})
	}

	resp := ariResponse{
		PropertyID:   data.Property.ID,
		PropertyName: data.Property.Name,
		Checkin:      checkin,
		Checkout:     checkout,
		Nights:       nights,
		Currency:     currency,
		Timezone:     data.Property.Timezone,
		CheckinTime:  data.Property.CheckinTime,
		CheckoutTime: data.Property.CheckoutTime,
		Rooms:        rooms,
		BookingURL:   "https://pelangicapsulehostel.com/book?checkin=" + checkin + "&checkout=" + checkout,
		UpdatedAt:    time.Now().UTC().Format(time.RFC3339),
	}

	w.Header().Set("Cache-Control", "public, max-age=300, s-maxage=300")
	writeJSON(w, http.StatusOK, resp)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	enc := json.NewEncoder(w)
	enc.SetEscapeHTML(false) // match JSON.stringify (no & in URLs etc.)
	_ = enc.Encode(v)
}
