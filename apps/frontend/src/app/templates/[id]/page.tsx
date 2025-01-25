import LoadTemplatesData from "@/components/server/templates/loadTemplatesData"

interface Params {
	id: string
}

export default async function Templates({ params }: { params: Params }) {
	const { id } = await params

	return (
		<>
			<>
				<LoadTemplatesData params={id} />
			</>
		</>
	)
}
