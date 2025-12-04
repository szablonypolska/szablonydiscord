export default async function refundProcess(userId: string, orderId: string, item: number[]) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_REFUND!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				orderId,
				orderProductIds: item,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in refundProcess:", err)
		throw err
	}
}
