import { Filter, Calendar1, CalendarDays, Clock, CircleCheckBig, CircleCheck, CircleX, RefreshCcw } from "lucide-react"

export default function AccountOrderFilter() {
	const optionToFilter = [
		{
			label: "Ostatni miesiąc",
			value: "last_month",
			icon: <Calendar1 className="w-4 h-4" />,
		},
		{
			label: "Ostatni rok",
			value: "last_year",
			icon: <CalendarDays className="w-4 h-4" />,
		},
		{
			label: "Nowe",
			value: "new",
			icon: <Clock className="w-4 h-4" />,
		},
		{
			label: "Opłacone",
			value: "paid",
			icon: <CircleCheckBig className="w-4 h-4" />,
		},
		{
			label: "Zrealizowane",
			value: "completed",
			icon: <CircleCheck className="w-4 h-4" />,
		},
		{
			label: "Anulowane",
			value: "canceled",
			icon: <CircleX className="w-4 h-4" />,
		},
		{
			label: "Zwrócone",
			value: "refunded",
			icon: <RefreshCcw className="w-4 h-4" />,
		},
	]

	return (
		<div className="flex items-center gap-5 p-5">
			<div className="flex items-center gap-2 font-semibold text-text-color/80">
				<Filter className="w-5 h-5" />
				<p>Filtry:</p>
			</div>
			<div className="flex items-center gap-3 flex-wrap">
				{optionToFilter.map(option => (
					<button key={option.value} className="flex items-center gap-2 text-text-color bg-background px-4 py-1 rounded-lg cursor-pointer">
						{option.icon}
						<span className="text-sm">{option.label}</span>
					</button>
				))}
			</div>
		</div>
	)
}
