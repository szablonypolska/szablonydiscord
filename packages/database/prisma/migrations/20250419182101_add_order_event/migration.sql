/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('NEW', 'PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'NEW';

-- CreateTable
CREATE TABLE "OrderEvent" (
    "Id" SERIAL NOT NULL,
    "orderCode" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "note" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderEvent_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "OrderEvent" ADD CONSTRAINT "OrderEvent_orderCode_fkey" FOREIGN KEY ("orderCode") REFERENCES "Order"("orderCode") ON DELETE RESTRICT ON UPDATE CASCADE;
