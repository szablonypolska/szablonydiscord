"use client"

import React, { useState } from "react"
import { Check, BadgePlus, CreditCard, Handshake, CircleCheck, CircleAlert } from "lucide-react"

export default function OrderTimeline() {
	const [activeStep, setActiveStep] = useState(2)

	console.log(activeStep)

	const steps = [
		{ label: "Stworzono", subtitle: "19.04.2025, 10:32", icon: BadgePlus },
		{ label: "Oczekiwanie", subtitle: "19.04.2025, 10:31", icon: CreditCard },
		{ label: "Zakończono", subtitle: "", icon: Handshake },
	]
	const progressPercent = (activeStep / (steps.length - 1)) * 100

	return (
		<div className="w-[40rem]  py-4 max-2xl:w-full">
			<div className="relative">
				<div className="h-2.5 bg-primaryDark opacity-80 rounded-full relative">
					<div className="absolute top-0 left-0 h-full bg-primaryColor rounded-full" style={{ width: `${progressPercent}%` }} />
				</div>

				{steps.map((el, idx) => {
					const pos = idx === 0 ? "left-0" : idx === 1 ? "left-1/2 transform -translate-x-1/2" : "right-0"
					const isCompleted = idx < activeStep
					const isActive = idx === activeStep
					const isUpcoming = idx > activeStep

					return (
						<div key={idx} className={`absolute ${pos} top-1/2 transform -translate-y-1/2`}>
							<div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted || isActive ? "bg-primaryColor" : "bg-primaryColor opacity-70 "}`}>{isUpcoming ? <el.icon className="w-4 h-4 " /> : <Check className="w-4 h-4" />}</div>
						</div>
					)
				})}

				{steps.map((step, idx) => {
					const pos = idx === 0 ? "left-0" : idx === 1 ? "left-1/2 transform -translate-x-1/2" : "right-0"

					return (
						<div key={idx} className={`absolute ${pos} mt-5 ${idx === 2 && "text-right"} ${idx === 1 && "text-center"} ${idx === 0 && "text-left"}  ${idx > activeStep && "text-textColor "}`}>
							<p className={`text-sm ${idx == activeStep && "font-semibold text-primaryColor"} `}>{step.label}</p>
							{<p className="text-xs text-textColor mt-2 ">{step.subtitle && step.subtitle}</p>}
						</div>
					)
				})}
			</div>
			<div className="bg-boxColor p-5 border border-borderColor w-full rounded-lg mt-24">
				<div className="flex items-center gap-3">
					<CircleCheck className="text-primaryColor" />
					<p className="text-primaryColor font-semibold">To zamówienie zostało opłacone i zakończone.</p>
				</div>
			</div>
		</div>
	)
}
