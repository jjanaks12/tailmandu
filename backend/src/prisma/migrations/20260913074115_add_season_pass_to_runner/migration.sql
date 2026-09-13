-- AlterTable
ALTER TABLE `event_runners` ADD COLUMN `season_pass_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `event_runners` ADD CONSTRAINT `event_runners_season_pass_id_fkey` FOREIGN KEY (`season_pass_id`) REFERENCES `season_passes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
