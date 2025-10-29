import { Flame, Calendar, Clock, CircleGauge } from "lucide-react"

export function AccountBuilderLimit() {
	return (
		<div className="border border-border-color rounded-lg w-[30rem] max-md:w-full ">
			<div className="flex items-center justify-between p-5">
				<p className="text-lg font-medium">Twoje limity</p>
				<div className="bg-primary-dark px-3 py-1 rounded-full w-fit">
					<p className="text-primary-color text-xs font-semibold ">Builder AI</p>
				</div>
			</div>
			<div className="bg-box-color p-5">
				<div className="">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Flame className="text-primary-color w-4.5 h-4.5" />
							<p className="text-sm font-semibold">Dzisiejszy użycia</p>
						</div>
						<p className="text-sm text-primary-color">10 pozostało</p>
					</div>
					<div className="flex items-center justify-between mt-4 mb-1.5">
						<p className="text-xs text-text-color">90 / 100</p>
						<span className="text-xs text-primary-color">30%</span>
					</div>
					<div className="w-full h-2 rounded-lg bg-box-color-dashboard rounded-lg">
						<div className="h-2 rounded-lg bg-primary-color w-1/4"></div>
					</div>
				</div>
				<div className="mt-7">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Calendar className="text-primary-color w-4.5 h-4.5" />
							<p className="text-sm font-semibold">Miesięczne użycia</p>
						</div>
						<p className="text-sm text-primary-color">10 pozostało</p>
					</div>
					<div className="flex items-center justify-between mt-4 mb-1.5">
						<p className="text-xs text-text-color">90 / 100</p>
						<span className="text-xs text-primary-color">30%</span>
					</div>
					<div className="w-full h-2 rounded-lg bg-box-color-dashboard rounded-lg">
						<div className="h-2 rounded-lg bg-primary-color w-1/4"></div>
					</div>
				</div>
				<div className="bg-primary-color/10 border border-primary-color/80 p-4 py-5 rounded-lg mt-7">
					<div className="flex items-center justify-between">
						<p className="text-sm text-primary-color font-semibold">Następne odnowienie</p>
						<div className="flex items-center gap-2 text-primary-color">
							<Clock className="w-4.5 h-4.5" />
							<span className="text-sm font-medium">10.05.2025</span>
						</div>
					</div>
					<div className="flex items-center gap-2 mt-4 bg-primary-color/10  rounded-lg p-4">
						<div className="bg-primary-color/20 rounded-full p-2 w-fit">
							<CircleGauge className="w-5 h-5 text-primary-light" />
						</div>
						<div className="flex flex-col ">
							<p className="text-sm">Zużycie AI</p>
							<span className="text-xs text-text-color">Wkorzystano 70% limitu miesięcznego</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
