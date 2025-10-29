"use client"

import { useEffect } from "react"
import handleApiKeyListener from "../socket/apikey.listener"
import handleNotificationListener from "../socket/notification.listener"
import { User } from "@/components/interfaces/common"
import { Dispatch, SetStateAction } from "react"
import { useSocketContext } from "@/features/socketContext"
import handleStatusListener from "../socket/status.listener"

export default function useDashboardSocket({ user, setUser, setNumberPeopleOnline }: { user: User; setUser: Dispatch<SetStateAction<User>>; setNumberPeopleOnline: Dispatch<SetStateAction<number>> }) {
	const socket = useSocketContext()

	useEffect(() => {
		if (!socket) return

		const onConnect = () => {
			handleApiKeyListener(socket, user, setUser)
			handleNotificationListener(socket, user, setUser)
			handleStatusListener(socket, user, setUser, setNumberPeopleOnline)
		}

		if (socket.connected) {
			onConnect()
		}
	}, [socket, user, setUser, setNumberPeopleOnline])
}
