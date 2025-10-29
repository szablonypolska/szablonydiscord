import { Dispatch, SetStateAction } from "react"
import { Builder } from "@/components/interfaces/builder/common"

export default function handleRolesCreatedListener(setBuilderData: Dispatch<SetStateAction<Builder>>, payload: { id: number; name: string; color: string }) {
	setBuilderData(prev => {
		if (!prev.builderProcess) return prev

		return {
			...prev,
			builderProcess: {
				...prev.builderProcess,
				stages: prev.builderProcess.stages.map(stage => {
					if (stage.id !== payload.id) return stage

					const existingRoleStage = stage.role ?? {
						id: 0,
						builderStageId: stage.id,
						role: [],
						builderStage: stage,
					}

					return {
						...stage,
						role: {
							...existingRoleStage,
							role: [
								...existingRoleStage.role,
								{
									id: payload.id,
									stageId: stage.id,
									name: payload.name,
									color: payload.color,
								},
							],
						},
					}
				}),
			},
		}
	})
}
