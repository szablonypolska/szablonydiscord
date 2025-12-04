import { User } from "@/components/interfaces/common"
import {  Dispatch } from "react"
import { Socket } from "socket.io-client"
import { toast } from "sonner"
import { GlobalAction } from "@/components/interfaces/global/common"

export default function handleApiKeyListener(socket: Socket, user: User, dispatch: Dispatch<GlobalAction>) {
	socket.on("notification", message => {
		const type = message.data.type === "SUCCESS" ? "success" : "error"
		const newNotifications = [message.data, ...user.notification]

		console.log("New notification received:", message.data)

		toast[type]("Nowe powiadomienie", {
			description: message.data.title,
		})

		dispatch({
			type: "SET_USER",
			payload: {
				...user,
				notification: newNotifications.splice(0, 4),
			},
		})
	})

	return () => {
		socket.off("notification")
	}
}
