/*
  Warnings:

  - You are about to drop the column `patientId` on the `Medication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Medication` DROP FOREIGN KEY `Medication_patientId_fkey`;

-- DropIndex
DROP INDEX `Medication_patientId_fkey` ON `Medication`;

-- AlterTable
ALTER TABLE `Medication` DROP COLUMN `patientId`;

-- CreateTable
CREATE TABLE `009` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PatientMedications_AB_unique`(`A`, `B`),
    INDEX `_PatientMedications_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PatientMedications` ADD CONSTRAINT `_PatientMedications_A_fkey` FOREIGN KEY (`A`) REFERENCES `Medication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PatientMedications` ADD CONSTRAINT `_PatientMedications_B_fkey` FOREIGN KEY (`B`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
