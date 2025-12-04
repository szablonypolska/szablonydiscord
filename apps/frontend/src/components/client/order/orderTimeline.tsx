"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, BadgePlus, CreditCard, Handshake } from "lucide-react"
import gsap from "gsap"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { OrderEvent } from "@/components/interfaces/order/common"

export default function OrderTimeline({ events }: { events: OrderEvent[] }) {
	const [activeStep, setActiveStep] = useState(0)
	const progressAnimation = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const tl = gsap.timeline()

		if (events[1] || events[2]) {
			tl.to(progressAnimation.current, {
				width: "50%",
				duration: 0.5,
				ease: "power1.inOut",
				onComplete: () => setActiveStep(1),
			})
		}

		if (events[2]) {
			tl.to(progressAnimation.current, {
				width: "100%",
				duration: 0.5,
				ease: "power1.inOut",
				onComplete: () => setActiveStep(2),
			})
		}
	}, [events])

	const formatData = (date: Date) => {
		const now = new Date(date)

		const formatNow = format(now, "dd.MM.yyyy, HH:mm", { locale: pl })

		return formatNow
	}

	const steps = [
		{ label: "Stworzono", subtitle: `${events[0] ? formatData(events[0].createdAt) : "Brak danych"}`, icon: BadgePlus },
		{ label: "Opłacone", subtitle: `${events[1] ? formatData(events[1].createdAt) : ""}`, icon: CreditCard },
		{ label: "Zakończono", subtitle: "", icon: Handshake },
	]

	return (
		<div className="w-160  py-4 max-2xl:w-full mt-8">
			<div className="relative">
				<div className="h-2.5 bg-primary-dark opacity-80 rounded-full relative">
					<div className="absolute top-0 left-0 h-full bg-primary-color rounded-full transition-all" ref={progressAnimation} />
				</div>

				{steps.map((el, idx) => {
					const pos = idx === 0 ? "left-0" : idx === 1 ? "left-1/2 transform -translate-x-1/2" : "right-0"
					const isCompleted = idx < activeStep
					const isActive = idx === activeStep
					const isUpcoming = idx > activeStep

					return (
						<div key={idx} className={`absolute ${pos} top-1/2 transform -translate-y-1/2`}>
							<div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted || isActive ? "bg-primary-color" : "bg-primary-color opacity-70 "}`}>{isUpcoming ? <el.icon className="w-4 h-4 " /> : <Check className="w-4 h-4" />}</div>
						</div>
					)
				})}

				{steps.map((step, idx) => {
					const pos = idx === 0 ? "left-0" : idx === 1 ? "left-1/2 transform -translate-x-1/2" : "right-0"

					return (
						<div key={idx} className={`absolute ${pos} mt-5 ${idx === 2 && "text-right"} ${idx === 1 && "text-center"} ${idx === 0 && "text-left"}  ${idx > activeStep && "text-text-color "}`}>
							<p className={`text-sm ${idx == activeStep && "font-semibold text-primary-color"} `}>{step.label}</p>
							<p className="text-xs text-text-color mt-2 ">{step.subtitle && step.subtitle}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}
