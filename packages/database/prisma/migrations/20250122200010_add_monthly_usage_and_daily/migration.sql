-- AlterTable
ALTER TABLE "Api" ADD COLUMN     "dailyCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "dailyUsage" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "monthlyCount" INTEGER NOT NULL DEFAULT 0;
