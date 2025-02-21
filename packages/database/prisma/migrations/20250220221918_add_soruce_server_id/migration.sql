/*
  Warnings:

  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Templates" ADD COLUMN     "sourceServerId" TEXT;

-- DropTable
DROP TABLE "Template";
