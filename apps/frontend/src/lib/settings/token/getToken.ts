export default async function getDiscordToken(userId: string) {
	try {
		if (!userId) return

		const link = `${process.env.NEXT_PUBLIC_INTERNAL_TOKEN}?userId=${userId}`

		const fetchData = await fetch(link, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		// if (!fetchData.ok) {
		// 	throw new Error(`Error while response`)
		// }

		console.log(fetchData, "fetchData in getDiscordToken")

		return await fetchData.json()
	} catch (err) {
		console.error("Error in getDiscordToken:", err)
		throw err
	}
}
