/*
  Warnings:

  - You are about to drop the column `dailyUsage` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyUsage` on the `Api` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Api" DROP COLUMN "dailyUsage",
DROP COLUMN "monthlyUsage",
ADD COLUMN     "dailyLimit" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "monthlyLimit" INTEGER NOT NULL DEFAULT 20000;
