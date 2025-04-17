/*
  Warnings:

  - You are about to drop the column `value` on the `PromoCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromoCode" DROP COLUMN "value",
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxUsageCount" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "usageCount" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Order" (
    "Id" SERIAL NOT NULL,
    "orderCode" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "offer" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderCode_key" ON "Order"("orderCode");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
