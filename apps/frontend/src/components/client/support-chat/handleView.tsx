"use client"

import { useChatContext } from "@/context/ChatContext"
import HeaderSupportChat from "./headerSupportChat"
import { TypeView } from "@/components/interfaces/chat/common"
import CreateChat from "./ticketArea/createChat"
import ChatWindow from "./chatArea/chatWindow"
import LackTicket from "./ticketArea/lackTicket"
import LoadingTicket from "./loadTicket"

export default function HandleView() {
	const { currentView, chatId } = useChatContext()

	const Component = () => {
		switch (currentView) {
			case "MAIN":
				return <LoadingTicket />
			case "CREATE":
				return <CreateChat />
			case "CHAT":
				return <ChatWindow />
		}
	}

	return (
		<>
			<div className="bg-boxColor border border-borderColor w-96 fixed bottom-3 right-3  z-[100] rounded-xl">
				<HeaderSupportChat />
				<div className="">
					<Component />
				</div>
			</div>
		</>
	)
}
