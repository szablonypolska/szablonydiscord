"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useChatContext } from "@/context/ChatContext"
import HeaderSupportChat from "./headerSupportChat"
import { TypeView } from "@/components/interfaces/chat/common"
import CreateChat from "./ticketArea/createChat"
import ChatWindow from "./chatArea/chatWindow"
import LoadingTicket from "./loadTicket"
import { MessageSquare } from "lucide-react"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import ChatReportTemplate from "./chatArea/reportTemplate/chatReportTemplate"

export default function HandleView() {
	const { currentView, chatId } = useChatContext()
	const entryAnimation = useRef<HTMLDivElement>(null)

	useEffect(() => {
		gsap.to(entryAnimation.current, {
			opacity: 1,
			duration: 0.5,
			x: -10,
		})
	}, [])

	const Component = () => {
		switch (currentView) {
			case "MAIN":
				return <LoadingTicket />
			case "CREATE":
				return <CreateChat />
			case "CHAT":
				return <ChatWindow />
			case "REPORT":
				return <ChatReportTemplate />
		}
	}

	return (
		<>
			<div className="p-4 bg-primary-color  rounded-full fixed bottom-5 right-1  z-100 opacity-0" ref={entryAnimation}>
				<MessageSquare className="w-6 h-6" />
			</div>

			{/* <div className="bg-box-color border border-border-color w-100 fixed bottom-3 right-3  z-100 rounded-xl">
				<HeaderSupportChat />
				<div className="">
					<Component />
				</div>
			</div> */}
		</>
	)
}
