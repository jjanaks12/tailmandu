-- CreateTable
CREATE TABLE `social_links` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `partnerId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CompanyToSocialLink` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CompanyToSocialLink_AB_unique`(`A`, `B`),
    INDEX `_CompanyToSocialLink_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SocialLinkToSponsor` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SocialLinkToSponsor_AB_unique`(`A`, `B`),
    INDEX `_SocialLinkToSponsor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `social_links` ADD CONSTRAINT `social_links_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToSocialLink` ADD CONSTRAINT `_CompanyToSocialLink_A_fkey` FOREIGN KEY (`A`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToSocialLink` ADD CONSTRAINT `_CompanyToSocialLink_B_fkey` FOREIGN KEY (`B`) REFERENCES `social_links`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SocialLinkToSponsor` ADD CONSTRAINT `_SocialLinkToSponsor_A_fkey` FOREIGN KEY (`A`) REFERENCES `social_links`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SocialLinkToSponsor` ADD CONSTRAINT `_SocialLinkToSponsor_B_fkey` FOREIGN KEY (`B`) REFERENCES `sponsors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
