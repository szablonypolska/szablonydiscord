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
					title: message.title,
					description: message.description,
					aiAnalysisError: message.aiAnalysisError ? message.aiAnalysisError : false,
				}))
			}
		})

		socket.on("update_status_authentication", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					authenticationStatus: message.status,
					authenticationError: message.authenticationError ? message.authenticationError : false,
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
					rolesError: message.rolesError ? message.rolesError : false,
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
					categoryError: message.categoryError ? message.categoryError : false,
				}))
			}
		})

		socket.on("update_category", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					category: [...prev.category, { sessionId: id, name: message.name, id: message.id, parentId: message.parentId, position: message.position, type: message.type, private: message.private }],
				}))
			}
		})

		socket.on("update_channel_status", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					channelStatus: message.status,
					channelError: message.rolesError ? message.rolesError : false,
				}))
			}
		})

		socket.on("update_channel", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					channel: [...prev.channel, { sessionId: id, id: message.id, name: message.name, type: message.type, parentId: message.parentId, position: message.position, private: message.private }],
				}))
			}
		})

		socket.on("update_template", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					templateCode: message.templateCode,
				}))
			}
		})

		socket.on("update_code", message => {
			if (id === message.sessionId) {
				setBuilderData(prev => ({
					...prev,
					code: prev.code + message.code,
				}))
			}
		})
	}, [])
}
