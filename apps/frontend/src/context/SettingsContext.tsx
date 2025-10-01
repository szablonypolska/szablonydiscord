"use client"
import React, { createContext, useContext, useState, SetStateAction, Dispatch } from "react"
import { UserSettings } from "@/components/interfaces/common"

interface SettingsContextType {
	settingsData: UserSettings | null
	setSettingsData: Dispatch<SetStateAction<UserSettings | null>>
}

export const SettingsContext = createContext<SettingsContextType | null>(null)

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
	const [settingsData, setSettingsData] = useState<UserSettings | null>(null)

	return <SettingsContext.Provider value={{ settingsData, setSettingsData }}>{children}</SettingsContext.Provider>
}

export function useSettingsContext() {
	const ctx = useContext(SettingsContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
