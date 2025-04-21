-- DropForeignKey
ALTER TABLE "VisitTemplateHistory" DROP CONSTRAINT "VisitTemplateHistory_slugUrl_fkey";

-- AddForeignKey
ALTER TABLE "VisitTemplateHistory" ADD CONSTRAINT "VisitTemplateHistory_slugUrl_fkey" FOREIGN KEY ("slugUrl") REFERENCES "Templates"("slugUrl") ON DELETE CASCADE ON UPDATE CASCADE;
