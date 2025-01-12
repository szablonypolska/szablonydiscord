-- DropForeignKey
ALTER TABLE "Templates" DROP CONSTRAINT "Templates_authorId_fkey";

-- AlterTable
ALTER TABLE "Templates" ALTER COLUMN "authorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
