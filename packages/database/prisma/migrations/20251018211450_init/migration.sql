-- CreateEnum
CREATE TYPE "szablonydiscord"."DiscountType" AS ENUM ('PERCENTAGE', 'AMOUNT');

-- CreateEnum
CREATE TYPE "szablonydiscord"."DiscountScope" AS ENUM ('PRODUCT', 'CART');

-- CreateEnum
CREATE TYPE "szablonydiscord"."CategoryOffer" AS ENUM ('PROTECTION', 'SUBSCRIPTION', 'OTHER');

-- CreateEnum
CREATE TYPE "szablonydiscord"."OrderStatus" AS ENUM ('NEW', 'PAID', 'COMPLETED', 'CANCELED', 'REFUND_PENDING', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "szablonydiscord"."DeliveryMethod" AS ENUM ('EMAIL', 'AUTOMATIC');

-- CreateEnum
CREATE TYPE "szablonydiscord"."StatusOffer" AS ENUM ('ACTIVE', 'INACTIVE', 'SOLD');

-- CreateEnum
CREATE TYPE "szablonydiscord"."RolesPossible" AS ENUM ('ADMIN', 'USER', 'SUPPORT', 'PREMIUM');

-- CreateEnum
CREATE TYPE "szablonydiscord"."ProtectionType" AS ENUM ('BASIC', 'PREMIUM', 'ADVANCED', 'OTHER');

-- CreateEnum
CREATE TYPE "szablonydiscord"."NotificationType" AS ENUM ('SUCCESS', 'ERROR', 'WARNING');

-- CreateTable
CREATE TABLE "szablonydiscord"."Api" (
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
CREATE TABLE "szablonydiscord"."Webhook" (
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
CREATE TABLE "szablonydiscord"."Builder" (
    "sessionId" TEXT NOT NULL,
    "templateCode" TEXT,
    "templateUrl" TEXT,
    "hasError" BOOLEAN NOT NULL DEFAULT false,
    "rolesNumber" INTEGER NOT NULL DEFAULT 0,
    "categoryNumber" INTEGER NOT NULL DEFAULT 0,
    "channelNumber" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "rules" TEXT,
    "tariff" TEXT,
    "privacyPolicy" TEXT,
    "faq" TEXT,
    "code" TEXT NOT NULL DEFAULT '',
    "aiAnalysisStatus" TEXT NOT NULL DEFAULT 'waiting',
    "aiAnalysisError" BOOLEAN NOT NULL DEFAULT false,
    "authenticationStatus" TEXT NOT NULL DEFAULT 'waiting',
    "authenticationError" BOOLEAN NOT NULL DEFAULT false,
    "configureServerStatus" TEXT NOT NULL DEFAULT 'waiting',
    "configureServerError" BOOLEAN NOT NULL DEFAULT false,
    "rolesStatus" TEXT NOT NULL DEFAULT 'waiting',
    "rolesError" BOOLEAN NOT NULL DEFAULT false,
    "categoryStatus" TEXT NOT NULL DEFAULT 'waiting',
    "categoryError" BOOLEAN NOT NULL DEFAULT false,
    "channelStatus" TEXT NOT NULL DEFAULT 'waiting',
    "channelError" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Category" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Channel" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Role" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Chat" (
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
CREATE TABLE "szablonydiscord"."Message" (
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
CREATE TABLE "szablonydiscord"."PromoCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "maxUsageCount" INTEGER NOT NULL DEFAULT 1,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "type" "szablonydiscord"."DiscountType" NOT NULL DEFAULT 'PERCENTAGE',
    "scope" "szablonydiscord"."DiscountScope" NOT NULL DEFAULT 'CART',
    "expiredDate" TIMESTAMP(3),

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."PromoProduct" (
    "id" SERIAL NOT NULL,
    "offerId" TEXT NOT NULL,
    "promoId" INTEGER NOT NULL,

    CONSTRAINT "PromoProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Offer" (
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
    "category" "szablonydiscord"."CategoryOffer" NOT NULL DEFAULT 'OTHER',
    "deliveryMethod" "szablonydiscord"."DeliveryMethod" NOT NULL DEFAULT 'EMAIL',
    "status" "szablonydiscord"."StatusOffer" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."CartItem" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Order" (
    "id" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "paymentIntentId" TEXT,
    "promoCodeId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."OrderProduct" (
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
CREATE TABLE "szablonydiscord"."OrderEvent" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "szablonydiscord"."OrderStatus" NOT NULL DEFAULT 'NEW',
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Protection" (
    "id" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idServer" TEXT,
    "name" TEXT,
    "type" "szablonydiscord"."ProtectionType" NOT NULL,
    "orderProductId" INTEGER NOT NULL,

    CONSTRAINT "Protection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Transaction" (
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
CREATE TABLE "szablonydiscord"."SearchHistory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "dateSearch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."DecorationChannel" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,

    CONSTRAINT "DecorationChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."DecorationCategory" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,

    CONSTRAINT "DecorationCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Templates" (
    "templateId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
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

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("templateId")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."VisitTemplateHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitTemplateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."ReserveTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "serverId" TEXT,

    CONSTRAINT "ReserveTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."User" (
    "userId" TEXT NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "dateCreateAccount" TIMESTAMP(3),
    "register" BOOLEAN NOT NULL DEFAULT false,
    "reports" INTEGER NOT NULL DEFAULT 0,
    "warnings" INTEGER NOT NULL DEFAULT 0,
    "limitApiKey" INTEGER NOT NULL DEFAULT 2,
    "trustScore" INTEGER NOT NULL DEFAULT 100,
    "walletBalance" INTEGER NOT NULL DEFAULT 0,
    "builderAiUsage" INTEGER NOT NULL DEFAULT 0,
    "builderAiLimit" INTEGER NOT NULL DEFAULT 3,
    "notificationApi" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Settings" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "templatesDetail" BOOLEAN NOT NULL DEFAULT false,
    "monitoring" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Roles" (
    "id" SERIAL NOT NULL,
    "value" "szablonydiscord"."RolesPossible" NOT NULL DEFAULT 'USER',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "szablonydiscord"."Notification" (
    "id" SERIAL NOT NULL,
    "type" "szablonydiscord"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Api_apiKeyId_key" ON "szablonydiscord"."Api"("apiKeyId");

-- CreateIndex
CREATE UNIQUE INDEX "Api_secretKey_key" ON "szablonydiscord"."Api"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "Builder_sessionId_key" ON "szablonydiscord"."Builder"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "szablonydiscord"."PromoCode"("code");

-- CreateIndex
CREATE INDEX "PromoProduct_offerId_promoId_idx" ON "szablonydiscord"."PromoProduct"("offerId", "promoId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "szablonydiscord"."Order"("id");

-- CreateIndex
CREATE INDEX "OrderProduct_offerId_orderId_idx" ON "szablonydiscord"."OrderProduct"("offerId", "orderId");

-- CreateIndex
CREATE INDEX "OrderEvent_orderId_idx" ON "szablonydiscord"."OrderEvent"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "szablonydiscord"."Transaction"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_templateId_key" ON "szablonydiscord"."Templates"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_link_key" ON "szablonydiscord"."Templates"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_slugUrl_key" ON "szablonydiscord"."Templates"("slugUrl");

-- CreateIndex
CREATE INDEX "Templates_usageCount_idx" ON "szablonydiscord"."Templates"("usageCount");

-- CreateIndex
CREATE INDEX "Templates_createdAt_idx" ON "szablonydiscord"."Templates"("createdAt");

-- CreateIndex
CREATE INDEX "Templates_authorId_idx" ON "szablonydiscord"."Templates"("authorId");

-- CreateIndex
CREATE INDEX "Templates_addingUserId_idx" ON "szablonydiscord"."Templates"("addingUserId");

-- CreateIndex
CREATE INDEX "VisitTemplateHistory_slugUrl_idx" ON "szablonydiscord"."VisitTemplateHistory"("slugUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "szablonydiscord"."User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_slugUrl_key" ON "szablonydiscord"."User"("slugUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "szablonydiscord"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "szablonydiscord"."Settings"("userId");

-- CreateIndex
CREATE INDEX "Roles_userId_value_idx" ON "szablonydiscord"."Roles"("userId", "value");

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Api" ADD CONSTRAINT "Api_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Webhook" ADD CONSTRAINT "Webhook_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "szablonydiscord"."Api"("apiKeyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Builder" ADD CONSTRAINT "Builder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Category" ADD CONSTRAINT "Category_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "szablonydiscord"."Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Channel" ADD CONSTRAINT "Channel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "szablonydiscord"."Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Role" ADD CONSTRAINT "Role_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "szablonydiscord"."Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "szablonydiscord"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."PromoProduct" ADD CONSTRAINT "PromoProduct_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "szablonydiscord"."Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."PromoProduct" ADD CONSTRAINT "PromoProduct_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "szablonydiscord"."PromoCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."CartItem" ADD CONSTRAINT "CartItem_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "szablonydiscord"."Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Order" ADD CONSTRAINT "Order_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "szablonydiscord"."PromoCode"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."OrderProduct" ADD CONSTRAINT "OrderProduct_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "szablonydiscord"."Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "szablonydiscord"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."OrderEvent" ADD CONSTRAINT "OrderEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "szablonydiscord"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Protection" ADD CONSTRAINT "Protection_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "szablonydiscord"."OrderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Templates" ADD CONSTRAINT "Templates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Templates" ADD CONSTRAINT "Templates_addingUserId_fkey" FOREIGN KEY ("addingUserId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."VisitTemplateHistory" ADD CONSTRAINT "VisitTemplateHistory_slugUrl_fkey" FOREIGN KEY ("slugUrl") REFERENCES "szablonydiscord"."Templates"("slugUrl") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Settings" ADD CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Roles" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "szablonydiscord"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
