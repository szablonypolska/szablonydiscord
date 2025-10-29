-- AlterTable
ALTER TABLE "szablonydiscord"."Builder" ADD COLUMN     "editing" TEXT;

-- CreateTable
CREATE TABLE "szablonydiscord"."BuilderMetrics" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "totalCategories" INTEGER NOT NULL DEFAULT 0,
    "totalChannels" INTEGER NOT NULL DEFAULT 0,
    "totalRoles" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BuilderMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuilderMetrics_sessionId_key" ON "szablonydiscord"."BuilderMetrics"("sessionId");

-- AddForeignKey
ALTER TABLE "szablonydiscord"."Builder" ADD CONSTRAINT "Builder_editing_fkey" FOREIGN KEY ("editing") REFERENCES "szablonydiscord"."Templates"("slugUrl") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "szablonydiscord"."BuilderMetrics" ADD CONSTRAINT "BuilderMetrics_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "szablonydiscord"."Builder"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
