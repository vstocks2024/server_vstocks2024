/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `vectors_url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `vectors_url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `vectors_url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `vectors_url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `vectors_url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shares` to the `vectors_url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."vectors_url" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "shares" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vectors_url_name_key" ON "public"."vectors_url"("name");
