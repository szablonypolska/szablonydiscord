export default async function getDataTemplate(id: string) {
	try {
		const data = await fetch(`https://discord.com/api/v9/guilds/templates/${id}`)

		if (!data.ok) throw new Error("Szablon nie dziala")

		const dataJson = await data.json()

		return dataJson
	} catch (err) {
		console.log(err)
		throw err
	}
}
