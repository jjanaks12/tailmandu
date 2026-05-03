-- CreateTable
CREATE TABLE `newsletter_topics` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `newsletter_topics_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NewsletterToNewsletterTopic` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_NewsletterToNewsletterTopic_AB_unique`(`A`, `B`),
    INDEX `_NewsletterToNewsletterTopic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_NewsletterToNewsletterTopic` ADD CONSTRAINT `_NewsletterToNewsletterTopic_A_fkey` FOREIGN KEY (`A`) REFERENCES `newsletters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NewsletterToNewsletterTopic` ADD CONSTRAINT `_NewsletterToNewsletterTopic_B_fkey` FOREIGN KEY (`B`) REFERENCES `newsletter_topics`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
