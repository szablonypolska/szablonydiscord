export default async function updateAccountTemplatesSettings(userId: string, templatesDetail: boolean, monitoring: boolean) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_SETTINGS_ACCOUNT_SET!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				templatesDetail,
				monitoring,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in updateAccountTemplatesSettings:", err)
		throw err
	}
}
