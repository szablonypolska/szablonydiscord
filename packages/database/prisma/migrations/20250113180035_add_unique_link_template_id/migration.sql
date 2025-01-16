/*
  Warnings:

  - A unique constraint covering the columns `[templateId]` on the table `Templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[link]` on the table `Templates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Templates_templateId_key" ON "Templates"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_link_key" ON "Templates"("link");
