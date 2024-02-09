-- AlterTable
ALTER TABLE `product` MODIFY `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `service` MODIFY `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;
