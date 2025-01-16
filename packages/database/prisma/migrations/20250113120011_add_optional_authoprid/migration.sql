-- DropForeignKey
ALTER TABLE "Templates" DROP CONSTRAINT "Templates_authorId_fkey";

-- AlterTable
ALTER TABLE "Templates" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
