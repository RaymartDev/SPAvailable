-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_spaId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_spaId_fkey`;

-- DropForeignKey
ALTER TABLE `spa` DROP FOREIGN KEY `spa_ownerId_fkey`;

-- AddForeignKey
ALTER TABLE `spa` ADD CONSTRAINT `spa_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_spaId_fkey` FOREIGN KEY (`spaId`) REFERENCES `spa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_spaId_fkey` FOREIGN KEY (`spaId`) REFERENCES `spa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
