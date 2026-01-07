-- AlterTable
ALTER TABLE `checkpoints` ADD COLUMN `is_end` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_start` BOOLEAN NOT NULL DEFAULT false;
