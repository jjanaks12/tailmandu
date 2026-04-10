-- CreateTable
CREATE TABLE `trek_bookings` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `departure_date` DATETIME(3) NOT NULL,
    `adults` INTEGER NOT NULL DEFAULT 1,
    `children` INTEGER NOT NULL DEFAULT 0,
    `gear_option` VARCHAR(191) NOT NULL DEFAULT 'standard',
    `insurance` BOOLEAN NOT NULL DEFAULT true,
    `airport_pickup` BOOLEAN NOT NULL DEFAULT false,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `lead_name` VARCHAR(191) NOT NULL,
    `lead_passport` VARCHAR(191) NOT NULL,
    `lead_fitness_level` VARCHAR(191) NOT NULL,
    `lead_altitude_exp` VARCHAR(191) NULL,
    `lead_dietary` VARCHAR(191) NULL,
    `trek_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trek_booking_travelers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `passport` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `dietary` VARCHAR(191) NULL,
    `is_lead` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `booking_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trek_bookings` ADD CONSTRAINT `trek_bookings_trek_id_fkey` FOREIGN KEY (`trek_id`) REFERENCES `treks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trek_booking_travelers` ADD CONSTRAINT `trek_booking_travelers_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `trek_bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
