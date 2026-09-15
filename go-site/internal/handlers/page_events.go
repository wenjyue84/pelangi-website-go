package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"pelangi-website/internal/data"
)

// EventCard wraps one event with its display-ready date label.
type EventCard struct {
	data.JBEvent
	DateLabel string // "9 August 2026" or "19–21 August 2026"
}

// EventsPage is the view model for GET /events.
type EventsPage struct {
	BasePage
	Events         []EventCard
	StructuredJSON string // ItemList of Event JSON-LD (safeHTML)
}

// eventDateLabel renders a human date range: a single day, or "19–21 August 2026".
func eventDateLabel(e data.JBEvent) string {
	if e.StartDate == "" {
		return e.Recurring
	}
	if e.EndDate == "" || e.EndDate == e.StartDate {
		return blogFormatLong(e.StartDate)
	}
	s, errS := time.Parse("2006-01-02", e.StartDate)
	f, errF := time.Parse("2006-01-02", e.EndDate)
	if errS != nil || errF != nil {
		return blogFormatLong(e.StartDate) + " – " + blogFormatLong(e.EndDate)
	}
	if s.Year() == f.Year() && s.Month() == f.Month() {
		return s.Format("2") + "–" + f.Format("2 January 2006")
	}
	if s.Year() == f.Year() {
		return s.Format("2 January") + " – " + f.Format("2 January 2006")
	}
	return blogFormatLong(e.StartDate) + " – " + blogFormatLong(e.EndDate)
}

func init() {
	registerPage(func(h *Handler, mux *http.ServeMux) {
		mux.HandleFunc("GET /events", h.events)
	})
}

func (h *Handler) events(w http.ResponseWriter, r *http.Request) {
	events := data.UpcomingEvents()

	// ItemList of Event objects — one entry per dated event. Standing weekly
	// items (no StartDate) are rendered on the page but left out of the graph,
	// since schema.org/Event requires a concrete startDate.
	items := make([]map[string]any, 0, len(events))
	pos := 0
	for _, e := range events {
		if e.StartDate == "" {
			continue
		}
		pos++
		ev := map[string]any{
			"@type":               "Event",
			"name":                e.Name,
			"startDate":           e.StartDate,
			"description":         e.Blurb,
			"eventStatus":         "https://schema.org/EventScheduled",
			"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
			"location": map[string]any{
				"@type": "Place",
				"name":  e.Venue,
				"address": map[string]any{
					"@type":           "PostalAddress",
					"streetAddress":   e.Address,
					"addressLocality": "Johor Bahru",
					"addressRegion":   "Johor",
					"addressCountry":  "MY",
				},
			},
		}
		if e.EndDate != "" {
			ev["endDate"] = e.EndDate
		}
		if e.SourceURL != "" {
			ev["url"] = e.SourceURL
		}
		items = append(items, map[string]any{
			"@type":    "ListItem",
			"position": pos,
			"item":     ev,
		})
	}

	list := map[string]any{
		"@context":        "https://schema.org",
		"@type":           "ItemList",
		"name":            "Johor Bahru events calendar",
		"description":     "Dated events, public holidays and long weekends in Johor Bahru that affect accommodation demand.",
		"itemListElement": items,
	}
	lj, _ := json.Marshal(list)

	cards := make([]EventCard, len(events))
	for i, e := range events {
		cards[i] = EventCard{JBEvent: e, DateLabel: eventDateLabel(e)}
	}

	p := EventsPage{
		BasePage: h.base(
			"What's On in Johor Bahru — Events, Holidays & Long Weekends | Pelangi Capsule Hostel",
			"Dated calendar of Johor Bahru events, public holidays and long weekends — matches, trade fairs, festivals and the nights JB beds sell out. Every date carries its source.",
			"https://pelangicapsulehostel.com/events",
			"en",
			enNav,
		),
		Events:         cards,
		StructuredJSON: string(lj),
	}
	h.renderPage(w, "events.html", p)
}
