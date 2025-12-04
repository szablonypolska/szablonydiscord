export default async function deleteNotification(userId: string, notificationId: number) {
	try {
		const fetchData = await fetch(process.env.NEXT_PUBLIC_INTERNAL_NOTIFICATION_DELETE!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				notificationId: notificationId,
			}),
		})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in markAsRead:", err)
		throw err
	}
}
