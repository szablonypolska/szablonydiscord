import { Calendar, Users, LayoutPanelTop } from "lucide-react"
import { User } from "../../interfaces/common"
import { formatData } from "@/utils/formatedData"

interface Props {
	data: User
}

export default function StatisticsProfile({ data }: Props) {
	const usageCount = data.template.reduce(
		(acc, val) => {
			acc.usage += val.usageCount
			return acc
		},
		{ usage: 0 }
	)

	return (
		<div className="mt-5 bg-boxColor border border-borderColor py-5 w-[22rem] max-xl:w-72 max-md:w-full z-10 rounded-xl flex-shrink-0">
			<p className="font-medium text-silverColor px-5 pb-5">Statystyki</p>
			<div className="w-full h-[1px] bg-borderColor"></div>
			<div className="mt-5">
				<div className="flex items-center gap-3 px-5">
					<Calendar className="text-primaryColor" />
					<div className="">
						<p className="text-sm text-silverColor">Data dołączenia</p>
						<p className="text-sm font-medium">{data.dateCreateAccount ? formatData(data.dateCreateAccount) : "Nie zarejestrowany"}</p>
					</div>
				</div>
				<div className="w-full h-[1px] bg-borderColor my-4"></div>
				<div className="flex items-center gap-3 px-5">
					<Users className="text-primaryColor" />
					<div className="">
						<p className="text-sm text-silverColor">Użycia szablonów</p>
						<p className="text-sm font-medium">{usageCount.usage}</p>
					</div>
				</div>
				<div className="w-full h-[1px] bg-borderColor my-4"></div>
				<div className="flex items-center gap-3 px-5">
					<LayoutPanelTop className="text-primaryColor" />
					<div className="">
						<p className="text-sm text-silverColor">Dodane szablony</p>
						<p className="text-sm font-medium">{data.template.length}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
