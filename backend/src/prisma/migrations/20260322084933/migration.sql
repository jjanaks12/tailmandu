/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `treks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `treks` ADD COLUMN `slug` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `treks_slug_key` ON `treks`(`slug`);
