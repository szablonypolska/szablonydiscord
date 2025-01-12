/*
  Warnings:

  - Added the required column `description` to the `Templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Templates" ADD COLUMN     "description" TEXT NOT NULL;
