"use client"

import { TypeView } from "@/components/interfaces/chat/common"
import { useChatContext } from "@/context/ChatContext"
import createChatApi from "@/lib/chat/createChat"
import animateChangeSectionChat from "@/utils/animations/animateChangeSectionChat"
import { Button } from "@nextui-org/button"
import gsap from "gsap"
import { CircleAlert, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

export default function CreateChat() {
	const animation = useRef<HTMLDivElement>(null)
	const { currentView, setChatId } = useChatContext()
	const { data: session } = useSession()
	const [loader, setLoader] = useState<boolean>(false)

	const [text, setText] = useState({
		subject: "",
		description: "",
	})
	const [error, setError] = useState({
		subject: "",
		description: "",
	})

	const create = async () => {
		if (loader) return
		if (!text.subject) return setError(prev => ({ ...prev, subject: "Pole nie może być puste" }))
		if (text.subject.length < 8 || text.subject.length >= 100) return setError(prev => ({ ...prev, subject: "Tytuł musi miec między 8 a 100 znaków" }))
		if (!text.description) return setError(prev => ({ ...prev, description: "Pole nie może być puste" }))
		if (text.description.length < 30 || text.description.length >= 300) return setError(prev => ({ ...prev, description: "Opis musi miec między 30 a 300 znaków" }))
		setLoader(true)

		const data = await createChatApi(text.subject, text.description, session?.user.id || "")

		setChatId(data.chatId)
		setLoader(false)
	}

	useEffect(() => {
		if (text.subject !== "") setError(prev => ({ ...prev, subject: "" }))
		if (text.description !== "") setError(prev => ({ ...prev, description: "" }))
	}, [text])

	useEffect(() => {
		if (currentView === "CREATE") {
			animateChangeSectionChat(animation.current)
		}
	}, [currentView])

	return (
		<div className="p-4 py-5 opacity-0 mt-1" ref={animation}>
			<div className="flex flex-col">
				<label htmlFor="" className="text-textColor text-sm mb-2">
					Tytuł zgłoszenia
				</label>
				<input type="text" className={`bg-altBackgroundColor border ${error.subject ? "border-errorColor" : "border-borderColor"} w-full py-2 px-3 rounded-xl placeholder:text-sm focus:ring-1 focus:outline-none  focus:ring-primaryColor`} placeholder="Wpisz tytul" onChange={e => setText(prev => ({ ...prev, subject: e.target.value }))} />

				<div className={`flex items-center gap-2 text-errorColor mt-0.5 transition-all ${error.subject ? "h-4" : "h-0"} overflow-hidden`}>
					<CircleAlert className="w-3 h-3" />
					<p className="text-sm">{error.subject}</p>
				</div>
			</div>
			<div className="flex flex-col mt-5">
				<label htmlFor="" className="text-textColor text-sm mb-2">
					Opis problemu
				</label>
				<textarea className={`bg-altBackgroundColor border ${error.description ? "border-errorColor" : "border-borderColor"} w-full py-2 px-3 rounded-xl placeholder:text-sm focus:ring-1 focus:outline-none  focus:ring-primaryColor h-32 resize-none `} placeholder="Opisz dokładnie swój problem" onChange={e => setText(prev => ({ ...prev, description: e.target.value }))}></textarea>

				<div className={`flex items-center gap-2 text-errorColor mt-0.5 transition-all ${error.description ? "h-4" : "h-0"} overflow-hidden`}>
					<CircleAlert className="w-3 h-3" />
					<p className="text-sm">{error.description}</p>
				</div>
			</div>
			<Button className="mt-6 bg-primaryColor font-medium rounded-lg w-full text-sm disabled:opacity-70 disabled:cursor-not-allowed" disabled={loader} onPress={create}>
				{loader ? <Loader2 className="animate-spin" /> : <span>Utwórz zgłoszenie</span>}
			</Button>
		</div>
	)
}
