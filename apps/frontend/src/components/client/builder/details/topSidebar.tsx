"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Button } from "@nextui-org/button"
import { Hash, FileText, Eye, Code } from "lucide-react"
import Link from "next/link"

export default function TopSidebarBuilder() {
	const { builderData, currentPreview, setCurrentPreview } = useBuilderContext()

	return (
		<div className="flex items-center justify-between bg-box-color h-14 border-b border-border-color w-full  max-lg:w-full p-5">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-3">
					<Hash className="w-6 h-6 text-text-color" />
					<h2>Podgląd szablonu</h2>
				</div>
			</div>
			<div className="flex gap-3">
				{currentPreview === "code" && (
					<Button className="bg-border-color p-2 rounded-lg px-3" onPress={() => setCurrentPreview("template")}>
						<Eye />
					</Button>
				)}
				{currentPreview === "template" && (
					<Button className="bg-border-color p-2 rounded-lg px-3" onPress={() => setCurrentPreview("code")}>
						<Code />
					</Button>
				)}
				{builderData.aiAnalysisStatus === "done" && (
					<Link href={`/builder/${builderData.sessionId}/materials`}>
						<Button className="bg-border-color rounded-lg">
							<FileText className="" /> <span>Materiały</span>
						</Button>
					</Link>
				)}
			</div>
		</div>
	)
}
