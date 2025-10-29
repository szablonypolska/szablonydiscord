import { prisma } from "@repo/db"

export default async function getTemplateBySort(skip: number, take: number, type: "createdAt" | "usageCount") {
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
