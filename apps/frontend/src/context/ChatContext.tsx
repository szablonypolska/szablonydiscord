"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/components/interfaces/common"
import useWindowSize from "@/hooks/useWindowSize"
import useSocketListener from "@/hooks/useSocketListener"

interface DashboardContextType {
    toggleView: () => void
    toggleViewNotification: () => void
    showSidebar: boolean
    notification: boolean
    user: User
    numberPeopleOnline: number
    updateUser: (newUser: User) => void
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export const DashboardProvider = ({ children, user: initialUser }: { children: React.ReactNode; user: User }) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(true)
    const [notification, setNotification] = useState<boolean>(false)
    const [user, setUser] = useState<User>(initialUser)
    const [numberPeopleOnline, setNumberPeopleOnline] = useState<number>(0)
    const { width } = useWindowSize()

    useSocketListener({ user, setUser, setNumberPeopleOnline })

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

    return <DashboardContext.Provider value={{ showSidebar, toggleView, user, updateUser, notification, toggleViewNotification, numberPeopleOnline }}>{children}</DashboardContext.Provider>
}

export function useDashboardContext() {
    const ctx = useContext(DashboardContext)
    if (!ctx) {
        throw new Error("the context has not loaded yet")
    }

    return ctx
}
