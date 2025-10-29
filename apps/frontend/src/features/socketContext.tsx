"use client"
import React, { createContext, useContext, useState } from "react"

import { Socket } from "socket.io-client"
import { useSession } from "next-auth/react"
import { io } from "socket.io-client"
import { useEffect } from "react"

export const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
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

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export function useSocketContext() {
	return useContext(SocketContext)
}
