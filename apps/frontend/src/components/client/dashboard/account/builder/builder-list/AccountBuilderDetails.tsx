import { Builder, BuilderStageType } from "@/components/interfaces/builder/common"
import { BatteryCharging } from "lucide-react"
import { getStageMetadata } from "@/utils/builder/stageMetaData"
import clsx from "clsx"
import { getStatusMetadata } from "@/utils/builder/statusMetaData"

export function AccountBuilderDetails({ builder }: { builder: Builder }) {
	const stageOrder = Object.values(BuilderStageType)
	const sortedData = builder.builderProcess?.stages.sort((a, b) => {
		return stageOrder.indexOf(a.type) - stageOrder.indexOf(b.type)
	})

	return (
		<tr className="bg-box-color/50 border-b border-border-color">
			<td className=" px-5 py-3" colSpan={2}>
				<div className="bg-box-color rounded-lg border border-border-color p-4">
					<div className="flex items-center gap-2">
						<BatteryCharging className="w-5.5 h-5.5 text-primary-color" />
						<h2 className="font-semibold">Status generowania</h2>
					</div>

					<div className="mt-1">
						{sortedData?.map((stage, index) => {
							const metadata = getStageMetadata(stage.type)
							const statusMetaData = getStatusMetadata(stage.status)
							const Icon = statusMetaData.Icon

							return (
								<div className="flex items-center justify-between" key={index}>
									<div className="py-1 text-sm text-text-color">{metadata?.title}</div>
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
			</td>
			<td className="py-3 pr-3" colSpan={2}>
				<div className="bg-box-color rounded-lg border border-border-color p-4"></div>
			</td>
			<td className="py-3 pr-5" colSpan={3}>
				<div className="bg-box-color rounded-lg border border-border-color p-4"></div>
			</td>
		</tr>
	)
}
