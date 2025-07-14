"use client"
import { Button } from "@nextui-org/button"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronDown, Grid, List } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type SortOption = "newest" | "popular" | "lack"

interface Props {
	count: number
	typeView: "grid" | "list"
	setTypeView: React.Dispatch<React.SetStateAction<"grid" | "list">>
}

export default function SearchTopBar({ count, typeView, setTypeView }: Props) {
	const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false)
	const [sortBy, setSortBy] = useState<SortOption>("newest")
	const searchParams = useSearchParams()
	const currentPage = searchParams.get("page") as string
	const page = parseInt(currentPage)

	useEffect(() => {
		if (searchParams.get("sort") === "popularity") return setSortBy("popular")
		if (searchParams.get("sort") === "createdAt") return setSortBy("newest")
		setSortBy("lack")
	}, [searchParams])

	console.log(searchParams.get("sort"))

	const sortOptions = [
		{
			id: "lack",
			label: "Brak",
			icon: ArrowUp,
			link: "/search",
		},
		{
			id: "newest",
			label: "Najnowsze",
			icon: ArrowDown,
			link: "/search?sort=createdAt&page=1",
		},
		{
			id: "popular",
			label: "Najpopularniejsze",
			icon: ArrowUp,
			link: "/search?sort=popularity&page=1",
		},
	]
	return (
		<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="flex items-center justify-between  p-3 px-6 rounded-xl w-full border border-border-color">
			<div className="flex items-center gap-3">
				<p className="text-dark-gray">
					Znaleziono <span className="text-white">{count * 6}</span> szablonów
				</p>
				{page >= 2 && (
					<p className="text-xs bg-border-color p-2 rounded-xl w-fit text-dark-gray">
						Wyświetlanie {(page - 1) * 6}-{page * 6} z {count * 6}
					</p>
				)}
			</div>
			<div className="flex gap-5 h-11 max-md:gap-2">
				<div className="relative h-full">
					<Button onPress={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center gap-2 bg-alt-background-color border border-border-color rounded-xl px-4 py-2 text-sm hover:border-primary-color transition-colors h-full">
						<ArrowUpDown size={16} />
						{sortOptions.find(opt => opt.id === sortBy)?.label}
						<ChevronDown size={14} className={`transition-transform duration-200 ${showSortDropdown ? "rotate-180" : ""}`} />
					</Button>
					{showSortDropdown && (
						<div className="absolute right-0 top-full mt-2 w-48 bg-alt-background-color border border-border-color rounded-xl overflow-hidden z-10">
							{sortOptions.map(option => (
								<Link href={option.link} key={option.id}>
									<button
										onClick={() => {
											setSortBy(option.id as SortOption)
											setShowSortDropdown(false)
										}}
										className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-border-color transition-colors">
										<option.icon size={14} />
										{option.label}
										{sortBy === option.id && <Check size={14} className="ml-auto text-primary-light" />}
									</button>
								</Link>
							))}
						</div>
					)}
				</div>
				<div className="flex items-center gap-1 border border-border-color rounded-xl px-1 py-1 bg-box-color h-full">
					<Button className={`h-9 p-2 px-2 rounded-xl text-dark-gray hover:text-white ${typeView === "grid" && "bg-border-color text-white"}`} onPress={() => setTypeView("grid")}>
						<Grid size={20} />
					</Button>
					<Button className={`h-9 p-2 px-2 rounded-xl text-dark-gray hover:text-white  ${typeView === "list" && "bg-border-color text-white"}`} onPress={() => setTypeView("list")}>
						<List size={20} />
					</Button>
				</div>
			</div>
		</motion.div>
	)
}
