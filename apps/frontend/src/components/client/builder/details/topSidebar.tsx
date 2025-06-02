"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Button } from "@nextui-org/button"
import { Hash, FileText, Eye, Code } from "lucide-react"
import Link from "next/link"

export default function TopSidebarBuilder() {
	const { builderData, currentPreview, setCurrentPreview } = useBuilderContext()

	return (
		<div className="flex items-center justify-between bg-boxColor h-14 border-b border-borderColor w-full  max-lg:w-full p-5">
			<div className="flex items-center gap-3">
				<Hash className="w-6 h-6 text-textColor" />
				<h2>Podgląd szablonu</h2>
			</div>
			<div className="flex gap-3">
				{currentPreview === "code" && (
					<Button className="bg-borderColor p-2 rounded-lg" onPress={() => setCurrentPreview("template")}>
						<Eye />
					</Button>
				)}
				{currentPreview === "template" && (
					<Button className="bg-borderColor p-2 rounded-lg" onPress={() => setCurrentPreview("code")}>
						<Code />
					</Button>
				)}
				{builderData.aiAnalysisStatus === "done" && (
					<Link href={`/builder/${builderData.sessionId}/materials`}>
						<Button className="bg-borderColor rounded-lg">
							<FileText className="text-primaryColor" /> <span>Materiały</span>
						</Button>
					</Link>
				)}
			</div>
		</div>
	)
}
