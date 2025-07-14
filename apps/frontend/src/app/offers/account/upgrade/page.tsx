import OfferUpgradeHeader from "@/components/client/offers/details/upgrade/offerUpgradeHeader"
import OfferUpgradePlans from "@/components/client/offers/details/upgrade/offerUpgradePlans"

export default function UpgradeAccount() {
	return (
		<div className="flex flex-col items-center justify-center my-20">
			<OfferUpgradeHeader />
			<OfferUpgradePlans />
		</div>
	)
}
