/*
  Warnings:

  - You are about to drop the column `authentication` on the `GenerateStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenerateStatus" DROP COLUMN "authentication",
ADD COLUMN     "authenticationStatus" TEXT NOT NULL DEFAULT 'waiting';
