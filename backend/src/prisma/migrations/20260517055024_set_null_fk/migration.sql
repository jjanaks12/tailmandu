-- DropForeignKey
ALTER TABLE `treks` DROP FOREIGN KEY `treks_gallery_id_fkey`;

-- DropIndex
DROP INDEX `treks_gallery_id_fkey` ON `treks`;

-- AddForeignKey
ALTER TABLE `treks` ADD CONSTRAINT `treks_gallery_id_fkey` FOREIGN KEY (`gallery_id`) REFERENCES `galleries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
