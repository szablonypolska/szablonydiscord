import { Dispatch, SetStateAction } from "react"
import { Builder } from "@/components/interfaces/builder/common"

interface Payload {
	id: number
	name: string
	categoryId: string
	parentId: string
	position: number
	type: number
}

export default function handleCategoriesCreatedListener(setBuilderData: Dispatch<SetStateAction<Builder>>, payload: Payload) {
	setBuilderData(prev => {
		if (!prev.builderProcess) return prev
		return {
			...prev,
			builderProcess: {
				...prev.builderProcess,
				stages: prev.builderProcess.stages.map(stage => {
					if (stage.id !== payload.id) return stage

					const existingCategoryStage = stage.category ?? {
						id: stage.id,
						builderStageId: stage.id,
						category: [],
						builderStage: stage,
					}

					return {
						...stage,
						category: {
							...existingCategoryStage,
							category: [
								...existingCategoryStage.category,
								{
									id: payload.categoryId,
									stageId: stage.id,
									name: payload.name,
									parentId: payload.parentId,
									position: payload.position,
									type: payload.type,
									private: false,
								},
							],
						},
					}
				}),
			},
		}
	})
}
