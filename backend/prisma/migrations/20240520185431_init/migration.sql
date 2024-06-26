-- AlterSequence
ALTER SEQUENCE "feedback_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "spa_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "spa_service_id_seq" MAXVALUE 9223372036854775807;

-- CreateTable
CREATE TABLE "spa_review" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "spaId" INT4 NOT NULL,
    "level" INT4 NOT NULL,

    CONSTRAINT "spa_review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "spa_review" ADD CONSTRAINT "spa_review_spaId_fkey" FOREIGN KEY ("spaId") REFERENCES "spa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
