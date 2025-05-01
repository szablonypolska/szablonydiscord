export default async function createChatApi(subject: string, description: string, userId: string) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_CREATE_CHAT!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				subject: subject,
				description: description,
				userId: userId,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.log(err)
		throw err
	}
}
