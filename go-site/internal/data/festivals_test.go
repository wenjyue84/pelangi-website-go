package data

import (
	"testing"
	"time"
)

func myt(s string) time.Time {
	t, err := time.ParseInLocation("2006-01-02 15:04", s, FestivalMYT)
	if err != nil {
		panic(err)
	}
	return t
}

func activeKey(t time.Time) string {
	f, _ := ActiveFestival(t)
	if f == nil {
		return ""
	}
	return f.Key
}

func TestWindowEdges(t *testing.T) {
	// Deepavali 2026-11-08: window 2026-11-03 .. 2026-11-11 inclusive.
	cases := []struct{ at, want string }{
		{"2026-11-02 23:59", ""},
		{"2026-11-03 00:00", "deepavali"},
		{"2026-11-08 12:00", "deepavali"},
		{"2026-11-11 23:59", "deepavali"},
		{"2026-11-12 00:00", ""},
	}
	for _, c := range cases {
		if got := activeKey(myt(c.at)); got != c.want {
			t.Errorf("%s: got %q want %q", c.at, got, c.want)
		}
	}
}

func TestEvaluatedInMYT(t *testing.T) {
	// 2026-11-02 17:00 UTC is 2026-11-03 01:00 MYT: window has opened.
	utc := time.Date(2026, 11, 2, 17, 0, 0, 0, time.UTC)
	if got := activeKey(utc); got != "deepavali" {
		t.Errorf("got %q want deepavali", got)
	}
}

func TestOverlapClosestWins(t *testing.T) {
	// Christmas 12-25 (window to 12-28) overlaps New Year 01-01 (window from 12-27).
	if got := activeKey(myt("2026-12-27 10:00")); got != "christmas" {
		t.Errorf("12-27: got %q want christmas (2 days from Dec 25 vs 5 from Jan 1)", got)
	}
	if got := activeKey(myt("2026-12-28 10:00")); got != "christmas" {
		t.Errorf("12-28: got %q want christmas (3 days after Dec 25 vs 4 before Jan 1)", got)
	}
	if got := activeKey(myt("2026-12-29 10:00")); got != "new-year" {
		t.Errorf("12-29: got %q want new-year", got)
	}
}

func TestYearRollover(t *testing.T) {
	f, off := ActiveFestival(myt("2026-12-30 09:00"))
	if f == nil || f.Key != "new-year" || off != -2 {
		t.Fatalf("2026-12-30: got %v off %d, want new-year -2", f, off)
	}
	f, off = ActiveFestival(myt("2027-01-03 09:00"))
	if f == nil || f.Key != "new-year" || off != 2 {
		t.Fatalf("2027-01-03: got %v off %d, want new-year +2", f, off)
	}
	if got := activeKey(myt("2027-01-05 09:00")); got != "" {
		t.Errorf("2027-01-05: got %q want none", got)
	}
}

func TestNoFestivalOutsideWindows(t *testing.T) {
	if got := activeKey(myt("2026-07-04 12:00")); got != "" {
		t.Errorf("got %q want none", got)
	}
}

func TestSundayRules(t *testing.T) {
	want := map[string][]string{
		"mothers-day": {"2026-05-10", "2027-05-09", "2028-05-14"},
		"fathers-day": {"2026-06-21", "2027-06-20", "2028-06-18"},
	}
	for k, dates := range want {
		f := FestivalByKey(k)
		for _, s := range dates {
			d, _ := time.Parse("2006-01-02", s)
			got := f.occurrences(d.Year())
			if len(got) != 1 || !got[0].Equal(d) {
				t.Errorf("%s %d: got %v want %s", k, d.Year(), got, s)
			}
		}
	}
}

func TestEveryFestivalHasGreetingsAndActivates(t *testing.T) {
	for _, f := range Festivals {
		for _, l := range []string{"en", "zh-CN", "ms"} {
			if f.Greeting(l) == "" {
				t.Errorf("%s: empty %s greeting", f.Key, l)
			}
		}
		days := f.occurrences(2027)
		if len(days) == 0 {
			t.Errorf("%s: no 2027 date", f.Key)
			continue
		}
		at := time.Date(days[0].Year(), days[0].Month(), days[0].Day(), 12, 0, 0, 0, FestivalMYT)
		if got, _ := ActiveFestival(at); got == nil {
			t.Errorf("%s: not active on its own day %s", f.Key, days[0].Format("2006-01-02"))
		}
	}
}

func TestCustomWindow(t *testing.T) {
	f := FestivalByKey("deepavali")
	old := f.Before
	f.Before = 10
	defer func() { f.Before = old }()
	if got := activeKey(myt("2026-10-29 10:00")); got != "deepavali" {
		t.Errorf("got %q want deepavali with 10-day lead", got)
	}
}
