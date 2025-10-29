/*
  Warnings:

  - Added the required column `parentId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "szablonydiscord"."Category" ADD COLUMN     "parentId" TEXT NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL;
