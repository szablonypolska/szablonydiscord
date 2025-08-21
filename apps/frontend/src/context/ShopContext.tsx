"use client"
import React, { createContext, useContext, useState, SetStateAction, Dispatch } from "react"

interface ShopContextType {
	view: boolean
	setView: Dispatch<SetStateAction<boolean>>
}

export const ShopContext = createContext<ShopContextType | null>(null)

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
	const [view, setView] = useState<boolean>(false)

	return <ShopContext.Provider value={{ view, setView }}>{children}</ShopContext.Provider>
}

export function useShopContext() {
	const ctx = useContext(ShopContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
