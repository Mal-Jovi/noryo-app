/*
  Warnings:

  - You are about to alter the column `licenseNumber` on the `Doctor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `phn` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[licenseNumber]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drugIdentificationNumber]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `specialty` VARCHAR(191) NOT NULL,
    MODIFY `licenseNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Patient` MODIFY `phn` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Doctor_licenseNumber_key` ON `Doctor`(`licenseNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Medication_drugIdentificationNumber_key` ON `Medication`(`drugIdentificationNumber`);
