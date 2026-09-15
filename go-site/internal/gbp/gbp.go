// Package gbp provides Google Business Profile post scheduling.
// OAuth 2.0 (web application flow) — requires GBP_CLIENT_ID and
// GBP_CLIENT_SECRET env vars pointing to a GCP OAuth client that has
// the "Google Business Profile API" enabled and the callback URL added
// as an authorised redirect URI.
package gbp

import (
	"bytes"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"sync"
	"time"
)

const (
	oauthAuthURL  = "https://accounts.google.com/o/oauth2/v2/auth"
	oauthTokenURL = "https://oauth2.googleapis.com/token"
	// Business Profile API scopes.
	scopeGBP = "https://www.googleapis.com/auth/business.manage"
	// GBP REST endpoints (v4 — still operational as of 2026).
	gbpBase = "https://mybusiness.googleapis.com/v4"
)

// PostStatus represents the lifecycle of a scheduled post.
type PostStatus string

const (
	StatusPending   PostStatus = "pending"
	StatusPosted    PostStatus = "posted"
	StatusFailed    PostStatus = "failed"
	StatusCancelled PostStatus = "cancelled"
)

// ScheduledPost is a GBP post queued for future publication.
type ScheduledPost struct {
	ID          string     `json:"id"`
	Text        string     `json:"text"`
	ScheduledAt time.Time  `json:"scheduled_at"` // MYT
	Status      PostStatus `json:"status"`
	PostedAt    *time.Time `json:"posted_at,omitempty"`
	Error       string     `json:"error,omitempty"`
	GBPPostName string     `json:"gbp_post_name,omitempty"` // returned by API
	CreatedAt   time.Time  `json:"created_at"`
}

// store holds the persistent state written to disk as JSON.
type store struct {
	Posts        []ScheduledPost `json:"posts"`
	AccessToken  string          `json:"access_token"`
	RefreshToken string          `json:"refresh_token"`
	TokenExpiry  time.Time       `json:"token_expiry"`
	// Full resource names, e.g. "accounts/12345678901234" and
	// "accounts/12345678901234/locations/987654321012345".
	AccountName  string `json:"account_name"`
	LocationName string `json:"location_name"`
}

// Service is the public handle for GBP scheduling.
type Service struct {
	mu           sync.Mutex
	dataPath     string
	st           store
	clientID     string
	clientSecret string
	callbackURL  string
	AdminToken   string
	mytZone      *time.Location
}

// NewServiceFromEnv reads GBP_* env vars and returns nil (not an error) when
// the integration is not configured so the rest of the server still starts.
func NewServiceFromEnv() (*Service, error) {
	clientID := os.Getenv("GBP_CLIENT_ID")
	clientSecret := os.Getenv("GBP_CLIENT_SECRET")
	if clientID == "" || clientSecret == "" {
		return nil, nil
	}

	dataPath := os.Getenv("GBP_DATA_FILE")
	if dataPath == "" {
		dataPath = "data/gbp.json"
	}
	if err := os.MkdirAll(filepath.Dir(dataPath), 0o700); err != nil {
		return nil, fmt.Errorf("gbp: mkdir %s: %w", filepath.Dir(dataPath), err)
	}

	callbackURL := os.Getenv("GBP_CALLBACK_URL")
	if callbackURL == "" {
		callbackURL = "http://localhost:3000/admin/gbp/callback"
	}

	adminToken := os.Getenv("GBP_ADMIN_TOKEN")
	if adminToken == "" {
		adminToken = "pelangi-" + randHex(8)
		log.Printf("GBP_ADMIN_TOKEN not set — generated: %s (set env var to persist)", adminToken)
	}

	svc := &Service{
		dataPath:     dataPath,
		clientID:     clientID,
		clientSecret: clientSecret,
		callbackURL:  callbackURL,
		AdminToken:   adminToken,
		mytZone:      time.FixedZone("MYT", 8*3600),
	}
	if err := svc.load(); err != nil && !os.IsNotExist(err) {
		return nil, fmt.Errorf("gbp: load store: %w", err)
	}
	return svc, nil
}

// StartScheduler runs a background goroutine that fires due posts every 5 min.
func (s *Service) StartScheduler() {
	go func() {
		ticker := time.NewTicker(5 * time.Minute)
		defer ticker.Stop()
		// Fire once on startup too.
		s.runDue()
		for range ticker.C {
			s.runDue()
		}
	}()
}

