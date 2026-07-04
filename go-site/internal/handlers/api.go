package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"pelangi-website/internal/beds24"
	"pelangi-website/internal/data"
)

// ariRate is the rate block in the ARI response.
type ariRate struct {
	Nightly  int    `json:"nightly"`
	Total    int    `json:"total"`
	Currency string `json:"currency"`
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

	nights := int(co.Sub(ci).Hours() / 24)
	if nights < 1 {
		nights = 1
	}

	avail := beds24.CachedAvailability(checkin, checkout)
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
		if available < 0 {
			available = 0
		}
		rooms = append(rooms, ariRoom{
			RoomID:         room.ID,
			RoomName:       room.Name,
			Description:    room.Description,
			MaxOccupancy:   room.MaxOccupancy,
			TotalInventory: total,
			AvailableUnits: available,
			Rate: ariRate{
				Nightly:  room.NightlyRate,
				Total:    room.NightlyRate * nights,
				Currency: currency,
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
