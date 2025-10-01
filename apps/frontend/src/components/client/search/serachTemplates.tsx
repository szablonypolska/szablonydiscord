"use client"

import Cards from "../cards/card"
import { cn, Pagination, PaginationItemType, PaginationItemRenderProps } from "@heroui/react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Template } from "../../interfaces/templates/common"
import { useSearchParams, useRouter } from "next/navigation"
import SearchTopBar from "./searchTopBar"
import useWindowSize from "@/hooks/useWindowSize"
import SearchError from "./searchError"
import { motion } from "framer-motion"
import { useSettingsContext } from "@/context/SettingsContext"

interface Props {
	templates: {
		templates: Template[]
		count: number
		type?: string
	}
}

export default function SearchTemplate({ templates }: Props) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pageLength = Math.ceil(12 / 4)
	const currentPage = searchParams.get("page") ?? "1"
	const [typeView, setTypeView] = useState<"grid" | "list">("grid")
	const { width } = useWindowSize()
	const { settingsData } = useSettingsContext()

	useEffect(() => {
		if (width <= 768) setTypeView("list")
		if (width >= 768) setTypeView("grid")
	}, [width])

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString())

		params.set("page", `${newPage}`)

		router.push(`/search?${params.toString()}`)
	}

	const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage, className }: PaginationItemRenderProps) => {
		if (value === PaginationItemType.NEXT) {
			return (
				<button key={key} className={cn(className, "w-10 h-10 bg-box-color-dashboard border border-border-color rounded-lg cursor-pointer")} onClick={onNext}>
					<ArrowRight size="15" />
				</button>
			)
		}

		if (value === PaginationItemType.PREV) {
			return (
				<button key={key} className={cn(className, " w-10 h-10 bg-box-color-dashboard border border-border-color rounded-lg cursor-pointer")} onClick={onPrevious}>
					<ArrowLeft size="15" />
				</button>
			)
		}

		if (value === PaginationItemType.DOTS) {
			return (
				<button key={key} className={className}>
					...
				</button>
			)
		}
		return (
			<button key={key} ref={ref} className={cn(className, "bg-box-color-dashboard border border-border-color w-10 h-10 rounded-lg mx-0.5 cursor-pointer", isActive && " bg-primary-dark text-primary-light  ")} onClick={() => setPage(value)}>
				{value}
			</button>
		)
	}

	return (
		<div className="flex flex-col w-full">
			<SearchTopBar count={templates.count} typeView={typeView} setTypeView={setTypeView} />
			{!templates.count && <SearchError />}
			<div className="w-full">
				<div className={`grid ${typeView === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-5 mt-5 max-md:gap-2`}>
					{templates.templates &&
						templates.templates.map(el => (
							<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} key={el.templateId}>
								<Cards data={el} settingsData={settingsData} />
							</motion.div>
						))}
				</div>
				{templates.count > 0 && <Pagination key={currentPage} disableCursorAnimation showControls isDisabled={pageLength == 1} className="flex justify-center mt-5 gap-4" initialPage={parseInt(currentPage)} renderItem={renderItem} total={templates.count} variant="light" onChange={handlePageChange} />}
			</div>
		</div>
	)
}
