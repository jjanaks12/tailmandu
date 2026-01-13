-- AlterTable
ALTER TABLE `event_runner_status` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
