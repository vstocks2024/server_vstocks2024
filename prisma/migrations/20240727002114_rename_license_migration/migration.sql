-- This is an empty migration.

ALTER TABLE "vectors"
RENAME COLUMN "license" TO "subscription_type";



ALTER TABLE "vectors_url"
RENAME COLUMN "license" TO "subscription_type";