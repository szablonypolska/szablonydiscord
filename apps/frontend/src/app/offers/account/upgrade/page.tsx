import OfferUpgradeComparison from "@/components/client/offers/details/upgrade/offerUpgradeComprasion"
import OfferUpgradeHeader from "@/components/client/offers/details/upgrade/offerUpgradeHeader"
import OfferUpgradePlans from "@/components/client/offers/details/upgrade/offerUpgradePlans"


export default function UpgradeAccount() {
	return (
		<div className="flex flex-col items-center justify-center my-20 bg-">
			<OfferUpgradeHeader />
			<OfferUpgradePlans />
			<OfferUpgradeComparison />
		</div>
	)
}
