"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
import { Builder } from "@/components/interfaces/builder/common"
import { useState } from "react"
import React from "react"
import { cn, Pagination, PaginationItemType, PaginationItemRenderProps } from "@heroui/react"
import { AccountBuilderTableEmptyState } from "./AcountBuilderTableEmptyState"
import { AccountBuilderTableBox } from "./AccountBuilderTableBox"

export function AccountBuilderTable({ builder }: { builder?: Builder[] }) {
	const [currentPage, setCurrentPage] = useState<number>(0)
	console.log(currentPage)
	const pageLength = Math.ceil((builder?.length || 0) / 4)
	// const startIndex = currentPage * 2
	// const endIndex = startIndex + 4

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
		console.log(newPage)
	}

	const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage, className }: PaginationItemRenderProps) => {
		if (value === PaginationItemType.NEXT) {
			return (
				<button key={key} className={cn(className, "w-9 h-9 bg-box-color-dashboard border border-border-color rounded-lg")} onClick={onNext}>
					<ArrowRight size="15" />
				</button>
			)
		}

		if (value === PaginationItemType.PREV) {
			return (
				<button key={key} className={cn(className, " w-9 h-9 bg-box-color-dashboard border border-border-color rounded-lg")} onClick={onPrevious}>
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
			<button key={key} ref={ref} className={cn(className, "bg-box-color-dashboard border border-border-color w-8", isActive && "text-white bg-primary-color rounded-lg")} onClick={() => setPage(value)}>
				{value}
			</button>
		)
	}

	return (
		<div className="flex flex-col flex-1 max-2xl:w-full">
			<div className="shadow-md sm:rounded-lg bg-box-color border border-border-color  ">
				<div className="pb-5 border-b border-border-color p-5">
					<p className="text-lg font-medium">Lista stworzonych buildów</p>
				</div>

				<div className="grid grid-cols-8 text-xs uppercase text-text-color px-5 py-3 border-b border-border-color max-md:hidden">
					<div className="text-left col-span-2">Nazwa</div>
					<div className="px-2">ID sesji</div>
					<div className="px-2">Utworzony</div>
					<div className="px-2">Status</div>
					<div className="max-lg:hidden px-6">Kanały</div>
					<div className="max-lg:hidden px-2">Role</div>
					<div className="text-right">Akcje</div>
				</div>

				<div className="flex flex-col">
					{builder?.length === 0 && <AccountBuilderTableEmptyState />}
					{builder?.map((builder: Builder) => {
						return <AccountBuilderTableBox key={builder.sessionId} builder={builder} />
					})}
				</div>
			</div>
			<Pagination disableCursorAnimation showControls isDisabled={pageLength == 1} className="flex justify-end mt-5 gap-1 z-10 " initialPage={1} radius="sm" renderItem={renderItem} total={pageLength} variant="light" onChange={handlePageChange} />
		</div>
	)
}
