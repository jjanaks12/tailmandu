/*
  Warnings:

  - Added the required column `price` to the `treks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `treks` ADD COLUMN `price` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_TagToTrek` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TagToTrek_AB_unique`(`A`, `B`),
    INDEX `_TagToTrek_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TagToTrek` ADD CONSTRAINT `_TagToTrek_A_fkey` FOREIGN KEY (`A`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToTrek` ADD CONSTRAINT `_TagToTrek_B_fkey` FOREIGN KEY (`B`) REFERENCES `treks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
