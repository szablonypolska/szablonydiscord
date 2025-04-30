"use client"

import { Button } from "@nextui-org/button"
import { CircleAlert } from "lucide-react"
import { useEffect, useState } from "react"

export default function CreateChat() {
	const [text, setText] = useState({
		subject: "",
		description: "",
	})
	const [error, setError] = useState({
		subject: false,
		description: false,
	})

	const create = () => {
		if (text.subject === "") return setError(prev => ({ ...prev, subject: true }))
		if (text.description === "") return setError(prev => ({ ...prev, description: true }))
	}

	useEffect(() => {
		if (text.subject !== "") setError(prev => ({ ...prev, subject: false }))
		if (text.description !== "") setError(prev => ({ ...prev, description: false }))
	}, [text])

	return (
		<div className="p-4 py-5">
			<div className="flex flex-col">
				<label htmlFor="" className="text-textColor text-sm mb-2">
					Tytuł zgłoszenia
				</label>
				<input type="text" className={`bg-altBackgroundColor border ${error.subject ? "border-errorColor" : "border-borderColor"} w-full py-2 px-3 rounded-xl placeholder:text-sm focus:ring-1 focus:outline-none  focus:ring-primaryColor`} placeholder="Wpisz tytul" onChange={e => setText(prev => ({ ...prev, subject: e.target.value }))} />
				<div className={`flex items-center gap-2 text-errorColor mt-0.5 transition-all ${error.subject ? "h-3" : "h-0"} overflow-hidden`}>
					<CircleAlert className="w-3 h-3" />
					<p className="text-sm">Pole nie może być puste</p>
				</div>
			</div>
			<div className="flex flex-col mt-5">
				<label htmlFor="" className="text-textColor text-sm mb-2">
					Opis problemu
				</label>

				<textarea className={`bg-altBackgroundColor border ${error.description ? "border-errorColor" : "border-borderColor"} w-full py-2 px-3 rounded-xl placeholder:text-sm focus:ring-1 focus:outline-none  focus:ring-primaryColor h-32 resize-none `} placeholder="Opisz dokładnie swój problem" onChange={e => setText(prev => ({ ...prev, description: e.target.value }))}></textarea>
				<div className={`flex items-center gap-2 text-errorColor mt-0.5 transition-all ${error.description ? "h-3" : "h-0"} overflow-hidden`}>
					<CircleAlert className="w-3 h-3" />
					<p className="text-sm">Pole nie może być puste</p>
				</div>
			</div>
			<Button className="mt-6 bg-primaryColor font-medium rounded-lg w-full text-sm" onPress={create}>
				Utwórz zgłoszenie
			</Button>
		</div>
	)
}
