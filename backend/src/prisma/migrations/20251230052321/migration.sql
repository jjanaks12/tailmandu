-- AlterTable
ALTER TABLE `event_runners` ADD COLUMN `emergency_contact_name` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `emergency_contact_no` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `want_lunch` BOOLEAN NOT NULL DEFAULT false;
