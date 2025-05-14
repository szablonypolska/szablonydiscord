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
					rolesNumber: message.rolesNumber,
					categoryNumber: message.categoryNumber,
					channelNumber: message.channelNumber,
				}))
			}
		})

		socket.on("server_configure", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					configureServerStatus: message.status,
					configureServerError: message.configureServerError ? message.configureServerError : false,
				}))
			}
		})

		socket.on("update_roles_status", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					rolesStatus: message.status,
				}))
			}
		})

		socket.on("update_roles", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					roles: [...prev.roles, { sessionId: id, name: message.name, color: message.color }],
				}))
			}
		})

		socket.on("update_category_status", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					categoryStatus: message.status,
				}))
			}
		})

		socket.on("update_category", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					category: [...prev.category, { sessionId: id, name: message.name }],
				}))
			}
		})
	}, [])
}
