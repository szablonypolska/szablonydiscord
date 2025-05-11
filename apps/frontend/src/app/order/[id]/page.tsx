import OrderAnimationWrapper from "@/components/client/order/orderAnimationWrapper"
import OrderCardInfo from "@/components/client/order/orderCardInfo"
import OrderHeader from "@/components/client/order/orderHeader"
import OrderImage from "@/components/client/order/orderImage"
import OrderTimeline from "@/components/client/order/orderTimeline"
import { prisma } from "@repo/db"
import { notFound } from "next/navigation"

interface Params {
	id: string
}

export default async function Order(props: { params: Promise<Params> }) {
	const params = await props.params

	const { id } = params

	const getDataOrder = await prisma.order.findUnique({
		where: { orderCode: id },
		include: { events: true },
	})

	if (!getDataOrder) return notFound()

	return (
		<>
			<div className="flex items-center justify-center gap-24 max-xl:gap-10 mt-20 max-w-screen-xl mx-auto px-5">
				<div className="flex flex-col  w-full">
					<OrderAnimationWrapper code={getDataOrder.orderCode} events={getDataOrder.events} status={getDataOrder.status} orderPaymentLink={getDataOrder.orderPaymentLink} />
				</div>
				<OrderImage />
			</div>
		</>
	)
}
