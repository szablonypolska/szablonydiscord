export default async function setDiscordToken(userId: string, token: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_TOKEN!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				token,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in setDiscordToken:", err)
		throw err
	}
}
