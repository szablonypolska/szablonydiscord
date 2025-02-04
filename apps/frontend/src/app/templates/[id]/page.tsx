import LoadTemplatesData from "@/components/server/templates/loadTemplatesData"

interface Params {
	id: string
}

export default async function Templates(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = await params
	console.log(params)

	return (
		<>
			<LoadTemplatesData params={id} />
		</>
	)
}
