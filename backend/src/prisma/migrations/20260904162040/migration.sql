-- AlterTable
ALTER TABLE `pricing_tiers` ADD COLUMN `is_time_based` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `end_date` DATETIME(3) NULL;
