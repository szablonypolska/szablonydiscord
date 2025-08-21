"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Tag } from "lucide-react"
import { useState } from "react"

export default function ShoppingCartDiscountCode() {
	const [isChecked, setIsChecked] = useState(false)

	return (
		<div className="">
			<div className={`flex items-center gap-3 ${isChecked ? "bg-darknes-primary-color/50 border-primary-color/30" : "bg-border-color border-alt-border-color"} border  p-3 rounded-lg w-full cursor-pointer`} onClick={() => setIsChecked(!isChecked)}>
				<Checkbox checked={isChecked} onChange={(): void => setIsChecked(!isChecked)}></Checkbox>
				<div className="flex items-center gap-2">
					<Tag className={`${isChecked ? "text-primary-color" : "text-text-color"} w-4 h-4`} />
					<p className="text-sm">Mam kod rabatowy</p>
				</div>
			</div>
			<div className={`${isChecked ? "h-11 mt-3 " : "h-0 overflow-hidden"} relative transition-all`}>
				<input type="text" className="border border-alt-border-color bg-border-color h-11 px-3 rounded-lg w-full placeholder:text-sm focus:ring ring-primary-color outline-0" placeholder="Wpisz kod rabatowy" />
				<button className="absolute top-1/2 -translate-y-1/2 right-2 bg-alt-border-color h-8 px-4 text-sm rounded-lg text-gray-100 opacity-50">Zastosuj</button>
			</div>
		</div>
	)
}
