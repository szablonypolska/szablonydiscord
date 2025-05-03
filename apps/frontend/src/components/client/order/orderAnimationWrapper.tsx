"use client"

import { useEffect, useRef } from "react"
import OrderCardInfo from "./orderCardInfo"
import OrderHeader from "./orderHeader"
import OrderTimeline from "./orderTimeline"
import { PropsOrder } from "@/components/interfaces/order/status/common"
import gsap from "gsap"

interface Props {
	code: string
	events: PropsOrder[]
	status: string
	orderPaymentLink: string
}

export default function OrderAnimationWrapper({ code, events, status, orderPaymentLink }: Props) {
	const animation = useRef<HTMLDivElement>(null)

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
				<OrderHeader code={code} />

				<OrderTimeline events={events} />

				<OrderCardInfo status={status} orderPaymentLink={orderPaymentLink} events={events} />
			</div>
		</>
	)
}
