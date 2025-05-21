-- AlterTable
ALTER TABLE "GenerateStatus" ADD COLUMN     "authentication" TEXT NOT NULL DEFAULT 'waiting',
ADD COLUMN     "authenticationError" BOOLEAN NOT NULL DEFAULT false;
