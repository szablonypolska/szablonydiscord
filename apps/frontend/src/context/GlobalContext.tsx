"use client"
import React, { createContext, useContext, useReducer } from "react"
import useGlobalSocket from "@/features/global/hook/useGlobalSocket"
import { User } from "@/components/interfaces/common"
import { GlobalContextType, GlobalAction } from "@/components/interfaces/global/common"

const initialState = {
	viewChannelPreview: false,
	viewRolesPreview: false,
	user: {} as User,
}

const reducer = (state: typeof initialState, action: GlobalAction) => {
	switch (action.type) {
		case "SET_VIEW_CHANNEL_PREVIEW":
			return { ...state, viewChannelPreview: action.payload }
		case "SET_VIEW_ROLES_PREVIEW":
			return { ...state, viewRolesPreview: action.payload }
		case "SET_USER":
			return { ...state, user: action.payload }
		default:
			return state
	}
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export const GlobalProvider = ({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) => {
	const [state, dispatch] = useReducer(reducer, { ...initialState, user: initialUser || ({} as User) })

	useGlobalSocket({ user: state.user, dispatch })

	return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>
}

export function useGlobalContext() {
	const ctx = useContext(GlobalContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
