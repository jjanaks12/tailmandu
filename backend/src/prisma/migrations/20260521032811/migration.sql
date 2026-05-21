-- CreateTable
CREATE TABLE `static_pages` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `body` LONGTEXT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `seo_id` VARCHAR(191) NULL,
    `featured_image_id` VARCHAR(191) NULL,

    UNIQUE INDEX `static_pages_slug_key`(`slug`),
    UNIQUE INDEX `static_pages_seo_id_key`(`seo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `static_pages` ADD CONSTRAINT `static_pages_seo_id_fkey` FOREIGN KEY (`seo_id`) REFERENCES `seo_metadata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `static_pages` ADD CONSTRAINT `static_pages_featured_image_id_fkey` FOREIGN KEY (`featured_image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
