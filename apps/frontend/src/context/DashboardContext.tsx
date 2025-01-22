"use client"
import React, { createContext, use, useContext, useEffect, useState } from "react"
import { User } from "@/components/interfaces/common"
import useWindowSize from "@/hooks/useWindowSize"
import { connectSocketBackend } from "@/app/lib/socket"

interface DashboardContextType {
	toggleView: () => void
	showSidebar: boolean
	user: User
	updateUser: (newUser: User) => void
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export const DashboardProvider = ({ children, user: initialUser }: { children: React.ReactNode; user: User }) => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true)
	const [user, setUser] = useState<User>(initialUser)
	const { width } = useWindowSize()
	const socket = connectSocketBackend()

	socket.on("apikey", message => {
		if (user.userId === message.userId) {
			const updateUser = {
				...user,
				api: user.api.map(el =>
					el.apiKeyId === message.apiKeyId ? { ...el, reqCount: message.reqCount, successCount: message.successCount, errorCount: message.errorCount, lastUsed: message.lastUsed } : el
				),
			}

			setUser(updateUser)
		}
	})

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

	const updateUser = (data: User) => {
		setUser(data)
	}

	return <DashboardContext.Provider value={{ showSidebar, toggleView, user, updateUser }}>{children}</DashboardContext.Provider>
}

export function useDashboardContext() {
	const ctx = useContext(DashboardContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
