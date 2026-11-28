-- AlterTable
ALTER TABLE `Doctor` MODIFY `licenseNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Medication` MODIFY `drugIdentificationNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patient` MODIFY `phn` VARCHAR(191) NOT NULL;
