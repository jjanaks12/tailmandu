-- CreateTable: Many-to-many join table for Gallery <-> Image
CREATE TABLE `_GalleryToImage` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GalleryToImage_AB_unique`(`A`, `B`),
    INDEX `_GalleryToImage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GalleryToImage` ADD CONSTRAINT `_GalleryToImage_A_fkey` FOREIGN KEY (`A`) REFERENCES `galleries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GalleryToImage` ADD CONSTRAINT `_GalleryToImage_B_fkey` FOREIGN KEY (`B`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- MigrateData: Copy existing galleryId associations into the new join table
INSERT IGNORE INTO `_GalleryToImage` (`A`, `B`)
SELECT `galleryId`, `id` FROM `images` WHERE `galleryId` IS NOT NULL;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_galleryId_fkey`;

-- DropIndex  
DROP INDEX `images_galleryId_fkey` ON `images`;

-- AlterTable: Remove the legacy galleryId column
ALTER TABLE `images` DROP COLUMN `galleryId`;
