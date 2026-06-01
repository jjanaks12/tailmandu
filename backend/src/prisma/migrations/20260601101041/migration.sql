/*
  Warnings:

  - You are about to drop the `_trail_race_gallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_trail_race_gallery` DROP FOREIGN KEY `_trail_race_gallery_A_fkey`;

-- DropForeignKey
ALTER TABLE `_trail_race_gallery` DROP FOREIGN KEY `_trail_race_gallery_B_fkey`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `gallery_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_trail_race_gallery`;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_gallery_id_fkey` FOREIGN KEY (`gallery_id`) REFERENCES `galleries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
