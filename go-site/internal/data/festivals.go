package data

import (
	"sort"
	"strings"
	"time"
)

// Festival decoration calendar. The site restyles itself (data-festival on
// <html> + static/css/festival.css) from DefaultBeforeDays before a festival
// to DefaultAfterDays after it, evaluated per request in Malaysia time, so a
// theme switch needs no deploy.
//
// Lunar and Islamic dates are listed explicitly per year (2026-2028). Islamic
// dates are astronomical projections and can move by a day with moon sighting.
// Children's Day is deliberately absent: no verified date.
// Thaipusam 2028 is absent: sources conflict.

const (
	DefaultBeforeDays = 5
	DefaultAfterDays  = 3
)

// FestivalMYT is the zone every festival decision is evaluated in.
var FestivalMYT = time.FixedZone("MYT", 8*60*60)

type festivalRule int

const (
	ruleExplicit  festivalRule = iota // Dates holds ISO dates
	ruleFixed                         // Month/Day every year
	ruleNthSunday                     // Nth (Day) Sunday of Month
)

// Festival is one decoration theme.
type Festival struct {
	Key   string
	Name  string
	Motif string // symbol id suffix used by the decoration partial
	Fx    string // "burst" = one-shot firework burst on load, "" = none
	// Before/After override the default window when non-zero.
	Before, After int

	rule  festivalRule
	Month time.Month
	Day   int // day of month (fixed) or N (nth Sunday)
	Dates []string

	Greetings map[string]string // keyed en / zh / ms
}

// Greeting returns the greeting for an <html lang> value (en, zh*, ms*).
func (f *Festival) Greeting(lang string) string {
	l := strings.ToLower(lang)
	switch {
	case strings.HasPrefix(l, "zh"):
		return f.Greetings["zh"]
	case strings.HasPrefix(l, "ms"):
		return f.Greetings["ms"]
	}
	return f.Greetings["en"]
}

func (f *Festival) window() (before, after int) {
	before, after = DefaultBeforeDays, DefaultAfterDays
	if f.Before > 0 {
		before = f.Before
	}
	if f.After > 0 {
		after = f.After
	}
	return
}

// occurrences returns the festival day(s) falling in the given year.
func (f *Festival) occurrences(year int) []time.Time {
	switch f.rule {
	case ruleFixed:
		return []time.Time{ymd(year, f.Month, f.Day)}
	case ruleNthSunday:
		first := ymd(year, f.Month, 1)
		offset := (int(time.Sunday) - int(first.Weekday()) + 7) % 7
		return []time.Time{ymd(year, f.Month, 1+offset+7*(f.Day-1))}
	}
	var out []time.Time
	for _, s := range f.Dates {
		t, err := time.Parse("2006-01-02", s)
		if err == nil && t.Year() == year {
			out = append(out, ymd(t.Year(), t.Month(), t.Day()))
		}
	}
	return out
}

// ymd builds a date-only value (UTC midnight) so day arithmetic ignores DST/zones.
func ymd(y int, m time.Month, d int) time.Time {
	return time.Date(y, m, d, 0, 0, 0, 0, time.UTC)
}

func g(en, zh, ms string) map[string]string {
	return map[string]string{"en": en, "zh": zh, "ms": ms}
}

