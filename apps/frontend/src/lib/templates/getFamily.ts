export default async function getFamily(familyId: string) {
	try {
		const data = await fetch(`${process.env.NEXT_PUBLIC_INTERNAL_TEMPLATES_FAMILY}?familyId=${familyId}`)

		const res = await data.json()

		if (data.status === 500 || !data.ok) throw new Error("internal server error")

		return res
	} catch (err) {
		console.log(err)
		throw err
	}
}
