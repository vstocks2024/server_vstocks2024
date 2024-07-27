-- This is an empty migration.
-- This is an empty migration.

ALTER TABLE "vectors"
RENAME COLUMN "subscription_type" TO "license";



ALTER TABLE "vectors_url"
RENAME COLUMN "subscription_type" TO "license"; 