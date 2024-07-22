/*
  Warnings:

  - Added the required column `height` to the `vectors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `vectors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `vectors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `vectors_url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license` to the `vectors_url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `vectors_url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."vectors" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "license" TEXT NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."vectors_url" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "license" TEXT NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;
