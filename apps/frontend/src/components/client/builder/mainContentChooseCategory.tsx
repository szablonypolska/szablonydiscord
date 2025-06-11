"use client"

import { ChevronDown, Layers } from "lucide-react"
import { Decoration } from "@/components/interfaces/builder/common"
import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react"
import { useOnClickOutside } from "usehooks-ts"

interface Props {
	decorationCategory: Decoration[]
	currentCategoryDecoration: string
	setCurrentCategoryDecoration: Dispatch<SetStateAction<string>>
}

export default function MainContentChooseCategory({ decorationCategory, currentCategoryDecoration, setCurrentCategoryDecoration }: Props) {
	const [viewCategoryDecoration, setViewCategoryDecoration] = useState<boolean>(false)

	const elementRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		setViewCategoryDecoration(false)
	}, [currentCategoryDecoration])

	useEffect(() => {
		setViewCategoryDecoration(false)
	}, [currentCategoryDecoration])

	const handleClickOutside = () => {
		setViewCategoryDecoration(false)
	}

	useOnClickOutside(elementRef as React.RefObject<HTMLElement>, handleClickOutside)

	return (
		<div className="w-1/2 max-md:w-full">
			<div className="flex items-center gap-2 text-sm text-textColor">
				<Layers className="w-4 h-4" />
				<p>Styl kategorii</p>
			</div>
			<div className="relative mt-2 w-full">
				<button className="flex items-center justify-between bg-borderColor w-full border border-altBorderColor rounded-lg p-2 text-left text-sm hover:border-primaryColor" onClick={() => setViewCategoryDecoration(!viewCategoryDecoration)}>
					<span>{currentCategoryDecoration}</span>
					<ChevronDown className={`w-4 h-4 transition-all ${viewCategoryDecoration ? "rotate-180" : ""}`} />
				</button>
				{viewCategoryDecoration && (
					<div className="absolute flex flex-col items-start bg-boxColor p-2  rounded-lg w-11/12 mt-2 border border-borderColor h-80  z-50 max-md:w-full" ref={elementRef}>
						<div className="w-full">
							<button onClick={() => setCurrentCategoryDecoration("━━≫INFORMACJE≪━━")} className={`${"━━≫INFORMACJE≪━━" === currentCategoryDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full text-left px-4`}>
								<pre className="my-2 text-sm">━━≫INFORMACJE≪━━ (domyślny)</pre>
								<p></p>
							</button>
							<button onClick={() => setCurrentCategoryDecoration("inny")} className={`${"inny" === currentCategoryDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full text-left px-4 mt-2`}>
								<pre className="my-2 text-sm">Inny</pre>
							</button>
						</div>
						<div className="flex items-center gap-2 w-full my-3">
							<div className="w-full h-[1px] bg-textColor opacity-20"></div>
							<p className="text-textColor opacity-20 uppercase text-nowrap text-sm">inne style</p>
							<div className="w-full h-[1px] bg-textColor opacity-20"></div>
						</div>

						<div className="scrollbar scrollbar-thumb-altBorderColor scrollbar-track-borderColor overflow-y-scroll w-full">
							{decorationCategory.map((el, index) => (
								<button onClick={() => setCurrentCategoryDecoration(el.style)} key={index} className={`${el.style === currentCategoryDecoration && "bg-primaryColor w-full rounded-lg text-left px-2"} w-full truncate text-left px-4 my-0.5`}>
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
