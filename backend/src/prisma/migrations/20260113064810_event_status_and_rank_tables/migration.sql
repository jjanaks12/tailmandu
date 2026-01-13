/*
  Warnings:

  - You are about to drop the column `sizeId` on the `event_runners` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bib,stage_category_id]` on the table `event_runners` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `event_runners` DROP FOREIGN KEY `event_runners_sizeId_fkey`;

-- DropIndex
DROP INDEX `event_runners_sizeId_fkey` ON `event_runners`;

-- AlterTable
ALTER TABLE `event_runners` DROP COLUMN `sizeId`;

-- CreateTable
CREATE TABLE `event_runner_status` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('DID_NOT_FINISH', 'DISQUALIFIED', 'ACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `runner_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `event_runner_status_runner_id_key`(`runner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ranks` (
    `id` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `runner_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ranks_runner_id_key`(`runner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `event_runners_bib_stage_category_id_key` ON `event_runners`(`bib`, `stage_category_id`);

-- AddForeignKey
ALTER TABLE `event_runner_status` ADD CONSTRAINT `event_runner_status_runner_id_fkey` FOREIGN KEY (`runner_id`) REFERENCES `event_runners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_runner_id_fkey` FOREIGN KEY (`runner_id`) REFERENCES `event_runners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
