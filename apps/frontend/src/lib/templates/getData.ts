import redis from "../redis"
import { DiscordTemplate } from "@/components/interfaces/templates/common"
import { differenceInDays } from "date-fns"

export default async function getDataTemplate(id: string, slugUrl: string) {
	try {
		const getCacheData = await redis.get(slugUrl)
		let templateDiscordJson = {} as DiscordTemplate

		const data = await fetch(`https://discord.com/api/v9/guilds/templates/${id}`)

		if (getCacheData) {
			templateDiscordJson = JSON.parse(getCacheData).templateDiscordJson
		} else {
			if (!data.ok) throw new Error("Szablon nie dziala")
			templateDiscordJson = await data.json()
			const timeLiveTemplate = differenceInDays(new Date(), new Date(templateDiscordJson.created_at))

			await redis.set(slugUrl, JSON.stringify({ templateDiscordJson }), "EX", timeLiveTemplate > 5 ? 172800 : 21600)
		}

		return templateDiscordJson
	} catch (err) {
		console.log(err)
		throw err
	}
}
