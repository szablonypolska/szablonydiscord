/*
  Warnings:

  - You are about to drop the column `Link` on the `Templates` table. All the data in the column will be lost.
  - Added the required column `link` to the `Templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Templates" DROP COLUMN "Link",
ADD COLUMN     "link" TEXT NOT NULL;
