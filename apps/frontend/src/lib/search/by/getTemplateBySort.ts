import { prisma } from "@repo/db"
import { TypeCategory } from "@/components/interfaces/search/common"

export default async function getTemplateBySort(skip: number, take: number, type: "dateCreateSystem" | "usageCount") {
	const count = await prisma.templates.count()
	const numberPages = Math.ceil(count / 6)
	const templateSort = await prisma.templates.findMany({
		orderBy: {
			[type]: "desc",
		},
		skip: skip,
		take: take,
	})
	return { templates: templateSort, count: numberPages || 0 }
}
