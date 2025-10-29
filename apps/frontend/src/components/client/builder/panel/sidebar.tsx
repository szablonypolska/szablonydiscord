"use client"

import { Bot } from "lucide-react"
import SidebarFooter from "./sidebarFooter"
import BuilderStageSteps from "./steps/BuilderStageSteps"
import { useBuilderContext } from "@/context/BuilderContext"

export default function SidebarBuilder() {
	const { builderData } = useBuilderContext()

	return (
		<div className="flex flex-col sticky top-0 left-0 bg-box-color w-88 lg:h-screen border-r border-border-color px-4 py-5 shrink-0 max-lg:static max-lg:w-full">
			<div className="flex items-center gap-3  ">
				<Bot className="w-10 h-10 text-primary-color" />

				<div className="">
					<div className="flex items-center gap-3">
						<h1 className="text-lg font-medium">{builderData.sourceTemplate ? "Editor AI" : "Builder AI"}</h1>
						{builderData.sourceTemplate && (
							<div className="bg-primary-dark px-2.5 py-0.5 rounded-full">
								<p className="text-xs text-primary-color">Edycja</p>
							</div>
						)}
					</div>
					<p className="text-sm text-text-color">{builderData.sourceTemplate ? "Trwa edycja szablonu..." : "Tworzenie szablonu..."}</p>
				</div>
			</div>
			<div className=" mt-8 lg:grow">
				<BuilderStageSteps />
			</div>
			<SidebarFooter />
		</div>
	)
}
