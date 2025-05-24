"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Button } from "@nextui-org/button"
import { Hash } from "lucide-react"

export default function TopSidebarBuilderMaterials() {
	const { builderData } = useBuilderContext()

	return (
		<div className="flex items-center justify-between bg-boxColor h-14 border-b border-borderColor w-full p-5">
			<div className="flex items-center gap-3">
				<Hash className="w-6 h-6 text-textColor" />
				<h2>Materiały dla {builderData.title}</h2>
			</div>
		</div>
	)
}
