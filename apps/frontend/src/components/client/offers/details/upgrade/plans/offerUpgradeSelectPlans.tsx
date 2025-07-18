"use client"

import { Calendar } from "lucide-react"
import { useState } from "react"

export function OfferUpgradeSelectPlans() {
	const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annually">("monthly")

	const plansOptions = [
		{
			id: "monthly",
			label: "Miesięczny",
			description: "Płatność miesięczna",
			price: "12,99 zł",
			frequency: "miesięcznie",
		},
		{
			id: "annually",
			label: "Roczny",
			description: "Płatność roczna (taniej nawet 25%)",
			price: "107,99 zł",
			frequency: "rocznie",
		},
	]

	return (
		<div className="bg-section-color rounded-xl p-6">
			<h3 className="text-lg font-medium">Rozpocznij subskrybcje</h3>
			<div className="flex flex-col gap-3 mt-6">
				{plansOptions.map(plan => (
					<button className={`flex items-center justify-between  border w-full rounded-lg p-4 cursor-pointer  ${plan.id === selectedPlan ? "border-primary-color bg-darknes-primary-color/30" : "border-border-color bg-box-color"}`} key={plan.id} onClick={() => setSelectedPlan(plan.id as "monthly" | "annually")}>
						<div className="flex items-center gap-3">
							<div className="bg-alt-border-color p-2.5 rounded-lg w-fit">
								<Calendar className={`${plan.id === selectedPlan ? "text-primary-color" : "text-text-color"} w-5.5 h-5.5`} />
							</div>
							<div className="text-left">
								<div className="flex items-center gap-2">
									<p className="font-semibold">{plan.label}</p>
									{plan.id === "annually" && (
										<div className="bg-primary-dark/40 px-2 py-0.5 w-fit rounded-full">
											<p className="text-primary-color text-xs">Oszczędzasz 25%</p>
										</div>
									)}
								</div>
								<p className="text-sm text-text-color">{plan.description}</p>
							</div>
						</div>
						<div className="flex items-center gap-6 pr-3 text-right">
							<div className="flex flex-col">
								<p className="font-medium text-lg">{plan.price}</p>
								<span className="text-text-color text-xs">{plan.frequency}</span>
							</div>
							<div className={`w-5 h-5 border  rounded-full relative ${plan.id === selectedPlan ? "border-primary-color" : "border-alt-border-color"}`}>{plan.id === selectedPlan && <div className="absolute w-3 h-3 bg-primary-color top-1/2 left-1/2 -translate-1/2 rounded-full"></div>}</div>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
