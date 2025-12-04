"use client"

import { useDashboardContext } from "@/context/DashboardContext"
import { CircleAlert } from "lucide-react"
import Link from "next/link"

export function AccountError() {
	const { user } = useDashboardContext()

	const exceededLimit = user.limits.builderAiUsage === user.limits.builderAiLimit || user.limits.builderAiUsageMonthly >= user.limits.builderAiLimitMonthly

	if (exceededLimit) {
		return (
			<div className="px-5 py-3">
				<div className="flex items-center justify-between gap-3 bg-error-color/20 p-3 px-5 border border-error-color/50 rounded-lg ">
					<div className="flex items-center gap-3">
						<div className="bg-error-color/30 p-2 rounded-lg w-fit">
							<CircleAlert className="w-7 h-7 text-error-color inline-block " />
						</div>
						<div className="flex flex-col">
							<p className="text-error-color font-medium">Przekroczono limit</p>
							<span className="text-error-color font-medium text-sm">Przekroczono maksymalne limity dozwolone dla twojego konta, zwiększ limity.</span>
						</div>
					</div>
					<Link href="/offers" className="bg-error-color px-5 py-2 rounded-lg">
						Zwiększ limity
					</Link>
				</div>
			</div>
		)
	}

	return null
}
