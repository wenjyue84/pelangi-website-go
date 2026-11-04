package handlers

import (
	"os"
	"time"

	"pelangi-website/internal/data"
)

// FestivalPreviewItem is one row of the preview table the client script uses
// to swap themes when FESTIVAL_PREVIEW=1 and the URL has ?festival=<key>.
type FestivalPreviewItem struct {
	Key, Motif, Fx, Greeting string
}

type festivalView struct {
	Key, Motif, Fx, Greeting string
	Preview                  bool
	Table                    []FestivalPreviewItem
}

// festivalFields resolves the decoration for one render. The festival is
// chosen per request in Malaysia time, so a theme flips with no deploy.
func festivalFields(lang string, now time.Time) festivalView {
	var v festivalView
	if f, _ := data.ActiveFestival(now); f != nil {
		v.Key, v.Motif, v.Fx, v.Greeting = f.Key, f.Motif, f.Fx, f.Greeting(lang)
	}
	if os.Getenv("FESTIVAL_PREVIEW") == "1" {
		v.Preview = true
		for i := range data.Festivals {
			f := &data.Festivals[i]
			v.Table = append(v.Table, FestivalPreviewItem{f.Key, f.Motif, f.Fx, f.Greeting(lang)})
		}
	}
	return v
}
