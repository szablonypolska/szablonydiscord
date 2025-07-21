import { OfferUpgradePlansInfo } from "./plans/offerUpgradePlansInfo"
import { OfferUpgradeSelectPlans } from "./plans/offerUpgradeSelectPlans"

export default function OfferUpgradePlans() {
	return (
		<div className="flex gap-8 mt-10 bg-box-color border border-border-color border-t-7 border-t-primary-color rounded-xl py-10 px-8 w-[75rem] max-xl:w-11/12 shadow-lg shadow-primary-color/20 max-lg:flex-col">
			<div className="w-1/2 max-lg:w-full">
				<OfferUpgradePlansInfo />
			</div>
			<div className="w-1/2 max-lg:w-full">
				<OfferUpgradeSelectPlans />
			</div>
		</div>
	)
}
