-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phn` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER', 'NOT_SPECIFIED') NOT NULL,
    `age` INTEGER NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `familyDoctorId` INTEGER NULL,
    `primaryDoctorId` INTEGER NOT NULL,
    `lastClinicVisit` DATETIME(3) NULL,
    `nextClinicVisit` DATETIME(3) NULL,
    `allergies` VARCHAR(191) NOT NULL,
    `primaryCondition` VARCHAR(191) NOT NULL,
    `secondaryCondition` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Patient_phn_key`(`phn`),
    INDEX `Patient_phn_idx`(`phn`),
    INDEX `Patient_lastClinicVisit_idx`(`lastClinicVisit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `licenseNum` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_familyDoctorId_fkey` FOREIGN KEY (`familyDoctorId`) REFERENCES `Doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_primaryDoctorId_fkey` FOREIGN KEY (`primaryDoctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
