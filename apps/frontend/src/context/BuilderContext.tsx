"use client"
import React, { createContext, useContext, useEffect, useState, SetStateAction, Dispatch } from "react"
import { BuilderType } from "@/components/interfaces/builder/common"
import useBuilderWebSocket from "@/hooks/useBuilderWebSocket"

interface BuilderContextType {
	builderData: BuilderType
	setBuilderData: Dispatch<SetStateAction<BuilderType>>
}

export const BuilderContext = createContext<BuilderContextType | null>(null)

export const BuilderProvider = ({ children, id, data }: { children: React.ReactNode; id: string; data: BuilderType }) => {
	const [builderData, setBuilderData] = useState<BuilderType>({
		sessionId: data.sessionId,
		slugUrl: data.slugUrl,
		hasError: data.hasError,
		rolesNumber: data.rolesNumber,
		categoryNumber: data.categoryNumber,
		channelNumber: data.channelNumber,

		aiAnalysisStatus: data.aiAnalysisStatus,
		aiAnalysisProgress: data.aiAnalysisProgress,
		aiAnalysisError: data.aiAnalysisError,

		configureServerStatus: data.configureServerStatus,
		configureServerProgress: data.configureServerProgress,
		configureError: data.configureError,

		rolesStatus: data.rolesStatus,
		rolesProgress: data.rolesProgress,
		rolesError: data.rolesError,

		roles: [],
	})

	useBuilderWebSocket({ setBuilderData, id })

	return <BuilderContext.Provider value={{ builderData, setBuilderData }}>{children}</BuilderContext.Provider>
}

export function useBuilderContext() {
	const ctx = useContext(BuilderContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
