/*
  Warnings:

  - Added the required column `categoryId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "parentId" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;
