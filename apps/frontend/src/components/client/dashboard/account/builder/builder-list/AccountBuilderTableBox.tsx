import clsx from "clsx"
import { CircleCheck, ArrowRight, ChevronDown, AlertCircle, MessageSquare, Shield, Clock } from "lucide-react"
import { Builder, BuilderStage, BuilderProcessStatus, BuilderStageType } from "@/components/interfaces/builder/common"
import { format } from "date-fns/format"
import { pl } from "date-fns/locale"
import { AccountBuilderDetails } from "../builder-list/AccountBuilderDetails"
import { useState } from "react"

interface Props {
	builder: Builder
}

export function AccountBuilderTableBox({ builder }: Props) {
	const [data, setData] = useState<Builder | null>(null)
	const channelStage: BuilderStage | undefined = builder.builderProcess?.stages.find(stage => stage.type === BuilderStageType.CHANNEL)
	const roleStage: BuilderStage | undefined = builder.builderProcess?.stages.find(stage => stage.type === BuilderStageType.ROLES)
	const hasError = builder.builderProcess?.stages.some(stage => stage.status === BuilderProcessStatus.FAILED)
	const startedAt = builder.builderProcess?.startedAt ? new Date(builder.builderProcess.startedAt) : new Date()
	const isOpen = data?.sessionId === builder.sessionId

	return (
		<div className="w-full">
			<div className={clsx("grid grid-cols-8  text-sm px-5 py-4 cursor-pointer max-md:hidden  ", "odd:bg-box-color/50 even:bg-box-color-dashboard")} onClick={() => (isOpen ? setData(null) : setData(builder))}>
				<div className="flex items-center gap-2 font-medium col-span-2   ">
					<div className={clsx("p-1 rounded-lg w-fit", hasError ? "bg-error-color/30" : "bg-primary-dark")}>{hasError ? <AlertCircle className="w-4.5 h-4.5 text-error-color" /> : <CircleCheck className="w-4.5 h-4.5 text-primary-color" />}</div>
					<span className="truncate">{builder.title || "Brak danych"}</span>
				</div>

				<div className="text-gray-300 truncate px-2 mt-1">{builder.sessionId}</div>

				<div className="text-gray-300 px-2 mt-1">{format(startedAt || new Date(), "dd.MM.yyyy", { locale: pl })}</div>

				<div className="px-2 mt-1">
					<div className={clsx("flex items-center gap-2 px-2.5 py-1 rounded-full w-fit", hasError ? "bg-error-color/20 text-error-color" : "bg-primary-dark text-primary-color")}>
						{hasError ? <AlertCircle className="w-4 h-4 text-error-color" /> : <CircleCheck className="w-4 h-4 text-primary-color" />}
						<p className="font-semibold text-xs">{hasError ? "Przerwane" : "Zakończono"}</p>
					</div>
				</div>

				<div className="max-lg:hidden px-6 mt-1">
					<div className="bg-sidebar-color p-1 px-3 font-medium rounded-lg w-fit">
						<p>{channelStage?.channel?.channel.length || 0}</p>
					</div>
				</div>

				<div className="max-lg:hidden px-2 mt-1">
					<div className="bg-sidebar-color p-1 px-3 font-medium rounded-lg w-fit">
						<p>{roleStage?.role?.role.length || 0}</p>
					</div>
				</div>

				<div className="flex items-center justify-end gap-2 mt-1">
					<button>
						<ArrowRight className="w-5 h-5 text-text-color" />
					</button>
					<button>
						<ChevronDown className="w-5 h-5 text-text-color" />
					</button>
				</div>
			</div>
			<div className="w-full h-[1px] bg-border-color"></div>
			<div className="p-5 md:hidden" onClick={() => (isOpen ? setData(null) : setData(builder))}>
				<div className="bg-box-color-dashboard border border-border-color px-5 py-4 cursor-pointer rounded-lg">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2 font-medium col-span-2   ">
								<div className={clsx("p-2 rounded-lg w-fit", hasError ? "bg-error-color/30" : "bg-primary-dark")}>{hasError ? <AlertCircle className="w-5.5 h-5.5 text-error-color" /> : <CircleCheck className="w-5.5 h-5.5 text-primary-color" />}</div>
							</div>
							<div className="flex flex-col">
								<p className="font-semibold">{builder.title}</p>
								<span className="text-text-color text-sm">{builder.sessionId}</span>
							</div>
						</div>
						<button>
							<ChevronDown className="w-6 h-6 text-text-color" />
						</button>
					</div>
					<div className="flex items-center gap-3 mt-3">
						<div className="flex items-center gap-1">
							<MessageSquare className="w-4 h-4 text-primary-color" />
							<p className="text-text-color font-medium text-sm">15</p>
						</div>
						<div className="flex items-center gap-1">
							<Shield className="w-4 h-4 text-primary-color" />
							<p className="text-text-color font-medium text-sm">15</p>
						</div>
						<div className="flex items-center gap-1 text-text-color">
							<Clock className="w-4 h-4 " />
							<p className=" font-medium text-sm">{format(startedAt || new Date(), "dd.MM.yyyy", { locale: pl })}</p>
						</div>
					</div>
					<div className="flex items-center justify-between mt-5">
						<div className={clsx("flex items-center gap-2 px-2.5 py-1 rounded-full w-fit", hasError ? "bg-error-color/20 text-error-color" : "bg-primary-dark text-primary-color")}>
							{hasError ? <AlertCircle className="w-4 h-4 text-error-color" /> : <CircleCheck className="w-4 h-4 text-primary-color" />}
							<p className="font-semibold text-xs">{hasError ? "Przerwane" : "Zakończono"}</p>
						</div>
						<button>
							<ArrowRight className={clsx("w-5 h-5", hasError ? "text-error-color" : "text-primary-color")} />
						</button>
					</div>
				</div>
			</div>
			<AccountBuilderDetails isOpen={isOpen} builder={builder} />
		</div>
	)
}
