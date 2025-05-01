"use client"
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

import { TypeView, Chat } from "../components/interfaces/chat/common"

interface ChatContextType {
	currentView: TypeView
	setCurrentView: Dispatch<SetStateAction<TypeView>>
	chatId: string
	setChatId: Dispatch<SetStateAction<string>>
	chatList: Chat[]
	setChatList: Dispatch<SetStateAction<Chat[]>>
}

export const ChatContext = createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentView, setCurrentView] = useState<TypeView>(TypeView.MAIN)
	const [chatId, setChatId] = useState<string>("")
	const [chatList, setChatList] = useState<Chat[]>([])

	return <ChatContext.Provider value={{ currentView, setCurrentView, chatId, setChatId, chatList, setChatList }}>{children}</ChatContext.Provider>
}

export function useChatContext() {
	const ctx = useContext(ChatContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
