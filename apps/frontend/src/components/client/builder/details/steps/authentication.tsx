"use client"

import { SearchCode } from "lucide-react"
import Progress from "../progress"
import { useEffect, useState } from "react"
import { useBuilderContext } from "@/context/BuilderContext"

export default function Authentication() {
	const [progress, setProgress] = useState<number>(0)
	const { builderData } = useBuilderContext()

	useEffect(() => {
		if (progress === 100 || builderData.authenticationStatus !== "in_progress") return

		const interval = setInterval(() => {
			if (progress <= 80 && builderData.authenticationStatus !== "done") {
				setProgress(prev => prev + 3)
			}
		}, 800)

		return () => {
			clearInterval(interval)
		}
	}, [])

	console.log(builderData.authenticationStatus)

	return (
		<>
			<Progress Icon={SearchCode} title="Uwierzytelnianie API" description="Dobieranie tokenu dostępu konta" width={builderData.authenticationStatus === "done" ? 100 : progress} active={builderData.authenticationStatus === "done" || builderData.authenticationStatus === "in_progress"} success={progress === 100 || builderData.authenticationStatus === "done"} error={builderData.authenticationError} />
		</>
	)
}
