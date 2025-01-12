/*
  Warnings:

  - Made the column `usageCount` on table `Templates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Templates" ALTER COLUMN "usageCount" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
