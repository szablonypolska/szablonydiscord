import { Dispatch, SetStateAction } from "react"
import { Builder, BuilderProcessStatus } from "@/components/interfaces/builder/common"

export default function handleStatusUpdatedListener(setBuilderData: Dispatch<SetStateAction<Builder>>, payload: { id: number; status: BuilderProcessStatus }) {
	setBuilderData(prev => {
		if (!prev.builderProcess) return prev

		return {
			...prev,
			builderProcess: {
				...prev.builderProcess,
				stages: prev.builderProcess.stages.map(stage => (stage.id === payload.id ? { ...stage, status: payload.status } : stage)),
			},
		}
	})
}
