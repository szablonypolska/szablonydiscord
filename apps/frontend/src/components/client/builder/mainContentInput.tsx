"use client"

import { Button } from "@nextui-org/button"
import { Bot, Sparkles } from "lucide-react"
import { useState } from "react"

export default function MainContentInput() {
	const [text, setText] = useState<string>("")

	return (
		<div className="mt-6 w-[45rem] max-md:w-11/12">
			<div className="bg-boxColor border border-borderColor rounded-lg w-full px-4 py-5">
				<div className="flex items-center gap-3">
					<div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primaryColor shrink-0">
						<Bot />
						<div className="absolute -bottom-0 -right-1 bg-green-500 w-3 h-3 rounded-full outline outline-black"></div>
					</div>
					<div className="">
						<h2 className="font-medium">AI Builder Assistant</h2>
						<p className="text-sm text-textColor">Opisz najdokładniej jak możesz serwer discord a ja go stworze!</p>
					</div>
				</div>
				<div className="w-full h-[1px] bg-borderColor rounded-xl my-5"></div>
				<div className="bg-altBackgroundColor border border-borderColor p-3 rounded-xl">
					<textarea className="w-full h-18  resize-none  focus:outline-none rounded-lg placeholder:opacity-80 bg-altBackgroundColor placeholder:text-sm" onChange={e => setText(e.target.value)} placeholder="Np. stwórz serwer dla społeczności graczy z kanałami do różnych gier, miejscem na ogłoszenia i rolami dla moderatorów..."></textarea>

					<div className="w-full h-[1px] bg-borderColor rounded-lg my-3"></div>
					<div className="flex items-center justify-end gap-3">
						<div className="">
							<p className={` text-sm ${text.length > 500 ? "text-errorColor" : "text-textColor"}`}>{text.length}/500 znaków</p>
						</div>

						<Button className={`bg-primaryColor rounded-xl px-5 transition-all ${text.length ? "opacity-100" : "opacity-50"}`}>
							<Sparkles className="w-5 h-5" /> <span className="text-sm">Generuj szablon</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
