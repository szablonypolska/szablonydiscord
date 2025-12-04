"use client"
import React, { createContext, useContext, useState, SetStateAction, Dispatch } from "react"
import { Builder, ViewType, CurrentPreviewType } from "@/components/interfaces/builder/common"
import { useBuilderSocket } from "@/features/builder/hook/useBuilderSocket"

interface BuilderContextType {
	builderData: Builder
	currentView: ViewType
	setCurrentView: Dispatch<SetStateAction<ViewType>>
	setBuilderData: Dispatch<SetStateAction<Builder>>
	currentPreview: CurrentPreviewType
	setCurrentPreview: Dispatch<SetStateAction<CurrentPreviewType>>
}

export const BuilderContext = createContext<BuilderContextType | null>(null)

export const BuilderProvider = ({ children, id, data }: { children: React.ReactNode; id: string; data: Builder }) => {
	const [builderData, setBuilderData] = useState<Builder>(data)
	const [currentView, setCurrentView] = useState<ViewType>("rules")
	const [currentPreview, setCurrentPreview] = useState<CurrentPreviewType>("code")

	useBuilderSocket({ setBuilderData, id })

	return <BuilderContext.Provider value={{ builderData, setBuilderData, currentView, setCurrentView, currentPreview, setCurrentPreview }}>{children}</BuilderContext.Provider>
}

export function useBuilderContext() {
	const ctx = useContext(BuilderContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
