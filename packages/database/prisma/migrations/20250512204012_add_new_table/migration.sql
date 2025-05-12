/*
  Warnings:

  - The primary key for the `GenerateStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aiAnalysisProgress` on the `GenerateStatus` table. All the data in the column will be lost.
  - You are about to drop the column `configureServerProgress` on the `GenerateStatus` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `GenerateStatus` table. All the data in the column will be lost.
  - You are about to drop the column `rolesProgress` on the `GenerateStatus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_sessionId_fkey";

-- AlterTable
ALTER TABLE "GenerateStatus" DROP CONSTRAINT "GenerateStatus_pkey",
DROP COLUMN "aiAnalysisProgress",
DROP COLUMN "configureServerProgress",
DROP COLUMN "id",
DROP COLUMN "rolesProgress",
ADD COLUMN     "categoryError" TEXT,
ADD COLUMN     "categoryStatus" TEXT NOT NULL DEFAULT 'waiting';

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GenerateStatus"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GenerateStatus"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