// runDue publishes any pending posts whose scheduled time has passed.
func (s *Service) runDue() {
	s.mu.Lock()
	now := time.Now().In(s.mytZone)
	var due []int
	for i, p := range s.st.Posts {
		if p.Status == StatusPending && !p.ScheduledAt.After(now) {
			due = append(due, i)
		}
	}
	s.mu.Unlock()

	for _, idx := range due {
		s.mu.Lock()
		post := s.st.Posts[idx]
		s.mu.Unlock()

		postName, err := s.createPost(post.Text)
		s.mu.Lock()
		now2 := time.Now()
		if err != nil {
			log.Printf("gbp: publish %s failed: %v", post.ID, err)
			s.st.Posts[idx].Status = StatusFailed
			s.st.Posts[idx].Error = err.Error()
		} else {
			log.Printf("gbp: published %s → %s", post.ID, postName)
			s.st.Posts[idx].Status = StatusPosted
			s.st.Posts[idx].PostedAt = &now2
			s.st.Posts[idx].GBPPostName = postName
		}
		_ = s.save()
		s.mu.Unlock()
	}
}

// ─── Store ───────────────────────────────────────────────────────────────────

func (s *Service) load() error {
	b, err := os.ReadFile(s.dataPath)
	if err != nil {
		return err
	}
	return json.Unmarshal(b, &s.st)
}

func (s *Service) save() error {
	b, err := json.MarshalIndent(s.st, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.dataPath, b, 0o600)
}

// ─── OAuth ───────────────────────────────────────────────────────────────────

// AuthURL returns the Google OAuth 2.0 consent URL.
func (s *Service) AuthURL(state string) string {
	v := url.Values{}
	v.Set("client_id", s.clientID)
	v.Set("redirect_uri", s.callbackURL)
	v.Set("response_type", "code")
	v.Set("scope", scopeGBP)
	v.Set("access_type", "offline")
	v.Set("prompt", "consent") // force refresh_token every time
	v.Set("state", state)
	return oauthAuthURL + "?" + v.Encode()
}

// ExchangeCode trades an authorization code for tokens and persists them.
func (s *Service) ExchangeCode(code string) error {
	body := url.Values{}
	body.Set("code", code)
	body.Set("client_id", s.clientID)
	body.Set("client_secret", s.clientSecret)
	body.Set("redirect_uri", s.callbackURL)
	body.Set("grant_type", "authorization_code")

	resp, err := http.PostForm(oauthTokenURL, body)
	if err != nil {
		return fmt.Errorf("token exchange: %w", err)
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return fmt.Errorf("token exchange %d: %s", resp.StatusCode, raw)
	}

	var tok struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
		ExpiresIn    int    `json:"expires_in"`
	}
	if err := json.Unmarshal(raw, &tok); err != nil {
		return fmt.Errorf("token parse: %w", err)
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	s.st.AccessToken = tok.AccessToken
	s.st.RefreshToken = tok.RefreshToken
	s.st.TokenExpiry = time.Now().Add(time.Duration(tok.ExpiresIn) * time.Second)
	return s.save()
}

// accessToken returns a valid access token, refreshing if needed.
// Caller must hold mu.
func (s *Service) accessToken() (string, error) {
	if time.Now().Before(s.st.TokenExpiry.Add(-60 * time.Second)) {
		return s.st.AccessToken, nil
	}
	if s.st.RefreshToken == "" {
		return "", fmt.Errorf("gbp: not authorised — visit /admin/gbp/auth")
	}
	return s.refreshToken()
}

func (s *Service) refreshToken() (string, error) {
	body := url.Values{}
	body.Set("refresh_token", s.st.RefreshToken)
	body.Set("client_id", s.clientID)
	body.Set("client_secret", s.clientSecret)
	body.Set("grant_type", "refresh_token")

	resp, err := http.PostForm(oauthTokenURL, body)
	if err != nil {
		return "", fmt.Errorf("token refresh: %w", err)
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return "", fmt.Errorf("token refresh %d: %s", resp.StatusCode, raw)
	}

	var tok struct {
		AccessToken string `json:"access_token"`
		ExpiresIn   int    `json:"expires_in"`
	}
	if err := json.Unmarshal(raw, &tok); err != nil {
		return "", err
	}
	s.st.AccessToken = tok.AccessToken
	s.st.TokenExpiry = time.Now().Add(time.Duration(tok.ExpiresIn) * time.Second)
	_ = s.save()
	return tok.AccessToken, nil
}

// ─── GBP API ─────────────────────────────────────────────────────────────────

// IsAuthorised reports whether OAuth tokens exist.
func (s *Service) IsAuthorised() bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.st.RefreshToken != ""
}

