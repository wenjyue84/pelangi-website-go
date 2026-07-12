// Package data holds the static content model for the site, ported from the
// TypeScript files under site/src/data and site/src/lib. Keeping it as plain Go
// structs means it compiles into the binary with zero parsing at runtime.
package data

// RoomType mirrors site/src/data/rooms.ts RoomType.
type RoomType struct {
	ID           string
	Name         string
	Description  string
	NightlyRate  int // MYR, weekday rate (Sun–Thu nights)
	WeekendRate  int // MYR, Friday/Saturday nights; 0 = same as NightlyRate
	MonthlyRate  int // MYR, 0 if not applicable
	Currency     string
	MaxOccupancy int
	TotalUnits   int
	Amenities    []string
}

// RoomTypes is the centralized room inventory, ported from rooms.ts ROOM_TYPES.
var RoomTypes = []RoomType{
	{
		ID:   "lower-deck-pod",
		Name: "Lower Deck Pod",
		Description: "Ground-level capsule pod — easy access, no ladder required. " +
			"Japanese-style with LED reading light, USB charging port, and personal locker.",
		NightlyRate:  30, // weekday rate (price cut 2026-07-03, was RM45)
		WeekendRate:  35, // Fri/Sat nights
		MonthlyRate:  594,
		Currency:     "MYR",
		MaxOccupancy: 1,
		// Total sellable capsules = 30 (matches the PMS units table, the actual
		// booking source of truth: C/J/R units across front/middle/back). The
		// lower/upper split is an OTA-presentation construct only — the PMS pools
		// all pods and /api/ari allocates the live PMS free count lower-deck first,
		// so these per-type caps must sum to 30.
		TotalUnits:   24,
		Amenities: []string{
			"Ground-level access",
			"LED reading light",
			"USB charging",
			"Personal locker",
			"Shared bathroom",
		},
	},
	{
		ID:   "upper-deck-pod",
		Name: "Upper Deck Pod",
		Description: "Elevated capsule pod on the upper bunk — more privacy and less foot traffic. " +
			"Same Japanese-style comfort with LED reading light, USB charging port, and personal locker.",
		NightlyRate:  30, // weekday rate (price cut 2026-07-03)
		WeekendRate:  35, // Fri/Sat nights
		Currency:     "MYR",
		MaxOccupancy: 1,
		TotalUnits:   6,
		Amenities: []string{
			"Elevated upper bunk position",
			"LED reading light",
			"USB charging",
			"Personal locker",
			"Shared bathroom",
		},
	},
}

// Property mirrors rooms.ts PROPERTY.
var Property = struct {
	ID           string
	Name         string
	Currency     string
	Timezone     string
	CheckinTime  string
	CheckoutTime string
	TotalRooms   int
}{
	ID:           "pelangi-capsule-hostel-jb",
	Name:         "Pelangi Capsule Hostel",
	Currency:     "MYR",
	Timezone:     "Asia/Kuala_Lumpur",
	CheckinTime:  "14:00",
	CheckoutTime: "12:00",
	TotalRooms:   30,
}
