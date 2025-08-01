"use client"

import suggestTemplate from "@/lib/search/suggestTemplate"
import { ChevronRight, Users } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useOnClickOutside, useDebounceValue } from "usehooks-ts"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SearchSuggest({ title, hasUserEdit }: { title: string; hasUserEdit: boolean }) {
	const [suggestions, setSuggestions] = useState<{ title: string; usageCount: number; category: string; slugUrl: string }[]>([])
	const [debouncedTitle] = useDebounceValue(title, 300)
	const elementRef = useRef<HTMLDivElement>(null)
	const searchParams = useSearchParams()
	const nameParams = searchParams.get("name") || ""

	const handleSuggest = useCallback(async () => {
		const data = await suggestTemplate(title)
		setSuggestions(data.suggestions)
	}, [title])

	useEffect(() => {
		if (nameParams) setSuggestions([])
	}, [nameParams, setSuggestions])

	useEffect(() => {
		if (!title) setSuggestions([])
	}, [title, setSuggestions])

	useEffect(() => {
		if (debouncedTitle.length >= 2 && hasUserEdit) {
			handleSuggest()
		}
	}, [debouncedTitle, hasUserEdit, handleSuggest])

	const handleClickOutside = () => {
		setSuggestions([])
	}

	useOnClickOutside(elementRef as React.RefObject<HTMLElement>, handleClickOutside)

	return (
		<>
			{suggestions.length > 0 && (
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute mt-2  w-full bg-alt-background-color p-2 border border-border-color rounded-xl z-50" ref={elementRef}>
					<div className="max-h-72 scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color  overflow-y-auto">
						{suggestions.map(el => (
							<Link href={`/templates/${el.slugUrl}`} key={el.slugUrl}>
								<div className="flex justify-between hover:bg-border-color/20 p-2 rounded-lg cursor-pointer">
									<div className="">
										<p className="text-sm">{el.title}</p>
										<div className="bg-box-color px-3 py-0.5 rounded-full w-fit mt-0.5">
											<p className="text-text-color text-xs">{el.category}</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<div className="flex items-center gap-2 bg-box-color px-2 py-0.5 rounded-lg w-fit">
											<Users className="w-3 h-3 text-text-color" />
											<p className="text-xs text-text-color">{el.usageCount}</p>
										</div>
										<ChevronRight className="text-text-color w-4 h-4" />
									</div>
								</div>
							</Link>
						))}
					</div>
				</motion.div>
			)}
		</>
	)
}
