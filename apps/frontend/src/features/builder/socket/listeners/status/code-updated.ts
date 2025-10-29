import { Dispatch, SetStateAction } from "react"
import { Builder } from "@/components/interfaces/builder/common"

export default function handleCodeUpdatedListener(setBuilderData: Dispatch<SetStateAction<Builder>>, payload: { id: number; code: string }) {
	setBuilderData(prev => {
		if (!prev.builderProcess) return prev
		return {
			...prev,
			builderProcess: {
				...prev.builderProcess,
				stages: prev.builderProcess.stages.map(stage => (stage.id === payload.id ? { ...stage, code: stage.code + payload.code } : stage)),
			},
		}
	})
}
