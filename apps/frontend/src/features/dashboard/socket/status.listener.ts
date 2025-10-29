import { User } from "@/components/interfaces/common"
import { SetStateAction, Dispatch } from "react"
import { Socket } from "socket.io-client"

export default function handleStatusListener(socket: Socket, user: User, setUser: Dispatch<SetStateAction<User>>, setNumberPeopleOnline: Dispatch<SetStateAction<number>>) {
	socket.on("online", message => {
		console.log(message)
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

	return () => {
		socket.off("online")
		socket.off("offline")
	}
}