// Festivals is ordered by tie-break priority (earlier wins an exact tie).
var Festivals = []Festival{
	{Key: "chinese-new-year", Name: "Chinese New Year", Motif: "lantern", Fx: "burst",
		Dates:     []string{"2026-02-17", "2027-02-06", "2028-01-26"},
		Greetings: g("Gong Xi Fa Cai! Happy Chinese New Year.", "恭喜发财，新年快乐！", "Selamat Tahun Baru Cina!")},
	{Key: "hari-raya-aidilfitri", Name: "Hari Raya Aidilfitri", Motif: "crescent",
		Dates:     []string{"2026-03-21", "2027-03-10", "2028-02-27"},
		Greetings: g("Selamat Hari Raya Aidilfitri!", "祝大家开斋节快乐！", "Selamat Hari Raya Aidilfitri, maaf zahir dan batin!")},
	{Key: "hari-raya-haji", Name: "Hari Raya Haji", Motif: "crescent",
		Dates:     []string{"2026-05-27", "2027-05-17", "2028-05-05"},
		Greetings: g("Selamat Hari Raya Aidiladha!", "祝大家哈芝节快乐！", "Selamat Hari Raya Aidiladha!")},
	{Key: "deepavali", Name: "Deepavali", Motif: "diya",
		Dates:     []string{"2026-11-08", "2027-10-28", "2028-10-17"},
		Greetings: g("Happy Deepavali!", "祝大家屠妖节快乐！", "Selamat Hari Deepavali!")},
	{Key: "thaipusam", Name: "Thaipusam", Motif: "diya",
		Dates:     []string{"2026-02-01", "2027-01-22"},
		Greetings: g("Happy Thaipusam!", "祝大家大宝森节平安！", "Selamat Hari Thaipusam!")},
	{Key: "wesak", Name: "Wesak Day", Motif: "lotus",
		Dates:     []string{"2026-05-31", "2027-05-20", "2028-05-09"},
		Greetings: g("Happy Wesak Day!", "祝大家卫塞节快乐！", "Selamat Hari Wesak!")},
	{Key: "mid-autumn", Name: "Mid-Autumn Festival", Motif: "lantern",
		Dates:     []string{"2026-09-25", "2027-09-15", "2028-10-03"},
		Greetings: g("Happy Mid-Autumn Festival!", "中秋节快乐！", "Selamat Pesta Kuih Bulan!")},
	{Key: "awal-muharram", Name: "Awal Muharram", Motif: "crescent",
		Dates:     []string{"2026-06-17", "2027-06-06", "2028-05-25"},
		Greetings: g("Selamat Menyambut Awal Muharram.", "祝大家回历新年平安。", "Selamat Menyambut Awal Muharram.")},
	{Key: "christmas", Name: "Christmas", Motif: "sparkle",
		rule: ruleFixed, Month: time.December, Day: 25,
		Greetings: g("Merry Christmas!", "圣诞快乐！", "Selamat Hari Krismas!")},
	{Key: "new-year", Name: "New Year", Motif: "sparkle", Fx: "burst",
		rule: ruleFixed, Month: time.January, Day: 1,
		Greetings: g("Happy New Year!", "新年快乐！", "Selamat Tahun Baru!")},
	{Key: "labour-day", Name: "Labour Day", Motif: "gear",
		rule: ruleFixed, Month: time.May, Day: 1,
		Greetings: g("Happy Labour Day!", "劳动节快乐！", "Selamat Hari Pekerja!")},
	{Key: "malaysia-day", Name: "Malaysia Day", Motif: "crescent", Fx: "burst",
		rule: ruleFixed, Month: time.September, Day: 16,
		Greetings: g("Selamat Hari Malaysia!", "马来西亚日快乐！", "Selamat Hari Malaysia!")},
	{Key: "merdeka", Name: "Merdeka Day", Motif: "crescent", Fx: "burst",
		rule: ruleFixed, Month: time.August, Day: 31,
		Greetings: g("Selamat Hari Merdeka!", "祝大家国庆日快乐！", "Selamat Hari Merdeka!")},
	{Key: "singapore-national-day", Name: "Singapore National Day", Motif: "crescent", Fx: "burst",
		rule: ruleFixed, Month: time.August, Day: 9,
		Greetings: g("Happy National Day, Singapore!", "新加坡国庆日快乐！", "Selamat Hari Kebangsaan Singapura!")},
	{Key: "mothers-day", Name: "Mother's Day", Motif: "heart",
		rule: ruleNthSunday, Month: time.May, Day: 2,
		Greetings: g("Happy Mother's Day!", "母亲节快乐！", "Selamat Hari Ibu!")},
	{Key: "fathers-day", Name: "Father's Day", Motif: "tie",
		rule: ruleNthSunday, Month: time.June, Day: 3,
		Greetings: g("Happy Father's Day!", "父亲节快乐！", "Selamat Hari Bapa!")},
}

// FestivalByKey returns the festival with the given key, or nil.
func FestivalByKey(key string) *Festival {
	for i := range Festivals {
		if Festivals[i].Key == key {
			return &Festivals[i]
		}
	}
	return nil
}

// ActiveFestival returns the festival whose window contains now (evaluated as
// a calendar date in Asia/Kuala_Lumpur), or nil. When windows overlap the
// festival whose day is closest to today wins; an exact tie goes to the one
// listed first in Festivals. offset is days from the festival day (negative =
// before).
func ActiveFestival(now time.Time) (f *Festival, offset int) {
	local := now.In(FestivalMYT)
	today := ymd(local.Year(), local.Month(), local.Day())

	bestDist := 1 << 30
	for i := range Festivals {
		fe := &Festivals[i]
		before, after := fe.window()
		// year-1 and year+1 cover windows that straddle New Year.
		for y := today.Year() - 1; y <= today.Year()+1; y++ {
			for _, day := range fe.occurrences(y) {
				diff := int(today.Sub(day).Hours() / 24) // >0 = after the day
				if diff < -before || diff > after {
					continue
				}
				d := diff
				if d < 0 {
					d = -d
				}
				if d < bestDist {
					bestDist, f, offset = d, fe, diff
				}
			}
		}
	}
	return f, offset
}

// FestivalKeys lists all keys (sorted) for preview validation / docs.
func FestivalKeys() []string {
	keys := make([]string, 0, len(Festivals))
	for _, f := range Festivals {
		keys = append(keys, f.Key)
	}
	sort.Strings(keys)
	return keys
}
