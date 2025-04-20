export default async function verifyTemplates(link: string) {
	try {
		const data = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_VERIFY_TEMPLATES}?link=${link}`)

		if (data.status === 500) throw new Error("internal server error")

		return data.status
	} catch (err) {
		console.log(err)
		throw err
	}
}
