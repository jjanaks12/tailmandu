-- AlterTable
ALTER TABLE `events` ADD COLUMN `excerpt` VARCHAR(191) NULL,
    ADD COLUMN `image_id` VARCHAR(191) NULL,
    ADD COLUMN `map_file_id` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `stages` ADD COLUMN `map_file_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `companyId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `type` ENUM('BILLING', 'SHIPPING', 'PERMANENT_ADDRESS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `short_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address_id` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `vat_registered` BOOLEAN NOT NULL,
    `pan_no` VARCHAR(191) NULL,
    `vat_no` VARCHAR(191) NULL,
    `image_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_trail_race_gallery` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_trail_race_gallery_AB_unique`(`A`, `B`),
    INDEX `_trail_race_gallery_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_map_file_id_fkey` FOREIGN KEY (`map_file_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stages` ADD CONSTRAINT `stages_map_file_id_fkey` FOREIGN KEY (`map_file_id`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_trail_race_gallery` ADD CONSTRAINT `_trail_race_gallery_A_fkey` FOREIGN KEY (`A`) REFERENCES `images`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_trail_race_gallery` ADD CONSTRAINT `_trail_race_gallery_B_fkey` FOREIGN KEY (`B`) REFERENCES `events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
