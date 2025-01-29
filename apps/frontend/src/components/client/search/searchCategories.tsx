"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@nextui-org/button"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

interface Type {
	categories: string
	_count: {
		categories: number
	}
}

interface TypeProps {
	categories: Type[]
}

export default function SearchCategories({ categories }: TypeProps) {
	const [show, setShow] = useState<boolean>(false)
	const serachParams = useSearchParams()
	const category = serachParams.get("category")
	const showLength = show ? categories.length : 8
	const router = useRouter()

	const handleChange = (categories: string) => {
		const params = new URLSearchParams(serachParams.toString())

		params.set("category", categories)
		params.delete("page")
		params.delete("sort")
		params.delete("name")

		if (category === categories) {
			router.push(`/search`)
		} else {
			router.push(`/search?${params.toString()}&page=0`)
		}
	}

	return (
		<div className="w-80  bg-boxColor py-5 border border-borderColor rounded-xl flex-shrink-0 max-xl:w-72 max-lg:w-full">
			<p className="font-medium text-lg px-5">Kategorie</p>
			<div className="flex flex-col gap-2 px-5 mt-5">
				{categories.slice(0, showLength).map((el, index) => (
					<Button
						key={index}
						onPress={() => handleChange(el.categories)}
						className={`group flex items-center justify-between text-textColor my-0 py-0 px-3 rounded-xl hover:bg-borderColor w-full ${
							el.categories == category && "bg-primaryDark text-primaryLight hover:bg-primaryDark"
						}`}>
						<p className={`${el.categories == category && "bg-primaryDark text-primaryLight hover:bg-primaryDark"}`}>{el.categories}</p>
						<p className={`${el.categories == category && "bg-primaryDark text-primaryLight hover:bg-primaryDark"}`}>{el._count.categories}</p>
					</Button>
				))}
			</div>
			<div className="flex flex-col items-center gap-1 mt-10 text-darkGray">
				<button className="flex flex-col items-center gap-1" onClick={() => setShow(!show)}>
					<p className="text-sm">Pokaż {show ? "mniej" : "wszystkie"}</p>
					{show ? <ArrowUp size="20" /> : <ArrowDown size="20" />}
				</button>
			</div>
		</div>
	)
}
