package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

var metaAllowedEvents = map[string]bool{
	"PageView":    true,
	"ViewContent": true,
	"Contact":     true,
}

// metaEvents serves POST /api/meta-events, ported from
// site/src/app/api/meta-events/route.ts.
// Hashes PII (email via sha256Hex, phone via digitsOnly+sha256Hex), passes
// fbc/fbp through, then forwards to Meta Conversions API v21.0 in a
// best-effort goroutine. Returns immediately with {success:true,deferred:true}.
func (h *Handler) metaEvents(w http.ResponseWriter, r *http.Request) {
	pixelID := os.Getenv("FACEBOOK_PIXEL_ID")
	accessToken := os.Getenv("FACEBOOK_ACCESS_TOKEN")
	if pixelID == "" || accessToken == "" {
		// Not configured — silently succeed, same as TS route.
		writeJSON(w, http.StatusOK, map[string]any{"success": true, "skipped": true})
		return
	}

	var body struct {
		EventName      string         `json:"event_name"`
		EventID        string         `json:"event_id"`
		EventSourceURL string         `json:"event_source_url"`
		UserData       struct {
			Em  string `json:"em"`
			Ph  string `json:"ph"`
			Fbc string `json:"fbc"`
			Fbp string `json:"fbp"`
		} `json:"user_data"`
		CustomData map[string]any `json:"custom_data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON body"})
		return
	}
	if body.EventName == "" || body.EventID == "" || body.EventSourceURL == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Missing required fields: event_name, event_id, event_source_url"})
		return
	}
	if !metaAllowedEvents[body.EventName] {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Event name must be one of: PageView, ViewContent, Contact"})
		return
	}

	ip := clientIP(r)
	ua := r.Header.Get("User-Agent")

	userData := map[string]string{
		"client_ip_address": ip,
		"client_user_agent": ua,
	}
	if body.UserData.Em != "" {
		userData["em"] = sha256Hex(body.UserData.Em)
	}
	if body.UserData.Ph != "" {
		if d := digitsOnly(body.UserData.Ph); d != "" {
			userData["ph"] = sha256Hex(d)
		}
	}
	if body.UserData.Fbc != "" {
		userData["fbc"] = body.UserData.Fbc
	}
	if body.UserData.Fbp != "" {
		userData["fbp"] = body.UserData.Fbp
	}

	event := map[string]any{
		"event_name":       body.EventName,
		"event_time":       time.Now().Unix(),
		"event_id":         body.EventID,
		"event_source_url": body.EventSourceURL,
		"action_source":    "website",
		"user_data":        userData,
	}
	if len(body.CustomData) > 0 {
		event["custom_data"] = body.CustomData
	}
	payload, _ := json.Marshal(map[string]any{"data": []any{event}})
	apiURL := "https://graph.facebook.com/v21.0/" + pixelID + "/events?access_token=" + accessToken

	go func() {
		req, err := http.NewRequest(http.MethodPost, apiURL, bytes.NewReader(payload))
		if err != nil {
			return
		}
		req.Header.Set("Content-Type", "application/json")
		client := &http.Client{Timeout: 10 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("[meta-capi] Network error: %v", err)
			return
		}
		defer resp.Body.Close()
		if resp.StatusCode >= 300 {
			b, _ := io.ReadAll(resp.Body)
			log.Printf("[meta-capi] API error: %d %s", resp.StatusCode, string(b))
		}
	}()

	writeJSON(w, http.StatusOK, map[string]any{"success": true, "deferred": true})
}
