import TemplateList from "@/components/client/templates/main/templatesList"
import { prisma } from "@repo/db"
import { TemplatesProps } from "../../interfaces/common"

export default async function LoadTemplates() {
	const loadTemplates: TemplatesProps[] = await prisma.templates.findMany({
		take: 6,
		orderBy: {
			usageCount: "desc",
		},
	})

	const loadTemplatesData: TemplatesProps[] = await prisma.templates.findMany({
		take: 6,
		orderBy: {
			dateCreateSystem: "desc",
		},
	})

	return <TemplateList loadTemplates={loadTemplates} loadTemplatesData={loadTemplatesData} />
}
