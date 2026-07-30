-- Migration: migrate users.secondary_languages UUID[] to join table and add refresh_token_hash in sessions
-- Run this migration after taking a DB backup.

BEGIN;

-- 1) Ensure join table exists
CREATE TABLE IF NOT EXISTS user_secondary_languages (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, language_id)
);

-- 2) Migrate existing array data into join table (no-op if none)
INSERT INTO user_secondary_languages (user_id, language_id)
SELECT u.id, l
FROM users u,
     unnest(coalesce(u.secondary_languages, ARRAY[]::uuid[])) AS l
ON CONFLICT DO NOTHING;

-- 3) Drop the secondary_languages column from users if present
ALTER TABLE users DROP COLUMN IF EXISTS secondary_languages;

-- 4) Add refresh_token_hash column to sessions and backfill from refresh_token (sha256)
-- Requires pgcrypto extension (your schema enables it)
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS refresh_token_hash bytea;

UPDATE sessions
SET refresh_token_hash = digest(refresh_token, 'sha256')
WHERE refresh_token IS NOT NULL;

COMMIT;
