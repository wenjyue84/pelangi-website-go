// Package beds24 is the channel-manager client. It pulls live availability for
// the property and caches it in-process with a short TTL — the Go equivalent of
// the Next.js `cache()` + 5-minute s-maxage used by the ARI endpoint.
//
// Until BEDS24_API_KEY / BEDS24_PROPERTY_ID are configured, CachedAvailability
// returns nil so callers fall back to local room inventory totals (matching the
// TypeScript getCachedAvailability fallback behavior).
package beds24

import (
	"sync"
	"time"
)

// RoomAvailability is the per-room live availability/inventory snapshot.
type RoomAvailability struct {
	RoomID    string
	Available int
	Total     int
}

const cacheTTL = 5 * time.Minute

type cacheEntry struct {
	rooms     []RoomAvailability
	expiresAt time.Time
}

var (
	mu    sync.Mutex
	cache = map[string]cacheEntry{}
)

// CachedAvailability returns live availability for the given stay, cached for
// cacheTTL keyed by checkin|checkout. Returns nil when the channel manager is
// not configured or the upstream call fails — callers must fall back to local
// inventory in that case.
func CachedAvailability(checkin, checkout string) []RoomAvailability {
	key := checkin + "|" + checkout

	mu.Lock()
	if e, ok := cache[key]; ok && time.Now().Before(e.expiresAt) {
		rooms := e.rooms
		mu.Unlock()
		return rooms
	}
	mu.Unlock()

	rooms := fetch(checkin, checkout)

	mu.Lock()
	cache[key] = cacheEntry{rooms: rooms, expiresAt: time.Now().Add(cacheTTL)}
	mu.Unlock()

	return rooms
}

// fetch performs the live Beds24 pull. TODO(port): implement the Beds24 v2 ARI
// call ported from site/src/lib/cached-availability.ts + channel-manager config.
// Returns nil while unconfigured so the ARI endpoint serves local totals.
func fetch(checkin, checkout string) []RoomAvailability {
	return nil
}
