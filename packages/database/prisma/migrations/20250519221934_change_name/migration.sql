/*
  Warnings:

  - You are about to drop the column `slugUrl` on the `GenerateStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" DROP COLUMN "slugUrl",
ADD COLUMN     "link" TEXT;
