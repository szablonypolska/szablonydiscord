export default async function builderCreateTemplate(userId: string, description: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_BUILDER_CREATE!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				description,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
