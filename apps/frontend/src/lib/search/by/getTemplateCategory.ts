import { prisma } from "@repo/db"

export default async function getTemplateByCategory(skip: number, take: number, category: string) {
	const count = await prisma.templates.count({
		where: { categories: category },
	})
	const numberPages = Math.ceil(count / 6)
	const templateSort = await prisma.templates.findMany({
		where: { categories: category },
		skip: skip,
		take: take,
	})

	return { templates: templateSort, count: numberPages || 0 }
}
