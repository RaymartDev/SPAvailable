-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `verify` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `verify` ADD CONSTRAINT `verify_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
