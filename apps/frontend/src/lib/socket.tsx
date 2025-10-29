"use client"

import { io, Socket } from "socket.io-client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

let socket: Socket | null

export const connectSocket = (): Socket => {
	if (!socket) {
		socket = io("http://localhost:3005", {
			reconnectionDelayMax: 1000,
		})

		socket.on("connect", () => {
			console.log("Połączono z websocketem")
		})

		socket.on("disconnect", () => {
			console.log("Rozłączono z websocketem")
		})
	}

	return socket
}

export const useSocketBackend = (): Socket | null => {
	const { data: session, status } = useSession()
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		if (status === "authenticated") {
			const socketBackend = io("http://localhost:3006", {
				auth: {
					userId: session?.user?.id || "",
				},
				reconnectionDelayMax: 1000,
			})

			socketBackend.on("connect", () => {
				console.log("Połączono z websocketem")
				setSocket(socketBackend)
			})

			socketBackend.on("disconnect", () => {
				console.log("Rozłączono z websocketem")
			})

			setSocket(socketBackend)
		}
	}, [session, status])

	return socket
}
