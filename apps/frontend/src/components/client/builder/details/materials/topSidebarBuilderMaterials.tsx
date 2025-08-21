"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Hash } from "lucide-react"

export default function TopSidebarBuilderMaterials() {
	const { builderData } = useBuilderContext()

	return (
		<div className="flex items-center justify-between bg-box-color h-14 border-b border-border-color w-full p-5">
			<div className="flex items-center gap-3">
				<Hash className="w-6 h-6 text-text-color" />
				<h2>Materiały dla {builderData.title}</h2>
			</div>
		</div>
	)
}
