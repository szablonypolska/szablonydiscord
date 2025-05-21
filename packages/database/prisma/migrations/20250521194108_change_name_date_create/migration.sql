/*
  Warnings:

  - You are about to drop the column `dateCreateSystem` on the `Templates` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Templates_dateCreateSystem_idx";

-- AlterTable
ALTER TABLE "Templates" DROP COLUMN "dateCreateSystem",
ADD COLUMN     "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Templates_dateCreate_idx" ON "Templates"("dateCreate");
