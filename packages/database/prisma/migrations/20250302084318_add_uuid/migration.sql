/*
  Warnings:

  - Added the required column `uuid` to the `VisitTemplateHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VisitTemplateHistory" ADD COLUMN     "uuid" TEXT NOT NULL;
