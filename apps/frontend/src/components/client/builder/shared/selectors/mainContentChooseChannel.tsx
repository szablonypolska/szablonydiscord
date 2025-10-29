"use client"

import { ChevronDown, Hash } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Decoration } from "@/components/interfaces/builder/common"
import { useOnClickOutside } from "usehooks-ts"
import { AnimatePresence, motion } from "framer-motion"

interface Props {
	decorationChannel: Decoration[]
	currentChannelDecoration: string
	setCurrentChannelDecoration: Dispatch<SetStateAction<string>>
}

export default function MainContentChooseChannel({ decorationChannel, currentChannelDecoration, setCurrentChannelDecoration }: Props) {
	const [viewChannelDecoration, setViewChannelDecoration] = useState<boolean>(false)
	const elementRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		setViewChannelDecoration(false)
	}, [currentChannelDecoration])

	const handleClickOutside = () => {
		setViewChannelDecoration(false)
	}

	useOnClickOutside(elementRef as React.RefObject<HTMLElement>, handleClickOutside)

	return (
		<div className="w-1/2  max-md:w-full">
			<div className="flex items-center gap-2 text-sm text-text-color">
				<Hash className="w-4 h-4" />
				<p>Styl kanałów</p>
			</div>
			<div className="relative mt-2 w-full">
				<button className="flex items-center justify-between bg-border-color w-full border border-alt-border-color rounded-lg p-2 text-left text-sm hover:border-primary-color cursor-pointer" onClick={() => setViewChannelDecoration(!viewChannelDecoration)}>
					<span>{currentChannelDecoration}</span>
					<ChevronDown className={`w-4 h-4 transition-all ${viewChannelDecoration ? "rotate-180" : ""}`} />
				</button>
				{viewChannelDecoration && (
					<AnimatePresence>
						<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute flex flex-col items-start bg-box-color p-2  rounded-lg w-11/12 mt-2 border border-border-color h-80  z-30 max-md:w-full" ref={elementRef}>
							<div className="w-full">
								<button onClick={() => setCurrentChannelDecoration("┆・📜・regulamin")} className={`${"┆・📜・regulamin" === currentChannelDecoration && "bg-primary-color w-full rounded-lg text-left px-2"} w-full text-left px-4 cursor-pointer`}>
									<pre className="my-2 text-sm">┆・📜・regulamin (domyślny)</pre>
									<p></p>
								</button>
								<button onClick={() => setCurrentChannelDecoration("inny")} className={`${"inny" === currentChannelDecoration && "bg-primary-color w-full rounded-lg text-left px-2"} w-full text-left px-4 mt-2 cursor-pointer`}>
									<pre className="my-2 text-sm">Inny</pre>
								</button>
							</div>
							<div className="flex items-center gap-2 w-full my-3">
								<div className="w-full h-px bg-text-color opacity-20"></div>
								<p className="text-text-color opacity-20 uppercase text-nowrap text-sm">inne style</p>
								<div className="w-full h-px bg-text-color opacity-20"></div>
							</div>

							<div className="scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color overflow-y-scroll w-full">
								{decorationChannel.map((el, index) => (
									<button onClick={() => setCurrentChannelDecoration(el.style)} key={index} className={`${el.style === currentChannelDecoration && "bg-primary-color w-full rounded-lg text-left px-2"} w-full truncate text-left px-4 my-0.5`}>
										<pre className="py-2 text-sm w-full scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color overflow-x-auto cursor-pointer">{el.style}</pre>
									</button>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				)}
			</div>
		</div>
	)
}
