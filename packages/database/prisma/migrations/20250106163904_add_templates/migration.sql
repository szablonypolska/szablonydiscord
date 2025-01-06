-- CreateTable
CREATE TABLE "Templates" (
    "in" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "dateCreate" TEXT NOT NULL,
    "Link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "usageCount" INTEGER,
    "clickButtonUse" INTEGER,
    "server" TEXT,
    "serverLink" TEXT,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("in")
);
