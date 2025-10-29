"use client"

import { BuilderStageType } from "@/components/interfaces/builder/common"
import { useDashboardContext } from "@/context/DashboardContext"
import { useMemo } from "react"

export function AccountBuilderBox() {
	const { user } = useDashboardContext()

	const calculateData = useMemo(() => {
		const totalRolesAndChannels = user.builder.reduce(
			(acc, builder) => {
				const stages = builder.builderProcess?.stages || []

				for (const stage of stages) {
					if (stage.type === BuilderStageType.CHANNEL) {
						acc.channels += stage.channel?.channel.length || 0
					} else if (stage.type === BuilderStageType.ROLES) {
						acc.roles += stage.role?.role.length || 0
					} else if (stage.status === "FAILED") {
						acc.failedRate++
					}
				}

				return acc
			},
			{ roles: 0, channels: 0, failedRate: 0 }
		)

		return totalRolesAndChannels
	}, [user.builder])

	let boxes: { title: string; description: string; value: number | string; badge: string }[] = [
		{
			title: "Łącznie klonów",
			description: "Wszystkie utworzone buildery AI",
			value: user.builder.length,
			badge: "Wszystkie",
		},
		{
			title: "Wskaźnik sukcesu",
			description: `${calculateData.failedRate} nieudanych, ${user.builder.length - calculateData.failedRate} udanych`,
			value: user.builder.length > 0 ? `${Math.round(((user.builder.length - calculateData.failedRate) / user.builder.length) * 100)}%` : "0%",
			badge: "Wskaźnik",
		},
		{
			title: "Utworzone role",
			description: `Średnio na jeden build przypada ${Math.round(calculateData.roles / user.builder.length)} ról`,
			value: calculateData.roles,
			badge: "Wszystkie",
		},
		{
			title: "Łącznie klonów",
			description: `Średnio na jeden build przypada ${Math.round(calculateData.channels / user.builder.length)} kanałów`,
			value: calculateData.channels,
			badge: "Wszystkie",
		},
	]

	return (
		<div className="flex flex-wrap max-md:flex-col gap-4 p-5 min-w-0">
			{boxes.map((box, index) => (
				<div className="relative p-5 border border-border-color bg-box-color rounded-lg flex-grow   z-10 overflow-hidden border-t-2 border-t-primary-color flex-shrink-0" key={index}>
					<div className="flex items-center justify-between">
						<p className=" text-text-color">{box.title}</p>
						<div className="text text-text-color border border-border-color px-4 py-1 rounded-full">
							<p className="text-xs">{box.badge}</p>
						</div>
					</div>
					<div className="mt-3">
						<p className="text-2xl font-semibold">{box.value}</p>
						<span className="text-xs text-text-color">{box.description}</span>
					</div>

					<div
						className="absolute top-0 left-0 flex flex-col items-center justify-center scale-105 h-full w-full opacity-25 z-[-1]"
						style={{
							backgroundImage: `linear-gradient(to right, var(--borderColor) 1px, transparent 1px), linear-gradient(to bottom, var(--borderColor) 1px, transparent 1px)`,
							backgroundSize: "32px 32px",
							backgroundColor: "var(--background)",
						}}></div>
				</div>
			))}
		</div>
	)
}
