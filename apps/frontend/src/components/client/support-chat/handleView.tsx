"use client"

import { useChatContext } from "@/context/ChatContext"
import HeaderSupportChat from "./headerSupportChat"
import { TypeView } from "@/components/interfaces/chat/common"
import CreateChat from "./ticketArea/createChat"
import ChatWindow from "./chatArea/chatWindow"
import LackTicket from "./ticketArea/lackTicket"
import LoadingTicket from "./loadTicket"
import { MessageSquare } from "lucide-react"

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
			<div className="p-4 bg-primaryColor w-fit rounded-full fixed bottom-5 right-5  z-[100]">
				<MessageSquare className="w-6 h-6" />
			</div>

			{/* <div className="bg-boxColor border border-borderColor w-[25rem] fixed bottom-3 right-3  z-[100] rounded-xl">
				<HeaderSupportChat />
				<div className="">
					<Component />
				</div>
			</div> */}
		</>
	)
}
