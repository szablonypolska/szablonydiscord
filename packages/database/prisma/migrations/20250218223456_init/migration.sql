-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "usage" INTEGER NOT NULL,
    "dateCreate" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "dateCreateAccount" TIMESTAMP(3),
    "register" BOOLEAN NOT NULL DEFAULT false,
    "reports" INTEGER NOT NULL DEFAULT 0,
    "warnings" INTEGER NOT NULL DEFAULT 0,
    "limitApiKey" INTEGER NOT NULL DEFAULT 2,
    "trustScore" INTEGER NOT NULL DEFAULT 100,
    "notificationApi" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateAdd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Api" (
    "id" SERIAL NOT NULL,
    "apiKeyId" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "reqCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" TIMESTAMP(3),
    "monthlyCount" INTEGER NOT NULL DEFAULT 0,
    "monthlyLimit" INTEGER NOT NULL DEFAULT 20000,
    "dailyCount" INTEGER NOT NULL DEFAULT 0,
    "dailyLimit" INTEGER NOT NULL DEFAULT 500,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Api_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" SERIAL NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "color" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "apiKeyId" TEXT NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Templates" (
    "id" SERIAL NOT NULL,
    "templateId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "dateCreate" TEXT NOT NULL,
    "dateCreateSystem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "usageCount" INTEGER NOT NULL,
    "clickButtonUse" INTEGER,
    "server" TEXT,
    "serverLink" TEXT,
    "authorId" TEXT,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_slugUrl_key" ON "User"("slugUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Api_apiKeyId_key" ON "Api"("apiKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "Api_secretKey_key" ON "Api"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_templateId_key" ON "Templates"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_link_key" ON "Templates"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_slugUrl_key" ON "Templates"("slugUrl");

-- CreateIndex
CREATE INDEX "Templates_usageCount_idx" ON "Templates"("usageCount");

-- CreateIndex
CREATE INDEX "Templates_dateCreateSystem_idx" ON "Templates"("dateCreateSystem");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "Api"("apiKeyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
