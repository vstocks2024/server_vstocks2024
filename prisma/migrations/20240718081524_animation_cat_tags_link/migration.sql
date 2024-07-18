/*
  Warnings:

  - You are about to drop the column `categories` on the `animations` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `animations` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `vectors` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `vectors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."animations" DROP COLUMN "categories",
DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "public"."vectors" DROP COLUMN "categories",
DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "public"."animations_category" (
    "animation_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "animations_category_pkey" PRIMARY KEY ("animation_id","category_id")
);

-- CreateTable
CREATE TABLE "public"."animations_tag" (
    "animation_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "animations_tag_pkey" PRIMARY KEY ("animation_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "public"."animations_category" ADD CONSTRAINT "animations_category_animation_id_fkey" FOREIGN KEY ("animation_id") REFERENCES "public"."animations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animations_category" ADD CONSTRAINT "animations_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animations_tag" ADD CONSTRAINT "animations_tag_animation_id_fkey" FOREIGN KEY ("animation_id") REFERENCES "public"."animations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animations_tag" ADD CONSTRAINT "animations_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
