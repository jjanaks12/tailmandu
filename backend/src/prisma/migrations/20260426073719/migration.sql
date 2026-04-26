-- AlterTable
ALTER TABLE `store_settings` ADD COLUMN `abandoned_cart_delay` INTEGER NOT NULL DEFAULT 60,
    ADD COLUMN `allow_backorder` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `free_shipping_threshold` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `low_stock_threshold` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `shipping_packages` JSON NULL,
    ADD COLUMN `tax_apply_to_shipping` BOOLEAN NOT NULL DEFAULT false;
