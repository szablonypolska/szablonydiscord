import verifySession from "@/lib/payments/verifySession"
import { notFound, redirect } from "next/navigation"

interface Params {
	id: string
}

export default async function Payments(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = await params

	const code = await verifySession(id)

	if (!code.orderCode) notFound()

	redirect(`/order/${code.orderCode}`)
}
