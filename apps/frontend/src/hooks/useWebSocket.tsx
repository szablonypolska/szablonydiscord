"use client"

import { connectSocket } from "@/socket"
import { useEffect, useState } from "react"

export default function useWebSocket() {
	interface Type {
		title: string
		id: number
		usage: number
		dateCreate: string
	}

	const [message, setMessage] = useState<Type | null>(null)

	const connect = () => {
		const socket = connectSocket()

		const handleMessage = (msg: Type) => {
			setMessage(msg)
		}

		socket.on("message", message => {
			handleMessage(message)
		})

		return () => {
			socket.off("message")
		}
	}

	useEffect(() => {
		connect()
	}, [])

	return { message }
}
