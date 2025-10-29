/*
  Warnings:

  - You are about to drop the column `editing` on the `Builder` table. All the data in the column will be lost.
  - You are about to drop the column `builderAiLimit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `builderAiUsage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreateAccount` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "szablonydiscord"."Builder" DROP CONSTRAINT "Builder_editing_fkey";

-- AlterTable
ALTER TABLE "szablonydiscord"."Builder" DROP COLUMN "editing",
ADD COLUMN     "sourceTemplate" TEXT;

-- AlterTable
ALTER TABLE "szablonydiscord"."Channel" ALTER COLUMN "parentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "szablonydiscord"."User" DROP COLUMN "builderAiLimit",
DROP COLUMN "builderAiUsage",
DROP COLUMN "dateCreateAccount",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "szablonydiscord"."Limits" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "builderAiUsage" INTEGER NOT NULL DEFAULT 0,
    "builderAiLimit" INTEGER NOT NULL DEFAULT 3,
    "builderAiUsageMonthly" INTEGER NOT NULL DEFAULT 0,
    "builderAiLimitMonthly" INTEGER NOT NULL DEFAULT 80,

    CONSTRAINT "Limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Limits_userId_key" ON "szablonydiscord"."Limits"("userId");

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Builder" ADD CONSTRAINT "Builder_sourceTemplate_fkey" FOREIGN KEY ("sourceTemplate") REFERENCES "szablonydiscord"."Templates"("slugUrl") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Limits" ADD CONSTRAINT "Limits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
