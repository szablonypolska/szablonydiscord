/*
  Warnings:

  - Made the column `code` on table `GenerateStatus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" ALTER COLUMN "code" SET NOT NULL,
ALTER COLUMN "code" SET DEFAULT '';
