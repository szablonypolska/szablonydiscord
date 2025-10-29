import { User } from "@/components/interfaces/common"
import { SetStateAction, Dispatch } from "react"
import { Socket } from "socket.io-client"

export default function handleApiKeyListener(socket: Socket, user: User, setUser: Dispatch<SetStateAction<User>>) {
	socket.on("apikey", message => {
		console.log("apikey event received:", message)
		if (user.userId === message.userId) {
			const updateUser = {
				...user,
				api: user.api.map(el =>
					el.apiKeyId === message.apiKeyId
						? {
								...el,
								reqCount: message.reqCount,
								successCount: message.successCount,
								errorCount: message.errorCount,
								lastUsed: message.lastUsed,
								monthlyCount: message.monthlyCount,
								dailyCount: message.dailyCount,
							}
						: el
				),
			}
			setUser(updateUser)
		}
	})

	return () => {
		socket.off("apikey")
	}
}
