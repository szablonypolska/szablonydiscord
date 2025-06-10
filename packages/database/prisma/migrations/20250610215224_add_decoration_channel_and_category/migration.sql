/*
  Warnings:

  - You are about to drop the `Decoration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Decoration";

-- CreateTable
CREATE TABLE "DecorationChannel" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,

    CONSTRAINT "DecorationChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorationCategory" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,

    CONSTRAINT "DecorationCategory_pkey" PRIMARY KEY ("id")
);
