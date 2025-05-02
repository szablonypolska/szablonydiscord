"use client"
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { TypeView, Chat, Message } from "../components/interfaces/chat/common"
import loadMessage from "@/lib/chat/loadMessage"
import { connectSocketBackend } from "@/lib/socket"

interface ChatContextType {
	currentView: TypeView
	setCurrentView: Dispatch<SetStateAction<TypeView>>
	chatId: string
	setChatId: Dispatch<SetStateAction<string>>
	chatList: Chat[]
	setChatList: Dispatch<SetStateAction<Chat[]>>
	message: Message[]
	setMessage: Dispatch<SetStateAction<Message[]>>
}

export const ChatContext = createContext<ChatContextType | null>(null)

export const ChatProvider = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
	const [currentView, setCurrentView] = useState<TypeView>(TypeView.MAIN)
	const [chatId, setChatId] = useState<string>("")
	const [chatList, setChatList] = useState<Chat[]>([])
	const [message, setMessage] = useState<Message[]>([])
	const socket = connectSocketBackend()

	useEffect(() => {
		const loadData = async () => {
			const data = await loadMessage(userId, chatId)

			setMessage(data.data)
		}

		if (chatId) {
			loadData()
		}
	}, [chatId, setMessage])

	useEffect(() => {
		if (chatId) {
			setCurrentView(TypeView.CHAT)
		}
	}, [chatId])

	useEffect(() => {
		if (currentView !== "CHAT") {
			setChatId("")
		}
	}, [currentView])

	useEffect(() => {
		socket.on("message:new", newMessage => {
			setMessage(prev =>
				prev.map(msg => {
					if (msg.tempId === newMessage.tempId) {
						const { tempId, ...rest } = newMessage
						return rest
					}
					return msg
				})
			)
		})
		return () => {
			socket.off("message:new")
		}
	})

	return <ChatContext.Provider value={{ currentView, setCurrentView, chatId, setChatId, chatList, setChatList, message, setMessage }}>{children}</ChatContext.Provider>
}

export function useChatContext() {
	const ctx = useContext(ChatContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
