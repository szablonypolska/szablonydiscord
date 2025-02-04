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

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "Api"("apiKeyId") ON DELETE RESTRICT ON UPDATE CASCADE;
