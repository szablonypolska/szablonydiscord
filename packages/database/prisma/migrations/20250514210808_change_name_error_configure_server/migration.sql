/*
  Warnings:

  - You are about to drop the column `configureError` on the `GenerateStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" DROP COLUMN "configureError",
ADD COLUMN     "configureServerError" BOOLEAN NOT NULL DEFAULT false;
