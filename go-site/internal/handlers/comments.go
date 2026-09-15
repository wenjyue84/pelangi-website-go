package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"

	"pelangi-website/internal/db"
)

// ─── helpers ──────────────────────────────────────────────────────────────────

// clientIP extracts the real client IP from X-Forwarded-For (set by Cloudflare)
// or falls back to RemoteAddr.  Defined in middleware.go, shared here.

// ─── registration ─────────────────────────────────────────────────────────────

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("POST /api/comments", h.createComment)
		mux.HandleFunc("GET /api/comments", h.listComments)
		mux.HandleFunc("DELETE /api/comments/{id}", h.deleteComment)
	})
}

// ─── POST /api/comments ───────────────────────────────────────────────────────

type commentCreateReq struct {
	Slug       string `json:"slug"`
	AuthorName string `json:"author_name"`
	Text       string `json:"comment_text"`
}

type commentCreateResp struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
	ID      int    `json:"id,omitempty"`
}

func (h *Handler) createComment(w http.ResponseWriter, r *http.Request) {
	if !db.Configured() {
		writeJSON(w, http.StatusServiceUnavailable, commentCreateResp{Message: "Comments are temporarily unavailable."})
		return
	}

	// Parse body — accept JSON only.
	var req commentCreateReq
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, commentCreateResp{Message: "Invalid request body."})
		return
	}

	slug := strings.TrimSpace(req.Slug)
	author := strings.TrimSpace(req.AuthorName)
	text := strings.TrimSpace(req.Text)

	// Validation.
	if slug == "" {
		writeJSON(w, http.StatusBadRequest, commentCreateResp{Message: "Missing post slug."})
		return
	}
	if author == "" {
		writeJSON(w, http.StatusBadRequest, commentCreateResp{Message: "Please enter a display name."})
		return
	}
	if utf8.RuneCountInString(author) > 80 {
		writeJSON(w, http.StatusBadRequest, commentCreateResp{Message: "Display name must be 80 characters or fewer."})
		return
	}
	textLen := utf8.RuneCountInString(text)
	if textLen < 5 {
		writeJSON(w, http.StatusBadRequest, commentCreateResp{Message: "Comment must be at least 5 characters."})
		return
	}
	if textLen > 1000 {
		writeJSON(w, http.StatusBadRequest, commentCreateResp{Message: "Comment must be 1,000 characters or fewer."})
		return
	}

	ip := clientIP(r)

	// IP rate limit: max 3 per 24 h.
	count, err := db.CountRecentByIP(r.Context(), ip)
	if err != nil {
		log.Printf("comments: count recent by IP: %v", err)
		writeJSON(w, http.StatusInternalServerError, commentCreateResp{Message: "Something went wrong. Please try again."})
		return
	}
	if count >= 3 {
		writeJSON(w, http.StatusTooManyRequests, commentCreateResp{Message: "You've reached the comment limit (3 per 24 hours). Please try again later."})
		return
	}

	id, _, err := db.InsertComment(r.Context(), slug, author, text, ip)
	if err != nil {
		log.Printf("comments: insert: %v", err)
		writeJSON(w, http.StatusInternalServerError, commentCreateResp{Message: "Failed to save comment. Please try again."})
		return
	}

	writeJSON(w, http.StatusOK, commentCreateResp{Success: true, ID: id})
}

// ─── GET /api/comments?slug=xxx ───────────────────────────────────────────────

type commentItem struct {
	ID         int    `json:"id"`
	AuthorName string `json:"author_name"`
	Text       string `json:"comment_text"`
	CreatedAt  string `json:"created_at"` // RFC3339
}

type commentListResp struct {
	Comments []commentItem `json:"comments"`
}

func (h *Handler) listComments(w http.ResponseWriter, r *http.Request) {
	slug := strings.TrimSpace(r.URL.Query().Get("slug"))
	if slug == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "slug query param required"})
		return
	}
	if !db.Configured() {
		writeJSON(w, http.StatusOK, commentListResp{Comments: []commentItem{}})
		return
	}

	comments, err := db.ListComments(r.Context(), slug)
	if err != nil {
		log.Printf("comments: list: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to load comments."})
		return
	}

	items := make([]commentItem, len(comments))
	for i, c := range comments {
		items[i] = commentItem{
			ID:         c.ID,
			AuthorName: c.AuthorName,
			Text:       c.CommentText,
			CreatedAt:  c.CreatedAt.UTC().Format(time.RFC3339),
		}
	}
	w.Header().Set("Cache-Control", "no-store")
	writeJSON(w, http.StatusOK, commentListResp{Comments: items})
}

// ─── DELETE /api/comments/{id}?token=ADMIN_TOKEN ──────────────────────────────

func (h *Handler) deleteComment(w http.ResponseWriter, r *http.Request) {
	adminToken := os.Getenv("COMMENT_ADMIN_TOKEN")
	if adminToken == "" {
		writeJSON(w, http.StatusForbidden, map[string]string{"error": "Admin token not configured."})
		return
	}
	if r.URL.Query().Get("token") != adminToken {
		writeJSON(w, http.StatusForbidden, map[string]string{"error": "Invalid admin token."})
		return
	}

	idStr := r.PathValue("id")
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid comment id."})
		return
	}

	if !db.Configured() {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"error": "Comments unavailable."})
		return
	}

	found, err := db.SoftDeleteComment(r.Context(), id)
	if err != nil {
		log.Printf("comments: soft delete %d: %v", id, err)
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to delete comment."})
		return
	}
	if !found {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Comment not found."})
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"deleted": true})
}
