import TemplatesLoading from "@/components/client/templates/details/templatesLoading"
import LoadTemplatesData from "@/components/server/templates/loadTemplatesData"
import { Suspense } from "react"

interface Params {
	id: string
}

export default async function Templates(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = await params
	console.log(params)

	return (
		<>
			<Suspense fallback={<TemplatesLoading />}>
				<LoadTemplatesData params={id} />
			</Suspense>
		</>
	)
}
