/*
  Warnings:

  - Added the required column `desc` to the `spa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spa` ADD COLUMN `desc` VARCHAR(255) NOT NULL;
