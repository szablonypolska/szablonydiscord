"use client"

import verifyTemplates from "@/lib/templates/verifyTemplates"
import animateChangeSectionChat from "@/utils/animations/animateChangeSectionChat"
import { Button } from "@nextui-org/button"
import { Flag, Search, Loader2, CircleAlert } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import LackTicket from "../../ticketArea/lackTicket"

export default function ChatReportTemplate() {
	const [loader, setLoader] = useState<boolean>(false)
	const [text, setText] = useState<string>("")
	const [error, setError] = useState<string>("")
	const [disabled, setDisabled] = useState<boolean>(true)
	const animation = useRef<HTMLDivElement>(null)

	const verifyTemplatesLink = async () => {
		try {
			setLoader(true)
			const getData = await verifyTemplates(text)

			if (getData === 400) return setError("Link do szablonu nie dziala"), setLoader(false)

			console.log(getData)

			setError("")
			setLoader(false)
			setDisabled(false)
		} catch (err) {
			console.log(err)
			setError("Wystapil blad serwera, sprobuj pozniej")
			setLoader(false)
		}
	}

	useEffect(() => {
		if (!text) return setError("")

		if (text.includes(`${process.env.NEXT_PUBLIC_HOSTNAME}/templates`)) verifyTemplatesLink()
	}, [text])

	useEffect(() => {
		animateChangeSectionChat(animation.current)
	}, [])

	return (
		<div className="px-4 py-5 opacity-0 mt-1" ref={animation}>
			<div className="bg-altBackgroundColor border border-borderColor p-5 rounded-xl">
				<div className="flex items-center gap-3">
					<div className="bg-primaryColor p-3 rounded-xl w-fit opacity-80">
						<Flag className="" />
					</div>
					<div className="">
						<p className="font-medium text-sm">Zgłoś szablon</p>
						<span className="text-sm text-textColor">Wklej link do szablonu discord</span>
					</div>
				</div>
				<div className="relative mt-4">
					<input type="text" className={`bg-boxColor border ${error ? "border-errorColor focus:ring-errorColor" : "border-borderColor focus:ring-primaryColor"} w-full p-2.5 px-3 rounded-xl placeholder:text-sm pl-9 focus:outline-none focus:ring-1 disabled:opacity-80 `} disabled={!disabled} onChange={e => setText(e.target.value)} placeholder="Wklej link do szablonu" />
					<Search className="text-gray-500 absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4" />
					{loader && (
						<div className="absolute top-1/2 -translate-y-1/2 right-3 bg-boxColor mx-1">
							<Loader2 className=" w-6 h-6 text-primaryColor animate-spin " />
						</div>
					)}
				</div>
				<div className={`flex items-center gap-2 text-sm text-errorColor transition-all ${error ? "h-6" : "h-0"} overflow-hidden`}>
					<CircleAlert className="w-5 h-5" />
					<p>{error}</p>
				</div>
				<Button className="flex items-center justify-center w-full bg-primaryColor rounded-xl mt-3 disabled:opacity-50" disabled={disabled}>
					<Flag className="w-4 h-4" />
					<span className="text-sm">Zgłoś szablon</span>
				</Button>
			</div>
			<div className="flex justify-center mt-3">
				<button className="text-sm text-textColor text-center">Wróć do zgłoszenia</button>
			</div>
		</div>
	)
}
