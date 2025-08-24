export default async function addToCart(itemId: string, userId: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_CART_ADD!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				itemId: itemId,
				userId: userId,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
