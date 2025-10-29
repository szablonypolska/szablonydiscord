import { Dispatch, SetStateAction } from "react"
import { Builder } from "@/components/interfaces/builder/common"
import { de } from "date-fns/locale"

interface Payload {
	title: string
	description: string
	metrics: {
		totalCategories: number
		totalChannels: number
		totalRoles: number
	}
	materials: {
		rules: string
		tariff: string
		privacyPolicy: string
		faq: string
	}
}

export default function handleAnalysisCompletedListener(setBuilderData: Dispatch<SetStateAction<Builder>>, payload: Payload) {
	setBuilderData(prev => {
		if (!prev.builderProcess) return prev

		return {
			...prev,
			title: payload.title,
			description: payload.description,
			metrics: {
				...prev.metrics,
				totalCategories: payload.metrics.totalCategories,
				totalChannels: payload.metrics.totalChannels,
				totalRoles: payload.metrics.totalRoles,
			},
			materials: {
				...prev.materials,
				rules: payload.materials.rules,
				tariff: payload.materials.tariff,
				privacyPolicy: payload.materials.privacyPolicy,
				faq: payload.materials.faq,
			},
		}
	})
}
