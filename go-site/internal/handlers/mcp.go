package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"pelangi-website/internal/db"
)

// mcpPost serves POST /api/mcp — JSON-RPC 2.0 MCP server, ported from
// site/src/app/api/mcp/route.ts. Auth via Bearer MCP_API_KEY (optional).
func (h *Handler) mcpPost(w http.ResponseWriter, r *http.Request) {
	if !mcpCheckAuth(r) {
		writeJSON(w, http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
		return
	}

	var body struct {
		Method string          `json:"method"`
		Params json.RawMessage `json:"params"`
		ID     any             `json:"id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeJSON(w, http.StatusInternalServerError, mcpErr(nil, -32700, "Parse error"))
		return
	}

	switch body.Method {
	case "initialize":
		writeJSON(w, http.StatusOK, map[string]any{
			"jsonrpc": "2.0",
			"id":      body.ID,
			"result": map[string]any{
				"protocolVersion": "2024-11-05",
				"serverInfo":      map[string]any{"name": "pelangi-capsule-hostel", "version": "1.0.0"},
				"capabilities":    map[string]any{"tools": map[string]any{}},
			},
		})

	case "tools/list":
		writeJSON(w, http.StatusOK, map[string]any{
			"jsonrpc": "2.0",
			"id":      body.ID,
			"result":  map[string]any{"tools": mcpToolDefs},
		})

	case "tools/call":
		var params struct {
			Name      string         `json:"name"`
			Arguments map[string]any `json:"arguments"`
		}
		if len(body.Params) > 0 {
			_ = json.Unmarshal(body.Params, &params)
		}
		if params.Name == "" {
			writeJSON(w, http.StatusBadRequest, mcpErr(body.ID, -32602, "Tool name required"))
			return
		}
		result := mcpDispatch(params.Name, params.Arguments)
		writeJSON(w, http.StatusOK, map[string]any{
			"jsonrpc": "2.0",
			"id":      body.ID,
			"result":  result,
		})

	default:
		writeJSON(w, http.StatusBadRequest, mcpErr(body.ID, -32601, "Unknown method: "+body.Method))
	}
}

// mcpGet serves GET /api/mcp — discovery endpoint.
func (h *Handler) mcpGet(w http.ResponseWriter, r *http.Request) {
	type summary struct {
		Name        string `json:"name"`
		Description string `json:"description"`
	}
	sums := make([]summary, 0, len(mcpToolDefs))
	for _, t := range mcpToolDefs {
		sums = append(sums, summary{
			Name:        t["name"].(string),
			Description: t["description"].(string),
		})
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"name":        "Pelangi Capsule Hostel MCP Server",
		"description": "Website context tools for Rainbow AI — hostel info, rooms, events, and guest inquiry submission.",
		"tools":       sums,
		"protocol":    "json-rpc-2.0",
		"endpoint":    "POST /api/mcp",
	})
}

// ─── Auth ──────────────────────────────────────────────────────────────────

func mcpCheckAuth(r *http.Request) bool {
	key := os.Getenv("MCP_API_KEY")
	if key == "" {
		return true // no key = open (dev mode)
	}
	return r.Header.Get("Authorization") == "Bearer "+key
}

func mcpErr(id any, code int, msg string) map[string]any {
	return map[string]any{
		"jsonrpc": "2.0",
		"id":      id,
		"error":   map[string]any{"code": code, "message": msg},
	}
}

// ─── Tool definitions ──────────────────────────────────────────────────────

var mcpToolDefs = []map[string]any{
	{
		"name":        "pelangi_get_hostel_info",
		"description": "Get Pelangi Capsule Hostel details: address, contact, check-in/out times, WiFi, house rules, amenities, and booking links.",
		"inputSchema": map[string]any{"type": "object", "properties": map[string]any{}},
	},
	{
		"name":        "pelangi_get_rooms",
		"description": "Get available room types, bed configurations, capacity, and pricing (RM per night).",
		"inputSchema": map[string]any{
			"type": "object",
			"properties": map[string]any{
				"room_type": map[string]any{"type": "string", "description": "Optional: filter by room type (male, female, mixed, private)"},
			},
		},
	},
	{
		"name":        "pelangi_get_events",
		"description": "Get upcoming local events and public holidays near Johor Bahru. Useful for travel planning advice.",
		"inputSchema": map[string]any{
			"type": "object",
			"properties": map[string]any{
				"limit": map[string]any{"type": "number", "description": "Max events to return (default 10)"},
			},
		},
	},
	{
		"name":        "pelangi_create_inquiry",
		"description": "Save a guest inquiry or booking request for staff follow-up.",
		"inputSchema": map[string]any{
			"type": "object",
			"properties": map[string]any{
				"name":       map[string]any{"type": "string", "description": "Guest name"},
				"email":      map[string]any{"type": "string", "description": "Guest email"},
				"phone":      map[string]any{"type": "string", "description": "Guest phone number"},
				"message":    map[string]any{"type": "string", "description": "Inquiry or booking request message"},
				"check_in":   map[string]any{"type": "string", "description": "Check-in date (YYYY-MM-DD)"},
				"check_out":  map[string]any{"type": "string", "description": "Check-out date (YYYY-MM-DD)"},
				"guests":     map[string]any{"type": "number", "description": "Number of guests"},
				"session_id": map[string]any{"type": "string", "description": "Chat session ID for tracking"},
			},
			"required": []string{"message"},
		},
	},
	{
		"name":        "pelangi_get_booking_link",
		"description": "Get the direct booking URL and payment instructions for Pelangi Capsule Hostel.",
		"inputSchema": map[string]any{"type": "object", "properties": map[string]any{}},
	},
}

// ─── Tool dispatcher ───────────────────────────────────────────────────────

func mcpDispatch(name string, args map[string]any) map[string]any {
	if args == nil {
		args = map[string]any{}
	}
	switch name {
	case "pelangi_get_hostel_info":
		return mcpHostelInfo()
	case "pelangi_get_rooms":
		return mcpRooms(args)
	case "pelangi_get_events":
		return mcpEvents(args)
	case "pelangi_create_inquiry":
		return mcpCreateInquiry(args)
	case "pelangi_get_booking_link":
		return mcpBookingLink()
	default:
		return map[string]any{
			"content": []any{map[string]string{"type": "text", "text": "Unknown tool: " + name}},
			"isError": true,
		}
	}
}

func mcpText(v any) map[string]any {
	b, _ := json.MarshalIndent(v, "", "  ")
	return map[string]any{"content": []any{map[string]string{"type": "text", "text": string(b)}}}
}

// ─── pelangi_get_hostel_info ───────────────────────────────────────────────

func mcpHostelInfo() map[string]any {
	return mcpText(map[string]any{
		"name":    "Pelangi Capsule Hostel",
		"tagline": "Japanese-style capsule accommodation in Johor Bahru",
		"address": "Taman Pelangi, Johor Bahru, Johor, Malaysia",
		"contact": map[string]any{
			"phone":    "+60 12 7088789",
			"whatsapp": "https://wa.me/60127088789",
			"email":    "pelangi.capsulehostel@gmail.com",
			"website":  "https://pelangicapsulehostel.com",
		},
		"hours": map[string]any{
			"checkin":   "2:00 PM",
			"checkout":  "12:00 PM (noon)",
			"reception": "24/7 — self check-in available",
		},
		"amenities": []string{
			"Free WiFi (high-speed fibre)",
			"Personal locker with key card",
			"Individual reading light and USB charging port per pod",
			"Privacy curtain in every capsule",
			"Hot shower bathrooms",
			"Air conditioning throughout",
			"Common lounge area",
			"Luggage storage",
		},
		"house_rules": []string{
			"No smoking inside",
			"Quiet hours: 11 PM – 7 AM",
			"No outside guests in dorm areas",
			"Keep valuables in your locker",
			"Check-out by 12 PM to avoid extra charge",
		},
		"location": map[string]any{
			"nearest_landmark":       "Taman Pelangi, JB",
			"distance_to_singapore":  "~30 minutes to Woodlands Causeway",
			"distance_to_jb_sentral": "~10 minutes by Grab",
			"nearby":                 []string{"AEON Tebrau City", "Paradigm Mall", "Pelangi leisure mall"},
		},
		"wifi":   map[string]any{"available": true, "speed": "High-speed fibre", "password": "Ask staff at check-in"},
		"rating": map[string]any{"hostelworld": "3.3/10", "review_count": 21},
	})
}

// ─── pelangi_get_rooms ─────────────────────────────────────────────────────

var mcpRoomList = []map[string]any{
	{
		"type": "male_dorm", "label": "Male Dormitory",
		"beds": "Capsule pods", "capacity": "1 per pod", "gender": "Male only",
		"price_per_night": 35, "currency": "MYR",
		"features": []string{"Individual pod with curtain", "Personal locker", "USB port", "Reading light"},
	},
	{
		"type": "female_dorm", "label": "Female Dormitory",
		"beds": "Capsule pods", "capacity": "1 per pod", "gender": "Female only",
		"price_per_night": 35, "currency": "MYR",
		"features": []string{"Individual pod with curtain", "Personal locker", "USB port", "Reading light"},
	},
	{
		"type": "mixed_dorm", "label": "Mixed Dormitory",
		"beds": "Capsule pods", "capacity": "1 per pod", "gender": "Mixed",
		"price_per_night": 35, "currency": "MYR",
		"features": []string{"Individual pod with curtain", "Personal locker", "USB port", "Reading light"},
	},
}

func mcpRooms(args map[string]any) map[string]any {
	rooms := mcpRoomList
	if filter, ok := args["room_type"].(string); ok && filter != "" {
		f := strings.ToLower(filter)
		var filtered []map[string]any
		for _, rm := range mcpRoomList {
			if strings.Contains(rm["type"].(string), f) || strings.Contains(strings.ToLower(rm["label"].(string)), f) {
				filtered = append(filtered, rm)
			}
		}
		rooms = filtered
	}
	return mcpText(map[string]any{
		"hostel":   "Pelangi Capsule Hostel",
		"currency": "MYR",
		"note":     "Prices per pod per night. Book at pelangicapsulehostel.com",
		"rooms":    rooms,
	})
}

// ─── pelangi_get_events ────────────────────────────────────────────────────

// mcpStaticEvents holds 2026 Malaysia public holidays, ported from
// site/src/data/events.ts.
// TODO(port): complete remaining 2026 public holidays from site/src/data/events.ts.
var mcpStaticEvents = []map[string]any{
	{"title": "Thaipusam", "date": "2026-02-01", "time": "All Day", "description": "Hindu festival celebrating Lord Murugan. Expect colorful processions.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Chinese New Year", "date": "2026-02-17", "time": "All Day", "description": "Year of the Horse. Gong Xi Fa Cai!", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Chinese New Year (2nd day)", "date": "2026-02-18", "time": "All Day", "description": "Second day of Chinese New Year celebrations.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Federal Territory Day", "date": "2026-02-01", "time": "All Day", "description": "Public holiday for Kuala Lumpur, Putrajaya, and Labuan.", "category": "Holiday", "location": "Federal Territory", "source": "public_holiday"},
	{"title": "Hari Raya Aidilfitri", "date": "2026-03-20", "time": "All Day", "description": "End of Ramadan. Major celebration with open houses and family gatherings.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Hari Raya Aidilfitri (2nd day)", "date": "2026-03-21", "time": "All Day", "description": "Second day of Hari Raya Aidilfitri.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Labour Day", "date": "2026-05-01", "time": "All Day", "description": "International Workers' Day.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Wesak Day", "date": "2026-05-24", "time": "All Day", "description": "Buddhist celebration of the birth, enlightenment, and passing of Buddha.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Yang di-Pertuan Agong's Birthday", "date": "2026-06-01", "time": "All Day", "description": "Birthday of the King of Malaysia.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Hari Raya Aidiladha", "date": "2026-05-27", "time": "All Day", "description": "Feast of Sacrifice. Commemorates Ibrahim's willingness to sacrifice his son.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Awal Muharram", "date": "2026-07-17", "time": "All Day", "description": "Islamic New Year.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "National Day", "date": "2026-08-31", "time": "All Day", "description": "Malaysia's Independence Day. Parades and celebrations nationwide.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Malaysia Day", "date": "2026-09-16", "time": "All Day", "description": "Formation of Malaysia in 1963.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Prophet Muhammad's Birthday", "date": "2026-09-25", "time": "All Day", "description": "Maulidur Rasul — celebration of the Prophet's birthday.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Deepavali", "date": "2026-11-09", "time": "All Day", "description": "Festival of Lights celebrated by the Hindu community.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
	{"title": "Christmas Day", "date": "2026-12-25", "time": "All Day", "description": "Christian celebration of the birth of Jesus Christ.", "category": "Holiday", "location": "Nationwide", "source": "public_holiday"},
}

func mcpEvents(args map[string]any) map[string]any {
	limit := 10
	if l, ok := args["limit"].(float64); ok && l > 0 {
		limit = int(l)
	}
	today := time.Now().UTC().Format("2006-01-02")

	var upcoming []map[string]any
	for _, e := range mcpStaticEvents {
		if d, ok := e["date"].(string); ok && d >= today {
			upcoming = append(upcoming, e)
		}
	}
	sort.Slice(upcoming, func(i, j int) bool {
		return upcoming[i]["date"].(string) < upcoming[j]["date"].(string)
	})
	if len(upcoming) > limit {
		upcoming = upcoming[:limit]
	}

	// TODO(port): merge DB events from website_events table
	// (SELECT ... WHERE is_active=true AND event_date >= today ORDER BY event_date LIMIT limit).

	return mcpText(map[string]any{"events": upcoming, "total": len(upcoming)})
}

// ─── pelangi_create_inquiry ────────────────────────────────────────────────

func mcpCreateInquiry(args map[string]any) map[string]any {
	msg, _ := args["message"].(string)
	if strings.TrimSpace(msg) == "" {
		return map[string]any{
			"content": []any{map[string]string{"type": "text", "text": "Error: message is required"}},
			"isError": true,
		}
	}
	if !db.Configured() {
		return map[string]any{
			"content": []any{map[string]string{
				"type": "text",
				"text": `{"success":false,"message":"Inquiry submission requires a database connection. Please contact us via WhatsApp: +60127088789"}`,
			}},
			"isError": true,
		}
	}
	str := func(k string) string { s, _ := args[k].(string); return s }
	guests := 0
	if g, ok := args["guests"].(float64); ok {
		guests = int(g)
	}
	id, err := db.InsertInquiry(context.Background(), str("name"), str("email"), str("phone"), msg,
		str("checkIn"), str("checkOut"), guests, str("sessionId"), "chatbot")
	if err != nil {
		return map[string]any{
			"content": []any{map[string]string{"type": "text", "text": `{"success":false,"message":"Could not save inquiry. Please WhatsApp +60127088789"}`}},
			"isError": true,
		}
	}
	return mcpText(map[string]any{
		"success": true,
		"id":      id,
		"message": "Inquiry received. Our team will follow up shortly.",
	})
}

// ─── pelangi_get_booking_link ──────────────────────────────────────────────

func mcpBookingLink() map[string]any {
	return mcpText(map[string]any{
		"booking_url":      "https://pelangicapsulehostel.com/book",
		"payment_methods":  []string{"FPX online banking (Malaysian banks)", "Credit/debit card via Stripe"},
		"currency":         "MYR",
		"note":             "Book directly on our website for the best price. No extra fees.",
		"whatsapp_booking": "Send 'BOOK' to +60127088789 for manual booking assistance.",
	})
}
