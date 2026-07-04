package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"time"
)

var (
	tiktokAllowedEvents = map[string]bool{
		"ViewContent": true,
		"Contact":     true,
		"Search":      true,
	}
	sha256HexRE = regexp.MustCompile(`^[a-fA-F0-9]{64}$`)
)

// tiktokEvents serves POST /api/tiktok-events, ported from
// site/src/app/api/tiktok-events/route.ts.
// Accepts email/phone either pre-hashed (64-char hex) or plaintext — hashes
// plaintext values before forwarding to TikTok Events API v1.3.
func (h *Handler) tiktokEvents(w http.ResponseWriter, r *http.Request) {
	pixelCode := os.Getenv("TIKTOK_PIXEL_ID")
	accessToken := os.Getenv("TIKTOK_ACCESS_TOKEN")
	if pixelCode == "" || accessToken == "" {
		writeJSON(w, http.StatusOK, map[string]any{"success": true, "skipped": true})
		return
	}

	var body struct {
		Event    string `json:"event"`
		EventID  string `json:"event_id"`
		URL      string `json:"url"`
		UserData struct {
			Em string `json:"em"`
			Ph string `json:"ph"`
		} `json:"user_data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON body"})
		return
	}
	if body.Event == "" || body.EventID == "" || body.URL == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Missing required fields: event, event_id, url"})
		return
	}
	if !tiktokAllowedEvents[body.Event] {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Event must be one of: ViewContent, Contact, Search"})
		return
	}

	ip := clientIP(r)
	ua := r.Header.Get("User-Agent")

	ctx := map[string]any{
		"user_agent": ua,
		"ip":         ip,
		"page":       map[string]string{"url": body.URL},
	}

	user := map[string]string{}
	if body.UserData.Em != "" {
		if sha256HexRE.MatchString(body.UserData.Em) {
			user["email"] = body.UserData.Em
		} else {
			user["email"] = sha256Hex(body.UserData.Em)
		}
	}
	if body.UserData.Ph != "" {
		if sha256HexRE.MatchString(body.UserData.Ph) {
			user["phone_number"] = body.UserData.Ph
		} else {
			user["phone_number"] = sha256Hex(body.UserData.Ph)
		}
	}

	ev := map[string]any{
		"pixel_code": pixelCode,
		"event":      body.Event,
		"event_id":   body.EventID,
		"timestamp":  time.Now().UTC().Format(time.RFC3339),
		"context":    ctx,
	}
	if len(user) > 0 {
		ev["user"] = user
	}

	payload, _ := json.Marshal(map[string]any{"data": []any{ev}})
	tok := accessToken

	go func() {
		req, err := http.NewRequest(http.MethodPost,
			"https://business-api.tiktok.com/open_api/v1.3/event/track/",
			bytes.NewReader(payload))
		if err != nil {
			return
		}
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Access-Token", tok)
		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("[tiktok-events] Network error: %v", err)
			return
		}
		defer resp.Body.Close()
		if resp.StatusCode >= 300 {
			b, _ := io.ReadAll(resp.Body)
			log.Printf("[tiktok-events] API error: %d %s", resp.StatusCode, string(b))
		}
	}()

	writeJSON(w, http.StatusOK, map[string]any{"success": true, "deferred": true})
}
