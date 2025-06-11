"use client"

import { ChevronDown, Hash } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Decoration } from "@/components/interfaces/builder/common"
import { useOnClickOutside } from "usehooks-ts"

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
			<div className="flex items-center gap-2 text-sm text-textColor">
				<Hash className="w-4 h-4" />
				<p>Styl kanałów</p>
			</div>
			<div className="relative mt-2 w-full">
				<button className="flex items-center justify-between bg-borderColor w-full border border-altBorderColor rounded-lg p-2 text-left text-sm hover:border-primaryColor" onClick={() => setViewChannelDecoration(!viewChannelDecoration)}>
					<span>{currentChannelDecoration}</span>
					<ChevronDown className={`w-4 h-4 transition-all ${viewChannelDecoration ? "rotate-180" : ""}`} />
				</button>
				{viewChannelDecoration && (
					<div className="absolute flex flex-col items-start bg-boxColor p-2  rounded-lg w-11/12 mt-2 border border-borderColor h-80  z-30 max-md:w-full" ref={elementRef}>
						<div className="w-full">
							<button onClick={() => setCurrentChannelDecoration("┆・📜・regulamin")} className={`${"┆・📜・regulamin" === currentChannelDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full text-left px-4`}>
								<pre className="my-2 text-sm">┆・📜・regulamin (domyślny)</pre>
								<p></p>
							</button>
							<button onClick={() => setCurrentChannelDecoration("inny")} className={`${"inny" === currentChannelDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full text-left px-4 mt-2`}>
								<pre className="my-2 text-sm">Inny</pre>
							</button>
						</div>
						<div className="flex items-center gap-2 w-full my-3">
							<div className="w-full h-[1px] bg-textColor opacity-20"></div>
							<p className="text-textColor opacity-20 uppercase text-nowrap text-sm">inne style</p>
							<div className="w-full h-[1px] bg-textColor opacity-20"></div>
						</div>

						<div className="scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor overflow-y-scroll w-full">
							{decorationChannel.map((el, index) => (
								<button onClick={() => setCurrentChannelDecoration(el.style)} key={index} className={`${el.style === currentChannelDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full truncate text-left px-4 my-0.5`}>
									<pre className="py-2 text-sm w-full scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor overflow-x-auto">{el.style}</pre>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
