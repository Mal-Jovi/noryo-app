/*
  Warnings:

  - The primary key for the `Medication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Medication_drugIdentificationNumber_key` ON `Medication`;

-- AlterTable
ALTER TABLE `Medication` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
