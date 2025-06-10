"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import PreviewCode from "./previewCode"
import PreviewTemplate from "./previewTemplate"
import { useEffect } from "react"

export default function MenagePreview() {
	const { builderData, setCurrentPreview, currentPreview } = useBuilderContext()

	useEffect(() => {
		if (builderData.aiAnalysisStatus === "done") {
			setCurrentPreview("template")
		}
	}, [builderData.aiAnalysisStatus])

	if (currentPreview === "code") return <PreviewCode />
	if (currentPreview === "template") return <PreviewTemplate />

	return <PreviewTemplate />
}
