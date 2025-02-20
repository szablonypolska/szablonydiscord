import { prisma } from "@repo/db"
import TemplatesDetails from "@/components/client/templates/details/templatesDetails"
import ErrorWeb from "@/components/client/error"

interface Params {
	params: string
}

export default async function LoadTemplatesData({ params }: Params) {
	try {
		const getTemplateData = await prisma.templates.findUnique({
			where: {
				slugUrl: params,
			},
			select: {
				title: true,
				description: true,
				categories: true,
				link: true,
			},
		})

		if (!getTemplateData) throw new Error(JSON.stringify({ message: "such template does not exist in the database", code: "500" }))

		const discordTemplateCode = getTemplateData.link.split("https://discord.new/")[1]

		const getTemplateDiscordData = await fetch(`https://discord.com/api/v9/guilds/templates/${discordTemplateCode}`)
		const templateDiscordJson = await getTemplateDiscordData.json()

		if (!getTemplateDiscordData.ok) throw new Error(JSON.stringify(templateDiscordJson))

		return <TemplatesDetails data={templateDiscordJson} base={getTemplateData} />
	} catch (err: unknown) {
		let message = "Unknown error occurred"

		if (err instanceof Error) {
			message = err.message
		}

		return <ErrorWeb error={message} />
	}
}
