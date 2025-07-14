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
import MainContentErrorGenerate from "./mainContentErrorGenerate"
import { motion } from "framer-motion"

export default function MainContentInput({ decorationChannel, decorationCategory }: { decorationChannel: Decoration[]; decorationCategory: Decoration[] }) {
	const [text, setText] = useState<string>("")
	const [loader, setLoader] = useState<boolean>(false)
	const [settings, setSettings] = useState<boolean>(false)
	const [currentChannelDecoration, setCurrentChannelDecoration] = useState<string>("┆・📜・regulamin")
	const [currentCategoryDecoration, setCurrentCategoryDecoration] = useState<string>("━━≫INFORMACJE≪━━")
	const router = useRouter()
	const { data: session } = useSession()
	const [generateError, setGenerateError] = useState<boolean>(false)

	const createBuilder = async () => {
		if (!text) return
		try {
			setLoader(true)
			const data = await builderCreateTemplate(session?.user.id || "", text, currentChannelDecoration, currentCategoryDecoration)

			router.push(`/builder/${data.id}`)

			setLoader(false)
		} catch (err) {
			console.log(err)
			setGenerateError(true)
		}
	}

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6 w-180 max-md:w-11/12 relative z-20">
			<div className={`transition-all ${!generateError && "h-0"} overflow-hidden`}>
				<MainContentErrorGenerate />
			</div>
			{!generateError && (
				<div className="bg-box-color border border-border-color rounded-lg w-full px-4 py-5">
					<BorderTrail className="bg-alt-border-color" size={120} />
					<div className="flex items-center gap-3">
						<div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-primary-color shrink-0">
							<Bot />
							<div className="absolute -bottom-0 -right-1 bg-green-500 w-3 h-3 rounded-full outline-solid outline-black"></div>
						</div>
						<div className="">
							<h2 className="font-medium">AI Builder Assistant</h2>
							<p className="text-sm text-text-color">Opisz najdokładniej jak możesz serwer discord a ja go stworze!</p>
						</div>
					</div>
					<div className="w-full h-px bg-border-color rounded-xl my-5"></div>
					<div className="bg-alt-background-color border border-border-color p-3 rounded-xl group focus-within:border-alt-border-color  transition-all">
						<textarea className="w-full min-h-12 max-h-96 max-md:h-24 resize-none focus:outline-hidden rounded-lg placeholder:opacity-80  bg-alt-background-color placeholder:text-sm" onChange={e => setText(e.target.value)} placeholder="Np. stwórz serwer dla społeczności graczy z kanałami do różnych gier, miejscem na ogłoszenia i rolami dla moderatorów..."></textarea>

						<div className={`flex max-md:flex-col max-md:w-full items-center gap-5 bg-[#202020] w-full rounded-lg px-5 transition-all ${settings ? "h-24 max-md:h-44 p-3" : "h-0 overflow-hidden"} `}>
							<MainContentChooseChannel decorationChannel={decorationChannel} currentChannelDecoration={currentChannelDecoration} setCurrentChannelDecoration={setCurrentChannelDecoration} />
							<MainContentChooseCategory decorationCategory={decorationCategory} currentCategoryDecoration={currentCategoryDecoration} setCurrentCategoryDecoration={setCurrentCategoryDecoration} />
						</div>
						<div className="w-full h-px bg-border-color rounded-lg my-3"></div>
						<div className="flex items-center justify-between gap-3 max-md:justify-normal">
							<div className="max-md:hidden">
								<Button className="rounded-xl" onPress={() => setSettings(!settings)}>
									<Settings className="w-4 h-4 text-text-color" />
								</Button>
							</div>
							<div className="flex flex-col  gap-3 w-full md:hidden">
								<div className="flex items-center justify-between">
									<div className="">
										<Button className="rounded-xl" onPress={() => setSettings(!settings)}>
											<Settings className="w-4 h-4 text-text-color" />
										</Button>
									</div>
									<div className="">
										<p className={`text-sm ${text.length > 500 ? "text-error-color" : "text-text-color"}`}>{text.length}/3000 znaków</p>
									</div>
								</div>

								<Button className={`bg-primary-color rounded-xl px-5 transition-all disabled:opacity-80 ${text.length ? "opacity-100" : "opacity-50"}`} disabled={loader} onPress={createBuilder}>
									{!loader && (
										<>
											<Sparkles className="w-5 h-5" /> <span className="text-sm">Generuj szablon</span>
										</>
									)}
									{loader && <Loader2 className="animate-spin" />}
								</Button>
							</div>
							<div className="flex items-center gap-3 max-md:hidden">
								<div className="">
									<p className={`text-sm ${text.length > 500 ? "text-error-color" : "text-text-color"}`}>{text.length}/3000 znaków</p>
								</div>

								<Button className={`bg-primary-color rounded-xl px-5 transition-all disabled:opacity-80 ${text.length ? "opacity-100" : "opacity-50"}`} disabled={loader} onPress={createBuilder}>
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
			)}
		</motion.div>
	)
}
