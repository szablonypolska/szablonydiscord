"use client"

import { useChatContext } from "@/context/ChatContext"
import { Button } from "@nextui-org/button"
import { Send } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { TypePerrmision } from "@/components/interfaces/chat/common"
import { connectSocketBackend } from "@/lib/socket"

export default function ChatCreateMessage() {
	const { data: session } = useSession()
	const [text, setText] = useState<string>("")
	const { setMessage, chatId } = useChatContext()
	const socket = connectSocketBackend()

	const send = () => {
		if (!text) return

		const message = {
			tempId: crypto.randomUUID(),
			type: TypePerrmision.USER,
			content: text,
			author: session?.user.name || "",
			createdAt: new Date(),
			authorId: session?.user.id || "",
			chatId: chatId,
			payload: true,
			send: false,
		}

		socket.emit("message:create", {
			...message,
		})

		setMessage(prev => [...prev, message])
	}

	return (
		<div className="flex items-center gap-2 p-4 py-5">
			<input type="text" className="bg-alt-background-color border border-border-color w-full py-2 px-3 rounded-xl placeholder:text-sm focus:ring-1 focus:outline-hidden  focus:ring-primary-color" onChange={e => setText(e.target.value)} placeholder="Wpisz coś..." />
			<Button className="bg-primary-color px-3 py-1 rounded-lg" onPress={send}>
				<Send />
			</Button>
		</div>
	)
}
