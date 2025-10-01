export default async function getDataSettings(userId: string) {
	try {
		if (!userId) return

		const link = `${process.env.NEXT_PUBLIC_INTERNAL_SETTINGS_GET}?userId=${userId}`

		const fetchData = await fetch(link, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (!fetchData.ok) {
			throw new Error(`Error while response`)
		}

		return await fetchData.json()
	} catch (err) {
		console.error("Error in searchTemplate:", err)
		throw err
	}
}
