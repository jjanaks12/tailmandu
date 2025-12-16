/*
  Warnings:

  - You are about to drop the column `difficulty` on the `stages` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `stages` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `stages` table. All the data in the column will be lost.
  - You are about to drop the column `map_file_id` on the `stages` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `stages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stages` DROP FOREIGN KEY `stages_map_file_id_fkey`;

-- DropIndex
DROP INDEX `stages_map_file_id_fkey` ON `stages`;

-- AlterTable
ALTER TABLE `stages` DROP COLUMN `difficulty`,
    DROP COLUMN `distance`,
    DROP COLUMN `end`,
    DROP COLUMN `map_file_id`,
    DROP COLUMN `start`;
