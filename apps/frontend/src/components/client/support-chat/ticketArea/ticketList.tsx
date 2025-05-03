"use client"

import { Chat, TypeView } from "@/components/interfaces/chat/common"
import { useChatContext } from "@/context/ChatContext"
import { Button } from "@nextui-org/button"
import { CircleAlert, Plus, Flag } from "lucide-react"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { useEffect, useRef } from "react"
import animateChangeSectionChat from "@/utils/animations/animateChangeSectionChat"

export default function TicketList() {
	const { chatList, setCurrentView, currentView, setChatId } = useChatContext()
	const animation = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (currentView === "MAIN") {
			animateChangeSectionChat(animation.current)
		}
	}, [currentView])
	return (
		<div className="opacity-0 mt-1" ref={animation}>
			<div className="flex flex-col gap-3 py-4 px-5">
				<Button className="flex justify-start bg-primaryColor w-full rounded-xl text-sm font-medium h-11" onPress={() => setCurrentView(TypeView.CREATE)}>
					<Plus className="w-5 h-5" /> <span>Nowe zgłoszenie</span>
				</Button>
				<Button className="flex justify-start bg-borderColor text-sm rounded-xl w-full h-11">
					<Flag className="w-5 h-5" /> <span>Zgłoś szablon</span>
				</Button>
			</div>
			<div className="w-full h-[1px] bg-borderColor my-2"></div>
			<div className="flex flex-col gap-4 py-4 px-5 max-h-36 scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor  overflow-y-auto">
				{chatList.reverse().map((el: Chat) => (
					<button className="border border-borderColor rounded-xl hover:border-primaryColor bg-altBackgroundColor  px-4 py-3" key={el.id} onClick={() => setChatId(el.id)}>
						<div className="flex items-start gap-3 w-full">
							<div className="w-3 h-3 bg-primaryColor rounded-full animate-pulse mt-1.5"></div>
							<div className="flex flex-col items-start text-left w-full">
								<div className="flex items-center justify-between w-full ">
									<p className="text-sm font-medium w-52 truncate">{el.subject}</p>
									<p className="text-xs text-textColor">{format(new Date(el.createdAt), "HH:mm", { locale: pl })}</p>
								</div>
								<span className="text-sm text-textColor max-w-[17rem]  truncate">{el.description}</span>
							</div>
						</div>
						<div className="w-full h-[1px] bg-borderColor my-2"></div>
						<div className="">
							<div className="bg-primaryDark px-2 py-0.5 rounded-full w-fit">
								<p className="text-primaryLight text-xs">Aktywny</p>
							</div>
						</div>
					</button>
				))}
			</div>
		</div>
	)
}
