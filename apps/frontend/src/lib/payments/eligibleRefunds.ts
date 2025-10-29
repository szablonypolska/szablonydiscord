export default async function checkEligibleRefunds(id: string) {
	try {
		const link = `${process.env.NEXT_PUBLIC_INTERNAL_CHECK_REFUNDS}/${id}/eligible`
		const fetchData = await fetch(link, {})

		return await fetchData.json()
	} catch (err) {
		console.error("Error in checkEligibleRefunds:", err)
		throw err
	}
}
