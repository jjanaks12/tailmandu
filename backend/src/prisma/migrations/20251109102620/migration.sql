-- AlterTable
ALTER TABLE `stage_categories` ADD COLUMN `map_file_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `stage_categories` ADD CONSTRAINT `stage_categories_map_file_id_fkey` FOREIGN KEY (`map_file_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
