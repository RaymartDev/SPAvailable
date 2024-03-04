-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_spaId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_spaId_fkey`;

-- CreateTable
CREATE TABLE `spa_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spaId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    UNIQUE INDEX `spa_service_spaId_serviceId_key`(`spaId`, `serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spa_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spaId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `spa_product_spaId_productId_key`(`spaId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `spa_service` ADD CONSTRAINT `spa_service_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spa_service` ADD CONSTRAINT `spa_service_spaId_fkey` FOREIGN KEY (`spaId`) REFERENCES `spa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spa_product` ADD CONSTRAINT `spa_product_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `spa_product` ADD CONSTRAINT `spa_product_spaId_fkey` FOREIGN KEY (`spaId`) REFERENCES `spa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
