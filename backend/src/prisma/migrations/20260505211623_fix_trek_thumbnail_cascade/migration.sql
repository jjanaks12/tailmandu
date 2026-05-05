-- DropForeignKey
ALTER TABLE `treks` DROP FOREIGN KEY `treks_image_id_fkey`;

-- DropIndex
DROP INDEX `treks_image_id_fkey` ON `treks`;

-- AddForeignKey
ALTER TABLE `treks` ADD CONSTRAINT `treks_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
