"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import Progress from "./Progress"
import { BuilderStageType, BuilderProcessStatus } from "@/components/interfaces/builder/common"
import { useEffect } from "react"
import { useState } from "react"
import { getStageMetadata } from "@/utils/builder/stageMetaData"

export default function BuilderStageSteps() {
	const { builderData } = useBuilderContext()
	const [progress, setProgress] = useState<number>(0)

	useEffect(() => {
		let interval: NodeJS.Timeout

		builderData.builderProcess?.stages.forEach(stage => {
			if (progress === 100 || stage.status !== BuilderProcessStatus.IN_PROGRESS) return

			if (progress === 100 || stage.status !== BuilderProcessStatus.IN_PROGRESS) return

			const intervalUpdateStatus = stage.type === BuilderStageType.ANALYSIS ? 0.5 : 5

			if (stage.type === BuilderStageType.ANALYSIS || stage.type === BuilderStageType.AUTHENTICATION || stage.type === BuilderStageType.CONFIGURE_SERVER) {
				interval = setInterval(() => {
					if (progress <= 80 && stage.status === BuilderProcessStatus.IN_PROGRESS) {
						setProgress(prev => prev + intervalUpdateStatus)
					}
				}, 800)
			} else {
				if (stage.type === BuilderStageType.CATEGORY) {
					setProgress((stage.category?.category.length || 0 / (builderData.metrics?.totalCategories || 0)) * 100)
				} else if (stage.type === BuilderStageType.CHANNEL) {
					setProgress((stage.channel?.channel.length || 0 / (builderData.metrics?.totalChannels || 0)) * 100)
				} else if (stage.type === BuilderStageType.ROLES) {
					setProgress(((stage.role?.role.length || 0) / (builderData.metrics?.totalRoles || 0)) * 100)
				}
			}
		})

		return () => {
			clearInterval(interval)
		}
	}, [builderData, progress])

	const stageOrder = Object.values(BuilderStageType)
	const sortedData = builderData.builderProcess?.stages.sort((a, b) => {
		return stageOrder.indexOf(a.type) - stageOrder.indexOf(b.type)
	})

	return sortedData?.map(stage => {
		const from = stage.type === BuilderStageType.CATEGORY ? stage.category?.category.length : stage.type === BuilderStageType.CHANNEL ? stage.channel?.channel.length : stage.type === BuilderStageType.ROLES ? stage.role?.role.length : 0
		const to = stage.type === BuilderStageType.CATEGORY ? builderData.metrics?.totalCategories : stage.type === BuilderStageType.CHANNEL ? builderData.metrics?.totalChannels : stage.type === BuilderStageType.ROLES ? builderData.metrics?.totalRoles : 0

		const metadata = getStageMetadata(stage.type, from, to)

		console.log("stage.status", stage.type, stage.status)

		return <Progress Icon={metadata.Icon} title={metadata.title} description={metadata.description} width={stage.status === BuilderProcessStatus.COMPLETED ? 100 : progress} active={stage.status === BuilderProcessStatus.COMPLETED || stage.status === BuilderProcessStatus.IN_PROGRESS} success={progress === 100 || stage.status === BuilderProcessStatus.COMPLETED} error={stage.status === BuilderProcessStatus.FAILED} key={stage.id} />
	})
}
