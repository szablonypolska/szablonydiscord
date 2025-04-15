-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permission" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "expiredDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");
