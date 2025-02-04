interface CreateApiKeyParams {
	userId: string
	apiKeyId: string
	type: "update" | "delete"
}

export default async function updateApiKey(params: CreateApiKeyParams) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_UPDATE_API_KEY!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: params.userId,
				apiKeyId: params.apiKeyId,
				type: params.type,
			}),
		})

		if (!fetchData.ok) {
			if (fetchData.status === 400) {
				throw new Error("you cannot remove the token because it has reached the allowable limit")
			}
			throw new Error(`Error while response`)
		}

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
