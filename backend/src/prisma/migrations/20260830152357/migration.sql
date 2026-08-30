-- AlterTable
ALTER TABLE `stages` ADD COLUMN `guide_book_file_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `stages` ADD CONSTRAINT `stages_guide_book_file_id_fkey` FOREIGN KEY (`guide_book_file_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
