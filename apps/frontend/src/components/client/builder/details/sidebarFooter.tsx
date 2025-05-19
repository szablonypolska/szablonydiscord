"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Button } from "@nextui-org/button"
import { Loader2, Crown } from "lucide-react"

export default function SidebarFooter() {
	const { builderData } = useBuilderContext()

	return (
		<div className="">
			<div className="w-full h-[1px] bg-borderColor rounded-full my-4"></div>
			{!builderData.templateCode && (
				<div className="flex items-center gap-3 rounded-lg ">
					<Loader2 className="animate-spin w-5 h-5 text-primaryColor" />
					<p className="text-sm text-textColor">Trwa generowanie szablonu</p>
				</div>
			)}
			{builderData.templateCode && (
				<Button className="w-full rounded-xl bg-primaryColor">
					<Crown className="w-5 h-5" />
					<span className="text-sm">Opublikuj szablon</span>
				</Button>
			)}
		</div>
	)
}
