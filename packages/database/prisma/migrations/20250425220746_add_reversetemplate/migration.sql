-- CreateTable
CREATE TABLE "ReserveTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "serverId" TEXT,

    CONSTRAINT "ReserveTemplate_pkey" PRIMARY KEY ("id")
);
