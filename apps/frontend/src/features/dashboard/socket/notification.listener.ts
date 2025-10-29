import { User } from "@/components/interfaces/common"
import { SetStateAction, Dispatch } from "react"
import { Socket } from "socket.io-client"
import { toast } from "sonner"

export default function handleApiKeyListener(socket: Socket, user: User, setUser: Dispatch<SetStateAction<User>>) {
	socket.on("notification", message => {
		const type = message.data.type === "SUCCESS" ? "success" : "error"
		const newNotifications = [message.data, ...user.notification]

		const updateUser = {
			...user,
			notification: newNotifications.splice(0, 4),
		}

		toast[type]("Nowe powiadomienie", {
			description: message.data.title,
		})

		console.log(updateUser)

		setUser(prevUser => {
			const newNotifications = [message.data, ...prevUser.notification]
			return {
				...prevUser,
				notification: newNotifications.splice(0, 4),
			}
		})
	})

	return () => {
		socket.off("notification")
	}
}
