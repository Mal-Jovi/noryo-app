/*
  Warnings:

  - The primary key for the `Medication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Medication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[drugIdentificationNumber]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Medication` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`drugIdentificationNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Medication_drugIdentificationNumber_key` ON `Medication`(`drugIdentificationNumber`);
