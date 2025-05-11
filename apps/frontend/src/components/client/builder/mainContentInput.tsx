"use client"

import { Button } from "@nextui-org/button"
import { Bot } from "lucide-react"
import { useState } from "react"

export default function MainContentInput() {
	const [text, setText] = useState<string>("")

	return (
		<div className="mt-6 w-[45rem] max-md:w-11/12">
			<div className="bg-boxColor border border-borderColor rounded-lg w-full px-4 py-5">
				<textarea className="w-full h-32  resize-none bg-boxColor focus:outline-none rounded-lg placeholder:opacity-80" onChange={e => setText(e.target.value)} placeholder="Np. stwórz serwer dla społeczności graczy z kanałami do różnych gier, miejscem na ogłoszenia i rolami dla moderatorów..."></textarea>

				<div className="w-full h-[1px] bg-borderColor rounded-lg"></div>
				<div className="flex items-center justify-between mt-4">
					<div className="">
						<p className={` text-sm ${text.length > 500 ? "text-errorColor" : "text-textColor"}`}>{text.length}/500 znaków</p>
					</div>

					<Button className={`bg-primaryColor rounded-xl px-5 transition-all ${text.length ? "opacity-100" : "opacity-50"}`}>
						<Bot className="w-5 h-5" /> <span className="text-sm">Generuj szablon</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
