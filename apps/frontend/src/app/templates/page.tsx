import HeaderTemplates from "@/components/client/templates/main/header"
import LoadTemplates from "@/components/server/templates/loadTemplates"
import { prisma } from "@repo/db"

export default async function Templates() {
	const searchHistory = await prisma.searchHistory.findMany({
		orderBy: { dateSearch: "desc" },
		take: 5,
		include: {
			id: false,
			dateSearch: false,
		},
	})

	const searchHistoryTitle = searchHistory.map((el: { title: string }) => {
		return el.title
	})

	return (
		<>
			<HeaderTemplates searchHistory={searchHistoryTitle} />
			<LoadTemplates />
		</>
	)
}
