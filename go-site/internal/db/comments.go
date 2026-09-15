package db

import (
	"context"
	"sync"
	"time"
)

var (
	commentsDDLOnce sync.Once
	commentsDDLErr  error
)

// Comment mirrors the comments table row.
type Comment struct {
	ID          int
	PostSlug    string
	AuthorName  string
	CommentText string
	IPAddress   string
	CreatedAt   time.Time
	IsDeleted   bool
}

// EnsureComments creates the comments table if absent.
// Called lazily on first comment read/write.
func EnsureComments(ctx context.Context) error {
	d, err := DB()
	if err != nil {
		return err
	}
	commentsDDLOnce.Do(func() {
		_, commentsDDLErr = d.ExecContext(ctx, `
			CREATE TABLE IF NOT EXISTS comments (
				id           SERIAL PRIMARY KEY,
				post_slug    TEXT NOT NULL,
				author_name  TEXT NOT NULL,
				comment_text TEXT NOT NULL,
				ip_address   TEXT NOT NULL,
				created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
				is_deleted   BOOLEAN NOT NULL DEFAULT FALSE
			)`)
	})
	return commentsDDLErr
}

// InsertComment inserts a new comment and returns its id and created_at.
func InsertComment(ctx context.Context, slug, author, text, ip string) (int, time.Time, error) {
	d, err := DB()
	if err != nil {
		return 0, time.Time{}, err
	}
	if err := EnsureComments(ctx); err != nil {
		return 0, time.Time{}, err
	}
	var id int
	var createdAt time.Time
	err = d.QueryRowContext(ctx, `
		INSERT INTO comments (post_slug, author_name, comment_text, ip_address)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at`,
		slug, author, text, ip,
	).Scan(&id, &createdAt)
	return id, createdAt, err
}

// ListComments returns non-deleted comments for a post, newest-first.
func ListComments(ctx context.Context, slug string) ([]Comment, error) {
	d, err := DB()
	if err != nil {
		return nil, err
	}
	if err := EnsureComments(ctx); err != nil {
		return nil, err
	}
	rows, err := d.QueryContext(ctx, `
		SELECT id, post_slug, author_name, comment_text, ip_address, created_at, is_deleted
		FROM comments
		WHERE post_slug = $1 AND is_deleted = FALSE
		ORDER BY created_at ASC`, slug)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Comment
	for rows.Next() {
		var c Comment
		if err := rows.Scan(&c.ID, &c.PostSlug, &c.AuthorName, &c.CommentText, &c.IPAddress, &c.CreatedAt, &c.IsDeleted); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

// SoftDeleteComment sets is_deleted=true for the given id.
// Returns (found, error).
func SoftDeleteComment(ctx context.Context, id int) (bool, error) {
	d, err := DB()
	if err != nil {
		return false, err
	}
	if err := EnsureComments(ctx); err != nil {
		return false, err
	}
	res, err := d.ExecContext(ctx, `UPDATE comments SET is_deleted = TRUE WHERE id = $1`, id)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}

// CountRecentByIP returns how many comments ip has posted in the last 24 hours.
func CountRecentByIP(ctx context.Context, ip string) (int, error) {
	d, err := DB()
	if err != nil {
		return 0, err
	}
	if err := EnsureComments(ctx); err != nil {
		return 0, err
	}
	var n int
	err = d.QueryRowContext(ctx, `
		SELECT COUNT(*) FROM comments
		WHERE ip_address = $1 AND created_at > NOW() - INTERVAL '24 hours'`, ip).Scan(&n)
	return n, err
}
