"use client"

import { AlertCircle,  ArrowRight, ChevronDown, CircleCheck } from "lucide-react"
import { useDashboardContext } from "@/context/DashboardContext"
import { Builder, BuilderStageType, BuilderProcessStatus } from "@/components/interfaces/builder/common"
import clsx from "clsx"
import { format } from "date-fns/format"
import { pl } from "date-fns/locale"
import { AccountBuilderDetails } from "./AccountBuilderDetails"
import { useState } from "react"
import React from "react"

export function AccountBuilderTable() {
	const { user } = useDashboardContext()
	const [data, setData] = useState<Builder | null>(null)

	console.log(user)

	return (
		<div className="overflow-x-auto shadow-md sm:rounded-lg bg-box-color border border-border-color w-full flex-1  min-w-0 ">
			<div className="pb-5 border-b border-border-color  p-5">
				<p className="text-lg font-medium">Lista stworzonych buildów</p>
			</div>
			<table className="w-full  text-sm text-left mt-2 px-96 ">
				<thead className="text-xs  uppercase text-text-color">
					<tr>
						<th scope="col" className="px-2 py-3 text-left w-52 pl-5">
							Nazwa
						</th>
						<th scope="col" className="px-3 py-3">
							ID sesji
						</th>
						<th scope="col" className="px-3 py-3">
							Utworzony
						</th>
						<th scope="col" className="px-5 py-3">
							Status
						</th>
						<th scope="col" className="px-1 py-3 max-lg:hidden">
							Kanały
						</th>
						<th scope="col" className="px-1 py-3 max-lg:hidden">
							Role
						</th>
						<th scope="col" className="px-1 py-3 text-right pr-5">
							Akcje
						</th>
					</tr>
				</thead>
				<tbody>
					{user.builder.map((builder: Builder) => {
						const stage = builder.builderProcess?.stages.find(stage => stage.type === BuilderStageType.CHANNEL)
						const hasError = builder.builderProcess?.stages.some(stage => stage.status === BuilderProcessStatus.FAILED)
						const startedAT = builder.builderProcess?.startedAt ? new Date(builder.builderProcess.startedAt) : new Date()
						return (
							<React.Fragment key={builder.sessionId}>
								<tr className="odd:bg-box-color/50 even:bg-box-color-dashboard border-b border-border-color text-ellipsis cursor-pointer " onClick={() => (data && data.sessionId === builder.sessionId ? setData(null) : setData(builder))}>
									<th scope="row" className="flex items-center gap-2 py-4 font-medium    pl-5 ">
										<div className={clsx(" p-1 rounded-lg w-fit", hasError ? "bg-error-color/30" : "bg-primary-dark")}>{hasError ? <AlertCircle className="w-4.5 h-4.5 text-error-color" /> : <CircleCheck className="w-4.5 h-4.5 text-primary-color" />}</div>
										{builder.title || "Brak danych"}
									</th>
									<td className="px-3 py-4 text-gray-300 text-ellipsis ">{builder.sessionId}</td>
									<td className="px-3 py-4 text-gray-300">{format(startedAT, "dd.MM.yyyy", { locale: pl })}</td>
									<td className="px-3 py-4">
										<div className={clsx("flex items-center gap-2 px-2.5 py-1 rounded-full w-fit", hasError ? "bg-error-color/20 text-error-color" : "bg-primary-dark text-primary-color")}>
											{hasError ? <AlertCircle className="w-4 h-4 text-error-color" /> : <CircleCheck className="w-4 h-4 text-primary-color" />}
											<p className="font-semibold text-xs">{hasError ? "Przerwane" : "Zakończono"}</p>
										</div>
									</td>
									<td className="px-1 py-4 max-lg:hidden">
										<div className="bg-sidebar-color p-1 px-3 font-medium rounded-lg w-fit">
											<p>{stage?.channel?.channel.length || 0}</p>
										</div>
									</td>
									<td className="px-1 py-4 max-lg:hidden">
										<div className="bg-sidebar-color p-1 px-3 font-medium rounded-lg w-fit">
											<p>{stage?.role?.role.length || 0}</p>
										</div>
									</td>
									<td className="flex items-center justify-end gap-2 px-1 py-4 pr-5">
										<button>
											<ArrowRight className="w-5 h-5 text-text-color" />
										</button>
										<button>
											<ChevronDown className="w-5 h-5 text-text-color" />
										</button>
									</td>
								</tr>
								{data && data.sessionId === builder.sessionId && <AccountBuilderDetails builder={data} />}
							</React.Fragment>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
