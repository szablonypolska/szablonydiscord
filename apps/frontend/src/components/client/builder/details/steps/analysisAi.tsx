"use client"

import { Bot } from "lucide-react"
import Progress from "../progress"
import { useEffect, useState } from "react"
import { useBuilderContext } from "@/context/BuilderContext"

export default function AnalysisAi() {
	const [progress, setProgress] = useState<number>(0)
	const { builderData } = useBuilderContext()

	useEffect(() => {
		if (progress === 100 || builderData.aiAnalysisStatus !== "in_progress") return

		const interval = setInterval(() => {
			if (progress <= 80 && builderData.aiAnalysisStatus !== "done") {
				setProgress(prev => prev + 3)
			}
		}, 800)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<>
			<Progress Icon={Bot} title="Analiza AI" description="Przygotowywanie danych przez AI" width={builderData.aiAnalysisStatus === "done" ? 100 : progress} active={builderData.aiAnalysisStatus === "done" || builderData.aiAnalysisStatus === "in_progress"} success={progress === 100 || builderData.aiAnalysisStatus === "done"} error={builderData.aiAnalysisError} />
		</>
	)
}
