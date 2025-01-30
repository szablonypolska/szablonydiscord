"use client"

import Cards from "../card"
import { cn, Pagination, PaginationItemType, PaginationItemRenderProps } from "@heroui/react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Template } from "../../interfaces/common"
import { useSearchParams, useRouter } from "next/navigation"
import SearchTopBar from "./searchTopBar"
import useWindowSize from "@/hooks/useWindowSize"
import SearchError from "./searchError"

interface Props {
	templates: {
		templates: Template[]
		count: number
	}
}

export default function SearchTemplate({ templates }: Props) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pageLength = Math.ceil(12 / 4)
	const currentPage = searchParams.get("page") ?? "1"
	const [typeView, setTypeView] = useState<"grid" | "list">("grid")
	const { width } = useWindowSize()

	useEffect(() => {
		if (width <= 768) setTypeView("list")
		if (width >= 768) setTypeView("grid")
	}, [width])

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString())

		params.set("page", `${newPage}`)

		router.push(`/search?${params.toString()}`)
	}

	console.log(templates)

	const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage, className }: PaginationItemRenderProps) => {
		if (value === PaginationItemType.NEXT) {
			return (
				<button key={key} className={cn(className, "w-10 h-10 bg-boxColorDashboard border border-borderColor rounded-lg")} onClick={onNext}>
					<ArrowRight size="15" />
				</button>
			)
		}

		if (value === PaginationItemType.PREV) {
			return (
				<button key={key} className={cn(className, " w-10 h-10 bg-boxColorDashboard border border-borderColor rounded-lg")} onClick={onPrevious}>
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
			<button
				key={key}
				ref={ref}
				className={cn(className, "bg-boxColorDashboard border border-borderColor w-10 h-10 rounded-lg mx-0.5", isActive && " bg-primaryDark text-primaryLight  ")}
				onClick={() => setPage(value)}>
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
							<Cards title={el.title} description={el.description as string} usageCount={el.usageCount} categories={el.categories} templateId={el.templateId} key={el.templateId} />
						))}
				</div>
				{templates.count > 0 && (
					<Pagination
						key={currentPage}
						disableCursorAnimation
						showControls
						isDisabled={pageLength == 1}
						className="flex justify-center mt-5 gap-4"
						initialPage={parseInt(currentPage)}
						renderItem={renderItem}
						total={templates.count}
						variant="light"
						onChange={handlePageChange}
					/>
				)}
			</div>
		</div>
	)
}
