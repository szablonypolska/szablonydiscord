-- CreateTable
CREATE TABLE "GenerateStatus" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "slugUrl" TEXT,
    "hasError" BOOLEAN NOT NULL DEFAULT false,
    "rolesNumber" INTEGER NOT NULL DEFAULT 0,
    "categoryNumber" INTEGER NOT NULL DEFAULT 0,
    "channelNumber" INTEGER NOT NULL DEFAULT 0,
    "aiAnalysisStatus" TEXT NOT NULL DEFAULT 'waiting',
    "aiAnalysisProgress" INTEGER NOT NULL DEFAULT 0,
    "aiAnalysisError" TEXT,
    "configureServerStatus" TEXT NOT NULL DEFAULT 'waiting',
    "configureServerProgress" INTEGER NOT NULL DEFAULT 0,
    "configureError" TEXT,
    "rolesStatus" TEXT NOT NULL DEFAULT 'waiting',
    "rolesProgress" INTEGER NOT NULL DEFAULT 0,
    "rolesError" TEXT,

    CONSTRAINT "GenerateStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GenerateStatus_sessionId_key" ON "GenerateStatus"("sessionId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GenerateStatus"("sessionId") ON DELETE RESTRICT ON UPDATE CASCADE;
