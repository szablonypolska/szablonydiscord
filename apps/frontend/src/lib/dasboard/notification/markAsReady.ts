export default async function markAsReady(userId: string, notificationId?: number, all?: boolean) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_NOTIFICATION_MARK_AS_READ!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				notificationId: notificationId || null,
				all: all || false,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in markAsRead:", err)
		throw err
	}
}
