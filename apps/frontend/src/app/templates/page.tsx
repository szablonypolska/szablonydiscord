import HeaderTemplates from "@/components/client/templates/main/header"
import LoadTemplates from "@/components/server/templates/loadTemplates"
import { prisma } from "@repo/db"

export default async function Templates() {
	const templates = await prisma.templates.findMany({
		orderBy: { dateCreate: "desc" },
		take: 10,
	})


	const lastAddedTemplate = templates.map((el: { title: string }) => {
		return el.title
	})

	return (
		<>
			<HeaderTemplates lastAddedTemplate={lastAddedTemplate} />
			<LoadTemplates />
		</>
	)
}
