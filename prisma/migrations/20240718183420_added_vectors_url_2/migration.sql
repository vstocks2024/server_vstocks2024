/*
  Warnings:

  - Added the required column `updatedAt` to the `animations_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `animations_tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vectors_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vectors_tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `vectors_url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."animations_category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."animations_tag" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."vectors_category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."vectors_tag" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."vectors_url" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
