/*
  Warnings:

  - You are about to drop the column `montlyUsage` on the `Api` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Api" DROP COLUMN "montlyUsage",
ADD COLUMN     "monthlyUsage" INTEGER NOT NULL DEFAULT 20000;
