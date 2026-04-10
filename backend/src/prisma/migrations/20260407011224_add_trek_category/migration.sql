-- AlterTable
ALTER TABLE `treks` ADD COLUMN `category_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `trek_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treks` ADD CONSTRAINT `treks_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `trek_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
