export default async function verifySession(session: string) {
	try {
		const fetchData = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_VERIFY_SESSION}?sessionId=${session}`!, {})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in verifySession:", err)
		throw err
	}
}
