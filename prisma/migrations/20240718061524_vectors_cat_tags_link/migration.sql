-- CreateTable
CREATE TABLE "public"."vectors_category" (
    "vector_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "vectors_category_pkey" PRIMARY KEY ("vector_id","category_id")
);

-- CreateTable
CREATE TABLE "public"."vectors_tag" (
    "vector_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "vectors_tag_pkey" PRIMARY KEY ("vector_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "public"."vectors_category" ADD CONSTRAINT "vectors_category_vector_id_fkey" FOREIGN KEY ("vector_id") REFERENCES "public"."vectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vectors_category" ADD CONSTRAINT "vectors_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vectors_tag" ADD CONSTRAINT "vectors_tag_vector_id_fkey" FOREIGN KEY ("vector_id") REFERENCES "public"."vectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."vectors_tag" ADD CONSTRAINT "vectors_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
