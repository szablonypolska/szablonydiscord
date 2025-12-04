-- AlterTable
ALTER TABLE "Templates" ADD COLUMN     "familyId" TEXT,
ADD COLUMN     "isLatest" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
