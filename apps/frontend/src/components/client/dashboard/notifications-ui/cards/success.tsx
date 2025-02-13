import { CircleCheckBig } from "lucide-react"
import { Notification } from "../../../../interfaces/common"
import { formatDistanceToNow } from "date-fns"
import { pl } from "date-fns/locale"

interface Props {
	item: Notification
}

export default function SuccessCard({ item }: Props) {
	const date = item.dateAdd ? new Date(item.dateAdd) : new Date()

	return (
		<div className="flex items-start gap-3 bg-boxColorDashboard border-l-4 border-l-primaryColor rounded-xl px-4 py-3">
			<div className="bg-darknesPrimaryColor w-fit p-2 rounded-xl">
				<CircleCheckBig className="text-primaryColor" />
			</div>
			<div className="">
				<p className="font-medium">{item.title}</p>
				<p className="text-silverColor  mt-1">{item.description}</p>
				<p className="mt-6 text-darkGray text-sm">{date && formatDistanceToNow(date, { addSuffix: true, locale: pl })}</p>
			</div>
		</div>
	)
}
