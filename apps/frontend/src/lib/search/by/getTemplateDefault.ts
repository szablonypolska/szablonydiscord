import { prisma } from "@repo/db"

export default async function getTemplateByDefault(skip: number, take: number) {
	const count = await prisma.templates.count()
	const numberPages = Math.ceil(count / 6)
	const templateSort = await prisma.templates.findMany({
		skip: skip,
		take: take,
	})
	return { templates: templateSort, count: numberPages || 0 }
}
