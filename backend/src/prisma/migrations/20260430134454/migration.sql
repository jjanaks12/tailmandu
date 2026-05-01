/*
  Warnings:

  - You are about to drop the column `base_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `original_price` on the `products` table. All the data in the column will be lost.
  - Made the column `price` on table `product_variants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product_variants` ADD COLUMN `original_price` DECIMAL(10, 2) NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `base_price`,
    DROP COLUMN `original_price`;
