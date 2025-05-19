/*
  Warnings:

  - Changed the type of `position` on the `Channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "position",
ADD COLUMN     "position" INTEGER NOT NULL;
