import { prisma } from "@repo/db"
import TemplatesDetails from "@/components/client/templates/details/templatesDetails"

interface Params {
	params: string
}

export default async function LoadTemplatesData({ params }: Params) {
	const getTemplateData = await prisma.templates.findUnique({
		where: {
			templateId: params,
		},
	})
	const discordTemplateCode = getTemplateData.link.split("https://discord.new/")[1]

	const getTemplateDiscordData = await fetch(`https://discord.com/api/v9/guilds/templates/${discordTemplateCode}`)
	const templateDiscordJson = await getTemplateDiscordData.json()

	return <TemplatesDetails data={templateDiscordJson} base={getTemplateData} />
}
