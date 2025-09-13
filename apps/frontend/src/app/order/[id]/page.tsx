import OrderAnimationWrapper from "@/components/client/order/orderAnimationWrapper"
import OrderImage from "@/components/client/order/orderImage"
import { prisma } from "@repo/db"
import { notFound } from "next/navigation"

interface Params {
	id: string
}

export default async function Order(props: { params: Promise<Params> }) {
	const params = await props.params

	const { id } = params

	const getDataOrder = await prisma.order.findUnique({
		where: { id },
		include: { events: true },
	})

	

	if (!getDataOrder) return notFound()

	return (
		<>
			<div className="flex items-center justify-center gap-24 max-xl:gap-10 mt-20 max-w-(--breakpoint-xl) mx-auto px-5">
				<div className="flex flex-col  w-full">
					<OrderAnimationWrapper data={getDataOrder} />
				</div>
				<OrderImage />
			</div>
		</>
	)
}
