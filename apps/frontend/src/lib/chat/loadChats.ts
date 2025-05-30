export default async function loadChats(userId: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_LOAD_CHAT!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userId,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
