/*
  Warnings:

  - You are about to drop the column `clickButtonUse` on the `Templates` table. All the data in the column will be lost.
  - You are about to drop the column `server` on the `Templates` table. All the data in the column will be lost.
  - You are about to drop the column `serverLink` on the `Templates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `VisitTemplateHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Templates" DROP COLUMN "clickButtonUse",
DROP COLUMN "server",
DROP COLUMN "serverLink";

-- CreateIndex
CREATE UNIQUE INDEX "VisitTemplateHistory_uuid_key" ON "VisitTemplateHistory"("uuid");

-- CreateIndex
CREATE INDEX "VisitTemplateHistory_slugUrl_idx" ON "VisitTemplateHistory"("slugUrl");
