/*
  Warnings:

  - A unique constraint covering the columns `[position,stage_category_id,gender_id]` on the table `ranks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ranks_position_stage_category_id_key` ON `ranks`;

-- AlterTable
ALTER TABLE `ranks` ADD COLUMN `gender_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ranks_position_stage_category_id_gender_id_key` ON `ranks`(`position`, `stage_category_id`, `gender_id`);

-- AddForeignKey
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `genders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
