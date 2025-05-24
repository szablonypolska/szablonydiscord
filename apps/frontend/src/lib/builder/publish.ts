export default async function builderPublishApi(id: string, userId: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_BUILDER_PUBLISH!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: id,
				userId: userId,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
