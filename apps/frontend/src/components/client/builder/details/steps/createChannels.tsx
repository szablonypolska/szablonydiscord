"use client"

import { Tv } from "lucide-react"
import Progress from "../progress"
import { useEffect, useState } from "react"
import { useBuilderContext } from "@/context/BuilderContext"

export default function CreateChannels() {
	const [progress, setProgress] = useState<number>(0)
	const { builderData } = useBuilderContext()

	useEffect(() => {
		if (progress === 100 || builderData.channelStatus !== "in_progress") return

		setProgress((builderData.channel.length / builderData.channelNumber) * 100)
	}, [builderData])

	return (
		<div className="">
			<Progress Icon={Tv} title="Tworzenie kanałów" description={`Tworzenie kanałów (${builderData.channel && builderData.channel.length}/${builderData.channelNumber})`} width={builderData.channelStatus === "done" ? 100 : progress} active={builderData.channelStatus === "done" || builderData.channelStatus === "in_progress"} success={progress === 100 || builderData.channelStatus === "done"} error={builderData.channelError} />
		</div>
	)
}
