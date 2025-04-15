export default async function vetifyDiscountCode(offer: string, code: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_VERIFY_DISCOUNT_CODE!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				offer,
				code,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in searchTemplate:", err)
		throw err
	}
}
