"use client"

import { Bot, Loader2 } from "lucide-react"
import { useBuilderContext } from "@/context/BuilderContext"
import LoaderPreview from "../loader"

export default function AnalysisAiPreview() {
	const { builderData } = useBuilderContext()

	return <LoaderPreview Icon={Bot} title="Trwa analiza AI" description="Trwa analiza twojego zapytania przez sztuczną inteligencje" loader={builderData.aiAnalysisStatus === "in_progress"} active={builderData.aiAnalysisStatus === "in_progress" || builderData.aiAnalysisStatus === "done"} success={builderData.aiAnalysisStatus === "done"} />
}
