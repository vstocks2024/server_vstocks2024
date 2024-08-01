/*
  Warnings:

  - You are about to drop the column `data` on the `animations` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `animations_url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."animations" DROP COLUMN "data",
ADD COLUMN     "animation_data" JSONB[];

-- AlterTable
ALTER TABLE "public"."animations_url" DROP COLUMN "data",
ADD COLUMN     "animation_data" JSONB[];
