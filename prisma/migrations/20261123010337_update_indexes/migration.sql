/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Medication_drugIdentificationNumber_idx` ON `Medication`;

-- DropIndex
DROP INDEX `Medication_genericName_idx` ON `Medication`;

-- DropIndex
DROP INDEX `Patient_phn_idx` ON `Patient`;

-- CreateIndex
CREATE UNIQUE INDEX `Doctor_email_key` ON `Doctor`(`email`);

-- CreateIndex
CREATE INDEX `Doctor_specialty_idx` ON `Doctor`(`specialty`);

-- CreateIndex
CREATE INDEX `Doctor_lastName_idx` ON `Doctor`(`lastName`);

-- CreateIndex
CREATE INDEX `Medication_type_idx` ON `Medication`(`type`);

-- CreateIndex
CREATE INDEX `Patient_nextClinicVisit_idx` ON `Patient`(`nextClinicVisit`);

-- CreateIndex
CREATE INDEX `Patient_province_idx` ON `Patient`(`province`);

-- CreateIndex
CREATE INDEX `Patient_gender_idx` ON `Patient`(`gender`);

-- CreateIndex
CREATE INDEX `Patient_lastName_firstName_idx` ON `Patient`(`lastName`, `firstName`);
