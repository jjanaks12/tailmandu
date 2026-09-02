-- CreateTable
CREATE TABLE `_SeasonPassToStageCategory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SeasonPassToStageCategory_AB_unique`(`A`, `B`),
    INDEX `_SeasonPassToStageCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SeasonPassToStageCategory` ADD CONSTRAINT `_SeasonPassToStageCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `season_passes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SeasonPassToStageCategory` ADD CONSTRAINT `_SeasonPassToStageCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `stage_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
