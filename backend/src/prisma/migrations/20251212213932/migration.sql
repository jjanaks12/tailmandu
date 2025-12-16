/*
  Warnings:

  - You are about to drop the column `stage_id` on the `payments` table. All the data in the column will be lost.
  - Added the required column `stage_category_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_stage_id_fkey`;

-- DropIndex
DROP INDEX `payments_stage_id_fkey` ON `payments`;

-- AlterTable
ALTER TABLE `payments` DROP COLUMN `stage_id`,
    ADD COLUMN `stage_category_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_stage_category_id_fkey` FOREIGN KEY (`stage_category_id`) REFERENCES `stage_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
