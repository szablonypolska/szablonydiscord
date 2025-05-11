"use client"

import { BuilderType } from "@/components/interfaces/builder/common"
import { connectSocketBackend } from "@/lib/socket"
import { Dispatch, SetStateAction, useEffect } from "react"

export default function useBuilderWebSocket({ setBuilderData, id }: { setBuilderData: Dispatch<SetStateAction<BuilderType>>; id: string }) {
	const socket = connectSocketBackend()

	console.log("dziala")

	console.log(id)

	useEffect(() => {
		socket.on("generate_data", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					aiAnalysisStatus: message.status,
				}))
			}
		})

		socket.on("server_configure", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					configureServerStatus: message.status,
				}))
			}
		})
	}, [])
}
