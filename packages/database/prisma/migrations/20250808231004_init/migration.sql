/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Templates" ADD COLUMN     "addingUserId" TEXT,
ADD COLUMN     "userUserId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE INDEX "Templates_authorId_idx" ON "Templates"("authorId");

-- CreateIndex
CREATE INDEX "Templates_addingUserId_idx" ON "Templates"("addingUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_addingUserId_fkey" FOREIGN KEY ("addingUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
