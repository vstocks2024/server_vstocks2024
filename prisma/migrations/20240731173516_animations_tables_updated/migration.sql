/*
  Warnings:

  - Added the required column `license` to the `animations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientation` to the `animations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."animations" ADD COLUMN     "license" TEXT NOT NULL,
ADD COLUMN     "orientation" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."animations_url" (
    "animation_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "orientation" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animations_url_pkey" PRIMARY KEY ("animation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "animations_url_name_key" ON "public"."animations_url"("name");

-- CreateIndex
CREATE UNIQUE INDEX "animations_url_url_key" ON "public"."animations_url"("url");

-- AddForeignKey
ALTER TABLE "public"."animations_url" ADD CONSTRAINT "animations_url_animation_id_fkey" FOREIGN KEY ("animation_id") REFERENCES "public"."animations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
