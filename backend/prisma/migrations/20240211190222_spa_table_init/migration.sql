/*
  Warnings:

  - You are about to drop the `verify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `verify` DROP FOREIGN KEY `verify_ownerId_fkey`;

-- DropTable
DROP TABLE `verify`;
