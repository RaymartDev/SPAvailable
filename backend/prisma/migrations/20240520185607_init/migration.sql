-- AlterSequence
ALTER SEQUENCE "spa_review_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "admin" BOOL NOT NULL DEFAULT false;
