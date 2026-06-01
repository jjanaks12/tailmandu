-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_image_id_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_map_file_id_fkey`;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_map_file_id_fkey` FOREIGN KEY (`map_file_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
