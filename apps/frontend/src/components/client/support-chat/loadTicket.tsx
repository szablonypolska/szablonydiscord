"use client"

import loadChats from "@/lib/chat/loadChats"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import LackTicket from "./ticketArea/lackTicket"
import { useChatContext } from "@/context/ChatContext"
import TicketList from "./ticketArea/ticketList"

export default function LoadingTicket() {
	const { data: session } = useSession()
	const { chatList, setChatList } = useChatContext()
	const fetchedRef = useRef(false)

	useEffect(() => {
		if (!session || fetchedRef.current || chatList.length > 0) return
		fetchedRef.current = true

		loadChats(session.user.id).then(res => {
			console.log(res)
			if (res.data.length > 0) {
				setChatList(res.data)
			}
		})
	}, [session, setChatList])

	return chatList.length === 0 ? <LackTicket /> : <TicketList />
}
