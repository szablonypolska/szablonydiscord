import { prisma } from "@repo/db"
import TemplatesDetailsPage from "@/components/client/templates/details/TemplatesDetails"
import ErrorWeb from "@/components/client/error"
import { cookies } from "next/headers"
import { VisitHistory } from "@/components/interfaces/templates/common"
import { notFound } from "next/navigation"
import redis from "@/lib/redis"
import { DiscordTemplate } from "@/components/interfaces/templates/common"
import { differenceInDays } from "date-fns"
import { Template } from "@/components/interfaces/templates/common"

interface Params {
	params: string
}

export default async function LoadTemplatesData({ params }: Params) {
	try {
		const templatesData: Template | null = await prisma.templates.findUnique({
			where: {
				slugUrl: params,
			},
			include: { versions: true, visitHistory: true, addingUser: { select: { avatar: true, username: true, userId: true } }, author: { select: { avatar: true, username: true, userId: true } } },
		})

		if (!templatesData) notFound()

		const cookieStore = await cookies()
		const sessionId = cookieStore.get("sessionId")
		const getCacheData = await redis.get(params)
		let templateDiscordJson = {} as DiscordTemplate

		const searchVisit = templatesData.visitHistory.some((el: VisitHistory) => el.uuid === sessionId?.value)

		if (!searchVisit) {
			const createData = await prisma.visitTemplateHistory.create({ data: { uuid: sessionId?.value, slugUrl: params } })
			templatesData.visitHistory = [...templatesData.visitHistory, createData]
		}

		const discordTemplateCode = templatesData.link.split("https://discord.new/")[1]

		if (getCacheData) {
			templateDiscordJson = JSON.parse(getCacheData || "").templateDiscordJson
		} else {
			const getTemplateDiscordData = await fetch(`https://discord.com/api/v9/guilds/templates/${discordTemplateCode}`)
			templateDiscordJson = await getTemplateDiscordData.json()
			const timeLiveTemplate = differenceInDays(new Date(), new Date(templateDiscordJson.created_at))

			if (!getTemplateDiscordData.ok) throw new Error(JSON.stringify(templateDiscordJson))

			await redis.set(params, JSON.stringify({ templateDiscordJson }), "EX", timeLiveTemplate > 5 ? 172800 : 21600)
		}

		return <TemplatesDetailsPage data={templateDiscordJson} base={templatesData} />
	} catch (err: unknown) {
		let message = "Unknown error occurred"

		console.log(err)

		if (err instanceof Error) {
			message = err.message
		}

		return <ErrorWeb error={message} />
	}
}
