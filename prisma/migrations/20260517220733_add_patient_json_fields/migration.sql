/*
  Warnings:

  - You are about to alter the column `allergies` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `primaryCondition` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `secondaryCondition` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Patient` MODIFY `allergies` JSON NOT NULL,
    MODIFY `primaryCondition` JSON NOT NULL,
    MODIFY `secondaryCondition` JSON NOT NULL;
