export default async function createPayments(item: string[], userId: string, promoCode?: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_CREATE_PAYMENT!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				item,
				userId,
				promoCode: promoCode || null,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in createPayments:", err)
		throw err
	}
}
