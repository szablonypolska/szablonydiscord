import { connectSocketBackend } from "@/lib/socket"
import { User } from "@/components/interfaces/common"
import { Dispatch, SetStateAction, useEffect } from "react"
import { toast } from "sonner"

interface Type {
	user: User
	setUser: Dispatch<SetStateAction<User>>
	setNumberPeopleOnline: Dispatch<SetStateAction<number>>
}

export default function useSocketListener({ user, setUser, setNumberPeopleOnline }: Type) {
	const socket = connectSocketBackend()

	useEffect(() => {
		socket.on("apikey", message => {
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
			socket.off("apiKey")
		}
	}, [])

	useEffect(() => {
		socket.on("notification", message => {
			if (message.data.userId === user.userId) {
				const type = message.data.type === "success" ? "success" : "error"
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
			}
		})

		return () => {
			socket.off("notification")
		}
	}, [])

	socket.on("online", message => {
		if (message.userId === user.userId) {
			const updateUser = {
				...user,
				status: true,
			}

			setUser(updateUser)
		}
		setNumberPeopleOnline(message.numberOnline)
	})

	socket.on("offline", message => {
		console.log(message)
		setNumberPeopleOnline(message.numberOnline)
	})

	useEffect(() => {
		socket.emit("online", { userId: user.userId })

		return () => {
			socket.emit("offline", { userId: user.userId })
			socket.disconnect()
		}
	}, [user.userId, socket])
}
