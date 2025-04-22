/*
  Warnings:

  - The primary key for the `Api` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Api` table. All the data in the column will be lost.
  - You are about to drop the column `slugUrl` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Templates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Templates` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Api" DROP CONSTRAINT "Api_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Api_pkey" PRIMARY KEY ("apiKeyId");

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "slugUrl",
ADD COLUMN     "templateId" TEXT;

-- AlterTable
ALTER TABLE "Templates" DROP CONSTRAINT "Templates_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Templates_pkey" PRIMARY KEY ("templateId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
