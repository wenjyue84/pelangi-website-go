package handlers

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"pelangi-website/internal/data"
)

// kb serves GET /api/kb — the Knowledge Base endpoint Rainbow AI syncs from.
// Ported from site/src/app/api/kb/route.ts.
func (h *Handler) kb(w http.ResponseWriter, r *http.Request) {
	payload := map[string]any{
		"version":   "1.0.0",
		"property":  data.Property.Name,
		"updatedAt": time.Now().UTC().Format(time.RFC3339),
		"sections": map[string]string{
			"rooms":    kbRoomsSection(),
			"faqs":     kbFaqsSection(),
			"location": kbLocationSection,
			"policies": kbPoliciesSection,
			"blog":     data.KbBlogSection(),
		},
	}
	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	enc.SetEscapeHTML(false)
	_ = enc.Encode(payload)
	body := bytes.TrimRight(buf.Bytes(), "\n")
	sum := sha256.Sum256(body)
	etag := `"` + hex.EncodeToString(sum[:])[:16] + `"`

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
	w.Header().Set("ETag", etag)
	_, _ = w.Write(body)
}

func kbRoomsSection() string {
	lines := []string{"# Room Types\n"}
	for _, room := range data.RoomTypes {
		lines = append(lines, "## "+room.Name)
		lines = append(lines, room.Description)
		lines = append(lines, "- **Nightly rate:** RM"+strconv.Itoa(room.NightlyRate)+"/night")
		if room.MonthlyRate > 0 {
			lines = append(lines, "- **Monthly rate:** RM"+strconv.Itoa(room.MonthlyRate)+"/month")
		}
		lines = append(lines, "- **Max occupancy:** "+strconv.Itoa(room.MaxOccupancy)+" person")
		lines = append(lines, "- **Total units:** "+strconv.Itoa(room.TotalUnits))
		lines = append(lines, "- **Amenities:** "+strings.Join(room.Amenities, ", "))
		lines = append(lines, "")
	}
	lines = append(lines, "**Total capacity:** "+strconv.Itoa(data.Property.TotalRooms)+" pods")
	lines = append(lines, "**Check-in:** "+data.Property.CheckinTime+" | **Check-out:** "+data.Property.CheckoutTime)
	return strings.Join(lines, "\n")
}

func kbFaqsSection() string {
	lines := []string{"# Frequently Asked Questions\n"}
	for _, faq := range data.FaqItems {
		lines = append(lines, "## "+faq.Question)
		lines = append(lines, faq.Answer)
		lines = append(lines, "")
	}
	return strings.Join(lines, "\n")
}

const kbLocationSection = `# Location & Transport

## Address
26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia

**Google Maps:** https://maps.app.goo.gl/maLXetUqYS5MtSLD9

## Getting Here

### From Singapore (Woodlands CIQ)
- 15 minutes by car / Grab (RM8–12)
- Bus CW1 from Woodlands to JB Sentral, then Grab to hostel

### From Senai Airport (JHB)
- 20–30 minutes by Grab (RM25–35)
- Airport taxis available at arrivals hall

### From JB Sentral
- 10 minutes by Grab (RM6–10)

## Nearby Landmarks
- Taman Pelangi Night Market — every Tuesday from 4:30 PM (right at doorstep)
- Restoran Hua Mui heritage coffee shop — 5 min walk
- KOMTAR JBCC mall — 10 min drive
- JB Old Chinese Temple — 10 min drive
- Legoland Malaysia — 25 min drive

## Contact
- **WhatsApp:** +60 10-308 4289 (Rainbot, AI assistant 24/7) | +60 12-708 8789 (Jay) | +60 16-762 0815 (Alston)
- **Email:** pelangicapsule@gmail.com
- **Website:** https://pelangicapsulehostel.com
- **Book online:** https://pelangicapsulehostel.com/book
`

const kbPoliciesSection = `# Policies & House Rules

## Check-in / Check-out
- **Check-in:** 2:00 PM onwards (self-check-in available 24/7)
- **Check-out:** Before 12:00 PM (noon)
- Early check-in / late check-out available on request via WhatsApp

## Tourism Tax (TTx)
- RM10 per room per night (foreign tourists only — Malaysians and permanent residents are exempt) — government-mandated (Tourism Tax Act 2017)
- Collected at check-in, separate from room rate

## Payment Methods
- Cash (Malaysian Ringgit)
- DuitNow QR (all Malaysian banks + e-wallets: Maybank, CIMB, Touch 'n Go, Boost, GrabPay)
- Credit cards

## House Rules
- Strict quiet policy in sleeping pod areas
- Common lounge for socialising, calls, and remote work
- No smoking inside the premises
- No outside visitors past 10 PM
- 24/7 access — no curfew

## Amenities
- Free high-speed WiFi (network: "pelangi capsule", password: "ilovestaycapsule")
- Air-conditioned sleeping areas
- In-house laundry service: RM5/load
- Shared kitchen — fully equipped
- Personal lockers inside pods
- Hot showers with body wash and shampoo provided
- Fresh towels included
- 24/7 CCTV and secure premises
- Common lounge area

## Monthly Stays
- Upper Deck from RM600/month · Lower Deck from RM650/month
- Includes all amenities: WiFi, A/C, hot showers, kitchen, laundry
`
