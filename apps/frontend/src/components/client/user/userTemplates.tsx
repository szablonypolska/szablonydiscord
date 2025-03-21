"use client"

import CardProfile from "./userCard"
import { cn, Pagination, PaginationItemType, PaginationItemRenderProps } from "@heroui/react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { User } from "../../interfaces/common"
import { useState } from "react"

interface Props {
	data: User
}

export default function TemplatesProfile({ data }: Props) {
	const [currentPage, setCurrentPage] = useState<number>(0)
	const pageLength = Math.ceil(data.template.length / 4)
	const startIndex = currentPage * 2
	const endIndex = startIndex + 4

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
		console.log(newPage)
	}

	const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage, className }: PaginationItemRenderProps) => {
		if (value === PaginationItemType.NEXT) {
			return (
				<button key={key} className={cn(className, "w-9 h-9 bg-boxColorDashboard border border-borderColor")} onClick={onNext}>
					<ArrowRight size="15" />
				</button>
			)
		}

		if (value === PaginationItemType.PREV) {
			return (
				<button key={key} className={cn(className, " w-9 h-9 bg-boxColorDashboard border border-borderColor")} onClick={onPrevious}>
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
			<button key={key} ref={ref} className={cn(className, "bg-boxColorDashboard border border-borderColor", isActive && "text-white bg-primaryColor ")} onClick={() => setPage(value)}>
				{value}
			</button>
		)
	}
	return (
		<>
			<div className="w-full bg-boxColor border border-borderColor pb-7 rounded-xl">
				<h2 className="text-xl p-7">Dodane szablony</h2>
				<div className="w-full h-[1px] bg-borderColor"></div>
				<div className="grid grid-cols-2 max-lg:grid-cols-1   gap-5 mt-6 w-full px-7">
					{data.template.slice(startIndex, endIndex).map((el, index) => (
						<CardProfile key={index} title={el.title} description={el.description as string} usageCount={el.usageCount} categories={el.categories} slugUrl={el.slugUrl} />
					))}
				</div>
				<Pagination
					disableCursorAnimation
					showControls
					isDisabled={pageLength == 1}
					className="flex justify-center mt-5 gap-2"
					initialPage={1}
					radius="full"
					renderItem={renderItem}
					total={pageLength}
					variant="light"
					onChange={handlePageChange}
				/>
			</div>
		</>
	)
}
