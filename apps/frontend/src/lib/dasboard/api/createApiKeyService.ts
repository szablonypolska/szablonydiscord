interface CreateApiKeyParams {
	userId: string
	name: string
	requestCount: number
}

export default async function createApiKey(params: CreateApiKeyParams) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_CREATE_API_KEY!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: params.userId,
				name: params.name,
				requestCount: params.requestCount,
			}),
		})

		if (!fetchData.ok) {
			throw new Error(`Error while response`)
		}

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
