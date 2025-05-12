"use client"

import { Crown } from "lucide-react"
import Progress from "../progress"
import { useEffect, useState } from "react"
import { BuilderStatus } from "@/components/interfaces/builder/common"
import { useBuilderContext } from "@/context/BuilderContext"

export default function ConfigureServer() {
	const [progress, setProgress] = useState<number>(0)
	const { builderData } = useBuilderContext()

	useEffect(() => {
		if (progress === 100 || builderData.configureServerStatus !== "in_progress") return

		const interval = setInterval(() => {
			if (progress <= 80 && builderData.configureServerStatus === "in_progress") {
				setProgress(prev => prev + 10)
			}
		}, 800)

		return () => {
			clearInterval(interval)
		}
	}, [builderData])

	return (
		<div className="">
			<Progress Icon={Crown} title="Konfiuracja serwer" description="Ustawianie podstawowych funkcji" width={builderData.configureServerStatus === "done" ? 100 : progress} active={builderData.configureServerStatus === "done" || builderData.configureServerStatus === "in_progress"} success={progress === 100 || builderData.configureServerStatus === "done"} />
		</div>
	)
}
