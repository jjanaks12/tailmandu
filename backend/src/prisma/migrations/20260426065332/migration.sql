-- CreateTable
CREATE TABLE `store_settings` (
    `id` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `unit_of_measurement` VARCHAR(191) NOT NULL DEFAULT 'metric',
    `timezone` VARCHAR(191) NOT NULL DEFAULT 'UTC',
    `shipping_zones` JSON NULL,
    `shipping_calculation_method` ENUM('PRICE_BASED', 'PACKAGE_LIBRARY') NOT NULL DEFAULT 'PRICE_BASED',
    `tax_inclusion` BOOLEAN NOT NULL DEFAULT false,
    `nexus_regions` JSON NULL,
    `guest_checkout` BOOLEAN NOT NULL DEFAULT true,
    `abandoned_cart_recovery` BOOLEAN NOT NULL DEFAULT false,
    `policy_pages` JSON NULL,
    `oversell_protection` BOOLEAN NOT NULL DEFAULT false,
    `order_id_prefix` VARCHAR(191) NULL DEFAULT 'ORD-',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
