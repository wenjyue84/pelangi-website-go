// Package data holds the static content model for the site, ported from the
// TypeScript files under site/src/data and site/src/lib. Keeping it as plain Go
// structs means it compiles into the binary with zero parsing at runtime.
package data

// RoomType mirrors site/src/data/rooms.ts RoomType.
type RoomType struct {
	ID           string
	Name         string
	Description  string
	NightlyRate  int // MYR
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
		NightlyRate:  30, // weekday "from" rate; RM35 on weekends (price cut 2026-07-03, was RM45)
		MonthlyRate:  594,
		Currency:     "MYR",
		MaxOccupancy: 1,
		TotalUnits:   18,
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
		NightlyRate:  30, // weekday "from" rate; RM35 on weekends (price cut 2026-07-03)
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
	CheckinTime:  "15:00",
	CheckoutTime: "12:00",
	TotalRooms:   24,
}
