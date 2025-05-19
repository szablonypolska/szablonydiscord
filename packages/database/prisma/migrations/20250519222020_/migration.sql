/*
  Warnings:

  - You are about to drop the column `link` on the `GenerateStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" DROP COLUMN "link",
ADD COLUMN     "templateCode" TEXT;
