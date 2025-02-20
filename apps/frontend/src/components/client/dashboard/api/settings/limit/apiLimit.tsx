"use client"

import { ChevronLeft, Zap } from "lucide-react"
import Link from "next/link"
import ApiLimitMonthly from "./apiLimitMonthly"
import ApiLimitToday from "./apiLimitToday"

export default function ApiSettingsLimit({ params }: { params: string }) {
	return (
		<>
			<div className="flex items-center gap-3">
				<Link href="/dashboard" className="hover:bg-borderColor p-2 rounded-lg">
					<ChevronLeft />
				</Link>
				<h1 className="text-2xl font-semibold">Zarządzanie kluczem API</h1>
			</div>
			<div className="bg-sidebarColor p-5 border border-borderColor rounded-xl mt-7">
				<div className="flex items-center gap-3">
					<Zap className="text-primaryColor" />
					<h2 className="text-lg font-medium">Limity zapytań</h2>
				</div>
				<div className="flex items-center gap-5 mt-5">
					<div className="flex gap-5 rounded-xl flex-grow max-lg:w-full">
						<ApiLimitToday params={params} />
						<ApiLimitMonthly params={params} />
					</div>
				</div>
			</div>
		</>
	)
}
