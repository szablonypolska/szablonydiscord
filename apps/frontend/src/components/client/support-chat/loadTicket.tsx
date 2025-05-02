"use client"

import loadChats from "@/lib/chat/loadChats"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import LackTicket from "./ticketArea/lackTicket"
import { useChatContext } from "@/context/ChatContext"
import TicketList from "./ticketArea/ticketList"
import { Loader2 } from "lucide-react"

export default function LoadingTicket() {
	const { data: session } = useSession()
	const { chatList, setChatList } = useChatContext()
	const fetchedRef = useRef(false)
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		if (!session || fetchedRef.current || chatList.length > 0) return setLoader(false)
		fetchedRef.current = true

		loadChats(session.user.id)
			.then(res => {
				if (res.data.length > 0) {
					setChatList(res.data)
				}
			})
			.finally(() => setLoader(false))
	}, [session, setChatList, setLoader])

	if (loader) {
		return (
			<div className="flex items-center justify-center h-80">
				<Loader2 className="w-10 h-10 text-primaryColor animate-spin" />
			</div>
		)
	}

	return chatList.length === 0 ? <LackTicket /> : <TicketList />
}
