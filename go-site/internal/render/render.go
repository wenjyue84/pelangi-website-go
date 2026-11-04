// Package render compiles the embedded html/template files into one template set
// per page. Each page is parsed together with the shared base layout and all
// partials, so {{define "content"}} / {{define "head"}} blocks in a page file
// override the empty defaults in base.html without colliding across pages.
package render

import (
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"path"
	"strings"

	"pelangi-website/internal/data"
)

// Renderer holds one fully-parsed template set per page file.
type Renderer struct {
	sets map[string]*template.Template
}

var funcs = template.FuncMap{
	// safeHTML injects pre-trusted markup (e.g. JSON-LD) without escaping.
	"safeHTML": func(s string) template.HTML { return template.HTML(s) },
	// safeJS injects pre-trusted inline script bodies (consent mode, GTM).
	"safeJS": func(s string) template.JS { return template.JS(s) },
	"safeURL": func(s string) template.URL { return template.URL(s) },
	// Primary contact: Rainbot AI WhatsApp assistant (see data/contact.go).
	"rainbotPhone":   func() string { return data.RainbotPhone },
	"rainbotDisplay": func() string { return data.RainbotPhoneDisplay },
}

// New parses every templates/pages/*.html file against base.html + partials.
func New(fsys fs.FS) (*Renderer, error) {
	pages, err := fs.Glob(fsys, "templates/pages/*.html")
	if err != nil {
		return nil, err
	}
	if len(pages) == 0 {
		return nil, fmt.Errorf("render: no page templates found under templates/pages")
	}

	r := &Renderer{sets: make(map[string]*template.Template, len(pages))}
	for _, p := range pages {
		name := path.Base(p)
		t := template.New("base.html").Funcs(funcs)
		t, err = t.ParseFS(fsys, "templates/base.html", "templates/partials/*.html", p)
		if err != nil {
			return nil, fmt.Errorf("render: parse %s: %w", name, err)
		}
		r.sets[name] = t
	}
	return r, nil
}

// Render executes the named page (e.g. "home.html") into w.
func (r *Renderer) Render(w io.Writer, page string, data any) error {
	t, ok := r.sets[page]
	if !ok {
		return fmt.Errorf("render: unknown page template %q", page)
	}
	return t.ExecuteTemplate(w, "base.html", data)
}

// Partial renders a shared partial template (e.g. "widgetsA") to a string.
// Any page set works because they all include templates/partials/*.html.
// Used to inject the chat widget into the proxied /book SPA response.
func (r *Renderer) Partial(name string, data any) (string, error) {
	for _, t := range r.sets {
		var b strings.Builder
		if err := t.ExecuteTemplate(&b, name, data); err != nil {
			return "", err
		}
		return b.String(), nil
	}
	return "", fmt.Errorf("render: no template sets available")
}
