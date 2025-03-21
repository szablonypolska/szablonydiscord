import { prisma } from "@repo/db"
import TemplatesDetails from "@/components/client/templates/details/templatesDetails"
import ErrorWeb from "@/components/client/error"
import { cookies } from "next/headers"
import { HistoryVisitTemplate } from "@/components/interfaces/common"

interface Params {
	params: string
}

export default async function LoadTemplatesData({ params }: Params) {
	try {
		const cookieStore = await cookies()
		const sessionId = cookieStore.get("sessionId")

		let [visitHistory, templatesData] = await prisma.$transaction([
			prisma.visitTemplateHistory.findMany({ where: { slugUrl: params } }),
			prisma.templates.findUnique({
				where: {
					slugUrl: params,
				},
				select: {
					title: true,
					description: true,
					categories: true,
					link: true,
				},
			}),
		])

		const searchVisit = visitHistory.some((el: HistoryVisitTemplate) => el.uuid === sessionId?.value)

		if (!searchVisit) {
			const createData = await prisma.visitTemplateHistory.create({ data: { uuid: sessionId?.value, slugUrl: params } })
			visitHistory = [...visitHistory, createData]
		}

		if (!templatesData) throw new Error(JSON.stringify({ message: "such template does not exist in the database", code: "500" }))

		const discordTemplateCode = templatesData.link.split("https://discord.new/")[1]

		const getTemplateDiscordData = await fetch(`https://discord.com/api/v9/guilds/templates/${discordTemplateCode}`)
		const templateDiscordJson = await getTemplateDiscordData.json()

		if (!getTemplateDiscordData.ok) throw new Error(JSON.stringify(templateDiscordJson))

		templatesData = { ...templatesData, historyLength: visitHistory.length }

		return <TemplatesDetails data={templateDiscordJson} base={templatesData} />
	} catch (err: unknown) {
		let message = "Unknown error occurred"

		if (err instanceof Error) {
			message = err.message
		}

		return <ErrorWeb error={message} />
	}
}
