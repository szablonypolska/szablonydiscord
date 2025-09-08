export default async function removeCart(itemId: string, userId: string, reset?: boolean) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_CART_REMOVE!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				itemId: itemId,
				userId: userId,
				reset: reset || false,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
