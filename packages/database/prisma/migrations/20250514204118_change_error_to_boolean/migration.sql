/*
  Warnings:

  - The `aiAnalysisError` column on the `GenerateStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `configureError` column on the `GenerateStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rolesError` column on the `GenerateStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categoryError` column on the `GenerateStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `channelError` column on the `GenerateStatus` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" DROP COLUMN "aiAnalysisError",
ADD COLUMN     "aiAnalysisError" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "configureError",
ADD COLUMN     "configureError" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "rolesError",
ADD COLUMN     "rolesError" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "categoryError",
ADD COLUMN     "categoryError" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "channelError",
ADD COLUMN     "channelError" BOOLEAN NOT NULL DEFAULT false;
