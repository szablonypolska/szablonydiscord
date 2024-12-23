"use client"

import { useEffect } from "react"
import { io, Socket } from "socket.io-client"

let socket: Socket | null

export const connectSocket = (): Socket => {
	if (!socket) {
		socket = io("http://localhost:3005", {
			reconnectionDelayMax: 1000,
		})

		socket.on("connect", () => {
			console.log("Połączono z websocketem")
		})

		socket.emit("message", { name: "elo" })

		socket.on("disconnect", () => {
			console.log("Rozłączono z websocketem")
		})
	}

	return socket
}
