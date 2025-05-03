"use client"

import { TypeView, Message, TypeLoad } from "@/components/interfaces/chat/common"
import loadMessage from "@/lib/chat/loadMessage"
import { connectSocketBackend } from "@/lib/socket"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
	chatId: string
	setMessage: Dispatch<SetStateAction<Message[]>>
	userId: string
	setCurrentView: Dispatch<SetStateAction<TypeView>>
	setChatId: Dispatch<SetStateAction<string>>
	currentView: TypeView
	loading: TypeLoad
	setLoading: Dispatch<SetStateAction<TypeLoad>>
}

export default function useLoadMessage({ chatId, setMessage, userId, setCurrentView, setChatId, currentView, loading, setLoading }: Props) {
	const socket = connectSocketBackend()

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading("loading")
				const data = await loadMessage(userId, chatId)

				setMessage(data.data)
				setLoading("success")
			} catch (err) {
				console.log(err)
				setLoading("error")
			}
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
}
