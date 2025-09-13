"use client"

import { useEffect, useRef } from "react"
import OrderCardInfo from "./orderCardInfo"
import OrderHeader from "./orderHeader"
import OrderTimeline from "./orderTimeline"
import { Order } from "@/components/interfaces/order/common"
import gsap from "gsap"

export default function OrderAnimationWrapper({ data }: { data: Order }) {
	const animation = useRef<HTMLDivElement>(null)

	console.log(data)

	useEffect(() => {
		gsap.to(animation.current, {
			duration: 0.5,
			opacity: 1,
			x: 10,
		})
	}, [])

	return (
		<>
			<div className="opacity-0" ref={animation}>
				<OrderHeader code={data.id} />

				<OrderTimeline events={data.events || []} />

				<OrderCardInfo status={data.events || []} orderPaymentLink={data.orderPaymentLink || ""} />
			</div>
		</>
	)
}
