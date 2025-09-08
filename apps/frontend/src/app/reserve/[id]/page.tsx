interface Params {
	id: string
}

export default async function Reserve(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = params

	return (
		<>
			<p>{id}</p>
		</>
	)
}
