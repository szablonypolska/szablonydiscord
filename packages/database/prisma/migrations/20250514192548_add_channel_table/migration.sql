-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 4;

-- AlterTable
ALTER TABLE "GenerateStatus" ADD COLUMN     "channelError" TEXT,
ADD COLUMN     "channelStatus" TEXT NOT NULL DEFAULT 'waiting';

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GenerateStatus"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
