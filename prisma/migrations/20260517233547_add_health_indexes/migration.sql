-- migration.sql

-- Index for allergies
ALTER TABLE `Patient` 
ADD INDEX `idx_allergies` ((CAST(`allergies` AS CHAR(255) ARRAY)));

-- Index for primaryCondition
ALTER TABLE `Patient` 
ADD INDEX `idx_primaryCondition` ((CAST(`primaryCondition` AS CHAR(255) ARRAY)));

-- Index for secondaryCondition
ALTER TABLE `Patient` 
ADD INDEX `idx_secondaryCondition` ((CAST(`secondaryCondition` AS CHAR(255) ARRAY)));


