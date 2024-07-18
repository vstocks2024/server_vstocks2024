/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `animations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `vectors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."vectors_url" (
    "vector_id" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "vectors_url_url_key" ON "public"."vectors_url"("url");

-- CreateIndex
CREATE UNIQUE INDEX "animations_name_key" ON "public"."animations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vectors_name_key" ON "public"."vectors"("name");

-- AddForeignKey
ALTER TABLE "public"."vectors_url" ADD CONSTRAINT "vectors_url_vector_id_fkey" FOREIGN KEY ("vector_id") REFERENCES "public"."vectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
