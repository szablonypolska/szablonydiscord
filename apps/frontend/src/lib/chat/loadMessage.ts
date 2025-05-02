export default async function loadMessage(userId: string, chatId: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_LOAD_MESSAGE!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userId,
				chatId: chatId,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
