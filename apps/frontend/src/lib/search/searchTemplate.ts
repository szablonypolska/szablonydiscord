export default async function searchTemplatesDiscord(name: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_SEARCH_TEMPLATE!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
			}),
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
