"use client"

import { useEffect } from "react"
import { io, Socket } from "socket.io-client"

let socket: Socket | null
let socketBackend: Socket | null

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

export const connectSocketBackend = (): Socket => {
	if (!socketBackend) {
		socketBackend = io("http://localhost:3006", {
			reconnectionDelayMax: 1000,
		})

		socketBackend.on("connect", () => {
			console.log("Połączono z websocketem")
		})

		socketBackend.on("disconnect", () => {
			console.log("Rozłączono z websocketem")
		})
	}

	return socketBackend
}
