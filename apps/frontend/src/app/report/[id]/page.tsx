import SelectReason from "@/components/client/report/selectReason/selectReason"

interface Params {
	id: string
}

export default async function Report(props: { params: Promise<Params> }) {
	const params = await props.params

	console.log(params)

	return (
		<>
			<SelectReason />
		</>
	)
}
