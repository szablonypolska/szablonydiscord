"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/components/interfaces/common"
import useWindowSize from "@/hooks/useWindowSize"
import { SettingsViewOptionType } from "@/types/settings"
import useDashboardSocket from "@/features/dashboard/hook/useDashboardSocket"

interface DashboardContextType {
	toggleView: () => void
	toggleViewNotification: () => void
	showSidebar: boolean
	notification: boolean
	user: User
	setUser: React.Dispatch<React.SetStateAction<User>>
	numberPeopleOnline: number
	updateUser: (newUser: User) => void
	settingsViewOption: SettingsViewOptionType
	setSettingsViewOption: React.Dispatch<React.SetStateAction<SettingsViewOptionType>>
	settingsVisible: boolean
	setSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export const DashboardProvider = ({ children, user: initialUser }: { children: React.ReactNode; user: User }) => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true)
	const [notification, setNotification] = useState<boolean>(false)
	const [user, setUser] = useState<User>(initialUser)
	const [numberPeopleOnline, setNumberPeopleOnline] = useState<number>(0)
	const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
	const [settingsViewOption, setSettingsViewOption] = useState<SettingsViewOptionType>("account")
	const { width } = useWindowSize()

	useDashboardSocket({ user, setUser, setNumberPeopleOnline })

	useEffect(() => {
		if (width && width <= 1024) {
			setShowSidebar(false)
		} else {
			setShowSidebar(true)
		}
	}, [width])

	const toggleView = (): void => {
		setShowSidebar(!showSidebar)
	}

	const toggleViewNotification = (): void => {
		setNotification(!notification)
	}

	const updateUser = (data: User) => {
		setUser(data)
	}

	return <DashboardContext.Provider value={{ showSidebar, toggleView, user, setUser, updateUser, notification, toggleViewNotification, numberPeopleOnline, settingsViewOption, setSettingsViewOption, settingsVisible, setSettingsVisible }}>{children}</DashboardContext.Provider>
}

export function useDashboardContext() {
	const ctx = useContext(DashboardContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
