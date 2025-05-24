"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Shield } from "lucide-react"

export default function ContentBuilderMaterials() {
	const { builderData } = useBuilderContext()
	console.log(builderData)
	return (
		<div className="w-full bg-altBackgroundColor rounded-xl border border-borderColor">
			<div className="flex items-center gap-4 p-6">
				<div className="bg-borderColor text-primaryColor p-3 rounded-lg w-fit">
					<Shield className="w-7 h-7" />
				</div>
				<div className="">
					<p className="text-lg font-medium">Regulamin</p>
					<p className="text-textColor">Podstawowe zasady serwera</p>
				</div>
			</div>
			<div className="w-full bg-borderColor h-[1px]"></div>
			<div className="p-6">
				<code className="text-gray-300 whitespace-pre-wrap">{`${builderData.rules}`}</code>
			</div>
		</div>
	)
}
