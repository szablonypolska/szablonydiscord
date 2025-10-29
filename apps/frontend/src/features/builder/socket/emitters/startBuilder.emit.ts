import { Socket } from "socket.io-client"

export default function handleStartBuilderEmitter(socket: Socket, id: string) {
	socket.emit("join_builder_session", { sessionId: id })

	return () => {
		socket.off("join_builder_session")
	}
}
