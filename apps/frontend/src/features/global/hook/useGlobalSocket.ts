"use client"

import { useEffect } from "react"
import handleNotificationListener from "../socket/notification.listener"
import { User } from "@/components/interfaces/common"
import { Dispatch } from "react"
import { useSocketContext } from "@/features/socketContext"
import { GlobalAction } from "@/components/interfaces/global/common"

export default function useGlobalSocket({ user, dispatch }: { user: User; dispatch: Dispatch<GlobalAction> }) {
	const socket = useSocketContext()

	useEffect(() => {
		if (!socket) return

		const onConnect = () => {
			handleNotificationListener(socket, user, dispatch)
		}

		if (socket.connected) {
			onConnect()
		}
	}, [socket, user, dispatch])
}
