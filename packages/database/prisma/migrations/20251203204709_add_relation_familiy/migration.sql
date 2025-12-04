/*
  Warnings:

  - Made the column `familyId` on table `Templates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Templates" ALTER COLUMN "familyId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Templates_sourceServerId_idx" ON "Templates"("sourceServerId");

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
