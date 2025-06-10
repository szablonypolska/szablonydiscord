"use client"

import { BorderTrail } from "@/components/ui/border-trail"
import builderCreateTemplate from "@/lib/builder/createTemplate"
import { Button } from "@nextui-org/button"
import { Bot, Loader2, Settings, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Decoration } from "@/components/interfaces/builder/common"
import MainContentChooseChannel from "./mainContentChooseChannel"
import MainContentChooseCategory from "./mainContentChooseCategory"

export default function MainContentInput({ decorationChannel, decorationCategory }: { decorationChannel: Decoration[]; decorationCategory: Decoration[] }) {
	const [text, setText] = useState<string>("")
	const [loader, setLoader] = useState<boolean>(false)
	const [settings, setSettings] = useState<boolean>(false)
	const router = useRouter()
	const { data: session } = useSession()

	const createBuilder = async () => {
		if (!text) return
		try {
			setLoader(true)
			const data = await builderCreateTemplate(session?.user.id || "", text)

			router.push(`/builder/${data.id}`)

			setLoader(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="mt-6 w-[45rem] max-md:w-11/12 relative">
			<div className="bg-boxColor border border-borderColor rounded-lg w-full px-4 py-5">
				<BorderTrail className="bg-altBorderColor" size={120} />
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
				<div className="bg-altBackgroundColor border border-borderColor p-3 rounded-xl group focus-within:border-altBorderColor  transition-all">
					<textarea className="w-full h-16 resize-none focus:outline-none rounded-lg placeholder:opacity-80  bg-altBackgroundColor placeholder:text-sm" onChange={e => setText(e.target.value)} placeholder="Np. stwórz serwer dla społeczności graczy z kanałami do różnych gier, miejscem na ogłoszenia i rolami dla moderatorów..."></textarea>

					<div className={`flex items-center gap-5 bg-[#202020] w-full rounded-lg px-5 transition-all ${settings ? "h-24 p-3" : "h-0 overflow-hidden"} `}>
						<MainContentChooseChannel decorationChannel={decorationChannel} />
						<MainContentChooseCategory decorationCategory={decorationCategory} />
					</div>
					<div className="w-full h-[1px] bg-borderColor rounded-lg my-3"></div>
					<div className="flex items-center justify-between gap-3">
						<div className="">
							<Button className="rounded-xl" onPress={() => setSettings(!settings)}>
								<Settings className="w-5 h-5 text-textColor" />
							</Button>
						</div>
						<div className="flex items-center gap-3">
							<div className="">
								<p className={`text-sm ${text.length > 500 ? "text-errorColor" : "text-textColor"}`}>{text.length}/500 znaków</p>
							</div>

							<Button className={`bg-primaryColor rounded-xl px-5 transition-all disabled:opacity-80 ${text.length ? "opacity-100" : "opacity-50"}`} disabled={loader} onPress={createBuilder}>
								{!loader && (
									<>
										<Sparkles className="w-5 h-5" /> <span className="text-sm">Generuj szablon</span>
									</>
								)}
								{loader && <Loader2 className="animate-spin" />}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
