import { Builder, BuilderStageType, BuilderStage } from "@/components/interfaces/builder/common"

export function findStage(builder: Builder | null, type: BuilderStageType): BuilderStage | null {
	if (!builder) return null

	const stage = builder.builderProcess?.stages.find(stage => stage.type === type)
	return stage || null
}
