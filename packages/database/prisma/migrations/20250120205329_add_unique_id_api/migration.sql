/*
  Warnings:

  - A unique constraint covering the columns `[apiKeyId]` on the table `Api` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiKeyId` to the `Api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Api" ADD COLUMN     "apiKeyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Api_apiKeyId_key" ON "Api"("apiKeyId");
