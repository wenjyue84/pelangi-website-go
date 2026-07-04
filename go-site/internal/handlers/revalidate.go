package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

// revalidate serves POST /api/revalidate, ported from
// site/src/app/api/revalidate/route.ts.
//
// The Go server renders every page fresh per request (no ISR), so there is no
// cache to purge — but the endpoint preserves the contract (secret auth, body
// validation, response shape) and still fires the Rainbow AI KB re-sync that
// the original triggered, so the integration is unchanged.
func (h *Handler) revalidate(w http.ResponseWriter, r *http.Request) {
	secret := os.Getenv("REVALIDATE_SECRET")
	if secret == "" {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Revalidation endpoint is not configured"})
		return
	}
	if r.Header.Get("x-revalidate-secret") != secret {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		return
	}

	var body struct {
		Path string `json:"path"`
		Tag  string `json:"tag"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid JSON body"})
		return
	}
	if body.Path == "" && body.Tag == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Request body must include 'path' and/or 'tag'"})
		return
	}
	if body.Path != "" && !strings.HasPrefix(body.Path, "/") {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Path must start with '/'"})
		return
	}

	// Fire-and-forget: notify Rainbow AI to re-sync its KB.
	go notifyRainbowKbChange()

	result := map[string]any{"revalidated": true}
	if body.Path != "" {
		result["path"] = body.Path
	}
	if body.Tag != "" {
		result["tag"] = body.Tag
	}
	writeJSON(w, http.StatusOK, result)
}

// notifyRainbowKbChange POSTs to Rainbow AI's KB sync endpoint (best-effort).
func notifyRainbowKbChange() {
	rainbow := os.Getenv("RAINBOW_API_URL")
	if rainbow == "" {
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	payload := []byte(`{"source":"revalidate-webhook","ts":"` + time.Now().UTC().Format(time.RFC3339) + `"}`)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, rainbow+"/api/rainbow/knowledge-base/sync", bytes.NewReader(payload))
	if err != nil {
		return
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("[revalidate] Rainbow AI KB sync error: %v", err)
		return
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 300 {
		log.Printf("[revalidate] Rainbow AI KB sync failed: HTTP %d", resp.StatusCode)
	}
}
