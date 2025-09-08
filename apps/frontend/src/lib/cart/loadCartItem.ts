export default async function loadCartItem(items: string[]) {
	try {
		if (!items) return
		const link = `${process.env.NEXT_PUBLIC_INTERNAL_CART_ITEM}` + "?" + items.map(item => "item=" + encodeURIComponent(item)).join("&")

		const fetchData = await fetch(link, {
			headers: {
				"Content-Type": "application/json",
			},
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
