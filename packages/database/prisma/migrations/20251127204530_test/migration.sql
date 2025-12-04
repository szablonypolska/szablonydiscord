-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'AMOUNT');

-- CreateEnum
CREATE TYPE "DiscountScope" AS ENUM ('PRODUCT', 'CART');

-- CreateEnum
CREATE TYPE "CategoryOffer" AS ENUM ('PROTECTION', 'SUBSCRIPTION', 'OTHER');

-- CreateTable
CREATE TABLE "Api" (
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

    CONSTRAINT "Api_pkey" PRIMARY KEY ("apiKeyId")
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
CREATE TABLE "Builder" (
    "sessionId" TEXT NOT NULL,
    "templateCode" TEXT,
    "templateUrl" TEXT,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "sourceTemplate" TEXT
);

-- CreateTable
CREATE TABLE "Materials" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "tariff" TEXT NOT NULL,
    "privacyPolicy" TEXT NOT NULL,
    "faq" TEXT NOT NULL,

    CONSTRAINT "Materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderMetrics" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "totalCategories" INTEGER NOT NULL DEFAULT 0,
    "totalChannels" INTEGER NOT NULL DEFAULT 0,
    "totalRoles" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BuilderMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderProcess" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "overallStatus" "BuilderProcessStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "BuilderProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderStage" (
    "id" SERIAL NOT NULL,
    "processId" INTEGER NOT NULL,
    "type" "BuilderStageType" NOT NULL,
    "status" "BuilderProcessStatus" NOT NULL DEFAULT 'WAITING',
    "hasError" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL DEFAULT '',
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "BuilderStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryStage" (
    "id" SERIAL NOT NULL,
    "builderStageId" INTEGER NOT NULL,

    CONSTRAINT "CategoryStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelStage" (
    "id" SERIAL NOT NULL,
    "builderStageId" INTEGER NOT NULL,

    CONSTRAINT "ChannelStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleStage" (
    "id" SERIAL NOT NULL,
    "builderStageId" INTEGER NOT NULL,

    CONSTRAINT "RoleStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "stageId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 4,
    "parentId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "stageId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "position" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agent" TEXT,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT,
    "authorId" TEXT,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "maxUsageCount" INTEGER NOT NULL DEFAULT 1,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "type" "DiscountType" NOT NULL DEFAULT 'PERCENTAGE',
    "scope" "DiscountScope" NOT NULL DEFAULT 'CART',
    "expiredDate" TIMESTAMP(3),

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoProduct" (
    "id" SERIAL NOT NULL,
    "offerId" TEXT NOT NULL,
    "promoId" INTEGER NOT NULL,

    CONSTRAINT "PromoProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "benefits" TEXT[],
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL DEFAULT 0,
    "inStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "category" "CategoryOffer" NOT NULL DEFAULT 'OTHER',
    "deliveryMethod" "DeliveryMethod" NOT NULL DEFAULT 'EMAIL',
    "status" "StatusOffer" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "paymentIntentId" TEXT,
    "promoCodeId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" SERIAL NOT NULL,
    "offerId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceAfterDiscount" INTEGER,
    "orderId" TEXT NOT NULL,
    "refunded" BOOLEAN NOT NULL DEFAULT false,
    "refundedAmount" INTEGER NOT NULL DEFAULT 0,
    "refunedDate" TIMESTAMP(3),

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEvent" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Protection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idServer" TEXT,
    "name" TEXT,
    "type" "ProtectionType" NOT NULL,
    "orderProductId" INTEGER NOT NULL,

    CONSTRAINT "Protection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dateSearch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Templates" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "categories" "TemplateCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "sourceServerId" TEXT,
    "description" TEXT,
    "authorId" TEXT,
    "addingUserId" TEXT,
    "code" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "channelsCount" INTEGER NOT NULL DEFAULT 0,
    "rolesCount" INTEGER NOT NULL DEFAULT 0,
    "categoriesCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitTemplateHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitTemplateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserveTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "serverId" TEXT,

    CONSTRAINT "ReserveTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "register" BOOLEAN NOT NULL DEFAULT false,
    "reports" INTEGER NOT NULL DEFAULT 0,
    "warnings" INTEGER NOT NULL DEFAULT 0,
    "limitApiKey" INTEGER NOT NULL DEFAULT 2,
    "trustScore" INTEGER NOT NULL DEFAULT 100,
    "walletBalance" INTEGER NOT NULL DEFAULT 0,
    "notificationApi" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Limits" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "builderAiUsage" INTEGER NOT NULL DEFAULT 0,
    "builderAiLimit" INTEGER NOT NULL DEFAULT 3,
    "builderAiUsageMonthly" INTEGER NOT NULL DEFAULT 0,
    "builderAiLimitMonthly" INTEGER NOT NULL DEFAULT 80,

    CONSTRAINT "Limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "templatesDetail" BOOLEAN NOT NULL DEFAULT false,
    "monitoring" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "value" "RolesPossible" NOT NULL DEFAULT 'USER',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_apiKeyId_key" ON "Api"("apiKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "Api_secretKey_key" ON "Api"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "Builder_sessionId_key" ON "Builder"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Materials_sessionId_key" ON "Materials"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderMetrics_sessionId_key" ON "BuilderMetrics"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderProcess_sessionId_key" ON "BuilderProcess"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryStage_builderStageId_key" ON "CategoryStage"("builderStageId");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelStage_builderStageId_key" ON "ChannelStage"("builderStageId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleStage_builderStageId_key" ON "RoleStage"("builderStageId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");

-- CreateIndex
CREATE INDEX "PromoProduct_offerId_promoId_idx" ON "PromoProduct"("offerId", "promoId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE INDEX "OrderProduct_offerId_orderId_idx" ON "OrderProduct"("offerId", "orderId");

-- CreateIndex
CREATE INDEX "OrderEvent_orderId_idx" ON "OrderEvent"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "Transaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_id_key" ON "Templates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_link_key" ON "Templates"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_slugUrl_key" ON "Templates"("slugUrl");

-- CreateIndex
CREATE INDEX "Templates_usageCount_idx" ON "Templates"("usageCount");

-- CreateIndex
CREATE INDEX "Templates_createdAt_idx" ON "Templates"("createdAt");

-- CreateIndex
CREATE INDEX "Templates_authorId_idx" ON "Templates"("authorId");

-- CreateIndex
CREATE INDEX "Templates_addingUserId_idx" ON "Templates"("addingUserId");

-- CreateIndex
CREATE INDEX "VisitTemplateHistory_slugUrl_idx" ON "VisitTemplateHistory"("slugUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_slugUrl_key" ON "User"("slugUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Limits_userId_key" ON "Limits"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

-- CreateIndex
CREATE INDEX "Roles_userId_value_idx" ON "Roles"("userId", "value");

-- AddForeignKey
ALTER TABLE "Api" ADD CONSTRAINT "Api_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "Api"("apiKeyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Builder" ADD CONSTRAINT "Builder_sourceTemplate_fkey" FOREIGN KEY ("sourceTemplate") REFERENCES "Templates"("slugUrl") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Builder" ADD CONSTRAINT "Builder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materials" ADD CONSTRAINT "Materials_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderMetrics" ADD CONSTRAINT "BuilderMetrics_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderProcess" ADD CONSTRAINT "BuilderProcess_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderStage" ADD CONSTRAINT "BuilderStage_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BuilderProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryStage" ADD CONSTRAINT "CategoryStage_builderStageId_fkey" FOREIGN KEY ("builderStageId") REFERENCES "BuilderStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelStage" ADD CONSTRAINT "ChannelStage_builderStageId_fkey" FOREIGN KEY ("builderStageId") REFERENCES "BuilderStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleStage" ADD CONSTRAINT "RoleStage_builderStageId_fkey" FOREIGN KEY ("builderStageId") REFERENCES "BuilderStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "CategoryStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "ChannelStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "RoleStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoProduct" ADD CONSTRAINT "PromoProduct_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoProduct" ADD CONSTRAINT "PromoProduct_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "PromoCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEvent" ADD CONSTRAINT "OrderEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Protection" ADD CONSTRAINT "Protection_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "OrderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_addingUserId_fkey" FOREIGN KEY ("addingUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitTemplateHistory" ADD CONSTRAINT "VisitTemplateHistory_slugUrl_fkey" FOREIGN KEY ("slugUrl") REFERENCES "Templates"("slugUrl") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limits" ADD CONSTRAINT "Limits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
