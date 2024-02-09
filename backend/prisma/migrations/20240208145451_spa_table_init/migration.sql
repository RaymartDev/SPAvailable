/*
  Warnings:

  - You are about to alter the column `email` on the `spa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `contact` on the `spa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `contact` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.

*/
-- DropIndex
DROP INDEX `spa_email_key` ON `spa`;

-- AlterTable
ALTER TABLE `spa` MODIFY `email` VARCHAR(50) NULL,
    MODIFY `contact` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(50) NOT NULL,
    MODIFY `contact` VARCHAR(20) NULL;
