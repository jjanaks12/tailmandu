-- AlterTable
ALTER TABLE `checkpoints` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `volunteer_on_checkpoints` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
