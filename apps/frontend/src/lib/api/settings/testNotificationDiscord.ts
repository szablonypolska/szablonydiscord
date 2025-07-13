interface CreateApiKeyParams {
	userId: string
	apiKeyId: string
	color: string
	title: string
	webhookUrl: string
	description: string
}

export default async function testNotification(params: CreateApiKeyParams) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_TEST_NOTIFICATION!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: params.userId,
				apiKeyId: params.apiKeyId,
				color: params.color,
				title: params.title || "Siema",
				webhookUrl: params.webhookUrl,
				description: params.description || `Nazwa klucza ${params.title}`,
			}),
		})

		if (!fetchData.ok) {
			throw new Error(`Error while response`)
		}
	} catch (err) {
		console.error("Error in testNotification:", err)
		throw err
	}
}
