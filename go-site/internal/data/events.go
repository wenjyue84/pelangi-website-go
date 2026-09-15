package data

import "sort"

// JBEvent is one dated thing happening in or near Johor Bahru that moves
// accommodation demand — a match, a fair, a public holiday, a night market.
// Every entry must carry a SourceURL; an event we cannot source does not ship.
type JBEvent struct {
	Name       string
	StartDate  string // YYYY-MM-DD
	EndDate    string // YYYY-MM-DD; same as StartDate for single-day events
	Venue      string
	Address    string
	Category   string // "Sport" | "Public Holiday" | "Trade Fair" | "Festival" | "Market"
	Blurb      string
	SourceURL  string // where the date was verified
	SourceName string // publication/organiser shown next to the link
	TravelNote string // what it means for someone booking a bed
	PostSlug   string // related blog post slug, "" if none
	Recurring  string // human text for standing weekly events, "" for one-offs
}

// JBEvents is the seed list. Dates are verified against the source named in
// each entry — see wiki notes in the docs repo before adding anything.
var JBEvents = []JBEvent{
	{
		Name:       "Chelsea FC vs Johor Darul Ta'zim (pre-season friendly)",
		StartDate:  "2026-08-09",
		EndDate:    "2026-08-09",
		Venue:      "Sultan Ibrahim Stadium",
		Address:    "Iskandar Puteri, Johor",
		Category:   "Sport",
		Blurb:      "Chelsea's final pre-season tour stop against the Malaysia Super League champions. Kick-off 8:00 PM Malaysian time; the fixture was moved forward from 11 August by mutual agreement between the clubs. Stadium capacity is about 40,000.",
		SourceURL:  "https://www.freemalaysiatoday.com/category/highlight/2026/06/09/chelsea-jdt-friendly-rescheduled-to-aug-9",
		SourceName: "Free Malaysia Today, 9 June 2026",
		TravelNote: "Falls on the same night as Singapore's National Day, so the Causeway and JB accommodation are doubly loaded. Book before the first week of August, and plan the post-match ride out of Iskandar Puteri in advance.",
		PostSlug:   "chelsea-jdt-friendly-jb-where-to-stay-2026",
	},
	{
		Name:       "Singapore National Day (holiday in lieu Monday 10 August)",
		StartDate:  "2026-08-09",
		EndDate:    "2026-08-10",
		Venue:      "Singapore",
		Category:   "Public Holiday",
		Blurb:      "National Day falls on a Sunday in 2026; Monday 10 August is a public holiday in lieu for anyone whose rest day falls on the 9th. A Singapore long weekend directly adjacent to JB.",
		SourceURL:  "https://www.mom.gov.sg/employment-practices/public-holidays",
		SourceName: "Singapore Ministry of Manpower",
		TravelNote: "Heavy JB-bound Causeway traffic Saturday and Sunday, heavy return traffic Monday evening. Cross before 7 AM or after 9 PM.",
		PostSlug:   "chelsea-jdt-friendly-jb-where-to-stay-2026",
	},
	{
		Name:       "Johor Industrial Fair 2026",
		StartDate:  "2026-08-19",
		EndDate:    "2026-08-21",
		Venue:      "Austin International Convention Centre (AICC)",
		Address:    "Mount Austin, Johor Bahru",
		Category:   "Trade Fair",
		Blurb:      "Southern-region manufacturing and industrial automation trade show, 10:00 AM to 5:00 PM daily. Admission is free but restricted to trade professionals — register a visitor badge online or on-site with a business card. Under-16s are not admitted.",
		SourceURL:  "https://johorexpo.com/general-information.html",
		SourceName: "johorexpo.com (organiser, FBI Publications)",
		TravelNote: "AICC is in Mount Austin, east of the city centre — a Grab ride from central JB, 20–30 minutes in morning traffic. Fair weeks tighten JB's budget beds; book ahead rather than walking in.",
		PostSlug:   "johor-industrial-fair-2026-jb-budget-stay",
	},
	{
		Name:       "Merdeka Day (Malaysia National Day)",
		StartDate:  "2026-08-31",
		EndDate:    "2026-08-31",
		Venue:      "Nationwide, Malaysia",
		Category:   "Public Holiday",
		Blurb:      "Malaysian national public holiday on a Monday, giving most of the country a three-day weekend from Saturday 29 August. Not a Singapore public holiday — the crowd is domestic.",
		SourceURL:  "https://publicholidays.com.my/johor/2026-dates/",
		SourceName: "publicholidays.com.my (Johor 2026)",
		TravelNote: "Banks and government offices close; malls, convenience stores and most eateries stay open. Book two to three weeks ahead.",
		PostSlug:   "merdeka-malaysia-day-2026-jb-long-weekend-guide",
	},
	{
		Name:       "Malaysia Day",
		StartDate:  "2026-09-16",
		EndDate:    "2026-09-16",
		Venue:      "Nationwide, Malaysia",
		Category:   "Public Holiday",
		Blurb:      "National public holiday, but a Wednesday in 2026 — no long weekend attached, so the travel impact is much smaller than Merdeka.",
		SourceURL:  "https://publicholidays.com.my/johor/2026-dates/",
		SourceName: "publicholidays.com.my (Johor 2026)",
		TravelNote: "A midweek holiday is one of the better times to visit JB: shops open, no weekend crush.",
		PostSlug:   "merdeka-malaysia-day-2026-jb-long-weekend-guide",
	},
	{
		Name:       "Deepavali (holiday in lieu Monday 9 November)",
		StartDate:  "2026-11-08",
		EndDate:    "2026-11-09",
		Venue:      "Malaysia and Singapore",
		Category:   "Public Holiday",
		Blurb:      "Deepavali falls on Sunday 8 November 2026, with Monday 9 November observed as the holiday in both Malaysia and Singapore — one of the few genuinely two-country long weekends of the year.",
		SourceURL:  "https://publicholidays.com.my/johor/2026-dates/",
		SourceName: "publicholidays.com.my (Johor 2026) and Singapore MOM",
		TravelNote: "Demand comes from both directions at once. Book three to four weeks ahead; some family-run Indian restaurants close on the day itself.",
		PostSlug:   "deepavali-2026-jb-long-weekend-guide",
	},
	{
		Name:       "Chinese New Year 2027 (holiday in lieu Monday 8 February)",
		StartDate:  "2027-02-06",
		EndDate:    "2027-02-08",
		Venue:      "Malaysia and Singapore",
		Category:   "Public Holiday",
		Blurb:      "CNY 2027 falls on Saturday 6 and Sunday 7 February, with Monday 8 February observed in both countries. JB's heaviest travel window of the year; reunion dinner is Friday 5 February.",
		SourceURL:  "https://publicholidays.com.my/johor/2026-dates/",
		SourceName: "publicholidays.com.my and Singapore MOM",
		TravelNote: "Book six to eight weeks ahead. Many Chinese-run stalls and kopitiam close for the first two to three days — plan meals around mamak and Malay eateries.",
		PostSlug:   "cny-2027-jb-long-weekend-singapore-guide",
	},
	{
		Name:       "Taman Pelangi night market (pasar malam)",
		Venue:      "Taman Pelangi",
		Address:    "Johor Bahru",
		Category:   "Market",
		Blurb:      "The neighbourhood's weekly street-food market, and the reason Tuesday evenings in Taman Pelangi look nothing like the rest of the week.",
		Recurring:  "Every Tuesday from 4:30 PM",
		SourceURL:  "https://pelangicapsulehostel.com/blog/taman-pelangi-tuesday-night-market-guide",
		SourceName: "our own market guide",
		TravelNote: "Walkable from the hostel. No booking needed — just turn up hungry and bring cash.",
		PostSlug:   "taman-pelangi-tuesday-night-market-guide",
	},
}

// UpcomingEvents returns events that have not finished yet (Malaysia time),
// sorted by start date. Recurring entries (EndDate empty) never expire.
func UpcomingEvents() []JBEvent {
	today := TodayMYT()
	out := make([]JBEvent, 0, len(JBEvents))
	for _, e := range JBEvents {
		if e.EndDate == "" || e.EndDate >= today {
			out = append(out, e)
		}
	}
	// Dated events first (soonest first); standing weekly items sink to the bottom.
	sort.SliceStable(out, func(i, j int) bool {
		if (out[i].StartDate == "") != (out[j].StartDate == "") {
			return out[j].StartDate == ""
		}
		return out[i].StartDate < out[j].StartDate
	})
	return out
}
