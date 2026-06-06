/*
  Warnings:

  - Made the column `patientId` on table `Medication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Medication` DROP FOREIGN KEY `Medication_patientId_fkey`;

-- AlterTable
ALTER TABLE `Medication` MODIFY `patientId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
