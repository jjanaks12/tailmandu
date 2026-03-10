/*
  Warnings:

  - You are about to drop the column `partnerId` on the `social_links` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `social_links` DROP FOREIGN KEY `social_links_partnerId_fkey`;

-- DropIndex
DROP INDEX `social_links_partnerId_fkey` ON `social_links`;

-- AlterTable
ALTER TABLE `social_links` DROP COLUMN `partnerId`;
