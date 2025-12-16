/*
  Warnings:

  - A unique constraint covering the columns `[stage_category_id]` on the table `stage_category_payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `stage_category_payments_stage_category_id_key` ON `stage_category_payments`(`stage_category_id`);
