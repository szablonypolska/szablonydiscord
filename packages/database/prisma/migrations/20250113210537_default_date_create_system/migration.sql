/*
  Warnings:

  - Made the column `dateCreateSystem` on table `Templates` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Templates_dateCreate_idx";

-- AlterTable
ALTER TABLE "Templates" ALTER COLUMN "dateCreateSystem" SET NOT NULL,
ALTER COLUMN "dateCreateSystem" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Templates_dateCreateSystem_idx" ON "Templates"("dateCreateSystem");
