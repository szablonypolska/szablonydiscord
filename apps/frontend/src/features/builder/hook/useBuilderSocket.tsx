import { useSocketContext } from "@/features/socketContext"
import handleGenerateListener from "../socket/listeners/handler.listener"
import handleStartBuilderEmitter from "../socket/emitters/startBuilder.emit"
import { Builder } from "@/components/interfaces/builder/common"
import { useEffect } from "react"
import { Dispatch, SetStateAction } from "react"

export function useBuilderSocket({ setBuilderData, id }: { setBuilderData: Dispatch<SetStateAction<Builder>>; id: string }) {
	const socket = useSocketContext()

	useEffect(() => {
		if (!socket) return

		handleStartBuilderEmitter(socket, id)
		handleGenerateListener(socket, setBuilderData)
		// handleAuthenticationListener(socket, setBuilderData)
		// handleServerConfigureListener(socket, setBuilderData)
		// handleRolesListener(socket, setBuilderData, id)
		// handleCategoryListener(socket, setBuilderData, id)
		// handleChannelListener(socket, setBuilderData, id)
		// handleTemplateListener(socket, setBuilderData)
		// handleCodeListener(socket, setBuilderData)

		return () => {
			socket.off("builder_update")
		}
	}, [socket, setBuilderData, id])
}
