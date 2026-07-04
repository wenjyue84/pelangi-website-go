// Package db is the lazy Neon/Postgres client, ported from site/src/lib/db.ts.
// It is used by the Stripe webhook (payment event persistence + idempotency),
// the Beds24 webhook (channel booking audit), and the MCP inquiry tool.
// When DATABASE_URL is unset, Configured() returns false and callers skip
// persistence — matching the TypeScript behavior.
package db

import (
	"context"
	"database/sql"
	"errors"
	"os"
	"sync"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var (
	once    sync.Once
	pool    *sql.DB
	initErr error

	paymentDDLOnce sync.Once
	channelDDLOnce sync.Once
	baseDDLOnce    sync.Once
)

// Configured reports whether DATABASE_URL is set.
func Configured() bool { return os.Getenv("DATABASE_URL") != "" }

// DB returns the lazily-initialized connection pool.
func DB() (*sql.DB, error) {
	once.Do(func() {
		dsn := os.Getenv("DATABASE_URL")
		if dsn == "" {
			initErr = errors.New("DATABASE_URL environment variable is required")
			return
		}
		pool, initErr = sql.Open("pgx", dsn)
		if initErr == nil {
			pool.SetMaxOpenConns(4)
			pool.SetMaxIdleConns(2)
			pool.SetConnMaxIdleTime(2 * time.Minute)
		}
	})
	return pool, initErr
}

func ensurePaymentTables(ctx context.Context, db *sql.DB) error {
	var err error
	paymentDDLOnce.Do(func() {
		_, err = db.ExecContext(ctx, `
			CREATE TABLE IF NOT EXISTS stripe_payment_events (
				id                 SERIAL PRIMARY KEY,
				stripe_event_id    TEXT NOT NULL,
				event_type         TEXT,
				payment_intent_id  TEXT,
				amount             INTEGER,
				currency           TEXT,
				guest_email        TEXT,
				guest_name         TEXT,
				status             TEXT,
				raw                JSONB,
				created_at         TIMESTAMPTZ DEFAULT NOW(),
				CONSTRAINT stripe_payment_events_stripe_event_id_key UNIQUE (stripe_event_id)
			)`)
	})
	return err
}

func ensureChannelTables(ctx context.Context, db *sql.DB) error {
	var err error
	channelDDLOnce.Do(func() {
		if _, err = db.ExecContext(ctx, `
			CREATE TABLE IF NOT EXISTS channel_bookings (
				id           SERIAL PRIMARY KEY,
				event_type   TEXT,
				booking_id   TEXT,
				room_id      TEXT,
				status       TEXT,
				payload      JSONB,
				created_at   TIMESTAMPTZ DEFAULT NOW()
			)`); err != nil {
			return
		}
		_, err = db.ExecContext(ctx, `
			CREATE UNIQUE INDEX IF NOT EXISTS channel_bookings_dedupe
				ON channel_bookings (event_type, booking_id)
				WHERE booking_id IS NOT NULL`)
	})
	return err
}

func ensureInquiryTables(ctx context.Context, db *sql.DB) error {
	var err error
	baseDDLOnce.Do(func() {
		_, err = db.ExecContext(ctx, `
			CREATE TABLE IF NOT EXISTS website_inquiries (
				id          SERIAL PRIMARY KEY,
				name        TEXT,
				email       TEXT,
				phone       TEXT,
				message     TEXT NOT NULL,
				check_in    DATE,
				check_out   DATE,
				guests      INT,
				session_id  TEXT,
				source      TEXT DEFAULT 'chatbot',
				created_at  TIMESTAMPTZ DEFAULT NOW()
			)`)
	})
	return err
}

// InsertStripeEvent persists a Stripe event with ON CONFLICT idempotency.
// Returns firstDelivery=true only when a new row was inserted.
func InsertStripeEvent(ctx context.Context, eventID, eventType, piID string, amount *int, currency, email, name, status, raw string) (firstDelivery bool, err error) {
	db, err := DB()
	if err != nil {
		return false, err
	}
	if err = ensurePaymentTables(ctx, db); err != nil {
		return false, err
	}
	var id int
	err = db.QueryRowContext(ctx, `
		INSERT INTO stripe_payment_events
			(stripe_event_id, event_type, payment_intent_id, amount, currency, guest_email, guest_name, status, raw)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb)
		ON CONFLICT (stripe_event_id) DO NOTHING
		RETURNING id`,
		eventID, nullStr(eventType), nullStr(piID), nullInt(amount), nullStr(currency), nullStr(email), nullStr(name), nullStr(status), raw,
	).Scan(&id)
	if err == sql.ErrNoRows {
		return false, nil // conflict — already processed
	}
	if err != nil {
		return false, err
	}
	return true, nil
}

// InsertChannelBooking persists a Beds24 channel event (best-effort dedupe).
func InsertChannelBooking(ctx context.Context, eventType, bookingID, roomID, status, payload string) error {
	db, err := DB()
	if err != nil {
		return err
	}
	if err = ensureChannelTables(ctx, db); err != nil {
		return err
	}
	_, err = db.ExecContext(ctx, `
		INSERT INTO channel_bookings (event_type, booking_id, room_id, status, payload)
		VALUES ($1,$2,$3,$4,$5::jsonb)
		ON CONFLICT (event_type, booking_id) WHERE booking_id IS NOT NULL DO NOTHING`,
		nullStr(eventType), nullStr(bookingID), nullStr(roomID), nullStr(status), payload)
	return err
}

// InsertInquiry persists a guest inquiry (MCP pelangi_create_inquiry tool).
func InsertInquiry(ctx context.Context, name, email, phone, message, checkIn, checkOut string, guests int, sessionID, source string) (int, error) {
	db, err := DB()
	if err != nil {
		return 0, err
	}
	if err = ensureInquiryTables(ctx, db); err != nil {
		return 0, err
	}
	var id int
	err = db.QueryRowContext(ctx, `
		INSERT INTO website_inquiries (name, email, phone, message, check_in, check_out, guests, session_id, source)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
		nullStr(name), nullStr(email), nullStr(phone), message, nullDate(checkIn), nullDate(checkOut), nullIntVal(guests), nullStr(sessionID), source,
	).Scan(&id)
	return id, err
}

func nullStr(s string) any {
	if s == "" {
		return nil
	}
	return s
}
func nullInt(p *int) any {
	if p == nil {
		return nil
	}
	return *p
}
func nullIntVal(v int) any {
	if v == 0 {
		return nil
	}
	return v
}
func nullDate(s string) any {
	if s == "" {
		return nil
	}
	return s
}
