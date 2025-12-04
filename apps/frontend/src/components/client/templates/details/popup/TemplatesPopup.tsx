"use client"

import { Button } from "@nextui-org/button"
import { AnimatePresence, motion } from "framer-motion"
import { Copy, Server, Share2, Sparkles, X, Edit } from "lucide-react"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface Props {
	popup: boolean
	setPopup: Dispatch<SetStateAction<boolean>>
	templateInfo: {
		link: string
		id: string
		code?: string
		slugUrl: string
	}
}

export default function TemplatesPopupUse({ popup, setPopup, templateInfo }: Props) {
	return (
		<>
			<AnimatePresence>{popup && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 bg-opacity-80 z-100" onClick={() => setPopup(false)} />}</AnimatePresence>

			<AnimatePresence>
				{popup && (
					<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.2 }} className="fixed top-1/2 left-1/2 z-150 w-120 max-md:w-11/12  bg-alt-background-color p-8 max-md:p-2 rounded-xl border border-border-color  transform -translate-x-1/2 -translate-y-1/2">
						<div className="absolute top-4 right-4">
							<button onClick={() => setPopup(false)} aria-label="Zamknij popup" className="cursor-pointer">
								<X />
							</button>
						</div>

						<div className="mb-6">
							<p className="text-xl font-medium mb-1">Użyj szablonu</p>
							<span className="text-sm text-text-color">Wybierz sposób użycia tego szablonu</span>
						</div>

						<div className="flex flex-col gap-4">
							<Link href={templateInfo.link} className="w-full h-18">
								<Button className="w-full h-full px-0 rounded-xl cursor-pointer">
									<div className="flex items-center gap-3 w-full p-4 bg-border-color rounded-xl">
										<div className="bg-alt-border-color p-2.5 rounded-lg">
											<Server />
										</div>
										<div className="text-left">
											<p className="font-medium text-sm">Utwórz na nowym serwerze</p>
											<span className="text-xs text-text-color">Stwórz nowy serwer używając tego szablonu</span>
										</div>
									</div>
								</Button>
							</Link>

							<Link href={templateInfo.code ? `/builder/edit/${templateInfo.slugUrl}` : ""} className={`${!templateInfo.code && "opacity-50 cursor-not-allowed"} w-full h-18 px-0 rounded-xl relative overflow-visible `}>
								<div className="flex items-center gap-3 w-full p-4 bg-border-color  rounded-xl">
									<div className="bg-alt-border-color p-2.5 rounded-lg">
										<Edit />
									</div>
									<div className="text-left">
										<p className="font-medium text-sm">Edytuj szablon discord</p>
										<span className="text-xs text-text-color">Edytuj za pomocą naszego bota!</span>
									</div>
								</div>
								<div className="absolute -top-2 right-3 flex items-center gap-1 px-3 py-1 bg-primary-color rounded-full">
									<Sparkles className="w-3 h-3" />
									<p className="uppercase text-xs">Nowość</p>
								</div>
							</Link>
						</div>

						<div className="my-6 h-px bg-border-color" />

						<div>
							<div className="flex items-center gap-2 mb-2">
								<Share2 className="w-4 h-4" />
								<p className="text-sm font-medium">Link do udostępnienia</p>
							</div>
							<div className="flex items-center w-full h-10 bg-border-color border border-alt-border-color rounded-lg opacity-80">
								<div className="w-[calc(100%-2.5rem)] px-3">
									<p className="text-text-color truncate ">{templateInfo.link}</p>
								</div>
								<div className="w-px h-full bg-alt-border-color" />
								<button className="px-3 cursor-pointer w-10" onClick={() => navigator.clipboard.writeText(templateInfo.link)}>
									<Copy className="w-4 h-4" />
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
