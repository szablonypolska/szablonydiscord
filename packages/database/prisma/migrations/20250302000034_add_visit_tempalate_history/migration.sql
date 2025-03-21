-- CreateTable
CREATE TABLE "VisitTemplateHistory" (
    "id" SERIAL NOT NULL,
    "slugUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitTemplateHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisitTemplateHistory" ADD CONSTRAINT "VisitTemplateHistory_slugUrl_fkey" FOREIGN KEY ("slugUrl") REFERENCES "Templates"("slugUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
