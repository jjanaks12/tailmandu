-- CreateTable
CREATE TABLE `runner_attendance` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `runner_id` VARCHAR(191) NOT NULL,
    `stage_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `runner_attendance_runner_id_stage_id_key`(`runner_id`, `stage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `runner_attendance` ADD CONSTRAINT `runner_attendance_runner_id_fkey` FOREIGN KEY (`runner_id`) REFERENCES `event_runners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `runner_attendance` ADD CONSTRAINT `runner_attendance_stage_id_fkey` FOREIGN KEY (`stage_id`) REFERENCES `stages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
