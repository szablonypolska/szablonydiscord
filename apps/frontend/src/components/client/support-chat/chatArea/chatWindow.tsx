"use client"

import { useChatContext } from "@/context/ChatContext"

import { useLayoutEffect, useRef } from "react"
import ChatCreateMessage from "./chatCreateMessage"
import { Loader2, CheckCheck } from "lucide-react"

export default function ChatWindow() {
	const { message } = useChatContext()
	const containerRef = useRef<HTMLDivElement>(null)
	const bottomRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "auto" })
	}, [message])

	console.log(message)

	return (
		<div className="flex flex-col h-[26rem] w-full">
			<div ref={containerRef} className=" flex-grow p-4 py-5 overflow-y-scroll scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor">
				{message.map(el => (
					<div key={el.id ?? el.tempId}>
						{el.type === "ADMIN" && (
							<div className="flex flex-col bg-borderColor p-3 max-w-[80%] rounded-bl-none rounded-xl mb-3">
								<p className="text-[0.75rem]">{el.content}</p>
								<span className="text-[0.60rem] text-textColor text-right">22:37</span>
							</div>
						)}
						{el.type === "USER" && (
							<div className="flex flex-col items-end w-full my-3">
								<div className="flex flex-col bg-primaryColor opacity-90 p-3 max-w-[80%] rounded-br-none rounded-xl">
									<p className="text-[0.75rem]">{el.content}</p>
									<div className="flex items-center justify-end gap-1 mt-1">
										<span className="text-[0.60rem] text-gray-200 text-right">22:37</span>
										{el.tempId ? <Loader2 className="w-2.5 h-2.5 text-gray-200 animate-spin" /> : <CheckCheck className="w-3 h-3 text-gray-200" />}
									</div>
								</div>
							</div>
						)}
						{el.type === "SYSTEM" && (
							<div className="flex items-center w-full my-3">
								<div className="flex items-center gap-2 bg-boxColor px-3 py-1 rounded-full">
									<p className="text-xs text-textColor">{el.content}</p>
								</div>
							</div>
						)}
					</div>
				))}
				{/* Element kotwica */}
				<div ref={bottomRef} />
			</div>

			<div className="w-full h-[1px] bg-borderColor" />
			<ChatCreateMessage />
		</div>
	)
}
