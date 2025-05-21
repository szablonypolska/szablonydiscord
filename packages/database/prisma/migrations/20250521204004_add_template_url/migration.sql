/*
  Warnings:

  - You are about to drop the column `published` on the `GenerateStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" DROP COLUMN "published",
ADD COLUMN     "templateUrl" TEXT;
