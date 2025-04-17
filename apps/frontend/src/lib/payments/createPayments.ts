export default async function createPayments(offer: string, userId: string, code?: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_CREATE_PAYMENT!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				offer,
				userId,
				code,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in searchTemplate:", err)
		throw err
	}
}
