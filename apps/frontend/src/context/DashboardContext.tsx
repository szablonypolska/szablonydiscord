"use client"
import React, { createContext, useState } from "react"

interface DashboardContextType {
	toggleView: () => void
	showSidebar: boolean
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true)

	const toggleView = (): void => {
		setShowSidebar(!showSidebar)
	}

	return <DashboardContext.Provider value={{ showSidebar, toggleView }}>{children}</DashboardContext.Provider>
}
