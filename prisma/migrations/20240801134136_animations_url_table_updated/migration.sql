/*
  Warnings:

  - You are about to drop the column `url` on the `animations_url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[thumbnail_url]` on the table `animations_url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `thumbnail_url` to the `animations_url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."animations_url_url_key";

-- AlterTable
ALTER TABLE "public"."animations_url" DROP COLUMN "url",
ADD COLUMN     "thumbnail_url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "animations_url_thumbnail_url_key" ON "public"."animations_url"("thumbnail_url");
