"use client"
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
import { TypeView, Chat, Message, TypeLoad } from "../components/interfaces/chat/common"
// import useLoadMessage from "@/hooks/useLoadMessage"

interface ChatContextType {
	currentView: TypeView
	setCurrentView: Dispatch<SetStateAction<TypeView>>
	chatId: string
	setChatId: Dispatch<SetStateAction<string>>
	chatList: Chat[]
	setChatList: Dispatch<SetStateAction<Chat[]>>
	message: Message[]
	setMessage: Dispatch<SetStateAction<Message[]>>
	loading: TypeLoad
}

export const ChatContext = createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentView, setCurrentView] = useState<TypeView>(TypeView.MAIN)
	const [chatId, setChatId] = useState<string>("")
	const [chatList, setChatList] = useState<Chat[]>([])
	const [message, setMessage] = useState<Message[]>([])
	const [loading, setLoading] = useState<TypeLoad>("loading")
	setLoading("error")

	// useLoadMessage({ chatId, setMessage, userId, setCurrentView, setChatId, currentView, loading, setLoading })

	return <ChatContext.Provider value={{ currentView, setCurrentView, chatId, setChatId, chatList, setChatList, message, setMessage, loading }}>{children}</ChatContext.Provider>
}

export function useChatContext() {
	const ctx = useContext(ChatContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}

// "use client"
// import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
// import { TypeView, Chat, Message, TypeLoad } from "../components/interfaces/chat/common"
// // import useLoadMessage from "@/hooks/useLoadMessage"

// interface ChatContextType {
// 	currentView: TypeView
// 	setCurrentView: Dispatch<SetStateAction<TypeView>>
// 	chatId: string
// 	setChatId: Dispatch<SetStateAction<string>>
// 	chatList: Chat[]
// 	setChatList: Dispatch<SetStateAction<Chat[]>>
// 	message: Message[]
// 	setMessage: Dispatch<SetStateAction<Message[]>>
// 	loading: TypeLoad
// }

// export const ChatContext = createContext<ChatContextType | null>(null)

// export const ChatProvider = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
// 	const [currentView, setCurrentView] = useState<TypeView>(TypeView.MAIN)
// 	const [chatId, setChatId] = useState<string>("")
// 	const [chatList, setChatList] = useState<Chat[]>([])
// 	const [message, setMessage] = useState<Message[]>([])
// 	const [loading, setLoading] = useState<TypeLoad>("loading")
// 	setLoading("error")

// 	// useLoadMessage({ chatId, setMessage, userId, setCurrentView, setChatId, currentView, loading, setLoading })

// 	return <ChatContext.Provider value={{ currentView, setCurrentView, chatId, setChatId, chatList, setChatList, message, setMessage, loading }}>{children}</ChatContext.Provider>
// }

// export function useChatContext() {
// 	const ctx = useContext(ChatContext)
// 	if (!ctx) {
// 		throw new Error("the context has not loaded yet")
// 	}

// 	return ctx
// }
