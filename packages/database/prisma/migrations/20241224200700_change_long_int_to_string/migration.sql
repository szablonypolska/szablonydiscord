-- DropIndex
DROP INDEX "Template_templateId_key";

-- AlterTable
ALTER TABLE "Template" ALTER COLUMN "templateId" SET DATA TYPE TEXT;