// IsConfigured reports whether account + location are set.
func (s *Service) IsConfigured() bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.st.AccountName != "" && s.st.LocationName != ""
}

// LocationName returns the configured location resource name.
func (s *Service) LocationName() string {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.st.LocationName
}

// AccountName returns the configured account resource name.
func (s *Service) AccountName() string {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.st.AccountName
}

// SetLocation persists the account and location resource names.
func (s *Service) SetLocation(account, location string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.st.AccountName = account
	s.st.LocationName = location
	return s.save()
}

// ListAccounts calls the GBP API and returns all accounts.
func (s *Service) ListAccounts() ([]map[string]any, error) {
	s.mu.Lock()
	token, err := s.accessToken()
	s.mu.Unlock()
	if err != nil {
		return nil, err
	}

	req, _ := http.NewRequest("GET", gbpBase+"/accounts", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("list accounts %d: %s", resp.StatusCode, raw)
	}

	var out struct {
		Accounts []map[string]any `json:"accounts"`
	}
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil, err
	}
	return out.Accounts, nil
}

// ListLocations calls the GBP API and returns all locations for the account.
func (s *Service) ListLocations() ([]map[string]any, error) {
	s.mu.Lock()
	token, err := s.accessToken()
	account := s.st.AccountName
	s.mu.Unlock()
	if err != nil {
		return nil, err
	}
	if account == "" {
		return nil, fmt.Errorf("account not set")
	}

	endpoint := gbpBase + "/" + account + "/locations?readMask=name,title,storefrontAddress"
	req, _ := http.NewRequest("GET", endpoint, nil)
	req.Header.Set("Authorization", "Bearer "+token)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("list locations %d: %s", resp.StatusCode, raw)
	}

	var out struct {
		Locations []map[string]any `json:"locations"`
	}
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil, err
	}
	return out.Locations, nil
}

// createPost publishes a post to GBP immediately and returns the post name.
func (s *Service) createPost(text string) (string, error) {
	s.mu.Lock()
	token, err := s.accessToken()
	location := s.st.LocationName
	s.mu.Unlock()
	if err != nil {
		return "", err
	}
	if location == "" {
		return "", fmt.Errorf("location not configured")
	}

	payload := map[string]any{
		"languageCode": "en-US",
		"summary":      text,
		"topicType":    "STANDARD",
		"callToAction": map[string]string{
			"actionType": "BOOK",
			"url":        "https://pelangicapsulehostel.com/book",
		},
	}
	b, _ := json.Marshal(payload)
	endpoint := gbpBase + "/" + location + "/localPosts"
	req, _ := http.NewRequest("POST", endpoint, bytes.NewReader(b))
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return "", fmt.Errorf("create post %d: %s", resp.StatusCode, raw)
	}

	var out struct {
		Name string `json:"name"`
	}
	_ = json.Unmarshal(raw, &out)
	return out.Name, nil
}

// ─── Scheduled post management ───────────────────────────────────────────────

// Posts returns a copy of all scheduled posts (newest first).
func (s *Service) Posts() []ScheduledPost {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make([]ScheduledPost, len(s.st.Posts))
	copy(out, s.st.Posts)
	// Reverse so newest is first.
	for i, j := 0, len(out)-1; i < j; i, j = i+1, j-1 {
		out[i], out[j] = out[j], out[i]
	}
	return out
}

// AddPost creates a new pending scheduled post and persists it.
func (s *Service) AddPost(text string, scheduledAt time.Time) (ScheduledPost, error) {
	if text == "" {
		return ScheduledPost{}, fmt.Errorf("text required")
	}
	if len(text) > 1500 {
		return ScheduledPost{}, fmt.Errorf("text too long (max 1500 chars)")
	}
	p := ScheduledPost{
		ID:          randHex(8),
		Text:        text,
		ScheduledAt: scheduledAt,
		Status:      StatusPending,
		CreatedAt:   time.Now(),
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	s.st.Posts = append(s.st.Posts, p)
	return p, s.save()
}

// CancelPost marks a pending post as cancelled.
func (s *Service) CancelPost(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	for i, p := range s.st.Posts {
		if p.ID == id {
			if p.Status != StatusPending {
				return fmt.Errorf("post %s is %s, cannot cancel", id, p.Status)
			}
			s.st.Posts[i].Status = StatusCancelled
			return s.save()
		}
	}
	return fmt.Errorf("post %s not found", id)
}

// PostNow immediately publishes a post without scheduling.
func (s *Service) PostNow(text string) (string, error) {
	return s.createPost(text)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

func randHex(n int) string {
	b := make([]byte, n)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}
