"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@nextui-org/button"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

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
			router.push(`/search?${params.toString()}&page=1`)
		}
	}

	return (
		<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 0.3}} className="w-80  bg-box-color py-5 border border-border-color rounded-xl shrink-0 max-xl:w-72 max-lg:w-full">
			<p className="font-medium text-lg px-5">Kategorie</p>
			<div className="flex flex-col gap-2 px-5 mt-5">
				{categories.slice(0, showLength).map((el, index) => (
					<Button key={index} onPress={() => handleChange(el.categories)} className={`group flex items-center justify-between text-text-color my-0 py-0 px-3 rounded-xl hover:bg-border-color w-full cursor-pointer ${el.categories == category && "bg-primary-dark text-primary-light hover:bg-primary-dark"}`}>
						<p className={`${el.categories == category && "bg-primary-dark text-primary-light hover:bg-primary-dark"}`}>{el.categories}</p>
						<p className={`${el.categories == category && "bg-primary-dark text-primary-light hover:bg-primary-dark"}`}>{el._count.categories}</p>
					</Button>
				))}
			</div>
			<div className="flex flex-col items-center gap-1 mt-10 text-dark-gray">
				<button className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setShow(!show)}>
					<p className="text-sm">Pokaż {show ? "mniej" : "wszystkie"}</p>
					{show ? <ArrowUp size="20" /> : <ArrowDown size="20" />}
				</button>
			</div>
		</motion.div>
	)
}
