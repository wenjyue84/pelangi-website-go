# Accessibility Compliance — Pelangi Capsule Hostel Website

## WCAG 2.2 SC 3.3.7: Redundant Entry (Level A)

**Status:** Compliant
**Audited:** 2026-03-13
**Standard:** https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html

### Requirement

Information previously entered by or provided to the user that is required to be entered again in the same process is either auto-populated or available for the user to select — unless re-entering the information is essential, the information is required to ensure the security of the content, or previously entered information is no longer valid.

### Audit Results

All forms on the site were audited. No violations found.

#### ContactForm (`site/src/components/ContactForm.tsx`)

| Field | Type | autocomplete | Redundant? |
|-------|------|-------------|------------|
| Name | text | `name` | No |
| Email | email | `email` | No |
| Check-in Date | date | `off` | No — distinct from check-out |
| Check-out Date | date | `off` | No — distinct from check-in |
| Number of Guests | number | — | No |
| Message | textarea | — | No |

- Single-step form — no multi-step process that could re-request data.
- No "confirm email" pattern. Each field collects unique data.
- `autoComplete` attributes set per HTML spec for name/email fields.

#### NewsletterSignupForm (`site/src/components/NewsletterSignupForm.tsx`)

| Field | Type | autocomplete | Redundant? |
|-------|------|-------------|------------|
| First name | text | `given-name` | No |
| Email | email | `email` | No |

- Single-step form, two unique fields. Compliant.

#### ChatWidget (`site/src/components/ChatWidget.tsx`)

- Free-text chat input (textarea). Not a structured form with repeated field types.
- Not applicable to SC 3.3.7.

#### SearchDialog (`site/src/components/SearchDialog.tsx`)

- Site search input. Not a data entry form.
- Not applicable to SC 3.3.7.

### Out of Scope

**`/book` page proxy (admin SPA):** The `/book` route links to external booking platforms (WhatsApp, Booking.com, Hostelworld, Agoda). Any multi-step booking flows on those platforms are the responsibility of the respective platform operators. The site itself contains no booking form.

### Compliance Notes

1. The contact form and newsletter form are both single-step — SC 3.3.7 applies to multi-step processes where data may be re-requested, but single-step forms are inherently compliant.
2. Browser autofill is supported via correct `autoComplete` attributes (`name`, `email`, `given-name`) to reduce cognitive burden.
3. Date fields use `autoComplete="off"` because check-in/check-out dates are booking-specific and should not be auto-filled from prior visits.
