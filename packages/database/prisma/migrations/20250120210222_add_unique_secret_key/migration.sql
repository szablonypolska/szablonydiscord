/*
  Warnings:

  - A unique constraint covering the columns `[secretKey]` on the table `Api` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Api_secretKey_key" ON "Api"("secretKey");
