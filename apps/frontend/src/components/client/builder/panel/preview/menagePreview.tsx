"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import PreviewCode from "./previewCode"
import PreviewTemplate from "./previewTemplate"
import { useEffect } from "react"
import { BuilderStageType, BuilderProcessStatus } from "@/components/interfaces/builder/common"
import { findStage } from "@/utils/builder/findStage"

export default function MenagePreview() {
	const { builderData, setCurrentPreview, currentPreview } = useBuilderContext()
	const analysis = findStage(builderData, BuilderStageType.ANALYSIS)

	useEffect(() => {
		if (analysis?.status === BuilderProcessStatus.COMPLETED) {
			setCurrentPreview("template")
		}
	}, [analysis?.status, setCurrentPreview])

	if (currentPreview === "code") return <PreviewCode />
	if (currentPreview === "template") return <PreviewTemplate />

	return <PreviewTemplate />
}
