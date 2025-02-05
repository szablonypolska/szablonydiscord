import { AlertTriangle } from "lucide-react"
import { Notification } from "../../../../../components/interfaces/common"

interface Props {
	item: Notification
}

export default function WarningCard({ item }: Props) {
	const date = new Date(item.dateAdd)
	return (
		<div className="flex items-start gap-3 bg-boxColorDashboard border-l-4 border-l-warningColor rounded-xl px-4 py-3">
			<div className="bg-darknesWarningColor w-fit p-2 rounded-xl">
				<AlertTriangle className="text-warningColor" />
			</div>
			<div className="">
				<p className="font-medium">{item.title}</p>
				<p className="text-silverColor  mt-1">{item.description}</p>
				<p className="mt-6 text-darkGray text-sm">
					{date.getHours()}:{date.getMinutes()}
				</p>
			</div>
		</div>
	)
}
