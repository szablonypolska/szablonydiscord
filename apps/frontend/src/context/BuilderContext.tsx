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
		title: data.title,
		description: data.description,
		templateCode: data.templateCode,
		hasError: data.hasError,
		rolesNumber: data.rolesNumber,
		categoryNumber: data.categoryNumber,
		channelNumber: data.channelNumber,

		aiAnalysisStatus: data.aiAnalysisStatus,
		aiAnalysisError: data.aiAnalysisError,

		configureServerStatus: data.configureServerStatus,
		configureServerError: data.configureServerError,

		rolesStatus: data.rolesStatus,
		rolesError: data.rolesError,
		roles: data.roles || [],

		categoryStatus: data.categoryStatus,
		categoryError: data.categoryError,
		category: data.category || [],

		channelStatus: data.channelStatus,
		channelError: data.channelError,
		channel: data.channel || [],
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
