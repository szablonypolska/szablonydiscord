/*
  Warnings:

  - You are about to drop the column `link` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "link",
ADD COLUMN     "slugUrl" TEXT;
