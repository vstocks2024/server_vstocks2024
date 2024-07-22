/*
  Warnings:

  - Added the required column `orientation` to the `vectors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientation` to the `vectors_url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."vectors" ADD COLUMN     "orientation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."vectors_url" ADD COLUMN     "orientation" TEXT NOT NULL;
