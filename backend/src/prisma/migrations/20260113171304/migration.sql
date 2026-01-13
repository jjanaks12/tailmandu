/*
  Warnings:

  - A unique constraint covering the columns `[position,stage_category_id]` on the table `ranks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stage_category_id` to the `ranks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ranks` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `stage_category_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ranks_position_stage_category_id_key` ON `ranks`(`position`, `stage_category_id`);

-- AddForeignKey
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_stage_category_id_fkey` FOREIGN KEY (`stage_category_id`) REFERENCES `stage_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
