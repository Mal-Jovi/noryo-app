-- CreateTable
CREATE TABLE `Medication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drugIdentificationNumber` INTEGER NOT NULL,
    `genericName` VARCHAR(191) NOT NULL,
    `brandName` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `drugClass` VARCHAR(191) NOT NULL,
    `controlledSubstance` BOOLEAN NOT NULL,
    `patientId` INTEGER NULL,

    INDEX `Medication_drugIdentificationNumber_idx`(`drugIdentificationNumber`),
    INDEX `Medication_genericName_idx`(`genericName`),
    INDEX `Medication_brandName_idx`(`brandName`),
    INDEX `Medication_patientId_fkey`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
