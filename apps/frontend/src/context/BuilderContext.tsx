"use client"
import React, { createContext, useContext, useEffect, useState, SetStateAction, Dispatch } from "react"
import { BuilderType, ViewType, CurrentPreviewType } from "@/components/interfaces/builder/common"
import useBuilderWebSocket from "@/hooks/useBuilderWebSocket"

interface BuilderContextType {
	builderData: BuilderType
	currentView: ViewType
	setCurrentView: Dispatch<SetStateAction<ViewType>>
	setBuilderData: Dispatch<SetStateAction<BuilderType>>
	currentPreview: CurrentPreviewType
	setCurrentPreview: Dispatch<SetStateAction<CurrentPreviewType>>
}

export const BuilderContext = createContext<BuilderContextType | null>(null)

export const BuilderProvider = ({ children, id, data }: { children: React.ReactNode; id: string; data: BuilderType }) => {
	const [builderData, setBuilderData] = useState<BuilderType>(data)
	const [currentView, setCurrentView] = useState<ViewType>("rules")
	const [currentPreview, setCurrentPreview] = useState<CurrentPreviewType>("code")

	useBuilderWebSocket({ setBuilderData, id })

	return <BuilderContext.Provider value={{ builderData, setBuilderData, currentView, setCurrentView, currentPreview, setCurrentPreview }}>{children}</BuilderContext.Provider>
}

export function useBuilderContext() {
	const ctx = useContext(BuilderContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
