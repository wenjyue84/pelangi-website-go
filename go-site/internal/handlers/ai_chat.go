package handlers

// AI chat proxy for the website chat widget (Beta).
//
// The widget POSTs {message} to /api/ai-chat; we forward it to the Rainbow AI
// engine (rainbow-core-go) running on the same box and return {reply, ok}.
// Keeping this server-side means the browser never sees the Rainbow host or any
// admin key, and the endpoint stays same-origin for the widget.
//
// Env:
//   RAINBOW_CHAT_URL  — Rainbow /chat endpoint (default http://127.0.0.1:3003/chat)
//   RAINBOW_CHAT_KEY  — optional x-admin-key header value (only sent if set)
//   RAINBOW_CHAT_PROFILE — profile id (default "pelangi")

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"
	"time"
)

func rainbowChatURL() string {
	if v := os.Getenv("RAINBOW_CHAT_URL"); v != "" {
		return v
	}
	return "http://127.0.0.1:3003/chat"
}

func rainbowChatProfile() string {
	if v := os.Getenv("RAINBOW_CHAT_PROFILE"); v != "" {
		return v
	}
	return "pelangi"
}

// aiChat handles POST /api/ai-chat — the website AI assistant (Beta).
func (h *Handler) aiChat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var in struct {
		Message string `json:"message"`
	}
	if err := json.NewDecoder(io.LimitReader(r.Body, 8192)).Decode(&in); err != nil || in.Message == "" {
		w.WriteHeader(http.StatusBadRequest)
		_ = json.NewEncoder(w).Encode(map[string]any{"ok": false, "error": "message required"})
		return
	}

	payload, _ := json.Marshal(map[string]string{
		"message": in.Message,
		"profile": rainbowChatProfile(),
	})

	req, err := http.NewRequestWithContext(r.Context(), http.MethodPost, rainbowChatURL(), bytes.NewReader(payload))
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		_ = json.NewEncoder(w).Encode(map[string]any{"ok": false, "error": "ai unavailable"})
		return
	}
	req.Header.Set("Content-Type", "application/json")
	if key := os.Getenv("RAINBOW_CHAT_KEY"); key != "" {
		req.Header.Set("x-admin-key", key)
	}

	client := &http.Client{Timeout: 40 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		_ = json.NewEncoder(w).Encode(map[string]any{"ok": false, "error": "ai unreachable"})
		return
	}
	defer resp.Body.Close()

	var up struct {
		Reply string `json:"reply"`
		OK    bool   `json:"ok"`
	}
	if err := json.NewDecoder(io.LimitReader(resp.Body, 1<<20)).Decode(&up); err != nil || up.Reply == "" {
		w.WriteHeader(http.StatusBadGateway)
		_ = json.NewEncoder(w).Encode(map[string]any{"ok": false, "error": "ai no reply"})
		return
	}

	_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "reply": up.Reply})
}
