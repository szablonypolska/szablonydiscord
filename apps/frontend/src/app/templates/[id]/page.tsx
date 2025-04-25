import TemplatesLoading from "@/components/client/templates/details/templatesLoading"
import LoadTemplatesData from "@/components/server/templates/loadTemplatesData"
import { Suspense } from "react"
import { prisma } from "@repo/db"
import type { Metadata } from "next"

interface Params {
	id: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { id } = await params

	const data = await prisma.templates.findUnique({
		where: { slugUrl: id },
	})

	return {
		title: data.title,
		description: `Ilość użyć ${data.usageCount}, opis: ${data.description}`,
	}
}

export default async function Templates(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = await params

	return (
		<>
			<Suspense fallback={<TemplatesLoading />}>
				<LoadTemplatesData params={id} />
			</Suspense>
		</>
	)
}
