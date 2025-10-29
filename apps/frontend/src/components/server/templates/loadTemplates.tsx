import TemplateList from "@/components/client/templates/main/templatesList"
import { prisma } from "@repo/db"
import { Template } from "@/components/interfaces/templates/common"

export default async function LoadTemplates() {
	const [loadTemplates, loadTemplatesData, loadTemplatesPopularData]: Template[][] = await prisma.$transaction([
		prisma.templates.findMany({
			take: 6,
			orderBy: {
				usageCount: "desc",
			},
		}),
		prisma.templates.findMany({
			take: 6,
			orderBy: {
				createdAt: "desc",
			},
		}),
		prisma.templates.findMany({
			take: 6,
			orderBy: {
				visitHistory: {
					_count: "desc",
				},
			},
			include: {
				_count: {
					select: { visitHistory: true },
				},
			},
		}),
	])

	return <TemplateList loadTemplates={loadTemplates} loadTemplatesData={loadTemplatesData} loadTemplatesPopularData={loadTemplatesPopularData} />
}
