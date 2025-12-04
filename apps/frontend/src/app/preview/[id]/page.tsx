import LoadPreviewData from "@/components/server/templates/preview/loadTemplatesData"

interface Params {
	id: string
}

export default async function Preview(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = params

	return (
		<>
			<LoadPreviewData id={id} />
		</>
	)
}
