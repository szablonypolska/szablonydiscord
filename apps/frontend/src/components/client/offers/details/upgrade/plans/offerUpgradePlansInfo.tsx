import { ArrowRight, Check, Crown, Star } from "lucide-react"

export function OfferUpgradePlansInfo() {
	return (
		<div className="w-full">
			<div className="flex items-center gap-4">
				<div className="bg-primary-color p-3 rounded-full w-fit">
					<Crown className="w-6.5 h-6.5" />
				</div>
				<div className="">
					<h2 className="text-xl font-semibold">Subskrypcja Premium</h2>
					<p className="text-text-color">Odblokuj pełny potencjał</p>
				</div>
			</div>
			<div className="mt-7 w-full">
				<div className="flex items-center justify-between my-3">
					<p className="text-text-color">Plan miesięczny</p>

					<span className="font-semibold">12.99 zł / miesiąc</span>
				</div>
				<div className="w-full h-[1px] bg-border-color rounded-xl"></div>
				<div className="flex items-center justify-between mt-5 mb-3">
					<div className="flex items-start gap-2">
						<p className="text-text-color">Plan roczny</p>
						<div className="bg-primary-dark/40 px-2 w-fit rounded-full">
							<span className="text-xs text-primary-color">oszczędzasz 25%</span>
						</div>
					</div>
					<span className="font-semibold">107,99 zł / rok</span>
				</div>
				<div className="w-full h-[1px] bg-border-color rounded-xl"></div>
			</div>
			<div className="mt-8 bg-section-color p-4 rounded-xl">
				<div className="flex items-center gap-3">
					<Star className="text-primary-color w-5 h-5" />
					<p className="font-medium">Korzyści z Premium</p>
				</div>
				<div className="flex items-center gap-5  mt-2">
					<div className="">
						<div className="flex items-center gap-2">
							<Check className="w-4 h-4 text-primary-color" />
							<p className="text-sm text-text-color">Wyższe limity Buildera AI</p>
						</div>
						<div className="flex items-center gap-2 mt-1.5">
							<Check className="w-4 h-4 text-primary-color" />
							<p className="text-sm text-text-color">Wyższe limity API</p>
						</div>
					</div>
					<div className="">
						<div className="flex items-center gap-2">
							<Check className="w-4 h-4 text-primary-color" />
							<p className="text-sm text-text-color">Możliwość sprzedaży szablonów</p>
						</div>
						<div className="flex items-center gap-2 mt-1.5">
							<Check className="w-4 h-4 text-primary-color" />
							<p className="text-sm text-text-color">Specjalny badge profilu</p>
						</div>
					</div>
				</div>
			</div>
			<button className="flex items-center  text-primary-color mt-5 text-sm cursor-pointer hover:underline group">
				<span>Zobacz pełne porównanie planów</span>
				<ArrowRight className="w-4 h-4 transition-all ml-1.5 group-hover:ml-3" />
			</button>
		</div>
	)
}
