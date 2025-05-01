"use client"

import { useChatContext } from "@/context/ChatContext"
import { Button } from "@nextui-org/button"
import { Plus, MessagesSquare, Search } from "lucide-react"
import { TypeView } from "@/components/interfaces/chat/common"

export default function LackTicket() {
	const { setCurrentView } = useChatContext()

	return (
		<div className="flex flex-col items-center text-center p-4 py-5 h-80">
			<div className="flex items-center justify-center w-14 h-14 rounded-full bg-borderColor">
				<MessagesSquare className="text-primaryColor" />
			</div>
			<h2 className="text-lg mt-3 font-medium">Brak aktywnych zgłoszeń</h2>
			<p className="mt-1.5 text-xs text-textColor">Utwórz nowe zgłoszenie a my postaramy się pomóc jak najszybciej</p>
			<Button className="flex items-center gap-2 bg-primaryColor mt-5 w-full rounded-lg" onPress={() => setCurrentView(TypeView.CREATE)}>
				<Plus className="w-5 h-5" />
				<span className="text-sm">Nowe zgłoszenie</span>
			</Button>
			<div className="flex items-center justify-center w-full my-3">
				<div className="w-full h-[1px] bg-borderColor"></div>
				<p className="mx-3 text-textColor text-sm">Lub</p>
				<div className="w-full h-[1px] bg-borderColor"></div>
			</div>
			<Button className="flex items-center gap-2 bg-borderColor  w-full rounded-lg">
				<Search className="w-5 h-5" />
				<span className="text-sm">Sprawdź status zamówienia</span>
			</Button>
		</div>
	)
}
