"use client"

import { ChevronDown, Layers } from "lucide-react"
import { Decoration } from "@/components/interfaces/builder/common"
import { useEffect, useState } from "react"

export default function MainContentChooseCategory({ decorationCategory }: { decorationCategory: Decoration[] }) {
	const [currentChannelDecoration, setCurrentChannelDecoration] = useState<string>("━━≫INFORMACJE≪━━")
	const [viewChannelDecoration, setViewChannelDecoration] = useState<boolean>(false)

	useEffect(() => {
		setViewChannelDecoration(false)
	}, [currentChannelDecoration])

	return (
		<div className="w-1/2">
			<div className="flex items-center gap-2 text-sm text-textColor">
				<Layers className="w-4 h-4" />
				<p>Styl kategorii</p>
			</div>
			<div className="relative mt-2 w-full">
				<button className="flex items-center justify-between bg-borderColor w-full border border-altBorderColor rounded-lg p-2 text-left text-sm hover:border-primaryColor" onClick={() => setViewChannelDecoration(!viewChannelDecoration)}>
					<span>{currentChannelDecoration}</span>
					<ChevronDown className={`w-5 h-5 transition-all ${viewChannelDecoration ? "rotate-180" : ""}`} />
				</button>
				{viewChannelDecoration && (
					<div className="absolute flex flex-col items-start bg-boxColor p-2  rounded-lg w-11/12 mt-2 border border-borderColor h-80 z-20">
						<div className="w-full">
							<button onClick={() => setCurrentChannelDecoration("━━≫INFORMACJE≪━━")} className={`${"━━≫INFORMACJE≪━━" === currentChannelDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full text-left px-4`}>
								<pre className="my-2 text-sm">━━≫INFORMACJE≪━━ (domyślny)</pre>
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

						<div className="scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor overflow-y-scroll">
							{decorationCategory.map((el, index) => (
								<button onClick={() => setCurrentChannelDecoration(el.style)} key={index} className={`${el.style === currentChannelDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full text-left px-4 my-0.5`}>
									<pre className="py-2 text-sm w-full">{el.style}</pre>
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
