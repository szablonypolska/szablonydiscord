"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import clsx from "clsx"
import { Hash, FileText, Eye, FileCode } from "lucide-react"
import Link from "next/link"
import { BuilderStageType, BuilderProcessStatus } from "@prisma/client"

export default function TopSidebarBuilder() {
	const { builderData, currentPreview, setCurrentPreview } = useBuilderContext()
	const checkIsAnalysisIsPass = builderData.builderProcess?.stages.find(stage => stage.type === BuilderStageType.ANALYSIS)

	return (
		<div className="sticky top-0 flex items-center justify-between bg-box-color h-14 border-b border-border-color w-full  max-lg:w-full p-5 z-10">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-3">
					<Hash className="w-6 h-6 text-text-color" />
					<h2>Podgląd szablonu</h2>
					<p className="text-xs">(v1.0.0)</p>
				</div>
			</div>

			<div className="flex gap-3 bg-border-color p-1.5  rounded-lg ">
				<button className={clsx("flex items-center gap-2 w-fit bg-primary-color py-1 px-2.5 rounded-lg cursor-pointer", currentPreview === "template" ? "bg-primary-color" : "bg-transparent")} onClick={() => setCurrentPreview("template")}>
					<Eye className="w-4 h-4" />
					<span className=" text-sm">Podgląd</span>
				</button>

				<button className={clsx("flex items-center gap-2 w-fit py-1 px-2.5 rounded-lg cursor-pointer", currentPreview === "code" ? "bg-primary-color" : "bg-transparent")} onClick={() => setCurrentPreview("code")}>
					<FileCode className="w-4 h-4" />
					<span className=" text-sm">Struktura</span>
				</button>

				{checkIsAnalysisIsPass && checkIsAnalysisIsPass.status === BuilderProcessStatus.COMPLETED && (
					<Link href={`/builder/${builderData.sessionId}/materials`} className="flex items-center gap-2 w-fit py-1 px-2.5 rounded-lg cursor-pointer">
						<FileText className="w-4 h-4" />
						<span className=" text-sm">Materiały</span>
					</Link>
				)}
			</div>
		</div>
	)
}
