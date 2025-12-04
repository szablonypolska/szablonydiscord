import { Builder, BuilderStageType } from "@/components/interfaces/builder/common"
import { BatteryCharging } from "lucide-react"
import { getStageMetadata } from "@/utils/builder/stageMetaData"
import clsx from "clsx"
import { getStatusMetadata } from "@/utils/builder/statusMetaData"
import { differenceInSeconds } from "date-fns"

export function AccountBuilderDetails({ isOpen, builder }: { isOpen: boolean; builder: Builder }) {
	const stageOrder = Object.values(BuilderStageType)
	const sortedData = builder.builderProcess?.stages.sort((a, b) => {
		return stageOrder.indexOf(a.type) - stageOrder.indexOf(b.type)
	})
	// const channelStage = builder.builderProcess?.stages.find(stage => stage.type === BuilderStageType.CHANNEL)

	return (
		<div className={clsx("flex  bg-box-color/50  transition-all max-md:flex-col", isOpen ? "h-70 " : "h-0  overflow-hidden")}>
			<div className=" px-5 py-3 flex-grow">
				<div className="bg-box-color rounded-lg border border-border-color p-4">
					<div className="flex items-center gap-2">
						<BatteryCharging className="w-5.5 h-5.5 text-primary-color" />
						<p className="font-semibold text-sm">Status generowania</p>
					</div>

					<div className="mt-1">
						{sortedData?.map((stage, index) => {
							const metadata = getStageMetadata(stage.type)
							const statusMetaData = getStatusMetadata(stage.status)
							const Icon = statusMetaData.Icon
							const difference = differenceInSeconds(new Date(stage.finishedAt || ""), new Date(stage.startedAt || ""))

							return (
								<div className="flex items-center justify-between" key={index}>
									<div className="flex items-center gap-1">
										<div className="py-1 text-sm text-text-color">{metadata?.title}</div>
										{difference > 0 && <div className="py-1 text-sm font-medium text-text-color">({difference}s)</div>}
									</div>

									<div className="py-1">
										<div className={clsx("flex items-center gap-1 px-2.5 py-1  rounded-full text-xs", statusMetaData.styles)}>
											<Icon className="w-4 h-4" />
											<p className="font-medium">{statusMetaData.title}</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<div className="py-3 pr-5 flex-grow flex-shrink-0">
				<div className="bg-box-color rounded-lg border border-border-color p-4"></div>
			</div>
			<div className="py-3 pr-5 flex-grow flex-shrink-0">
				<div className="bg-box-color rounded-lg border border-border-color p-4"></div>
			</div>
		</div>
	)
}
