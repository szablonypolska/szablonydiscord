/*
  Warnings:

  - You are about to drop the column `aiAnalysisError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `aiAnalysisStatus` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `authenticationError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `authenticationStatus` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `categoryError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `categoryNumber` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `categoryStatus` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `channelError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `channelNumber` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `channelStatus` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `configureServerError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `configureServerStatus` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `faq` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `hasError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `privacyPolicy` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `rolesError` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `rolesNumber` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `rolesStatus` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `rules` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `tariff` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Role` table. All the data in the column will be lost.
  - Added the required column `stageId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stageId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "szablonydiscord"."BuilderProcessStatus" AS ENUM ('WAITING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "szablonydiscord"."BuilderStageType" AS ENUM ('ANALYSIS', 'AUTHENTICATION', 'CONFIGURE_SERVER', 'ROLES_CREATE', 'CHANNELS_CREATE', 'CATEGORIES_CREATE');

-- DropForeignKey
ALTER TABLE "szablonydiscord"."Category" DROP CONSTRAINT "Category_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "szablonydiscord"."Channel" DROP CONSTRAINT "Channel_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "szablonydiscord"."Role" DROP CONSTRAINT "Role_sessionId_fkey";

-- AlterTable
ALTER TABLE "szablonydiscord"."Builder" DROP COLUMN "aiAnalysisError",
DROP COLUMN "aiAnalysisStatus",
DROP COLUMN "authenticationError",
DROP COLUMN "authenticationStatus",
DROP COLUMN "categoryError",
DROP COLUMN "categoryNumber",
DROP COLUMN "categoryStatus",
DROP COLUMN "channelError",
DROP COLUMN "channelNumber",
DROP COLUMN "channelStatus",
DROP COLUMN "code",
DROP COLUMN "configureServerError",
DROP COLUMN "configureServerStatus",
DROP COLUMN "faq",
DROP COLUMN "hasError",
DROP COLUMN "privacyPolicy",
DROP COLUMN "rolesError",
DROP COLUMN "rolesNumber",
DROP COLUMN "rolesStatus",
DROP COLUMN "rules",
DROP COLUMN "tariff";

-- AlterTable
ALTER TABLE "szablonydiscord"."Category" DROP COLUMN "sessionId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "szablonydiscord"."Channel" DROP COLUMN "sessionId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "szablonydiscord"."Role" DROP COLUMN "sessionId",
ADD COLUMN     "stageId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "szablonydiscord"."Materials" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "tariff" TEXT NOT NULL,
    "privacyPolicy" TEXT NOT NULL,
    "faq" TEXT NOT NULL,

    CONSTRAINT "Materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."BuilderProcess" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "overallStatus" "szablonydiscord"."BuilderProcessStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "BuilderProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."BuilderStage" (
    "id" SERIAL NOT NULL,
    "processId" INTEGER NOT NULL,
    "type" "szablonydiscord"."BuilderStageType" NOT NULL,
    "status" "szablonydiscord"."BuilderProcessStatus" NOT NULL DEFAULT 'WAITING',
    "hasError" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "BuilderStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."CategoryStage" (
    "id" SERIAL NOT NULL,
    "builderStageId" INTEGER NOT NULL,

    CONSTRAINT "CategoryStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."ChannelStage" (
    "id" SERIAL NOT NULL,
    "builderStageId" INTEGER NOT NULL,

    CONSTRAINT "ChannelStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."RoleStage" (
    "id" SERIAL NOT NULL,
    "builderStageId" INTEGER NOT NULL,

    CONSTRAINT "RoleStage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Materials_sessionId_key" ON "szablonydiscord"."Materials"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProcess_sessionId_key" ON "szablonydiscord"."BuilderProcess"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryStage_builderStageId_key" ON "szablonydiscord"."CategoryStage"("builderStageId");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelStage_builderStageId_key" ON "szablonydiscord"."ChannelStage"("builderStageId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleStage_builderStageId_key" ON "szablonydiscord"."RoleStage"("builderStageId");

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Materials" ADD CONSTRAINT "Materials_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "szablonydiscord"."Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."BuilderProcess" ADD CONSTRAINT "BuilderProcess_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "szablonydiscord"."Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."BuilderStage" ADD CONSTRAINT "BuilderStage_processId_fkey" FOREIGN KEY ("processId") REFERENCES "szablonydiscord"."BuilderProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."CategoryStage" ADD CONSTRAINT "CategoryStage_builderStageId_fkey" FOREIGN KEY ("builderStageId") REFERENCES "szablonydiscord"."BuilderStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."ChannelStage" ADD CONSTRAINT "ChannelStage_builderStageId_fkey" FOREIGN KEY ("builderStageId") REFERENCES "szablonydiscord"."BuilderStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."RoleStage" ADD CONSTRAINT "RoleStage_builderStageId_fkey" FOREIGN KEY ("builderStageId") REFERENCES "szablonydiscord"."BuilderStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Category" ADD CONSTRAINT "Category_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "szablonydiscord"."CategoryStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Channel" ADD CONSTRAINT "Channel_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "szablonydiscord"."ChannelStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Role" ADD CONSTRAINT "Role_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "szablonydiscord"."RoleStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
